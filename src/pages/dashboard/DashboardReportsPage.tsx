
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download, Calendar, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DashboardReportsPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("available");
  
  const availableReports = [
    { id: 1, name: "Weekly Earnings Summary", period: "Dec 1-7, 2023", format: "PDF", size: "320 KB" },
    { id: 2, name: "Monthly Performance Report", period: "November 2023", format: "XLSX", size: "1.2 MB" },
    { id: 3, name: "Route Efficiency Analysis", period: "Q4 2023", format: "PDF", size: "850 KB" },
    { id: 4, name: "Tax Information", period: "2023 YTD", format: "PDF", size: "1.5 MB" },
    { id: 5, name: "Vehicle Maintenance Log", period: "2023", format: "XLSX", size: "780 KB" },
  ];
  
  const reportOptions = [
    { id: "earnings", name: "Earnings Report", description: "Generate reports of your earnings by period" },
    { id: "routes", name: "Route Reports", description: "View your route history and statistics" },
    { id: "tax", name: "Tax Documents", description: "Access tax-related documentation" },
    { id: "performance", name: "Performance Metrics", description: "See your performance analytics and trends" },
  ];

  const handleDownload = (reportId: number, reportName: string) => {
    // In a real app, this would initiate a file download
    toast({
      title: "Download Started",
      description: `${reportName} will download shortly.`,
    });
  };

  const handleGenerateReport = (reportType: string) => {
    toast({
      title: "Generating Report",
      description: "Your report is being generated and will be available soon.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">Access and download your reports</p>
      </div>

      <Tabs defaultValue="available" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="available">Available Reports</TabsTrigger>
          <TabsTrigger value="options">Report Options</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Available Reports</CardTitle>
              <CardDescription>
                Download your available reports or request new ones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <Button variant="outline" size="sm" className="gap-1">
                  <Calendar className="h-4 w-4" /> Date Range
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" /> Filter Reports
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {availableReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {report.name}
                      </TableCell>
                      <TableCell>{report.period}</TableCell>
                      <TableCell>{report.format}</TableCell>
                      <TableCell>{report.size}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="gap-1"
                          onClick={() => handleDownload(report.id, report.name)}
                        >
                          <Download className="h-4 w-4" /> Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="options" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Report Options</CardTitle>
              <CardDescription>
                Generate new reports for your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportOptions.map((option) => (
                  <Card key={option.id} className="border border-muted">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{option.name}</CardTitle>
                      <CardDescription>{option.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-2">
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleGenerateReport(option.id)}
                      >
                        Generate Report
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardReportsPage;
