import { CatalogListResponse } from "@/lib/models/organizations/catalogs"
import { QueryModel } from "@/lib/models/queryModel"
import { ServiceResponse } from "@/lib/models/response"
import { getQueryString } from "@/lib/utils/format"
import { serviceGet } from "../baseService"

export const serviceGetCountries = async (
    query: QueryModel,
): ServiceResponse<CatalogListResponse> => {
    return serviceGet<CatalogListResponse>(
        `/country${
            query ? `?${getQueryString(query)}` : ''
        }`
    )
}

export const serviceGetStateByCountryId = async (
    countryId: string,
): ServiceResponse<CatalogListResponse> => {
    return serviceGet<CatalogListResponse>(
        `/state/${countryId}`
    )
}

export const serviceGetServiceCatalog = async (
    query: QueryModel,
): ServiceResponse<CatalogListResponse> => {
    return serviceGet<CatalogListResponse>(
        `/service/catalog${query ? `?${getQueryString(query)}` : ''}`
    )
}

export interface TimeZoneItem {
    id: string
    name: string
    code: string
}

export const serviceGetTimeZoneByState = async (
    stateId: string,
    city?: string,
): ServiceResponse<TimeZoneItem[]> => {
    const params = new URLSearchParams({ stateId })
    if (city?.trim()) params.set("city", city.trim())
    return serviceGet<TimeZoneItem[]>(`/time-zone/by-state?${params.toString()}`)
}