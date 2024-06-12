'use client'
import { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

const Feed = () => {
  const [searchText,setSearchText]=useState("")
  const[posts,setPosts]=useState([])
  const[callPosts,setCallPosts]=useState(false)
  const [originalPosts, setOriginalPosts] = useState([]);

  const handleSearchChange = (e) => {
    
    const searchValue = e.target.value.toLowerCase();
    if (searchValue.length === 0) {
      setCallPosts((prev) => !prev);
    }
    setSearchText(searchValue);
  
    const filteredPosts = originalPosts.filter((post) => {
      const { username, email } = post.creator;
      const { prompt, tag } = post;
      return [username, email, prompt, tag].some(field =>
        field.toLowerCase().includes(searchValue)
      );
    });
  
    setPosts(filteredPosts.length ? filteredPosts : []);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/prompt');
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setPosts(data);
        setOriginalPosts(data);
      } catch (error) {
        console.log("Error fetching prompt data", error);
      }
    };
    fetchPosts();
  }, [callPosts]);

  const PromptCardList=({data,handleTagClick})=>{
    return(
      <div className='mt-16 prompt_layout'>
      {data.length > 0 ?(data.map((post) => (
                <PromptCard 
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))):""}
      </div>
    )
  }
  
  return (
    <section className='feed'>
      <form action="" className="relative w-full flex-center">
        <input 
        type="text"
        placeholder='Search for a tag or a user name' 
        value={searchText}
        onChange={handleSearchChange}
        className='search_input peer'
        />

      </form>

      <PromptCardList
        data={posts}
        handleTagClick={()=>{}}
      />
      
    </section>
  )
}

export default Feed