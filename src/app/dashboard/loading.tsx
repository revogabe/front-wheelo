'use client'
export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-red-500">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900">
        <p className="text-2xl font-bold text-gray-900">Carregando...</p>
      </div>
    </div>
  )
}
