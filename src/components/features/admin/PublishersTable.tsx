import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from 'next/navigation';

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

  const handlePublisherClick = (publisherName: string) => {
    router.push(`/admin/publisher/${encodeURIComponent(publisherName)}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Publishers Data</CardTitle>
        <CardDescription>
          Detailed view of all publishers with filtering and sorting
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Rank</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Publisher</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Domain</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Articles</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Share</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {publishers.length > 0 ? (
                publishers.map((publisher) => (
                  <tr
                    key={publisher.name}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted cursor-pointer"
                    onClick={() => handlePublisherClick(publisher.name)}
                  >
                    <td className="p-4 align-middle">{publisher.rank}</td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full overflow-hidden bg-background border">
                          <img
                            src={`https://icon.horse/icon/${publisher.domain}`}
                            alt={publisher.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://www.google.com/s2/favicons?domain=' + publisher.domain;
                            }}
                          />
                        </div>
                        <span>{publisher.name}</span>
                      </div>
                    </td>
                    <td className="p-4 align-middle">{publisher.domain}</td>
                    <td className="p-4 align-middle">{publisher.count}</td>
                    <td className="p-4 align-middle">{publisher.percentage}%</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-muted-foreground">
                    No publisher data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
} 