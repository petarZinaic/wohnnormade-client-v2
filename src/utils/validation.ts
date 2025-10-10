export interface ValidationErrors {
  email?: string;
  name?: string;
  surname?: string;
  city?: string;
  country?: string;
  password?: string;
  confirmPassword?: string;
}

type TranslationFunction = (key: string) => string;

export const validateEmail = (
  email: string,
  t?: TranslationFunction
): string | undefined => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return t ? t("validation.emailRequired") : "Email is required";
  if (!emailRegex.test(email))
    return t
      ? t("validation.emailInvalid")
      : "Please enter a valid email address";
  return undefined;
};

export const validateName = (
  name: string,
  t?: TranslationFunction
): string | undefined => {
  if (!name) return t ? t("validation.nameRequired") : "Name is required";
  if (name.length < 2)
    return t
      ? t("validation.nameMinLength")
      : "Name must be at least 2 characters long";
  if (name.length > 50)
    return t
      ? t("validation.nameMaxLength")
      : "Name must be less than 50 characters";
  if (!/^[a-zA-Z\s]+$/.test(name))
    return t
      ? t("validation.nameInvalidCharacters")
      : "Name can only contain letters and spaces";
  return undefined;
};

export const validateSurname = (
  surname: string,
  t?: TranslationFunction
): string | undefined => {
  if (!surname)
    return t ? t("validation.surnameRequired") : "Surname is required";
  if (surname.length < 2)
    return t
      ? t("validation.surnameMinLength")
      : "Surname must be at least 2 characters long";
  if (surname.length > 50)
    return t
      ? t("validation.surnameMaxLength")
      : "Surname must be less than 50 characters";
  if (!/^[a-zA-Z\s]+$/.test(surname))
    return t
      ? t("validation.surnameInvalidCharacters")
      : "Surname can only contain letters and spaces";
  return undefined;
};

export const validateCity = (
  city: string,
  t?: TranslationFunction
): string | undefined => {
  if (!city) return t ? t("validation.cityRequired") : "City is required";
  if (city.length < 2)
    return t
      ? t("validation.cityMinLength")
      : "City must be at least 2 characters long";
  if (city.length > 100)
    return t
      ? t("validation.cityMaxLength")
      : "City must be less than 100 characters";
  return undefined;
};

export const validateCountry = (
  country: string,
  t?: TranslationFunction
): string | undefined => {
  if (!country)
    return t ? t("validation.countryRequired") : "Country is required";
  if (country.length < 2)
    return t
      ? t("validation.countryMinLength")
      : "Country must be at least 2 characters long";
  if (country.length > 100)
    return t
      ? t("validation.countryMaxLength")
      : "Country must be less than 100 characters";
  return undefined;
};

export const validatePassword = (
  password: string,
  t?: TranslationFunction
): string | undefined => {
  if (!password)
    return t ? t("validation.passwordRequired") : "Password is required";
  if (password.length < 8)
    return t
      ? t("validation.passwordMinLength")
      : "Password must be at least 8 characters long";
  if (!/(?=.*[a-z])/.test(password))
    return t
      ? t("validation.passwordLowercase")
      : "Password must contain at least one lowercase letter";
  if (!/(?=.*[A-Z])/.test(password))
    return t
      ? t("validation.passwordUppercase")
      : "Password must contain at least one uppercase letter";
  if (!/(?=.*\d)/.test(password))
    return t
      ? t("validation.passwordNumber")
      : "Password must contain at least one number";
  if (!/(?=.*[@$!%*?&])/.test(password))
    return t
      ? t("validation.passwordSpecialChar")
      : "Password must contain at least one special character (@$!%*?&)";
  return undefined;
};

export const validateConfirmPassword = (
  confirmPassword: string,
  password: string,
  t?: TranslationFunction
): string | undefined => {
  if (!confirmPassword)
    return t
      ? t("validation.confirmPasswordRequired")
      : "Please confirm your password";
  if (confirmPassword !== password)
    return t ? t("validation.passwordsMismatch") : "Passwords do not match";
  return undefined;
};

export const validateRegisterForm = (
  data: {
    email: string;
    name: string;
    surname: string;
    city: string;
    country: string;
    password: string;
    confirmPassword: string;
  },
  t?: TranslationFunction
): ValidationErrors => {
  const errors: ValidationErrors = {};

  errors.email = validateEmail(data.email, t);
  errors.name = validateName(data.name, t);
  errors.surname = validateSurname(data.surname, t);
  errors.city = validateCity(data.city, t);
  errors.country = validateCountry(data.country, t);
  errors.password = validatePassword(data.password, t);
  errors.confirmPassword = validateConfirmPassword(
    data.confirmPassword,
    data.password,
    t
  );

  return errors;
};

export const hasValidationErrors = (errors: ValidationErrors): boolean => {
  return Object.values(errors).some((error) => error !== undefined);
};
