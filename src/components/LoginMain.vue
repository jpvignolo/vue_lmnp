<!-- src/components/LoginMain.vue -->
<template>
  <div class="login-main">
    <h1>Connexion</h1>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          placeholder="votre@email.com"
        />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          placeholder="••••••••"
        />
      </div>
      <BlueButton type="submit">{{ loading ? 'Connexion...' : 'Se connecter' }}</BlueButton>
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
.login-main {
  width: 100%;
  max-width: 380px;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.login-main h1 {
  font-family: Gilroy;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.75rem;
}

.login-form .form-group {
  margin-bottom: 1.25rem;
}

.login-form label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.login-form input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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
</style>
