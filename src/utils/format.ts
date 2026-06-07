export function formatCurrency(amount: number, currency = "GBP") {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDateRange(startDate: string, endDate: string) {
  return `${startDate} to ${endDate}`;
}

export function getChecklistProgress(doneCount: number, totalCount: number) {
  if (totalCount === 0) {
    return "0/0";
  }

  return `${doneCount}/${totalCount}`;
}
