"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-blueLight text-white text-center pt-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <Image
              src="/assets/icons/wohnnormade-logo.svg"
              alt="logo"
              width={100}
              height={80}
            />
          </div>
          <div className="mb-2 flex gap-4">
            <Link
              href="/terms-of-use"
              className="text-white hover:text-orange transition-colors underline"
            >
              {t("register.termsOfUse")}
            </Link>
            <span>|</span>
            <Link
              href="/privacy-policy"
              className="text-white hover:text-orange transition-colors underline"
            >
              {t("register.privacyPolicy")}
            </Link>
          </div>
          <p>{t("footer.communityMessage")}</p>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4 py-2 bg-orange w-full">
        <p className="text-white">{t("footer.copyright")}</p>
      </div>
    </footer>
  );
}
