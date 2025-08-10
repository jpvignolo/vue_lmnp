<template>
  <BaseButton variant="blue" v-bind="$attrs">
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from "./BaseButton.vue"
defineOptions({ name: "BlueButton" })
</script>