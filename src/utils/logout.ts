import { destroyCookie } from 'nookies'

export function handleLogout(callback: () => void) {
  destroyCookie(undefined, 'token', {
    path: '/',
  })

  callback()
}
