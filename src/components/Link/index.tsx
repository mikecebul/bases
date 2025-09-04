'use client'

import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from 'src/utilities/cn'
import Link from 'next/link'
import React from 'react'

import type { Media, Page } from '@/payload-types'
import { useSimplePracticeWidget } from '@/hooks/useSimplePracticeWidget'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | React.MouseEventHandler<HTMLButtonElement>
  reference?: {
    relationTo: 'pages' | 'media'
    value: Page | Media | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | 'contactForm' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    onClick,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const { openWidget } = useSimplePracticeWidget({
    scopeId: "d2835c56-8608-4653-b0d9-d6f24a6a62e1",
    scopeUri: "leah-mayotte",
    applicationId: "7c72cb9f9a9b913654bb89d6c7b4e71a77911b30192051da35384b4d0c6d505b",
    channel: "embedded_widget",
    type: "Contact form"
  })

  const href =
    type === 'reference' && typeof reference?.value === 'object'
      ? reference?.relationTo === 'media' && 'url' in reference.value
        ? reference.value.url // Use the URL from the Media object
        : reference?.relationTo === 'pages' && 'slug' in reference.value
          ? `/${reference.value.slug}` // Use the slug from the Page object
          : null
      : url

  if (type === 'contactForm') {
    const size = appearance === 'link' ? 'clear' : sizeFromProps

    /* Ensure we don't break any styles set by richText */
    if (appearance === 'inline') {
      return (
        <button
          className={cn(className)}
          onClick={openWidget}
        >
          {label && label}
          {children && children}
        </button>
      )
    }

    return (
      <Button
        className={className}
        size={size}
        variant={appearance}
        onClick={openWidget}
      >
        {label && label}
        {children && children}
      </Button>
    )
  }

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link
        className={cn(className)}
        href={href || url || ''}
        {...newTabProps}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button
      asChild
      className={className}
      size={size}
      variant={appearance}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
    >
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
