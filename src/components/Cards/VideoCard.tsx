'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { LinksBlock } from '@/payload-types'

type NonNullableLinkCards = Exclude<LinksBlock['linkCards'], null | undefined>
export type LinkCard = NonNullableLinkCards[number]

export const VideoCard = ({ card }: { card: LinkCard }) => {
  return (
    <a key={card.id} href={card.href} target="_blank">
      <Card className="flex flex-col h-full max-w-lg px-0 py-0 text-left shadow-sm bg-accent/60 hover:bg-accent group">
        <CardContent className="p-0 overflow-hidden rounded-t-md">
          <iframe
            src={card.href}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
            className="object-cover w-full transition-transform duration-300 ease-in-out max-h-72 group-hover:scale-105 rounded-t-lg"
          />
        </CardContent>
        <CardHeader>
          <CardTitle className="pb-1 capitalize text-pretty">{card.title}</CardTitle>
          <CardDescription className="">{card.description}</CardDescription>
        </CardHeader>
      </Card>
    </a>
  )
}
