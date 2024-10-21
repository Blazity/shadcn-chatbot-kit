import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

import { BaseColor } from "@/registry/registry-base-colors"

type Config = {
  theme: BaseColor["name"]
  radius: number
}

const configAtom = atomWithStorage<Config>("config", {
  theme: "zinc",
  radius: 0.5,
})

export function useConfig() {
  return useAtom(configAtom)
}
