"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MealsPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [form, setForm] = useState<FormState>({
    mealName: "",
    ingredients: "",
    mealType: "Morning",
    instructions: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch meals
  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const { data } = await axios.get("/api/manager/meal");
      setMeals(data.data);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  interface Meal {
    _id: string;
    mealName: string;
    ingredients: string[];
    mealType: string;
    instructions?: string;
  }

  interface FormState {
    mealName: string;
    ingredients: string;
    mealType: string;
    instructions: string;
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const { name, value } = e.target;
    setForm((prev: FormState) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      if (isEditing) {
        await axios.put(`/api/manager/meal/${editingId}`, {
          ...form,
          ingredients: form.ingredients.split(",").map((i: string) => i.trim()),
        });
      } else {
        await axios.post("/api/manager/meal", {
          ...form,
          ingredients: form.ingredients.split(",").map((i: string) => i.trim()),
        });
      }
      fetchMeals();
      resetForm();
    } catch (error) {
      console.error("Error saving meal:", error);
    }
  };

  const handleEdit = (meal: Meal): void => {
    setIsEditing(true);
    setEditingId(meal._id);
    setForm({
      mealName: meal.mealName,
      ingredients: meal.ingredients.join(", "),
      mealType: meal.mealType,
      instructions: meal.instructions || "",
    });
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await axios.delete(`/api/manager/meal/${id}`);
      fetchMeals();
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };

  const resetForm = () => {
    setForm({
      mealName: "",
      ingredients: "",
      mealType: "Morning",
      instructions: "",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl text-blue-700 font-bold text-center mb-8">
        Meal Manager
      </h1>
      <div className="max-w-4xl mx-auto">
        {/* Form */}
        <form
          className="bg-white shadow-md rounded-lg p-6 mb-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-bold mb-4">
            {isEditing ? "Edit Meal" : "Add New Meal"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="mealName"
              value={form.mealName}
              onChange={handleInputChange}
              placeholder="Meal Name"
              className="p-2 border border-gray-300 rounded-lg shadow-sm text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-400 transition"
              required
            />
            <input
              type="text"
              name="ingredients"
              value={form.ingredients}
              onChange={handleInputChange}
              placeholder="Ingredients (comma-separated)"
              className="p-2 border border-gray-300 rounded-lg shadow-sm text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-400 transition"
              required
            />
            <select
              name="mealType"
              value={form.mealType}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-lg shadow-sm text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-400 transition"
              required
            >
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
              <option value="Dinner">Dinner</option>
            </select>
            <textarea
              name="instructions"
              value={form.instructions}
              onChange={handleInputChange}
              placeholder="Instructions"
              className="p-2 border border-gray-300 rounded-lg shadow-sm text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-400 transition"
            ></textarea>
          </div>
          <div className="mt-4 flex justify-end space-x-4">
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {isEditing ? "Update" : "Add"}
            </button>
          </div>
        </form>

        {/* Meal List */}
        <div className="bg-white shadow-lg rounded-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Meal List</h2>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {meals.length} Meals
            </span>
          </div>

          {meals.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-lg mb-2">No meals found</p>
              <p className="text-gray-400 text-sm">
                Add your first meal using the form above
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      Meal Name
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      Ingredients
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      Meal Type
                    </th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {meals.map((meal) => (
                    <tr
                      key={meal._id}
                      className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                    >
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {meal.mealName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {meal.ingredients.join(", ")}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                           text-black bg-gray-100
                  {meal.mealType === 'Morning' && 'bg-green-100 text-green-800'}
                  {meal.mealType === 'Evening' && 'bg-purple-100 text-purple-800'}
                  {meal.mealType === 'Dinner' && 'bg-blue-100 text-blue-800'}"
                        >
                          {meal.mealType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => handleEdit(meal)}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:border-blue-500 hover:text-blue-500 transition-colors duration-150 ease-in-out"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(meal._id)}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-red-600 bg-red-50 hover:bg-red-100 transition-colors duration-150 ease-in-out"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* Meal to the user */}
      </div>
    </div>
  );
}
