'use client'
import ButtonUnstyled from '@mui/base/ButtonUnstyled'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { api } from '@/lib/axios'
import { parseCookies } from 'nookies'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ToastNotification } from './ToastNotification'
import { Box } from '@mui/material'
import { ModalUnstyled } from '@mui/base'

const FormCarsSchema = z.object({
  brand: z.string().min(2, { message: 'brand INVALIDA' }).max(64),
  model: z.string().min(2, { message: 'model INVALIDO' }).max(64),
  year: z.coerce.number().refine((value) => value > 1900 && value < 2022 + 1, {
    message: 'Ano INVALIDO',
  }),
  plate: z
    .string()
    .min(7, { message: 'plate INVALIDA' })
    .max(7)
    .regex(/^[A-Z]{3}[0-9]{4}$/, { message: 'PLACA INVALIDA' }),
  color: z.string().min(2, { message: 'color INVALIDA' }).max(64),
  power: z.string().min(2, { message: 'power INVALIDA' }).max(64),
  renavam: z.string().min(11, { message: 'RENAVAM INVALIDO' }).max(11),
})

type FormCarsProps = z.infer<typeof FormCarsSchema>

export default function ModalAdd() {
  const { token } = parseCookies()
  const [open, setOpen] = useState(false)
  const [plate, setplate] = useState('')
  const [toast, setToast] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormCarsProps>({
    resolver: zodResolver(FormCarsSchema),
  })

  const handleChangeplate = (event: { target: { value: string } }) => {
    const result = event.target.value.toUpperCase()

    setplate(result)
  }

  function toastCheck() {
    setToast(true)

    setTimeout(() => {
      setToast(false)
    }, 3000)
  }

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: FormCarsProps & { year: number }) => {
      return api.post('/cars/create', data, {
        headers: {
          authorization: `${token}`,
        },
      })
    },
  })

  async function handleForm(body: FormCarsProps) {
    mutate(
      { ...body, year: Number(body.year) },
      {
        onSuccess: async () => {
          toastCheck()
          handleClose()
          await queryClient.refetchQueries({ queryKey: ['listCars'] })
        },
      },
    )
  }

  return (
    <div className="h-full w-full">
      <ToastNotification
        data-state={toast}
        title="Carro adicionado!"
        className={`${
          toast
            ? 'fixed bottom-0 right-0 translate-y-0 opacity-100 animate-toast-slide-in'
            : 'fixed bottom-0 right-0 translate-y-full opacity-0'
        } transition-all duration-300 ease-out`}
        description="O carro foi adicionado com sucesso!"
      />
      <ButtonUnstyled
        className="bg-gray-12 h-full max-lg:w-full hover:bg-gray-4 transition border-gray-6 border rounded-md hover:border-gray-12 text-gray-1 hover:text-gray-12 py-3 px-6 disabled:opacity-20 disabled:cursor-not-allowed"
        onClick={handleOpen}
        disabled={isLoading}
      >
        {isLoading ? 'Adicionando...' : 'Adicionar carro'}
      </ButtonUnstyled>
      <ModalUnstyled
        open={open}
        className="bg-black/10 z-50 backdrop-blur-sm w-full h-full overflow-y-scroll px-6  pl-36 pt-20 fixed inset-0 flex items-center justify-center"
      >
        <Box className="w-full max-w-md  m-auto p-8 gap-2 rounded-lg shadow-black/10 shadow-xl flex flex-col h-max bg-gray-1">
          <form
            onSubmit={handleSubmit(handleForm)}
            className="flex flex-col w-full gap-3"
          >
            <input
              type="text"
              {...register('brand')}
              className="bg-gray-1 border border-gray-7 w-full px-4 py-4 focus:outline-orange-11 rounded-md focus:border-transparent "
              placeholder="Marca: Fiat, Volkswagen, etc..."
            />
            <input
              type="text"
              {...register('model')}
              className="bg-gray-1 border border-gray-7 w-full px-4 py-4 focus:outline-orange-11 rounded-md focus:border-transparent "
              placeholder="Modelo: Uno, Gol, etc..."
            />
            <input
              type="text"
              {...register('color')}
              className="bg-gray-1 border border-gray-7 w-full px-4 py-4 focus:outline-orange-11 rounded-md focus:border-transparent "
              placeholder="Cor: Vermelho, Azul, Preto, etc..."
            />
            <div className="flex gap-3">
              <input
                type="text"
                {...register('year')}
                maxLength={4}
                className="bg-gray-1 border border-gray-7 w-full px-4 py-4 focus:outline-orange-11 rounded-md focus:border-transparent "
                placeholder="Ano"
              />

              <input
                type="text"
                {...register('power')}
                className="bg-gray-1 border border-gray-7 w-full px-4 py-4 focus:outline-orange-11 rounded-md focus:border-transparent "
                placeholder="Potência"
              />
            </div>
            <input
              type="text"
              {...register('plate')}
              onChange={handleChangeplate}
              value={plate}
              maxLength={7}
              className="bg-gray-1 border border-gray-7 w-full px-4 py-4 focus:outline-orange-11 rounded-md focus:border-transparent "
              placeholder="Placa: AAA-0000"
            />
            <input
              type="text"
              {...register('renavam')}
              maxLength={11}
              className="bg-gray-1 border border-gray-7 w-full px-4 py-4 focus:outline-orange-11 rounded-md focus:border-transparent "
              placeholder="Renavam: 00000000000"
            />
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gray-12 hover:text-orange-11 rounded-md py-4 hover:bg-orange-6 group transition-all border-transparent text-gray-1 border hover:border-orange-9 ease-out duration-200 focus:outline-orange-11"
              >
                Adicionar Carro
              </button>
              <button
                onClick={handleClose}
                className="bg-gray-3 rounded-md py-4 hover:bg-gray-5 group transition-all border-gray-7 border text-gray-10 hover:text-gray-12 hover:border-gray-12 ease-out duration-200 focus:outline-orange-11"
              >
                Cancelar
              </button>
            </div>
          </form>
        </Box>
      </ModalUnstyled>
    </div>
  )
}
