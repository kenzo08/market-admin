<script setup lang="ts">
import { toRef } from 'vue'
import { useField } from 'vee-validate'

interface Props {
  name: string
  size?: 'xs' |'sm' | 'md' | 'lg' | 'xl'
  type?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' |'link' | 'info' | 'neutral' | 'accent'
  label?: string
}

const props = withDefaults(defineProps<Props>(),{
  inputType: 'text',
  size: 'md',
  type: 'primary'
})

const name = toRef(props, 'name')

const {
  value: inputValue,
  errorMessage,
} = useField(name, undefined, {
  syncVModel: true,
})
</script>

<template>
  <div class="flex w-max flex-col gap-1">
    <div class="flex items-center gap-2 relative">
      <input
        v-model="inputValue"
        type="checkbox"
        :name="name"
        class="checkbox"
        :class="[
            {'checkbox-xs': size === 'xs'},
            {'checkbox-sm': size === 'sm'},
            {'checkbox-md': size === 'md'},
            {'checkbox-lg': size === 'lg'},
            {'checkbox-xl': size === 'xl'},
            {'checkbox-primary': type === 'primary'},
            {'checkbox-secondary': type === 'secondary'},
            {'checkbox-success': type === 'success'},
            {'checkbox-error': type === 'error'},
            {'checkbox-info': type === 'info'},
            {'checkbox-neutral': type === 'neutral'},
            {'checkbox-accent': type === 'accent'},
            errorMessage &&  '!checkbox-error'
        ]"
      />
      <label :for="name">{{ label }}</label>
    </div>
    <p v-if="errorMessage" class="text-m  text-error">
      {{ errorMessage }}
    </p>
  </div>
</template>
