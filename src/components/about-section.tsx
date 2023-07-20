// import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
          />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-brand">
                Where It Started &amp; Where We’ve Been
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our Journey from the Beginning
              </h2>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                Co-founded by Scott and Celia Kelly in 1993, BASES initially
                functioned as a home business, evolving into a
                community-centered operation addressing the rise of substance
                abuse issues among the youth. Expanding our focus in 2015, we
                now provide aid for adults battling substance abuse, mental
                health issues, and trauma.
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <Image
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] object-center block mx-auto"
            src="/Buiding_With_Sign.webp"
            alt="BASES Sign"
            width={1080}
            height={1980}
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <p>
                With the advent of the COVID pandemic, BASES swiftly adapted to
                the new normal, providing telehealth services. This leap allowed
                us to cater to the needs of people across Michigan, breaking the
                barriers of accessibility to treatment. Our dedication to
                adapting and staying updated has propelled us forward.
              </p>
              <p className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                What’s Coming Next
              </p>
              <p className="mt-6">
                Owned by the Kellys, who share over 74 years of sobriety, BASES
                is an embodiment of personal, family-oriented care. We firmly
                believe in the contagious nature of recovery, and as we look
                ahead, we are ready to carry this belief forward under the new
                leadership of Leah Kelly. Leah, having been a part of
                BASES&apos; journey since the beginning, will gradually assume
                more directorial responsibilities. At BASES, we aim to continue
                providing the quality services our community relies on.
              </p>
              <p className="mt-8">
                Substance use disorders are treatable. Recovery is contagious
                and occurs within families and communities. Recovery from mental
                health issues and trauma is achievable with safe, stable, and
                nurturing environments. Contact BASES to work with our
                counselors and move towards a healthier you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
