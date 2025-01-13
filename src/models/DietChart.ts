import mongoose from "mongoose";

const DietChartSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient", // Referring to the Patient model
      required: true,
    },
    morningMeal: {
      type: String,
      required: true,
    },
    eveningMeal: {
      type: String,
      required: true,
    },
    nightMeal: {
      type: String,
      required: true,
    },
    ingredients: {
      morning: {
        type: [String], // Array of ingredients for morning meal
        required: true,
      },
      evening: {
        type: [String], // Array of ingredients for evening meal
        required: true,
      },
      night: {
        type: [String], // Array of ingredients for night meal
        required: true,
      },
    },
    instructions: {
      morning: {
        type: String,
        required: true,
      },
      evening: {
        type: String,
        required: true,
      },
      night: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.DietChart ||
  mongoose.model("DietChart", DietChartSchema);
