import React, { useEffect, useState } from 'react'
import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Progress,
  VStack
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`

const Toast = ({ toast, onClose }) => {
  const [isExiting, setIsExiting] = useState(false)
  const [progress, setProgress] = useState(100)

  const { id, type, title, message, duration, createdAt } = toast

  useEffect(() => {
    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - createdAt
      const remaining = Math.max(0, duration - elapsed)
      const progressValue = (remaining / duration) * 100
      
      setProgress(progressValue)

      if (remaining <= 0) {
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [createdAt, duration])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      onClose(id)
    }, 300)
  }

  const getColorScheme = () => {
    switch (type) {
      case 'success': return 'success'
      case 'error': return 'error'
      case 'warning': return 'warning'
      case 'info': return 'info'
      default: return 'error'
    }
  }

  return (
    <Box
      w="400px"
      animation={`${isExiting ? slideOut : slideIn} 0.3s ease-out`}
      mb={3}
    >
      <Alert
        status={getColorScheme()}
        variant="solid"
        borderRadius="md"
        boxShadow="lg"
        position="relative"
        overflow="hidden"
      >
        <AlertIcon />
        <Box flex="1">
          <AlertTitle fontSize="sm" fontWeight="bold">
            {title}
          </AlertTitle>
          <AlertDescription fontSize="sm" mt={1}>
            {message}
          </AlertDescription>
        </Box>
        <CloseButton
          position="absolute"
          right="8px"
          top="8px"
          size="sm"
          onClick={handleClose}
        />
        <Progress
          value={progress}
          size="xs"
          colorScheme={getColorScheme()}
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          bg="transparent"
        />
      </Alert>
    </Box>
  )
}

export default Toast 