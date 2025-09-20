"use client";

import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";

import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LanguageSelector from "./LanguageSelector";

function Navbar() {
  const [nav, setNav] = useState(true);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useTranslation();

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
      <ul className="hidden md:flex text-sm text-white tracking-wider items-center">
        <Link href="/">
          <li
            className={`px-6 lg:px-8 cursor-pointer uppercase ${
              pathname === "/" ? "underline text-orange" : ""
            } hover:text-orange`}
          >
            {t("navigation.home")}
          </li>
        </Link>
        <Link href="/contribute">
          <li
            className={`px-6 lg:px-8 cursor-pointer uppercase ${
              pathname === "/contribute" ? "underline text-orange" : ""
            } hover:text-orange`}
          >
            {t("navigation.contribute")}
          </li>
        </Link>
        <Link href="/search">
          <li
            className={`px-6 lg:px-8 cursor-pointer uppercase ${
              pathname === "/search" ? "underline text-orange" : ""
            } hover:text-orange`}
          >
            {t("navigation.search")}
          </li>
        </Link>

        {isAuthenticated ? (
          <>
            <Link href="/profile">
              <li
                className={`px-6 lg:px-8 cursor-pointer flex items-center ${
                  pathname === "/profile" ? "text-orange" : ""
                } hover:text-orange`}
                title={t("navigation.profile")}
              >
                <BsPersonFill size={24} />
              </li>
            </Link>
          </>
        ) : (
          <>
            <Link href="/login">
              <li
                className={`px-6 lg:px-8 cursor-pointer uppercase ${
                  pathname === "/login" ? "underline text-orange" : ""
                } hover:text-orange`}
              >
                {t("navigation.login")}
              </li>
            </Link>
          </>
        )}
        <li className="px-4">
          <LanguageSelector />
        </li>
      </ul>
      <div>
        <div
          onClick={handleNav}
          className="block md:hidden cursor-pointer pr-4"
        >
          {!nav ? (
            <AiOutlineClose size={20} style={{ color: "white" }} />
          ) : (
            <AiOutlineMenu size={20} style={{ color: "white" }} />
          )}
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
          <Link href="/" onClick={handleNav}>
            <li
              className={`p-4 cursor-pointer uppercase ${
                pathname === "/" ? "underline text-orange" : ""
              } border-b border-gray`}
            >
              {t("navigation.home")}
            </li>
          </Link>
          <Link href="/contribute" onClick={handleNav}>
            <li
              className={`p-4 cursor-pointer uppercase ${
                pathname === "/contribute" ? "underline text-orange" : ""
              } border-b border-gray`}
            >
              {t("navigation.contribute")}
            </li>
          </Link>
          <Link href="/search" onClick={handleNav}>
            <li
              className={`p-4 cursor-pointer uppercase ${
                pathname === "/search" ? "underline text-orange" : ""
              } border-b border-gray`}
            >
              {t("navigation.search")}
            </li>
          </Link>
          <li className="p-4 border-b border-gray">
            <div className="flex items-center justify-between">
              <span className="text-sm">🌐 {t("language.select")}</span>
              <LanguageSelector />
            </div>
          </li>
          {isAuthenticated ? (
            <>
              <Link href="/profile" onClick={handleNav}>
                <li
                  className={`p-4 cursor-pointer flex items-center ${
                    pathname === "/profile" ? "text-orange" : ""
                  } border-b border-gray`}
                  title={t("navigation.profile")}
                >
                  <BsPersonFill size={24} className="mr-2" />
                  <span className="uppercase">{t("navigation.profile")}</span>
                </li>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" onClick={handleNav}>
                <li
                  className={`p-4 cursor-pointer uppercase ${
                    pathname === "/login" ? "underline text-orange" : ""
                  } border-b border-gray`}
                >
                  {t("navigation.login")}
                </li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
