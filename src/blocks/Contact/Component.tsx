import type { CompanyInfo } from '@/payload-types'
import { HeroMedium } from '@/components/Hero/HeroMedium'
import Container from '@/components/Container'
import { ContactCard } from '@/components/Cards/ContactCard'
import { GoogleMap } from '@/globals/Footer/GoogleMap'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { SimplePracticeContact } from '@/components/SimplePracticeContact'

// export async function SimplePracticeBlock({
//   hasSubtitle,
//   subtitle,
//   title,
//   heading,
//   description,
//   buttonText,
//   buttonDescription,
// }: Props) {
//   return (
//     <Container>
//       <HeroMedium
//         subtitle={hasSubtitle && subtitle?.text ? subtitle.text : undefined}
//         title={title}
//         heading={heading}
//         description={description}
//       />

//       <div className="mb-12">
//         <ClickableCard buttonText={buttonText} buttonDescription={buttonDescription ?? 'Schedule Consultation'} />
//       </div>
//     </Container>
//   )
// }

type ContactPageProps = {
  title?: string
  description?: string
  contactFormTitle?: string
  contactFormDescription?: string
  contactFormButtonText?: string
  useCompanyInfo?: boolean
  customEmail?: string
  customPhone?: string
  customAddress?: string
}

export async function ContactPageBlock({
  title = "Contact Us",
  description = "Ready to take the next step in your wellness journey? We're here to help. Reach out to schedule an appointment, ask questions, or learn more about our services.",
  contactFormTitle = "Send Secure Message",
  contactFormDescription = "Use our HIPAA-compliant contact form to send us a secure message.",
  contactFormButtonText = "Open Contact Form",
  useCompanyInfo = true,
  customEmail,
  customPhone,
  customAddress,
}: ContactPageProps) {
  const companyInfo = (await getCachedGlobal('company-info')()) as CompanyInfo
  const { contact } = companyInfo

  // Use company info or custom values based on useCompanyInfo flag
  const email = useCompanyInfo && contact?.email ? contact.email : (customEmail || "contact@practice.com")
  const phone = useCompanyInfo && contact?.phone ? contact.phone : (customPhone || "(555) 123-4567")
  const address = useCompanyInfo && contact?.physicalAddress
    ? `${contact.physicalAddress.street}\n${contact.physicalAddress.cityStateZip}`
    : (customAddress || "123 Wellness Way\nSuite 200\nYour City, ST 12345")
  return (
    <Container>
      <HeroMedium
        title={title}
        heading="h1"
        description={description}
      />

      <div className="grid gap-8 mb-12 lg:grid-cols-2">
        <ContactCard
          type="address"
          title="Office Location & Hours"
          value={address}
          className="lg:min-h-full"
        >
          <div className="mt-6 space-y-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="mb-2 font-semibold text-foreground">Office Hours:</p>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monday - Thursday</span>
                  <span>10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday</span>
                  <span>10:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday & Sunday</span>
                  <span>By Appointment</span>
                </div>
              </div>
            </div>

            {contact ? (
              <GoogleMap contact={contact} />
            ) : (
              <div className="p-8 text-center border-2 border-dashed rounded-lg bg-muted/30 border-muted-foreground/20">
                <p className="text-sm text-muted-foreground">Map will display when contact info is provided</p>
              </div>
            )}
          </div>
        </ContactCard>

        <div className="space-y-6">

          <ContactCard
            type="form"
            title={contactFormTitle}
            description={contactFormDescription}
            value=""
          >
            <SimplePracticeContact
              buttonText={contactFormButtonText}
              className="w-full"
              card={false}
              variant="brand"
            />
            <p className="mt-3 text-sm text-left text-muted-foreground">
              Protected client portal for secure communication.
            </p>
          </ContactCard>
          <ContactCard
            type="email"
            title="Email"
            description="We respond to all emails within 24 hours."
            value={email}
            href={`mailto:${email}`}
          />

          <ContactCard
            type="phone"
            title="Phone"
            description="Available Mon-Fri, 9am-5pm."
            value={phone}
            href={`tel:${phone}`}
          />
        </div>
      </div>
    </Container>
  )
}