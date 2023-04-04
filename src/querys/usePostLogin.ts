import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/axios'

type TUser = {
  cpf: string
  password: string
}

export const usePostLogin = () => {
  return useMutation({
    mutationKey: ['userQueryLogin'],
    mutationFn: async ({ cpf, password }: TUser) => {
      const { data } = await api.post('/login', {
        cpf,
        password,
      })

      return data
    },
  })
}
