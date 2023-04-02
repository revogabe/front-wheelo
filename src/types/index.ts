export type TUser = {
  id?: string
  cpf: string
  name: string
  password?: string
}

export type TApiResponseRegister = {
  cpf: string
  name: string
  token: string
  message: string
}

export type TApiResponseLogin = {
  cpf: string
  id: string
  name: string
  password: string
  token: string
}

export type TCar = {
  id?: string
  brand?: string
  model?: string
  color?: string
  year?: number
  power?: string
  plate?: string
  renavam?: string
}
