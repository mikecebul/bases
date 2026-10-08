import type { CollectionBeforeValidateHook } from 'payload'
import { getPlaiceholder } from 'plaiceholder'

export const generateBlurhash: CollectionBeforeValidateHook = async ({ data, operation, req }) => {
  if (operation === 'create' || operation === 'update') {
    try {
      const buffer = req?.file?.data
      const mimeType = req?.file?.mimetype

      if (buffer && mimeType?.startsWith('image/')) {
        const { base64 } = await getPlaiceholder(buffer, { size: 8 })

        return {
          ...data,
          blurhash: base64,
        }
      }
      return data
    } catch (error) {
      req.payload.logger.warn({ err: error, msg: 'Unable to generate image placeholder' })
      // A placeholder is optional; do not reject an otherwise valid upload (e.g. SVG).
      return { ...data, blurhash: null }
    }
  }
}
