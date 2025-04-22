'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'
import type { LinkCard as LinkCardType } from './VideoCard'

export const LinkCard = ({ card }: { card: LinkCardType }) => {
  return (
    <a key={card.title} href={card.href} target="_blank">
      <Card className="flex flex-col h-full max-w-lg px-0 py-0 text-left shadow-sm bg-accent/60 hover:bg-accent group">
        <CardContent className="p-0 overflow-hidden rounded-t-lg">
          {card.linkType === 'link' &&
            typeof card.image === 'object' &&
            typeof card.image?.url === 'string' && (
              <Image
                src={card.image.url}
                alt={card.image.alt}
                width={800}
                height={800}
                className="object-cover transition-transform duration-300 ease-in-out max-h-60 group-hover:scale-105"
              />
            )}
        </CardContent>
        <CardHeader>
          <CardTitle className="pb-1 capitalize text-pretty">{card.title}</CardTitle>
          <CardDescription className="">{card.description}</CardDescription>
        </CardHeader>
      </Card>
    </a>
  )
}
