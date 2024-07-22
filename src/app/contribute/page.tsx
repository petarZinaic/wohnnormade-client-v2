import Navbar from "../components/Navbar";

export default function Contribute() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-10">
        <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <div className="bg-orange text-white rounded-t-lg">
            <h1 className="text-2xl text-center font-bold mb-6 py-4">Report Tenant</h1>
          </div>
          <form className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tenantName">
                  Tenant Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="tenantName"
                  type="text"
                  placeholder="Tenant Name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tenantSurname">
                  Tenant Surname
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="tenantSurname"
                  type="text"
                  placeholder="Tenant Surname"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                  City
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="city"
                  type="text"
                  placeholder="City"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                  Country
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="country"
                  type="text"
                  placeholder="Country"
                />
              </div>
              <div className="mb-4 col-span-1 md:col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="violationType">
                  Violation Type
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="violationType"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Violation Type
                  </option>
                  <option value="rentNotPaid">Rent Not Paid</option>
                  <option value="propertyWrecked">Property Wrecked</option>
                </select>
              </div>
              <div className="mb-4 col-span-1 md:col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description of Violation
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  placeholder="Description"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-orange hover:bg-orangeDark0 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
