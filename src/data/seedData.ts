import type {
  BudgetItem,
  ChecklistItem,
  DocumentItem,
  EmergencyContact,
  MonthlyBudget,
  TravelTrip
} from "../types";
import {
  previewEVisaUri,
  previewFlightTicketUri,
  previewInsuranceUri,
  previewPassportUri
} from "./previewImages";

const now = "2026-06-04T00:00:00.000Z";

export const seedChecklistItems: ChecklistItem[] = [
  {
    id: "open-bank-account",
    title: "Open a local bank account",
    category: "banking",
    status: "inProgress",
    notes: "Prepare passport, student letter, and proof of address.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "register-gp",
    title: "Register with GP / local doctor",
    category: "health",
    status: "notStarted",
    notes: "Use the university health centre information first.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "buy-sim-card",
    title: "Buy a local SIM card",
    category: "other",
    status: "done",
    notes: "Compare student-friendly monthly plans.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "prepare-tenancy",
    title: "Prepare tenancy agreement",
    category: "housing",
    status: "inProgress",
    notes: "Save the tenancy agreement in the document wallet.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "extend-student-visa",
    title: "Apply for student visa extension",
    category: "university",
    status: "done",
    notes: "Check the latest university guidance before submitting.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "book-health-check",
    title: "Book health check",
    category: "health",
    status: "done",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "buy-flight-home",
    title: "Buy flight ticket home",
    category: "travel",
    status: "notStarted",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "renew-passport-info",
    title: "Update passport information",
    category: "other",
    status: "done",
    createdAt: now,
    updatedAt: now
  }
];

export const seedDocuments: DocumentItem[] = [
  {
    id: "passport",
    title: "Passport",
    category: "passport",
    status: "prepared",
    fileName: "passport.pdf",
    fileType: "image/png",
    fileUri: previewPassportUri,
    expiryDate: "2030-08-20",
    notes: "Keep a clear copy of the passport information page.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "student-visa",
    title: "Student Visa",
    category: "visa",
    status: "needsUpdate",
    fileName: "student-visa.png",
    fileType: "image/png",
    fileUri: previewEVisaUri,
    expiryDate: "2026-08-15",
    notes: "Check the expiry date before booking international travel.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "bank-statement",
    title: "Bank Statement",
    category: "bankLetter",
    status: "missing",
    expiryDate: "2026-12-01",
    notes: "Upload a recent statement when it is ready.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "travel-insurance",
    title: "Travel Insurance",
    category: "travelInsurance",
    status: "expired",
    fileName: "travel-insurance.pdf",
    fileType: "image/png",
    fileUri: previewInsuranceUri,
    expiryDate: "2026-04-30",
    notes: "Renew before the next trip.",
    createdAt: now,
    updatedAt: now
  }
];

export const seedTrips: TravelTrip[] = [
  {
    id: "paris-trip",
    name: "Paris Trip",
    destination: "Paris, France",
    startDate: "2026-07-12",
    endDate: "2026-07-16",
    notes: "Short summer break with saved tickets and trip tasks.",
    itinerary: [
      {
        id: "paris-itinerary-louvre",
        tripId: "paris-trip",
        title: "Louvre Museum and Tuileries Garden",
        date: "2026-07-12",
        time: "10:00",
        isDone: false,
        createdAt: now,
        updatedAt: now
      },
      {
        id: "paris-itinerary-eiffel",
        tripId: "paris-trip",
        title: "Eiffel Tower sunset and Seine walk",
        date: "2026-07-13",
        time: "18:30",
        isDone: false,
        createdAt: now,
        updatedAt: now
      },
      {
        id: "paris-itinerary-montmartre",
        tripId: "paris-trip",
        title: "Montmartre cafe morning",
        date: "2026-07-14",
        time: "09:30",
        isDone: false,
        createdAt: now,
        updatedAt: now
      },
      {
        id: "paris-itinerary-versailles",
        tripId: "paris-trip",
        title: "Versailles day trip",
        date: "2026-07-15",
        time: "11:00",
        isDone: false,
        createdAt: now,
        updatedAt: now
      }
    ],
    files: [
      {
        id: "paris-flight",
        tripId: "paris-trip",
        title: "Flight Ticket",
        category: "flightTicket",
        fileName: "flight-ticket.png",
        fileType: "image/svg+xml",
        fileUri: previewFlightTicketUri,
        notes: "Flight ticket image.",
        createdAt: now,
        updatedAt: now
      },
      {
        id: "paris-hotel",
        tripId: "paris-trip",
        title: "Hotel Booking",
        category: "hotelBooking",
        fileName: "hotel-booking.png",
        fileType: "image/png",
        fileUri: "local://asset/hotel-booking.png",
        notes: "Hotel booking image.",
        createdAt: now,
        updatedAt: now
      }
    ],
    checklist: [
      {
        id: "paris-passport",
        tripId: "paris-trip",
        title: "Passport",
        isDone: true,
        createdAt: now,
        updatedAt: now
      },
      {
        id: "paris-insurance",
        tripId: "paris-trip",
        title: "Travel insurance",
        isDone: false,
        notes: "Confirm coverage dates before leaving.",
        createdAt: now,
        updatedAt: now
      },
      {
        id: "paris-adapter",
        tripId: "paris-trip",
        title: "Power adapter",
        isDone: false,
        createdAt: now,
        updatedAt: now
      }
    ],
    createdAt: now,
    updatedAt: now
  },
  {
    id: "edinburgh-weekend",
    name: "Edinburgh Weekend",
    destination: "Edinburgh, United Kingdom",
    startDate: "2026-08-02",
    endDate: "2026-08-04",
    notes: "Weekend trip with train and hotel records.",
    itinerary: [
      {
        id: "edinburgh-itinerary-castle",
        tripId: "edinburgh-weekend",
        title: "Edinburgh Castle and Royal Mile",
        date: "2026-08-02",
        time: "11:00",
        isDone: false,
        createdAt: now,
        updatedAt: now
      },
      {
        id: "edinburgh-itinerary-arthur",
        tripId: "edinburgh-weekend",
        title: "Arthur's Seat walk",
        date: "2026-08-03",
        time: "09:30",
        isDone: false,
        createdAt: now,
        updatedAt: now
      },
      {
        id: "edinburgh-itinerary-museum",
        tripId: "edinburgh-weekend",
        title: "National Museum and station",
        date: "2026-08-04",
        time: "14:00",
        isDone: false,
        createdAt: now,
        updatedAt: now
      }
    ],
    files: [
      {
        id: "edinburgh-train",
        tripId: "edinburgh-weekend",
        title: "Train Ticket",
        category: "other",
        fileName: "train-ticket.png",
        fileType: "image/png",
        fileUri: "local://asset/train-ticket.png",
        createdAt: now,
        updatedAt: now
      }
    ],
    checklist: [
      {
        id: "edinburgh-bank-card",
        tripId: "edinburgh-weekend",
        title: "Bank card",
        isDone: true,
        createdAt: now,
        updatedAt: now
      },
      {
        id: "edinburgh-charger",
        tripId: "edinburgh-weekend",
        title: "Charger",
        isDone: false,
        createdAt: now,
        updatedAt: now
      }
    ],
    createdAt: now,
    updatedAt: now
  }
];

export const seedMonthlyBudget: MonthlyBudget = {
  id: "budget-2026-06",
  month: "2026-06",
  amount: 6000,
  currency: "CNY",
  createdAt: now,
  updatedAt: now
};

export const seedBudgetItems: BudgetItem[] = [
  {
    id: "lunch-june-seven",
    title: "Lunch",
    amount: 45.5,
    currency: "CNY",
    category: "food",
    date: "2026-06-07",
    notes: "Lunch near campus.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "metro-june-six",
    title: "Local transport",
    amount: 12,
    currency: "CNY",
    category: "transport",
    date: "2026-06-06",
    notes: "Metro pass top-up.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "shopping-june-five",
    title: "Groceries",
    amount: 89,
    currency: "CNY",
    category: "shopping",
    date: "2026-06-05",
    notes: "Supermarket shopping.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "movie-june-four",
    title: "Movie ticket",
    amount: 60,
    currency: "CNY",
    category: "other",
    date: "2026-06-04",
    notes: "Evening movie.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "dinner-june-three",
    title: "Dinner",
    amount: 38,
    currency: "CNY",
    category: "food",
    date: "2026-06-03",
    createdAt: now,
    updatedAt: now
  }
];

export const seedEmergencyContacts: EmergencyContact[] = [
  {
    id: "local-emergency",
    name: "Local Emergency",
    category: "localPoliceNonEmergency",
    phone: "112",
    notes: "Local emergency number.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "china-embassy-france",
    name: "Chinese Embassy",
    category: "embassy",
    phone: "+33-1-5375-8800",
    email: "chinaemb_fr@mfa.gov.cn",
    notes: "Verify contact details before personal use.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "school-international-office",
    name: "School International Office",
    category: "university",
    phone: "+33-1-4432-5566",
    email: "international@university.fr",
    notes: "Student service contact.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "mom-contact",
    name: "Mom",
    category: "friendOrFamily",
    phone: "+86-138-0000-1234",
    createdAt: now,
    updatedAt: now
  }
];
