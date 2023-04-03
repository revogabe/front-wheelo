import { parseCookies } from 'nookies'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

type TGetCarsListQuery = {
  callbackSuccess?: (data: any) => void
  callbackError?: (error: any) => void
}

export const useGetSuppplyListQuery = ({
  callbackSuccess,
  callbackError,
}: TGetCarsListQuery) => {
  const { token } = parseCookies()

  return useQuery({
    queryKey: ['listCars'],
    queryFn: async () => {
      const { data } = await api.get('/supply/list', {
        headers: {
          authorization: `${token}`,
        },
      })

      return data
    },
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      callbackSuccess && callbackSuccess(data)
    },
    onError: (error) => {
      callbackError && callbackError(error)
    },
    retry: 1,
  })
}
