/**
 * Exports centralizados de los servicios
 */

// Servicios base (GET, POST, PUT, DELETE, DOWNLOAD BLOB)
export { serviceGet, servicePost, servicePut, serviceDelete, serviceDownloadBlob } from './baseService'

// Instancia de Axios y configuración de interceptores
export { default as apiInstance, setInterceptorHandlers } from './apiConfig'

// Configuraciones predefinidas de interceptores
export {
  setupInterceptorsBasic,
  setupInterceptorsWithAlertContext,
  setupInterceptorsWithLoading,
  setupInterceptorsHybrid,
} from './interceptors-setup'

// Types
export type { ResponseEntity, ServiceResponse } from '../models/response'

