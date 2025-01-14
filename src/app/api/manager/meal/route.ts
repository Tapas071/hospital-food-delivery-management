import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import Meal from "../../../../models/Meal";

// Connect to the database
const connectDB = async () => {
  await dbConnect();
};

// POST - Create a new Meal
export async function POST(request: NextRequest) {
  await connectDB();
  const data = await request.json();

  const { mealName, ingredients, mealType, instructions } = data;

  if (!mealName || !ingredients || !mealType) {
    return NextResponse.json(
      { message: "mealName, ingredients, and mealType are required" },
      { status: 400 }
    );
  }

  try {
    const newMeal = new Meal({ mealName, ingredients, mealType, instructions });
    await newMeal.save();
    return NextResponse.json({ data: newMeal }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create meal", error },
      { status: 500 }
    );
  }
}

// GET - Fetch all meals
export async function GET(request: NextRequest) {
  await connectDB();

  try {
    const meals = await Meal.find();
    return NextResponse.json({ data: meals });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch meals", error },
      { status: 500 }
    );
  }
}
