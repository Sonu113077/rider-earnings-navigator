
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Calendar, Download, Filter, RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Mock data
const MOCK_EARNINGS = [
  { week: 'Week 1', amount: 427 },
  { week: 'Week 2', amount: 492 },
  { week: 'Week 3', amount: 435 },
  { week: 'Week 4', amount: 510 },
  { week: 'Week 5', amount: 468 },
  { week: 'Week 6', amount: 521 },
];

const DashboardReportsPage = () => {
  const { toast } = useToast();
  const [period, setPeriod] = useState('month');
  const [reportType, setReportType] = useState('earnings');

  const handleDownloadReport = () => {
    toast({
      title: "Downloading report",
      description: "Your report is being generated and will download shortly.",
    });
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
                  <input type="date" className="w-full px-3 py-2 border border-input rounded-md" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">End Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-input rounded-md" />
                </div>
              </div>
            )}
            
            <Button className="w-full" onClick={handleDownloadReport}>
              <Download className="mr-2 h-4 w-4" /> Download Report
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
          <div className="rounded-md border">
            <div className="grid grid-cols-5 border-b px-4 py-3 font-medium">
              <div>Report Name</div>
              <div>Type</div>
              <div>Period</div>
              <div>Generated</div>
              <div className="text-right">Action</div>
            </div>
            <div className="divide-y">
              {[1, 2, 3].map((i) => (
                <div key={i} className="grid grid-cols-5 px-4 py-3 items-center">
                  <div>Monthly Earnings #{i}</div>
                  <div>Earnings</div>
                  <div>Oct 2023</div>
                  <div>Nov 1, 2023</div>
                  <div className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardReportsPage;
