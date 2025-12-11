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