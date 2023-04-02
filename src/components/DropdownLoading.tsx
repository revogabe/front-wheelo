import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export function DropdownProfileLoading() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div
          className=" rounded-md gap-2 min-w-[200px] py-6 px-6 bg-gray-4 border border-gray-6 inline-flex items-center justify-center text-gray-12 hover:bg-gray-4 hover:border-gray-7 transitio outline-none focus:outline focus:outline-orange-8 animate-pulse "
          aria-label="Customise options"
        />
      </DropdownMenu.Trigger>
    </DropdownMenu.Root>
  )
}
