import { CollectionAfterChangeHook } from 'payload'
import { replaceDoubleCurlys } from '@/plugins/lexical/replace-double-curlys'
import { serializeLexical } from '@/plugins/lexical/serializeLexical'

const processEmailRecipients = (emailString: string): string[] => {
  if (!emailString) return []
  
  return emailString
    .split(',')
    .map(email => email.trim())
    .filter(email => email.length > 0)
}

export const sendEmail: CollectionAfterChangeHook = async (args) => {
  const { operation, data, doc, req } = args

  if (operation === 'create') {
    const { form: formID, id: formSubmissionID, data: submissionData } = data || {}
    const { payload } = req

    try {
      const form = await payload.findByID({
        id: formID,
        collection: 'forms',
        req,
      })

      const emails = form.emails

      if (emails && emails.length) {
        const formattedEmails = await Promise.all(
          emails.map(async (email) => {
            const {
              bcc: emailBCC,
              cc: emailCC,
              emailFrom,
              emailTo: emailToFromConfig,
              message,
              replyTo: emailReplyTo,
              subject,
            } = email

            const defaultFromAddress = payload.email.defaultFromAddress
            const emailTo = emailToFromConfig ?? defaultFromAddress

            const toRaw = replaceDoubleCurlys(emailTo, submissionData)
            const ccRaw = emailCC ? replaceDoubleCurlys(emailCC, submissionData) : ''
            const bccRaw = emailBCC ? replaceDoubleCurlys(emailBCC, submissionData) : ''
            
            // Process recipients into arrays
            const to = processEmailRecipients(toRaw)
            const cc = ccRaw ? processEmailRecipients(ccRaw) : undefined
            const bcc = bccRaw ? processEmailRecipients(bccRaw) : undefined
            
            const from = replaceDoubleCurlys(emailFrom || defaultFromAddress, submissionData)
            const replyTo = replaceDoubleCurlys(
              emailReplyTo || emailFrom || defaultFromAddress,
              submissionData,
            )

            const serializedMessage = await serializeLexical(message, submissionData)

            return {
              bcc,
              cc,
              from,
              html: `<div>${serializedMessage}</div>`,
              replyTo,
              subject: replaceDoubleCurlys(subject, submissionData),
              to,
            }
          }),
        )

        await Promise.all(
          formattedEmails.map(async (email) => {
            const { to } = email
            try {
              const emailPromise = await payload.sendEmail(email)
              return emailPromise
            } catch (err: unknown) {
              payload.logger.error({
                err,
                msg: `Error while sending email to address: ${to}. Email not sent.`,
              })
            }
          }),
        )
      } else {
        payload.logger.info({ msg: 'No emails to send.' })
      }
    } catch (err: unknown) {
      const msg = `Error while sending one or more emails in form submission id: ${formSubmissionID}.`
      payload.logger.error({ err, msg })
    }
  }

  return doc
}