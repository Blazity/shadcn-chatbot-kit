import { siteConfig } from "@/config/site"
import { Registry } from "@/registry/schema"

export const registry: Registry = [
  {
    name: "chat",
    type: "registry:ui",
    files: ["ui/chat.tsx"],
    registryDependencies: [
      "button",
      `${siteConfig.url}/r/use-auto-scroll.json`,
      `${siteConfig.url}/r/chat-message.json`,
      `${siteConfig.url}/r/message-input.json`,
      `${siteConfig.url}/r/message-list.json`,
      `${siteConfig.url}/r/prompt-suggestions.json`,
    ],
  },
  {
    name: "use-auto-scroll",
    type: "registry:hook",
    files: ["hooks/use-auto-scroll.ts"],
  },
  {
    name: "chat-message",
    type: "registry:ui",
    files: ["ui/chat-message.tsx"],
    registryDependencies: [
      "button",
      `${siteConfig.url}/r/copy-button.json`,
      `${siteConfig.url}/r/markdown-renderer.json`,
    ],
  },
  {
    name: "copy-button",
    type: "registry:ui",
    files: ["ui/copy-button.tsx"],
    registryDependencies: [
      "button",
      `${siteConfig.url}/r/use-copy-to-clipboard.json`,
    ],
  },
  {
    name: "use-copy-to-clipboard",
    type: "registry:hook",
    files: ["hooks/use-copy-to-clipboard.ts"],
    registryDependencies: ["sonner"],
  },
  {
    name: "markdown-renderer",
    type: "registry:ui",
    files: ["ui/markdown-renderer.tsx"],
    dependencies: ["react-markdown", "remark-gfm"],
  },
  {
    name: "message-input",
    type: "registry:ui",
    files: ["ui/message-input.tsx"],
    dependencies: ["framer-motion@11", "remeda@2"],
    registryDependencies: [
      "button",
      `${siteConfig.url}/r/use-autosize-textarea.json`,
    ],
  },
  {
    name: "use-autosize-textarea",
    type: "registry:hook",
    files: ["hooks/use-autosize-textarea.ts"],
  },
  {
    name: "message-list",
    type: "registry:ui",
    files: ["ui/message-list.tsx"],
    registryDependencies: [
      `${siteConfig.url}/r/chat-message.json`,
      `${siteConfig.url}/r/typing-indicator.json`,
    ],
  },
  {
    name: "typing-indicator",
    type: "registry:ui",
    files: ["ui/typing-indicator.tsx"],
  },
  {
    name: "prompt-suggestions",
    type: "registry:ui",
    files: ["ui/prompt-suggestions.tsx"],
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
