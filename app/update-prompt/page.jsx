'use client'
import UpdatePrompt from "@components/UpdatePrompt";
import {Suspense} from "react";
const EditPrompt = () => {
 
  return (
    <Suspense>
        <UpdatePrompt/>
    </Suspense>

  )
}
EditPrompt.suppressFirstRenderFlicker = true;
export default EditPrompt