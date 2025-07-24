<script setup lang="ts">
import { ref, watch } from 'vue'
import { Field, ErrorMessage } from 'vee-validate';
type Option = {
  name: string
  value: string | number
}

type Group = {
  name: string
  children: Option[]
}

interface Props {
  name: string
  placeholder?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  state?: 'success' | 'warning' | 'error'
  type?: 'primary' | 'secondary' | 'accent' | 'neutral'
  items: (Option | Group)[]
}

withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'md'
})

const emit = defineEmits<{ (e: 'update:modelValue', value: Option | null): void }>()

const selected = ref<Option | null>(null)

watch(selected, (value) => {
  emit('update:modelValue', value)
})

function isGroup(item: Option | Group): item is Group {
  return 'children' in item
}
</script>

<template>
  <div class="flex flex-col  gap-1">
    <Field
      :name="name"
      as="select"
      class="select w-max focus:outline-none"
      :class="[
        { 'select-xs': size === 'xs' },
        { 'select-sm': size === 'sm' },
        { 'select-md': size === 'md' },
        { 'select-lg': size === 'lg' },
        { 'select-xl': size === 'xl' },
        { 'select-success': state === 'success' },
        { 'select-warning': state === 'warning' },
        { 'select-error': state === 'error' },
        { 'select-primary': type === 'primary' },
        { 'select-secondary': type === 'secondary' },
        { 'select-accent': type === 'accent' },
        { 'select-neutral': type === 'neutral' }
    ]"
    >
      <option disabled :value="null">{{ placeholder }}</option>
      <template v-for="item in items" :key="item.name">
        <optgroup v-if="isGroup(item)" :label="item.name">
          <option v-for="child in item.children" :key="child.value" :value="child">
            {{ child.name }}
          </option>
        </optgroup>
        <option v-else :value="item" :key="item.value">
          {{ item.name }}
        </option>
      </template>
    </Field>
    <ErrorMessage :name="name" class="text-error"/>
  </div>
</template>
