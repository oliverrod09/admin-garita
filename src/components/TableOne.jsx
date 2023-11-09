import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

function TableOne({ data, columns }) {
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
    <div>
      <div className="mx-auto w-10/12">
        <input
          type="text"
          value={filtering}
          placeholder="Buscar"
          onChange={(e) => setFiltering(e.target.value)}
          className="w-full my-2 rounded-lg py-2 text-center "
        />
      </div>

      <table className="bg-white">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
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
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((footer) => (
                <th key={footer.id}>
                  {flexRender(
                    footer.column.columnDef.footer,
                    footer.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="flex gap-3 pt-4 w-full justify-center">
        <button
          className="bg-blue-700 border-2 border-white px-4 py-2 rounded-lg"
          onClick={() => table.setPageIndex(0)}
        >
          Primer Pagina
        </button>
        <button
          className="bg-blue-700 border-2 border-white px-4 py-2 rounded-lg"
          onClick={() => table.previousPage()}
        >
          Pagina Anterior
        </button>
        <button
          className="bg-blue-700 border-2 border-white px-4 py-2 rounded-lg"
          onClick={() => table.nextPage()}
        >
          Pagina Siguiente
        </button>
        <button
          className="bg-blue-700 border-2 border-white px-4 py-2 rounded-lg"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Ultima Pagina
        </button>
      </div>
    </div>
  );
}

export default TableOne;
