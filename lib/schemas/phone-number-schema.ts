import { z } from "zod";
import {
  getPhoneValidationError,
  PHONE_VALIDATION_ERROR,
} from "@/lib/utils/phone-validation";

export function phoneNumberSchema(requiredMessage = PHONE_VALIDATION_ERROR.REQUIRED) {
  return z.string().superRefine((value, context) => {
    const validationError = getPhoneValidationError(value);

    if (!validationError) {
      return;
    }

    context.addIssue({
      code: z.ZodIssueCode.custom,
      message:
        validationError === PHONE_VALIDATION_ERROR.REQUIRED
          ? requiredMessage
          : validationError,
    });
  });
}
