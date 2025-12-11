export interface Organization {
  id: string
  tenant_id: string
  legal_name: string
  email: string
  phone_number: string
  fax: string
  website?: string
  logo_url?: string

  // Identifiers & Regulatory Data
  ein: string // Employer Identification Number
  npi: string // National Provider ID
  mpi: string // Medicaid/Medicare Provider ID
  taxonomy_code: string

  // Location
  country: string
  state: string
  city: string
  address?: string

  // Configuration
  status: "active" | "inactive"
  default_language: string
  subscription_plan?: "basic" | "pro" | "enterprise"

  // Timestamps
  created_at: string
  updated_at: string
}

export interface CreateOrganizationInput {
  legal_name: string
  email: string
  phone_number: string
  fax: string
  website?: string
  logo_url?: string

  ein: string
  npi: string
  mpi: string
  taxonomy_code: string

  country: string
  state: string
  city: string
  address?: string

  status: "active" | "inactive"
  default_language: string
  subscription_plan?: "basic" | "pro" | "enterprise"
}

export interface UpdateOrganizationInput extends Partial<CreateOrganizationInput> {
  id: string
}
