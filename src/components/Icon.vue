<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'

interface Props {
  name: string
  size?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  size: '24',
})

const icons = import.meta.glob('/src/assets/icons/**/*.svg')

const icon = computed(() => {
  const path = `/src/assets/icons/${props.name}.svg`

  const loader = icons[path]

  if (!loader) {
    console.warn(`Icon not found: ${path}`)
    return null
  }

  return defineAsyncComponent(loader)
})

</script>

<template>
  <component
    :is="icon"
    :width="size"
    :height="size"
    :style="{ minWidth: `${size}px` }"
  />
</template>
