import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import Patient from "../../../../models/Patient";

// READ a single patient by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
 const url = new URL(request.url);
 const id = url.searchParams.get("id");

  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      return NextResponse.json(
        { message: "Patient not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(patient, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching patient", error: (error as Error).message },
      { status: 400 }
    );
  }
}
