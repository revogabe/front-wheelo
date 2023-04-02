import { FormLogin } from '@/components/FormLogin'
import Image from 'next/image'

export default function Login() {
  return (
    <main className="mx-auto flex flex-col-reverse md:flex-row gap-16 h-screen w-full items-center justify-between p-8 btn ">
      <FormLogin />
      <div className="w-full h-full rounded-2xl overflow-hidden  max-md:h-48  ">
        <Image
          src="https://images.unsplash.com/photo-1516259670444-ad07068e14e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=100"
          alt=""
          className="object-cover w-full h-full"
          width={1500}
          height={1500}
          quality={100}
        />
      </div>
    </main>
  )
}
