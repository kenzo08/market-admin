import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', ()=>{
const isLogged = ref(false)
const accessToken = ref()

return { isLogged, accessToken }
})
