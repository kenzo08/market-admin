<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useApiPost } from '@/composables/useApi.ts'
import { type AuthJwt, useSetTokens } from '@/composables/useRefreshAuth.ts'
import * as Yup from 'yup'
import { useForm } from 'vee-validate'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'

const showPassword = ref(false)
const agreeToTerms = ref(false)
const isLoading = ref(false)
const router = useRouter()

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const schema = Yup.object().shape({
  name: Yup.string().notRequired(),
  email: Yup.string().email('Введите почту в правильном формате').required('Введите вашу почту'),
  password: Yup.string().required('Введите ваш пароль').min(6, 'Пароль должен быть не менее 6 символов'),
  passwordRepeat: Yup.string().notRequired()
})

const { handleSubmit, setFieldError } = useForm({
  validationSchema: schema,
})

const onSubmit = handleSubmit(async (values) => {
  const { name, email, password } = values
  isLoading.value = true
  try {
    const response = await useApiPost<AuthJwt>('/api/auth/signup', {
      body: { email, password,}
    })

    useSetTokens(response)
    await router.push('/')
  }catch (error) {
    setFieldError('password', error._data?.message)
    console.error(error)
  }finally {
    isLoading.value = false
  }
})
</script>

<template>
    <div class="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div class="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900">
        <div class="flex flex-col flex-1 w-full lg:w-1/2">
          <!-- Form -->
          <div class="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div class="mb-5 sm:mb-8">
              <h1
                class="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md"
              >
                Регистрация
              </h1>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Укажите свой email и password чтобы пройти регистрацию!
              </p>
            </div>
            <div>
              <form @submit="onSubmit">
                <div class="space-y-5">
<!--                  <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">-->
<!--                    &lt;!&ndash; First Name &ndash;&gt;-->
<!--                    <div class="sm:col-span-1">-->
<!--                      <label-->
<!--                        for="fname"-->
<!--                        class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"-->
<!--                      >-->
<!--                        Имя<span class="text-error-500">*</span>-->
<!--                      </label>-->
<!--                      <input-->
<!--                        v-model="firstName"-->
<!--                        type="text"-->
<!--                        id="fname"-->
<!--                        name="fname"-->
<!--                        placeholder="Enter your first name"-->
<!--                        class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"-->
<!--                      />-->
<!--                    </div>-->
<!--                    &lt;!&ndash; Last Name &ndash;&gt;-->
<!--                    <div class="sm:col-span-1">-->
<!--                      <label-->
<!--                        for="lname"-->
<!--                        class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"-->
<!--                      >-->
<!--                        Фамилия<span class="text-error-500">*</span>-->
<!--                      </label>-->
<!--                      <input-->
<!--                        v-model="lastName"-->
<!--                        type="text"-->
<!--                        id="lname"-->
<!--                        name="lname"-->
<!--                        placeholder="Enter your last name"-->
<!--                        class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"-->
<!--                      />-->
<!--                    </div>-->
<!--                  </div>-->
                  <!-- Email -->
                  <div>
                    <label
                      for="email"
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      Email<span class="text-error-500">*</span>
                    </label>
                    <Input
                      input-type="email"
                      name="email"
                      placeholder="Введите свой email"
                    />
                  </div>
                  <!-- Password -->
                  <div>
                    <label
                      for="password"
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      Пароль<span class="text-error-500">*</span>
                    </label>
                      <Input
                        :input-type="showPassword ? 'text' : 'password'"
                        :right-icon="showPassword ? 'eye-hidden' : 'eye'"
                        name="password"
                        placeholder="Укажите password"
                        @icon-click="togglePasswordVisibility"
                      />
                  </div>
                  <!-- Checkbox -->
<!--                  <div>-->
<!--                    <div>-->
<!--                      <label-->
<!--                        for="checkboxLabelOne"-->
<!--                        class="flex items-start text-sm font-normal text-gray-700 cursor-pointer select-none dark:text-gray-400"-->
<!--                      >-->
<!--                        <div class="relative">-->
<!--                          <input-->
<!--                            v-model="agreeToTerms"-->
<!--                            type="checkbox"-->
<!--                            id="checkboxLabelOne"-->
<!--                            class="sr-only"-->
<!--                          />-->
<!--                          <div-->
<!--                            :class="-->
<!--                              agreeToTerms-->
<!--                                ? 'border-brand-500 bg-brand-500'-->
<!--                                : 'bg-transparent border-gray-300 dark:border-gray-700'-->
<!--                            "-->
<!--                            class="mr-3 flex h-5 w-5 items-center justify-center rounded-md border-[1.25px]"-->
<!--                          >-->
<!--                            <span :class="agreeToTerms ? '' : 'opacity-0'">-->
<!--                              <svg-->
<!--                                width="14"-->
<!--                                height="14"-->
<!--                                viewBox="0 0 14 14"-->
<!--                                fill="none"-->
<!--                                xmlns="http://www.w3.org/2000/svg"-->
<!--                              >-->
<!--                                <path-->
<!--                                  d="M11.6666 3.5L5.24992 9.91667L2.33325 7"-->
<!--                                  stroke="white"-->
<!--                                  stroke-width="1.94437"-->
<!--                                  stroke-linecap="round"-->
<!--                                  stroke-linejoin="round"-->
<!--                                />-->
<!--                              </svg>-->
<!--                            </span>-->
<!--                          </div>-->
<!--                        </div>-->
<!--                        <p class="inline-block font-normal text-gray-500 dark:text-gray-400">-->
<!--                          By creating an account means you agree to the-->
<!--                          <span class="text-gray-800 dark:text-white/90">-->
<!--                            Terms and Conditions,-->
<!--                          </span>-->
<!--                          and our-->
<!--                          <span class="text-gray-800 dark:text-white"> Privacy Policy </span>-->
<!--                        </p>-->
<!--                      </label>-->
<!--                    </div>-->
<!--                  </div>-->
                  <!-- Button -->
                    <Button :is-loading="isLoading" class="w-full">
                      Регистрироваться
                    </Button>
                </div>
              </form>
              <div class="mt-5">
                <p class="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                  Уже есть профиль?
                  <router-link to="/signin" class="text-brand-500 hover:text-brand-600 dark:text-brand-400">
                    Войти
                  </router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="relative items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid"
        >
          <div class="flex items-center justify-center z-1">
            <div class="flex flex-col items-center max-w-xs">
              <p class="text-center text-title-2xl text-gray-400 dark:text-white/60">
                LocaFun sellers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
