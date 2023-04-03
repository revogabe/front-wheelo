'use client'

import { SideBarLoading } from '@/components/Sidebar/side-bar-loading'
import HeroContainerLoading from './components/HeroContainerLoading'

export default function Loading() {
  return (
    <main className="mx-auto gap-4 flex-col flex items-start w-full justify-start md:py-12 overflow-x-hidden md:mt-8 bg-gray-3 h-screen">
      <SideBarLoading />
      <HeroContainerLoading />
    </main>
  )
}
