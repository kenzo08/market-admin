<script setup lang="ts">
import { ref } from 'vue'

interface Props{
  images:Image[]
}

const props = defineProps<Props>()
defineEmits(['handleMainPhotoClick'])

interface Image{
  src: string
}
const mainPhoto = ref(props.images[0])

function changeImage(src: Image) {
  mainPhoto.value = src
}
</script>

<template>
  <div class="w-full lg:w-2/3 mb-8 cursor-pointer">
    <img
      :src="mainPhoto.src"
      alt=""
      loading="lazy"
      class="w-full  h-96 lg:h-[750px] object-cover rounded-lg shadow-md mb-4"
      @click="$emit('handleMainPhotoClick')"
    >
    <div class="flex gap-1 w-full lg:gap-4 py-4 justify-center overflow-x-auto">
      <img v-for="img in images"
           :key="img.src"
           :src="img.src"
           alt=""
           class="size-16 sm:size-20 object-cover rounded-md hover:opacity-100 transition duration-300"
           :class="{'opacity-60': img.src !== mainPhoto.src}"
           loading="lazy"
           @click="changeImage(img)">
    </div>
  </div>
</template>
