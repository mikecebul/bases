import type { SimplePractice as SimplePracticeType, Page } from '@/payload-types'
import { HeroMedium } from '@/components/Hero/HeroMedium'
import { SimplePracticeContact } from '@/components/SimplePracticeContact'
import Container from '@/components/Container'

type Props = Extract<Page['layout'][number], SimplePracticeType>

export async function SimplePracticeBlock({
  hasSubtitle,
  subtitle,
  title,
  heading,
  description,
  buttonText,
  buttonDescription,
}: Props) {
  return (
    <Container>
      <div className="max-w-4xl mx-auto text-center">
        <HeroMedium
          subtitle={hasSubtitle && subtitle?.text ? subtitle.text : undefined}
          title={title}
          heading={heading}
          description={description}
        />

        <div className="mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-100 hover:border-blue-200 transition-all duration-200 hover:shadow-lg cursor-pointer group max-w-md mx-auto">
            <div className="flex items-center justify-start mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 9-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm text-green-700">Secure & HIPAA Compliant</p>
                <p className="text-xs text-green-600">Protected client portal</p>
              </div>
            </div>

            <SimplePracticeContact buttonText={buttonText} className="w-full" />

            {buttonDescription && (
              <p className="text-sm text-muted-foreground mt-3 text-left">
                {buttonDescription}
              </p>
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}