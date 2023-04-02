import { SideBar } from '@/components/Sidebar'
import HeroContainer from './components/HeroContainer'
export default function Dashboard() {
  return (
    <main className="mx-auto gap-4 flex-col flex items-start w-full justify-start p-6 lg:px-0 lg:py-12 overflow-x-hidden mt-8 bg-gray-3 h-screen">
      <SideBar />
      <HeroContainer />
    </main>
  )
}
