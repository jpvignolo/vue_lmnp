<template>
  <div>
    <div class="onboarding-container" v-show="loaded">
      <div class="onboarding-form">
        <form @submit.prevent="handleSubmit" id="form_inscription">
          <div class="card-onboard">
            <div class="onboarding-previous">
              <a href="#" @click.prevent="previous">
                <span class="material-symbols-outlined">keyboard_arrow_left</span>
                Retour à l'étape précédente
              </a>
            </div>

            <div class="siren-container">
          <div class="form-group onboarding-form-line siren-line">
            <div class="onboarding-cnx-title" style="margin-bottom: 2rem; text-align: left">
              Renseignez votre numéro de SIREN
            </div>
            <label for="siren" class="form-label">Numéro de SIREN de votre activité</label>
            <input
              type="text"
              class="form-control siren verif siren-input"
              id="siren"
              placeholder=""
              name="siren"
              v-model="siren"
              :disabled="nosiren"
              v-maska
              data-maska="# # #   # # #   # # #"
            />
          </div>

          <div v-if="!fromSiren" class="form-group has-ico">
            <div class="form-check checkbox-wrap">
              <input
                class="form-check-input obg"
                @change="nosirenChange"
                v-model="nosiren"
                name="nosiren"
                id="nosiren"
                type="checkbox"
              />
              <label class="form-check-label" for="nosiren">
                Je n'ai pas encore de numéro de SIREN
              </label>
            </div>
          </div>

          <div class="activity-name-container" v-if="showActivityName">
            <div class="onboarding-subtitle">Nom de votre activité</div>
            <div class="form-group onboarding-form-line siren-line">
              <input
                type="text"
                placeholder="Nom de l'activité"
                class="form-control siren-input ajax"
                id="activity-name"
                name="activity_name"
                v-model="activityName"
              />
              <div class="input-error" v-if="activityNameError">
                Veuillez saisir un nom d'activité
              </div>
              <div class="input-warn" v-if="fromSiren">Donnée provenant de la base INSEE</div>
            </div>
          </div>

          <div class="">
            <input type="hidden" value="1" name="posted" />
            <button type="submit" class="btn w-full blue-btn" :disabled="submitting">
              {{ searchTxt }}
            </button>
            <div class="input-error" v-if="errorMessage" style="margin-top: 1rem; text-align: center;">
              {{ errorMessage }}
            </div>
          </div>

          <div class="onboarding-tooltip-box">
            <div class="bon-a-savoir-header">Bon à savoir <img class="lampe" /></div>
            <div class="bon-a-savoir-title">Vous n'avez pas encore de numéro de Siren ?</div>
            <div class="bon-a-savoir-txt">
              Vous devez vous rendre sur le site inpi.fr pour procéder à l'immatriculation de
              votre activité LMNP.<br />
              Cela prend 5 minutes et vous permet d'obtenir immédiatement votre Siren<br />
              <a
                href="https://decla.fr/blog/comment-simmatriculer-en-tant-que-lmnp"
                target="_blank"
              >
                Voir le tutoriel d'immatriculation
              </a>
            </div>
          </div>
        </div>
      </div>
    </form>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { createLmnp } from '@/services/authService'

const router = useRouter()
const loaded = ref(true)
const siren = ref('')
const nosiren = ref(false)
const activityName = ref('')
const submitting = ref(false)
const fromSiren = ref(false)
const activityNameError = ref(false)
const errorMessage = ref('')

const showActivityName = computed(() => {
  return nosiren.value || fromSiren.value
})

const searchTxt = computed(() => {
  if (submitting.value) return 'Recherche en cours...'
  if (nosiren.value) return 'Continuer'
  return 'Rechercher'
})

function nosirenChange() {
  if (nosiren.value) {
    activityName.value = ''
  }
}

function previous() {
  router.push('/inscription_lmnp')
}

async function handleSubmit() {
  activityNameError.value = false
  errorMessage.value = ''

  if (showActivityName.value && !activityName.value.trim()) {
    activityNameError.value = true
    return
  }

  submitting.value = true
  try {
    const payload = {
      nom: activityName.value.trim(),
      siren: siren.value.replace(/[\s\u00A0]/g, ''),
    }

    await createLmnp(payload)
    await router.push('/dashboard')
  } catch (err: unknown) {
    console.error('Erreur:', err)
    errorMessage.value = err instanceof Error ? err.message : 'Une erreur est survenue'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
</style>
