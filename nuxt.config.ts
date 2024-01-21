import { resolve } from 'path'
export default defineNuxtConfig({
  alias:{
    "@": resolve(__dirname, "/")
  },
  css:["~/assets/main.scss"]
})
