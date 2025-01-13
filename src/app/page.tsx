import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <header className="w-full bg-blue-600 text-white py-6 shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Hospital Food Delivery Management
          </h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/manager">
                  <div className="hover:underline">Manager</div>
                </Link>
              </li>
              <li>
                <Link href="/pantry">
                  <div className="hover:underline">Pantry</div>
                </Link>
              </li>
              <li>
                <Link href="/delivery">
                  <div className="hover:underline">Delivery</div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center flex-1 text-center px-4">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome to the Hospital Food Delivery Management System
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Efficiently manage patient diet plans, pantry tasks, and food
          delivery.
        </p>
        <div className="space-x-4">
          <Link href="/manager">
            <div className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700">
              Manager Portal
            </div>
          </Link>
          <Link href="/pantry">
            <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700">
              Pantry Portal
            </div>
          </Link>
          <Link href="/delivery">
            <div className="bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-700">
              Delivery Portal
            </div>
          </Link>
        </div>
      </main>
      <footer className="w-full bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>
            © {new Date().getFullYear()} Hospital Food Delivery Management
            System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
