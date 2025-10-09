import { groq } from "@ai-sdk/groq"
import { convertToCoreMessages, streamText, tool } from "ai"
import { z } from "zod"

import { delay } from "@/lib/delay"
import { getWeather } from "@/lib/weather"

export const maxDuration = 30

const LLAMA_MODEL = "llama-3.3-70b-versatile"
const GPT_OSS_MODEL = "openai/gpt-oss-120b"

export async function POST(req: Request) {
  const { messages, model = LLAMA_MODEL } = await req.json()

  const result = streamText({
    model: groq(model),
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      ...convertToCoreMessages(messages),
    ],
    maxSteps: 3,
    tools: {
      weather: tool({
        description: "Look up the weather in a given location",
        parameters: z.object({
          location: z.string().describe("The location to get the weather for"),
        }),
        execute: async ({ location }) => {
          return await getWeather(location)
        },
      }),
      delay: tool({
        description: "Pauses the chatbot for a given duration",
        parameters: z.object({
          duration: z
            .number()
            .positive()
            .describe("The duration to pause in seconds"),
        }),
        execute: async ({ duration }) => {
          return await delay(duration)
        },
      }),
    },
  })

  return result.toDataStreamResponse({
    sendReasoning: true,
  })
}

const SYSTEM_PROMPT = `You are a helpful AI assistant demonstrating the shadcn-chatbot-kit component library. You aim to be helpful and knowledgeable while showing off the UI capabilities of the chat interface.

Important guidelines:
1. Only use tools when they are specifically needed to complete a task or explicitly requested. Never call tools automatically or in response to random input.

2. If you receive unclear input or random text (e.g., "asdfgh"), respond politely asking for clarification instead of making assumptions or calling tools.

3. Keep responses concise and focused to demonstrate good chat UI practices. Use appropriate formatting when helpful (bold, italic, lists).

4. Refuse any requests for harmful content, generation of malicious code, or private information. Explain why such requests cannot be fulfilled.

5. You can engage in casual conversation, answer questions, help with tasks, and provide information about the component library itself when asked.

Sample appropriate responses:
- For "hi": "Hello! How can I help you today?"
- For "asdfgh": "I didn't quite understand that. Could you please rephrase or clarify what you're looking for?"
- For "what's the weather like?": "I can check the weather for you. Which city would you like to know about?"

Remember: You're here to be helpful while demonstrating good chatbot UI/UX practices. Keep responses natural but professional.`
