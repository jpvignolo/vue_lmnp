<template>
  <div class="page_lmnp">
    <SideNav 
      :isPro="userStore.isPro"
      :currentDecla="declaStore.currentDecla ?? undefined"
    />
    
    <div class="main_lmnp">
      <div class="main_content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SideNav from '@/components/SideNav.vue'
import { useUserStore } from '@/stores/user'
import { useDeclaStore } from '@/stores/decla'

const userStore = useUserStore()
const declaStore = useDeclaStore()
</script>

<style scoped>
.page_lmnp {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.main_lmnp {
  flex: 1;
  overflow-y: auto;
  background-color: #F7F9FC;
}

.main_content {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .main_content {
    padding: 1rem;
    padding-bottom: 70px; /* Space for mobile bottom nav */
  }
}
</style>
