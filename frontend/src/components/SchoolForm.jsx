import { useState, useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  VStack,
  FormErrorMessage
} from '@chakra-ui/react'
import { schoolTypes, schoolTypeLabels } from '../api/schoolApi'
import { ukraineRegions } from '../constants/regions'
import { useToast } from '../context/ToastContext'
import { handleApiError } from '../utils/errorUtils'

const SchoolForm = ({ isOpen, onClose, onSubmit, school = null, isLoading = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    edrpou: '',
    region: '',
    type: ''
  })
  const [errors, setErrors] = useState({})
  const { showError, showSuccess } = useToast()

  useEffect(() => {
    if (school) {
      setFormData({
        name: school.name || '',
        edrpou: school.edrpou || '',
        region: school.region || '',
        type: school.type || ''
      })
    } else {
      setFormData({
        name: '',
        edrpou: '',
        region: '',
        type: ''
      })
    }
    setErrors({})
  }, [school, isOpen])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Назва школи є обов'язковою"
    }

    if (!formData.edrpou.trim()) {
      newErrors.edrpou = 'ЄДРПОУ є обовʼязковим'
    } else if (!/^\d{8}$/.test(formData.edrpou)) {
      newErrors.edrpou = 'ЄДРПОУ повинен містити рівно 8 цифр'
    }

    if (!formData.region.trim()) {
      newErrors.region = "Регіон є обов'язковим"
    }

    if (!formData.type) {
      newErrors.type = "Тип школи є обов'язковим"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      showError('Будь ласка, виправте помилки у формі', { title: 'Помилка валідації' })
      return
    }

    try {
      await onSubmit(formData)
      showSuccess(
        school 
          ? `Школу "${formData.name}" успішно оновлено` 
          : `Школу "${formData.name}" успішно створено`,
        { title: school ? 'Школу оновлено' : 'Школу створено' }
      )
      // Форма закривається в батьківському компоненті після успішного створення
    } catch (error) {
      console.error('Form submission error:', error)
      handleApiError(error, showError)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {school ? 'Редагувати школу' : 'Додати нову школу'}
        </ModalHeader>
        <ModalCloseButton />
        
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>Назва школи</FormLabel>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Введіть назву школи"
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.edrpou}>
                <FormLabel>ЄДРПОУ</FormLabel>
                <Input
                  value={formData.edrpou}
                  onChange={(e) => handleInputChange('edrpou', e.target.value)}
                  placeholder="12345678"
                  maxLength={8}
                />
                <FormErrorMessage>{errors.edrpou}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.region}>
                <FormLabel>Регіон</FormLabel>
                <Select
                  value={formData.region}
                  onChange={(e) => handleInputChange('region', e.target.value)}
                  placeholder="Оберіть регіон"
                >
                  {ukraineRegions.map(region => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.region}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.type}>
                <FormLabel>Тип школи</FormLabel>
                <Select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  placeholder="Оберіть тип школи"
                >
                  {Object.entries(schoolTypeLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.type}</FormErrorMessage>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Скасувати
            </Button>
            <Button 
              colorScheme="blue" 
              type="submit"
              isLoading={isLoading}
              loadingText={school ? 'Оновлення...' : 'Створення...'}
            >
              {school ? 'Оновити' : 'Створити'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default SchoolForm 