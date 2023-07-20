import Link from "next/link";
import { Icons } from "./icons";

export default function Footer() {
  return (
    <footer className="rounded-t-md shadow bg-background/50">
      <div className="w-full mx-auto p-4 md:px-8 md:py-8 container 2xl:px-0">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="/">
            <Icons.logo className="w-40 md:w-44 lg:w-64" />
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link href="#about" className="mr-4 hover:underline md:mr-6 ">
                About
              </Link>
            </li>
            <li>
              <Link href="#services" className="mr-4 hover:underline md:mr-6 ">
                Services
              </Link>
            </li>
            <li>
              <Link href="#team" className="mr-4 hover:underline md:mr-6 ">
                Team
              </Link>
            </li>
            <li>
              <Link
                href="https://basesrecoverycenter.org/wp/wp-content/uploads/Preview-consent-document-SimplePractice.pdf"
                className="mr-4 hover:underline md:mr-6"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-autolg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center">
          © {new Date().getFullYear()}{" "}
          <Link href="https://basesmi.org/" className="hover:underline">
            BASES
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
