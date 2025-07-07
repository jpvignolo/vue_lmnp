<template>
  <div class="login-page">
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
      <button type="submit" :disabled="loading">
        {{ loading ? 'Connexion...' : 'Se connecter' }}
      </button>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">Connecté avec succès !</p>
    </form>
  </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref<string | null>(null)
const success = ref(false)
const router = useRouter()

async function handleLogin() {
  error.value = null
  success.value = false
  loading.value = true

  try {
    const url = `http://localhost:8000/api/login/${encodeURIComponent(email.value)}/${encodeURIComponent(password.value)}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })

    if (response.status === 200) {
      const data = await response.json()
      if (data.res === 'OK') {
        success.value = true
        // Exemple : rediriger vers la page d'accueil après connexion
        setTimeout(() => {
          router.push({ name: 'home' })
        }, 1000)
      } else {
        error.value = 'Réponse inattendue du serveur'
      }
    } else if (response.status === 401) {
      error.value = 'Email ou mot de passe incorrect'
    } else {
      error.value = `Erreur serveur (${response.status})`
    }
  } catch (e: any) {
    error.value = `Erreur réseau : ${e.message}`
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fafafa;
}
h1 {
  text-align: center;
  margin-bottom: 1rem;
}
.form-group {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}
input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #bbb;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background: #3b82f6;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.error {
  margin-top: 1rem;
  color: #dc2626;
  text-align: center;
}
.success {
  margin-top: 1rem;
  color: #16a34a;
  text-align: center;
}
</style>








Demander à ChatGPT

