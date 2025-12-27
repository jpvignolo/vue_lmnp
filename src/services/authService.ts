// services/authService.ts
import { httpClient } from '@/utils/httpClient'

export interface LoginPayload {
  email: string
  password: string
}

export async function login(email: string, password: string): Promise<void> {
  await httpClient.post('/auth/login', { email, password } as LoginPayload)
}

export interface RegisterPayload {
  nom: string
  prenom: string
  email: string
  pass: string
  pro: boolean
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

export async function register(payload: RegisterPayload): Promise<void> {
  await httpClient.post('/auth/signup', payload)
}


// ONBOARDING SERVICE

export interface CreateLmnpPayload {
  nom: string
  siren: string
  date_immatriculation?: string
  ancien_regime?: boolean
  previous_biens?: boolean
}

export async function createLmnp(payload: CreateLmnpPayload): Promise<{ lmnp: any }> {
  return httpClient.post('/onboarding/create-lmnp', payload)
}