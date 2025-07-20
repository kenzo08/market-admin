import { useApiPost } from '@/composables/useApi.ts'
import { useAuthStore } from '@/stores/auth.ts'
import { storeToRefs } from 'pinia'
import { getCookie, setCookie } from '@/utils/cookie.ts'

export interface AuthJwt {
  accessToken: string,
  refreshToken: string,
  refreshTokenExpire: number
}

export async function useRefreshToken() {
  const refreshToken = getCookie('refreshToken')

  return useApiPost<AuthJwt>('/api/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  })
}

export function useSetTokens(data: AuthJwt) {
  const authStore = useAuthStore()
  const { isLogged, accessToken  } = storeToRefs(authStore)

  const expires = new Date(data.refreshTokenExpire * 1000)
  accessToken.value = data.accessToken
  setCookie('refreshToken', data.refreshToken, expires)
  isLogged.value = true
}
