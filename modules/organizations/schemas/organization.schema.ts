import { z } from "zod";

const phoneFaxRegex = /^[0-9+\-() ,./\\:;_*@!?=%&#]+$/;
const alphanumericSpecialRegex = /^[a-zA-Z0-9+\-() ,./\\:;_*@!?=%&#]+$/;
const nameRegex = /^[a-zA-Z\s]+$/;

export const organizationCreateSchema = z.object({
  legalName: z.string().min(1, "Legal name is required"),
  agencyEmail: z.string().email("Invalid email address"),

  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(phoneFaxRegex, "Only digits and special characters, are allowed"), 

  fax: z
    .string()
    .min(1, "Fax is required")
    .regex(phoneFaxRegex, "Only digits and special characters, are allowed"),

  webSite: z.string().optional(),

  ein: z
    .string()
    .min(1, "EIN is required")
    .regex(phoneFaxRegex, "Only digits and special characters, are allowed"), 

  npi: z.string()
    .min(1, "NPI is required")
    .regex(phoneFaxRegex, "Only digits and special characters, are allowed"), 
  mpi: z.string().min(1, "MPI is required")
    .regex(phoneFaxRegex, "Only digits and special characters, are allowed"),
  taxonomyCode: z
    .string()
    .min(1, "Taxonomy code is required")
    .regex(alphanumericSpecialRegex, "Only letters, digits and special characters are allowed"),

  logo: z.string().min(1, "Logo is required"),

  country: z.string().min(1, "Country is required"),
  stateId: z.string().min(1, "State is required"),
  city: z.string().min(1),
  address: z.string().min(1, "Address is required"),
  zipCode: z
    .string()
    .min(1, "ZIP Code is required")
    .regex(/^\d{5}$/, "ZIP Code must be exactly 5 digits"),

  status: z.boolean().default(true),
  language: z.string().default("en"),
  active: z.boolean().default(true).optional(),

  userCompany: z.object({
    id: z.string().optional(),
    firstName: z.string()
      .min(1, "First name is required")
      .regex(nameRegex, "Only letters and spaces are allowed"),
    lastName: z.string()
      .min(1, "Last name is required")
      .regex(nameRegex, "Only letters and spaces are allowed"),
    email: z.string().email(),
    phoneNumber: z.string().min(1, "Phone number is required")
    .regex(phoneFaxRegex, "Only digits and special characters, are allowed"),
  }),
});

export type OrganizationFormData = z.infer<typeof organizationCreateSchema>;
