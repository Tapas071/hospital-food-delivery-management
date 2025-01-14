"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Patient } from "@/types";

const PatientDetailsPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const url = window.location.href; // Get the current URL
    const id = new URL(url).pathname.split("/").pop(); // Extract patient ID from URL

    if (id) {
      fetchPatientDetails(id);
    }
  }, []);

  const fetchPatientDetails = async (patientId: string) => {
    try {
      const response = await axios.get(`/api/manager/getOnePatient?id=${patientId}`);
      setPatient(response.data);
    } catch (error) {
      console.error("Error fetching patient details:", error);
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
    </div>
  );
};

export default PatientDetailsPage;
