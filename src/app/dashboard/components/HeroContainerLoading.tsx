// import { ListCars } from '@/components/ListCars'
import { DataGridCars } from '@/components/DatagridCars'

export default function HeroContainerLoading() {
  return (
    <div className="xl:pl-[264px] pl-24 transition-all py-8 px-8 w-full flex justify-end">
      <DataGridCars />
    </div>
  )
}
