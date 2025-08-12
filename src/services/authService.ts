// services/authService.ts
export interface LoginPayload {
  email: string;
  password: string;
}

export async function login(email: string, password: string): Promise<void> {
  const url = `http://localhost:8000/api/auth/login`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password } as LoginPayload)
  })

  if (response.status === 200) {
    const data = await response.json()
    if (data.success === true) {
      return
    } else {
      throw new Error('Réponse inattendue du serveur')
    }
  }

  if (response.status === 401) {
    throw new Error('Email ou mot de passe incorrect')
  }

  throw new Error(`Erreur serveur (${response.status})`)
}


export interface RegisterPayload {
  nom: string;
  prenom: string;
  email: string;
  pass: string;
  pro: boolean;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}


export async function register(payload: RegisterPayload): Promise<void> {
  const url = `http://localhost:8000/api/auth/signup`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  // Tente d'interpréter la réponse JSON si possible
  let data: unknown = null
  try {
    data = await response.clone().json()
  } catch {
    // Pas de JSON retourné — on continue avec les statuts HTTP
  }

  if (response.ok) {
    // Certaines API renvoient { res: 'OK' }
    if (!data || (isObject(data) && (data.res === 'OK' || data.status === 'OK' || data.success === true))) {
      return
    }
    // Si la réponse est OK mais non conforme, on considère l'inscription réussie quand même
    return
  }

  // Gestion des erreurs fréquentes
  if (response.status === 409) {
    throw new Error('Un compte existe déjà avec cet email')
  }
  if (response.status === 400 || response.status === 422) {
    const msg = (isObject(data) && typeof data.message === 'string' ? data.message : 'Données d’inscription invalides')
    throw new Error(msg)
  }
  if (response.status === 401) {
    throw new Error('Non autorisé')
  }

  throw new Error(`Erreur serveur (${response.status})`)
}


function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
