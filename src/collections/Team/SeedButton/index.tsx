import { Payload } from 'payload'
import { Button } from './Button'

export const SeedButton = async ({ payload }: { payload: Payload }) => {
  const { docs: team } = await payload.find({
    collection: 'team',
    depth: 0,
    limit: 1,
  })

  if (team.length > 0) return null

  return <Button />
}

export default SeedButton
