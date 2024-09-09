import crypto from 'crypto'

const createKeyFromSecret = (secretKey: string): string =>
  crypto.createHash('sha256').update(secretKey).digest('hex').slice(0, 32)

const algorithm = 'aes-256-ctr'

export const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(
    algorithm,
    createKeyFromSecret(process.env.PAYLOAD_SECRET!),
    iv,
  )

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])

  const ivString = iv.toString('hex')
  const encryptedString = encrypted.toString('hex')

  const result = `${ivString}${encryptedString}`
  return result
}
