import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  ButtonGroup,
  IconButton,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Tooltip,
  Box,
  Text,
  Flex
} from '@chakra-ui/react'
import { EditIcon, MinusIcon, TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons'
import { useState, useRef } from 'react'
import { schoolTypeLabels } from '../api/schoolApi'
import { useToast } from '../context/ToastContext'
import { handleApiError } from '../utils/errorUtils'

const SchoolTable = ({ schools, onDeactivate, isLoading = false, onSort, sorting }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [schoolToDeactivate, setSchoolToDeactivate] = useState(null)
  const cancelRef = useRef()
  const { showError, showSuccess } = useToast()

  const handleDeactivateClick = (school) => {
    if (school.isActive) {
      setSchoolToDeactivate(school)
      onOpen()
    }
  }

  const handleDeactivateConfirm = async () => {
    if (schoolToDeactivate) {
      try {
        await onDeactivate(schoolToDeactivate.id)
        showSuccess(`Школу "${schoolToDeactivate.name}" успішно деактивовано`)
      } catch (error) {
        console.error('Deactivate error:', error)
        handleApiError(error, showError)
      }
    }
    onClose()
    setSchoolToDeactivate(null)
  }

  const getStatusColor = (isActive) => {
    return isActive ? 'green' : 'red'
  }

  const getStatusText = (isActive) => {
    return isActive ? 'Активна' : 'Неактивна'
  }

  // Компонент для сортованого заголовка
  const SortableHeader = ({ field, children, ...props }) => {
    const isActive = sorting?.field === field
    const direction = sorting?.direction

    return (
      <Th 
        {...props}
        cursor="pointer" 
        userSelect="none"
        _hover={{ bg: 'gray.100' }}
        onClick={() => onSort?.(field)}
        position="relative"
      >
        <Flex align="center" gap={2}>
          {children}
          <Box w={4} h={4} display="flex" alignItems="center" justifyContent="center">
            {isActive && direction === 'asc' && <TriangleUpIcon w={3} h={3} />}
            {isActive && direction === 'desc' && <TriangleDownIcon w={3} h={3} />}
            {!isActive && <Box w={3} h={3} />}
          </Box>
        </Flex>
      </Th>
    )
  }

  if (!Array.isArray(schools) || schools.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text fontSize="lg" color="gray.500">
          Школи не знайдено
        </Text>
      </Box>
    )
  }

  return (
    <>
      <Box overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <SortableHeader field="name">Назва</SortableHeader>
              <SortableHeader field="edrpou">ЄДРПОУ</SortableHeader>
              <SortableHeader field="region">Регіон</SortableHeader>
              <Th>Тип</Th>
              <Th>Статус</Th>
              <SortableHeader field="createdDate">Дата створення</SortableHeader>
              <Th width="120px">Дії</Th>
            </Tr>
          </Thead>
          <Tbody>
            {schools.map((school) => (
              <Tr key={school.id} _hover={{ bg: 'gray.50' }}>
                <Td>
                  <Text fontWeight="medium">{school.name}</Text>
                </Td>
                <Td>
                  <Text fontFamily="mono">{school.edrpou}</Text>
                </Td>
                <Td>{school.region}</Td>
                <Td>
                  <Badge colorScheme="blue" variant="subtle">
                    {schoolTypeLabels[school.type] || school.type}
                  </Badge>
                </Td>
                <Td>
                  <Badge 
                    colorScheme={getStatusColor(school.isActive)}
                    variant="subtle"
                  >
                    {getStatusText(school.isActive)}
                  </Badge>
                </Td>
                <Td>
                  <Text fontSize="sm" color="gray.600">
                    {school.createdDate ? new Date(school.createdDate).toLocaleDateString('uk-UA', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : '-'}
                  </Text>
                </Td>
                <Td>
                  <ButtonGroup size="sm" spacing={2}>
                    <Tooltip label="Деактивувати школу">
                      <IconButton
                        aria-label="Деактивувати"
                        icon={<MinusIcon />}
                        colorScheme="orange"
                        variant="ghost"
                        onClick={() => handleDeactivateClick(school)}
                        isDisabled={isLoading || !school.isActive}
                      />
                    </Tooltip>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Деактивувати школу
            </AlertDialogHeader>

            <AlertDialogBody>
              Ви впевнені, що хочете деактивувати школу "{schoolToDeactivate?.name}"?
              Школа буде позначена як неактивна.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Скасувати
              </Button>
              <Button 
                colorScheme="orange" 
                onClick={handleDeactivateConfirm} 
                ml={3}
                isLoading={isLoading}
              >
                Деактивувати
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default SchoolTable 