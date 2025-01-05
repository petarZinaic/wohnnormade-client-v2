import Image from "next/image";

export default function Footer() {
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
          <p className="mb-2">Make sure to read our terms of use and privacy policy.</p>
          <p>Register and become a part of our community.</p>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4 py-2 bg-orange w-full">
        <p className="text-white">Copyright © All rights reserved.</p>
      </div>
    </footer>
  );
}
