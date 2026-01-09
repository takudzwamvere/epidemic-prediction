"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, LucideIcon } from "lucide-react";
import React from "react";

interface StatsCardProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: LucideIcon;
  color?: "emerald" | "cyan" | "rose" | "amber";
}

export function StatsCard({ title, value, trend, trendUp, icon: Icon, color = "emerald" }: StatsCardProps) {
  const colors = {
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    cyan: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
    rose: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  };

  return (
    <Card className="hover:bg-slate-50 transition-all cursor-pointer group rounded-none">
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-slate-500 group-hover:text-slate-900 transition-colors">
            {title}
          </p>
          <div className={cn("p-2 rounded-full", colors[color])}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <div className="flex flex-col mt-3">
          <div className="text-3xl font-bold text-slate-900">{value}</div>
          {trend && (
            <div className="flex items-center text-xs mt-1">
              {trendUp ? (
                <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-600" />
              ) : (
                 <ArrowDownRight className="mr-1 h-3 w-3 text-rose-600" />
              )}
              <span className={cn(trendUp ? "text-emerald-600" : "text-rose-600", "font-medium")}>
                {trend}
              </span>
              <span className="text-slate-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
