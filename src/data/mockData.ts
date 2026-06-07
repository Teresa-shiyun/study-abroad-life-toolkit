import type {
  BudgetItem,
  ChecklistItem,
  DocumentItem,
  EmergencyContact,
  MonthlyBudget,
  TravelTrip
} from "../types";

const now = "2026-06-04T00:00:00.000Z";

export const mockChecklistItems: ChecklistItem[] = [
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
    notes: "Save the mock tenancy PDF placeholder in the document wallet.",
    createdAt: now,
    updatedAt: now
  }
];

export const mockDocuments: DocumentItem[] = [
  {
    id: "example-passport",
    title: "Example Passport",
    category: "passport",
    status: "prepared",
    fileName: "example-passport-placeholder.png",
    fileType: "image/png",
    fileUri: "local://demo/example-passport-placeholder.png",
    expiryDate: "2030-08-20",
    notes: "Fictional placeholder document for public demo only.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "sample-evisa",
    title: "Sample eVisa Screenshot",
    category: "visa",
    status: "needsUpdate",
    fileName: "sample-evisa-placeholder.png",
    fileType: "image/png",
    fileUri: "local://demo/sample-evisa-placeholder.png",
    expiryDate: "2027-01-15",
    notes: "Use a mock screenshot when adding real app screenshots.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "mock-bank-letter",
    title: "Mock Bank Letter",
    category: "bankLetter",
    status: "missing",
    fileName: "No file selected",
    expiryDate: "2026-12-01",
    notes: "Placeholder record. No real bank document is stored here.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "sample-travel-insurance",
    title: "Sample Travel Insurance",
    category: "travelInsurance",
    status: "expired",
    fileName: "sample-insurance-placeholder.pdf",
    fileType: "application/pdf",
    fileUri: "local://demo/sample-insurance-placeholder.pdf",
    expiryDate: "2026-04-30",
    notes: "Fictional expired example used for status display.",
    createdAt: now,
    updatedAt: now
  }
];

export const mockTrips: TravelTrip[] = [
  {
    id: "paris-trip",
    name: "Paris Trip",
    destination: "Paris, France",
    startDate: "2026-07-12",
    endDate: "2026-07-16",
    notes: "Short summer break using fictional booking data.",
    files: [
      {
        id: "paris-flight",
        tripId: "paris-trip",
        title: "Sample Flight Ticket",
        category: "flightTicket",
        fileName: "sample-flight-ticket.png",
        fileType: "image/png",
        fileUri: "local://demo/sample-flight-ticket.png",
        notes: "Mock flight ticket screenshot.",
        createdAt: now,
        updatedAt: now
      },
      {
        id: "paris-hotel",
        tripId: "paris-trip",
        title: "Sample Hotel Booking",
        category: "hotelBooking",
        fileName: "sample-hotel-booking.png",
        fileType: "image/png",
        fileUri: "local://demo/sample-hotel-booking.png",
        notes: "Mock hotel order screenshot.",
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
        notes: "Use the sample insurance placeholder.",
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
    notes: "Weekend trip with mock train and hotel records.",
    files: [
      {
        id: "edinburgh-train",
        tripId: "edinburgh-weekend",
        title: "Mock Train Ticket",
        category: "other",
        fileName: "mock-train-ticket.png",
        fileType: "image/png",
        fileUri: "local://demo/mock-train-ticket.png",
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

export const mockMonthlyBudget: MonthlyBudget = {
  id: "budget-2026-06",
  month: "2026-06",
  amount: 1200,
  currency: "GBP",
  createdAt: now,
  updatedAt: now
};

export const mockBudgetItems: BudgetItem[] = [
  {
    id: "rent-june",
    title: "June rent",
    amount: 720,
    currency: "GBP",
    category: "rent",
    date: "2026-06-01",
    notes: "Mock shared flat rent record.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "grocery-week-one",
    title: "Groceries",
    amount: 46,
    currency: "GBP",
    category: "food",
    date: "2026-06-03",
    notes: "Fictional supermarket example.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "tube-top-up",
    title: "Transport top-up",
    amount: 25,
    currency: "GBP",
    category: "transport",
    date: "2026-06-04",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "study-subscription",
    title: "Study app subscription",
    amount: 9,
    currency: "GBP",
    category: "subscription",
    date: "2026-06-04",
    createdAt: now,
    updatedAt: now
  }
];

export const mockEmergencyContacts: EmergencyContact[] = [
  {
    id: "university-emergency-desk",
    name: "University Emergency Desk",
    category: "university",
    phone: "+44 0000 000000",
    email: "demo@example.com",
    address: "1 Example Street",
    notes: "Fictional university contact for demo screens.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "london-gp-contact",
    name: "London GP Contact",
    category: "gp",
    phone: "+44 0000 111111",
    email: "gp-demo@example.com",
    address: "2 Example Road",
    notes: "Mock GP phone number. Not a real medical contact.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "bank-lost-card-line",
    name: "Sample Bank Lost Card Line",
    category: "bankLostCard",
    phone: "+44 0000 222222",
    email: "cards-demo@example.com",
    notes: "Use the real number from your bank in a private app only.",
    createdAt: now,
    updatedAt: now
  }
];
