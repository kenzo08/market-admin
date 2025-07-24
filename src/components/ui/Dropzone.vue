<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Dropzone from 'dropzone'
import 'dropzone/dist/dropzone.css'
import Icon from '@/components/Icon.vue'

const props = defineProps({
  uploadUrl: {
    type: String,
    default: '/upload',
  },
})

const dropzoneForm = ref(null)
const dropzoneId = `dropzone-${Math.random().toString(36).substr(2, 9)}`
let dropzoneInstance: Dropzone

onMounted(() => {
  Dropzone.autoDiscover = false

  dropzoneInstance = new Dropzone(`#${dropzoneId}`, {
    url: props.uploadUrl,
    thumbnailWidth: 150,
    maxFilesize: 0.5,
    acceptedFiles: 'image/jpeg,image/png,image/gif,image/webp,image/svg+xml',
    headers: { 'My-Awesome-Header': 'header value' },
    dictDefaultMessage: '',
    init: function () {
      this.on('addedfile', (file) => {
        console.log('A file has been added', file)
      })
      this.on('success', (file, response) => {
        console.log('File successfully uploaded', file, response)
      })
      this.on('error', (file, error) => {
        console.error('An error occurred during upload', file, error)
      })
    },
  })
})

onBeforeUnmount(() => {
  if (dropzoneInstance) {
    dropzoneInstance.destroy()
  }
})
</script>

<template>
  <div class="file-uploader">
    <form
      ref="dropzoneForm"
      :id="dropzoneId"
      :action="uploadUrl"
      class="border-primary border-dashed dropzone rounded-xl p-7 lg:p-10"
    >
      <div class="dz-message">
        <div class="mb-[22px] flex justify-center">
          <div
            class="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
          >
            <Icon name="upload" size="30" />
          </div>
        </div>

        <h4 class="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
          Перетащите фото сюда
        </h4>
        <span class="mx-auto mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400">
          Поддерживаемые форматы фото  PNG, JPG, WebP (до 2MB каждый)
        </span>

        <span class="font-medium underline cursor-pointer text-theme-sm text-brand-500">
          Выбрать фото
        </span>
      </div>
    </form>
  </div>
</template>

<style scoped>
.dropzone {
  border: 1px solid #465fff;
  transition: all 0.3s ease;
}

.dropzone:hover {
  border-color: #465fff;
}

.dropzone .dz-preview {
  margin: 10px;
}

.dropzone .dz-preview .dz-image {
  border-radius: 8px;
}

.dropzone .dz-preview .dz-details {
  padding: 1em;
}

.dropzone .dz-preview .dz-progress {
  height: 10px;
}

.dropzone .dz-preview .dz-progress .dz-upload {
  background: #4f46e5;
}

.dark .dropzone:hover {
  border-color: #6366f1;
}
</style>
