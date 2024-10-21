import Link from "next/link"

import { siteConfig } from "@/config/site"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import ChatDemo from "@/registry/default/example/chat-demo"
import { Button } from "@/registry/new-york/ui/button"

export default function IndexPage() {
  return (
    <div className="container grid grid-cols-2 pt-10">
      <PageHeader>
        <PageHeaderHeading>
          Build beautiful AI apps in hours, not days.
        </PageHeaderHeading>
        <PageHeaderDescription>
          Beautifully designed chatbot components based on shadcn/ui. Fully
          customizable and owned by you.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm">
            <Link href="/docs">Get Started</Link>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <Link
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.github}
            >
              GitHub
            </Link>
          </Button>
        </PageActions>
      </PageHeader>

      <section>
        <PageHeader>
          <ChatDemo
            initialMessages={[
              {
                id: "1",
                role: "user",
                content: "What is shadcn-chatbot-kit?",
              },
              {
                id: "2",
                role: "assistant",
                content:
                  "shadcn-chatbot-kit is a toolkit to easily build chatbot UIs. It is a set of beautifully designed components based on shadcn/ui. It is fully customizable and owned by you.",
              },
            ]}
          />
        </PageHeader>
      </section>
    </div>
  )
}
