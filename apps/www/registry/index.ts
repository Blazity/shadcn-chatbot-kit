import { Registry } from "@/registry/schema"

export const registry: Registry = [
  {
    name: "chat",
    type: "registry:ui",
    files: ["ui/chat.tsx"],
    registryDependencies: [
      "button",
      "http://localhost:3333/r/chat-message.json",
      "http://localhost:3333/r/message-input.json",
      "http://localhost:3333/r/message-list.json",
      "http://localhost:3333/r/prompt-suggestions.json",
      "http://localhost:3333/r/use-auto-scroll.json",
    ],
  },
  {
    name: "chat-message",
    type: "registry:ui",
    files: ["ui/chat-message.tsx"],
  },
  {
    name: "message-input",
    type: "registry:ui",
    files: ["ui/message-input.tsx"],
    dependencies: ["framer-motion@11"],
    registryDependencies: [
      "http://localhost:3333/r/use-autosize-textarea.json",
    ],
  },
  {
    name: "message-list",
    type: "registry:ui",
    files: ["ui/message-list.tsx"],
  },
  {
    name: "prompt-suggestions",
    type: "registry:ui",
    files: ["ui/prompt-suggestions.tsx"],
  },
  {
    name: "copy-button",
    type: "registry:ui",
    files: ["ui/copy-button.tsx"],
    registryDependencies: [
      "button",
      "http://localhost:3333/r/use-copy-to-clipboard.json",
    ],
  },
  {
    name: "use-autosize-textarea",
    type: "registry:hook",
    files: ["hooks/use-autosize-textarea.ts"],
  },
  {
    name: "use-auto-scroll",
    type: "registry:hook",
    files: ["hooks/use-auto-scroll.ts"],
  },
  {
    name: "use-copy-to-clipboard",
    type: "registry:hook",
    files: ["hooks/use-copy-to-clipboard.ts"],
    registryDependencies: ["sonner"],
  },
  {
    name: "chat-demo",
    type: "registry:example",
    description:
      "A chat interface with message bubbles and a form to send new messages",
    files: ["example/chat-demo.tsx"],
  },
  {
    name: "message-input-demo",
    type: "registry:example",
    files: ["example/message-input-demo.tsx"],
  },
]
