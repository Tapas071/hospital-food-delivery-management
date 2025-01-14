"use client"

import Link from "next/link";
import { useState } from "react";

const AssignedTasksPage = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      mealBox: "Meal Box #101",
      address: "patient No 102",
      status: "Pending",
    },
    {
      id: 2,
      mealBox: "Meal Box #102",
      address: "patient No 19",
      status: "In Progress",
    },
    {
      id: 3,
      mealBox: "Meal Box #103",
      address: "patient No 87",
      status: "Delivered",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full bg-yellow-600 text-white py-6 shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Assigned Delivery Tasks</h1>
          <Link href="/delivery" className="hover:underline">
            Back to Delivery Portal
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Your Assigned Deliveries
        </h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          {tasks.length === 0 ? (
            <p className="text-gray-600">No assigned tasks at the moment.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4"
                >
                  <div>
                    <p className="text-lg font-medium text-gray-800">
                      {task.mealBox}
                    </p>
                    <p className="text-gray-600">{task.address}</p>
                  </div>
                  <span
                    className={`mt-2 sm:mt-0 inline-block py-1 px-3 rounded-full text-sm ${
                      task.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : task.status === "In Progress"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {task.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default AssignedTasksPage;
