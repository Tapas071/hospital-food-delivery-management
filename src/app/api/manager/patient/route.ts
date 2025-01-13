import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import Patient from "../../../../models/Patient";

// CREATE a new patient
export async function POST(request: NextRequest) {
  await dbConnect();
  const data = await request.json();
  const {
    patientName,
    diseases,
    allergies,
    roomNumber,
    bedNumber,
    floorNumber,
    age,
    gender,
    contactInformation,
    emergencyContact,
    additionalDetails,
  } = data;

  try {
    const patient = new Patient({
      patientName,
      diseases,
      allergies,
      roomNumber,
      bedNumber,
      floorNumber,
      age,
      gender,
      contactInformation,
      emergencyContact,
      additionalDetails,
    });

    await patient.save();
    return NextResponse.json(
      { message: "Patient created successfully", patient },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating patient", error: (error as any).message },
      { status: 400 }
    );
  }
}

// READ all patients
export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const patients = await Patient.find({});
    return NextResponse.json(patients, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching patients", error: (error as any).message },
      { status: 400 }
    );
  }
}


// UPDATE a patient's details by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id } = params;
  const data = await request.json();

  try {
    const updatedPatient = await Patient.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedPatient) {
      return NextResponse.json(
        { message: "Patient not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Patient updated successfully", updatedPatient },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating patient", error: (error as any).message },
      { status: 400 }
    );
  }
}

// DELETE a patient by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id } = params;

  try {
    const deletedPatient = await Patient.findByIdAndDelete(id);
    if (!deletedPatient) {
      return NextResponse.json(
        { message: "Patient not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Patient deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting patient", error: (error as any).message },
      { status: 400 }
    );
  }
}
