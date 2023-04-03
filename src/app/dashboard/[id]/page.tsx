import { SideBar } from '@/components/Sidebar'
import HeroContainerFuel from '../components/HeroContainerFuel'

interface ParamsProps {
  params: {
    id: string
  }
}

export default function CarFuel({ params }: ParamsProps) {
  return (
    <main className="mx-auto gap-4 flex-col flex items-start w-full justify-start md:py-12 overflow-x-hidden md:mt-8 bg-gray-3 h-screen">
      <SideBar />
      <HeroContainerFuel carId={params.id} />
    </main>
  )
}
