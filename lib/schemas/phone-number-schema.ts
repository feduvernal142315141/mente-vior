import { z } from "zod";
import {
  getPhoneValidationError,
  PHONE_VALIDATION_ERROR,
} from "@/lib/utils/phone-validation";

interface PhoneNumberSchemaMessages {
  format?: string;
  length?: string;
}

export function phoneNumberSchema(
  requiredMessage = PHONE_VALIDATION_ERROR.REQUIRED,
  messages: PhoneNumberSchemaMessages = {},
) {
  return z.string().superRefine((value, context) => {
    const validationError = getPhoneValidationError(value);

    if (!validationError) {
      return;
    }

    const customMessages: Record<string, string | undefined> = {
      [PHONE_VALIDATION_ERROR.REQUIRED]: requiredMessage,
      [PHONE_VALIDATION_ERROR.FORMAT]: messages.format,
      [PHONE_VALIDATION_ERROR.LENGTH]: messages.length,
    };

    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: customMessages[validationError] ?? validationError,
    });
  });
}
