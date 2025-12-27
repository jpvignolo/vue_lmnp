<template>
  <div class="onboarding-container-left">
    <div class="onboarding-logo-starter flex align-center">
      <img :src="logo_white" :style="cgpTransform" />
    </div>
    <div>
      <div class="onboarding-title">Créer votre compte LMNP</div>
      <div class="onboarding-paragraph">
        Avec decla.fr, votre déclaration LMNP devient un jeu d'enfant !
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { logo_white } from '@theme'

// TODO: Récupérer cgpTransform depuis la config
const cgpTransform = ''
</script>

<style scoped>
</style>
