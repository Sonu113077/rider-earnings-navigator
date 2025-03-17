
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, ChevronsUpDown } from "lucide-react";

interface EarningsGraphProps {
  className?: string;
}

const EarningsGraph = ({ className }: EarningsGraphProps) => {
  // Sample data for the earnings graph
  const data = [
    { name: 'Jan', earnings: 1200 },
    { name: 'Feb', earnings: 900 },
    { name: 'Mar', earnings: 1500 },
    { name: 'Apr', earnings: 1800 },
    { name: 'May', earnings: 1600 },
    { name: 'Jun', earnings: 2100 },
    { name: 'Jul', earnings: 1900 },
    { name: 'Aug', earnings: 2400 },
    { name: 'Sep', earnings: 2200 },
    { name: 'Oct', earnings: 2600 },
    { name: 'Nov', earnings: 2900 },
    { name: 'Dec', earnings: 3100 },
  ];

  const currentEarnings = data[data.length - 1].earnings;
  const previousEarnings = data[data.length - 2].earnings;
  const percentChange = ((currentEarnings - previousEarnings) / previousEarnings) * 100;
  const isPositive = percentChange >= 0;

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Earnings Overview</CardTitle>
        <div className="flex items-center space-x-2">
          <span className={cn("text-sm font-medium", isPositive ? "text-green-600" : "text-red-600")}>
            {isPositive ? <ArrowUpRight className="h-4 w-4 inline mr-1" /> : <ArrowDownRight className="h-4 w-4 inline mr-1" />}
            {Math.abs(percentChange).toFixed(1)}%
          </span>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: 5,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Earnings']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Area 
                type="monotone" 
                dataKey="earnings" 
                stroke="#8884d8" 
                fillOpacity={1} 
                fill="url(#earningsGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Annual</p>
            <p className="text-2xl font-bold">${data.reduce((sum, item) => sum + item.earnings, 0).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Monthly Average</p>
            <p className="text-2xl font-bold">
              ${(data.reduce((sum, item) => sum + item.earnings, 0) / data.length).toLocaleString(undefined, {maximumFractionDigits: 0})}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsGraph;
