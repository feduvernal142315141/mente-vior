"use client"
import { useCompanyForm } from "@/components/organizations/hooks/useOrganizationForm"
import { FormBuilder } from "@/components/ui/form/builder/FormBuilder"
import FormFooter from "@/components/ui/form/builder/FormFooter"
import { PageHeader } from "@/components/ui/form/page-header"
import { organizationFormConfig } from "@/modules/organizations/config/organizationFormConfig"
import { organizationCreateSchema } from "@/modules/organizations/schemas/organization.schema"
import { useRouter } from "next/navigation"

export default function CreateOrganizationPage() {
  const { onSubmit, isSubmitting, globalOptions, loadingOptions, loadStatesByCountry } = useCompanyForm();

  const router = useRouter();

  const config = {
    ...organizationFormConfig({showStatus: false}),
    schema: organizationCreateSchema,
  }

  const leftSections = config.sections.filter((s) => s.side !== "right")
  const rightSections = config.sections.filter((s) => s.side === "right")

  return (
    <div
      className="
        min-h-screen 
        bg-bg-soft           /* ← Token light/dark */
        transition-colors duration-300
        pb-40 relative
      "
    >
      <PageHeader
        breadcrumb={[
          { label: "Back Office", href: "/dashboard" },
          { label: "Organizations", href: "/organizations" },
          { label: "Create" },
        ]}
        title="Create Organization"
        description="Register a new organization and its admin user"
        className="px-12"
      />

      <div className="w-full pt-6">
        <FormBuilder
          config={{ ...config, sections: [...leftSections, ...rightSections] }}
          globalOptions={globalOptions}
          onSubmit={onSubmit}
          loadStatesByCountry={loadStatesByCountry}
        />
      </div>

      <FormFooter onCancel={() => router.push("/organizations")} loading={isSubmitting} />
    </div>
  )
}
