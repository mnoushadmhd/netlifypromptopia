'use client'
import { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

const Feed = () => {
  const [searchText,setSearchText]=useState("")
  const[posts,setPosts]=useState([])
  const[callPosts,setCallPosts]=useState(false)

  const handleSearchChange=(e)=>{
    debugger
    if(e.target.value.length == 0) setCallPosts((prev)=>!prev)
    setSearchText(e.target.value.toLowerCase())
    const filteredPosts=posts.filter((post)=>{
      const{username,email}=post.creator;
      const{prompt,tag}=post
      if ([username, email, prompt, tag].some(field => field.toLowerCase().includes(searchText))) {
        return post;
      }
    })
    if(filteredPosts.length){
      setPosts(filteredPosts);
    }
    else{
      setPosts([])
    } 
  }
  useEffect(()=>{
    const fetchposts=async()=>{
      try{
        const response= await fetch('/api/prompt')
        const data=await response.json()
        setPosts(data) 
        console.log(data)
      }
      catch(error){
        console.log("Error fetching prompt data",error)
      }
    }
    fetchposts();
  },[callPosts])

  const PromptCardList=({data,handleTagClick})=>{
    return(
      <div className='mt-16 prompt_layout'>
      {data.length?data.map((post) => (
                <PromptCard 
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            )):""}
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