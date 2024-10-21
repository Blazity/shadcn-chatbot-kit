import fs from "fs"
import path from "path"
import { UnistNode, UnistTree } from "types/unist"
import { u } from "unist-builder"
import { visit } from "unist-util-visit"

import { Index } from "../__registry__"

export function rehypeComponent() {
  return async (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      // src prop overrides both name and fileName.
      const { value: srcPath } =
        (getNodeAttributeByName(node, "src") as {
          name: string
          value?: string
          type?: string
        }) || {}

      if (node.name === "ComponentSource") {
        const name = getNodeAttributeByName(node, "name")?.value as string
        const fileName = getNodeAttributeByName(node, "fileName")?.value as
          | string
          | undefined

        if (!name && !srcPath) {
          return null
        }

        try {
          let src: string

          if (srcPath) {
            src = srcPath
          } else {
            const component = Index[name]
            src = fileName
              ? component.files.find((file: string) => {
                  return (
                    file.endsWith(`${fileName}.tsx`) ||
                    file.endsWith(`${fileName}.ts`)
                  )
                }) || component.files[0]
              : component.files[0]
          }

          // Read the source file.
          const filePath = path.join(process.cwd(), src)
          let source = fs.readFileSync(filePath, "utf8")

          // Replace imports.
          source = source.replaceAll(`@/registry/default/`, "@/components/")
          source = source.replaceAll("export default", "export")

          // Add code as children so that rehype can take over at build time.
          node.children?.push(
            u("element", {
              tagName: "pre",
              properties: {
                __src__: src,
                __style__: "default",
              },
              attributes: [
                {
                  name: "styleName",
                  type: "mdxJsxAttribute",
                  value: "default",
                },
              ],
              children: [
                u("element", {
                  tagName: "code",
                  properties: {
                    className: ["language-tsx"],
                  },
                  children: [
                    {
                      type: "text",
                      value: source,
                    },
                  ],
                }),
              ],
            })
          )
        } catch (error) {
          console.error(error)
        }
      }

      if (node.name === "ComponentPreview") {
        const name = getNodeAttributeByName(node, "name")?.value as string

        if (!name) {
          return null
        }

        try {
          const component = Index[name]
          const src = component.files[0]

          // Read the source file.
          const filePath = path.join(process.cwd(), src)
          let source = fs.readFileSync(filePath, "utf8")

          // Replace imports.
          source = source.replaceAll(`@/registry/default/`, "@/components/")
          source = source.replaceAll("export default", "export")

          // Add code as children so that rehype can take over at build time.
          node.children?.push(
            u("element", {
              tagName: "pre",
              properties: {
                __src__: src,
              },
              children: [
                u("element", {
                  tagName: "code",
                  properties: {
                    className: ["language-tsx"],
                  },
                  children: [
                    {
                      type: "text",
                      value: source,
                    },
                  ],
                }),
              ],
            })
          )
        } catch (error) {
          console.error(error)
        }
      }
    })
  }
}

function getNodeAttributeByName(node: UnistNode, name: string) {
  return node.attributes?.find((attribute) => attribute.name === name)
}

function getComponentSourceFileContent(node: UnistNode) {
  const src = getNodeAttributeByName(node, "src")?.value as string

  if (!src) {
    return null
  }

  // Read the source file.
  const filePath = path.join(process.cwd(), src)
  const source = fs.readFileSync(filePath, "utf8")

  return source
}
