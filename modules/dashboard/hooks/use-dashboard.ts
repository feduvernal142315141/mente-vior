"use client"

import { useCallback, useEffect, useState } from "react";
import { DashboardResponse } from "@/lib/models/dashboard/dashboard";
import { serviceGetDashboardInfo } from "@/lib/services/dashboard/dashboard";
import { timeAgo } from "@/lib/utils/format";

const INITIAL_STATE: DashboardResponse = {
  totalOrganization: 0,
  totalActiveOrganization: 0,
  totalUserActive: 0,
  auditLogs: [],
};

interface UseDashboardReturn {
  dashboard: DashboardResponse;
  isLoading: boolean;
  error: string | null;
  formatDate: (date: string) => string;
}

export function useDashboard(): UseDashboardReturn {
  const [dashboard, setDashboard] = useState<DashboardResponse>(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getDashboardInfo = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await serviceGetDashboardInfo();
      if (response?.status === 200) {
        setDashboard(response.data);
      } else {
        setError("Error loading dashboard");
      }
    } catch (err) {
      setError("Connection error");
      console.error("Dashboard fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getDashboardInfo();
  }, [getDashboardInfo]);

  return {
    dashboard,
    isLoading,
    error,
    formatDate: timeAgo,
  };
}

