// import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative px-4 py-24 overflow-hidden isolate md:px-8 sm:py-32 2xl:px-0 xl:overflow-visible 2xl:container"
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-16 xl:container xl:grid-cols-2 xl:items-start xl:gap-y-10 xl:gap-x-10 xl:px-0">
        <div className="xl:col-span-2 xl:col-start-2 xl:row-start-1 xl:grid xl:w-full xl:gap-x-8 xl:px-0">
          <div className="">
            <div className="">
              <p className="text-base font-semibold leading-7 text-brand max-w-prose">
                Where It Started &amp; Where We’ve Been
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
                Our Journey from the Beginning
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-700 max-w-prose">
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
        <div className="xl:sticky xl:top-4 xl:col-start-1 xl:row-span-2 xl:row-start-1 xl:pt-24">
          <Image
            className="object-cover w-full max-w-3xl bg-gray-900 rounded-lg shadow-lg ring-1 ring-gray-400/10 max-h-96"
            src="/Buiding_With_Sign.webp"
            alt="BASES Sign"
            width={1080}
            height={1980}
            priority
          />
          {/* <Image
            className="rounded-lg bg-gray-900 shadow-lg ring-1 ring-gray-400/10 sm:w-[57rem] object-center block mx-auto sm:hidden"
            src="/Buiding_With_Sign_Mobile.webp"
            alt="BASES Sign"
            width={1010}
            height={1515}
          /> */}
        </div>
        <div className="xl:pr-4">
          <div className="text-base leading-7 text-gray-700 max-w-prose">
            <p>
              With the advent of the COVID pandemic, BASES swiftly adapted to
              the new normal, providing telehealth services. This leap allowed
              us to cater to the needs of people across Michigan, breaking the
              barriers of accessibility to treatment. Our dedication to adapting
              and staying updated has propelled us forward.
            </p>
            <p className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
              What’s Coming Next
            </p>
            <p className="mt-6">
              Owned by the Kellys, who share over 74 years of sobriety, BASES is
              an embodiment of personal, family-oriented care. We firmly believe
              in the contagious nature of recovery, and as we look ahead, we are
              ready to carry this belief forward under the new leadership of
              Leah Kelly. Leah, having been a part of BASES&apos; journey since
              the beginning, will gradually assume more directorial
              responsibilities. At BASES, we aim to continue providing the
              quality services our community relies on.
            </p>
            <p className="mt-8">
              Substance use disorders are treatable. Recovery is contagious and
              occurs within families and communities. Recovery from mental
              health issues and trauma is achievable with safe, stable, and
              nurturing environments. Contact BASES to work with our counselors
              and move towards a healthier you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
