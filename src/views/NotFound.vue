<template>
  <div
    class="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1"
  >
    <!-- Centered Content -->
    <div class="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
      <h1
        class="mb-8 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl"
      >
        ERROR
      </h1>

      <img src="/images/error/404.svg?url" alt="404" class="dark:hidden" />
      <img
        src="/images/error/404-dark.svg?url"
        alt="404"
        class="hidden dark:block"
      />

      <p
        class="mt-10 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg"
      >
        We can't seem to find the page you are looking for!
      </p>

      <router-link
        to="/"
        class="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
      >
        Back to Home Page
      </router-link>
    </div>
    <!-- Footer -->
    <p
      class="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400"
    >
      &copy; {{ currentYear }} - LocaFun
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const currentYear = ref(new Date().getFullYear());
</script>
