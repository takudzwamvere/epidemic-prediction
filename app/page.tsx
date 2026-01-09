"use client";

import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { EpidemicMap } from "@/components/dashboard/EpidemicMap";
import { OverviewChart } from "@/components/dashboard/OverviewChart";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Activity, AlertTriangle, Biohazard, Users } from "lucide-react";
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col space-y-8 pb-8">
      {/* Header Section */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-slate-500">
          Real-time epidemiological surveillance and predictive analytics.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Active Cases"
          value="24,592"
          trend="+12%"
          trendUp={false} // Trend up in cases is bad, so red
          icon={Biohazard}
          color="rose"
        />
        <StatsCard
          title="Risk Level"
          value="High"
          trend="Escalating"
          trendUp={false}
          icon={AlertTriangle}
          color="amber"
        />
        <StatsCard
          title="Active Outbreaks"
          value="7"
          trend="+2"
          trendUp={false}
          icon={Activity}
          color="rose"
        />
        <StatsCard
          title="Recovered"
          value="128,430"
          trend="+5%"
          trendUp={true} // Trend up in recovered is good, so green
          icon={Users}
          color="emerald"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Chart Section */}
        <OverviewChart />
        
        {/* Activity Feed */}
        <ActivityFeed />
        
        {/* Map Section - Full Width on Mobile, Spans across bottom or middle */}
        <div className="col-span-1 lg:col-span-7">
           <EpidemicMap />
        </div>
      </div>
    </div>
  );
}
