"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Ventilators", used: 65, available: 35 },
  { name: "ICU Beds", used: 80, available: 20 },
  { name: "Isolation Units", used: 45, available: 55 },
  { name: "Vaccines (k)", used: 90, available: 10 },
  { name: "PPE Kits (k)", used: 30, available: 70 },
];

export function ResourceChart() {
  return (
    <Card className="col-span-4 lg:col-span-3 rounded-none">
      <CardHeader>
        <CardTitle>Resource Utilization (Forecast vs Current)</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
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
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                cursor={{ fill: "#f1f5f9" }}
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "0px",
                  color: "#0f172a",
                }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              <Bar dataKey="used" name="Used / Deployed" fill="#f59e0b" radius={[0, 0, 0, 0]} stackId="a" />
              <Bar dataKey="available" name="Available / Buffer" fill="#10b981" radius={[0, 0, 0, 0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
