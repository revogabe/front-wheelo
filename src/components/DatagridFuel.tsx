'use client'
import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { parseCookies } from 'nookies'
import { api } from '@/lib/axios'
import { CarIdProps } from '@/app/dashboard/components/HeroContainerFuel'
import ModalAddFuel from './ModalAddFuel'
import ModalEditFuel from './ModalEditFuel'

export function DataGridFuel({ carId }: CarIdProps) {
  const { token } = parseCookies()
  const queryClient = useQueryClient()
  const [ids, setIds] = React.useState<string[]>([])

  const { data, isFetching } = useQuery({
    queryKey: ['supplyList'],
    queryFn: async () => {
      const { data } = await api.get(`/supply/list/${carId}`, {
        headers: {
          authorization: `${token}`,
        },
      })

      return data
    },
  })

  const deleteSupplyUnique = useMutation({
    mutationFn: (id: string) => {
      return api.delete(`/supply/delete/${carId}`, {
        data: {
          id,
        },
        headers: { authorization: `${token}` },
      })
    },
  })

  const deleteSupply = useMutation({
    mutationFn: (ids: string[]) => {
      return api.delete(`/supply/delete/${carId}`, {
        data: {
          id: ids,
        },
        headers: { authorization: `${token}` },
      })
    },
  })

  const columns: GridColDef[] = [
    {
      field: 'typeFuel',
      headerName: 'Tipo de Combustível',
      width: 110,
      editable: false,
    },
    {
      field: 'quantity',
      headerName: 'Quantidade (L)',
      width: 110,
      editable: false,
      type: 'number',
    },
    {
      field: 'price',
      headerName: 'Preço (R$)',
      width: 110,
      editable: false,
      type: 'number',
    },
    {
      field: 'actions',
      headerName: 'Ação',
      width: 240,
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-start gap-2">
            <ModalEditFuel
              id={params.row.id}
              typeFuel={params.row.typeFuel}
              quantity={params.row.quantity}
              price={params.row.price}
              carId={carId}
            />
            <button
              onClick={() => {
                deleteSupplyUnique.mutate(params.row.id, {
                  onSuccess: async () => {
                    await queryClient.refetchQueries({
                      queryKey: ['supplyList'],
                    })
                  },
                })
              }}
              className="bg-red-3 border border-red-8 py-2 px-4 text-red-11 rounded hover:bg-red-6 hover:border-red-10 cursor-pointer hover:text-red-11 transition-all"
            >
              Deletar
            </button>
          </div>
        )
      },
    },
  ]

  function handleDeleteCar() {
    deleteSupply.mutate(ids, {
      onSuccess: async () => {
        await queryClient.refetchQueries({ queryKey: ['supplyList'] })
      },
    })
  }

  return isFetching ? (
    <Box className="w-full h-96 bg-gray-1 animate-pulse border border-gray-6 rounded-lg" />
  ) : (
    <Box className="w-full h-96 border rounded-md overflow-hidden bg-gray-1 border-gray-6 flex flex-col">
      <div className="flex items-center justify-between gap-4 w-full py-4 px-6 border-b border-gray-6 flex-col lg:flex-row max-lg:items-stretch">
        <div>
          <h1 className="text-xl font-bold text-gray-12">
            Lista de abastecimentos
          </h1>
          <p className="text-gray-11 text-sm">
            {data?.length} abastecimentos cadastrados
          </p>
        </div>
        <div className="flex items-center justify-end gap-4">
          <ModalAddFuel carId={carId} />
          <button
            className="bg-red-11 hover:bg-red-6 transition border-transparent border hover:border-red-8 text-gray-1 hover:text-red-11 py-3 px-5 rounded"
            onClick={handleDeleteCar}
          >
            Delete
          </button>
        </div>
      </div>
      <DataGrid
        className="h-max border-transparent"
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 3,
            },
          },
        }}
        pageSizeOptions={[3]}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(data) => {
          setIds(data as string[])
        }}
      />
    </Box>
  )
}
