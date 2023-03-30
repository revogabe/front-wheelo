'use client'
import { ShieldCheckIcon } from '@heroicons/react/24/solid'
import CircularProgress from '@mui/material/CircularProgress'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '@/lib/api'

const FormLoginData = z
  .object({
    cpf: z
      .string()
      .min(11, { message: 'CPF INVALIDO' })
      .max(14)
      .transform((value) => value.replace(/(\.|-)/g, '')),

    password: z.string().min(6, { message: 'SENHA INVALIDA' }).max(20),
    confirmPassword: z.string().min(6, { message: 'SENHA INVALIDA' }).max(20),
    name: z.string().min(4, { message: 'NOME COMPLETO' }).max(64),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'SENHAS NÃO CONFEREM',
    path: ['confirmPassword'],
  })

type FormLoginProps = z.infer<typeof FormLoginData>

export function FormRegister() {
  const [loading, setLoading] = useState(false)
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

  async function handleForm(data: FormLoginProps) {
    const { cpf, password, name } = data

    api.post('/register', {
      cpf,
      password,
      name,
    })

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="flex min-h-[640px] w-full max-w-3xl items-center justify-center overflow-hidden rounded-lg border border-gray-300 bg-gray-100 shadow-xl shadow-gray-800/10">
      <div className="flex flex-1 flex-col gap-8 px-10 py-10">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheckIcon width={38} height={38} className="text-gray-900" />
            <h1 className="text-4xl font-extrabold text-gray-900">SmartCar</h1>
          </div>
          <div className="">
            <p className="text-base text-gray-900">Bem-vindo ao SmartCar!</p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(handleForm)}
          className="flex flex-col gap-2"
        >
          <label htmlFor="cpf" className="text-sm text-gray-900">
            Nome
          </label>
          <input
            type="text"
            id="name"
            {...register('name', {
              required: true,
            })}
            name="name"
            placeholder="João da Silva"
            className="h-10 cursor-pointer rounded-md border border-gray-300 bg-gray-200 px-2 py-4 transition-all duration-100 ease-out hover:brightness-105 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-500 "
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
          <label htmlFor="cpf" className="text-sm text-gray-900">
            CPF
          </label>
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
            placeholder="000.000.000-00"
            className="h-10 cursor-pointer rounded-md border border-gray-300 bg-gray-200 px-2 py-4 transition-all duration-100 ease-out hover:brightness-105 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-500 "
          />
          {errors.cpf && (
            <p className="text-sm text-red-500">{errors.cpf.message}</p>
          )}
          <label htmlFor="cpf" className="text-sm text-gray-900">
            Senha
          </label>
          <input
            type="password"
            id="password"
            {...register('password', {
              required: true,
              minLength: 6,
            })}
            name="password"
            placeholder="Senha"
            className="h-10 cursor-pointer rounded-md border border-gray-300 bg-gray-200 px-2 py-4 transition-all duration-100 ease-out hover:brightness-105 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
          <label htmlFor="cpf" className="text-sm text-gray-900">
            Senha
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword', {
              required: true,
              minLength: 6,
              value: 'password',
            })}
            name="confirmPassword"
            placeholder="Confirme sua senha"
            className="h-10 cursor-pointer rounded-md border border-gray-300 bg-gray-200 px-2 py-4 transition-all duration-100 ease-out hover:brightness-105 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
          <button
            type="submit"
            className="mt-2 flex h-10 w-full items-center justify-center gap-4 rounded-md bg-gray-900 px-2 py-2 transition-all duration-200 ease-out hover:brightness-125 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isSubmitting}
          >
            {loading ? (
              <>
                <CircularProgress
                  size={18}
                  className="animate-spin text-gray-100"
                />
              </>
            ) : (
              <p className="text-base font-bold text-white">Criar Conta</p>
            )}
          </button>
          <Link
            href="/"
            className="mt-4 flex w-full items-center justify-center"
          >
            <p className="self-center text-sm text-gray-900">
              Tem conta?{' '}
              <span className="font-semibold">Faça login agora mesmo!</span>
            </p>
          </Link>
        </form>
      </div>

      <div className="hidden h-full w-80 items-center overflow-hidden md:flex">
        <Image
          src="https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt=""
          width={1280}
          height={1280}
          quality={100}
          className=" h-full min-h-[640px] w-full object-cover"
        />
      </div>
    </div>
  )
}
