'use client'
import { useAuthContext } from '@/context/auth'
import { WheelIcon } from './icons/traffic-icon'
import { DropdownProfile } from './Dropdown'
import Link from 'next/link'
import { DropdownProfileLoading } from './DropdownLoading'

export function Header() {
  const { userLoading } = useAuthContext()

  return userLoading ? (
    <div className="fixed w-full py-4 border-b border-gray-5 px-8 top-0 flex items-center justify-between z-50 bg-gray-1">
      <Link href="/dashboard">
        <div className="flex w-max gap-1 items-center justify-center">
          <WheelIcon
            width={30}
            height={30}
            className="text-gray-5 animate-pulse"
          />
          <h1 className="text-3xl font-bold text-gray-5 animate-pulse">
            Wheelo
          </h1>
        </div>
      </Link>
      <div className="flex w-max gap-1 items-center justify-center">
        <DropdownProfileLoading />
      </div>
    </div>
  ) : (
    <div className="fixed w-full py-4 border-b border-gray-5 px-8 top-0 flex items-center justify-between z-50 bg-gray-1">
      <Link href="/dashboard">
        <div className="flex w-max gap-1 items-center justify-center">
          <WheelIcon width={24} height={24} className="text-orange-10" />
          <h1 className="text-2xl font-bold text-gray-12">Wheelo</h1>
        </div>
      </Link>
      <div className="flex w-max gap-1 items-center justify-center">
        <DropdownProfile />
      </div>
    </div>
  )
}
