import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import Pantry from "../../../../models/Staff";
import Task from "../../../../models/Task";

// Connect to the database
const connectDB = async () => {
  await dbConnect();
};

// POST - Create a new Pantry
export async function POST(request: NextRequest) {
  await connectDB();
  const data = await request.json();

  const { staffName, contactInfo, location } = data;

  const pantry = new Pantry({
    staffName,
    contactInfo,
    location,
  });

  try {
    await pantry.save();
    return NextResponse.json({ data: pantry }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create pantry", error },
      { status: 500 }
    );
  }
}

// GET - Fetch all Pantry details
export async function GET(request: NextRequest) {
  await connectDB();

  try {
    const pantries = await Pantry.find();
    return NextResponse.json({ data: pantries });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch pantries", error },
      { status: 500 }
    );
  }
}

// GET - Fetch Pantry by ID
export async function GET_ONE(request: NextRequest) {
  await connectDB();
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Pantry ID is required" },
      { status: 400 }
    );
  }

  try {
    const pantry = await Pantry.findById(id).populate("assignedTasks");
    if (!pantry) {
      return NextResponse.json(
        { message: "Pantry not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ data: pantry });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch pantry", error },
      { status: 500 }
    );
  }
}

// PUT - Update Pantry details
export async function PUT(request: NextRequest) {
  await connectDB();
  const data = await request.json();
  const { id, staffName, contactInfo, location } = data;

  if (!id) {
    return NextResponse.json(
      { message: "Pantry ID is required" },
      { status: 400 }
    );
  }

  try {
    const updatedPantry = await Pantry.findByIdAndUpdate(
      id,
      { staffName, contactInfo, location },
      { new: true }
    );

    if (!updatedPantry) {
      return NextResponse.json(
        { message: "Pantry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: updatedPantry });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update pantry", error },
      { status: 500 }
    );
  }
}

// DELETE - Delete Pantry
export async function DELETE(request: NextRequest) {
  await connectDB();
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Pantry ID is required" },
      { status: 400 }
    );
  }

  try {
    const deletedPantry = await Pantry.findByIdAndDelete(id);
    if (!deletedPantry) {
      return NextResponse.json(
        { message: "Pantry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Pantry deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete pantry", error },
      { status: 500 }
    );
  }
}
