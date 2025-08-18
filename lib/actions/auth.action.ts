/* eslint-disable @typescript-eslint/no-explicit-any */

 
'use server';

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

// export default async function SignUp(params:SignInParams) {
//     const {uid, name, email} = params;
//     try{
//        const userRecode = await db.collection('user').doc(uid).get();
//        if(userRecode.exists){
//         return{
//         success: false,
//         message: 'User already exists. Please sign in instead'
//        }
//     }
//     await db.collection('users').doc(uid).set({
//         name, email
//     })
//     return{
//         success: true,
//         message: 'Account created successfully. please sign in.'
//     }



//     }catch(e:any){
//         // console.error('Error creating a user', e);
//         if(e.code === 'auth/email-already-exists'){
//           return{
//             success:false,
//             message:'This email is already in use.'
//           }
//         }
//         return {
//             success:false,
//             message: 'Failed to create an account'

//         }
//     }
// }


interface SignUpParams {
  uid: string
  name: string
  email: string
  password: string
}

export async function SignUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    const userRecode = await db.collection('users').doc(uid).get();
    

    if (userRecode.exists) {
      return {
        success: false,
        message: "User already exists. Please sign in instead",
      };
    }

    await db.collection('users').doc(uid).set({
      name,
      email,
      // createdAt: new Date(),
    });

    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  } catch (e: any) {
    console.error('Error creating a user',e)
    if (e.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "This email is already in use.",
      };
    }

    return {
      success: false,
      message: "Failed to create an account",
    };
  }
}




const ONE_WEEK = 60*60*24*7;

export async function SignIn(params:SignInParams) {
    const {email,idToken} = params;
    try{
       const userRecode = await auth.getUserByEmail(email);
       if(!userRecode){
        return{
        success: false,
        message: 'User does not exists. Create an account instead'
       }
    }
    await setSessionCookie(idToken);
}
    catch (e){
       console.log(e);
       return {
        success: false,
        message: 'Failed to log into an account.'
       }
    }
}

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: ONE_WEEK * 1000,
    })

    cookieStore.set('session',sessionCookie,{
        maxAge : ONE_WEEK,
        httpOnly: true,
        secure:process.env.NODE_ENV === 'production',
        path:'/',
        sameSite:'lax'
    })
    
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  if (!sessionCookie) return null;
  try{
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userRecode =await db.collection('users').doc(decodedClaims.uid).get();
    if(!userRecode.exists) return null;
    return{
      ...userRecode.data(),
      id: userRecode.id,
    } as User;
  }catch(e){
    console.log(e)
    return null;

  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}