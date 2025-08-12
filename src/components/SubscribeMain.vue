<!-- src/components/SubscribeMain.vue -->
<template>
  <div class="connexion-main">
    <h1><span class="txt-highlight">Créez</span> votre compte LMNP</h1>
    <form @submit.prevent="handleRegister" class="input-form">
      <!-- Prénom + Nom sur la même ligne -->
      <div class="form-row">
        <div class="form-group form-line">
          <label for="firstName">Prénom</label>
          <input
            id="firstName"
            v-model="firstName"
            type="text"
            required
            placeholder="Votre prénom"
            class="input"
          />
        </div>

        <div class="form-group form-line">
          <label for="lastName">Nom</label>
          <input
            id="lastName"
            v-model="lastName"
            type="text"
            required
            placeholder="Votre nom"
            class="input"
          />
        </div>
      </div>

      <!-- Email -->
      <div class="form-group form-line">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          placeholder="votre@email.com"
          class="input input-with-icon icon-email"
        />
      </div>

      <!-- Mot de passe EN-DESSOUS du mail -->
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

      <!-- Cases à cocher après le mot de passe -->
      <div class="form-group form-line checkboxes">
        <!-- Les labels ci-dessous ont un padding pour aligner le texte avec celui des inputs -->
        <label class="checkbox">
          <input v-model="termsAccepted" type="checkbox" required />
          <span>En cochant cette case, vous certifiez avoir lu et accepté nos conditions générales d'utilisation</span>
        </label>
        <label class="checkbox">
          <input v-model="clientDeclaration" type="checkbox" />
          <span>Je fais des déclarations pour mes clients</span>
        </label>
      </div>

      <!-- Bouton submit en dernier -->
      <div class="margin-submit">
        <BlueButton type="submit">{{ loading ? "Inscription..." : "S'inscrire" }}</BlueButton>
      </div>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">Compte créé avec succès !</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BlueButton from "@/components/ui/BlueButton.vue"
import { register } from "@/services/authService"

const router = useRouter()
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const termsAccepted = ref(false)
const clientDeclaration = ref(false)

const loading = ref(false)
const error = ref<string | null>(null)
const success = ref(false)

const route = useRoute()

async function handleRegister() {
  error.value   = null
  success.value = false

  if (!termsAccepted.value) {
    error.value = "Vous devez accepter les conditions générales d'utilisation."
    return
  }

  loading.value = true
  try {
    const payload = {
      nom: lastName.value.trim(),
      prenom: firstName.value.trim(),
      email: email.value.trim(),
      pass: password.value,
      pro: clientDeclaration.value,
      utm_source: String(route.query.utm_source ?? ''),
      utm_medium: String(route.query.utm_medium ?? ''),
      utm_campaign: String(route.query.utm_campaign ?? '')
    }
    await register(payload)
    success.value = true
    await router.push('/dashboard')
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Même base que LoginMain.vue */

.input-form {
  max-width: 480px;
  margin: 0;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-line {
  margin-bottom: 1rem;
}

/* Rangée pour aligner Prénom/Nom sur une ligne */
.form-row {
  display: flex;
  gap: 1rem;
}
.form-row .form-group {
  flex: 1;
}

.input {
  padding: 0.75rem 0.875rem;
  border: 1px solid #d4d4d8;
  border-radius: 10px;
  outline: none;
}

.input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.input-with-icon {
  padding-left: 2.25rem;
  background-repeat: no-repeat;
  background-position: 0.65rem center;
  background-size: 1rem 1rem;
}

.margin-submit {
  margin-top: 1.5rem;
}

.checkboxes {
  margin-top: 0.25rem;
}

.checkbox {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.95rem;
  line-height: 1.35rem;
  color: #1f2937;
}

.checkbox + .checkbox {
  margin-top: 0.5rem;
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
