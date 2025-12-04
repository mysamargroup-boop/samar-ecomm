

'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import { ChartTooltipContent } from '@/components/ui/chart';
import { useEffect, useState } from 'react';

const generateChartData = () => [
  { month: 'Jan', total: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'Feb', total: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'Mar', total: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'Apr', total: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'May', total: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'Jun', total: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'Jul', total: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'Aug', total: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'Sep', total: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'Oct', total: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'Nov', total: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'Dec', total: Math.floor(Math.random() * 5000) + 1000 },
];

export function SalesAnalyticsChart() {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    setChartData(generateChartData());
  }, []);

  if (chartData.length === 0) {
    return (
       <div className="w-full h-[350px] flex items-center justify-center">
        <p>Loading chart data...</p>
      </div>
    )
  }
  
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => formatPrice(value as number)}
        />
        <Tooltip
          cursor={{ fill: 'hsl(var(--muted))' }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col space-y-1">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Month
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[0].payload.month}
                      </span>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Sales
                      </span>
                      <span className="font-bold">
                        {formatPrice(payload[0].value as number)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
