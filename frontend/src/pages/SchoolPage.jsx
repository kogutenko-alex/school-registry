import { useState, useEffect } from 'react'
import {
  Box,
  Heading,
  Button,
  Flex,
  Spacer,
  Input,
  Select,
  Switch,
  FormControl,
  FormLabel,
  HStack,
  VStack,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
  Spinner,
  Text,
  Badge,
  CheckboxGroup,
  Checkbox,
  Wrap,
  WrapItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  PopoverArrow,
  IconButton
} from '@chakra-ui/react'
import { AddIcon, SearchIcon, ChevronDownIcon } from '@chakra-ui/icons'
import SchoolTable from '../components/SchoolTable'
import SchoolForm from '../components/SchoolForm'
import Pagination from '../components/Pagination'
import { schoolApi, schoolTypes, schoolTypeLabels } from '../api/schoolApi'
import { ukraineRegions } from '../constants/regions'
import { useToast } from '../context/ToastContext'
import { handleApiError } from '../utils/errorUtils'

const SchoolPage = () => {
  const [schools, setSchools] = useState([])
  const [loading, setLoading] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { showError, showSuccess } = useToast()

  // Pagination state
  const [pagination, setPagination] = useState({
    currentPage: 0,
    pageSize: 20,
    totalElements: 0,
    totalPages: 0
  })

  // Filters - change structure for multi-select
  const [filters, setFilters] = useState({
    name: '',
    region: '',
    types: [], // array for multi-select
    statuses: [] // array for multi-select
  })

  // Sorting state
  const [sorting, setSorting] = useState({
    field: null,
    direction: 'asc' // 'asc' or 'desc'
  })

  // Load schools on component mount
  useEffect(() => {
    loadSchools()
  }, [])

  // Auto-reload when filters change with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Reset to first page when filters change
      setPagination(prev => ({ ...prev, currentPage: 0 }))
      loadSchools(0, pagination.pageSize)
    }, 300) // 300ms debounce

    return () => clearTimeout(timeoutId)
  }, [filters])

  // Reload when pagination changes
  useEffect(() => {
    loadSchools(pagination.currentPage, pagination.pageSize)
  }, [pagination.currentPage, pagination.pageSize])

  const loadSchools = async (page = 0, size = 20) => {
    setLoading(true)
    try {
      const data = await schoolApi.getSchoolsWithFilters(filters, page, size)
      setSchools(Array.isArray(data.content) ? data.content : [])
      setPagination(prev => ({
        ...prev,
        currentPage: data.number || 0,
        totalElements: data.totalElements || 0,
        totalPages: data.totalPages || 0
      }))
    } catch (error) {
      console.error('Error loading schools:', error)
      setSchools([]) // Important: set empty array on error
      setPagination(prev => ({
        ...prev,
        currentPage: 0,
        totalElements: 0,
        totalPages: 0
      }))
      handleApiError(error, showError)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateSchool = async (schoolData) => {
    setFormLoading(true)
    try {
      const newSchool = await schoolApi.createSchool(schoolData)
      // Update data without resetting filters
      await loadSchools(pagination.currentPage, pagination.pageSize)
    } catch (error) {
      throw error
    } finally {
      setFormLoading(false)
    }
  }

  const handleDeactivateSchool = async (schoolId) => {
    try {
      const deactivatedSchool = await schoolApi.deactivateSchool(schoolId)
      // Reload data from server with current filters
      await loadSchools(pagination.currentPage, pagination.pageSize)
    } catch (error) {
      throw error
    }
  }

  const handleAddSchool = () => {
    onOpen()
  }

  const handleFormClose = () => {
    onClose()
  }

  const handleFormSubmit = async (schoolData) => {
    await handleCreateSchool(schoolData)
          onClose() // Close form after successful creation
  }

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const clearFilters = () => {
    setFilters({
      name: '',
      region: '',
      types: [],
      statuses: []
    })
  }

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }))
  }

  const handlePageSizeChange = (newSize) => {
    setPagination(prev => ({ 
      ...prev, 
      currentPage: 0, 
      pageSize: newSize 
    }))
  }

  const handleSort = (field) => {
    setSorting(prev => ({
      field: field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  // Function for sorting data
  const sortSchools = (schoolsToSort) => {
    if (!sorting.field) return schoolsToSort

    return [...schoolsToSort].sort((a, b) => {
      let aValue = a[sorting.field]
      let bValue = b[sorting.field]

      // Handle different data types
      if (sorting.field === 'name' || sorting.field === 'edrpou' || sorting.field === 'region') {
        aValue = (aValue || '').toLowerCase()
        bValue = (bValue || '').toLowerCase()
      }

      let result = 0
      if (aValue < bValue) result = -1
      else if (aValue > bValue) result = 1

      return sorting.direction === 'desc' ? -result : result
    })
  }

  // Server-side filtering + client-side sorting
  const filteredAndSortedSchools = sortSchools(schools)

  // Component for multi-select
  const MultiSelectPopover = ({ label, options, selectedValues, onChange, placeholder }) => {
    const selectedCount = selectedValues.length
    const displayText = selectedCount === 0 ? placeholder : 
      selectedCount === 1 ? options.find(opt => opt.value === selectedValues[0])?.label || selectedValues[0] :
      `${selectedCount} вибрано`

    return (
      <Popover>
        <PopoverTrigger>
          <Button 
            variant="outline" 
            rightIcon={<ChevronDownIcon />}
            justifyContent="space-between"
            width="100%"
            fontWeight="normal"
          >
            {displayText}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader fontWeight="semibold">{label}</PopoverHeader>
          <PopoverBody>
            <VStack align="stretch" spacing={2}>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => onChange([])}
                colorScheme="red"
              >
                Очистити все
              </Button>
              <CheckboxGroup value={selectedValues} onChange={onChange}>
                <VStack align="stretch" spacing={2}>
                  {options.map(option => (
                    <Checkbox key={option.value} value={option.value}>
                      {option.label}
                    </Checkbox>
                  ))}
                </VStack>
              </CheckboxGroup>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    )
  }

  const typeOptions = Object.entries(schoolTypeLabels).map(([value, label]) => ({
    value,
    label
  }))

  const statusOptions = [
    { value: 'true', label: 'Активні' },
    { value: 'false', label: 'Неактивні' }
  ]

  return (
    <Box>
      <Flex align="center" mb={8}>
        <Heading size="lg" color="gray.700">
          Реєстр Шкіл України
        </Heading>
        <Spacer />
        <Button
          leftIcon={<AddIcon />}
          colorScheme="blue"
          onClick={handleAddSchool}
          isDisabled={loading}
        >
          Додати школу
        </Button>
      </Flex>

      {/* Filters */}
      <Card mb={6}>
        <CardHeader>
          <Flex justify="space-between" align="center">
            <Heading size="md">Фільтри</Heading>
            <Button
              size="sm"
              variant="ghost"
              onClick={clearFilters}
              colorScheme="red"
            >
              Очистити все
            </Button>
          </Flex>
        </CardHeader>
        <CardBody>
          <VStack spacing={4}>
            <HStack spacing={4} width="100%" wrap="wrap">
              <FormControl flex={1} minW="200px">
                <FormLabel fontSize="sm">Назва школи</FormLabel>
                <Input
                  placeholder="Пошук за назвою..."
                  value={filters.name}
                  onChange={(e) => handleFilterChange('name', e.target.value)}
                />
              </FormControl>

              <FormControl flex={1} minW="200px">
                <FormLabel fontSize="sm">Регіон</FormLabel>
                <Select
                  placeholder="Всі регіони"
                  value={filters.region}
                  onChange={(e) => handleFilterChange('region', e.target.value)}
                >
                  {ukraineRegions.map(region => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl flex={1} minW="200px">
                <FormLabel fontSize="sm">Тип школи</FormLabel>
                <MultiSelectPopover
                  label="Тип школи"
                  options={typeOptions}
                  selectedValues={filters.types}
                  onChange={(values) => handleFilterChange('types', values)}
                  placeholder="Всі типи"
                />
              </FormControl>

              <FormControl flex={1} minW="150px">
                <FormLabel fontSize="sm">Статус</FormLabel>
                <MultiSelectPopover
                  label="Статус"
                  options={statusOptions}
                  selectedValues={filters.statuses}
                  onChange={(values) => handleFilterChange('statuses', values)}
                  placeholder="Всі статуси"
                />
              </FormControl>
            </HStack>

            {/* Показуємо активні фільтри */}
            {(filters.name || filters.region || filters.types.length > 0 || filters.statuses.length > 0) && (
              <Box width="100%">
                <Text fontSize="sm" color="gray.600" mb={2}>
                  Активні фільтри:
                </Text>
                <Wrap spacing={2}>
                  {filters.name && (
                    <WrapItem>
                      <Badge colorScheme="blue">
                        Назва: {filters.name}
                      </Badge>
                    </WrapItem>
                  )}
                  {filters.region && (
                    <WrapItem>
                      <Badge colorScheme="green">
                        Регіон: {filters.region}
                      </Badge>
                    </WrapItem>
                  )}
                  {filters.types.map(type => (
                    <WrapItem key={type}>
                      <Badge colorScheme="purple">
                        Тип: {schoolTypeLabels[type]}
                      </Badge>
                    </WrapItem>
                  ))}
                  {filters.statuses.map(status => (
                    <WrapItem key={status}>
                      <Badge colorScheme="orange">
                        Статус: {status === 'true' ? 'Активні' : 'Неактивні'}
                      </Badge>
                    </WrapItem>
                  ))}
                </Wrap>
              </Box>
            )}
          </VStack>
        </CardBody>
      </Card>

      {/* Statistics */}
      <Flex mb={6} gap={4} wrap="wrap">
        <Badge colorScheme="blue" p={2} borderRadius="md">
          Всього шкіл: {pagination.totalElements}
        </Badge>
        <Badge colorScheme="green" p={2} borderRadius="md">
          Показано на сторінці: {filteredAndSortedSchools.length}
        </Badge>
        <Badge colorScheme="purple" p={2} borderRadius="md">
          Активних: {Array.isArray(filteredAndSortedSchools) ? filteredAndSortedSchools.filter(s => s.isActive).length : 0}
        </Badge>
      </Flex>

      {/* Table */}
      <Card>
        <CardBody p={0}>
          {loading ? (
            <Flex justify="center" py={10}>
              <VStack spacing={4}>
                <Spinner size="xl" color="blue.500" />
                <Text>Завантаження шкіл...</Text>
              </VStack>
            </Flex>
          ) : (
            <SchoolTable
              schools={filteredAndSortedSchools}
              onDeactivate={handleDeactivateSchool}
              isLoading={loading}
              onSort={handleSort}
              sorting={sorting}
            />
          )}
        </CardBody>
      </Card>

      {/* Pagination */}
      {!loading && pagination.totalElements > 0 && (
        <Box mt={6}>
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalElements={pagination.totalElements}
            pageSize={pagination.pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </Box>
      )}

      {/* Form Modal */}
      <SchoolForm
        isOpen={isOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        school={null}
        isLoading={formLoading}
      />
    </Box>
  )
}

export default SchoolPage 