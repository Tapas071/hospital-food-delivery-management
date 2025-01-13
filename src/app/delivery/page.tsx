import Footer from "@/components/Footer";
import Link from "next/link";

const DeliveryPortal = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="w-full bg-yellow-600 text-white py-6 shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Delivery Portal</h1>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome, Delivery Personnel
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/delivery/assigned-tasks"
            className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition"
          >
            <div>
              <h3 className="text-xl font-bold text-yellow-600 mb-4">
                View Assigned Deliveries
              </h3>
              <p className="text-gray-600">
                Check details of meal boxes to be delivered.
              </p>
            </div>
          </Link>
          <Link
            href="/delivery/mark-delivered"
            className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition"
          >
            <div>
              <h3 className="text-xl font-bold text-green-600 mb-4">
                Mark as Delivered
              </h3>
              <p className="text-gray-600">
                Update delivery status for meal boxes.
              </p>
            </div>
          </Link>
        </div>
      </main>
    <Footer/>
    </div>
  );
};

export default DeliveryPortal;
