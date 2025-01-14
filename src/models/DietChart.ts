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
    }
  },
  { timestamps: true }
);

export default mongoose.models.DietChart ||
  mongoose.model("DietChart", DietChartSchema);
