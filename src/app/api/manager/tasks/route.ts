import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import Task from "../../../../models/Task";
import Pantry from "../../../../models/Staff";

// Connect to the database
const connectDB = async () => {
  await dbConnect();
};

// POST - Create a new Task for pantry staff
export async function POST(request: NextRequest) {
  await connectDB();
  const data = await request.json();

  const { pantryId, taskType, taskDetails, dueTime, status } = data;

  // Validate the pantry ID
  const pantryExists = await Pantry.findById(pantryId);
  if (!pantryExists) {
    return NextResponse.json({ message: "Pantry not found" }, { status: 404 });
  }

  const task = new Task({
    pantryId,
    taskType,
    taskDetails,
    dueTime,
    status,
  });

  try {
    await task.save();
    // Add task to pantry's assignedTasks
    pantryExists.assignedTasks.push(task._id);
    await pantryExists.save();

    return NextResponse.json({ data: task }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create task", error },
      { status: 500 }
    );
  }
}

// GET - Fetch all Tasks for pantry staff
export async function GET(request: NextRequest) {
  await connectDB();

  try {
    const tasks = await Task.find().populate("pantryId");
    return NextResponse.json({ data: tasks });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch tasks", error },
      { status: 500 }
    );
  }
}

// GET - Fetch Task by ID
export async function GET_ONE(request: NextRequest) {
  await connectDB();
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Task ID is required" },
      { status: 400 }
    );
  }

  try {
    const task = await Task.findById(id).populate("pantryId");
    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }
    return NextResponse.json({ data: task });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch task", error },
      { status: 500 }
    );
  }
}

// PUT - Update Task by ID
export async function PUT(request: NextRequest) {
  await connectDB();
  const data = await request.json();
  const { id, taskType, taskDetails, dueTime, status } = data;

  if (!id) {
    return NextResponse.json(
      { message: "Task ID is required" },
      { status: 400 }
    );
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { taskType, taskDetails, dueTime, status },
      { new: true }
    );

    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ data: updatedTask });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update task", error },
      { status: 500 }
    );
  }
}

// DELETE - Delete Task by ID
export async function DELETE(request: NextRequest) {
  await connectDB();
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Task ID is required" },
      { status: 400 }
    );
  }

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    // Remove the task from pantry's assignedTasks
    await Pantry.updateOne(
      { _id: deletedTask.pantryId },
      { $pull: { assignedTasks: deletedTask._id } }
    );

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete task", error },
      { status: 500 }
    );
  }
}
