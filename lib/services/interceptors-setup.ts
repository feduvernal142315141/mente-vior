/**
 * Axios Interceptors Configuration
 * 
 * This file provides different methods to configure interceptors
 * according to your current project needs.
 */

import { setInterceptorHandlers } from './apiConfig'
import { toast } from 'sonner'

/**
 * Basic configuration using Sonner for notifications
 * This is the recommended configuration to start with
 */
export const setupInterceptorsBasic = (resetActivityCallback?: () => void) => {
  setInterceptorHandlers({
    onLoadingStart: () => {
      console.log('🔄 Starting request...')
    },

    onLoadingEnd: () => {
      console.log('✅ Request completed')
    },

    onActivity: () => {
      resetActivityCallback?.()
    },

    onNotification: (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
      switch (type) {
        case 'success':
          toast.success(message)
          break
        case 'error':
          toast.error(message)
          break
        case 'warning':
          toast.warning(message)
          break
        case 'info':
          toast.info(message)
          break
      }
    },

    onUnauthorized: () => {
      toast.error('Your session has expired. Please log in again.')
      setTimeout(() => {
        window.location.href = '/login'
      }, 10000)
    },

    onForbidden: () => {
      toast.error('You do not have permission to perform this action.')
    },
  })
}

/**
 * Advanced configuration using AlertContext
 * Use this if you prefer using the AlertDialog system instead of toast
 */
export const setupInterceptorsWithAlertContext = (
  showError: (title: string, description?: string) => void,
  showSuccess: (title: string, description?: string) => void,
  resetActivityCallback?: () => void
) => {
  setInterceptorHandlers({
    onLoadingStart: () => {
      console.log('🔄 Starting request...')
    },

    onLoadingEnd: () => {
      console.log('✅ Request completed')
    },

    onActivity: () => {
      resetActivityCallback?.()
    },

    onNotification: (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
      if (type === 'error') {
        showError('Error', message)
      } else if (type === 'success') {
        toast.success(message)
      } else {
        type === 'warning' ? toast.warning(message) : toast.info(message)
      }
    },

    onUnauthorized: () => {
      showError(
        'Session Expired',
        'Your session has expired. You will be redirected to the login page.'
      )
      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
    },

    onForbidden: () => {
      showError(
        'Access Denied',
        'You do not have the necessary permissions to perform this action.'
      )
    },
  })
}

/**
 * Configuration with global loading spinner support
 * Use this when you implement a global loading component
 */
export const setupInterceptorsWithLoading = (
  setGlobalLoading: (loading: boolean) => void,
  resetActivityCallback?: () => void
) => {
  let activeRequests = 0

  setInterceptorHandlers({
    onLoadingStart: () => {
      activeRequests++
      setGlobalLoading(true)
    },

    onLoadingEnd: () => {
      activeRequests--
      if (activeRequests <= 0) {
        activeRequests = 0
        setGlobalLoading(false)
      }
    },

    onActivity: () => {
      resetActivityCallback?.()
    },

    onNotification: (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
      switch (type) {
        case 'success':
          toast.success(message)
          break
        case 'error':
          toast.error(message)
          break
        case 'warning':
          toast.warning(message)
          break
        case 'info':
          toast.info(message)
          break
      }
    },

    onUnauthorized: () => {
      toast.error('Your session has expired. Please log in again.')
      setTimeout(() => {
        window.location.href = '/login'
      }, 10000)
    },

    onForbidden: () => {
      toast.error('You do not have permission to perform this action.')
    },
  })
}

/**
 * Hybrid configuration (Recommended)
 * Combines Sonner for quick notifications and AlertContext for critical actions
 */
export const setupInterceptorsHybrid = (
  showError: (title: string, description?: string) => void,
  setGlobalLoading?: (loading: boolean) => void,
  resetActivityCallback?: () => void
) => {
  let activeRequests = 0

  setInterceptorHandlers({
    onLoadingStart: () => {
      if (setGlobalLoading) {
        activeRequests++
        setGlobalLoading(true)
      }
    },

    onLoadingEnd: () => {
      if (setGlobalLoading) {
        activeRequests--
        if (activeRequests <= 0) {
          activeRequests = 0
          setGlobalLoading(false)
        }
      }
    },

    onActivity: () => {
      resetActivityCallback?.()
    },

    onNotification: (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
      if (type === 'error' && (message.includes('server') || message.includes('permission'))) {
        showError('Error', message)
      } else {
        switch (type) {
          case 'success':
            toast.success(message)
            break
          case 'error':
            toast.error(message)
            break
          case 'warning':
            toast.warning(message)
            break
          case 'info':
            toast.info(message)
            break
        }
      }
    },

    onUnauthorized: () => {
      showError(
        'Session Expired',
        'Your session has expired. You will be redirected to the login page.'
      )
      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
    },

    onForbidden: () => {
      showError(
        'Access Denied',
        'You do not have the necessary permissions to perform this action. Contact the administrator if you believe this is an error.'
      )
    },
  })
}
