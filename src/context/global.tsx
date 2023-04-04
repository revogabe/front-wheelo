'use client'
import { FormResgisterProps } from '@/components/FormRegister'
import { TUser } from '@/types'
import { setCookie } from 'nookies'
import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useMemo, useState } from 'react'
import { FormLoginProps } from '@/components/FormLogin'
import { usePostLogin } from '@/querys/usePostLogin'
import { usePostRegister } from '@/querys/usePostRegister'

interface MyContextValue {
  state: string
  setState: React.Dispatch<React.SetStateAction<string>>
  handleForm: (data: FormResgisterProps) => void
  handleSubmitLogin: (data: FormLoginProps) => void
  isLoading: boolean
  isLoadingRegister: boolean

  isError: boolean
  isErrorRegister: boolean
  error: unknown
  errorRegister: unknown

  user: TUser | undefined
  setUser: React.Dispatch<React.SetStateAction<TUser | undefined>>
}

const MyContext = createContext<MyContextValue | undefined>(undefined)

function GlobalContextProvider(props: { children: React.ReactNode }) {
  const [state, setState] = useState<string>('')
  const [user, setUser] = useState<TUser | undefined>(undefined)
  const { mutate, isLoading, isError, error } = usePostLogin()
  const {
    mutate: mutateRegister,
    isLoading: isLoadingRegister,
    isError: isErrorRegister,
    error: errorRegister,
  } = usePostRegister()
  const router = useRouter()

  async function handleSubmitLogin(body: FormLoginProps) {
    const { cpf, password } = body

    mutate(
      { cpf, password },
      {
        onSuccess: (data) => {
          setCookie(undefined, 'token', data.token, {
            maxAge: 10800000, // 3 hours
            path: '/',
          })
          setUser({ name: data.name, cpf: data.cpf })
          router.push('/dashboard')
        },
        onError: (error) => {
          console.log(error)
        },
      },
    )
  }

  async function handleForm(body: FormResgisterProps) {
    const { cpf, password, name } = body

    mutateRegister(
      { cpf, password, name },
      {
        onSuccess: (data) => {
          setCookie(undefined, 'token', data.token, {
            maxAge: 10800000, // 3 hours
            path: '/',
          })
          setUser({ name: data.name, cpf: data.cpf })
          router.push('/dashboard')
        },
        onError: (error) => {
          console.log(error)
        },
      },
    )
  }

  const contextValue: MyContextValue = useMemo(
    () => ({
      state,
      setState,
      handleForm,
      handleSubmitLogin,
      user,
      setUser,
      isLoading,
      isLoadingRegister,
      isError,
      isErrorRegister,
      error,
      errorRegister,
    }),
    [
      state,
      user,
      isLoading,
      isLoadingRegister,
      isError,
      isErrorRegister,
      error,
      errorRegister,
    ],
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
