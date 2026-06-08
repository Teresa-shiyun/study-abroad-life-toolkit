export function formatCurrency(amount: number, currency = "GBP") {
  const locale = currency === "CNY" ? "zh-CN" : "en-GB";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2
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

export function getProgressPercent(doneCount: number, totalCount: number) {
  if (totalCount === 0) {
    return 0;
  }

  return Math.round((doneCount / totalCount) * 100);
}
