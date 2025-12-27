<template>
  <div>
    <div class="onboarding-container" v-show="loaded">
      <div class="onboarding-form">
        <form @submit.prevent="handleSubmit" id="form_inscription">
          <div v-show="loaded">
            <div class="onboarding-cnx-title">
              Commencez <span>gratuitement</span> avec decla.fr
            </div>

            <!-- Prénom + Nom -->
            <div class="w-full flex justify-between">
              <div class="form-group onboarding-form-line flex-1">
                <label for="prenom" class="form-label">Prénom</label>
                <div class="prepend-icon prepend-icon-user">
                  <input
                    type="text"
                    class="form-control"
                    id="prenom"
                    placeholder="Votre prénom"
                    name="prenom"
                    v-model="prenom"
                  />
                </div>
                <div class="input-error" v-if="errors.prenom">Prénom manquant</div>
              </div>
              <div class="form-group onboarding-form-line ml-1 flex-1">
                <label for="nom" class="form-label">Nom</label>
                <div class="prepend-icon prepend-icon-user">
                  <input
                    type="text"
                    class="form-control"
                    id="nom"
                    placeholder="Votre nom"
                    name="nom"
                    v-model="nom"
                  />
                </div>
                <div class="input-error" v-if="errors.nom">Nom manquant</div>
              </div>
            </div>

            <!-- Email + Téléphone -->
            <div class="contact-row w-full">
              <div class="form-group onboarding-form-line flex-1">
                <label for="email" class="form-label">Email</label>
                <div class="prepend-icon prepend-icon-email">
                  <input
                    type="text"
                    class="form-control verif"
                    id="email"
                    placeholder="Votre email"
                    name="email"
                    v-model="email"
                  />
                </div>
                <div class="input-error" v-if="errors.email">{{ errors.email }}</div>
              </div>
              <div class="form-group onboarding-form-line flex-1">
                <label for="tel" class="form-label">Numéro de Téléphone</label>
                <div class="prepend-icon prepend-icon-phone">
                  <input
                    type="text"
                    inputmode="tel"
                    class="form-control"
                    id="tel"
                    placeholder="Numéro de téléphone"
                    name="tel"
                    v-model="tel"
                    autocomplete="tel"
                  />
                </div>
                <div class="input-error" v-if="errors.tel">{{ errors.tel }}</div>
              </div>
            </div>

            <!-- Mot de passe -->
            <div class="form-group onboarding-form-line">
              <label for="pass" class="form-label">Mot de passe</label>
              <div class="prepend-icon prepend-icon-password">
                <input
                  type="password"
                  class="form-control"
                  id="pass"
                  placeholder="Mot de passe (8 caractères min.)"
                  name="pass"
                  v-model="password"
                />
              </div>
              <div class="input-error" v-if="errors.password">{{ errors.password }}</div>
            </div>

            <!-- CGV -->
            <div class="cgv_wrap">
              <div class="form-check checkbox-wrap">
                <input
                  class="form-check-input obg"
                  v-model="cgv"
                  name="cgv"
                  id="optin_firststep"
                  type="checkbox"
                />
                <label
                  class="form-check-label"
                  :class="errors.cgv ? 'label-error' : ''"
                  for="optin_firststep"
                >
                  En cochant cette case, vous certifiez avoir lu et accepté nos
                  <a href="https://decla.fr/cguv" target="_blank">Conditions Générales d'Utilisation</a>
                </label>
              </div>
            </div>

            <!-- Compte Pro -->
            <div class="cgv_wrap">
              <div class="form-check checkbox-wrap">
                <input
                  class="form-check-input obg"
                  v-model="pro"
                  name="pro"
                  id="comptepro"
                  type="checkbox"
                />
                <label class="form-check-label" for="comptepro">
                  Je fais les déclarations pour mes clients
                  <div style="font-size: 0.75rem; font-weight: 300">
                    (Experts-comptables, CGP, gestionnaires de biens, notaires, avocats...).
                  </div>
                </label>
              </div>
            </div>
          </div>

          <!-- Société (si pro) -->
          <div class="w-full flex justify-between" v-if="pro" style="margin-bottom: 5px">
            <div class="form-group onboarding-form-line flex-1">
              <label for="societe" class="form-label">Société</label>
              <div class="prepend-icon prepend-icon-user">
                <input
                  type="text"
                  class="form-control"
                  id="societe"
                  placeholder="Votre société"
                  name="societe"
                  v-model="societe"
                />
              </div>
            </div>
          </div>

          <div>
            <input type="hidden" name="posted" value="1" />
            <button type="submit" class="btn w-full blue-btn" :disabled="submitting">
              S'inscrire
            </button>
            <div class="input-error" v-if="errors.api" style="margin-top: 1rem; text-align: center;">
              {{ errors.api }}
            </div>
          </div>

          <div class="form-label text-center" style="margin-top: 1rem;">
            Vous avez déjà un compte ? &nbsp;<a href="/connexion_lmnp/">Connexion</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/services/authService'

const router = useRouter()
const loaded = ref(true)
const prenom = ref('')
const nom = ref('')
const email = ref('')
const tel = ref('')
const password = ref('')
const cgv = ref(false)
const pro = ref(false)
const societe = ref('')
const submitting = ref(false)

const errors = ref<Record<string, string>>({})

async function handleSubmit() {
  errors.value = {}

  // Validation basique
  if (!prenom.value.trim()) errors.value.prenom = 'Prénom manquant'
  if (!nom.value.trim()) errors.value.nom = 'Nom manquant'
  if (!email.value.trim()) errors.value.email = 'Email manquant'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = 'Email invalide'
  }
  if (!password.value || password.value.length < 8) {
    errors.value.password = 'Mot de passe minimum 8 caractères'
  }
  if (!cgv.value) errors.value.cgv = 'Vous devez accepter les CGV'

  if (Object.keys(errors.value).length > 0) {
    return
  }

  submitting.value = true
  try {
    await register({
      nom: nom.value.trim(),
      prenom: prenom.value.trim(),
      email: email.value.trim(),
      pass: password.value,
      pro: pro.value
    })

    await router.push('/starter')
  } catch (err: unknown) {
    console.error('Erreur:', err)
    errors.value.api = err instanceof Error ? err.message : 'Une erreur est survenue'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.label-error {
  color: #e74c3c;
}
</style>
