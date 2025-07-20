import { ofetch } from 'ofetch'
import { useAuthStore } from '@/stores/auth.ts'
import { storeToRefs } from 'pinia'
import { useRefreshToken, useSetTokens } from '@/composables/useRefreshAuth.ts'
import { jwtDecode, type JwtPayload } from 'jwt-decode'
import router from '@/router'

export const api = ofetch.create({
  baseURL: import.meta.env.VITE_API_URL,

  async onRequest({ options, request }) {
    const authStore = useAuthStore()
    const { accessToken } = storeToRefs(authStore)
    const isRefreshTokenRequest = String(request).includes('/api/auth/refresh')


    if (accessToken.value && !isRefreshTokenRequest) {
      const tokenExp = jwtDecode<JwtPayload>(accessToken.value).exp
      const currentTime = new Date().getTime()
      const tokenTime = new Date(tokenExp! * 1000).getTime()
      if (currentTime + 10 * 1000 >= tokenTime) {
        const data = await useRefreshToken()
        if (data)
          useSetTokens(data)
      }

      options.headers = {
        ...options.headers,
        ...{ Authorization: `Bearer ${accessToken.value}` },
        ...{'Content-Type': 'application/json'},
        ...{Accept: 'application/json'}
      }
    }
  },

  async onResponseError({ response }) {
    if (response.status >= 500) {
      console.error('Ошибка сервера', response._data)
    } else {
      throw response
    }
  },
})
