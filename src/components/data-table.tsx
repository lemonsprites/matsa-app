// src/components/ui/DataTable.tsx

export const DataTable = ({ data, columns, loading }: any) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {columns.map((col: any) => (
              <th key={col.key} className="border border-gray-300 px-4 py-2 text-left">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((row: any) => (
              <tr key={row.id}>
                {columns.map((col: any) => (
                  <td key={col.key} className="border border-gray-300 px-4 py-2">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center p-4">
                Tidak ada data.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
