import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";

function TableOne({ data, columns, linkDet }) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="mx-auto w-10/12">
      <div className="flex items-center justify-between my-4">
        <input
          type="text"
          value={filtering}
          placeholder="Buscar"
          onChange={(e) => setFiltering(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="overflow-x-scroll">
        <table className="min-w-full bg-white border text-xs md:text-base border-gray-300">
          <thead className="bg-blue-500 text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="p-2 cursor-pointer"
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {
                          { asc: "⬆️", desc: "⬇️" }[
                            header.column.getIsSorted() ?? null
                          ]
                        }
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <Link
                key={row.id}
                to={`${linkDet}${row.original.id}`}
                className="  contents cursor-pointer"
              >
                <tr className="hover:bg-cyan-200">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2 border border-gray-300">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              </Link>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-3 text-xs md:text-base justify-center mt-4">
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded-lg"
          onClick={() => table.setPageIndex(0)}
        >
          Primer Página
        </button>
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded-lg"
          onClick={() => table.previousPage()}
        >
          Página Anterior
        </button>
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded-lg"
          onClick={() => table.nextPage()}
        >
          Página Siguiente
        </button>
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded-lg"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Última Página
        </button>
      </div>
    </div>
  );
}

export default TableOne;
