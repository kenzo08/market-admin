<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  placeholder?: string
  size?: 'xs' |'sm' | 'md' | 'lg' | 'xl'
  state?: 'success' | 'warning' | 'error'
  type?: 'primary' | 'secondary' | 'accent' | 'neutral'
  items: {name: string, value: string| number}[]
}

withDefaults(defineProps<Props>(),{
  type: 'neutral',
  size: 'md'
})

const emit = defineEmits<{ (e: 'update:modelValue', value: { name: string; value: string } | null): void }>()
const selected = ref(null)

watch(selected, (value) => {
  emit('update:modelValue', value)
})
</script>

<template>
  <select
      v-model="selected"
      class="select border-gray-200 w-max"
      :class="[
      {'select-xs': size === 'xs'},
      {'select-sm': size === 'sm'},
      {'select-md': size === 'md'},
      {'select-lg': size === 'lg'},
      {'select-xl': size === 'xl'},
      {'select-success': state === 'success'},
      {'select-warning': state === 'warning'},
      {'select-error': state === 'error'},
      {'select-primary': type === 'primary'},
      {'select-secondary': type === 'secondary'},
      {'select-accent': type === 'accent'},
      {'select-neutral': type === 'neutral'},
      ]">
    <option disabled :value="null">{{placeholder}}</option>
    <option v-for="item in items" :key="item.value" :value="item">
      {{item.name}}
    </option>
  </select>
</template>
