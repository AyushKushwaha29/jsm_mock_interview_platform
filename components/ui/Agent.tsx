/* eslint-disable @next/next/no-img-element */

 
import { cn } from '@/lib/utils';
import React from 'react'



enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}


const Agent = ({userName}: AgentProps) => {
    const callStatus = CallStatus.FINISHED;
    const isSpeaking = true;
    const messages =[
       'what is your name?',
       'My name is John Doe, nice to meet you!'
    ];
    const lastMessage = messages[messages.length - 1];
  

  return (
    <>
    <div className='call-view'>
        <div className='card-interviewer'>
          <div className='avatar'>
            <img src="/ai-avatar.png" alt='vapi' width={65} height={54} className='object-cpver' />
             {isSpeaking && <span className='animate-speak' />} 
          </div>
          <h2>AI Interviewer</h2>
        </div>
        <div className="card-border">
          <div className="card-content">
            <img
              src="/user-avatar.png"
              alt="profile-image"
              width={539}
              height={539}
              className="rounded-full object-cover size-[120px]"
            />
            <h2>{userName}</h2>
          </div>
        </div>
    </div>

{/* <--------------------messages------------------------> */}


        {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      
{/* <------------------------button-------------------------> */}


      <div className="w-full flex justify-center">
{        callStatus !== "ACTIVE" ? ( 
          <button className="relative btn-call" 
        //   onClick={() => handleCall()}
          >
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />

            <span className="relative">
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : ". . ."}
               </span >
             </button> 
                 ) : (
               <button className="btn-disconnect" 
            //    onClick={() => handleDisconnect()}
               >
                  End
               </button>
              )}
      </div>
      </>
  )
}

export default Agent