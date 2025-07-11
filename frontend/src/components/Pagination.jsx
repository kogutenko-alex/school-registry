import {
  Box,
  Button,
  ButtonGroup,
  Select,
  Text,
  HStack,
  VStack,
  Flex,
  Spacer
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalElements, 
  pageSize, 
  onPageChange, 
  onPageSizeChange 
}) => {
  const startItem = currentPage * pageSize + 1
  const endItem = Math.min((currentPage + 1) * pageSize, totalElements)

  const getVisiblePages = () => {
    const delta = 2
    const start = Math.max(0, currentPage - delta)
    const end = Math.min(totalPages - 1, currentPage + delta)
    
    const pages = []
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  if (totalElements === 0) {
    return null
  }

  return (
    <VStack spacing={4} align="stretch">
      {/* Інформація про кількість записів */}
      <Flex align="center">
        <Text fontSize="sm" color="gray.600">
          Показано {startItem}-{endItem} з {totalElements} записів
        </Text>
        <Spacer />
        <HStack spacing={2}>
          <Text fontSize="sm" color="gray.600">Записів на сторінці:</Text>
          <Select 
            value={pageSize} 
            onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
            size="sm"
            width="80px"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </Select>
        </HStack>
      </Flex>

      {/* Навігація по сторінках */}
      {totalPages > 1 && (
        <Flex justify="center">
          <ButtonGroup isAttached variant="outline" size="sm">
            {/* Попередня сторінка */}
            <Button
              leftIcon={<ChevronLeftIcon />}
              onClick={() => onPageChange(currentPage - 1)}
              isDisabled={currentPage === 0}
            >
              Попередня
            </Button>

            {/* Перша сторінка */}
            {getVisiblePages()[0] > 0 && (
              <>
                <Button
                  onClick={() => onPageChange(0)}
                  variant={currentPage === 0 ? 'solid' : 'outline'}
                  colorScheme={currentPage === 0 ? 'blue' : 'gray'}
                >
                  1
                </Button>
                {getVisiblePages()[0] > 1 && (
                  <Button isDisabled variant="outline">
                    ...
                  </Button>
                )}
              </>
            )}

            {/* Видимі сторінки */}
            {getVisiblePages().map(page => (
              <Button
                key={page}
                onClick={() => onPageChange(page)}
                variant={page === currentPage ? 'solid' : 'outline'}
                colorScheme={page === currentPage ? 'blue' : 'gray'}
              >
                {page + 1}
              </Button>
            ))}

            {/* Остання сторінка */}
            {getVisiblePages()[getVisiblePages().length - 1] < totalPages - 1 && (
              <>
                {getVisiblePages()[getVisiblePages().length - 1] < totalPages - 2 && (
                  <Button isDisabled variant="outline">
                    ...
                  </Button>
                )}
                <Button
                  onClick={() => onPageChange(totalPages - 1)}
                  variant={currentPage === totalPages - 1 ? 'solid' : 'outline'}
                  colorScheme={currentPage === totalPages - 1 ? 'blue' : 'gray'}
                >
                  {totalPages}
                </Button>
              </>
            )}

            {/* Наступна сторінка */}
            <Button
              rightIcon={<ChevronRightIcon />}
              onClick={() => onPageChange(currentPage + 1)}
              isDisabled={currentPage >= totalPages - 1}
            >
              Наступна
            </Button>
          </ButtonGroup>
        </Flex>
      )}
    </VStack>
  )
}

export default Pagination 