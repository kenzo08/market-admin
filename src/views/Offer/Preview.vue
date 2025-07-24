<script setup lang="ts">
// import {useModal, useModalSlot} from 'vue-final-modal';
// import {LazyModalTemplate, LazyProductPhotoFullScreen} from '#components';
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import PhotoBlock from '@/components/product/PhotoBlock.vue'
import InfoBar from '@/components/product/InfoBar.vue'
import BreadCrumbs from '@/components/common/Breadcrumbs.vue'
import Button from '@/components/ui/Button.vue'
import { getOffer } from '@/composables/offers.ts'


const route = useRoute()

const productData = ref({
  name: 'Brooklyn Bowler',
  price: 300,
  oldPrice: 500,
  rating: 5,
  reviewCount: 23,
  description: 'Experience premium sound quality and industry-leading noise cancellation with these wireless headphones. Perfect for music lovers and frequent travelers.',
  images: [
    {
      src: '/1.jpg',
      alt: 'pr1'
    },
    {
      src: '/2.jpg',
      alt: 'pr2'
    },
    {
      src: '/3.jpg',
      alt: 'pr3'
    },
    {
      src: '/4.jpg',
      alt: 'pr3'
    },
    {
      src: '/1.jpg',
      alt: 'pr1'
    },
    {
      src: '/2.jpg',
      alt: 'pr2'
    },
    {
      src: '/3.jpg',
      alt: 'pr3'
    },
    {
      src: '/4.jpg',
      alt: 'pr3'
    },
  ]
})

// const photoModal = useModal({
//   component: LazyModalTemplate,
//   attrs: {
//     transition: 'vfm-slide-right',
//     containerWidth: '100%',
//     isHeightFull: true,
//   },
//   slots: {
//     default: useModalSlot({
//       component: LazyProductPhotoFullScreen,
//       attrs:{
//         images: productData.value.images,
//         onClose(){
//           photoModal.close()
//         }
//       }
//     })
//   }
// })

onMounted(async () => {
  const data = await getOffer(route.params.id)
  console.log(data)
})
</script>

<template>
  <div class="container mx-auto px-4 pb-8">
    <BreadCrumbs class="pb-8 pt-4"/>
    <div class="flex gap-6 lg:flex-row flex-col">
      <PhotoBlock v-bind="productData"/>
      <InfoBar v-bind="productData"/>
    </div>
    <div class="divider my-6 lg:my-10"></div>
    <div class="flex z-10 flex-wrap glass border border-gray-400 sticky bottom-0 gap-4 shadow-2xl p-4 lg:p-6 rounded-lg">
      <Button size="lg" class="w-full lg:w-max">
        Изменить
      </Button>
      <Button size="lg" class="w-full lg:w-max">
        Отправить на модерацию
      </Button>
    </div>
  </div>
</template>

