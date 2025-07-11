import { fetcher } from '../utils/fetcher'

export const schoolTypes = {
  GYMNASIUM: 'GYMNASIUM',
  LYCEUM: 'LYCEUM',
  GENERAL_SECONDARY_SCHOOL: 'GENERAL_SECONDARY_SCHOOL'
}

export const schoolTypeLabels = {
  [schoolTypes.GYMNASIUM]: 'Гімназія',
  [schoolTypes.LYCEUM]: 'Ліцей',
  [schoolTypes.GENERAL_SECONDARY_SCHOOL]: 'ЗЗСО'
}

export const schoolApi = {
  // Get all schools with filtering and pagination
  getSchoolsWithFilters: async (filters, page = 0, size = 20) => {
    const params = new URLSearchParams()
    
    if (filters.name) {
      params.append('name', filters.name)
    }
    if (filters.region) {
      params.append('region', filters.region)
    }
    if (filters.types && filters.types.length > 0) {
      filters.types.forEach(type => params.append('types', type))
    }
    if (filters.statuses && filters.statuses.length > 0) {
      filters.statuses.forEach(status => params.append('statuses', status))
    }
    
    // Додаємо пагінацію
    params.append('page', page.toString())
    params.append('size', size.toString())
    params.append('sort', 'name')
    
    const { data } = await fetcher.get(`/v1/schools?${params.toString()}`)
    // Response format: { result: [...], total: number }
    const result = Array.isArray(data.result) ? data.result : []
    const total = typeof data.total === 'number' ? data.total : 0
    
    return {
      content: result,
      totalElements: total,
      totalPages: Math.ceil(total / size),
      number: page,
      size: size,
      numberOfElements: result.length
    }
  },

  // Get school by ID
  getSchoolById: async (id) => {
    const { data } = await fetcher.get(`/v1/schools/${id}`)
    return data
  },

  // Create new school
  createSchool: async (schoolData) => {
    const { data } = await fetcher.post('/v1/schools', schoolData)
    return data
  },

  // Deactivate school
  deactivateSchool: async (id) => {
    const { data } = await fetcher.patch(`/v1/schools/${id}/deactivate`)
    return data
  }
}

export default schoolApi 