<!-- src/components/LoginMain.vue -->
<template>
  <div class="connexion-main">
    <h1><span class="txt-highlight">Connectez-vous</span> à votre compte LMNP</h1>
    <form @submit.prevent="handleLogin" class="input-form">
      <div class="form-group form-line">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          placeholder="votre@email.com"
          class="inpuut input-with-icon icon-email"
        />
      </div>
      <div class="form-group form-line">
        <label for="password">Mot de passe</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          placeholder="••••••••"
          class="input input-with-icon icon-password"
        />
      </div>
      <div class="margin-submit">
        <BlueButton type="submit">{{ loading ? 'Connexion...' : 'Se connecter' }}</BlueButton>
      </div>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">Connecté avec succès !</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/services/authService'
import BlueButton from "@/components/ui/BlueButton.vue"

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref<string | null>(null)
const success = ref(false)
const router = useRouter()

function handleLogin() {
  error.value   = null
  success.value = false
  loading.value = true

  login(email.value, password.value)
    .then(() => {
      success.value = true
      return router.push('/dashboard')
    })
    .catch((err: unknown) => {
      // Affiche le message d’erreur si échec
      error.value = err instanceof Error ? err.message : String(err)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<style scoped>

.login-form .form-group {
  margin-bottom: 1.25rem;
}

.error {
  margin-top: 1rem;
  color: #d00;
  text-align: center;
}

.success {
  margin-top: 1rem;
  color: #080;
  text-align: center;
}

.margin-submit {
  margin-top: 1.5rem;
}
</style>
