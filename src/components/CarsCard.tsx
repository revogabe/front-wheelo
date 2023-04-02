import {
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'
import { CarIcons } from './icons/car-icon'
import { TCar } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { parseCookies } from 'nookies'
import Link from 'next/link'

type DeleteCarProps = {
  onDelete: () => void
}

export function CarsCard({
  id,
  brand,
  color,
  model,
  plate,
  power,
  renavam,
  year,
  onDelete,
}: TCar & DeleteCarProps) {
  const queryClient = useQueryClient()
  const { token } = parseCookies()

  const deleteCar = useMutation({
    mutationFn: (id: TCar['id']) => {
      return api.delete('/cars/delete', {
        data: {
          id,
        },
        headers: { authorization: `${token}` },
      })
    },
  })

  function handleDeleteCar() {
    deleteCar.mutate(id, {
      onSuccess: async () => {
        await queryClient.refetchQueries({ queryKey: ['listCars'] })
        onDelete()
      },
    })
  }

  return (
    <div className="w-full flex gap-4 items-center justify-between p-6 rounded-md shadow shadow-zinc-800/25 mb-3  transition-all ease-out duration-200 cursor-pointer">
      <div className="flex pr-4 w-max flex-col gap-1 items-start justify-center">
        <CarIcons width={32} height={32} />
      </div>
      <div className="flex w-full flex-col items-start justify-center">
        <h1 className="font-bold text-xl -mb-0.5">{brand}</h1>
        <p className="text-zinc-600">{model}</p>
      </div>
      <div className="flex w-full flex-col gap-1 items-start justify-start">
        <p className="text-zinc-600">Cor: {color}</p>
      </div>
      <div className="flex w-full flex-col gap-1 items-start justify-center">
        <p className="text-zinc-600">Ano: {year}</p>
        <p className="text-zinc-600">Potência: {power}</p>
      </div>
      <div className="flex w-full flex-col gap-1 items-start justify-center">
        <p className="text-zinc-600">Placa: {plate}</p>
        <p className="text-zinc-600">Renavam: {renavam}</p>
      </div>
      <div className="flex w-full gap-3 items-center justify-center">
        <div className="flex gap-3 w-full">
          <button className="bg-zinc-200 hover:bg-zinc-300 ease-out duration-150 transition-all rounded-md p-3">
            <PencilSquareIcon width={16} height={16} />
          </button>
          <button
            onClick={handleDeleteCar}
            className="bg-zinc-200 hover:bg-red-500 hover:text-zinc-200 ease-out duration-150 transition-all rounded-md p-3"
          >
            <TrashIcon width={16} height={16} />
          </button>
          <Link
            href={`/dashboard/${id}`}
            className="bg-gray-800 w-full text-zinc-200 flex items-center justify-center gap-2
             hover:bg-zinc-300 hover:text-gray-800 ease-out duration-150 transition-all rounded-md p-3"
          >
            <PlusCircleIcon width={16} height={16} />
            <h1>Abastacer veículo</h1>
          </Link>
        </div>
      </div>
    </div>
  )
}
