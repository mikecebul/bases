import { Icons } from "./icons";

export default function Footer() {
  return (
    <footer className="rounded-t-md shadow bg-background/50">
      <div className="w-full mx-auto p-4 md:px-8 md:py-8 container 2xl:px-0">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://basesmi.org/"
            className="flex items-center mb-4 sm:mb-0"
          >
            <Icons.logo className="w-40 md:w-44 lg:w-64" />
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#about" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="mr-4 hover:underline md:mr-6 ">
                Services
              </a>
            </li>
            <li>
              <a href="#team" className="mr-4 hover:underline md:mr-6 ">
                Team
              </a>
            </li>
            <li>
              <a
                href="https://basesrecoverycenter.org/wp/wp-content/uploads/Preview-consent-document-SimplePractice.pdf"
                className="mr-4 hover:underline md:mr-6"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-autolg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center">
          © 2023{" "}
          <a href="https://basesmi.org/" className="hover:underline">
            BASES
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
