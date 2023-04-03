import { DataGridFuel } from '@/components/DatagridFuel'

export type CarIdProps = {
  carId: string
}

export default function HeroContainerFuel({ carId }: CarIdProps) {
  return (
    <div className="xl:pl-[264px] pl-24 transition-all py-8 px-8 w-full flex justify-end">
      <DataGridFuel carId={carId} />
    </div>
  )
}
