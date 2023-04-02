'use client'
import {
  ChartBarIcon,
  FolderIcon,
  FunnelIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import {
  ExitIcon,
  HamburgerMenuIcon,
  Pencil1Icon,
  TrashIcon,
} from '@radix-ui/react-icons'
import { useState } from 'react'

export function SideBar() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div
      className={`${
        !isOpen ? '-translate-x-3/4 ease-out' : ''
      } flex gap-2  h-screen items-end fixed left-0 transition-all duration-300 ease-out`}
    >
      <div className="flex flex-col h-screen bg-gray-1 py-6 px-2 pl-5 gap-6 border-r border-gray-6 ">
        <div className="flex flex-col gap-3 ">
          <div className="flex flex-col items-start justify-center pb-2">
            <h1 className="text-xl font-bold text-gray-12">Dashboard</h1>
            <p className="text-sm text-gray-11">Bem vindo ao Wheelo</p>
          </div>
          <div className="flex flex-col items-start justify-center ">
            <li className="flex items-center justify-between px-4 rounded-md w-full text-base hover:text-gray-12 hover:bg-gray-3 py-1.5  text-gray-9 transition duration-100 cursor-pointer gap-6">
              Dashboard
              <ChartBarIcon width={18} height={18} />
            </li>
            <li className="flex items-center justify-between px-4 rounded-md w-full text-base hover:text-gray-12 hover:bg-gray-3 py-1.5  text-gray-9 transition duration-100 cursor-pointer gap-6">
              Meus Veiculos
              <FolderIcon width={18} height={18} />
            </li>
            <li className="flex items-center justify-between px-4 rounded-md w-full text-base hover:text-gray-12 hover:bg-gray-3 py-1.5  text-gray-9 transition duration-100 cursor-pointer gap-6">
              Abastecimento
              <FunnelIcon width={18} height={18} />
            </li>
            <li className="flex items-center justify-between px-4 rounded-md w-full text-base hover:text-gray-12 hover:bg-gray-3 py-1.5  text-gray-9 transition duration-100 cursor-pointer gap-6">
              Editar Carros
              <Pencil1Icon width={18} height={18} />
            </li>
          </div>
        </div>
        <div className="flex flex-col gap-3 ">
          <div className="flex flex-col items-start justify-center pb-2">
            <h1 className="text-xl font-bold text-gray-12">Edição</h1>
          </div>
          <div className="flex flex-col items-start justify-center ">
            <li className="flex items-center justify-between px-4 rounded-md w-full text-base hover:text-gray-12 hover:bg-gray-3 py-1.5  text-gray-9 transition duration-100 cursor-pointer gap-6">
              Editar Perfil
              <UserIcon width={18} height={18} />
            </li>
            <li className="flex items-center justify-between px-4 rounded-md w-full text-base hover:text-red-9 hover:bg-red-4 py-1.5  text-gray-9 transition duration-100 cursor-pointer gap-6">
              Sair da Conta
              <ExitIcon width={18} height={18} />
            </li>
          </div>
        </div>
        <div className="flex flex-col gap-3 ">
          <div className="flex flex-col items-start justify-center pb-2">
            <h1 className="text-xl font-bold text-gray-12">Exclusão</h1>
          </div>
          <div className="flex flex-col items-start justify-center ">
            <li className="flex items-center justify-between px-4 rounded-md w-full text-base hover:text-red-9 hover:bg-red-4 py-1.5  text-gray-9 transition duration-100 cursor-pointer gap-6">
              Excluir Conta
              <TrashIcon width={20} height={20} />
            </li>
          </div>
        </div>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-1 mb-[90px] ml-1 p-3 rounded border border-gray-5 hover:bg-gray-6 transition duration-200 hover:border-gray-8"
      >
        <HamburgerMenuIcon width={20} height={20} />
      </button>
    </div>
  )
}
