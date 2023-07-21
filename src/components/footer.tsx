import Link from "next/link";
import { Icons } from "./icons";

export default function Footer() {
  return (
    <footer className="shadow rounded-t-md bg-background/50">
      <div className="w-full p-4 mx-auto 2xl:container md:px-8 md:py-8 2xl:px-0">
        <div className="sm:flex sm:items-center sm:justify-between xl:grid xl:grid-cols-3">
          <Link href="/">
            <Icons.logo className="w-40 pb-4 sm:pb-0 md:w-44 lg:w-64" />
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 xl:justify-center sm:mb-0 dark:text-gray-400">
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
          <div className="text-sm text-gray-500 sm:mb-0 dark:text-gray-400 sm:flex sm:flex-col sm:items-end">
            <div className="">
              <p>101 M-66 N,</p>
              <p>Charlevoix, MI 49720</p>
              <p>Phone: (123) 547-1144</p>
              <p>Fax: (123) 547-4970</p>
            </div>
          </div>
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
