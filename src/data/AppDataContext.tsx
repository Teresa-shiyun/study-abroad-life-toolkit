import { createContext, type ReactNode, useContext, useState } from "react";
import {
  mockBudgetItems,
  mockChecklistItems,
  mockDocuments,
  mockEmergencyContacts,
  mockMonthlyBudget,
  mockTrips
} from "./mockData";
import type {
  BudgetCategory,
  BudgetItem,
  ChecklistCategory,
  ChecklistItem,
  ChecklistStatus,
  DocumentCategory,
  DocumentItem,
  DocumentStatus,
  EmergencyContact,
  EmergencyContactCategory,
  MonthlyBudget,
  TravelChecklistItem,
  TravelFile,
  TravelFileCategory,
  TravelTrip
} from "../types";

interface SaveDocumentInput {
  id?: string;
  title: string;
  category: DocumentCategory;
  status: DocumentStatus;
  fileName?: string;
  fileType?: string;
  fileUri?: string;
  expiryDate?: string;
  notes?: string;
}

interface SaveTripInput {
  id?: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  notes?: string;
}

interface SaveContactInput {
  id?: string;
  name: string;
  category: EmergencyContactCategory;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
}

interface AppDataContextValue {
  checklistItems: ChecklistItem[];
  documents: DocumentItem[];
  trips: TravelTrip[];
  budgetItems: BudgetItem[];
  monthlyBudget: MonthlyBudget;
  emergencyContacts: EmergencyContact[];
  addChecklistItem: (title: string, category?: ChecklistCategory) => ChecklistItem;
  updateChecklistItem: (id: string, patch: Partial<Pick<ChecklistItem, "title" | "category" | "status" | "notes">>) => void;
  cycleChecklistStatus: (id: string) => void;
  deleteChecklistItem: (id: string) => void;
  saveDocument: (input: SaveDocumentInput) => string;
  deleteDocument: (id: string) => void;
  saveTrip: (input: SaveTripInput) => string;
  deleteTrip: (id: string) => void;
  addTravelFile: (
    tripId: string,
    fileName: string,
    category?: TravelFileCategory,
    fileUri?: string,
    fileType?: string
  ) => TravelFile;
  deleteTravelFile: (tripId: string, fileId: string) => void;
  addTravelChecklistItem: (tripId: string, title: string) => TravelChecklistItem;
  toggleTravelChecklistItem: (tripId: string, checklistItemId: string) => void;
  deleteTravelChecklistItem: (tripId: string, checklistItemId: string) => void;
  setMonthlyBudgetAmount: (amount: number) => void;
  addBudgetItem: (title: string, amount: number, category?: BudgetCategory) => BudgetItem;
  deleteBudgetItem: (id: string) => void;
  saveEmergencyContact: (input: SaveContactInput) => string;
  deleteEmergencyContact: (id: string) => void;
}

const AppDataContext = createContext<AppDataContextValue | null>(null);

interface AppDataProviderProps {
  children: ReactNode;
}

const nextChecklistStatus: Record<ChecklistStatus, ChecklistStatus> = {
  notStarted: "inProgress",
  inProgress: "done",
  done: "notStarted"
};

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.round(Math.random() * 999)}`;
}

function now() {
  return new Date().toISOString();
}

function trimmed(value: string, fallback: string) {
  const nextValue = value.trim();
  return nextValue.length > 0 ? nextValue : fallback;
}

export function AppDataProvider({ children }: AppDataProviderProps) {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(mockChecklistItems);
  const [documents, setDocuments] = useState<DocumentItem[]>(mockDocuments);
  const [trips, setTrips] = useState<TravelTrip[]>(mockTrips);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(mockBudgetItems);
  const [monthlyBudget, setMonthlyBudget] = useState<MonthlyBudget>(mockMonthlyBudget);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>(mockEmergencyContacts);

  const addChecklistItem: AppDataContextValue["addChecklistItem"] = (title, category = "other") => {
    const timestamp = now();
    const item: ChecklistItem = {
      id: createId("checklist"),
      title: trimmed(title, "New checklist item"),
      category,
      status: "notStarted",
      createdAt: timestamp,
      updatedAt: timestamp
    };

    setChecklistItems((current) => [item, ...current]);
    return item;
  };

  const updateChecklistItem: AppDataContextValue["updateChecklistItem"] = (id, patch) => {
    setChecklistItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              ...patch,
              title: patch.title ? trimmed(patch.title, item.title) : item.title,
              updatedAt: now()
            }
          : item
      )
    );
  };

  const cycleChecklistStatus = (id: string) => {
    setChecklistItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status: nextChecklistStatus[item.status],
              updatedAt: now()
            }
          : item
      )
    );
  };

  const deleteChecklistItem = (id: string) => {
    setChecklistItems((current) => current.filter((item) => item.id !== id));
  };

  const saveDocument: AppDataContextValue["saveDocument"] = (input) => {
    const timestamp = now();
    const id = input.id ?? createId("document");

    setDocuments((current) => {
      const existing = current.find((item) => item.id === id);
      const nextDocument: DocumentItem = {
        id,
        title: trimmed(input.title, existing?.title ?? "New document"),
        category: input.category,
        status: input.status,
        fileName: input.fileName ?? existing?.fileName,
        fileType: input.fileType ?? existing?.fileType,
        fileUri: input.fileUri ?? existing?.fileUri,
        expiryDate: input.expiryDate?.trim() || undefined,
        notes: input.notes?.trim() || undefined,
        createdAt: existing?.createdAt ?? timestamp,
        updatedAt: timestamp
      };

      return existing
        ? current.map((item) => (item.id === id ? nextDocument : item))
        : [nextDocument, ...current];
    });

    return id;
  };

  const deleteDocument = (id: string) => {
    setDocuments((current) => current.filter((item) => item.id !== id));
  };

  const saveTrip: AppDataContextValue["saveTrip"] = (input) => {
    const timestamp = now();
    const id = input.id ?? createId("trip");

    setTrips((current) => {
      const existing = current.find((item) => item.id === id);
      const nextTrip: TravelTrip = {
        id,
        name: trimmed(input.name, existing?.name ?? "New trip"),
        destination: trimmed(input.destination, existing?.destination ?? "Destination"),
        startDate: input.startDate.trim(),
        endDate: input.endDate.trim(),
        notes: input.notes?.trim() || undefined,
        files: existing?.files ?? [],
        checklist: existing?.checklist ?? [],
        createdAt: existing?.createdAt ?? timestamp,
        updatedAt: timestamp
      };

      return existing ? current.map((item) => (item.id === id ? nextTrip : item)) : [nextTrip, ...current];
    });

    return id;
  };

  const deleteTrip = (id: string) => {
    setTrips((current) => current.filter((item) => item.id !== id));
  };

  const addTravelFile: AppDataContextValue["addTravelFile"] = (
    tripId,
    fileName,
    category = "other",
    fileUri,
    fileType
  ) => {
    const timestamp = now();
    const file: TravelFile = {
      id: createId("travel-file"),
      tripId,
      title: fileName,
      category,
      fileName,
      fileUri: fileUri ?? `local://selected/${fileName}`,
      fileType,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    setTrips((current) =>
      current.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              files: [file, ...trip.files],
              updatedAt: timestamp
            }
          : trip
      )
    );

    return file;
  };

  const addTravelChecklistItem: AppDataContextValue["addTravelChecklistItem"] = (tripId, title) => {
    const timestamp = now();
    const item: TravelChecklistItem = {
      id: createId("travel-check"),
      tripId,
      title: trimmed(title, "New trip checklist item"),
      isDone: false,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    setTrips((current) =>
      current.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              checklist: [item, ...trip.checklist],
              updatedAt: timestamp
            }
          : trip
      )
    );

    return item;
  };

  const deleteTravelFile = (tripId: string, fileId: string) => {
    const timestamp = now();

    setTrips((current) =>
      current.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              files: trip.files.filter((file) => file.id !== fileId),
              updatedAt: timestamp
            }
          : trip
      )
    );
  };

  const toggleTravelChecklistItem = (tripId: string, checklistItemId: string) => {
    const timestamp = now();

    setTrips((current) =>
      current.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              checklist: trip.checklist.map((item) =>
                item.id === checklistItemId
                  ? {
                      ...item,
                      isDone: !item.isDone,
                      updatedAt: timestamp
                    }
                  : item
              ),
              updatedAt: timestamp
            }
          : trip
      )
    );
  };

  const deleteTravelChecklistItem = (tripId: string, checklistItemId: string) => {
    const timestamp = now();

    setTrips((current) =>
      current.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              checklist: trip.checklist.filter((item) => item.id !== checklistItemId),
              updatedAt: timestamp
            }
          : trip
      )
    );
  };

  const setMonthlyBudgetAmount = (amount: number) => {
    setMonthlyBudget((current) => ({
      ...current,
      amount,
      updatedAt: now()
    }));
  };

  const addBudgetItem: AppDataContextValue["addBudgetItem"] = (title, amount, category = "other") => {
    const timestamp = now();
    const item: BudgetItem = {
      id: createId("budget"),
      title: trimmed(title, "New expense"),
      amount,
      currency: monthlyBudget.currency,
      category,
      date: timestamp.slice(0, 10),
      createdAt: timestamp,
      updatedAt: timestamp
    };

    setBudgetItems((current) => [item, ...current]);
    return item;
  };

  const deleteBudgetItem = (id: string) => {
    setBudgetItems((current) => current.filter((item) => item.id !== id));
  };

  const saveEmergencyContact: AppDataContextValue["saveEmergencyContact"] = (input) => {
    const timestamp = now();
    const id = input.id ?? createId("contact");

    setEmergencyContacts((current) => {
      const existing = current.find((item) => item.id === id);
      const nextContact: EmergencyContact = {
        id,
        name: trimmed(input.name, existing?.name ?? "New contact"),
        category: input.category,
        phone: input.phone?.trim() || undefined,
        email: input.email?.trim() || undefined,
        address: input.address?.trim() || undefined,
        notes: input.notes?.trim() || undefined,
        createdAt: existing?.createdAt ?? timestamp,
        updatedAt: timestamp
      };

      return existing
        ? current.map((item) => (item.id === id ? nextContact : item))
        : [nextContact, ...current];
    });

    return id;
  };

  const deleteEmergencyContact = (id: string) => {
    setEmergencyContacts((current) => current.filter((item) => item.id !== id));
  };

  return (
    <AppDataContext.Provider
      value={{
        checklistItems,
        documents,
        trips,
        budgetItems,
        monthlyBudget,
        emergencyContacts,
        addChecklistItem,
        updateChecklistItem,
        cycleChecklistStatus,
        deleteChecklistItem,
        saveDocument,
        deleteDocument,
        saveTrip,
        deleteTrip,
        addTravelFile,
        deleteTravelFile,
        addTravelChecklistItem,
        toggleTravelChecklistItem,
        deleteTravelChecklistItem,
        setMonthlyBudgetAmount,
        addBudgetItem,
        deleteBudgetItem,
        saveEmergencyContact,
        deleteEmergencyContact
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);

  if (!context) {
    throw new Error("useAppData must be used inside AppDataProvider");
  }

  return context;
}
