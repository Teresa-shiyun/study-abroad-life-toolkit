import type {
  BudgetCategory,
  ChecklistCategory,
  ChecklistStatus,
  DocumentCategory,
  DocumentStatus,
  EmergencyContactCategory,
  TravelFileCategory
} from "../types";

export const checklistStatusLabels: Record<ChecklistStatus, string> = {
  notStarted: "Not Started",
  inProgress: "In Progress",
  done: "Done"
};

export const documentStatusLabels: Record<DocumentStatus, string> = {
  missing: "Missing",
  prepared: "Prepared",
  expired: "Expired",
  needsUpdate: "Needs Update"
};

export const checklistCategoryLabels: Record<ChecklistCategory, string> = {
  banking: "Banking",
  health: "Health",
  housing: "Housing",
  university: "University",
  travel: "Travel",
  other: "Other"
};

export const documentCategoryLabels: Record<DocumentCategory, string> = {
  passport: "Passport",
  visa: "Visa / eVisa / BRP",
  bankLetter: "Bank Letter",
  universityLetter: "University Letter",
  casOrAdmission: "CAS / Admission",
  tenancyAgreement: "Tenancy Agreement",
  travelInsurance: "Travel Insurance",
  studentId: "Student ID",
  other: "Other"
};

export const travelFileCategoryLabels: Record<TravelFileCategory, string> = {
  flightTicket: "Flight Ticket",
  hotelBooking: "Hotel Booking",
  visaOrEVisa: "Visa / eVisa",
  insurance: "Insurance",
  other: "Other"
};

export const budgetCategoryLabels: Record<BudgetCategory, string> = {
  rent: "Rent",
  food: "Food",
  transport: "Transport",
  shopping: "Shopping",
  travel: "Travel",
  subscription: "Subscription",
  other: "Other"
};

export const emergencyContactCategoryLabels: Record<EmergencyContactCategory, string> = {
  university: "University",
  accommodation: "Accommodation",
  gp: "Local Doctor / GP",
  bankLostCard: "Bank Lost Card",
  embassy: "Embassy",
  localPoliceNonEmergency: "Police Non-Emergency",
  friendOrFamily: "Friend or Family",
  other: "Other"
};
