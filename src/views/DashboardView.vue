<template>
  <div class="connexion-view">
    <div class="left-pane">
      <!-- Illustration and logo -->
      <img
        :src="logo_white"
        alt="logo"
        class="logo"
      />
      <!-- Texte de gauche chargé via named view 'left' -->
      <router-view name="left" />
    </div>
    <div class="main-pane">
      <!-- Contenu principal (formulaire) chargé dans la vue par défaut -->
      <router-view name="main"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { logo_white } from '@theme'
// Aucun code script nécessaire ici, les composants sont injectés via <router-view>
</script>

<style scoped lang="scss">
.connexion-view {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.left-pane {
  flex: 1;
  background-color: $color-primary;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-position: left bottom;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(@/assets/onboarding-2025-1.svg);
}

.onboarding-image {
  max-width: 80%;
  margin-bottom: 2rem;
}

.logo {
  max-width: 150px;
  margin-bottom: 2rem;
}

.main-pane {
  flex: 2;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

::v-deep(.form-line) {
  margin-bottom: 1rem;
}

::v-deep(.login-left) {
  text-align: left;
  color: #fff;
}

::v-deep(.login-left h1) {
  font-size: 2rem;
  margin-bottom: 1rem;
}

::v-deep(.login-left p) {
  font-size: 1.125rem;
  line-height: 1.4;
}

::v-deep(.connexion-main) {
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

::v-deep(.connexion-main h1) {
  font-family: Gilroy;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.75rem;
}

</style>
