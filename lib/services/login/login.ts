import { 
    LoginManagerUserAuthRequest, 
    LoginManagerUserAuthResponse, 
    PublicKeyResponse,
    RefreshTokenRequest,
    RefreshTokenResponse 
} from "@/lib/models/login/login"
import { ServiceResponse } from "@/lib/models/response"
import { serviceGet, servicePost } from "../baseService"
import apiInstance from "../apiConfig"
import { ResponseEntity } from "@/lib/models/response"

export const serviceGetPublicKey = async (
): ServiceResponse<PublicKeyResponse> => {
    return serviceGet<PublicKeyResponse>(
        `/security/public-key`
    )
}

export const serviceLoginManagerUserAuth = async (
    data: LoginManagerUserAuthRequest): ServiceResponse<LoginManagerUserAuthResponse> => {
    return apiInstance
        .post<ResponseEntity<LoginManagerUserAuthResponse>>(`/managers-users/auth/login`, data)
}

export const serviceRefreshToken = async (
    data: RefreshTokenRequest): ServiceResponse<RefreshTokenResponse> => {
    return servicePost<RefreshTokenRequest, RefreshTokenResponse>(
        `/managers-users/auth/refresh-token`,
        data
    )
}