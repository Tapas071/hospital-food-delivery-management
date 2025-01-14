import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect";
import Meal from "../../../../../models/Meal";

// Connect to the database
const connectDB = async () => {
  await dbConnect();
};

// GET - Fetch a specific Meal by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { message: "Meal ID is required" },
      { status: 400 }
    );
  }

  try {
    const meal = await Meal.findById(id);

    if (!meal) {
      return NextResponse.json({ message: "Meal not found" }, { status: 404 });
    }

    return NextResponse.json({ data: meal });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch meal", error },
      { status: 500 }
    );
  }
}

// PUT - Update a Meal by ID
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const { id } = params;
  const data = await request.json();
  const { mealName, ingredients, mealType, instructions } = data;

  if (!id) {
    return NextResponse.json(
      { message: "Meal ID is required" },
      { status: 400 }
    );
  }

  try {
    const updatedMeal = await Meal.findByIdAndUpdate(
      id,
      { mealName, ingredients, mealType, instructions },
      { new: true, runValidators: true }
    );

    if (!updatedMeal) {
      return NextResponse.json({ message: "Meal not found" }, { status: 404 });
    }

    return NextResponse.json({ data: updatedMeal });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update meal", error },
      { status: 500 }
    );
  }
}

// DELETE - Delete a Meal by ID
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { message: "Meal ID is required" },
      { status: 400 }
    );
  }

  try {
    const deletedMeal = await Meal.findByIdAndDelete(id);

    if (!deletedMeal) {
      return NextResponse.json({ message: "Meal not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Meal deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete meal", error },
      { status: 500 }
    );
  }
}
