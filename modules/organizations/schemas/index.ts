import { z } from "zod"

/**
 * Organization Form Validation Schema
 *
 * Defines validation rules for organization creation and editing
 * Uses Zod for type-safe validation
 */

export const organizationCreateSchema = z.object({
  // General Information
  legal_name: z
    .string()
    .min(2, "Legal name must be at least 2 characters")
    .max(200, "Legal name must be less than 200 characters"),
  email: z.string().email("Invalid email format"),
  phone_number: z.string().min(10, "Phone number must be at least 10 characters"),
  fax: z.string().min(10, "Fax must be at least 10 characters"),
  website: z.string().url("Invalid URL format").optional().or(z.literal("")),
  logo_url: z.string().optional(),

  // Identifiers & Regulatory Data
  ein: z
    .string()
    .regex(/^\d{2}-\d{7}$/, "EIN must be in format XX-XXXXXXX")
    .or(z.string().min(9, "EIN is required")),
  npi: z.string().length(10, "NPI must be exactly 10 digits"),
  mpi: z.string().min(6, "MPI must be at least 6 characters"),
  taxonomy_code: z.string().length(10, "Taxonomy code must be exactly 10 characters"),

  // Location
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().optional(),

  // Configuration
  status: z.enum(["active", "inactive"]),
  default_language: z.literal("en"),
  subscription_plan: z.enum(["basic", "pro", "enterprise"]).optional(),
})

export const organizationUpdateSchema = organizationCreateSchema.extend({
  // tenant_id is read-only but included for completeness
  tenant_id: z.string().optional(),
})

export type OrganizationFormData = z.infer<typeof organizationCreateSchema>
export type OrganizationUpdateFormData = z.infer<typeof organizationUpdateSchema>
