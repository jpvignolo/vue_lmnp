import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  id: number
  nom: string
  prenom: string
  email: string
  isPro: number // 0 = particulier, 1 = pro, 2 = cgp
  premiumAssistance: boolean
  premiumAssistanceTel: string | null
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => user.value !== null)
  const isPro = computed(() => user.value?.isPro ?? 0)
  const hasPremiumAssistance = computed(() => user.value?.premiumAssistance ?? false)

  function setUser(userData: User) {
    user.value = userData
  }

  function clearUser() {
    user.value = null
  }

  function updatePremiumAssistance(status: boolean, tel?: string) {
    if (user.value) {
      user.value.premiumAssistance = status
      if (tel !== undefined) {
        user.value.premiumAssistanceTel = tel
      }
    }
  }

  return {
    user,
    isAuthenticated,
    isPro,
    hasPremiumAssistance,
    setUser,
    clearUser,
    updatePremiumAssistance
  }
})
