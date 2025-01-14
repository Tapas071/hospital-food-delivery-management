"use client"
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";

const DeliveryPortal = () => {
  interface Task {
    id: number;
    title: string;
    description: string;
    link: string;
    color: string;
  }
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call to fetch tasks
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await new Promise((resolve) =>
          setTimeout(
            () =>
              resolve([
                {
                  id: 1,
                  title: "Assigned Deliveries",
                  description: "Check details of meal boxes to be delivered.",
                  link: "/delivery/assigned-tasks",
                  color: "yellow",
                },
                {
                  id: 2,
                  title: "Mark as Delivered",
                  description: "Update delivery status for meal boxes.",
                  link: "/delivery/mark-delivered",
                  color: "green",
                },
              ]),
            1000
          )
        );
        setTasks(response as Task[]);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full bg-yellow-600 text-white py-6 shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Delivery Portal</h1>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome, Delivery Personnel
        </h2>
        {loading ? (
          <div className="text-center text-gray-600">
            <p>Loading tasks...</p>
          </div>
        ) : tasks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <Link
                key={task.id}
                href={task.link}
                className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition"
              >
                <div>
                  <h3
                    className={`text-xl font-bold text-${task.color}-600 mb-4`}
                  >
                    {task.title}
                  </h3>
                  <p className="text-gray-600">{task.description}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600">
            <p>No tasks available.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DeliveryPortal;
