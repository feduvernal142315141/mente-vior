"use client";

import { useRouter } from "next/navigation";

import { PageHeader } from "@/components/ui/form/page-header";
import { FormBuilder } from "@/components/ui/form/builder/FormBuilder";
import FormFooter from "@/components/ui/form/builder/FormFooter";

import { organizationFormConfig } from "@/modules/organizations/config/organizationFormConfig";
import { organizationCreateSchema } from "@/modules/organizations/schemas/organization.schema";
import { useCompanyForm } from "@/components/organizations/hooks/useOrganizationForm";

export default function EditOrganizationPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const {
    formInitialValues,
    loadingData,
    globalOptions,
    loadStatesByCountry,
    onSubmit,
    isSubmitting,
  } = useCompanyForm();

  if (loadingData || !formInitialValues) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Loading organization...
        </p>
      </div>
    );
  }

  const config = {
    ...organizationFormConfig({showStatus: true}),
    schema: organizationCreateSchema,
    defaultValues: formInitialValues,
  };

  const leftSections = config.sections.filter((s) => s.side !== "right");
  const rightSections = config.sections.filter((s) => s.side === "right");

  return (
    <div className="min-h-screen bg-[#F4F5F7] dark:bg-[#0B0F17] pb-40 relative">
      <PageHeader
        breadcrumb={[
          { label: "Back Office", href: "/dashboard" },
          { label: "Organizations", href: "/organizations" },
          { label: "Edit" },
        ]}
        title="Edit Organization"
        description="Update organization details and admin user"
        className="px-12"
      />

      <div className="w-full mx-auto pt-6">
        <FormBuilder
          config={{ ...config, sections: [...leftSections, ...rightSections] }}
          globalOptions={globalOptions}
          loadStatesByCountry={loadStatesByCountry}
          onSubmit={onSubmit}
        />
      </div>

      <FormFooter
        isEdit
        onCancel={() => router.push("/organizations")}
        loading={isSubmitting}
      />
    </div>
  );
}
