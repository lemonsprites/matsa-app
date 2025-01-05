import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import React, { useEffect, useState, useMemo, useRef } from 'react';

type PaginationTableProps<T> = {
  fetchData: (page: number, rowsPerPage: number) => Promise<{ data: T[]; total: number }>;
  columns: { title: string; render: (row:any) => React.ReactNode }[]; 
  rowsPerPage: number;
};

function PaginationTable<T>({ fetchData, columns, rowsPerPage }: PaginationTableProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create a ref to track whether data has changed to prevent unnecessary fetch
  const isDataChanged = useRef<boolean>(false);

  // Memoize columns to prevent unnecessary re-renders
  const memoizedColumns = useMemo(() => columns, [columns]);

  // Memoize the data to prevent re-fetching when only unrelated states change
  const memoizedData = useMemo(() => data, [data]);

  // Fetch data only if data has changed or page has changed
  const getData = async () => {
    if (isDataChanged.current) return; // Skip if data is not changed

    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const { data, total } = await fetchData(page, rowsPerPage);
      setData(data);
      setTotalPages(Math.ceil(total / rowsPerPage));
      isDataChanged.current = true; // Mark that data has been fetched
    } catch (err) {
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Automatically re-fetch data whenever `page` changes or data is marked as not fetched
  useEffect(() => {
    isDataChanged.current = false; // Mark as not fetched when page changes
    getData();
  }, [page]); // Only fetch when page changes

  return (
    <div className="p-6 space-y-6">
      <Table>
        <TableHeader>
          <TableRow key="header-row">
            {memoizedColumns.map((col, idx) => (
              <TableCell key={`header-cell-${idx}`}>{col.title}</TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow key="loading-row">
              <TableCell colSpan={memoizedColumns.length} className="text-center" key="loading-cell">
                <div className="flex justify-center">Loading...</div>
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow key="error-row">
              <TableCell colSpan={memoizedColumns.length} className="text-center text-red-500" key="error-cell">
                {error}
              </TableCell>
            </TableRow>
          ) : memoizedData.length === 0 ? (
            <TableRow key="no-data-row">
              <TableCell colSpan={memoizedColumns.length} className="text-center" key="no-data-cell">
                No data available.
              </TableCell>
            </TableRow>
          ) : (
            memoizedData.map((row: any) => (
              <TableRow key={row.id || row.uniqueKey}> {/* Ensure unique key for each row */}
                {memoizedColumns.map((col, colIdx) => (
                  <TableCell key={`cell-${colIdx}`}>{col.render(row)}</TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex justify-between mt-4">
        <Button
          variant="outline"
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          aria-label="Previous Page"
        >
          Prev
        </Button>
        <div className="flex items-center space-x-2">
          <span>
            Page {page} of {totalPages}
          </span>
        </div>
        <Button
          variant="outline"
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next Page"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default React.memo(PaginationTable); // Memoize the PaginationTable to avoid unnecessary re-renders
