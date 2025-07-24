<script setup lang="ts">
import { useField } from 'vee-validate'
import { toRef } from 'vue'

interface Props {
  name: string
  placeholder?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  type?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'accent'
  rows?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  type: 'primary',
  rows: 3
})

const emit = defineEmits(['input', 'focus', 'blur'])

const name = toRef(props, 'name')

const {
  value: textareaValue,
  errorMessage,
  handleBlur,
  handleChange
} = useField(name, undefined, {
  syncVModel: true
})

function onBlur(event: Event) {
  handleBlur(event)
  emit('blur')
}

function onInput(event: Event) {
  handleChange(event)
  emit('input', event)
}
</script>

<template>
  <div class="flex w-full flex-col gap-1">
    <textarea
      v-model="textareaValue"
      :name="name"
      :rows="rows"
      :placeholder="placeholder"
      class="textarea w-full focus:outline-none"
      :class="[
        { 'textarea-xs': size === 'xs' },
        { 'textarea-sm': size === 'sm' },
        { 'textarea-md': size === 'md' },
        { 'textarea-lg': size === 'lg' },
        { 'textarea-primary': type === 'primary' },
        { 'textarea-secondary': type === 'secondary' },
        { 'textarea-success': type === 'success' },
        { 'textarea-warning': type === 'warning' },
        { 'textarea-error': type === 'error' },
        { 'textarea-info': type === 'info' },
        { 'textarea-neutral': type === 'neutral' },
        { 'textarea-accent': type === 'accent' },
        errorMessage && '!textarea-error'
      ]"
      @focus="$emit('focus')"
      @blur="onBlur"
      @input="onInput"
    />

    <p v-if="errorMessage" class="text-sm text-error">{{ errorMessage }}</p>
  </div>
</template>
