import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
export const GET = async(req,res)=>{
    try {
        // Ensure DB connection is established before querying
        await connectToDB();
        // Fetch prompts from the database
        const prompts = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(prompts), {
            status: 200,
            headers: {
              'Content-Type': 'application/json'
            }
        })
    }
    catch(error){
        return new Response(JSON.stringify({ error: "Failed to fetch prompts" }), {
        status: 500,
        headers: {
            'Content-Type': 'application/json'
        }
        });
    }
}