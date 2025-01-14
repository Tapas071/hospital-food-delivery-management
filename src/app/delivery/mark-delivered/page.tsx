"use client"
import Link from "next/link";
import { useState } from "react";

const MarkDeliveredPage = () => {
  const [deliveries, setDeliveries] = useState([
    { id: 1, name: "Meal Box #101", status: "Pending" },
    { id: 2, name: "Meal Box #102", status: "Pending" },
    { id: 3, name: "Meal Box #103", status: "Pending" },
  ]);

interface Delivery {
    id: number;
    name: string;
    status: string;
}

const handleMarkDelivered = (id: number): void => {
    setDeliveries((prevDeliveries: Delivery[]) =>
        prevDeliveries.map((delivery: Delivery) =>
            delivery.id === id ? { ...delivery, status: "Delivered" } : delivery
        )
    );
};

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full bg-green-600 text-white py-6 shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Mark Deliveries as Delivered</h1>
          <Link href="/delivery" className="hover:underline">
            Back to Delivery Portal
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Pending Deliveries
        </h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          {deliveries.length === 0 ? (
            <p className="text-gray-600">No pending deliveries.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {deliveries.map((delivery) => (
                <li
                  key={delivery.id}
                  className="flex justify-between items-center py-4"
                >
                  <span
                    className={`text-lg font-medium ${
                      delivery.status === "Delivered"
                        ? "text-green-600 line-through"
                        : "text-gray-800"
                    }`}
                  >
                    {delivery.name}
                  </span>
                  <button
                    className={`py-2 px-4 rounded-md ${
                      delivery.status === "Delivered"
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                    onClick={() => handleMarkDelivered(delivery.id)}
                    disabled={delivery.status === "Delivered"}
                  >
                    {delivery.status === "Delivered"
                      ? "Delivered"
                      : "Mark as Delivered"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default MarkDeliveredPage;
