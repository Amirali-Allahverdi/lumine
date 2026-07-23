export const formatBudget = (value: number): string =>
  new Intl.NumberFormat("fa-IR").format(value);
