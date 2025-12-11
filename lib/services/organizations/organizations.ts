import { CompanyListResponse, Organization, RequestCreateCompany, RequestUpdateCompany } from "@/lib/models/organizations/organizations"
import { ServiceResponse } from "@/lib/models/response"
import { serviceGet, servicePost, servicePut } from "../baseService"
import { QueryModel } from "@/lib/models/queryModel"
import { getQueryString } from "@/lib/utils/format"

export const serviceGetAllOrganizations = async (
    query: QueryModel,
): ServiceResponse<CompanyListResponse> => {
    return serviceGet<CompanyListResponse>(
        `/company${
            query ? `?${getQueryString(query)}` : ''
        }`
    )
}

export const serviceCreateCompany = async (
    company: RequestCreateCompany): ServiceResponse<string> => {
    return servicePost<RequestCreateCompany, string>(
        `/company`,
        company
    )
}

export const serviceGetCompanyById = async (
    id: string,
): ServiceResponse<Organization> => {
    return serviceGet<Organization>(
        `/company/${id}`
    )
}

export const serviceUpdateCompany = async (
    campaign: RequestUpdateCompany): ServiceResponse<string> => {
    return servicePut<RequestUpdateCompany, string>(
        `/company`,
        campaign
    )
}