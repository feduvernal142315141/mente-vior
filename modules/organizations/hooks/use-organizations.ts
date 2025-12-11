"use client";

import { useCallback, useEffect, useState } from "react";
import { serviceGetAllOrganizations } from "@/lib/services/organizations/organizations";
import type { QueryModel } from "@/lib/models/queryModel";
import { ResponseGetAllCompanies } from "@/lib/models/organizations/organizations";

export function useOrganizations() {
  const [data, setData] = useState<ResponseGetAllCompanies[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [filters, setFilters] = useState<string[]>([]);
  const [orders, setOrders] = useState<string[]>([]);


  const fetchOrganizations = useCallback(async () => {
    try {
      setLoading(true);

      const query: QueryModel = {
        page,
        pageSize,
        filters: filters.length ? filters : undefined,
        orders: orders.length ? orders : undefined,
      };

      const response = await serviceGetAllOrganizations(query);

      setData(response.data.entities);
      setTotal(response.data.pagination.total);
    } catch (error) {
      console.error("Error loading organizations:", error);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, filters, orders]);

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangePageSize = (newSize: number) => {
    setPageSize(newSize);
    setPage(0);
  };

  return {
    data,
    total,
    loading,

    page,
    pageSize,
    setPage: handleChangePage,
    setPageSize: handleChangePageSize,

    filters,
    setFilters,
    orders,
    setOrders,

    fetchOrganizations,
  };
}
