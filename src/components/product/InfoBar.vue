<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useRoute } from 'vue-router'
import Button from '@/components/ui/Button.vue'

interface Props{
  name:string
  description:string
  reviewCount:number
  price:number
  oldPrice:number,
  rating: number,
}

defineProps<Props>()

const route = useRoute()

const { lg } = useBreakpoints(breakpointsTailwind, { ssrWidth: 768 })
</script>

<template>
  <div class="w-full lg:w-1/3">
    <h1 class="text-3xl font-bold mb-2">{{name}}</h1>
    <p class="mb-4 flex flex-wrap gap-2 items-center justify-between">
      <span>ID предложения: WH1000XM4</span>
      <span class="badge badge-success text-white whitespace-nowrap">
        Сейчас открыта
      </span>
    </p>
    <div class="mb-4">
      <span class="text-2xl font-bold mr-2">{{price}}</span>
      <span class="line-through">{{oldPrice}}</span>
    </div>
    <div class="flex items-center mb-8">
     <span class="mr-2">
       Рейтинг:
     </span>
      <Icon v-for="_ in rating" :key="_" name="24x24/star" :size="lg ?  '24' : '16'"/>
      <span class="ml-2">{{rating}} ({{reviewCount}} отзывов)</span>
    </div>
    <p class="mb-8">
      {{description}}
    </p>

    <RouterLink to="/seller/slug" class="flex items-center gap-4 w-full lg:w-max px-8 py-4 mb-8 border border-gray-200 rounded-xl">
      <div class="avatar avatar-online">
        <div class="w-10 rounded-full">
          <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
        </div>
      </div>
      <div class="flex gap-2">
        <span class="text-[16px] uppercase font-semibold">
        "ООО Буллинг"
      </span>
        <Icon name="24x24/star" size="24"/> 4.7
      </div>
    </RouterLink>
    <div class="flex flex-col w-full gap-4 mb-8">
      <Button icon-size="16" icon-name="16x16/calendar-add" size="lg" class="w-full" :to="`/booking/${route.params.slug}`">
        Забронировать
      </Button>
      <Button is-outline icon-name="24x24/support-agent" size="lg" class="w-full" icon-size="16">
        Написать заведению
      </Button>
    </div>

    <div class="my-8">
      <h3 class="text-lg font-semibold mb-2">Ключевые особенности заведения:</h3>
      <ul class="list-disc list-inside">
        <li>Industry-leading noise cancellation</li>
        <li>30-hour battery life</li>
        <li>Touch sensor controls</li>
        <li>Speak-to-chat technology</li>
      </ul>
    </div>
    <div class="flex flex-col gap-2">
      <div class="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" checked="checked" />
        <div class="collapse-title font-semibold">График работы:</div>
        <div class="collapse-content text-sm">
          <div class="space-y-2">
            <div class="flex justify-between border-b pb-1">
              <span class="font-medium">Понедельник</span>
              <span>09:00 – 18:00</span>
            </div>
            <div class="flex justify-between border-b pb-1">
              <span class="font-medium">Вторник</span>
              <span>09:00 – 18:00</span>
            </div>
            <div class="flex justify-between border-b pb-1">
              <span class="font-medium">Среда</span>
              <span>09:00 – 18:00</span>
            </div>
            <div class="flex justify-between border-b pb-1">
              <span class="font-medium">Четверг</span>
              <span>09:00 – 18:00</span>
            </div>
            <div class="flex justify-between border-b pb-1">
              <span class="font-medium">Пятница</span>
              <span>09:00 – 17:00</span>
            </div>
            <div class="flex justify-between border-b pb-1">
              <span class="font-medium">Суббота</span>
              <span class="text-gray-400 italic">Выходной</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Воскресенье</span>
              <span class="text-gray-400 italic">Выходной</span>
            </div>
          </div>
        </div>
      </div>
      <div class="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" />
        <div class="collapse-title font-semibold">Что взять с собой?</div>
        <div class="collapse-content text-sm">
          Хорошее настроение и друзей :)
        </div>
      </div>
      <div class="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" />
        <div class="collapse-title font-semibold">Правила и ограничения</div>
        <div class="collapse-content text-sm">
          Не допускаются лица в сильном алкогольном опьянении.<br>
          Нельзя оскорблять сотрудников и других посетителей<br>
          Нельзя курить в неположенных местах.<br>
          Нельзя распивать алкогольные напитки.
        </div>
      </div>
    </div>
  </div>
</template>
