import { MainNavItem, SidebarNavItem } from "types/nav"

export interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Components",
      href: "/docs/components/chat",
    },
    {
      title: "Themes",
      href: "/themes",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/installation",
          items: [],
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "Chat",
          href: "/docs/components/chat",
          items: [],
        },
        {
          title: "Message Input",
          href: "/docs/components/message-input",
          items: [],
        },
        {
          title: "Message List",
          href: "/docs/components/message-list",
          items: [],
        },
        {
          title: "Chat Message",
          href: "/docs/components/chat-message",
          items: [],
        },
        {
          title: "Markdown Renderer",
          href: "/docs/components/markdown-renderer",
          items: [],
        },
        {
          title: "Prompt Suggestions",
          href: "/docs/components/prompt-suggestions",
          items: [],
        },
        {
          title: "Typing Indicator",
          href: "/docs/components/typing-indicator",
          items: [],
        },
        {
          title: "Copy Button",
          href: "/docs/components/copy-button",
          items: [],
        },
        {
          title: "File Preview",
          href: "/docs/components/file-preview",
          items: [],
        },
      ],
    },
  ],
}
