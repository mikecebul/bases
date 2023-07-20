import Image from "next/image";

const staff = [
  {
    name: "D Scott Kelly",
    role: "Executive Director, Counselor, Recovery Coach",
    qualifications: "MA, CAADC, MAC, CCS",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Celia Partida-Kelly",
    role: "Program Director, Counselor, Recovery Coach",
    qualifications: "MA, LPC, CAADC, CTP, EMDR",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Leah Mayotte",
    role: "Clinical Supervisor, Counselor",
    qualifications: "MA, LPC, CAADC, CCS, CTP, EMDR",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Michael Cebulski",
    role: "Counselor, Recovery Coach",
    qualifications: "CADC-DP, CPRC",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Melanie Moran",
    role: "Recovery Coach",
    qualifications: "CPRC",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Leland Barta",
    role: "Office Manager",
    qualifications: "",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export default function Team() {
  return (
    <section id="team" className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h4 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet Our Leadership Team
          </h4>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our passionate and dedicated leadership team brings a wealth of
            experience and expertise in outpatient care. They lead by example,
            driven by a shared commitment to excellence and a relentless pursuit
            of positive outcomes for our patients.
          </p>
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          {staff.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <Image
                  className="h-16 w-16 rounded-full"
                  src={person.imageUrl}
                  alt=""
                  width={256}
                  height={256}
                />
                <div>
                  <p className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                    {person.name}
                  </p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {person.qualifications}
                  </p>
                  <p className="text-sm font-semibold leading-6 text-brand">
                    {person.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
