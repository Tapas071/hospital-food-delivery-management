import mongoose from "mongoose";

// Task Schema
const TaskSchema = new mongoose.Schema({
  pantryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pantry",
    required: true,
  },
  taskType: {
    type: String,
    enum: ["Preparation", "Delivery"],
    required: true,
  },
  taskDetails: {
    type: String,
    required: true,
  },
  dueTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
});

// Export the model
export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
