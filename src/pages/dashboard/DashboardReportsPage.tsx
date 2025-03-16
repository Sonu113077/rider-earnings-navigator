
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Calendar, Download, Filter, RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

// Mock data
const MOCK_EARNINGS = [
  { week: 'Week 1', amount: 427 },
  { week: 'Week 2', amount: 492 },
  { week: 'Week 3', amount: 435 },
  { week: 'Week 4', amount: 510 },
  { week: 'Week 5', amount: 468 },
  { week: 'Week 6', amount: 521 },
];

const MOCK_REPORTS = [
  { id: 1, name: 'Monthly Earnings #1', type: 'Earnings', period: 'Oct 2023', generated: 'Nov 1, 2023', fileName: 'earnings-oct-2023.pdf' },
  { id: 2, name: 'Monthly Earnings #2', type: 'Earnings', period: 'Nov 2023', generated: 'Dec 1, 2023', fileName: 'earnings-nov-2023.pdf' },
  { id: 3, name: 'Monthly Earnings #3', type: 'Earnings', period: 'Dec 2023', generated: 'Jan 1, 2024', fileName: 'earnings-dec-2023.pdf' },
  { id: 4, name: 'Activity Report #1', type: 'Activity', period: 'Q4 2023', generated: 'Jan 5, 2024', fileName: 'activity-q4-2023.pdf' },
  { id: 5, name: 'Attendance Report #1', type: 'Attendance', period: 'Year 2023', generated: 'Jan 10, 2024', fileName: 'attendance-2023.pdf' },
];

const DashboardReportsPage = () => {
  const { toast } = useToast();
  const [period, setPeriod] = useState('month');
  const [reportType, setReportType] = useState('earnings');
  const [isGenerating, setIsGenerating] = useState(false);
  const [reports, setReports] = useState(MOCK_REPORTS);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleDownloadReport = () => {
    setIsGenerating(true);
    toast({
      title: "Generating report",
      description: "Your report is being generated and will download shortly.",
    });
    
    // Simulate report generation delay
    setTimeout(() => {
      setIsGenerating(false);
      
      // Create a new report
      const newReport = {
        id: reports.length + 1,
        name: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report #${reports.filter(r => r.type.toLowerCase() === reportType).length + 1}`,
        type: reportType.charAt(0).toUpperCase() + reportType.slice(1),
        period: period === 'custom' ? `${startDate} to ${endDate}` : period.charAt(0).toUpperCase() + period.slice(1),
        generated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        fileName: `${reportType}-${period}-${new Date().getTime()}.pdf`
      };
      
      setReports([newReport, ...reports]);
      
      toast({
        title: "Report generated",
        description: "Your report has been generated and is ready to download.",
      });
    }, 2000);
  };

  const handleDownloadExistingReport = (report) => {
    toast({
      title: "Downloading report",
      description: `Downloading ${report.name}...`,
    });
    
    // Create a dummy file for download demonstration
    setTimeout(() => {
      // Create a blob that represents a PDF-like file (though it's not a real PDF)
      const blob = new Blob(['This is a dummy report file content'], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = report.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download complete",
        description: `${report.name} has been downloaded.`,
      });
    }, 500);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BarChart3 className="h-7 w-7" /> 
          Reports
        </h1>
        <p className="mt-2 text-muted-foreground">
          View and download your earnings reports
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Card className="w-full md:w-[300px]">
          <CardHeader>
            <CardTitle>Report Options</CardTitle>
            <CardDescription>Customize your report view</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Report Type</label>
              <select 
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md"
              >
                <option value="earnings">Earnings Report</option>
                <option value="activity">Activity Report</option>
                <option value="attendance">Attendance Report</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Time Period</label>
              <select 
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            
            {period === 'custom' && (
              <div className="grid gap-2">
                <div>
                  <label className="text-sm font-medium mb-1 block">Start Date</label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 border border-input rounded-md"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">End Date</label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 border border-input rounded-md"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            )}
            
            <Button 
              className="w-full" 
              onClick={handleDownloadReport}
              disabled={isGenerating || (period === 'custom' && (!startDate || !endDate))}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> 
                  Generating...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" /> 
                  Generate Report
                </>
              )}
            </Button>
          </CardContent>
        </Card>
        
        <div className="flex-1 grid gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-xl">Earnings Overview</CardTitle>
                <CardDescription>Your earnings for the past 6 weeks</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                {/* Chart visualization would go here - using a mock bar chart for now */}
                <div className="h-full flex items-end justify-between gap-2 pt-8 px-1">
                  {MOCK_EARNINGS.map((data, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="relative w-10 bg-primary rounded-t-md" style={{ 
                        height: `${(data.amount / 600) * 250}px`,
                        backgroundColor: `hsl(var(--primary) / ${0.7 + (index * 0.05)})`
                      }}>
                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-medium">
                          ${data.amount}
                        </span>
                      </div>
                      <span className="mt-2 text-xs text-muted-foreground">{data.week}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
                  Earnings Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">+7.2%</div>
                <p className="text-sm text-muted-foreground">Compared to previous period</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Current</span>
                    <span className="font-medium">$2,853</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Previous</span>
                    <span className="font-medium">$2,662</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-blue-500" />
                  Upcoming Payments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Weekly Payout</div>
                      <div className="text-sm text-muted-foreground">November 15, 2023</div>
                    </div>
                    <div className="text-lg font-bold">$517</div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Monthly Bonus</div>
                      <div className="text-sm text-muted-foreground">November 30, 2023</div>
                    </div>
                    <div className="text-lg font-bold">$250</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Available Reports
          </CardTitle>
          <CardDescription>Browse and download your reports</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Generated</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>{report.period}</TableCell>
                  <TableCell>{report.generated}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleDownloadExistingReport(report)}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardReportsPage;
