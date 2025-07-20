<script setup lang="ts">
import { computed, resolveComponent } from 'vue'

interface Props {
  size?: 'xs' |'sm' | 'md' | 'lg' | 'xl'
  type?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' |'link' | 'info' | 'neutral' | 'accent'
  isActive?: boolean
  isOutline?: boolean
  isLoading?: boolean
  iconName?: string
  iconSize?: string
  to?: string
}

const props = withDefaults(defineProps<Props>(),{
  type: 'primary',
  size: 'md'
})

const isLink = computed(() => {
  if (props.to)
    return resolveComponent('RouterLink')
  else return 'button'
})
</script>

<template>
  <component
      :is="isLink"
      :to="to"
      class="btn flex items-center justify-center"
      :class="[
          {'btn-xs': size === 'xs'},
          {'btn-sm': size === 'sm'},
          {'btn-md': size === 'md'},
          {'btn-lg': size === 'lg'},
          {'btn-xl': size === 'xl'},
          {'btn-primary': type === 'primary'},
          {'btn-secondary': type === 'secondary'},
          {'btn-success': type === 'success'},
          {'btn-warning': type === 'warning'},
          {'btn-error': type === 'error'},
          {'btn-link': type === 'link'},
          {'btn-info': type === 'info'},
          {'btn-neutral': type === 'neutral'},
          {'btn-accent': type === 'accent'},
          {'btn-active': isActive},
          {'btn-outline': isOutline}
         ]">
    <span
        class="absolute self-center"
        :class="[
          {'loading opacity-100 loading-spinner' : isLoading },
         {'opacity-0  pointer-events-none': !isLoading},
         `text-${type}`
         ]"
    />
    <div class="flex items-center gap-1" :class="{'opacity-0': isLoading }">
      <Icon v-if="iconName" :name="iconName" :size="iconSize"/>
      <slot />
    </div>
  </component>
</template>
