"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Profile from '@components/Profile'

const MyProfile = () => {
  const[posts,setPosts]=useState([])
  const {data:session}=useSession();
  const router=useRouter();
  useEffect(()=>{
    const fetchPosts= async()=>{
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data= await response.json();
      setPosts(data)
    } 
    if(session?.user.id) {fetchPosts();}
    
  },[session?.user.id])
  const handleEdit=(post)=>{
    router.push(`/update-prompt?id=${post._id}`);
  }
  const handleDelete= async(post)=>{
    const hasConfirmed=confirm("Are you sure you want to delete?")
    if(hasConfirmed){
      await fetch(`/api/prompt/${post._id}`, {
        method: 'DELETE',
      });
    }
    const filteredPosts=posts.filter((p=>p._id !== post._id))
    setPosts(filteredPosts)

  }
    
  return (
  <Profile
    name={session?.user.name}
    desc="Welcome to your personalized profile page"
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
  />
  )
}

export default MyProfile