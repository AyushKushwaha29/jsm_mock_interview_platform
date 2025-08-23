/* eslint-disable @next/next/no-img-element */

/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { cn } from '@/lib/utils';
import { vapi } from '@/lib/vapi.sdk';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

type AgentProps = {
  userName?: string;
  userId?: string;
  type: "generate" | "feedback" | string;
};

const Agent = ({ userName, userId, type }: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");

  const latestMessage = messages[messages.length - 1];

  // ---------------- Event Listeners ----------------
  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

    const onMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => console.error("Error:", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  // ---------------- Feedback + Call End Handling ----------------
  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }

    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
      console.log("handleGenerateFeedback");

      const { success, feedbackId: id } = await createFeedback({
        userId: userId ?? "unknown",
        transcript: messages,
      });

      if (success && id) {
        router.push(`/interview/${id}/feedback`);
      } else {
        console.error("Error saving feedback");
        router.push("/");
      }
    };

    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, router, type, userId]);

  // ---------------- Call Handlers ----------------
  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    if (type === "generate") {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: {
          username: userName ?? "Guest",
          userid: userId ?? "unknown",
        },
      });
    } else {
      await vapi.start("interviewer-workflow-id", {
        variableValues: {
          questions: "Default question list", // replace with real data
        },
      });
    }
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  // ---------------- UI ----------------
  return (
    <>
      <div className='call-view'>
        <div className='card-interviewer '>
          <div className='avatar'>
            <img src="/ai-avatar.png" alt='vapi' width={65} height={54} />
            {isSpeaking && <span className='animate-speak' />}
          </div>
          <h2>AI Interviewer</h2>
        </div>

        <div className="card-border">
          <div className="card-content">
            <img
              src="/user-avatar.png"
              alt="profile-image"
              width={120}
              height={120}
              className="rounded-full object-cover"
            />
            <h2>{userName ?? "Guest"}</h2>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={latestMessage?.content}
              className={cn("transition-opacity duration-500", "animate-fadeIn")}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button className="relative btn-call" onClick={handleCall}>
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
            </span>
          </button>
        ) : (
          <button className="btn-disconnect" onClick={handleDisconnect}>
            End
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;

// ---------------- Fake Feedback API ----------------
function createFeedback({
  userId,
  transcript,
}: {
  userId: string;
  transcript: SavedMessage[];
}): { success: boolean; feedbackId?: string } | PromiseLike<{ success: boolean; feedbackId?: string }> {
  console.log("Saving feedback for", userId, transcript);
  return { success: true, feedbackId: "mock-feedback-id" };
}
