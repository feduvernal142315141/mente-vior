import { useState } from "react";
import { useAlert } from "@/lib/contexts/alert-context";
import { downloadBlob } from "@/lib/utils/download";
import { serviceDownloadBlob } from "@/lib/services";

export interface ExportConfig {
  endpoint: string;
  filename: string;
}

export function useTableExport() {
  const [exporting, setExporting] = useState(false);
  const { showSuccess, showError } = useAlert();

  const handleExport = async (config: ExportConfig, queryParams: Record<string, any>) => {
    try {
      setExporting(true);

      // Build query string
      const queryString = new URLSearchParams();
      
      if (queryParams.filters && queryParams.filters.length > 0) {
        queryParams.filters.forEach((filter: string) => {
          queryString.append('filters', filter);
        });
      }
      
      if (queryParams.orders && queryParams.orders.length > 0) {
        queryParams.orders.forEach((order: string) => {
          queryString.append('orders', order);
        });
      }

      const url = `${config.endpoint}?${queryString.toString()}`;
      
      // Use centralized API function
      const response = await serviceDownloadBlob(url);
      downloadBlob(response.data, `${config.filename}_${new Date().toISOString().split('T')[0]}.csv`);

      showSuccess("Export successful", "The file has been downloaded successfully");
    } catch (error) {
      showError("Error", "Could not export data");
    } finally {
      setExporting(false);
    }
  };

  return { exporting, handleExport };
}

