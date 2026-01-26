"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import type { OrganizationFormData } from "@/modules/organizations/schemas/organization.schema";

import {
  serviceCreateCompany,
  serviceUpdateCompany,
  serviceGetCompanyById,
} from "@/lib/services/organizations/organizations";

import {
  serviceGetCountries,
  serviceGetStateByCountryId,
} from "@/lib/services/organizations/catalogs";

import { stripBase64Header } from "@/lib/utils/format";
import { useAlert } from "@/lib/contexts/alert-context";

export function useCompanyForm() {
  const router = useRouter();
  const params = useParams();
  const companyId = params?.id as string | undefined;

  const { showSuccess, showError } = useAlert();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingData, setLoadingData] = useState(!!companyId);

  const [globalOptions, setGlobalOptions] = useState({
    COUNTRIES: [] as { label: string; value: string }[],
    STATES: [] as { label: string; value: string }[],
  });

  const [loadingOptions, setLoadingOptions] = useState(true);

  const [formInitialValues, setFormInitialValues] =
    useState<OrganizationFormData | null>(null);

  useEffect(() => {
    async function loadCountries() {
      try {
        const response = await serviceGetCountries({ page: 0, pageSize: 300 });

        const countries = Array.isArray(response?.data?.entities)
          ? response.data.entities
          : [];

        setGlobalOptions(prev => ({
          ...prev,
          COUNTRIES: countries.map((c: any) => ({
            label: c.name,
            value: c.id,
          })),
        }));
      } catch (e) {
        console.error("Error loading countries:", e);
        showError("Error", "Failed to load countries.");
      } finally {
        setLoadingOptions(false);
      }
    }

    loadCountries();
  }, [showError]);

  const loadStatesByCountry = useCallback(
    async (countryId: string) => {
      try {
        const response = await serviceGetStateByCountryId(countryId);

        const states = Array.isArray(response?.data?.entities)
          ? response.data.entities
          : [];

        setGlobalOptions(prev => ({
          ...prev,
          STATES: states.map((s: any) => ({
            label: s.name,
            value: s.id,
          })),
        }));
      } catch (e) {
        console.error("Error loading states:", e);
        showError("Error", "Failed to load states.");
      }
    },
    [showError]
  );

  useEffect(() => {
    if (!companyId) return;

    async function loadCompany() {
      try {
        const resp = await serviceGetCompanyById(companyId!);
        const org = resp?.data;

        if (!org) return;

        if (org.countryId) {
          await loadStatesByCountry(org.countryId);
        }

        const data = {
            legalName: org.legalName,
            agencyEmail: org.agencyEmail,
            phoneNumber: org.phoneNumber,
            fax: org.fax,
            webSite: org.webSite ?? "",
            ein: org.ein,
            npi: org.npi,
            mpi: org.mpi,
            taxonomyCode: org.taxonomyCode,
            logo: org.logo ? org.logo : "",

            businessAgreement: org.businessAgreement ?? "",
            serviceAgreement: org.serviceAgreement ?? "",

            country: org.countryId,
            stateId: org.stateId,
            city: org.city,
            address: org.address ?? "",
            zipCode: org.zipCode ?? "",

            status: org.active,
            language: "en",
            active: org.active,

            userCompany: {
                id: org.userCompany?.id ?? "",
                firstName: org.userCompany?.firstName ?? "",
                lastName: org.userCompany?.lastName ?? "",
                email: org.userCompany?.email ?? "",
                phoneNumber: org.userCompany?.phoneNumber ?? "",
            },
        }

        setFormInitialValues(data);
      } catch (e) {
        console.error("Error loading company:", e);
        showError("Error", "Failed to load organization data.");
      } finally {
        setLoadingData(false);
      }
    }

    loadCompany();
  }, [companyId, loadStatesByCountry, showError]);


  const onSubmit = useCallback(
    async (data: OrganizationFormData) => {
      try {
        setIsSubmitting(true);

        const payload = {
          legalName: data.legalName,
          agencyEmail: data.agencyEmail,
          phoneNumber: data.phoneNumber,
          fax: data.fax,
          webSite: data.webSite ?? "",
          ein: data.ein,
          npi: data.npi,
          mpi: data.mpi,
          taxonomyCode: data.taxonomyCode,
          logo: data.logo ? stripBase64Header(data.logo) : "",
          businessAgreement: data.businessAgreement ? stripBase64Header(data.businessAgreement) : undefined,
          serviceAgreement: data.serviceAgreement ? stripBase64Header(data.serviceAgreement) : undefined,
          stateId: data.stateId,
          city: data.city,
          address: data.address ?? "",
          zipCode: data.zipCode || "",
          userCompany: data.userCompany,
          active: data.status ?? false,
        };

        if (companyId) {
          const resp = await serviceUpdateCompany({ id: companyId, ...payload });

          if (resp?.status >= 400) {
            throw { response: resp };
          }

          showSuccess(
            "Organization updated",
            "The organization details were successfully saved."
          );
        }


        else {
          const resp = await serviceCreateCompany(payload);

          if (resp?.status >= 400) {
            throw { response: resp };
          }

          showSuccess(
            "Organization created",
            "The new organization has been successfully registered."
          );
        }

        setTimeout(() => router.push("/organizations"), 600);
      } catch (error: any) {
        console.group("❌ ERROR SAVING ORGANIZATION");
        console.error("👉 error:", error);
        console.error("👉 response:", error?.response);
        console.error("👉 data:", error?.response?.data);
        console.groupEnd();

        let backendMessage = "An unexpected error occurred.";

        if (error?.response?.data) {
          const data = error.response.data;
          backendMessage = data.message || data.details || backendMessage;
        }

        showError("Error saving organization", backendMessage);
      } finally {
        setIsSubmitting(false);
      }
    },
    [companyId, router, showSuccess, showError]
  );

  return {
    onSubmit,
    isSubmitting,
    globalOptions,
    loadStatesByCountry,
    loadingOptions,
    formInitialValues,
    loadingData,
  };
}
