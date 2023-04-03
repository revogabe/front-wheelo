import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PLUBLIC_API_URL,
})
