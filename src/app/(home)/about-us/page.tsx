import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn the history and future plans for BASES (Bay Area Substance Education Services).",
};

export default function AboutUs() {
  return (
    <div className="relative px-4 py-24 overflow-hidden lg:pb-32 isolate md:px-8 2xl:px-0 xl:overflow-visible 2xl:container">
      <div className="grid grid-cols-1 gap-x-8 gap-y-16 xl:container xl:grid-cols-2 xl:items-start xl:gap-y-10 xl:gap-x-10 xl:px-0">
        <div className="xl:col-start-1 xl:row-start-1 xl:grid xl:w-full xl:gap-x-8 xl:px-0">
          <p className="text-base font-semibold leading-7 text-brand max-w-prose">
            Where It Started &amp; Where We&apos;ve Been
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Our Journey from the Beginning
          </h2>
          <p className="mt-6 text-base font-normal leading-7 max-w-prose">
            BASES (Bay Area Substance Education Services), co-founded by Scott
            and Celia Kelly in 1993, originally began as a home-based operation
            addressing adolescent substance abuse. As we expanded to meet the
            needs of our community, we formed the Teen Center in 1995, providing
            a safe after-school space to tackle the rising concern of substance
            abuse among young people.
          </p>
        </div>
        <div className="xl:sticky xl:top-20 xl:col-start-2 xl:row-span-2 xl:row-start-1 xl:pt-2">
          <Image
            className="object-cover w-full max-w-3xl rounded-lg shadow-lg ring-1 ring-gray-400/10 max-h-96"
            src="/Buiding_With_Sign.webp"
            alt="BASES Sign"
            width={1080}
            height={1980}
            priority
          />
        </div>
        <div className="xl:pr-4">
          <div className="text-base leading-7 max-w-prose">
            <p>
              In 1997, we extended our services to the Recovery High program,
              providing substance abuse education and counseling. Although our
              primary focus was adolescent treatment until 2015, we also offered
              services for adults and provided resources in local schools,
              jails, and through community outreach.
            </p>
            <p className="mt-6">
              In 2015, after the Recovery High program ended, we transitioned
              our focus to adults. Recognizing the intricate connection between
              substance abuse, mental health, and trauma, we expanded our
              expertise to address these co-occurring issues.
            </p>
            <p className="mt-6">
              When the COVID pandemic hit, we adapted swiftly, initiating
              telehealth services that allowed us to expand our reach across
              Michigan and break down accessibility barriers to treatment. This
              commitment to evolving with the times and meeting changing needs
              is what led us to create our new domain, BASESmi.org.
            </p>
            <p className="mt-16 text-2xl font-bold tracking-tight">
              What’s Coming Next
            </p>

            <div className="text-base leading-7 max-w-prose">
              <p className="mt-6 text-base leading-7">
                BASES has always been personal and family-oriented for Scott and
                Celia. Collectively, they have over 74 years of sobriety. They
                are living proof that recovery can have a meaningful and lasting
                impact on a family system. Everyone always talks about addiction
                and mental health being prevalent in their family tree, but the
                Kelly&apos;s strive to also teach that recovery can run in
                families, too.
              </p>
              <p className="mt-6">
                As Scott and Celia plan to consider retirement of some sort in
                the next 8 years, they plan to pass the torch to their daughter,
                Leah, who has worked for BASES for many years and been along for
                the ride since the beginning. During the next few years, Leah
                will take on more director duties. BASES will continue to strive
                to meet the needs of the community and provide quality services
                that people have come to know and expect.
              </p>
              <p className="mt-6">
                Substance use disorders are very treatable. Recovery is
                contagious and happens in families and communities. Recovery
                from mental health and trauma happens with safe, stable, and
                nurturing people and places. Call BASES to work with our
                counselors as you work toward accomplishing your goals of a
                healthier version of you.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Inviting section */}
      <section className="pt-16 xl:pt-24">
        <Image
          alt="About Us"
          className="xl:mx-auto xl:aspect-[16/9] overflow-hidden rounded-xl object-cover object-center md:max-w-3xl"
          height="1600"
          src="/BASES_Flowers.png"
          width="900"
        />
      </section>
    </div>
  );
}
