import React from "react";

// Mendefinisikan struktur untuk konfigurasi kolom
export type ColumnDef<T> = {
  header: string;
  accessorKey: keyof T;
  cell?: (row: T) => React.ReactNode;
};

type GenericTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
};

const GenericTable = <T extends { id: string | number }>({
  data,
  columns,
}: GenericTableProps<T>) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-900"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td
                  key={`${row.id}-${String(column.accessorKey)}`}
                  className="whitespace-nowrap px-4 py-3 text-gray-700"
                >
                  {column.cell
                    ? column.cell(row)
                    : (row[column.accessorKey] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
