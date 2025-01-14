export interface Patient {
    _id: string;
  patientName: string;
  diseases: string[];
  allergies: string[];
  roomNumber: string;
  bedNumber: string;
  floorNumber: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  contactInformation: string;
  emergencyContact: string;
  additionalDetails: string;
}

export interface DietChart {
  _id: string; // MongoDB ObjectId as string
  patient: string; // Patient ID (ObjectId as string)
  morningMeal: string; // Name or description of the morning meal
  eveningMeal: string; // Name or description of the evening meal
  nightMeal: string; // Name or description of the night meal
  ingredients: {
    morning: string[]; // List of ingredients for the morning meal
    evening: string[]; // List of ingredients for the evening meal
    night: string[]; // List of ingredients for the night meal
  };
  instructions: {
    morning: string; // Instructions for the morning meal
    evening: string; // Instructions for the evening meal
    night: string; // Instructions for the night meal
  };
  createdAt: string; // ISO string timestamp when the diet chart was created
  updatedAt: string; // ISO string timestamp when the diet chart was last updated
}

