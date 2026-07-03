export const formatCurrency = (amount: number, currency = "BDT") => {
  return new Intl.NumberFormat("en-BD", {
    currency,
    maximumFractionDigits: 0,
    style: "currency",
  }).format(amount);
};

export const formatCompactNumber = (value: number) => {
  return new Intl.NumberFormat("en", {
    compactDisplay: "short",
    maximumFractionDigits: 1,
    notation: "compact",
  }).format(value);
};

export const calculateGrowth = (current: number, previous: number) => {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }

  return ((current - previous) / previous) * 100;
};

export const formatPercent = (value: number) => {
  return new Intl.NumberFormat("en", {
    maximumFractionDigits: 1,
    signDisplay: "exceptZero",
    style: "percent",
  }).format(value / 100);
};

export const getCompletionRate = (done: number, total: number) => {
  if (total <= 0) {
    return 0;
  }

  return Math.min(100, Math.max(0, (done / total) * 100));
};

export const pluralize = (count: number, singular: string, plural = `${singular}s`) => {
  return `${count} ${count === 1 ? singular : plural}`;
};
