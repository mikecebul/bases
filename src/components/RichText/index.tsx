import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'
import { cn } from '@/utilities/cn'
import Link from 'next/link'
import { addHTTPS } from '@/utilities/addHTTPS'
import { randomUUID } from 'crypto'

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<MediaBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return `/${slug}`
}

const jsxConverters = (paragraphClassName?: string): JSXConvertersFunction<NodeTypes> => {
  return function converters({ defaultConverters }) {
    return {
      ...defaultConverters,
      paragraph: ({ node, nodesToJSX }) => {
        const children = nodesToJSX({
          nodes: node.children,
        })

        return (
          <p className={cn('text-primary max-w-prose pb-3 text-pretty', paragraphClassName)}>
            {children}
          </p>
        )
      },
      heading: ({ node, nodesToJSX }) => {
        const children = nodesToJSX({
          nodes: node.children,
        })

        const Tag = node?.tag
        const textSizeMap = {
          h1: 'text-5xl md:text-7xl font-bold tracking-tight text-balance max-w-prose pb-12',
          h2: 'text-4xl font-bold tracking-tight text-balance max-w-prose pb-4 pt-6',
          h3: 'text-2xl font-semibold tracking-tight text-balance max-w-prose pb-6',
          h4: 'text-xl font-semibold tracking-tight text-balance max-w-prose pb-4',
          h5: 'text-xl font-medium tracking-tight text-balance max-w-prose pb-4',
          h6: 'text-lg font-medium tracking-tight text-balance max-w-prose pb-4',
        }
        const textSizeClass = textSizeMap[Tag] || 'text-lg'

        return <Tag className={cn('prose text-pretty', textSizeClass)}>{children}</Tag>
      },
      autolink: ({ node, nodesToJSX }) => {
        const children = nodesToJSX({
          nodes: node.children,
        })

        const rel: string | undefined = node.fields.newTab ? 'noopener noreferrer' : undefined
        const target: string | undefined = node.fields.newTab ? '_blank' : undefined

        return (
          <a href={node.fields.url} className="text-red-600 underline" {...{ rel, target }}>
            {children}
          </a>
        )
      },
      link: ({ node, nodesToJSX }) => {
        const children = nodesToJSX({
          nodes: node.children,
        })

        const rel: string | undefined = node.fields.newTab ? 'noopener noreferrer' : undefined
        const target: string | undefined = node.fields.newTab ? '_blank' : undefined

        let href: string = node.fields.url ?? ''
        if (node.fields.linkType === 'internal') {
          if (internalDocToHref) {
            href = internalDocToHref({ linkNode: node })
          } else {
            console.error(
              'Lexical => JSX converter: Link converter: found internal link, but internalDocToHref is not provided',
            )
            href = '#' // fallback
          }
        }
        if (node.fields.linkType === 'custom') {
          return (
            <a
              href={addHTTPS(href)}
              className="font-semibold underline decoration-blue-700 decoration-2 underline-offset-1"
              {...{ rel, target }}
            >
              {children}
            </a>
          )
        }
        if (node.fields.linkType === 'internal') {
          return (
            <Link
              href={href}
              className="font-semibold underline decoration-blue-700 decoration-2 underline-offset-1"
              {...{ rel, target }}
            >
              {children}
            </Link>
          )
        }
      },
      list: ({ node, nodesToJSX }) => {
        const children = nodesToJSX({
          nodes: node.children,
        })

        const NodeTag = node.tag

        return (
          <NodeTag
            className={cn('ml-10 max-w-prose list-none pb-3 text-pretty', {
              'list-disc': node.listType === 'bullet',
              'list-decimal': node.listType === 'number',
              'list-check': node.listType === 'check',
            })}
          >
            {children}
          </NodeTag>
        )
      },
      listitem: ({ node, nodesToJSX, parent }) => {
        const hasSubLists = node.children.some((child) => child.type === 'list')

        const children = nodesToJSX({
          nodes: node.children,
        })

        if ('listType' in parent && parent?.listType === 'check') {
          const uuid = randomUUID()

          return (
            <li
              aria-checked={node.checked ? 'true' : 'false'}
              className={`list-item-checkbox${node.checked ? 'list-item-checkbox-checked' : 'list-item-checkbox-unchecked'}${hasSubLists ? 'nestedListItem' : ''}`}
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
              role="checkbox"
              style={{ listStyleType: 'inherit' }}
              tabIndex={-1}
              value={node?.value}
            >
              {hasSubLists ? (
                children
              ) : (
                <>
                  <input checked={node.checked} id={uuid} readOnly={true} type="checkbox" />
                  <label htmlFor={uuid}>{children}</label>
                  <br />
                </>
              )}
            </li>
          )
        }

        return (
          <li className={`${hasSubLists ? '' : ''}`} value={node?.value}>
            {children}
          </li>
        )
      },
      blocks: {
        mediaBlock: ({ node }) => (
          <MediaBlock
            className="col-span-3 col-start-1"
            imgClassName="m-0"
            {...node.fields}
            captionClassName="mx-auto max-w-[48rem]"
            enableGutter={false}
            disableInnerContainer={true}
          />
        ),
      },
    }
  }
}

export type RichTextContent = DefaultTypedEditorState

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
  paragraphClassName?: string
} & React.HTMLAttributes<HTMLDivElement>

export function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, paragraphClassName, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters(paragraphClassName)}
      className={cn(
        '',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'prose md:prose-md dark:prose-invert mx-auto': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
