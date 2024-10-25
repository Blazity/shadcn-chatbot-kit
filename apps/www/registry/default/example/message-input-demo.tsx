"use client"

import { useRef, useState } from "react"

import { ChatForm } from "../ui/chat"
import { MessageInput } from "../ui/message-input"

export default function MessageInputDemo() {
  const [value, setValue] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const timeout = useRef<number | null>()

  const cancelTimeout = () => {
    if (timeout.current) {
      window.clearTimeout(timeout.current)
    }
  }

  const setNewTimeout = (callback: () => void, ms: number) => {
    cancelTimeout()
    const id = window.setTimeout(callback, ms)
    timeout.current = id
  }

  return (
    <ChatForm
      className="w-full max-w-[500px]"
      isPending={false}
      handleSubmit={(event) => {
        event?.preventDefault?.()
        setValue("")
        setIsGenerating(true)
        setNewTimeout(() => {
          setIsGenerating(false)
        }, 2000)
      }}
    >
      {({ files, setFiles }) => (
        <MessageInput
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
          }}
          allowAttachments
          files={files}
          setFiles={setFiles}
          stop={() => {
            setIsGenerating(false)
            cancelTimeout()
          }}
          isGenerating={isGenerating}
        />
      )}
    </ChatForm>
  )
}
