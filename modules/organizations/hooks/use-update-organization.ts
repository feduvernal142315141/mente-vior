"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import type { CreateOrganizationInput, Organization } from "@/lib/types/organization.types"

/**
 * Hook for updating an existing organization
 * Handles the mutation logic, loading state, and toast notifications
 */
export function useUpdateOrganization(organizationId: string) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const updateOrganization = async (data: CreateOrganizationInput): Promise<Organization | null> => {
    setIsLoading(true)
    setError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      const stored = localStorage.getItem("mentevior-organizations")
      if (!stored) throw new Error("No organizations found")

      const organizations = JSON.parse(stored) as Organization[]
      const index = organizations.findIndex((org) => org.id === organizationId)

      if (index === -1) throw new Error("Organization not found")

      const updatedOrganization: Organization = {
        ...organizations[index],
        ...data,
        id: organizationId,
        tenant_id: organizations[index].tenant_id,
        updated_at: new Date().toISOString(),
      }

      organizations[index] = updatedOrganization
      localStorage.setItem("mentevior-organizations", JSON.stringify(organizations))

      toast({
        title: "Organization updated successfully",
        description: `${updatedOrganization.legal_name} has been updated.`,
      })

      router.push("/organizations")

      return updatedOrganization
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update organization"
      setError(errorMessage)

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })

      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    updateOrganization,
    isLoading,
    error,
  }
}
