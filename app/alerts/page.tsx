"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { AlertCircle, Bell, Check, Mail, MessageSquare, Shield, Siren, X } from "lucide-react";
import React, { useState } from "react";

const ALERTS = [
  {
    id: 1,
    severity: "critical",
    title: "Projected Outbreak: Downtown Sector",
    desc: "R0 exceeding 2.5. Immediate intervention required.",
    time: "10 min ago",
  },
  {
    id: 2,
    severity: "warning",
    title: "Supply Chain Risk: Vaccine Distribution",
    desc: "Stock levels low in Northern Region.",
    time: "45 min ago",
  },
];

const INTERVENTIONS = [
  {
    id: 1,
    title: "Regional Lockdown - High Intensity",
    impact: "High",
    cost: "High",
    effectiveness: "94%",
    desc: "Restrict movement in affected sectors. Close non-essential businesses.",
  },
  {
    id: 2,
    title: "Targeted Vaccination Drive",
    impact: "Medium",
    cost: "Medium",
    effectiveness: "82%",
    desc: "Deploy mobile vaccination units to hotspots. Public awareness campaign.",
  },
  {
    id: 3,
    title: "Mask Mandate Enforcement",
    impact: "Low",
    cost: "Low",
    effectiveness: "45%",
    desc: "Strict enforcement of mask-wearing in public spaces.",
  },
];

export default function AlertsPage() {
  const [selectedIntervention, setSelectedIntervention] = useState<number | null>(null);
  const [notified, setNotified] = useState(false);

  const handleNotify = () => {
    setNotified(true);
    setTimeout(() => setNotified(false), 3000);
  };

  return (
    <div className="flex flex-col space-y-8 pb-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Alerts & Response</h1>
        <p className="text-slate-500">
          Manage automated alerts and deploy ML-suggested interventions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Alerts Panel */}
        <Card className="col-span-1 border-l-4 border-l-red-500 rounded-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Active Critical Alerts</CardTitle>
            <Siren className="w-5 h-5 text-red-500 animate-pulse" />
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            {ALERTS.map((alert) => (
              <div
                key={alert.id}
                className="p-4 bg-red-50 border border-red-200 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-red-600 text-sm uppercase tracking-wider">
                    {alert.severity}
                  </span>
                  <span className="text-xs text-red-400">{alert.time}</span>
                </div>
                <h3 className="font-medium text-slate-900 leading-tight">{alert.title}</h3>
                <p className="text-sm text-slate-600">{alert.desc}</p>
                <div className="pt-2 flex gap-2">
                    <Button size="sm" variant="destructive" className="w-full text-xs h-8">
                        Acknowledge
                    </Button>
                     <Button size="sm" variant="outline" className="w-full text-xs h-8 border-red-300 text-red-600 hover:bg-red-50">
                        Details
                    </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Intervention Selection */}
        <Card className="col-span-1 lg:col-span-2 rounded-none">
           <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-600"/>
                Recommended Interventions (ML Generated)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {INTERVENTIONS.map((option) => (
                    <div 
                        key={option.id}
                        className={cn(
                            "cursor-pointer border p-4 transition-all hover:bg-slate-50",
                            selectedIntervention === option.id 
                                ? "bg-blue-50 border-blue-500 ring-1 ring-blue-500" 
                                : "bg-white border-slate-200"
                        )}
                        onClick={() => setSelectedIntervention(option.id)}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Option {option.id}</span>
                            {selectedIntervention === option.id && <Check className="w-4 h-4 text-blue-600" />}
                        </div>
                        <h4 className="font-bold text-slate-900 mb-1">{option.title}</h4>
                        <div className="flex gap-2 text-xs mb-3">
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200">Cost: {option.cost}</span>
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200">Impact: {option.impact}</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">{option.desc}</p>
                        <div className="flex items-center text-emerald-600 text-sm font-medium">
                            Predicted Effectiveness: {option.effectiveness}
                        </div>
                    </div>
                ))}
             </div>
             
             {selectedIntervention && (
                 <div className="mt-6 p-4 bg-slate-50 border border-slate-200 animate-fade-in">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                             <div className="p-3 bg-white border border-slate-200 shadow-sm">
                                 <AlertCircle className="w-6 h-6 text-blue-600"/>
                             </div>
                             <div>
                                 <h4 className="font-semibold text-slate-900">Broadcast Alert & Deploy Resources</h4>
                                 <p className="text-sm text-slate-500">Notify relevant health authorities and initiate protocols.</p>
                             </div>
                        </div>
                        <Button 
                            onClick={handleNotify} 
                            disabled={notified}
                            className={cn("w-full md:w-auto min-w-37.5", notified && "bg-emerald-600 hover:bg-emerald-700")}
                        >
                            {notified ? (
                                <>
                                    <Check className="mr-2 h-4 w-4" /> Sent
                                </>
                            ) : (
                                <>
                                    <Bell className="mr-2 h-4 w-4" /> Execute Plan
                                </>
                            )}
                        </Button>
                    </div>
                 </div>
             )}
          </CardContent>
        </Card>
        
        {/* Notification settings snippet */}
        <Card className="col-span-1 lg:col-span-3 rounded-none">
             <CardHeader>
                <CardTitle>Automated Notification Channels</CardTitle>
             </CardHeader>
             <CardContent>
                 <div className="flex flex-wrap gap-4">
                     {["CDC", "WHO", "Regional Health Dept", "Emergency Services"].map((agency) => (
                         <div key={agency} className="flex items-center gap-2 p-2 px-3 bg-white border border-slate-200 shadow-sm">
                             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                             <span className="text-sm font-medium text-slate-700">{agency}</span>
                             <div className="flex gap-1 ml-2">
                                 <Mail className="w-3 h-3 text-slate-400" />
                                 <MessageSquare className="w-3 h-3 text-slate-400" />
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
