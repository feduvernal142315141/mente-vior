
import { ServiceResponse } from "@/lib/models/response"
import { serviceGet } from "../baseService"
import {DashboardResponse, PublicInfoResponse} from "@/lib/models/dashboard/dashboard";

export const serviceGetDashboardInfo = async (
): ServiceResponse<DashboardResponse> => {
    return serviceGet<DashboardResponse>(
        `/dashboard`
    )
}

export const serviceGetPublicInfo = async (
): ServiceResponse<PublicInfoResponse> => {
    return serviceGet<PublicInfoResponse>(
        `/dashboard/public-info`
    )
}
