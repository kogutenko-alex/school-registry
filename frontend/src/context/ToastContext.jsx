import React, { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext()

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random()
    const newToast = {
      id,
      type: 'error',
      title: 'Помилка',
      duration: 5000,
      ...toast,
      createdAt: Date.now()
    }

    setToasts(prev => [...prev, newToast])

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id)
    }, newToast.duration)

    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const showError = useCallback((message, options = {}) => {
    return addToast({
      type: 'error',
      message,
      title: 'Помилка',
      ...options
    })
  }, [addToast])

  const showSuccess = useCallback((message, options = {}) => {
    return addToast({
      type: 'success',
      message,
      title: 'Успіх',
      ...options
    })
  }, [addToast])

  const showWarning = useCallback((message, options = {}) => {
    return addToast({
      type: 'warning',
      message,
      title: 'Увага',
      ...options
    })
  }, [addToast])

  const showInfo = useCallback((message, options = {}) => {
    return addToast({
      type: 'info',
      message,
      title: 'Інформація',
      ...options
    })
  }, [addToast])

  const value = {
    toasts,
    addToast,
    removeToast,
    showError,
    showSuccess,
    showWarning,
    showInfo
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  )
} 