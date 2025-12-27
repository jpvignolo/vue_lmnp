<template>
  <div class="page_lmnp" id="bloc-insc">
    <div class="row gx-0" style="height: 100vh; width: 100vw; margin: 0;">
      <div class="hide-mobile col-lg-4 bg-blue onboarding-left" style="padding: 0;">
        <div class="flex h-full justify-between flex-column w-full align-center onboarding-visual">
          <router-view name="left" />
        </div>
      </div>

      <div class="col-lg-8 onboarding-right relative" id="track-inscription" style="padding: 0;">
        <router-view name="main" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.page_lmnp {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
</style>
