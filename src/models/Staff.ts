import mongoose from "mongoose";

// Pantry Schema
const PantrySchema = new mongoose.Schema({
  staffName: {
    type: String,
    required: true,
  },
  contactInfo: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  assignedTasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

// Export the model
export default mongoose.models.Pantry || mongoose.model("Pantry", PantrySchema);
