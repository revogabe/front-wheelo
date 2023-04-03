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
import { CarIdProps } from '@/app/dashboard/components/HeroContainerFuel'

const FormFuelSchema = z.object({
  typeFuel: z.string().min(2, { message: 'Nome do combustível curto' }).max(64),
  quantity: z.number(),
  price: z.number(),
})

type FormFuelProps = z.infer<typeof FormFuelSchema>

export default function ModalAddFuel({ carId }: CarIdProps) {
  const { token } = parseCookies()
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormFuelProps>({
    resolver: zodResolver(FormFuelSchema),
  })

  function toastCheck() {
    setToast(true)

    setTimeout(() => {
      setToast(false)
    }, 3000)
  }

  const queryClient = useQueryClient()

  const createFuel = useMutation({
    mutationFn: (data: FormFuelProps) => {
      return api.post(`/supply/create/${carId}`, data, {
        data: {
          typeFuel: data.typeFuel,
          quantity: data.quantity,
          price: data.price,
        },
        headers: {
          authorization: `${token}`,
        },
      })
    },
  })

  async function handleForm(body: FormFuelProps) {
    createFuel.mutate(body, {
      onSuccess: async () => {
        toastCheck()
        handleClose()
        await queryClient.refetchQueries({ queryKey: ['supplyList'] })
      },
    })
  }

  return (
    <div className="h-full w-full">
      <ToastNotification
        data-state={toast}
        title="Combustível adicionado!"
        className={`${
          toast
            ? 'fixed bottom-0 right-0 translate-y-0 opacity-100 animate-toast-slide-in'
            : 'fixed bottom-0 right-0 translate-y-full opacity-0'
        } transition-all duration-300 ease-out`}
        description="O combustível foi adicionado com sucesso!"
      />
      <ButtonUnstyled
        className="bg-gray-12 h-full max-lg:w-full hover:bg-gray-4 transition border-gray-6 border rounded-md hover:border-gray-12 text-gray-1 hover:text-gray-12 py-3 px-6 "
        onClick={handleOpen}
      >
        Adicionar Carro
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
              {...register('typeFuel')}
              className="bg-gray-1 border border-gray-7 w-full px-4 py-4 focus:outline-orange-11 rounded-md focus:border-transparent "
              placeholder="Tipo de Combustível"
            />
            <input
              type="number"
              {...register('quantity', { valueAsNumber: true })}
              className="bg-gray-1 border border-gray-7 w-full px-4 py-4 focus:outline-orange-11 rounded-md focus:border-transparent "
              placeholder="Quantidade (Litros)"
            />
            <input
              type="number"
              {...register('price', { valueAsNumber: true })}
              className="bg-gray-1 border border-gray-7 w-full px-4 py-4 focus:outline-orange-11 rounded-md focus:border-transparent "
              placeholder="Preço (R$)"
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
