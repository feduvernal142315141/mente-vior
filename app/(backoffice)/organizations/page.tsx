"use client";

import { OrganizationListTable } from "@/modules/organizations/components/organization-list-table";
import { TableToolbar } from "@/components/ui/data-table/table-toolbar";
import { useOrganizations } from "@/modules/organizations/hooks/use-organizations";
import { useTableExport } from "@/components/ui/data-table/use-table-export";
import { useRouter } from "next/navigation";
import { Plus, Download } from "lucide-react";
import { useState, useEffect } from "react";
import {  buildFilters } from "@/lib/utils/query-filters";
import { PageHeader } from "@/components/ui/form/page-header";
import {useDebouncedState} from "@/hooks/useDebouncedState";

export default function OrganizationsPage() {
  const router = useRouter();
  const { exporting, handleExport } = useTableExport();

  const {
    data,
    loading,
    page,
    pageSize,
    total,
    setPage,
    setPageSize,
    filters,
    orders,
    setFilters,
    setOrders,
  } = useOrganizations();

  const [searchValue, setSearchValue] = useDebouncedState("", 500);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const filtersArray = buildFilters(
      [
        {
          field: "active",
          value: statusFilter === "all" ? null : statusFilter === "active",
          operator: "EQ",
          type: "boolean",
        },
      ],
      {
        fields: ["legalName"],
        search: searchValue,
      }
    );

    setFilters(filtersArray);
    setPage(0);
  }, [searchValue, statusFilter]);


  const handleSort = (columnId: string, direction: "asc" | "desc") => {
    setOrders([`${columnId}__${direction.toUpperCase()}`]);
    setPage(0);
  };


  const handleView = (id: string) => {
    router.push(`/organizations/${id}/edit`);
  };

  const handleExportClick = () => {
    handleExport(
      {
        endpoint: "/company/export",
        filename: "companias"
      },
      { filters, orders }
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 animate-fade-in"> 

      <PageHeader
        breadcrumb={[
          { label: "Back Office", href: "/dashboard" },
          { label: "Organizations" },
        ]}
        title="Organizations"
        className="mb-2"
      />

      <TableToolbar
        searchPlaceholder="Search organizations..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filters={[
          {
            label: "Status",
            chips: [
              { id: "all", label: "All", active: statusFilter === "all" },
              { id: "active", label: "Active", active: statusFilter === "active" },
              { id: "inactive", label: "Inactive", active: statusFilter === "inactive" },
            ],
            onChipClick: setStatusFilter,
          },
        ]}
        primaryAction={{
          label: "Create Organization",
          icon: <Plus className="w-4 h-4" />,
          onClick: () => router.push("/organizations/create"),
        }}
        secondaryActions={[
          {
            label: "Export",
            icon: <Download className="w-4 h-4" />,
            onClick: handleExportClick,
            disabled: exporting,
          },
        ]}
      />

      <OrganizationListTable
        organizations={data}
        loading={loading}
        onView={handleView}
        onSort={handleSort}
        pagination={{
          page: page + 1,             
          pageSize,
          total,
          onChangePage: (p) => setPage(p - 1),    
          onChangePageSize: setPageSize,
        }}
      />
    </div>
  );
}
