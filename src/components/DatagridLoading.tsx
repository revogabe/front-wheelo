import Box from '@mui/material/Box'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import ModalAdd from './ModalAdd'
import Link from 'next/link'

export function DataGridCars() {
  const columns: GridColDef[] = [
    {
      field: 'brand',
      headerName: 'Marca',
      width: 110,
      editable: false,
    },
    {
      field: 'model',
      headerName: 'Modelo',
      width: 110,
      editable: false,
    },
    {
      field: 'color',
      headerName: 'Cor',
      width: 110,
      editable: false,
    },
    {
      field: 'plate',
      headerName: 'Placa',
      width: 110,
      editable: false,
    },
    {
      field: 'renavam',
      headerName: 'Renavam',
      width: 110,
      editable: false,
    },
    {
      field: 'year',
      headerName: 'Ano',
      type: 'number',
      width: 110,
      editable: false,
    },
    {
      field: 'power',
      headerName: 'Potência',
      width: 110,
      editable: false,
    },
    {
      field: 'actions',
      headerName: 'Ação',
      width: 240,
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-start gap-2">
            <Link
              href={`/dashboard/${params.row.id}`}
              className="bg-gray-3 border border-gray-8 py-2 px-4 text-gray-11 rounded hover:bg-gray-6 hover:border-gray-10 cursor-pointer hover:text-gray-12 transition-all"
            >
              Abastecer
            </Link>
            <button className="bg-gray-3 border border-gray-8 py-2 px-4 text-gray-11 rounded hover:bg-gray-6 hover:border-gray-10 cursor-pointer hover:text-gray-11 transition-all">
              Deletar
            </button>
          </div>
        )
      },
    },
  ]

  const rows = [] as any

  return (
    <Box className="w-full h-96 border rounded-md overflow-hidden bg-gray-1 border-gray-6 flex flex-col animate-pulse">
      <div className="flex items-center justify-between gap-4 w-full py-4 px-6 border-b border-gray-6 flex-col lg:flex-row max-lg:items-stretch">
        <div>
          <h1 className="text-xl font-bold text-gray-12">Seus carros</h1>
          <p className="text-gray-11 text-sm">
            Aqui você pode ver todos os seus carros cadastrados
          </p>
        </div>
        <div className="flex items-center justify-end gap-4">
          <ModalAdd />
          <button className="bg-gray-11 hover:bg-gray-6 transition border-transparent border hover:border-gray-8 text-gray-1 hover:text-gray-11 py-3 px-5 rounded">
            Delete
          </button>
        </div>
      </div>
      <DataGrid
        className="h-max border-transparent"
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 3,
            },
          },
        }}
        pageSizeOptions={[3]}
        disableRowSelectionOnClick
      />
    </Box>
  )
}
