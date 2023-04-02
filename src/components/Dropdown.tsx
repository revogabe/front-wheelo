'use client'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Cog8ToothIcon } from '@heroicons/react/24/outline'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useGlobalContext } from '@/context/global'
import { ExitIcon } from '@radix-ui/react-icons'

export function DropdownProfile() {
  const { user } = useGlobalContext()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="rounded-md gap-2 py-2 px-4 bg-gray-2 border border-gray-6 inline-flex items-center justify-center text-gray-12 hover:bg-gray-4 hover:border-gray-7 transition outline-none focus:outline focus:outline-orange-8"
          aria-label="Customise options"
        >
          <h1 className="text-md font-bold text-gray-12">{user?.name}</h1>
          <UserCircleIcon width={34} height={34} className="text-gray-12" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          className="min-w-[220px] w-max z-50 bg-gray-1 rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <DropdownMenu.Item className="group justify-between text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-2 py-4 relative  select-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-4 cursor-pointer">
            <p className="text-sm text-gray-12">Settings</p>
            <Cog8ToothIcon width={20} height={20} className="text-gray-12" />
          </DropdownMenu.Item>
          <DropdownMenu.Item className="group justify-between text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-2 py-4 relative  select-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-red-4 cursor-pointer ">
            <p className="text-sm text-gray-12 group-hover:text-red-10">
              Logout
            </p>
            <ExitIcon
              width={18}
              height={18}
              className="text-gray-12 group-hover:text-red-10"
            />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
