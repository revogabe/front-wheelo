'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useGlobalContext } from '@/context/global'
import { WheelIcon } from './icons/traffic-icon'

const FormLoginData = z.object({
  cpf: z
    .string()
    .min(11, { message: 'CPF INVALIDO' })
    .max(14)
    .transform((value) => value.replace(/(\.|-)/g, '')),

  password: z.string().min(6, { message: 'SENHA INVALIDA' }).max(20),
})

export type FormLoginProps = z.infer<typeof FormLoginData>

export function FormLogin() {
  const { handleSubmitLogin } = useGlobalContext()
  const [value, setValue] = useState('')

  const handleChange = (event: { target: { value: string } }) => {
    const result = event.target.value.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3-$4',
    )

    setValue(result)
  }

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormLoginProps>({
    resolver: zodResolver(FormLoginData),
  })

  return (
    <div className="flex flex-col w-full h-full items-start gap-8 justify-start md:justify-center md:px-4 md:max-w-lg ">
      <div className="p-3 rounded-lg bg-gray-12 flex gap-1 items-center justify-start">
        <WheelIcon width={26} height={26} className="text-orange-10" />
        <h1 className="text-2xl font-bold text-gray-1">Wheelo</h1>
      </div>
      <div className=" flex flex-col gap-1 items-start justify-center">
        <h1 className="text-2xl font-bold text-gray-12">Faça seu login</h1>
        <p className="text-sm text-gray-11">
          usando seu CPF e senha cadastrados
        </p>
      </div>
      <form
        onSubmit={handleSubmit(handleSubmitLogin)}
        className="flex w-full flex-col gap-4"
      >
        <input
          type="text"
          id="cpf"
          {...register('cpf', {
            required: true,
          })}
          name="cpf"
          value={value}
          maxLength={11}
          onChange={handleChange}
          placeholder="Digite seu CPF"
          className="bg-gray-1 border border-gray-7 w-full px-4 py-4 focus:outline-orange-11 rounded-md focus:border-transparent "
        />
        {errors.cpf && (
          <p className="text-sm text-red-500">{errors.cpf.message}</p>
        )}

        <input
          type="password"
          id="password"
          {...register('password', {
            required: true,
            minLength: 6,
          })}
          name="password"
          placeholder="Senha"
          className="bg-gray-1 border border-gray-7 w-full px-4 py-4 focus:outline-orange-11 rounded-md focus:border-transparent"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
        <button
          type="submit"
          className="bg-gray-12 rounded-md py-4 hover:bg-gray-3 group transition-all border-transparent border hover:border-gray-12 ease-out duration-200 focus:outline-orange-11"
          disabled={isSubmitting}
        >
          <p className="text-base font-bold text-white group-hover:text-gray-12 transition-all ease-out duration-200">
            Entrar
          </p>
        </button>
        <Link
          href="/register"
          className="mt-2 self-center flex w-max items-center justify-center focus:outline-orange-11 p-2"
        >
          <p className="self-center text-sm text-gray-900 text-center">
            Nao tem uma conta?{' '}
            <span className="font-semibold">Cadastre-se agora mesmo!</span>
          </p>
        </Link>
      </form>
    </div>
  )
}
