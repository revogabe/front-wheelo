import {
  ChartBarIcon,
  FolderIcon,
  FunnelIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { ExitIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'

export function SideBarLoading() {
  return (
    <div
      className={`flex gap-2 h-full items-center justify-center fixed left-0 transition-all duration-300 ease-out z-40 animate-pulse`}
    >
      <div className="flex flex-col h-full bg-gray-1 xl:py-6 px-2 xl:px-4 xl:gap-8 border-r border-gray-6 gap-0 max-xl:py-4 ">
        <div className="flex items-center justify-center mb-4 xl:hidden ">
          <li className="flex items-center justify-between px-4 rounded-md w-full text-base hover:text-gray-12 hover:bg-gray-3 py-1.5  text-gray-9 transition duration-100 cursor-pointer gap-6 max-xl:w-max max-xl:py-4 group border boder-gray-8 ">
            <UserIcon width={18} height={18} />
          </li>
        </div>

        <div className="flex flex-col xl:gap-3">
          <div className="flex flex-col ">
            <div className="flex flex-col items-start justify-center ">
              <li className=" group flex items-center justify-between px-4 rounded-md w-full text-base hover:text-gray-12 hover:bg-gray-3 py-1.5  text-gray-9 transition duration-100 cursor-pointer gap-6 max-xl:w-max max-xl:py-4">
                <p className="max-xl:hidden text-gray-9 group-hover:text-gray-12">
                  Dashboard
                </p>
                <ChartBarIcon width={18} height={18} />
              </li>
              <li className="group flex items-center justify-between px-4 rounded-md w-full text-base hover:text-gray-12 hover:bg-gray-3 py-1.5  text-gray-9 transition duration-100 cursor-pointer gap-6 max-xl:w-max max-xl:py-4">
                <p className="max-xl:hidden text-gray-9 group-hover:text-gray-12">
                  Meus Veiculos
                </p>

                <FolderIcon width={18} height={18} />
              </li>
              <li className="group flex items-center justify-between px-4 rounded-md w-full text-base hover:text-gray-12 hover:bg-gray-3 py-1.5  text-gray-9 transition duration-100 cursor-pointer gap-6 max-xl:w-max max-xl:py-4">
                <p className="max-xl:hidden text-gray-9 group-hover:text-gray-12">
                  Abastecimento
                </p>

                <FunnelIcon width={18} height={18} />
              </li>
              <li className="flex items-center justify-between px-4 rounded-md w-full text-base hover:text-gray-12 hover:bg-gray-3 py-1.5  text-gray-9 transition duration-100 cursor-pointer gap-6 max-xl:w-max max-xl:py-4 group">
                <p className="max-xl:hidden text-gray-9 group-hover:text-gray-12">
                  Editar Carros
                </p>
                <Pencil1Icon width={18} height={18} />
              </li>
            </div>
          </div>
          <div className="w-full bg-gray-6 h-px " />
          <div className="flex flex-col gap-3 ">
            <div className="flex flex-col items-start justify-center ">
              <li className="flex items-center justify-between px-4 rounded-md w-full text-base hover:text-gray-12 hover:bg-gray-3 py-1.5  text-gray-9 transition duration-100 cursor-pointer gap-6 max-xl:w-max max-xl:py-4 group">
                <p className="max-xl:hidden text-gray-9 group-hover:text-gray-12">
                  Editar Perfil
                </p>
                <UserIcon width={18} height={18} />
              </li>
              <button className="flex items-center justify-between px-4 rounded-md w-full text-base hover:text-red-9 hover:bg-red-4 py-1.5  text-gray-9 transition duration-100 cursor-pointer gap-6 max-xl:w-max max-xl:py-4 group">
                <p className="max-xl:hidden text-gray-9 group-hover:text-red-10">
                  Sair da Conta
                </p>

                <ExitIcon width={18} height={18} />
              </button>
            </div>
          </div>
          <div className="w-full bg-gray-6 h-px " />
          <div className="flex flex-col gap-3 ">
            <div className="flex flex-col items-start justify-center ">
              <li className="flex items-center justify-between px-4 rounded-md w-full text-base hover:text-red-9 hover:bg-red-4 py-1.5  text-gray-9 transition duration-100 cursor-pointer gap-6 max-xl:w-max max-xl:py-4 group">
                <p className="max-xl:hidden text-gray-9 group-hover:text-red-10">
                  Excluir Conta
                </p>

                <TrashIcon width={20} height={20} />
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
