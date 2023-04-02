'use client'
import { useRouter } from 'next/navigation'
import { parseCookies } from 'nookies'
import React, { createContext, useContext, useMemo } from 'react'
import { useGlobalContext } from './global'
import { useGetUserQuery } from '@/querys/useGetUserQuery'

interface MyContextValue {
  token: string
  userLoading: boolean
}

// Crie um novo contexto
const MyContext = createContext<MyContextValue | undefined>(undefined)

// Crie um provider para envolver sua aplicação com o contexto
function AuthContextProvider(props: { children: React.ReactNode }) {
  const router = useRouter()
  const { setUser } = useGlobalContext()

  const tokenVerify = useMemo(() => {
    const { token } = parseCookies()

    return token
  }, [])

  const { data, isError, isFetching } = useGetUserQuery({})

  if (isError) {
    router.push('/')
  }

  if (data) {
    setUser(data)
  }

  const contextValues = useMemo(() => {
    return {
      token: tokenVerify,
      userLoading: isFetching,
    }
  }, [tokenVerify, isFetching])

  return (
    <MyContext.Provider value={contextValues}>
      {props.children}
    </MyContext.Provider>
  )
}

// Crie um hook para consumir o contexto
function useAuthContext() {
  const context = useContext(MyContext)

  // Verifique se o hook está sendo usado dentro do provedor
  if (!context) {
    throw new Error(
      'useAuthContext deve ser usado dentro de um AuthContextProvider',
    )
  }

  return context
}

export { AuthContextProvider, useAuthContext }
