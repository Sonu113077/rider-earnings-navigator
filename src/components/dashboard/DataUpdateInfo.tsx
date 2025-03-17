
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCcw, CheckCircle, AlertCircle } from "lucide-react";

const DataUpdateInfo = () => {
  const dataUpdates = [
    { 
      type: "Weekly Earnings", 
      status: "success", 
      lastUpdated: "Today, 9:30 AM", 
      nextUpdate: "Dec 15, 2023" 
    },
    { 
      type: "Route Assignment", 
      status: "success", 
      lastUpdated: "Yesterday, 2:15 PM", 
      nextUpdate: "Dec 12, 2023" 
    },
    { 
      type: "Mileage Tracking", 
      status: "warning", 
      lastUpdated: "Dec 5, 2023", 
      nextUpdate: "Dec 12, 2023" 
    },
    { 
      type: "Benefits Information", 
      status: "success", 
      lastUpdated: "Nov 30, 2023", 
      nextUpdate: "Dec 31, 2023" 
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">Data Update Status</CardTitle>
        <RefreshCcw className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Next Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataUpdates.map((item, index) => (
              <TableRow key={index} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium">{item.type}</TableCell>
                <TableCell>
                  {item.status === 'success' ? (
                    <Badge variant="outline" className="bg-green-100 text-green-800 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" /> Current
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> Pending
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{item.lastUpdated}</TableCell>
                <TableCell>{item.nextUpdate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DataUpdateInfo;
