<template>
  <div class="connexion-view">
    <div class="left-pane">
      <!-- Illustration and logo -->
      <img
        :src="logo_dark"
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
import { logo_dark } from '@theme'
// Aucun code script nécessaire ici, les composants sont injectés via <router-view>
</script>

<style scoped lang="scss">
.connexion-view {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.left-pane {
  width: 17.25rem;
  background-color: $color-left-pane;
  display: flex;
  flex-direction: column;
  padding: 2rem;
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

</style>
