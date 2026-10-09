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
  assert.equal(formatPhoneInput(""), "");
  assert.equal(formatPhoneInput("5"), "5");
  assert.equal(formatPhoneInput("561"), "561");
  assert.equal(formatPhoneInput("5612"), "561-2");
  assert.equal(formatPhoneInput("561215"), "561-215");
  assert.equal(formatPhoneInput("5612154"), "561-215-4");
  assert.equal(formatPhoneInput("5612154451"), "561-215-4451");
  assert.equal(formatPhoneInput("15612154451"), "1-561-215-4451");
});

test("phone formatting: display keeps country code only when starts with 1", () => {
  assert.equal(formatPhoneDisplay("5612154451"), "561-215-4451");
  assert.equal(formatPhoneDisplay("15612154451"), "1-561-215-4451");
  assert.equal(formatPhoneDisplay("25612154451"), "256-121-5445");
});

test("phone formatting: sanitize input keeps only digits and applies mask", () => {
  assert.equal(sanitizePhoneInput("(561) 215-4451"), "561-215-4451");
  assert.equal(sanitizePhoneInput("+1 (561) 215-4451"), "1-561-215-4451");
  assert.equal(sanitizePhoneInput("12+34abc/56"), "123-456");
  assert.equal(sanitizePhoneInput("156121544519999"), "1-561-215-4451");
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
  assert.equal(schema.safeParse("561-215-4451").success, true);
  assert.equal(schema.safeParse("1-561-215-4451").success, true);
});

test("phone zod schema helper: custom messages override defaults", () => {
  const schema = phoneNumberSchema("Fax is required", { length: "Fax length" });

  const emptyResult = schema.safeParse("");
  assert.equal(emptyResult.success, false);
  if (!emptyResult.success) {
    assert.equal(emptyResult.error.issues[0]?.message, "Fax is required");
  }

  const shortResult = schema.safeParse("561-215");
  assert.equal(shortResult.success, false);
  if (!shortResult.success) {
    assert.equal(shortResult.error.issues[0]?.message, "Fax length");
  }
});
