// Utility functions for handling API errors

export const extractErrorMessages = (error) => {
  const messages = []

  // Check if it's an axios error with response
  if (error.response?.data) {
    const errorData = error.response.data

    // Handle our custom error format
    if (errorData.errors && Array.isArray(errorData.errors)) {
      errorData.errors.forEach(err => {
        if (err.field) {
          // Form validation error
          messages.push(`${err.field}: ${err.message}`)
        } else {
          // General error
          messages.push(err.message)
        }
      })
    } else if (errorData.message) {
      // Single message error
      messages.push(errorData.message)
    } else if (typeof errorData === 'string') {
      // String error
      messages.push(errorData)
    }
  }

  // If no messages extracted, use default
  if (messages.length === 0) {
    if (error.message) {
      messages.push(error.message)
    } else {
      messages.push('Виникла невідома помилка')
    }
  }

  return messages
}

export const getErrorTitle = (error) => {
  if (error.response?.status) {
    switch (error.response.status) {
      case 400:
        return 'Некоректний запит'
      case 401:
        return 'Не авторизовано'
      case 403:
        return 'Доступ заборонено'
      case 404:
        return 'Не знайдено'
      case 409:
        return 'Конфлікт даних'
      case 422:
        return 'Помилка валідації'
      case 500:
        return 'Помилка сервера'
      case 503:
        return 'Сервіс недоступний'
      default:
        return 'Помилка'
    }
  }
  return 'Помилка'
}

export const handleApiError = (error, showToast) => {
  const title = getErrorTitle(error)
  const messages = extractErrorMessages(error)

  // Show each error message as a separate toast
  messages.forEach((message, index) => {
    setTimeout(() => {
      showToast(message, { 
        title,
        type: 'error',
        duration: 5000 + (index * 500) // Stagger the toasts slightly
      })
    }, index * 200)
  })
} 