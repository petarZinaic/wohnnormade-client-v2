import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="container mx-auto p-4 mt-20 font-Montserrat">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="lg:w-1/2 text-center lg:text-left p-4">
            <h1 className="text-4xl font-bold mb-4">
              Who <span className="text-orange">NOT</span> to rent your apartment to?
            </h1>
            <p className="mb-6 text-lg text-gray-600">
              Find out which tenants didn’t pay for their rentals or left the place in a mess. Register and find the necessary information.
            </p>
            <button className="bg-orange hover:bg-orangeDark text-white py-2 px-6 rounded-lg">Register</button>
          </div>
          <div className="lg:w-1/2 flex justify-center p-4">
            <Image src="/assets/images/home-page-buildings.svg" alt="Buildings" width={700} height={400} />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center my-20">
          <div className="lg:w-1/2 flex justify-center p-4">
            <Image src="/assets/images/home-page-comunity.svg" alt="Tenants" width={700} height={400} />
          </div>
          <div className="lg:w-1/2 text-center lg:text-left p-4">
            <h2 className="text-2xl font-bold mb-4 text-orange">HELP FELLOW LANDLORDS</h2>
            <h3 className="text-xl mb-4">Become part of a community</h3>
            <p className="mb-6 text-lg text-gray-600">
              that alerts other landlords of tenants that damaged their property or didn’t pay for rent. Register and leave information about your bad experience to prevent others from having it.
            </p>
            <button className="bg-orange hover:bg-orangeDark text-white py-2 px-6 rounded-lg">Report tenant</button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
