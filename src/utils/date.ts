export type DateInput = string | number | Date;

/**
 * Format a date as DD/MM/YYYY. Returns an empty string if the input is falsy or invalid.
 */
export const formatDateDMY = (input?: DateInput | null): string => {
  if (input === undefined || input === null || input === "") return "";
  const date = input instanceof Date ? input : new Date(input);
  if (isNaN(date.getTime())) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  return `${day}/${month}/${year}`;
};
