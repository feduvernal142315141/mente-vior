"use client";

import { useState, useCallback } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export function useApi(basePath: string = "") {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async (method: string, url: string, body?: any) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${BASE_URL}${basePath}${url}`, {
          method,
          headers: { "Content-Type": "application/json" },
          body: body ? JSON.stringify(body) : undefined,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Error en la petición");
        }

        return data;
      } catch (err: any) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [basePath]
  );

  return {
    loading,
    error,
    get: (url: string) => request("GET", url),
    post: (url: string, body?: any) => request("POST", url, body),
    put: (url: string, body?: any) => request("PUT", url, body),
    del: (url: string) => request("DELETE", url),
  };
}
