'use client'
import { useGetCarsListQuery } from '@/querys/useGetCarsListQuery'
import { handleLogout } from '@/utils/logout'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { CarsCard } from './CarsCard'
import { TCar } from '@/types'
import { useState } from 'react'
import { ToastRemoveNotification } from './ToastRemoveNotification copy'

export function ListCars() {
  const router = useRouter()
  const [toastRemove, setToastRemove] = useState(false)

  const { isFetching, data } = useGetCarsListQuery({
    callbackError: (error) => {
      if (axios.isAxiosError(error)) {
        error.status === 401 && handleLogout(() => router.push('/'))
      }
    },
  })

  function toastDelete() {
    setToastRemove(true)

    setTimeout(() => {
      setToastRemove(false)
    }, 1500)
  }

  return (
    <div className="w-full">
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <div>
          {data.map((car: TCar) => (
            <CarsCard
              key={car.id}
              id={car.id}
              brand={car.brand}
              model={car.model}
              color={car.color}
              year={car.year}
              power={car.power}
              plate={car.plate}
              renavam={car.renavam}
              onDelete={toastDelete}
            />
          ))}
          <ToastRemoveNotification
            title="Carro removido!"
            className={`${
              toastRemove
                ? 'fixed bottom-0 right-0 translate-y-0 opacity-100 animate-toast-slide-in'
                : 'fixed bottom-0 right-0 translate-y-full opacity-0'
            } transition-all duration-300 ease-out`}
            description="O carro foi removido com sucesso!"
          />
        </div>
      )}
    </div>
  )
}
