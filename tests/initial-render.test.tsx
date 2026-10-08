import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createRequire } from 'node:module'
import { renderToStaticMarkup } from 'react-dom/server'
import type { Media, Service, Team } from '../src/payload-types'

// Match Next's CommonJS interop for its image component when rendering in Node.
const require = createRequire(import.meta.url)
const { ImageMedia } = require('../src/components/Media/ImageMedia')
const { ServicesList } = require('../src/components/ServicesList')
const { TeamMemberBlock } = require('../src/blocks/TeamMember/Component')

const image: Media = {
  id: 'portrait',
  alt: 'Team portrait',
  url: '/portrait.webp',
  width: 800,
  height: 1000,
  createdAt: '2026-01-01',
  updatedAt: '2026-01-01',
}

test('CMS photos without a generated blur include an inline placeholder in the initial HTML', () => {
  const html = renderToStaticMarkup(<ImageMedia resource={image} />)
  assert.match(html, /background-image:url\(/)
  assert.match(html, /data:image\/svg\+xml/)
  assert.match(html, /portrait\.webp/)
})

test('a generated blur is preferred to the generic fallback', () => {
  const blurhash = 'data:image/png;base64,custom-generated-placeholder'
  const html = renderToStaticMarkup(<ImageMedia resource={{ ...image, blurhash }} />)
  assert.match(html, /custom-generated-placeholder/)
})

test('service icons are visible initially while the text retains its entrance animation', () => {
  const services = [
    { id: 'counseling', title: 'Counseling', icon: 'Brain', desc: 'Individual sessions' },
  ] as Service[]
  const html = renderToStaticMarkup(<ServicesList services={services} />)
  assert.match(html, /<svg/)
  assert.match(html, /lucide-brain/)
  assert.match(html, /Counseling/)
  assert.equal((html.match(/<svg/g) || []).length, 1)
  const beforeIcon = html.slice(0, html.indexOf('<svg'))
  assert.doesNotMatch(beforeIcon, /opacity:0|visibility:hidden|translateX|display:none/)
  assert.match(html, /<span[^>]*style="opacity:0;transform:translateX/)
  assert.match(html, /<dd[^>]*style="opacity:0;transform:translateX/)
  assert.match(html, /motion-reduce:opacity-100!/)
})

test('team portraits have a first-render placeholder and start loading eagerly', () => {
  const teamMember = { id: 'team-member', name: 'Team Member', role: 'Counselor', image } as Team
  const html = renderToStaticMarkup(<TeamMemberBlock teamMember={teamMember} />)
  assert.match(html, /background-image:url\(/)
  assert.doesNotMatch(html, /loading="lazy"/)
  assert.match(html, /rel="preload"/)
  assert.doesNotMatch(html, /style="opacity:0"/)
})
