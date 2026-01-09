"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Mon", cases: 240, recovered: 180 },
  { name: "Tue", cases: 300, recovered: 220 },
  { name: "Wed", cases: 200, recovered: 280 },
  { name: "Thu", cases: 278, recovered: 290 },
  { name: "Fri", cases: 189, recovered: 300 },
  { name: "Sat", cases: 239, recovered: 320 },
  { name: "Sun", cases: 349, recovered: 350 },
];

export function OverviewChart() {
  return (
    <Card className="col-span-4 lg:col-span-3 rounded-none">
      <CardHeader>
        <CardTitle>Infection Trends</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "0px",
                  color: "#0f172a",
                }}
              />
              <Area
                type="monotone"
                dataKey="cases"
                stroke="#ef4444"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCases)"
                name="Active Cases"
              />
              <Area
                type="monotone"
                dataKey="recovered"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRecovered)"
                name="Recovered"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
