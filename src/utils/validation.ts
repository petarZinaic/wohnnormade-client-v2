export interface ValidationErrors {
  email?: string;
  name?: string;
  surname?: string;
  city?: string;
  country?: string;
  password?: string;
  confirmPassword?: string;
}

export const validateEmail = (email: string): string | undefined => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return undefined;
};

export const validateName = (name: string): string | undefined => {
  if (!name) return "Name is required";
  if (name.length < 2) return "Name must be at least 2 characters long";
  if (name.length > 50) return "Name must be less than 50 characters";
  if (!/^[a-zA-Z\s]+$/.test(name))
    return "Name can only contain letters and spaces";
  return undefined;
};

export const validateSurname = (surname: string): string | undefined => {
  if (!surname) return "Surname is required";
  if (surname.length < 2) return "Surname must be at least 2 characters long";
  if (surname.length > 50) return "Surname must be less than 50 characters";
  if (!/^[a-zA-Z\s]+$/.test(surname))
    return "Surname can only contain letters and spaces";
  return undefined;
};

export const validateCity = (city: string): string | undefined => {
  if (!city) return "City is required";
  if (city.length < 2) return "City must be at least 2 characters long";
  if (city.length > 100) return "City must be less than 100 characters";
  return undefined;
};

export const validateCountry = (country: string): string | undefined => {
  if (!country) return "Country is required";
  if (country.length < 2) return "Country must be at least 2 characters long";
  if (country.length > 100) return "Country must be less than 100 characters";
  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters long";
  if (!/(?=.*[a-z])/.test(password))
    return "Password must contain at least one lowercase letter";
  if (!/(?=.*[A-Z])/.test(password))
    return "Password must contain at least one uppercase letter";
  if (!/(?=.*\d)/.test(password))
    return "Password must contain at least one number";
  if (!/(?=.*[@$!%*?&])/.test(password))
    return "Password must contain at least one special character (@$!%*?&)";
  return undefined;
};

export const validateConfirmPassword = (
  confirmPassword: string,
  password: string
): string | undefined => {
  if (!confirmPassword) return "Please confirm your password";
  if (confirmPassword !== password) return "Passwords do not match";
  return undefined;
};

export const validateRegisterForm = (data: {
  email: string;
  name: string;
  surname: string;
  city: string;
  country: string;
  password: string;
  confirmPassword: string;
}): ValidationErrors => {
  const errors: ValidationErrors = {};

  errors.email = validateEmail(data.email);
  errors.name = validateName(data.name);
  errors.surname = validateSurname(data.surname);
  errors.city = validateCity(data.city);
  errors.country = validateCountry(data.country);
  errors.password = validatePassword(data.password);
  errors.confirmPassword = validateConfirmPassword(
    data.confirmPassword,
    data.password
  );

  return errors;
};

export const hasValidationErrors = (errors: ValidationErrors): boolean => {
  return Object.values(errors).some((error) => error !== undefined);
};
