<template>
  <div>
    <div class="onboarding-container" v-show="loaded">
      <div class="onboarding-form">
        <form @submit.prevent="handleSubmit" id="form_connexion">
          <div v-show="loaded">
            <div class="onboarding-cnx-title" style="margin-bottom: 2rem">
              <span>Connectez-vous</span> à <br />
              votre compte LMNP
            </div>

            <!-- Email -->
            <div class="form-group onboarding-form-line">
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
            </div>

            <!-- Mot de passe -->
            <div class="form-group onboarding-form-line">
              <label for="pass" class="form-label">Mot de passe</label>
              <div class="prepend-icon prepend-icon-password">
                <input
                  type="password"
                  class="form-control verif"
                  id="pass"
                  placeholder="Votre mot de passe"
                  name="pass"
                  v-model="password"
                />
              </div>
              <div class="input-error" v-if="errors.email">{{ errors.email }}</div>
            </div>

            <!-- Rester connecté + Mot de passe oublié -->
            <div class="rester-connecte-wrap">
              <div class="form-check checkbox-wrap">
                <input
                  class="form-check-input obg"
                  v-model="stayConnected"
                  name="stay_co"
                  id="stay_co"
                  type="checkbox"
                  value="1"
                />
                <label class="form-check-label" for="stay_co"> Rester connecté </label>
              </div>

              <div class="form-label lost-pwd">
                <a href="#" @click.prevent="showLostPasswordModal">Mot de passe oublié ?</a>
              </div>
            </div>
          </div>

          <div>
            <input type="hidden" name="posted" value="1" />
            <button type="submit" class="btn w-full blue-btn" :disabled="submitting">
              Se connecter avec son email
            </button>

            <!-- FranceConnect button placeholder -->
            <!-- <a href="#" @click.prevent="showFranceConnectModal">
              <div class="btn btn-frco">
                <img src="/img/france-connect-logo.svg" />
                <span class="btn-label">Se connecter avec FranceConnect</span>
              </div>
            </a> -->
          </div>

          <div class="row onboarding-link"></div>

          <div class="form-label text-center" style="margin-top: 1rem">
            Nous n'avez pas de compte ? &nbsp;<a href="/inscription_lmnp/"> Inscrivez-vous</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/services/authService'

const router = useRouter()
const loaded = ref(true)
const email = ref('')
const password = ref('')
const stayConnected = ref(false)
const submitting = ref(false)

const errors = ref<Record<string, string>>({})

function showLostPasswordModal() {
  // TODO: Implémenter la modal mot de passe oublié
  console.log('Afficher modal mot de passe oublié')
}

function showFranceConnectModal() {
  // TODO: Implémenter la modal FranceConnect
  console.log('Afficher modal FranceConnect')
}

async function handleSubmit() {
  errors.value = {}

  // Validation basique
  if (!email.value.trim()) {
    errors.value.email = 'Email requis'
    return
  }
  if (!password.value) {
    errors.value.email = 'Mot de passe requis'
    return
  }

  submitting.value = true
  try {
    await login(email.value, password.value)
    await router.push('/dashboard')
  } catch (err: unknown) {
    console.error('Erreur:', err)
    errors.value.email = err instanceof Error ? err.message : 'Email/mot de passe invalide.'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.lost-pwd a {
  color: #0066cc;
  text-decoration: none;
  font-size: 0.875rem;
}

.lost-pwd a:hover {
  text-decoration: underline;
}

.onboarding-link {
  margin: 0;
}
</style>
