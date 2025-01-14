"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Patient, DietChart, Meal } from "@/types"; // Assuming DietChart type is imported

const PatientDetailsPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [dietChart, setDietChart] = useState<DietChart | null>(null); // Diet chart state
  const [isMounted, setIsMounted] = useState(false);
  const [editingDietChart, setEditingDietChart] = useState<DietChart | null>(
    null
  ); // For editing diet chart
  const [newDietChart, setNewDietChart] = useState<DietChart>({
    _id: "",
    patient: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    morningMeal: "",
    eveningMeal: "",
    nightMeal: ""
  }); // For adding new diet chart
  const [meals, setMeals] = useState<Meal[]>([]);

    const fetchedMeals = async () => {
    try {
      const response = await axios.get("/api/manager/meal");
      const meals = response.data.data;
      setMeals(response.data.data);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
    };
  useEffect(() => {
    setIsMounted(true);
    fetchedMeals();

    const url = window.location.href; // Get the current URL
    const id = new URL(url).pathname.split("/").pop(); // Extract patient ID from URL

    if (id) {
      fetchPatientDetails(id);
    }
  }, []);

  const fetchPatientDetails = async (patientId: string) => {
    try {
      // Fetch patient details
      const patientResponse = await axios.get(
        `/api/manager/getOnePatient?id=${patientId}`
      );
      setPatient(patientResponse.data);

      // Fetch diet chart for the patient
      const dietChartResponse = await axios.get(
        `/api/manager/dietcharts?patientId=${patientId}`
      );
      if (dietChartResponse.data.data.length > 0) {
        setDietChart(dietChartResponse.data.data[0]); // Assuming only one diet chart per patient
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddDietChart = async () => {
    if (
      !newDietChart.morningMeal ||
      !newDietChart.eveningMeal ||
      !newDietChart.nightMeal 
    ) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(`/api/manager/dietcharts`, {
        patientId: patient?._id,
        ...newDietChart,
      });
      setDietChart(response.data); // Set the new diet chart
      setNewDietChart({
              _id: "",
              patient: "",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              morningMeal: "",
              eveningMeal: "",
              nightMeal: ""
            }); // Reset the form
    } catch (error) {
      console.error("Error adding diet chart:", error);
    }
  };

  const handleEditDietChart = async () => {
    if (!editingDietChart) return;

    try {
      const response = await axios.put(`/api/manager/dietcharts`, {
        patientId: patient?._id,
        ...editingDietChart,
      });
      setDietChart(response.data); // Update the diet chart
      setEditingDietChart(null); // Reset after editing
    } catch (error) {
      console.error("Error editing diet chart:", error);
    }
  };

  // Guard clause: If `isMounted` is false, return null to prevent rendering prematurely
  if (!isMounted) return null;

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-6 text-center">
        Patient Details
      </h1>

      {/* Patient Information */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-10 max-w-4xl mx-auto border-t-4 border-blue-500">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Patient Information
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="font-semibold text-blue-600">Patient Name</label>
            <p className="text-blue-600">{patient.patientName}</p>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-blue-600">Diseases</label>
            <p className="text-blue-600">{patient.diseases.join(", ")}</p>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-blue-600">Allergies</label>
            <p className="text-blue-600">{patient.allergies.join(", ")}</p>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-blue-600">Room Number</label>
            <p className="text-blue-600">{patient.roomNumber}</p>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-blue-600">Bed Number</label>
            <p className="text-blue-600">{patient.bedNumber}</p>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-blue-600">Floor Number</label>
            <p className="text-blue-600">{patient.floorNumber}</p>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-blue-600">Age</label>
            <p className="text-blue-600">{patient.age}</p>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-blue-600">Gender</label>
            <p className="text-blue-600">{patient.gender}</p>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-blue-600">
              Contact Information
            </label>
            <p className="text-blue-600">{patient.contactInformation}</p>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-blue-600">
              Emergency Contact
            </label>
            <p className="text-blue-600">{patient.emergencyContact}</p>
          </div>
        </div>
      </div>

      {/* Diet Chart Section */}
      {dietChart ? (
        <div className="bg-white shadow-lg rounded-lg p-8 mb-10 max-w-4xl mx-auto border-t-4 border-blue-500">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Diet Chart</h2>
          <div>
            <h3>Morning Meal: {dietChart.morningMeal}</h3>
            

            <h3>Evening Meal: {dietChart.eveningMeal}</h3>
            

            <h3>Night Meal: {dietChart.nightMeal}</h3>
            

            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-md mt-4"
              onClick={() => setEditingDietChart(dietChart)}
            >
              Edit Diet Chart
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-8 mb-10 max-w-4xl mx-auto border-t-4 border-blue-500">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            No Diet Chart Available
          </h2>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-md"
            onClick={() =>
              setEditingDietChart({
                _id: "",
                patient: "",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                morningMeal: "",
                eveningMeal: "",
                nightMeal: "",
              })
            }
          >
            Add Diet Chart
          </button>
        </div>
      )}

      {/* Add/Edit Diet Chart Form */}
      {(editingDietChart || newDietChart) && (
        <div className="bg-white shadow-lg rounded-lg p-8 mb-10 max-w-4xl mx-auto border-t-4 border-blue-500">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            {editingDietChart ? "Edit Diet Chart" : "Add Diet Chart"}
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {/* Morning Meal */}
            <div className="flex flex-col">
              <label className="font-semibold text-blue-600">
                Morning Meal
              </label>
              <select
                className="border border-gray-300 p-2 rounded"
                value={
                  editingDietChart?.morningMeal ||
                  newDietChart.morningMeal ||
                  ""
                }
                onChange={(e) => {
                  const selectedMeal = e.target.value;
                  editingDietChart
                    ? setEditingDietChart({
                        ...editingDietChart,
                        morningMeal: selectedMeal,
                      })
                    : setNewDietChart({
                        ...newDietChart,
                        morningMeal: selectedMeal,
                      });
                }}
              >
                <option value="">Select a Morning Meal</option>
                {meals.map((meal, index) => {
                  if (meal.mealType === "Morning") {
                    return (
                      <option key={index} value={meal.mealName}>
                        {meal.mealName}
                      </option>
                    );
                  }
                  return null;
                })}
              </select>
            </div>

            {/* Evening Meal */}
            <div className="flex flex-col">
              <label className="font-semibold text-blue-600">
                Evening Meal
              </label>
              <select
                className="border border-gray-300 p-2 rounded"
                value={
                  editingDietChart?.eveningMeal ||
                  newDietChart.eveningMeal ||
                  ""
                }
                onChange={(e) => {
                    console.log(e.target.value);
                  const selectedMeal = e.target.value;
                  editingDietChart
                    ? setEditingDietChart({
                        ...editingDietChart,
                        eveningMeal: selectedMeal,
                      })
                    : setNewDietChart({
                        ...newDietChart,
                        eveningMeal: selectedMeal,
                      });
                }}
              >
                <option value="">Select an Evening Meal</option>
                {meals.map((meal, index) => {
                  if (meal.mealType === "Evening") {
                    return (
                      <option key={index} value={meal.mealName}>
                        {meal.mealName}
                      </option>
                    );
                  }
                  return null;
                })}
              </select>
            </div>

            {/* Night Meal */}
            <div className="flex flex-col">
              <label className="font-semibold text-blue-600">Night Meal</label>
              <select
                className="border border-gray-300 p-2 rounded"
                value={
                  editingDietChart?.nightMeal || newDietChart.nightMeal || ""
                }
                onChange={(e) => {
                  const selectedMeal = e.target.value;
                  editingDietChart
                    ? setEditingDietChart({
                        ...editingDietChart,
                        nightMeal: selectedMeal,
                      })
                    : setNewDietChart({
                        ...newDietChart,
                        nightMeal: selectedMeal,
                      });
                }}
              >
                <option value="">Select a Night Meal</option>
                {meals.map((meal, index) => {
                  if (meal.mealType === "Dinner") {
                    return (
                      <option key={index} value={meal.mealName}>
                        {meal.mealName}
                      </option>
                    );
                  }
                  return null;
                })}
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-md"
                onClick={
                  editingDietChart ? handleEditDietChart : handleAddDietChart
                }
              >
                {editingDietChart ? "Save Changes" : "Add Diet Chart"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDetailsPage;
