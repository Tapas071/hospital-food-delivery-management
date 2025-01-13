import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    diseases: {
      type: [String], // Array to store multiple diseases
      required: true,
    },
    allergies: {
      type: [String], // Array to store multiple allergies
      required: true,
    },
    roomNumber: {
      type: String,
      required: true,
    },
    bedNumber: {
      type: String,
      required: true,
    },
    floorNumber: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"], // Limiting gender options
    },
    contactInformation: {
      type: String,
      required: true,
    },
    emergencyContact: {
      type: String,
      required: true,
    },
    additionalDetails: {
      type: String, // Optional field for any additional information
      default: "",
    },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt fields automatically

export default mongoose.models.Patient ||
  mongoose.model("Patient", PatientSchema);
