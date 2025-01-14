import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import DietChart from "../../../../models/DietChart";
import Patient from "../../../../models/Patient"; // Assuming you're using the Patient model

// Connect to the database
const connectDB = async () => {
  await dbConnect();
};

// POST - Create a new DietChart
export async function POST(request: NextRequest) {
  await connectDB();
  const data = await request.json();

  const {
    patient,
    morningMeal,
    eveningMeal,
    nightMeal,
  } = data;

  // Validate the patient ID
  const patientExists = await Patient.findById(patient);
  if (!patientExists) {
    return NextResponse.json({ message: "Patient not found" }, { status: 404 });
  }

  const dietChart = new DietChart({
    patient,
    morningMeal,
    eveningMeal,
    nightMeal
  });


  try {
    await dietChart.save();
    return NextResponse.json({ data: dietChart }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create diet chart", error },
      { status: 500 }
    );
  }
}

// GET - Fetch all diet charts by patient ID
export async function GET(request: NextRequest) {
  await connectDB();
  const patientId = request.nextUrl.searchParams.get('patientId');

  if (!patientId) {
    return NextResponse.json(
      { message: "Patient ID is required" },
      { status: 400 }
    );
  }

  try {
    const dietCharts = await DietChart.find({ patient: patientId });
    return NextResponse.json({ data: dietCharts });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch diet charts", error },
      { status: 500 }
    );
  }
}

// GET - Fetch a specific DietChart by ID
export async function GET_ONE(request: NextRequest) {
  await connectDB();
  const id = request.nextUrl.searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { message: "DietChart ID is required" },
      { status: 400 }
    );
  }

  try {
    const dietChart = await DietChart.findById(id);
    if (!dietChart) {
      return NextResponse.json(
        { message: "DietChart not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ data: dietChart });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch diet chart", error },
      { status: 500 }
    );
  }
}

// PUT - Update a DietChart by ID
export async function PUT(request: NextRequest) {
  await connectDB();
  const data = await request.json();
  const { id, morningMeal, eveningMeal, nightMeal, ingredients, instructions } =
    data;

  if (!id) {
    return NextResponse.json(
      { message: "DietChart ID is required" },
      { status: 400 }
    );
  }

  try {
    const updatedDietChart = await DietChart.findByIdAndUpdate(
      id,
      {
        morningMeal,
        eveningMeal,
        nightMeal,
        ingredients,
        instructions,
      },
      { new: true }
    );

    if (!updatedDietChart) {
      return NextResponse.json(
        { message: "DietChart not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: updatedDietChart });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update diet chart", error },
      { status: 500 }
    );
  }
}

// DELETE - Delete a DietChart by ID
export async function DELETE(request: NextRequest) {
  await connectDB();
  const id = request.nextUrl.searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { message: "DietChart ID is required" },
      { status: 400 }
    );
  }

  try {
    const deletedDietChart = await DietChart.findByIdAndDelete(id);

    if (!deletedDietChart) {
      return NextResponse.json(
        { message: "DietChart not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "DietChart deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete diet chart", error },
      { status: 500 }
    );
  }
}
