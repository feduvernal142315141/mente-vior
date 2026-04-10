export const PHONE_VALIDATION_ERROR = {
  REQUIRED: "Phone number is required",
  FORMAT: "Invalid phone number format",
  LENGTH: "Phone must have 10 or 11 digits (including country code if applicable)",
} as const;

export const PHONE_VALID_DIGIT_LENGTHS = [10, 11] as const;
export const PHONE_MAX_DIGITS = Math.max(...PHONE_VALID_DIGIT_LENGTHS);

export const PHONE_ALLOWED_INPUT_CHAR_REGEX = /^[0-9+\-() ,./]$/;

const PHONE_FORMAT_REGEX = /^\+?[0-9\s()\-.,/]+$/;

const PHONE_VALIDATION_RESULT = {
  VALID: "valid",
  REQUIRED: "required",
  FORMAT: "format",
  LENGTH: "length",
} as const;

type PhoneValidationResult =
  (typeof PHONE_VALIDATION_RESULT)[keyof typeof PHONE_VALIDATION_RESULT];

function isValidPhoneDigitsLength(length: number): boolean {
  return PHONE_VALID_DIGIT_LENGTHS.some((validLength) => validLength === length);
}

export function extractPhoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function formatPhoneInput(value: string): string {
  const digits = extractPhoneDigits(value).slice(0, PHONE_MAX_DIGITS);

  if (digits.length === 0) {
    return "";
  }

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 11)}`;
}

export function formatPhoneDisplay(value: string): string {
  const digits = extractPhoneDigits(value).slice(0, PHONE_MAX_DIGITS);

  if (digits.length === 0) {
    return "";
  }

  if (digits.length === 11 && digits.startsWith("1")) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 11)}`;
  }

  const displayDigits = digits.slice(0, 10);
  const areaCode = displayDigits.slice(0, 3);
  const prefix = displayDigits.slice(3, 6);
  const lineNumber = displayDigits.slice(6, 10);

  if (displayDigits.length <= 3) {
    return `(${areaCode}`;
  }

  if (displayDigits.length <= 6) {
    return `(${areaCode}) ${prefix}`;
  }

  return `(${areaCode}) ${prefix}-${lineNumber}`;
}

export function sanitizePhoneInput(value: string): string {
  return formatPhoneInput(value);
}

export function getPhoneValidationResult(value: string): PhoneValidationResult {
  const trimmedValue = value.trim();

  if (trimmedValue.length === 0) {
    return PHONE_VALIDATION_RESULT.REQUIRED;
  }

  if (!PHONE_FORMAT_REGEX.test(trimmedValue)) {
    return PHONE_VALIDATION_RESULT.FORMAT;
  }

  const digitsLength = extractPhoneDigits(trimmedValue).length;
  if (!isValidPhoneDigitsLength(digitsLength)) {
    return PHONE_VALIDATION_RESULT.LENGTH;
  }

  return PHONE_VALIDATION_RESULT.VALID;
}

export function getPhoneValidationError(value: string): string | null {
  const validationResult = getPhoneValidationResult(value);

  if (validationResult === PHONE_VALIDATION_RESULT.REQUIRED) {
    return PHONE_VALIDATION_ERROR.REQUIRED;
  }

  if (validationResult === PHONE_VALIDATION_RESULT.FORMAT) {
    return PHONE_VALIDATION_ERROR.FORMAT;
  }

  if (validationResult === PHONE_VALIDATION_RESULT.LENGTH) {
    return PHONE_VALIDATION_ERROR.LENGTH;
  }

  return null;
}
