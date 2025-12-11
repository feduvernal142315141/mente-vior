"use client"

import { useCallback, useEffect, useState } from "react";
import { PublicInfoResponse} from "@/lib/models/dashboard/dashboard";
import { serviceGetPublicInfo} from "@/lib/services/dashboard/dashboard";

const INITIAL_STATE: PublicInfoResponse = {
  totalActiveOrganization: 0,
  totalUserActive: 0,
};

interface UseDashboardReturn {
  publicInfo: PublicInfoResponse;
  isLoading: boolean;
  error: string | null;
}

export function useLoginFeature(): UseDashboardReturn {
  const [publicInfo, setPublicInfo] = useState<PublicInfoResponse>(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getPublicInfo = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await serviceGetPublicInfo();
      if (response?.status === 200) {
        setPublicInfo(response.data);
      } else {
        setError("Error loading public info");
      }
    } catch (err) {
      setError("Connection error");
      console.error("Dashboard fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getPublicInfo();
  }, [getPublicInfo]);

  return {
    publicInfo,
    isLoading,
    error,
  };
}

