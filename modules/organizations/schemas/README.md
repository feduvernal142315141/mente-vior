# Organization Schemas

Validation schemas for organization forms using Zod.

## Files

- `organization.schema.ts` - Zod schemas for organization creation and editing

## Schemas

### `organizationCreateSchema`

Validates all fields required for creating a new organization:

- **General Information**: legal_name, email, phone_number, fax, website, logo_url
- **Identifiers**: ein, npi, mpi, taxonomy_code
- **Location**: country, state, city, address
- **Configuration**: status, default_language, subscription_plan

### `organizationUpdateSchema`

Extends `organizationCreateSchema` with read-only tenant_id field.

## Usage

\`\`\`typescript
import { organizationCreateSchema } from '@/modules/organizations/schemas/organization.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const form = useForm({
  resolver: zodResolver(organizationCreateSchema),
  defaultValues: { ... }
})
\`\`\`

## Validation Rules

- **Email**: Must be valid email format
- **EIN**: Format XX-XXXXXXX or minimum 9 characters
- **NPI**: Exactly 10 digits
- **MPI**: Minimum 6 characters
- **Taxonomy Code**: Exactly 10 characters
- **Website**: Must be valid URL or empty
- **Status**: Must be "active" or "inactive"
- **Subscription Plan**: Must be "basic", "pro", or "enterprise"
