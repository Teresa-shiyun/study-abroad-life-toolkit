import type { DocumentItem, DocumentStatus } from "../types";

const updateWindowDays = 90;

export function deriveDocumentStatus(document: Pick<DocumentItem, "expiryDate" | "fileName" | "fileUri">): DocumentStatus {
  if (!document.fileName || !document.fileUri) {
    return "missing";
  }

  if (!document.expiryDate) {
    return "prepared";
  }

  const expiryTime = Date.parse(document.expiryDate);
  if (!Number.isFinite(expiryTime)) {
    return "prepared";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (expiryTime < today.getTime()) {
    return "expired";
  }

  const daysUntilExpiry = (expiryTime - today.getTime()) / (1000 * 60 * 60 * 24);
  return daysUntilExpiry <= updateWindowDays ? "needsUpdate" : "prepared";
}
