"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
      
      <Card className="max-w-2xl rounded-none">
        <CardHeader>
            <CardTitle>System Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
             <div className="flex flex-col gap-2">
                 <label className="text-sm font-medium text-slate-700">Data Synchronization Interval</label>
                 <select className="bg-white border border-slate-300 text-slate-900 rounded-none p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                     <option>Every 15 minutes</option>
                     <option>Hourly</option>
                     <option>Daily</option>
                 </select>
             </div>
             
             <div className="flex flex-col gap-2">
                 <label className="text-sm font-medium text-slate-700">Alert Threshold (R0)</label>
                 <input type="number" defaultValue={1.5} className="bg-white border border-slate-300 text-slate-900 rounded-none p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
             </div>

             <div className="flex items-center gap-2 pt-4">
                 <Button>
                     <Save className="mr-2 h-4 w-4" /> Save Preferences
                 </Button>
             </div>
        </CardContent>
      </Card>
    </div>
  );
}
