import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth"
import { connectToDB } from "@utils/database";
import User from "@models/user";
export const handler = NextAuth(
    {
        providers: [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          })
        ],
        callbacks:{
           async session({ session }) {
      try {
        const sessionUser = await User.findOne({
          email: session.user.email
        });
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }
      } catch (error) {
        console.error("Error fetching session user:", error);
      }
      return session;
    },
    async signIn({ profile }) {
      try {
        // Ensure DB connection is established before querying
        await connectToDB();

        const userExists = await User.findOne({
          email: profile.email
        });
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(/\s/g, "").toLowerCase(), // Consider a more robust username generation method
            image: profile.picture
          });
        }
        return true; // Allow sign-in
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false; // Deny sign-in in case of error
      }
    }
        }
      }
)
export {handler as GET, handler as POST }
