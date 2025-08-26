import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { SubtitleBlock } from '@/blocks/SubtitleBlock/Component'
import { LineBreakBlock } from '@/blocks/LineBreakBlock/Component'
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

import type {
  MediaBlock as MediaBlockProps,
  SubtitleBlock as SubtitleBlockProps,
  LineBreakBlock as LineBreakBlockProps,
} from '@/payload-types'
import { cn } from '@/utilities/cn'
import Link from 'next/link'
import { addHTTPS } from '@/utilities/addHTTPS'
import { randomUUID } from 'crypto'
import { replaceDoubleCurlysRichText } from '@/utilities/replaceDoubleCurlysRichText'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<MediaBlockProps>
  | SerializedBlockNode<SubtitleBlockProps>
  | SerializedBlockNode<LineBreakBlockProps>

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
      text: ({ node }) => {
        const processedText = replaceDoubleCurlysRichText(node.text)
        return <span dangerouslySetInnerHTML={{ __html: processedText }} />
      },
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
          h1: 'text-5xl md:text-7xl font-bold tracking-tight text-balance max-w-prose pb-6',
          h2: 'text-4xl font-bold tracking-tight text-balance max-w-prose pb-4',
          h3: 'text-2xl font-semibold tracking-tight text-balance max-w-prose pb-4',
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
      quote: ({ node, nodesToJSX }) => {
        const children = nodesToJSX({
          nodes: node.children,
        })

        return (
          <blockquote className="py-4 pl-6 pr-3 my-6 italic border-l-4 rounded-r-lg text-muted-foreground border-brand bg-muted max-w-prose">
            {children}
          </blockquote>
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
        subtitleBlock: ({ node }) => <SubtitleBlock {...node.fields} />,
        lineBreakBlock: ({ node }) => <LineBreakBlock {...node.fields} />,
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
