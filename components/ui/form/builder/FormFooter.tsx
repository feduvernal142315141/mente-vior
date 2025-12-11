"use client"

import { FooterActionBar } from "@/components/ui/footer-action-bar"
import { KWButton } from "../../kw-button"

interface FormFooterProps {
  isEdit?: boolean
  onCancel?: () => void
  loading?: boolean
}

export default function FormFooter({
  isEdit = false,
  onCancel,
  loading = false,
}: FormFooterProps) {
  return (
    <FooterActionBar>
      {/* Botón Cancelar */}
      <KWButton
        variant="secondary"
        type="button"
        onClick={onCancel}
        disabled={loading}
      >
        {isEdit ? "Back" : "Cancel"}
      </KWButton>

      {/* Botón principal */}
      <KWButton
        variant="primary"
        type="submit"
        form="organization-form"
        loading={loading}
      >
        {isEdit ? "Save Changes" : "Create Organization"}
      </KWButton>
    </FooterActionBar>
  )
}
