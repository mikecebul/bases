import { siteConfig } from "@/config/site";

export default function Page() {
  return (
    <div className="flex flex-col px-4 py-16 lg:py-24 2xl:container md:px-8 2xl:px-0 xl:items-center xl:text-center">
      <div className="mb-16 xl:mb-24 max-w-2xl">
        <p className="text-base font-semibold leading-7 text-brand">HEAL</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Videos for the HEAL group
        </h1>
      </div>
      <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-16">
        {siteConfig.HEAL.map((item) => (
          <div key={item.title} className="rounded-md bg-gray-200 text-left">
            <iframe
              src={item.href}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
              className="rounded-t-md w-full h-96 object-cover"
            />
            <p className="text-black px-4 pt-8 font-semibold text-lg leading-7">
              {item.title}
            </p>
            <p className="px-4 pb-4 mt-2 leading-7 text-gray-600">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
