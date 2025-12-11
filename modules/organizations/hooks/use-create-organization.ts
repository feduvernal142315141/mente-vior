"use client"

import { RequestCreateCompany } from "@/lib/models/organizations/organizations"
import { serviceCreateCompany } from "@/lib/services/organizations/organizations"
import { useState } from "react"

export function useCreateOrganization() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createOrganization = async (data: RequestCreateCompany) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await serviceCreateCompany(data)

      if (response.status !== 201 && response.status !== 200) {
        throw new Error("Error creating organization")
      }

      return response.data
    } catch (err: any) {
      setError(err?.message || "Unexpected error")
      console.error("Create Organization Error:", err)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    createOrganization,
    isLoading,
    error,
  }
}
