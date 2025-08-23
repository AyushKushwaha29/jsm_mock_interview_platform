// // import Agent from "@/components/Agent"
// import Agent from '@/components/ui/Agent'
// import { getCurrentUser } from '@/lib/actions/auth.action'
// import React from 'react'

// const page = async () => {
//   const user = await getCurrentUser();

//   return (
//     <>
//        <h3>Interview Generation</h3>
//        <Agent userName={user?.name} userId={user?.id} type="generate" />
//     </>
//   )
// }
 
// export default page


import Agent from '@/components/ui/Agent'
import { getCurrentUser } from '@/lib/actions/auth.action'
import React from 'react'

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <h3>Interview Generation</h3>
      <Agent 
        userName={user?.name ?? "Guest"} 
        userId={user?.id ?? "unknown"} 
        type="generate" 
      />
    </>
  )
}

export default Page
