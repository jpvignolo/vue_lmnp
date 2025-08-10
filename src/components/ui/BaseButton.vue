<template>
  <component
    :is="as === 'a' ? 'a' : 'button'"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`, { 'is-loading': loading }]"
    :disabled="as !== 'a' && (disabled || loading)"
    v-bind="$attrs"
  >
    <slot name="icon-left" />
    <span class="btn__label"><slot /></span>
    <slot name="icon-right" />
  </component>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost' | 'blue' | 'red';
  size?: 'sm' | 'md' | 'lg';
  as?: 'button' | 'a';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
}>(), { variant: 'primary', size: 'md', as: 'button', type:'button', disabled: false, loading: false });
</script>

<style scoped lang="scss">
/* Optionnel : garder le style minimal ici.
   Le gros des styles vit dans styles/components/_button.scss */
</style>
