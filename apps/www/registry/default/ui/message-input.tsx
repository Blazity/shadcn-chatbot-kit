"use client"

import React, { useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUp, Paperclip, Square, X } from "lucide-react"
import { omit } from "remeda"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/default/ui/button"

import { useAutosizeTextArea } from "../hooks/use-autosize-textarea"

interface MessageInputBaseProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string
  submitOnEnter?: boolean
  stop?: () => void
  isGenerating: boolean
}

interface MessageInputWithoutAttachmentProps extends MessageInputBaseProps {
  allowAttachments?: false
}

interface MessageInputWithAttachmentsProps extends MessageInputBaseProps {
  allowAttachments: true
  files: File[] | null
  setFiles: React.Dispatch<React.SetStateAction<File[] | null>>
}

type MessageInputProps =
  | MessageInputWithoutAttachmentProps
  | MessageInputWithAttachmentsProps

export function MessageInput({
  placeholder = "Ask AI...",
  className,
  onKeyDown,
  submitOnEnter = true,
  stop,
  isGenerating,
  ...props
}: MessageInputProps) {
  const [isDragging, setIsDragging] = useState(false)

  const onDragOver = (event: React.DragEvent) => {
    if (props.allowAttachments !== true) return
    event.preventDefault()
    setIsDragging(true)
  }

  const onDragLeave = (event: React.DragEvent) => {
    if (props.allowAttachments !== true) return
    event.preventDefault()
    setIsDragging(false)
  }

  const onDrop = (event: React.DragEvent) => {
    setIsDragging(false)
    if (props.allowAttachments !== true) return
    event.preventDefault()
    const dataTransfer = event.dataTransfer
    if (dataTransfer.files.length) {
      props.setFiles(Array.from(dataTransfer.files))
    }
  }

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

  const showFileList =
    props.allowAttachments && props.files && props.files.length > 0

  useAutosizeTextArea({
    ref: textAreaRef,
    maxHeight: 240,
    borderWidth: 1,
    dependencies: [props.value, showFileList],
  })

  return (
    <div
      className="relative flex w-full"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <textarea
        aria-label="Write your prompt here"
        placeholder={placeholder}
        ref={textAreaRef}
        onKeyDown={(event) => {
          if (submitOnEnter && event.key === "Enter" && !event.shiftKey) {
            event.preventDefault()
            event.currentTarget.form?.requestSubmit()
          }

          onKeyDown?.(event)
        }}
        className={cn(
          "w-full grow resize-none rounded-xl border border-input bg-background p-3 pr-24 text-sm ring-offset-background transition-[border] placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          showFileList && "pb-16",
          className
        )}
        // TODO: better way to do this
        {...(props.allowAttachments
          ? omit(props, ["allowAttachments", "files", "setFiles"])
          : omit(props, ["allowAttachments"]))}
      />

      {props.allowAttachments && (
        <AnimatePresence mode="popLayout">
          <div className="absolute bottom-0 left-0 w-full overflow-x-scroll p-3">
            <div className="flex space-x-3">
              {props.files?.map((file) => {
                return (
                  <motion.div
                    className="relative flex max-w-[200px] rounded-md border p-3 text-xs"
                    key={file.name + String(file.lastModified)}
                    layout
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "100%" }}
                  >
                    <button
                      className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full border bg-background"
                      type="button"
                      onClick={() => {
                        props.setFiles((files) => {
                          if (!files) return null

                          const filtered = Array.from(files).filter(
                            (f) => f !== file
                          )
                          if (filtered.length === 0) return null
                          return filtered
                        })
                      }}
                    >
                      <X className="h-2.5 w-2.5" />
                    </button>
                    <span className="w-full truncate text-muted-foreground">
                      {file.name}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </AnimatePresence>
      )}

      <div className="absolute right-3 top-3 flex gap-2">
        {props.allowAttachments && (
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="h-8 w-8"
            aria-label="Attach a file"
            onClick={async () => {
              const files = await showFileUploadDialog()
              props.setFiles(files)
            }}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
        )}
        {isGenerating ? (
          <Button
            type="button"
            size="icon"
            className="h-8 w-8"
            aria-label="Stop generating"
            onClick={stop}
          >
            <Square className="h-3 w-3" fill="currentColor" />
          </Button>
        ) : (
          <Button
            type="submit"
            size="icon"
            className="h-8 w-8 transition-opacity"
            aria-label="Send message"
            disabled={props.value === ""}
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        )}
      </div>

      {props.allowAttachments && <FileUploadOverlay isDragging={isDragging} />}
    </div>
  )
}
MessageInput.displayName = "MessageInput"

interface FileUploadOverlayProps {
  isDragging: boolean
}

function FileUploadOverlay({ isDragging }: FileUploadOverlayProps) {
  return (
    <AnimatePresence>
      {isDragging && (
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center space-x-2 rounded-xl border border-dashed border-border bg-background text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden
        >
          <Paperclip className="h-4 w-4" />
          <span>Drop your files here to attach them.</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function showFileUploadDialog() {
  const input = document.createElement("input")

  input.type = "file"
  input.multiple = true
  input.accept = "*/*"
  input.click()

  return new Promise<File[] | null>((resolve) => {
    input.onchange = (e) => {
      const files = (e.currentTarget as HTMLInputElement).files

      if (files) {
        resolve(Array.from(files))
        return
      }

      resolve(null)
    }
  })
}
