import { ChatMessage, type Message } from "@/registry/default/ui/chat-message"
import { TypingIndicator } from "@/registry/default/ui/typing-indicator"

interface MessageListProps {
  messages: Message[]
  showTimeStamps?: boolean
  isTyping?: boolean
}

export function MessageList({
  messages,
  showTimeStamps = true,
  isTyping: isTyping = false,
}: MessageListProps) {
  return (
    <div className="space-y-4 overflow-visible">
      {messages.map((message, index) => (
        <ChatMessage key={index} showTimeStamp={showTimeStamps} {...message} />
      ))}
      {isTyping && <TypingIndicator />}
    </div>
  )
}
