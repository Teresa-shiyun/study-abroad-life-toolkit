import type { ChecklistStatus, DocumentStatus } from "../types";

export function getChecklistStatusTone(status: ChecklistStatus) {
  if (status === "done") {
    return "success" as const;
  }

  if (status === "inProgress") {
    return "warning" as const;
  }

  return "neutral" as const;
}

export function getDocumentStatusTone(status: DocumentStatus) {
  if (status === "prepared") {
    return "success" as const;
  }

  if (status === "missing" || status === "expired") {
    return "danger" as const;
  }

  return "warning" as const;
}
