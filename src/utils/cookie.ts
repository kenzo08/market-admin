import Cookies from 'js-cookie'

export const setCookie = (key: string, value: string, expires?: Date) => {
  Cookies.set(key, value, { expires: expires || 7 })
}

export const getCookie = (key: string): string | undefined => {
  return Cookies.get(key)
}

export const removeCookie = (key: string) => {
  Cookies.remove(key)
}
