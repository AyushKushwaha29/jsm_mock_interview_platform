/* eslint-disable @next/next/no-img-element */
import { isAuthenticated } from "@/lib/actions/auth.action"
import { redirect } from "next/navigation";
import { ReactNode } from "react"

const RootLayout = async ({children}:{children:ReactNode}) => { 
  const isUserAuthenticated = await isAuthenticated();
  if(!isUserAuthenticated) redirect('/sign-in')
  return (
    <div className="root-layout">
      <nav>
        <link href="/" className="flex item-center gap-2" />
        <img src="/logo.svg" alt="logo" height={32} width={38} />
         <h2 className="text-primary-100">PrepWise</h2> 
         {children}
      </nav>
    </div>
  )
}

export default RootLayout