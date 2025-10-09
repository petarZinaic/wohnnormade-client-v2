import { TFunction } from "i18next";

/**
 * Converts a string to camelCase format
 * Example: "Rent Not Paid" -> "rentNotPaid"
 * @param str - The string to convert
 * @returns The camelCase version of the string
 */
function toCamelCase(str: string): string {
  return str
    .trim()
    .split(/[\s_-]+/) // Split by spaces, underscores, or hyphens
    .map((word, index) => {
      // Lowercase the first word, capitalize the rest
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
}

/**
 * Translates violation type from database English value to localized text.
 * This is a generic solution that automatically converts database values
 * to translation keys without hardcoding specific violation types.
 *
 * To add new violation types:
 * 1. Add the new type to the database (e.g., "Contract Breach")
 * 2. Add translations to en.json and de.json:
 *    - "violationTypes": { "contractBreach": "Contract Breach" / "Vertragsbruch" }
 * 3. No code changes needed!
 *
 * @param violationType - The violation type value from database (in English)
 * @param t - Translation function from react-i18next
 * @returns Translated violation type string
 */
export function translateViolationType(
  violationType: string | undefined,
  t: TFunction
): string {
  if (!violationType) return "";

  // Convert database value to camelCase translation key
  // Example: "Rent Not Paid" -> "rentNotPaid"
  const translationKey = toCamelCase(violationType);

  // Build the full translation path
  const fullKey = `violationTypes.${translationKey}`;

  // Attempt to get the translation
  const translated = t(fullKey);

  // If translation exists and is different from the key, return it
  // Otherwise, fall back to the original value
  if (translated && translated !== fullKey) {
    return translated;
  }

  return violationType;
}
