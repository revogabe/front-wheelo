import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/axios'

type TUser = {
  cpf: string
  password: string
  name: string
}

export const usePostRegister = () => {
  return useMutation({
    mutationKey: ['userQueryRegister'],
    mutationFn: async ({ cpf, password, name }: TUser) => {
      const { data } = await api.post('/register', {
        cpf,
        password,
      })

      return data
    },
  })
}
