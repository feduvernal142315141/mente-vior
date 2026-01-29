import type { FormConfig } from "@/components/ui/form/builder/FormBuilder.types";
import type { OrganizationFormData } from "../schemas/organization.schema";

interface OrganizationFormConfig {
    showStatus: boolean
}

export const organizationFormConfig = ({showStatus}: OrganizationFormConfig): FormConfig<OrganizationFormData> => {
    return {
        title: "Create Organization",
        subtitle: "Register a new company and its admin user",

        schema: undefined as any,

        defaultValues: {
            legalName: "",
            agencyEmail: "",
            phoneNumber: "",
            fax: "",
            webSite: "",
            ein: "",
            npi: "",
            mpi: "",
            taxonomyCode: "",
            logo: "",

            agreements: [],

            country: "",
            stateId: "",
            city: "",
            address: "",
            zipCode: "",
            userCompany: {
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
            },


            status: true,
            language: "en",
        },

        sections: [
            {
                id: "general",
                title: "General Information",
                description: "Basic details about the organization",
                columns: 2,
                side: "left",
                fields: [
                    { name: "legalName", label: "Legal Name", type: "text", required: true },
                    { name: "agencyEmail", label: "Agency Email", type: "email", required: true },
                    { name: "phoneNumber", label: "Phone Number", type: "text", required: true },
                    { name: "fax", label: "Fax", type: "text", required: true },
                    { name: "webSite", label: "Website", type: "text" },
                ],
            },
            {
                id: "regulatory",
                title: "Regulatory Information",
                description: "Required regulatory identifiers for healthcare compliance",
                columns: 2,
                side: "left",
                fields: [
                    { name: "ein", label: "Employer ID (EIN)", type: "text", required: true },
                    { name: "npi", label: "National Provider ID (NPI)", type: "text", required: true },
                    { name: "mpi", label: "Medicaid Provider ID", type: "text", required: true },
                    { name: "taxonomyCode", label: "Taxonomy Code", type: "text", required: true },
                ],
            },
            {
                id: "location",
                title: "Location",
                description: "Organization's physical address and location details",
                columns: 1,
                side: "left",
                fields: [
                    { name: "address", label: "Address", type: "textarea", required: true },
                    { name: "country", label: "Country", type: "select", required: true, optionsKey: "COUNTRIES" },
                    { name: "stateId", label: "State", type: "select", optionsKey: "STATES", required: true },
                    { name: "city", label: "City", type: "text", required: true },
                    { name: "zipCode", label: "ZIP Code", type: "text", required: true },
                ],
            },
            {
                id: "logo",
                title: "Organization Logo",
                side: "right",
                columns: 1,
                fields: [
                    { name: "logo", label: "Logo", type: "logo", required: true },
                ],
            },
            {
                id: "agreements",
                title: "Agreements",
                description: "Upload agreement documents for this organization",
                side: "right",
                columns: 1,
                fields: [
                    { name: "agreements", label: "Agreement Documents", type: "agreements", required: false },
                ],
            },
            {
                id: "admin-user",
                title: "Admin User",
                description: "Primary administrator of this organization",
                columns: 2,
                side: "left",
                fields: [
                    { name: "userCompany.firstName", label: "First Name", type: "text", required: true },
                    { name: "userCompany.lastName", label: "Last Name", type: "text", required: true },
                    { name: "userCompany.email", label: "Email", type: "email", required: true },
                    { name: "userCompany.phoneNumber", label: "Phone Number", type: "text", required: true },
                ],
            },
            {
                id: "settings",
                title: "Settings",
                side: "right",
                columns: 1,
                fields: [
                    { name: "status", label: "Status", type: "switch", visible: showStatus },
                    { name: "language", label: "Language", type: "select", options: [
                            { label: "English (US)", value: "en" }
                        ] },
                    // { name: "subscription_plan", label: "Subscription Plan", type: "select", options: [
                    //   { label: "Basic", value: "basic" },
                    //   { label: "Standard", value: "standard" },
                    //   { label: "Premium", value: "premium" }
                    // ], required: true },
                ],
            },
        ],
    }
};
