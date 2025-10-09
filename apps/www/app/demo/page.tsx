"use client"

import { useState } from "react"
import Link from "next/link"

import { DemoChat } from "@/components/demo-chat"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select"
import { Button } from "@/registry/new-york/ui/button"

// Available demo models
const MODELS = [
  { id: "llama-3.3-70b-versatile", name: "Llama 3.3 70B" },
  { id: "openai/gpt-oss-120b", name: "GPT-OSS 120B" },
]

export default function DemoPage() {
  const [selectedModel, setSelectedModel] = useState(MODELS[0].id)

  return (
    <div className="relative min-h-screen w-full bg-background p-4">
      {/* Navigation & controls */}
      <div className="absolute left-4 top-4 z-10 flex gap-2">
        <Button asChild variant="outline" size="sm">
          <Link href="/">← Back to site</Link>
        </Button>
      </div>

      <div className="absolute right-4 top-4 z-10">
        <Select value={selectedModel} onValueChange={setSelectedModel}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Model" />
          </SelectTrigger>
          <SelectContent>
            {MODELS.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                {model.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Chat */}
      <div className="mx-auto h-[calc(100vh-2rem)] w-full max-w-4xl">
        <DemoChat model={selectedModel} className="h-full" />
      </div>
    </div>
  )
}
