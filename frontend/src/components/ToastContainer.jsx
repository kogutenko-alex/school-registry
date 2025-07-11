import React from 'react'
import { Box, VStack } from '@chakra-ui/react'
import { useToast } from '../context/ToastContext'
import Toast from './Toast'

const ToastContainer = () => {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) {
    return null
  }

  return (
    <Box
      position="fixed"
      top="20px"
      right="20px"
      zIndex={9999}
      pointerEvents="none"
    >
      <VStack spacing={3} align="flex-end">
        {toasts.map((toast) => (
          <Box key={toast.id} pointerEvents="auto">
            <Toast
              toast={toast}
              onClose={removeToast}
            />
          </Box>
        ))}
      </VStack>
    </Box>
  )
}

export default ToastContainer 