"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Patient } from "@/types"; // Import the IPatient interface

const PatientsPage = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  const [formData, setFormData] = useState({
    patientName: "",
    diseases: "",
    allergies: "",
    roomNumber: "",
    bedNumber: "",
    floorNumber: "",
    age: "",
    gender: "",
    contactInformation: "",
    emergencyContact: "",
    additionalDetails: "",
  });

  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("/api/manager/patient");
      setPatients(response.data || []);
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching patients:", error.message);
      } else {
        console.error("Error fetching patients:", error);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingPatient) {
        await axios.put(`/api/manager/patient?id=${editingPatient._id}`, {
          ...formData,
        });
        alert("Patient updated successfully!");
      } else {
        await axios.post("/api/manager/patient", formData);
        alert("Patient added successfully!");
      }

      setFormData({
        patientName: "",
        diseases: "",
        allergies: "",
        roomNumber: "",
        bedNumber: "",
        floorNumber: "",
        age: "",
        gender: "",
        contactInformation: "",
        emergencyContact: "",
        additionalDetails: "",
      });
      setEditingPatient(null);
      fetchPatients();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error saving patient:", error.message);
      } else {
        console.error("Error saving patient:", error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/manager/patient?id=${id}`);
      alert("Patient deleted successfully!");
      fetchPatients();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error deleting patient:", error.message);
      } else {
        console.error("Error deleting patient:", error);
      }
    }
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setFormData({
      patientName: patient.patientName,
      diseases: patient.diseases.join(", "), // Convert array to string for form input
      allergies: patient.allergies.join(", "), // Convert array to string for form input
      roomNumber: patient.roomNumber,
      bedNumber: patient.bedNumber,
      floorNumber: patient.floorNumber,
      age: patient.age.toString(),
      gender: patient.gender,
      contactInformation: patient.contactInformation,
      emergencyContact: patient.emergencyContact,
      additionalDetails: patient.additionalDetails,
    });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-6 text-center">
        Manage Patients
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 mb-10 max-w-4xl mx-auto border-t-4 border-blue-500"
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          {editingPatient ? "Edit Patient" : "Add Patient"}
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="Name"
            className="p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-blue-600 hover:ring-2 hover:ring-blue-300 transition-all"
            required
          />
          <input
            type="text"
            name="diseases"
            value={formData.diseases}
            onChange={handleChange}
            placeholder="Diseases"
            className="p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-blue-600 hover:ring-2 hover:ring-blue-300 transition-all"
          />
          <input
            type="text"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            placeholder="Allergies"
            className="p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-blue-600 hover:ring-2 hover:ring-blue-300 transition-all"
          />
          <input
            type="text"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            placeholder="Room Number"
            className="p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-blue-600 hover:ring-2 hover:ring-blue-300 transition-all"
            required
          />
          <input
            type="text"
            name="bedNumber"
            value={formData.bedNumber}
            onChange={handleChange}
            placeholder="Bed Number"
            className="p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-blue-600 hover:ring-2 hover:ring-blue-300 transition-all"
          />
          <input
            type="text"
            name="floorNumber"
            value={formData.floorNumber}
            onChange={handleChange}
            placeholder="Floor Number"
            className="p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-blue-600 hover:ring-2 hover:ring-blue-300 transition-all"
          />
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-blue-600 hover:ring-2 hover:ring-blue-300 transition-all"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-blue-600 hover:ring-2 hover:ring-blue-300 transition-all"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            name="contactInformation"
            value={formData.contactInformation}
            onChange={handleChange}
            placeholder="Contact Info"
            className="p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-blue-600 hover:ring-2 hover:ring-blue-300 transition-all"
          />
          <input
            type="text"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
            placeholder="Emergency Contact"
            className="p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-blue-600 hover:ring-2 hover:ring-blue-300 transition-all"
          />
        </div>
        <button
          type="submit"
          className="mt-6 w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
        >
          {editingPatient ? "Update Patient" : "Add Patient"}
        </button>
      </form>

      {/* Patients Table */}
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-blue-700 mb-4">
          Patients List
        </h3>
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr className="bg-blue-100 text-blue-800">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Room</th>
              <th className="p-3 text-left">Floor</th>
              <th className="p-3 text-left">Contact</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? (
              patients.map((patient) => (
                <tr key={patient._id} className="border-t hover:bg-blue-50">
                  <td className="p-3 text-blue-600">{patient.patientName}</td>
                  <td className="p-3 text-blue-600">{patient.roomNumber}</td>
                  <td className="p-3 text-blue-600">{patient.floorNumber}</td>
                  <td className="p-3 text-blue-600">
                    {patient.contactInformation}
                  </td>
                  <td className="p-3 flex space-x-2">
                    <button
                      onClick={() => handleEdit(patient)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(patient._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                    {/* Details Button */}
                    <button
                      onClick={() =>
                        (window.location.href = `/manager/patients/${patient._id}`)
                      } // Redirect to the dynamic page
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientsPage;
