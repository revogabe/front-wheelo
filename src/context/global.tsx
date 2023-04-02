'use client'
import { FormResgisterProps } from '@/components/FormRegister'
import { api } from '@/lib/axios'
import { TApiResponseLogin, TApiResponseRegister, TUser } from '@/types'
import { setCookie } from 'nookies'
import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useMemo, useState } from 'react'
import { FormLoginProps } from '@/components/FormLogin'

interface MyContextValue {
  state: string
  setState: React.Dispatch<React.SetStateAction<string>>
  handleForm: (data: FormResgisterProps) => void
  handleSubmitLogin: (data: FormLoginProps) => void

  user: TUser | undefined
  setUser: React.Dispatch<React.SetStateAction<TUser | undefined>>
}

const MyContext = createContext<MyContextValue | undefined>(undefined)

function GlobalContextProvider(props: { children: React.ReactNode }) {
  const [state, setState] = useState<string>('')
  const [user, setUser] = useState<TUser | undefined>(undefined)

  const router = useRouter()

  async function handleSubmitLogin(body: FormLoginProps) {
    const { cpf, password } = body

    const { data } = await api.post<TApiResponseLogin>('/login', {
      cpf,
      password,
    })

    setCookie(undefined, 'token', data.token, {
      maxAge: 10800000, // 3 hours
      path: '/',
    })

    setUser({ name: data.name, cpf: data.cpf })

    router.push('/dashboard')
  }

  async function handleForm(body: FormResgisterProps) {
    const { cpf, password, name } = body

    const { data } = await api.post<TApiResponseRegister>('/register', {
      cpf,
      password,
      name,
    })

    setCookie(undefined, 'token', data.token, {
      maxAge: 10800000, // 3 hours
      path: '/',
    })

    setUser({ name: data?.name, cpf: data?.cpf })

    router.push('/dashboard')
  }

  const contextValue: MyContextValue = useMemo(
    () => ({
      state,
      setState,
      handleForm,
      handleSubmitLogin,
      user,
      setUser,
    }),
    [state, user],
  )

  return (
    <MyContext.Provider value={contextValue}>
      {props.children}
    </MyContext.Provider>
  )
}

function useGlobalContext() {
  const context = useContext(MyContext)

  if (!context) {
    throw new Error(
      'useGlobalContext deve ser usado dentro de um GlobalContextProvider',
    )
  }

  return context
}

export { GlobalContextProvider, useGlobalContext }
