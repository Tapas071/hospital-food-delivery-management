import mongoose from "mongoose";

// User Schema
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // Ensure the email is unique in the database
      lowercase: true, // Ensure the email is stored in lowercase
      trim: true, // Remove leading and trailing spaces
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Pantry", "Delivery Personnel"], // Role of the user
      default: "Pantry", // Default to Pantry if not provided
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Export the model
export default mongoose.models.User || mongoose.model("User", UserSchema);
