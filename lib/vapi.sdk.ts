// import Vapi from '@vapi-ai/web';

// export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!)
import Vapi from "@vapi-ai/web";

export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);

export function startAssistant() {
  return vapi.start({
    assistant: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!,
  });
}
