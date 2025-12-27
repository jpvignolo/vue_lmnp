import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface Bien {
  id: number
  adresse: string
  // Ajoutez d'autres propriétés selon vos besoins
}

interface LMNPDecla {
  id: number
  year: number
  etat: number // Binary flags for completion status
  biens: Bien[]
  isLmp: boolean
}

// Binary flags constants (matching PHP)
export const FLAG_LMNP_BIENS = 2
export const FLAG_LMNP_CHARGES = 4
export const FLAG_LMNP_AMORTISSEMENTS = 32
export const FLAG_LMNP_RECAP = 64
export const FLAG_LMNP_TELETRANSMISE = 256

export const useDeclaStore = defineStore('decla', () => {
  const currentDecla = ref<LMNPDecla | null>(null)
  const declarations = ref<LMNPDecla[]>([])

  const nbBiens = computed(() => currentDecla.value?.biens?.length ?? 0)
  const hasDeclaration = computed(() => currentDecla.value !== null)

  function setCurrentDecla(decla: LMNPDecla) {
    currentDecla.value = decla
  }

  function setDeclarations(declas: LMNPDecla[]) {
    declarations.value = declas
  }

  function updateEtat(etat: number) {
    if (currentDecla.value) {
      currentDecla.value.etat = etat
    }
  }

  function addBien(bien: Bien) {
    if (currentDecla.value) {
      currentDecla.value.biens.push(bien)
    }
  }

  function removeBien(bienId: number) {
    if (currentDecla.value) {
      currentDecla.value.biens = currentDecla.value.biens.filter(b => b.id !== bienId)
    }
  }

  function clearCurrentDecla() {
    currentDecla.value = null
  }

  return {
    currentDecla,
    declarations,
    nbBiens,
    hasDeclaration,
    setCurrentDecla,
    setDeclarations,
    updateEtat,
    addBien,
    removeBien,
    clearCurrentDecla
  }
})
