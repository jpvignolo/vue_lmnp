<template>
  <div class="subscribe-main">
    <!-- Tout le contenu / formulaire de connexion était là -->
    <h1>Connexion</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <div>
        <label for="password">Mot de passe</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')

function handleSubmit() {
  // votre logique de connexion (API, validation, etc.)
  console.log('Login avec', email.value, password.value)
  // par exemple :
  // authService.login(email.value, password.value)
  //   .then(() => router.push('/dashboard'))
}
</script>

<style scoped>
.subscribe-main {
  flex: 1;
  padding: 2rem;
  /* Ajoutez ici vos styles actuels… */
}
.subscribe-main h1 {
  margin-bottom: 1rem;
}
/* … */
</style>
