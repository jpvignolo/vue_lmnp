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
    if (data.res === 'OK') {
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
