import assert from "node:assert/strict";
import test from "node:test";
import {
  PHONE_VALIDATION_ERROR,
  formatPhoneInput,
  formatPhoneDisplay,
  getPhoneValidationError,
  sanitizePhoneInput,
} from "@/lib/utils/phone-validation";
import { phoneNumberSchema } from "@/lib/schemas/phone-number-schema";

test("phone validation: required error for empty/whitespace", () => {
  assert.equal(getPhoneValidationError(""), PHONE_VALIDATION_ERROR.REQUIRED);
  assert.equal(getPhoneValidationError("   "), PHONE_VALIDATION_ERROR.REQUIRED);
});

test("phone validation: format error for invalid chars or misplaced +", () => {
  assert.equal(getPhoneValidationError("123ABC4567"), PHONE_VALIDATION_ERROR.FORMAT);
  assert.equal(getPhoneValidationError("12+34567890"), PHONE_VALIDATION_ERROR.FORMAT);
});

test("phone validation: length error based on real digit count", () => {
  assert.equal(getPhoneValidationError("123-456-789"), PHONE_VALIDATION_ERROR.LENGTH);
  assert.equal(
    getPhoneValidationError("+1 (234) 567-8901 2"),
    PHONE_VALIDATION_ERROR.LENGTH,
  );
});

test("phone validation: valid conservative formats", () => {
  assert.equal(getPhoneValidationError("1234567890"), null);
  assert.equal(getPhoneValidationError("123-456-7890"), null);
  assert.equal(getPhoneValidationError("+1 (234) 567-8901"), null);
  assert.equal(getPhoneValidationError("1 (234) 567-8901"), null);
});

test("phone formatting: input mask follows exact typing pattern", () => {
  assert.equal(formatPhoneInput("3"), "3");
  assert.equal(formatPhoneInput("305"), "305");
  assert.equal(formatPhoneInput("3055"), "(305) 5");
  assert.equal(formatPhoneInput("30555"), "(305) 55");
  assert.equal(formatPhoneInput("3055551234"), "(305) 555-1234");
  assert.equal(formatPhoneInput("13055551234"), "+1 (305) 555-1234");
  assert.equal(formatPhoneInput("23055551234"), "+1 (305) 555-1234");
});

test("phone formatting: display uses +1 only when starts with 1", () => {
  assert.equal(formatPhoneDisplay("3055551234"), "(305) 555-1234");
  assert.equal(formatPhoneDisplay("13055551234"), "+1 (305) 555-1234");
  assert.equal(formatPhoneDisplay("23055551234"), "(230) 555-5123");
});

test("phone formatting: sanitize input keeps only digits and applies mask", () => {
  assert.equal(sanitizePhoneInput("+1 (234) 567-8901"), "+1 (234) 567-8901");
  assert.equal(sanitizePhoneInput("12+34abc/56"), "(123) 456");
  assert.equal(sanitizePhoneInput("12345678901234"), "+1 (234) 567-8901");
});

test("phone zod schema helper: required error", () => {
  const schema = phoneNumberSchema();
  const parseResult = schema.safeParse("   ");

  assert.equal(parseResult.success, false);
  if (parseResult.success) {
    return;
  }

  assert.equal(parseResult.error.issues[0]?.message, PHONE_VALIDATION_ERROR.REQUIRED);
});

test("phone zod schema helper: format error", () => {
  const schema = phoneNumberSchema();
  const parseResult = schema.safeParse("12+34567890");

  assert.equal(parseResult.success, false);
  if (parseResult.success) {
    return;
  }

  assert.equal(parseResult.error.issues[0]?.message, PHONE_VALIDATION_ERROR.FORMAT);
});

test("phone zod schema helper: length error", () => {
  const schema = phoneNumberSchema();
  const parseResult = schema.safeParse("123-456-789");

  assert.equal(parseResult.success, false);
  if (parseResult.success) {
    return;
  }

  assert.equal(parseResult.error.issues[0]?.message, PHONE_VALIDATION_ERROR.LENGTH);
});

test("phone zod schema helper: parses valid value", () => {
  const schema = phoneNumberSchema();
  const parseResult = schema.safeParse("+1 (234) 567-8901");
  assert.equal(parseResult.success, true);
});
