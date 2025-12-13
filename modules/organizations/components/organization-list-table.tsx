"use client"

import {DataTable, type DataTableColumn} from "@/components/ui/data-table/data-table"
import {Building2} from "lucide-react"
import {useRouter} from "next/navigation"
import {KWBadge} from "@/components/ui/kwComponents/KWBadge"
import {EditIconButton} from "@/components/ui/icons/EditIconButton"
import {ResponseGetAllCompanies} from "@/lib/models/organizations/organizations"
import {formatDate} from "@/lib/utils/date"

interface OrganizationListTableProps {
    organizations: ResponseGetAllCompanies[]
    loading?: boolean
    onView?: (id: string) => void

    pagination?: {
        page: number
        pageSize: number
        total: number
        onChangePage: (page: number) => void
        onChangePageSize: (size: number) => void
    }

    onSort?: (columnId: string, direction: "asc" | "desc") => void
}

export function OrganizationListTable({
                                          organizations,
                                          loading,
                                          pagination,
                                          onSort
                                      }: OrganizationListTableProps) {
    const router = useRouter()

    const columns: DataTableColumn<ResponseGetAllCompanies>[] = [
        {
            id: "legalName",
            header: "Organization Name",
            accessor: (org) => (
                <div className="flex items-center gap-3">
                    {org.logo ? (
                        <img
                            src={
                                org.logo
                                    ? org.logo
                                    : "/placeholder.svg"
                            }
                            alt={org.legalName}
                            className="w-8 h-8 rounded object-cover"
                        />
                    ) : (
                        <div
                            className="w-8 h-8 rounded bg-accent-soft dark:bg-accent/40 flex items-center justify-center border border-border-hairline">
                            <Building2 className="w-4 h-4 text-accent-primary"/>
                        </div>
                    )}

                    <span className="font-semibold text-text-primary dark:text-foreground">
            {org.legalName}
          </span>
                </div>
            ),
            width: "30%",
            sortable: true,
        },
        {
            id: "createAt",
            header: "Created Date",
            accessor: (org) => (
                <span className="text-text-secondary dark:text-muted-foreground">
          {formatDate(org.createAt)}
        </span>
            ),
            width: "20%",
            sortable: true,
        },
        {
            id: "adminName",
            header: "User admin",
            accessor: (org) => (
                org.adminName
            ),
            width: "12%",
        },
        {
            id: "adminEmail",
            header: "Admin email",
            accessor: (org) => (
                org.adminEmail
            ),
            width: "12%",
        },
        {
            id: "cantUsers",
            header: "Users",
            accessor: (org) => (
                org.cantUsers
            ),
            width: "13%",
        },
        {
            id: "cantActiveUsers",
            header: "Active Users",
            accessor: (org) => (
                org.cantActiveUsers
            ),
            width: "13%",
        },
        {
            id: "active",
            header: "Status",
            accessor: (org) => (
                <KWBadge variant={org.active ? "active" : "inactive"}>
                    {org.active ? "Active" : "Inactive"}
                </KWBadge>
            ),
            width: "10%",
        },

        {
            id: "actions",
            header: "Actions",
            accessor: (org) => (
                <div className="flex items-center justify-end gap-2">
                    <EditIconButton
                        onClick={() => router.push(`/organizations/${org.id}/edit`)}
                    />
                </div>
            ),
            align: "right",
            width: "12%",
            isActionsColumn: true,
        },
    ]

    return (
        <DataTable
            data={organizations}
            columns={columns}
            loading={loading}
            emptyState={{
                icon: <Building2 className="w-16 h-16 text-accent-primary dark:text-primary"/>,
                title: "No organizations found",
                description: "Get started by creating your first organization",                
            }}
            pagination={pagination}
            onSort={onSort}
        />
    )
}
