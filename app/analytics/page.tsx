"use client";

import { OverviewChart } from "@/components/dashboard/OverviewChart";
import { ResourceChart } from "@/components/dashboard/ResourceChart";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ArrowDown, ArrowUp, Download, RefreshCcw } from "lucide-react";
import React from "react";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col space-y-8 pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Analytics & Trends</h1>
          <p className="text-slate-500">
            Deep dive into ARIMA-forecasted epidemic trends and resource allocation models.
          </p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
                <RefreshCcw className="w-4 h-4 mr-2" />
                Refresh Model
            </Button>
            <Button variant="primary" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Report
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Infection Trends */}
         <div className="col-span-1 lg:col-span-2">
            <OverviewChart />
         </div>

         {/* Resource Allocation */}
         <div className="col-span-1">
             <ResourceChart />
         </div>

         {/* Predictive Insights Table */}
         <Card className="col-span-1 rounded-none">
            <CardHeader>
                <CardTitle>AI-Generated Insights</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {[
                        { title: "R0 Rate Projection", val: "1.4 -> 1.8", trend: "up", desc: "Expected increase over next 7 days in Urban Sector 4." },
                        { title: "ICU Capacity", val: "85%", trend: "stable", desc: "Projected to hit critical levels by Friday if no intervention." },
                        { title: "Viral Mutation Probability", val: "Low (12%)", trend: "down", desc: "Genetic sequencing suggests strain stability." },
                    ].map((insight, i) => (
                        <div key={i} className="flex items-start justify-between p-4 border border-slate-200 hover:bg-slate-50 transition-colors">
                            <div className="flex flex-col">
                                <span className="font-semibold text-slate-800">{insight.title}</span>
                                <span className="text-sm text-slate-500 mt-1">{insight.desc}</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-lg font-bold text-slate-900">{insight.val}</span>
                                {insight.trend === "up" && <div className="flex items-center text-red-600 text-xs"><ArrowUp className="w-3 h-3 mr-1"/>Worsening</div>}
                                {insight.trend === "down" && <div className="flex items-center text-emerald-600 text-xs"><ArrowDown className="w-3 h-3 mr-1"/>Improving</div>}
                                {insight.trend === "stable" && <div className="flex items-center text-amber-600 text-xs">Stable</div>}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
