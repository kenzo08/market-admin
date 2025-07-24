<script setup lang="ts">
import { ref } from 'vue'
import * as Yup from 'yup'
import {useForm} from 'vee-validate';
import { type AuthJwt, useSetTokens } from '@/composables/useRefreshAuth.ts'
import { useApiPost } from '@/composables/useApi.ts'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import { useRouter } from 'vue-router'
import Checkbox from '@/components/ui/Checkbox.vue'

const isLoading = ref(false)
const email = ref('')
const keepLoggedIn = ref(false)
const showPassword = ref(false)
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
      const response = await useApiPost<AuthJwt>('/api/auth/signin', {
        body: { email, password,}
      })

      useSetTokens(response)
    await router.push('/')
  }catch (error: unknown) {
    if (error?._data?.message)
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
          <div class="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div>
              <div class="mb-5 sm:mb-8">
                <h1 class="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                  Войти
                </h1>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Укажите свой email и пароль чтобы войти!
                </p>
              </div>
              <div>
                <form @submit="onSubmit">
                  <div class="space-y-5">
                    <div>
                      <label for="email" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Email<span class="text-error-500">*</span>
                      </label>
                      <Input
                        v-model="email"
                        input-type="email"
                        name="email"
                        placeholder="info@gmail.com"
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
                      <div class="relative">
                        <Input
                          :input-type="showPassword ? 'text' : 'password'"
                          name="password"
                          :right-icon="showPassword ? 'eye-hidden' : 'eye'"
                          placeholder="Введите свой пароль"
                          icon-size="20"
                          @icon-click="togglePasswordVisibility"
                        />
                      </div>
                    </div>
                    <div class="flex w-full items-center justify-between">
                      <Checkbox
                        v-model="keepLoggedIn"
                        name="keepLoggedIn"
                        label="Сохранить вход"
                        size="sm"
                      />
                      <router-link to="/reset-password" class="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400">
                        Забыли пароль?
                      </router-link>
                    </div>
                      <Button :is-loading="isLoading" class="w-full">
                        Войти
                      </Button>
                  </div>
                </form>
                <div class="mt-5">
                  <p class="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                    Еще не зарегистрированы?
                    <router-link to="/signup" class="text-brand-500 hover:text-brand-600 dark:text-brand-400">
                      Зарегистрироваться
                    </router-link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="relative items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <div class="flex items-center justify-center z-1">
            <p class="text-center text-title-2xl text-gray-400 dark:text-white/60">
              LocaFun <br/> sellers
            </p>
          </div>
        </div>
      </div>
    </div>
</template>
