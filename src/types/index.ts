export type AppLanguage = "en" | "zh";

export type ChecklistStatus = "notStarted" | "inProgress" | "done";

export type ChecklistCategory =
  | "banking"
  | "health"
  | "housing"
  | "university"
  | "travel"
  | "other";

export interface ChecklistItem {
  id: string;
  title: string;
  category: ChecklistCategory;
  status: ChecklistStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type DocumentCategory =
  | "passport"
  | "visa"
  | "bankLetter"
  | "universityLetter"
  | "casOrAdmission"
  | "tenancyAgreement"
  | "travelInsurance"
  | "studentId"
  | "other";

export type DocumentStatus = "missing" | "prepared" | "expired" | "needsUpdate";

export interface DocumentItem {
  id: string;
  title: string;
  category: DocumentCategory;
  status: DocumentStatus;
  fileUri?: string;
  fileName?: string;
  fileType?: string;
  expiryDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type TravelFileCategory =
  | "flightTicket"
  | "hotelBooking"
  | "visaOrEVisa"
  | "insurance"
  | "other";

export interface TravelFile {
  id: string;
  tripId: string;
  title: string;
  category: TravelFileCategory;
  fileUri?: string;
  fileName?: string;
  fileType?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TravelChecklistItem {
  id: string;
  tripId: string;
  title: string;
  isDone: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TravelItineraryItem {
  id: string;
  tripId: string;
  title: string;
  date?: string;
  time?: string;
  isDone: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TravelTrip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  notes?: string;
  itinerary: TravelItineraryItem[];
  files: TravelFile[];
  checklist: TravelChecklistItem[];
  createdAt: string;
  updatedAt: string;
}

export type BudgetCategory =
  | "rent"
  | "food"
  | "transport"
  | "shopping"
  | "travel"
  | "subscription"
  | "other";

export interface BudgetItem {
  id: string;
  title: string;
  amount: number;
  currency: string;
  category: BudgetCategory;
  date: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MonthlyBudget {
  id: string;
  month: string;
  amount: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export type EmergencyContactCategory =
  | "university"
  | "accommodation"
  | "gp"
  | "bankLostCard"
  | "embassy"
  | "localPoliceNonEmergency"
  | "friendOrFamily"
  | "other";

export interface EmergencyContact {
  id: string;
  name: string;
  category: EmergencyContactCategory;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LocalizedLabel {
  key: string;
  en: string;
  zh: string;
}

export type SearchResultType = "Documents" | "Checklist" | "Trips" | "Budget" | "Contacts";

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: SearchResultType;
}
