import { Routes, Route } from 'react-router-dom'
import { Box, Container } from '@chakra-ui/react'
import SchoolPage from './pages/SchoolPage'
import { ToastProvider } from './context/ToastContext'
import ToastContainer from './components/ToastContainer'

function App() {
  return (
    <ToastProvider>
      <Box minHeight="100vh" bg="gray.50">
        <Container maxW="container.xl" py={8}>
          <Routes>
            <Route path="/" element={<SchoolPage />} />
            <Route path="/schools" element={<SchoolPage />} />
          </Routes>
        </Container>
        <ToastContainer />
      </Box>
    </ToastProvider>
  )
}

export default App 