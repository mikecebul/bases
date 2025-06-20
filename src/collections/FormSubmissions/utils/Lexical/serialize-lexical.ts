import type { HTMLConverter, SerializedLexicalNodeWithParent } from './types'

import { defaultHTMLConverters } from './default-converters'

export async function serializeLexical(data?: any, submissionData?: any): Promise<string> {
  const converters: HTMLConverter[] = defaultHTMLConverters

  if (data?.root?.children?.length) {
    return await convertLexicalNodesToHTML({
      converters,
      lexicalNodes: data?.root?.children,
      parent: data?.root,
      submissionData,
    })
  }
  return ''
}

export async function convertLexicalNodesToHTML({
  converters,
  lexicalNodes,
  parent,
  submissionData,
}: {
  converters: HTMLConverter[]
  lexicalNodes: any[]
  parent: SerializedLexicalNodeWithParent
  submissionData?: any
}): Promise<string> {
  // Log the nodes we're trying to convert
  console.log('Nodes to convert:', JSON.stringify(lexicalNodes, null, 2))
  console.log('Parent:', JSON.stringify(parent, null, 2))

  const unknownConverter = converters.find((converter) => converter.nodeTypes.includes('unknown'))

  const htmlArray = await Promise.all(
    lexicalNodes.map(async (node, i) => {
      const converterForNode = converters.find((converter) =>
        converter.nodeTypes.includes(node.type),
      )
      if (!converterForNode) {
        if (unknownConverter) {
          return unknownConverter.converter({
            childIndex: i,
            converters,
            node,
            parent,
            submissionData,
          })
        }
        return '<span>unknown node</span>'
      }

      return converterForNode.converter({
        childIndex: i,
        converters,
        node,
        parent,
        submissionData,
      })
    }),
  )

  return htmlArray.join('') || ''
}
