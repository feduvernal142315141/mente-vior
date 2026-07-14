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
  serviceGetServiceCatalog,
  serviceGetTimeZoneByState,
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
    SERVICE_PLANS: [] as { label: string; value: string }[],
    TIME_ZONES: [] as { label: string; value: string }[],
  });

  const [loadingOptions, setLoadingOptions] = useState(true);

  const [formInitialValues, setFormInitialValues] =
    useState<OrganizationFormData | null>(null);

  useEffect(() => {
    async function loadCatalogs() {
      try {
        const [countriesResp, servicesResp] = await Promise.all([
          serviceGetCountries({ page: 0, pageSize: 300 }),
          serviceGetServiceCatalog({ page: 0, pageSize: 100 }),
        ]);

        const countries = Array.isArray(countriesResp?.data?.entities)
          ? countriesResp.data.entities
          : [];

        const services = Array.isArray(servicesResp?.data?.entities)
          ? servicesResp.data.entities
          : [];

        setGlobalOptions(prev => ({
          ...prev,
          COUNTRIES: countries.map((c: any) => ({
            label: c.name,
            value: c.id,
          })),
          SERVICE_PLANS: services.map((s: any) => ({
            label: s.name,
            value: s.id,
          })),
        }));
      } catch (e) {
        console.error("Error loading catalogs:", e);
        showError("Error", "Failed to load catalogs.");
      } finally {
        setLoadingOptions(false);
      }
    }

    loadCatalogs();
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

  // Load time zones by state (and optionally city) — returns the auto-selected code if only one result
  const loadTimeZonesByState = useCallback(
    async (stateId: string, city?: string): Promise<string | null> => {
      try {
        const response = await serviceGetTimeZoneByState(stateId, city);
        const raw = response?.data;

        // API returns array directly, or could be a single object
        let zones: any[] = [];
        if (Array.isArray(raw)) {
          zones = raw;
        } else if (raw && typeof raw === "object" && raw.id && raw.code) {
          zones = [raw];
        }

        setGlobalOptions(prev => ({
          ...prev,
          TIME_ZONES: zones.map((tz: any) => ({
            label: `${tz.name} (${tz.code})`,
            value: tz.code,
          })),
        }));

        if (zones.length === 1) {
          return zones[0].code;
        }
        return null;
      } catch (e) {
        console.error("Error loading time zones:", e);
        return null;
      }
    },
    []
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
        if (org.stateId) {
          await loadTimeZonesByState(org.stateId, org.city);
        }

        const parseAgreements = () => {
          if (!org.agreements || !Array.isArray(org.agreements)) return [];
          return org.agreements.map((item: any, idx: number) => {
            if (typeof item === "object" && item.id && item.name && item.content) {
              return {
                id: item.id,
                name: item.name.replace(".pdf", ""),
                value: item.content, 
                isExisting: true, 
              };
            }
       
            if (typeof item === "object" && item.name && item.value) {
              return {
                id: `agreement-${Date.now()}-${idx}`,
                name: item.name,
                value: item.value,
                isExisting: item.value.startsWith("http"),
              };
            }

            if (typeof item === "string") {
              const urlPath = item.split("?")[0];
              const fullFileName = urlPath.split("/").pop() || "document.pdf";
              const parts = fullFileName.split("_");
              const name = parts.length > 1 ? parts[0] : fullFileName.replace(".pdf", "");
              return {
                id: `agreement-${Date.now()}-${idx}`,
                name,
                value: item,
                isExisting: true,
              };
            }
            return item;
          });
        };

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

            agreements: parseAgreements(),

            servicePlanIds: Array.isArray(org.servicePlanIds)
              ? org.servicePlanIds
              : Array.isArray(org.servicePlans)
                ? org.servicePlans.map((sp: any) => typeof sp === "string" ? sp : sp.id)
                : [],

            country: org.countryId,
            stateId: org.stateId,
            city: org.city,
            timeZone: org.timeZone ?? "",
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

        const processAgreements = (agreements: { id: string; name: string; value: string }[] | undefined): { name: string; content: string }[] => {
          if (!agreements || !Array.isArray(agreements)) return [];
          
          return agreements
            .filter(item => item.value && !item.value.startsWith("http")) 
            .map(item => ({
              name: item.name || "document",
              content: stripBase64Header(item.value),
            }));
        };

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
          agreements: processAgreements(data.agreements),
          servicePlanIds: data.servicePlanIds ?? [],
          timeZone: data.timeZone || "",
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
    loadTimeZonesByState,
    loadingOptions,
    formInitialValues,
    loadingData,
  };
}
