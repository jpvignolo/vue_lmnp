<template>
  <a :href="url" :class="['nav-item', current, disable]">
    <div class="nav-item-content">
      <div class="nav-item-circle">
        <svg v-if="(pct ?? 0) > 0 && (pct ?? 0) < 100" class="progress-ring" width="40" height="40">
          <circle
            class="progress-ring-circle"
            stroke="#3498db"
            stroke-width="3"
            fill="transparent"
            r="18"
            cx="20"
            cy="20"
            :style="{ strokeDasharray: circumference, strokeDashoffset: strokeDashoffset }"
          />
        </svg>
        <span v-if="(pct ?? 0) === 100" class="checkmark">✓</span>
        <span v-else class="step-number">{{ idx + 1 }}</span>
      </div>
      <div class="nav-item-text">{{ txt }}</div>
    </div>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  txt: string
  url: string
  current?: string
  disable?: string
  pct?: number
  step?: number
  idx: number
}>()

const circumference = 2 * Math.PI * 18

const strokeDashoffset = computed(() => {
  const progress = props.pct || 0
  return circumference - (progress / 100) * circumference
})
</script>

<style scoped lang="scss">
.nav-item {
  display: block;
  text-decoration: none;
  padding: 0.75rem 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &.current {
    background-color: rgba(52, 152, 219, 0.1);
    border-left: 3px solid #3498db;
  }

  &.etapeok {
    opacity: 1;
  }

  &.next {
    opacity: 0.6;
  }

  &.disable-step {
    pointer-events: none;
    opacity: 0.3;
  }
}

.nav-item-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-item-circle {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #f0f0f0;
  font-weight: 600;
  color: #333;
}

.progress-ring {
  position: absolute;
  top: 0;
  left: 0;
  transform: rotate(-90deg);
}

.progress-ring-circle {
  transition: stroke-dashoffset 0.3s;
}

.checkmark {
  color: #27ae60;
  font-size: 1.5rem;
  font-weight: bold;
}

.step-number {
  font-size: 1rem;
}

.nav-item-text {
  font-size: 0.95rem;
  color: #333;
  font-weight: 500;
}
</style>
