import Footer from "@/components/Footer";
import Link from "next/link";

const PantryPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="w-full bg-green-600 text-white py-6 shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Pantry Dashboard</h1>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome, Pantry Staff
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/pantry/tasks"
            className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition"
          >
            <div>
              <h3 className="text-xl font-bold text-green-600 mb-4">
                View Assigned Tasks
              </h3>
              <p className="text-gray-600">
                Check meal preparation tasks assigned by the manager.
              </p>
            </div>
          </Link>
          <Link
            href="/pantry/delivery-personnel"
            className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition"
          >
            <div>
              <h3 className="text-xl font-bold text-blue-600 mb-4">
                Manage Delivery Personnel
              </h3>
              <p className="text-gray-600">
                Add and update delivery personnel details.
              </p>
            </div>
          </Link>
          <Link
            href="/pantry/deliveries"
            className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition"
          >
            <div>
              <h3 className="text-xl font-bold text-yellow-600 mb-4">
                Track Deliveries
              </h3>
              <p className="text-gray-600">
                Monitor meal delivery status and update tasks.
              </p>
            </div>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PantryPage;

