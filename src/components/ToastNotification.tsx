import { CheckCircleIcon } from '@heroicons/react/24/solid'

type Props = {
  title: string
  description: string
  className: string
}

export function ToastNotification({
  title,
  description,
  className,
  ...props
}: Props) {
  return (
    <div
      {...props}
      className={`fixed bottom-0 right-0 m-6 bg-zinc-200/25 border  border-zinc-200 shadow-lg flex items-center justify-center gap-4 shadow-gray-800/10 py-4 px-6 min rounded-lg max-w-xs ${className}`}
    >
      <div>
        <CheckCircleIcon className="text-emerald-700" width={32} height={32} />
      </div>
      <div className="flex flex-col items-start justify-center gap-1">
        <h1 className="text-md font-bold leading-5">{title}</h1>
        <p className="text-xs">{description}</p>
      </div>
    </div>
  )
}
