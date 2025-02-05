import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, RowClickedEvent, ClientSideRowModelModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface PublisherStat {
  name: string;
  count: number;
  domain: string;
  rank: number;
  percentage: number;
}

interface PublishersTableProps {
  publishers: PublisherStat[];
}

export function PublishersTable({ publishers }: PublishersTableProps) {
  const router = useRouter();

  const handlePublisherClick = (event: RowClickedEvent<PublisherStat>) => {
    if (event.data) {
      router.push(`/admin/publisher/${encodeURIComponent(event.data.name)}`);
    }
  };

  const columnDefs = useMemo<ColDef<PublisherStat>[]>(() => [
    { 
      field: 'rank', 
      headerName: 'Rank',
      sortable: true,
      width: 100 
    },
    {
      field: 'name',
      headerName: 'Publisher',
      sortable: true,
      flex: 1,
      cellRenderer: (params: { data: PublisherStat; value: string }) => {
        return (
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full overflow-hidden bg-background border">
              <img
                src={`https://icon.horse/icon/${params.data.domain}`}
                alt={params.data.name}
                className="w-full h-full object-cover"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.src = 'https://www.google.com/s2/favicons?domain=' + params.data.domain;
                }}
              />
            </div>
            <span>{params.value}</span>
          </div>
        );
      }
    },
    { 
      field: 'domain', 
      headerName: 'Domain',
      sortable: true,
      flex: 1 
    },
    { 
      field: 'count', 
      headerName: 'Articles',
      sortable: true,
      width: 120 
    },
    { 
      field: 'percentage', 
      headerName: 'Share',
      sortable: true,
      width: 120,
      valueFormatter: (params: { value: number }) => `${params.value}%`
    }
  ], []);

  const defaultColDef = useMemo<ColDef<PublisherStat>>(() => ({
    resizable: true,
  }), []);

  console.log("publishers :: ", publishers);  
  console.log("columnDefs :: ", columnDefs);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Publishers Data</CardTitle>
        <CardDescription>
          Detailed view of all publishers with filtering and sorting
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="ag-theme-alpine dark:ag-theme-alpine-dark w-full h-[500px]">
          <AgGridReact<PublisherStat>
            rowData={publishers}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onRowClicked={handlePublisherClick}
            animateRows={true}
            rowSelection="single"
            suppressCellFocus={true}
            domLayout="autoHeight"
            modules={[ClientSideRowModelModule]}
          />
        </div>
      </CardContent>
    </Card>
  );
} 