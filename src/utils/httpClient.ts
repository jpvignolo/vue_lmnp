interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>
}

interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  res?: string
  status?: string
}

class HttpClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private buildURL(path: string, params?: Record<string, string | number | boolean>): string {
    // Enlever le / initial de path s'il existe
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    const fullPath = `${this.baseURL}/${cleanPath}`
    const url = new URL(fullPath)
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value))
      })
    }
    
    return url.toString()
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    let data: unknown = null
    
    try {
      data = await response.clone().json()
    } catch {
      // Pas de JSON
    }

    if (response.ok) {
      if (!data) return {} as T
      
      const apiData = data as ApiResponse<T>
      
      if (apiData.success === true && apiData.data) {
        return apiData.data
      }
      
      if (apiData.res === 'OK' || apiData.status === 'OK' || apiData.success === true) {
        return (data as T)
      }
      
      return (data as T)
    }

    // Gestion des erreurs
    const apiData = data as ApiResponse

    if (response.status === 400 || response.status === 422) {
      throw new Error(apiData?.message || 'Données invalides')
    }

    if (response.status === 401) {
      throw new Error(apiData?.message || 'Non authentifié')
    }

    if (response.status === 403) {
      throw new Error(apiData?.message || 'Accès refusé')
    }

    if (response.status === 404) {
      throw new Error(apiData?.message || 'Ressource non trouvée')
    }

    if (response.status === 409) {
      throw new Error(apiData?.message || 'Conflit')
    }

    throw new Error(apiData?.message || `Erreur serveur (${response.status})`)
  }

  async get<T = any>(path: string, options?: RequestOptions): Promise<T> {
    const url = this.buildURL(path, options?.params)
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        ...options?.headers
      },
      credentials: 'include',
      ...options
    })

    return this.handleResponse<T>(response)
  }

  async post<T = any>(path: string, body?: any, options?: RequestOptions): Promise<T> {
    const url = this.buildURL(path, options?.params)
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options?.headers
      },
      credentials: 'include',
      body: body ? JSON.stringify(body) : undefined,
      ...options
    })

    return this.handleResponse<T>(response)
  }

  async put<T = any>(path: string, body?: any, options?: RequestOptions): Promise<T> {
    const url = this.buildURL(path, options?.params)
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options?.headers
      },
      credentials: 'include',
      body: body ? JSON.stringify(body) : undefined,
      ...options
    })

    return this.handleResponse<T>(response)
  }

  async patch<T = any>(path: string, body?: any, options?: RequestOptions): Promise<T> {
    const url = this.buildURL(path, options?.params)
    
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options?.headers
      },
      credentials: 'include',
      body: body ? JSON.stringify(body) : undefined,
      ...options
    })

    return this.handleResponse<T>(response)
  }

  async delete<T = any>(path: string, options?: RequestOptions): Promise<T> {
    const url = this.buildURL(path, options?.params)
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        ...options?.headers
      },
      credentials: 'include',
      ...options
    })

    return this.handleResponse<T>(response)
  }
}

export const httpClient = new HttpClient('http://localhost:8000/api')
