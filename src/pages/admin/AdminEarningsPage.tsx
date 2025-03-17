
import { useState } from 'react';
import { 
  BarChart, Calendar, ChevronDown, ChevronUp, Download, 
  FileDown, Filter, Search, User, Users, XCircle, Printer, ExternalLink 
} from 'lucide-react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

// Mock earnings data
const MOCK_EARNINGS_DATA = [
  { date: '2023-10-01', totalRiders: 45, presentRiders: 42, absentRiders: 3, totalEarnings: 35800 },
  { date: '2023-10-02', totalRiders: 45, presentRiders: 41, absentRiders: 4, totalEarnings: 34500 },
  { date: '2023-10-03', totalRiders: 45, presentRiders: 44, absentRiders: 1, totalEarnings: 37200 },
  { date: '2023-10-04', totalRiders: 45, presentRiders: 43, absentRiders: 2, totalEarnings: 36400 },
  { date: '2023-10-05', totalRiders: 45, presentRiders: 40, absentRiders: 5, totalEarnings: 33600 },
  { date: '2023-10-06', totalRiders: 45, presentRiders: 45, absentRiders: 0, totalEarnings: 38200 },
  { date: '2023-10-07', totalRiders: 45, presentRiders: 39, absentRiders: 6, totalEarnings: 32900 },
];

// Mock absent riders data
const MOCK_ABSENT_RIDERS = [
  {
    id: 'R001',
    name: 'John Doe',
    mobile: '9876543201',
    userId: 'RID001',
    clientId: 'CL001',
    clientName: 'ABC Logistics',
    absentDates: ['2023-10-03'],
    earnings: {
      monthly: 38400,
      weekly: 9600,
      daily: 1920
    },
    attendance: {
      monthly: 22,
      total: 124,
      rate: '92%'
    }
  },
  {
    id: 'R002',
    name: 'Jane Smith',
    mobile: '9876543202',
    userId: 'RID002',
    clientId: 'CL002',
    clientName: 'XYZ Deliveries',
    absentDates: ['2023-10-02', '2023-10-05'],
    earnings: {
      monthly: 36000,
      weekly: 9000,
      daily: 1800
    },
    attendance: {
      monthly: 20,
      total: 118,
      rate: '85%'
    }
  },
  {
    id: 'R003',
    name: 'Mike Johnson',
    mobile: '9876543203',
    userId: 'RID003',
    clientId: 'CL001',
    clientName: 'ABC Logistics',
    absentDates: ['2023-10-01', '2023-10-07'],
    earnings: {
      monthly: 34800,
      weekly: 8700,
      daily: 1740
    },
    attendance: {
      monthly: 21,
      total: 110,
      rate: '88%'
    }
  },
  {
    id: 'R004',
    name: 'Sarah Williams',
    mobile: '9876543204',
    userId: 'RID004',
    clientId: 'CL003',
    clientName: 'Quick Delivery Services',
    absentDates: ['2023-10-05', '2023-10-07'],
    earnings: {
      monthly: 40000,
      weekly: 10000,
      daily: 2000
    },
    attendance: {
      monthly: 19,
      total: 105,
      rate: '80%'
    }
  }
];

const AdminEarningsPage = () => {
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({
    from: '2023-10-01',
    to: '2023-10-07'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showAbsentRiders, setShowAbsentRiders] = useState(false);
  const [selectedRider, setSelectedRider] = useState<any>(null);
  const [showRiderDetails, setShowRiderDetails] = useState(false);
  const [showReportExport, setShowReportExport] = useState(false);
  
  // Calculate aggregate statistics
  const stats = {
    totalEarnings: MOCK_EARNINGS_DATA.reduce((sum, day) => sum + day.totalEarnings, 0),
    averageDailyEarnings: Math.round(
      MOCK_EARNINGS_DATA.reduce((sum, day) => sum + day.totalEarnings, 0) / MOCK_EARNINGS_DATA.length
    ),
    totalAbsences: MOCK_EARNINGS_DATA.reduce((sum, day) => sum + day.absentRiders, 0),
    presentPercentage: Math.round(
      (MOCK_EARNINGS_DATA.reduce((sum, day) => sum + day.presentRiders, 0) /
      (MOCK_EARNINGS_DATA.reduce((sum, day) => sum + day.totalRiders, 0))) * 100
    )
  };
  
  // Format data for the chart
  const chartData = MOCK_EARNINGS_DATA.map(day => ({
    date: new Date(day.date).toLocaleDateString([], { day: 'numeric', month: 'short' }),
    earnings: day.totalEarnings,
    presentRiders: day.presentRiders,
    absentRiders: day.absentRiders
  }));
  
  // Filter absent riders based on search
  const filteredAbsentRiders = MOCK_ABSENT_RIDERS.filter(rider => 
    rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rider.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rider.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleViewRiderDetails = (rider: any) => {
    setSelectedRider(rider);
    setShowRiderDetails(true);
  };
  
  const handleExportReport = () => {
    setShowReportExport(true);
  };
  
  const handleExport = (format: string) => {
    toast.success(`Report exported in ${format} format`);
    setShowReportExport(false);
  };
  
  const printReport = () => {
    toast.success("Printing report...");
    setTimeout(() => {
      window.print();
    }, 500);
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BarChart className="h-7 w-7" /> 
          Earnings Monitoring
        </h1>
        <p className="mt-2 text-muted-foreground">
          Monitor rider earnings, track attendance, and analyze trends
        </p>
      </div>
      
      {/* Date Range Selector */}
      <div className="bg-card rounded-lg shadow p-5">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <label htmlFor="from-date" className="block text-sm font-medium mb-1">From</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-2.5 text-muted-foreground" />
                <input
                  id="from-date"
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                  className="rounded-md border border-input bg-transparent pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>
            <div>
              <label htmlFor="to-date" className="block text-sm font-medium mb-1">To</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-2.5 text-muted-foreground" />
                <input
                  id="to-date"
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                  className="rounded-md border border-input bg-transparent pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>
          </div>
          
          <div className="self-end">
            <button 
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              onClick={handleExportReport}
            >
              <FileDown size={14} />
              Export Report
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          className="bg-card rounded-lg shadow p-4 border-l-4 border-green-500 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => toast.info("Total earnings for selected period")}
        >
          <p className="text-sm text-muted-foreground">Total Earnings</p>
          <p className="text-2xl font-bold">₹{stats.totalEarnings.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">For selected period</p>
        </div>
        
        <div 
          className="bg-card rounded-lg shadow p-4 border-l-4 border-blue-500 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => toast.info("Average daily earnings for selected period")}
        >
          <p className="text-sm text-muted-foreground">Avg. Daily Earnings</p>
          <p className="text-2xl font-bold">₹{stats.averageDailyEarnings.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">Per day average</p>
        </div>
        
        <div 
          className="bg-card rounded-lg shadow p-4 border-l-4 border-amber-500 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => toast.info("Percentage of rider attendance for selected period")}
        >
          <p className="text-sm text-muted-foreground">Attendance Rate</p>
          <p className="text-2xl font-bold">{stats.presentPercentage}%</p>
          <p className="text-xs text-muted-foreground mt-1">Rider presence</p>
        </div>
        
        <div 
          className="bg-card rounded-lg shadow p-4 border-l-4 border-red-500 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => {
            setShowAbsentRiders(true);
            toast.info("Showing absent riders");
          }}
        >
          <p className="text-sm text-muted-foreground">Total Absences</p>
          <p className="text-2xl font-bold">{stats.totalAbsences}</p>
          <p className="text-xs text-muted-foreground mt-1">Across all riders</p>
        </div>
      </div>
      
      {/* Earnings Chart */}
      <div className="bg-card rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Earnings Trend</h2>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toast.success("Chart view updated")}
            >
              <BarChart size={14} className="mr-1" />
              Bar
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toast.success("Chart download started")}
            >
              <Download size={14} className="mr-1" />
              Chart
            </Button>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'earnings') return [`₹${value}`, 'Total Earnings'];
                  if (name === 'presentRiders') return [value, 'Present Riders'];
                  if (name === 'absentRiders') return [value, 'Absent Riders'];
                  return [value, name];
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="earnings" fill="#10b981" name="Earnings" />
              <Bar yAxisId="right" dataKey="presentRiders" fill="#3b82f6" name="Present Riders" />
              <Bar yAxisId="right" dataKey="absentRiders" fill="#ef4444" name="Absent Riders" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Absent Riders Section */}
      <div className="bg-card rounded-lg shadow overflow-hidden">
        <div className="p-5 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Absent Riders</h2>
            <button
              onClick={() => setShowAbsentRiders(!showAbsentRiders)}
              className="bg-muted rounded-full p-1"
            >
              {showAbsentRiders ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
          
          {showAbsentRiders && (
            <div className="w-full sm:w-auto">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-2.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search riders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-auto rounded-md border border-input bg-transparent pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>
          )}
        </div>
        
        {showAbsentRiders && (
          filteredAbsentRiders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-6 py-3 text-left font-medium">Rider Details</th>
                    <th className="px-6 py-3 text-left font-medium">Client</th>
                    <th className="px-6 py-3 text-left font-medium">Absent Dates</th>
                    <th className="px-6 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredAbsentRiders.map((rider) => (
                    <tr key={rider.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <User size={16} />
                          </div>
                          <div className="ml-3">
                            <p className="font-medium">{rider.name}</p>
                            <p className="text-xs text-muted-foreground">{rider.userId} • {rider.mobile}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p>{rider.clientName}</p>
                        <p className="text-xs text-muted-foreground">{rider.clientId}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {rider.absentDates.map((date, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            >
                              {new Date(date).toLocaleDateString([], { day: 'numeric', month: 'short' })}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="text-xs text-primary hover:underline flex items-center"
                          onClick={() => handleViewRiderDetails(rider)}
                        >
                          <Eye size={14} className="mr-1" />
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                <Users size={20} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No absent riders found</h3>
              <p className="text-muted-foreground">
                {searchTerm 
                  ? "No riders match your search criteria" 
                  : "All riders have perfect attendance for the selected period!"}
              </p>
            </div>
          )
        )}
      </div>
      
      {/* Rider Details Dialog */}
      <Dialog open={showRiderDetails} onOpenChange={setShowRiderDetails}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Rider Details</DialogTitle>
          </DialogHeader>
          
          {selectedRider && (
            <div className="space-y-6 py-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedRider.name}</h3>
                  <p className="text-muted-foreground">{selectedRider.userId} • {selectedRider.mobile}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold uppercase text-muted-foreground">Client Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Client Name:</span>
                      <span className="text-sm font-medium">{selectedRider.clientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Client ID:</span>
                      <span className="text-sm font-medium">{selectedRider.clientId}</span>
                    </div>
                  </div>
                  
                  <h4 className="text-sm font-semibold uppercase text-muted-foreground">Attendance Statistics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Monthly Attendance:</span>
                      <span className="text-sm font-medium">{selectedRider.attendance.monthly} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Services:</span>
                      <span className="text-sm font-medium">{selectedRider.attendance.total} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Attendance Rate:</span>
                      <span className="text-sm font-medium">{selectedRider.attendance.rate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold uppercase text-muted-foreground">Earning Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Monthly Earnings:</span>
                      <span className="text-sm font-medium">₹{selectedRider.earnings.monthly.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Weekly Average:</span>
                      <span className="text-sm font-medium">₹{selectedRider.earnings.weekly.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Daily Average:</span>
                      <span className="text-sm font-medium">₹{selectedRider.earnings.daily.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <h4 className="text-sm font-semibold uppercase text-muted-foreground">Absence Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Absences:</span>
                      <span className="text-sm font-medium">{selectedRider.absentDates.length} days</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm">Absent Dates:</span>
                      <div className="flex flex-wrap gap-1">
                        {selectedRider.absentDates.map((date: string, index: number) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          >
                            {new Date(date).toLocaleDateString([], { day: 'numeric', month: 'short' })}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  variant="outline"
                  onClick={() => {
                    toast.success(`Generated report for ${selectedRider.name}`);
                    setShowRiderDetails(false);
                  }}
                >
                  <FileDown size={16} className="mr-2" />
                  Export Report
                </Button>
                <Button
                  onClick={() => {
                    toast.success(`Notifications sent to ${selectedRider.name}`);
                    setShowRiderDetails(false);
                  }}
                >
                  Send Notification
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Export Report Dialog */}
      <Dialog open={showReportExport} onOpenChange={setShowReportExport}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Export Earnings Report</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Choose a format to export the earnings report for the period 
              {' '}{new Date(dateRange.from).toLocaleDateString()} to {new Date(dateRange.to).toLocaleDateString()}.
            </p>
            
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => handleExport('PDF')}
              >
                <Download className="mr-2 h-4 w-4" />
                Export as PDF
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => handleExport('Excel')}
              >
                <Download className="mr-2 h-4 w-4" />
                Export as Excel
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => handleExport('CSV')}
              >
                <Download className="mr-2 h-4 w-4" />
                Export as CSV
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={printReport}
              >
                <Printer className="mr-2 h-4 w-4" />
                Print Report
              </Button>
            </div>
            
            <div className="pt-4 flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setShowReportExport(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => handleExport('PDF')}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEarningsPage;
