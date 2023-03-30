import { requester } from './requester'

type SignInRequestData = {
  cpf: string
  password: string
}

export async function signInRequest(data: SignInRequestData) {
  const { data } = await requester({})
}

export async function recoverUserInformation() {
  return {
    user: {
      name: 'Diego Fernandes',
      email: 'diego@rocketseat.com.br',
      avatar_url: 'https://github.com/diego3g.png',
    },
  }
}
