import Footer from "@/components/Footer";
import Link from "next/link";

const ManagerPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="w-full bg-blue-600 text-white py-6 shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manager Dashboard</h1>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome, Hospital Food Manager
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/manager/patients"
            className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition"
          >
            <div>
              <h3 className="text-xl font-bold text-blue-600 mb-4">
                Manage Patients
              </h3>
              <p className="text-gray-600">
                Add, edit, or view patient details, including diet charts and
                allergies.
              </p>
            </div>
          </Link>
          <Link
            href="/manager/diet-charts"
            className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition"
          >
            <div>
              <h3 className="text-xl font-bold text-green-600 mb-4">
                Manage Diet Charts
              </h3>
              <p className="text-gray-600">
                Create and update meal plans for patients with specific dietary
                needs.
              </p>
            </div>
          </Link>
          <Link
            href="/manager/deliveries"
            className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition"
          >
            <div>
              <h3 className="text-xl font-bold text-yellow-600 mb-4">
                Track Deliveries
              </h3>
              <p className="text-gray-600">
                Monitor the status of food deliveries to patient rooms.
              </p>
            </div>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ManagerPage;
