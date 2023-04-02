'use client'
import ModalUnstyled from '@mui/base/ModalUnstyled'
import ButtonUnstyled from '@mui/base/ButtonUnstyled'
import { useState } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { api } from '@/lib/axios'
import { parseCookies } from 'nookies'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ToastNotification } from './ToastNotification'

const FormCarsSchema = z.object({
  brand: z.string().min(2, { message: 'brand INVALIDA' }).max(64),
  model: z.string().min(2, { message: 'model INVALIDO' }).max(64),
  year: z.coerce.number(),
  plate: z.string().min(7, { message: 'plate INVALIDA' }).max(7),
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

  const createCar = useMutation({
    mutationFn: (data: FormCarsProps & { year: number }) => {
      return api.post('/cars/create', data, {
        headers: {
          authorization: `${token}`,
        },
      })
    },
  })

  async function handleForm(body: FormCarsProps) {
    createCar.mutate(
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
        className="bg-gray-800 w-full hover:bg-gray-700 h-full px-4 py-4 text-zinc-200 text-xs font-bold flex items-center rounded-md justify-center gap-2"
        onClick={handleOpen}
      >
        <PlusCircleIcon width={20} height={20} />
        <p className="text-bold space-x-3">Adicionar Carro</p>
      </ButtonUnstyled>
      <ModalUnstyled open={open} onClose={handleClose}>
        <>
          <form className="max-w-md" onSubmit={handleSubmit(handleForm)}>
            <div>
              <label className="text-zinc-600 text-sm font-bold">Marca</label>
              <input
                type="text"
                {...register('brand')}
                className="rounded bg-zinc-300/20 text-zinc-700 hover:brightness-90 cursor-pointer w-full py-3 px-5"
                placeholder="Marca: Fiat, Volkswagen, etc..."
              />
            </div>
            <div>
              <label className="text-zinc-600 text-sm font-bold">Modelo</label>
              <input
                type="text"
                {...register('model')}
                className="rounded bg-zinc-300/20 text-zinc-700 hover:brightness-90 cursor-pointer w-full py-3 px-5"
                placeholder="Modelo: Uno, Gol, etc..."
              />
            </div>
            <div>
              <label className="text-zinc-600 text-sm font-bold">Cor</label>
              <input
                type="text"
                {...register('color')}
                className="rounded bg-zinc-300/20 text-zinc-700 hover:brightness-90 cursor-pointer w-full py-3 px-5"
                placeholder="Cor: Vermelho, Azul, Preto, etc..."
              />
            </div>
            <div className="flex gap-3">
              <div>
                <label className="text-zinc-600 text-sm font-bold">Ano</label>
                <input
                  type="text"
                  {...register('year')}
                  maxLength={4}
                  className="rounded bg-zinc-300/20 text-zinc-700 hover:brightness-90 cursor-pointer w-full py-3 px-5"
                  placeholder="Ano"
                />
              </div>
              <div>
                <label className="text-zinc-600 text-sm font-bold">
                  Potência
                </label>
                <input
                  type="text"
                  {...register('power')}
                  className="rounded bg-zinc-300/20 text-zinc-700 hover:brightness-90 cursor-pointer w-full py-3 px-5"
                  placeholder="Potência"
                />
              </div>
            </div>
            <div>
              <label className="text-zinc-600 text-sm font-bold">Placa</label>
              <input
                type="text"
                {...register('plate')}
                onChange={handleChangeplate}
                value={plate}
                maxLength={7}
                className="rounded bg-zinc-300/20 text-zinc-700 hover:brightness-90 cursor-pointer w-full py-3 px-5"
                placeholder="Placa: AAA-0000"
              />
            </div>
            <div>
              <label className="text-zinc-600 text-sm font-bold">Renavam</label>
              <input
                type="text"
                {...register('renavam')}
                maxLength={11}
                className="rounded bg-zinc-300/20 text-zinc-700 hover:brightness-90 cursor-pointer w-full py-3 px-5"
                placeholder="Renavam: 00000000000"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gray-800 hover:bg-gray-700 text-zinc-200 text-sm font-bold py-4 rounded-md w-full mt-5 ease-out duration-150 transition-all disabled:cursor-not-allowed disabled:opacity-50 disabled:animate-pulse"
            >
              Adicionar Carro
            </button>
          </form>
        </>
      </ModalUnstyled>
    </div>
  )
}
