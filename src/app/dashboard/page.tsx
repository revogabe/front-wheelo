import { SideBar } from '@/components/Sidebar'
import HeroContainer from './components/HeroContainer'
export default function Dashboard() {
  return (
    <main className="mx-auto gap-4 flex-col flex items-start w-full justify-start md:py-12 overflow-x-hidden md:mt-8 bg-gray-3 h-screen">
      <SideBar />
      <HeroContainer />
    </main>
  )
}
