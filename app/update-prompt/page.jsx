'use client'
import Form from "@components/Form"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"


const EditPrompt = () => {
    const [submitting,setSubmitting]=useState(false)
    const[post,setPost]=useState({prompt:"",tag:""})
    const router = useRouter()
    const searchParams=useSearchParams();
    const promptId=searchParams.get('id')

    useEffect(()=>{
        const getPrompt=async()=>{
            // const response= await fetch(`/api/prompt/${promptId}`)
            const response = await fetch(`/api/prompt/${promptId}`);
            if(!response.ok){
                alert("not ok",response)
            }
            const data=await response.json();
            setPost({prompt: data.prompt,tag: data.tag})
        }
        if(promptId) getPrompt();
    },[promptId])
    const updatePrompt=async(e)=>{
        e.preventDefault();
        if(!promptId) return alert("Missing Prompt Id")
        setSubmitting(true)
        try{
            const response =
                await fetch(`/api/prompt/${promptId}`,
                {
                    method:"PATCH",
                    body: JSON.stringify({
                        prompt: post.prompt,
                        tag: post.tag
                    })
    
                })
            if(response.ok){
                router.push('/')
            }

        }
        catch(error){
            console.log(error)

        } finally{
            setSubmitting(false)
        }
    }
  return (
    <Form
    type="Edit"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={updatePrompt}
    />
    
  )
}
EditPrompt.suppressFirstRenderFlicker = true;
export default EditPrompt