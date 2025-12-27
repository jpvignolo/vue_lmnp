<template>
  <div class="side_nav_wrap" id="side-nav">
    <div class="side_nav" ref="init" :data-pro="isPro">
      <input type="hidden" name="etat" :value="etat" id="etat" />
      <input type="hidden" name="nb-biens" :value="nbBiens" id="nb-biens" />

      <!-- Logo -->
      <div class="side_nav_logo">
        <img :src="logo_dark" :style="cgpTransform" />
      </div>

      <!-- Bouton Dashboard -->
      <div class="step-dummy" v-if="showDashboardButton">
        <a :href="dashboardUrl">
          <div class="dashboard_button img_btn" id="dashboard">
            <!-- <img src="/img/icons/dashboard.svg" /> -->
            <div>Tableau de bord</div>
          </div>
        </a>
      </div>

      <!-- Étapes de navigation -->
      <div class="steps">
        <template v-if="showSideNav && currentDecla">
          <div class="navbar_step_decla">Déclaration des revenus {{ currentDecla.year }}</div>
          <div class="navbar_step_title">ÉTAPES</div>
          <div class="steps_wrapper">
            <nav-item
              txt="Biens"
              :url="getStepUrl(0)"
              :current="currentStep === 0 ? 'current' : stepStatus[0]"
              :pct="pcts[0]"
              step="2"
              idx="0"
            />
            <nav-item
              txt="Recettes"
              :url="getStepUrl(2)"
              :current="currentStep === 2 ? 'current' : stepStatus[1]"
              :disable="classDisable"
              :pct="pcts[1]"
              step="4"
              idx="1"
            />
            <nav-item
              txt="Dépenses"
              :url="getStepUrl(3)"
              :current="currentStep === 3 ? 'current' : stepStatus[2]"
              :disable="classDisable"
              step="8"
              :pct="pcts[2]"
              idx="2"
            />
            <nav-item
              txt="Intérêts d'emprunt"
              :url="getStepUrl(4)"
              :current="currentStep === 4 ? 'current' : stepStatus[3]"
              :disable="classDisable"
              :pct="pcts[3]"
              step="16"
              idx="3"
            />
            <nav-item
              txt="Amortissement"
              :url="getStepUrl(5)"
              :current="currentStep === 5 ? 'current' : stepStatus[4]"
              :disable="classDisable"
              :pct="pcts[4]"
              step="32"
              idx="4"
            />
            <nav-item
              txt="Récapitulatif"
              :url="getStepUrl(6)"
              :current="currentStep === 6 ? 'current' : stepStatus[5]"
              :disable="classDisable"
              :pct="pcts[5]"
              step="64"
              idx="5"
            />
            <nav-item
              txt="Télétransmission"
              :url="getStepUrl(7)"
              :current="currentStep === 7 ? 'current' : stepStatus[6]"
              :disable="classDisable"
              :pct="pcts[6]"
              step="256"
              idx="6"
            />
          </div>
        </template>

        <!-- Section bottom -->
        <div class="side_nav_bottom_section hide-mobile">
          <!-- Paramètres LMNP/LMP -->
          <a :href="getStepUrl(8)" v-if="showBlocLMNP && currentDecla">
            <div class="codepromo_button img_btn">
              <span class="material-symbols-outlined">tune</span>
              <span class="txt">{{ parametresText }}</span>
            </div>
          </a>

          <!-- Parrainage (non-pro uniquement) -->
          <a href="#" @click.prevent="showCodepromoModal" v-if="!isPro">
            <div class="codepromo_button">
              <span class="icon material-symbols-outlined">campaign</span>
              <span class="txt">Parrainage</span>
            </div>
          </a>

          <!-- Premium Assistance -->
          <a href="#" @click.prevent="showPremiumModal">
            <div :class="premiumClass">
              <div class="txt">Premium Assistance <img class="sparkles" /></div>
            </div>
          </a>

          <!-- Account Menu -->
          <AccountMenu />
        </div>
      </div>
    </div>

    <!-- Mobile Bottom Nav -->
    <template v-if="showSideNav && currentDecla">
      <div class="hide-desktop mob-bottom-nav">
        <div class="steps_wrapper flex">
          <nav-item
            txt="Biens"
            :url="getStepUrl(0)"
            :current="currentStep === 0 ? 'current' : stepStatus[0]"
            :pct="pcts[0]"
            step="2"
            idx="0"
          />
          <nav-item
            txt="Recettes"
            :url="getStepUrl(2)"
            :current="currentStep === 2 ? 'current' : stepStatus[1]"
            :disable="classDisable"
            :pct="pcts[1]"
            step="4"
            idx="1"
          />
          <nav-item
            txt="Dépenses"
            :url="getStepUrl(3)"
            :current="currentStep === 3 ? 'current' : stepStatus[2]"
            :disable="classDisable"
            step="8"
            :pct="pcts[2]"
            idx="2"
          />
          <nav-item
            txt="Intérêts d'emprunt"
            :url="getStepUrl(4)"
            :current="currentStep === 4 ? 'current' : stepStatus[3]"
            :disable="classDisable"
            :pct="pcts[3]"
            step="16"
            idx="3"
          />
          <nav-item
            txt="Amortissement"
            :url="getStepUrl(5)"
            :current="currentStep === 5 ? 'current' : stepStatus[4]"
            :disable="classDisable"
            :pct="pcts[4]"
            step="32"
            idx="4"
          />
          <nav-item
            txt="Récapitulatif"
            :url="getStepUrl(6)"
            :current="currentStep === 6 ? 'current' : stepStatus[5]"
            :disable="classDisable"
            :pct="pcts[5]"
            step="64"
            idx="5"
          />
          <nav-item
            txt="Télétransmission"
            :url="getStepUrl(7)"
            :current="currentStep === 7 ? 'current' : stepStatus[6]"
            :disable="classDisable"
            :pct="pcts[6]"
            step="256"
            idx="6"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { logo_dark } from '@theme'
// import NavItem from './NavItem.vue'
// import AccountMenu from './AccountMenu.vue'

// Props
const props = defineProps<{
  isPro?: number
  currentDecla?: {
    id: number
    year: number
    etat: number
    biens: any[]
    isLmp: boolean
  } | null
}>()

const route = useRoute()

// Refs
const init = ref<HTMLElement>()
const cgpTransform = '' // TODO: récupérer depuis config CGP

// Computed
const nbBiens = computed(() => props.currentDecla?.biens?.length || 0)
const etat = computed(() => props.currentDecla?.etat || 0)
const classDisable = computed(() => (nbBiens.value === 0 ? 'disable-step' : ''))

const currentStep = computed(() => {
  const step = route.params.step
  return step ? parseInt(step as string) : 0
})

const showSideNav = computed(() => {
  const step = currentStep.value
  return step !== 9 && step !== 10
})

const showDashboardButton = computed(() => {
  const step = currentStep.value
  return step !== 9 || (step === 9 && !props.isPro)
})

const showBlocLMNP = computed(() => {
  const step = currentStep.value
  return !(props.isPro === 2 && step === 9)
})

const dashboardUrl = computed(() => {
  const declaId = props.currentDecla?.id || 0
  return `/lmnp/single/${declaId}/9`
})

const parametresText = computed(() => {
  if (!props.currentDecla) return 'Paramètres'
  return props.currentDecla.isLmp ? 'Paramètres LMP' : 'Paramètres LMNP'
})

const premiumClass = computed(() => {
  // TODO: vérifier si l'utilisateur a Premium Assistance
  const hasPremium = false
  return hasPremium ? 'premium_assit_button assit_paid img_btn' : 'premium_assit_button img_btn'
})

// Status des étapes (flags binaires)
const FLAG_LMNP_BIENS = 2
const FLAG_LMNP_CHARGES = 4
const FLAG_LMNP_AMORTISSEMENTS = 32
const FLAG_LMNP_RECAP = 64
const FLAG_LMNP_TELETRANSMISE = 256

const stepStatus = computed(() => {
  const etape = etat.value
  return [
    etape & FLAG_LMNP_BIENS ? 'etapeok' : 'next',
    etape & FLAG_LMNP_CHARGES ? 'etapeok' : 'next',
    'next', // Dépenses
    'next', // Intérêts
    etape & FLAG_LMNP_AMORTISSEMENTS ? 'etapeok' : 'next',
    etape & FLAG_LMNP_RECAP ? 'etapeok' : 'next',
    etape & FLAG_LMNP_TELETRANSMISE ? 'etapeok' : 'next'
  ]
})

// Pourcentages de complétion (TODO: à calculer dynamiquement)
const pcts = ref([0, 0, 0, 0, 0, 0, 0])

// Methods
function getStepUrl(step: number) {
  const declaId = props.currentDecla?.id || 0
  return `/lmnp/single/${declaId}${step > 0 ? '/' + step : ''}`
}

function showCodepromoModal() {
  // TODO: implémenter modal parrainage
  console.log('Show codepromo modal')
}

function showPremiumModal() {
  // TODO: implémenter modal premium
  console.log('Show premium modal')
}

function onPopupClosed() {
  // TODO: gérer fermeture popup
}

function onPopupShown() {
  // TODO: gérer ouverture popup
}
</script>

<style scoped>
/* Les styles seront dans le fichier SCSS global */
</style>
