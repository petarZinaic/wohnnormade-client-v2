"use client";

import {useState} from "react";
import {AiOutlineClose, AiOutlineMenu} from "react-icons/ai";

import Image from "next/image";
import Link from "next/link";

import {usePathname} from "next/navigation";

function Navbar() {
  const [nav, setNav] = useState(true);
  const pathname = usePathname();

  function handleNav() {
    setNav(!nav);
  }

  return (
    <div className="z-20 bg-blueLight shadow-md fixed top-0 flex justify-between md:justify-around px-5 md:p-0 items-center h-15 sm:h-20 w-full mx-auto font-agency_bold">
      <Link href="/">
        <div>
          <Image
            src="/assets/icons/wohnnormade-logo.svg"
            alt="logo"
            width={100}
            height={80}
          />
        </div>
      </Link>
      <ul className="hidden md:flex text-sm text-white tracking-wider">
        <Link href="/">
          <li
            className={`px-6 lg:px-8 cursor-pointer uppercase ${pathname === "/" ? "underline text-green" : ""
              } hover:text-green`}
          >
            Home
          </li>
        </Link>
        <Link href="/contribute">
          <li
            className={`px-6 lg:px-8 cursor-pointer uppercase ${pathname === "/contribute" ? "underline text-green" : ""
              } hover:text-green`}
          >
            Contribute
          </li>
        </Link>
        <Link href="/search">
          <li
            className={`px-6 lg:px-8 cursor-pointer uppercase ${pathname === "/search" ? "underline text-green" : ""
              } hover:text-green`}
          >
            Search
          </li>
        </Link>
      </ul>
      <div>
        <div
          onClick={handleNav}
          className="block md:hidden cursor-pointer pr-4"
        >
          {!nav ? <AiOutlineClose size={20} style={{ color: 'white' }} /> : <AiOutlineMenu size={20} style={{ color: 'white' }} />}
        </div>
      </div>
      <div
        className={
          !nav
            ? "fixed left-0 top-0 w-[60%] h-full ease-in-out duration-500 shadow-lg bg-blueLight"
            : "fixed left-[-100%] z-20"
        }
      >
        <ul className="pt-24 uppercase text-white p-4 tracking-wider">
          <Link href="/">
            <li
              className={`p-4 cursor-pointer uppercase ${pathname === "/" ? "underline text-green" : ""
                } border-b border-gray`}
            >
              Home
            </li>
          </Link>
          <Link href="/contribute">
            <li
              className={`p-4 cursor-pointer uppercase ${pathname === "/contribute" ? "underline text-green" : ""
                } border-b border-gray`}
            >
              Contribute
            </li>
          </Link>
          <Link href="/search">
            <li
              className={`p-4 cursor-pointer uppercase ${pathname === "/search" ? "underline text-green" : ""
                } border-b border-gray`}
            >
              Search
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
