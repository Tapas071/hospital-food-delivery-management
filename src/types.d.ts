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
