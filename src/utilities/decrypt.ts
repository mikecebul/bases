import crypto from 'crypto'

const createKeyFromSecret = (secretKey: string): string =>
  crypto.createHash('sha256').update(secretKey).digest('hex').slice(0, 32)

const algorithm = 'aes-256-ctr'

export const decrypt = (hash: string): string => {
  const iv = hash.slice(0, 32)
  const content = hash.slice(32)

  const decipher = crypto.createDecipheriv(
    algorithm,
    createKeyFromSecret(process.env.PAYLOAD_SECRET!),
    Buffer.from(iv, 'hex'),
  )

  const decrypted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()])

  const result = decrypted.toString()
  return result
}
