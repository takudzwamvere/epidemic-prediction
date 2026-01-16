"use client";
import React from "react";
import {
  BarChart3,
  Upload,
  Database,
  FileText,
  MapPin,
  TrendingUp,
  Activity,
  AlertTriangle,
  Download,
  MoreHorizontal
} from "lucide-react";

export default function Home() {
  const adminStats = [
    {
      name: "Total Datasets",
      value: "8",
      change: "+2 this week",
      icon: Database,
    },
    {
      name: "Avg Quality Score",
      value: "84%",
      change: "+3% vs last week",
      icon: TrendingUp,
    },
    {
      name: "New Uploads",
      value: "3",
      change: "Last 24h",
      icon: FileText,
    },
    {
      name: "Health Records",
      value: "2,457",
      change: "+156 new records",
      icon: Activity,
    },
  ];

  const myRecentActivities = [
    {
      id: "ACT-001",
      action: "Upload",
      target: "health_center_data.csv",
      user: "Dr. John Doe",
      time: "2024-03-20 14:30",
      status: "Completed",
    },
    {
      id: "ACT-002",
      action: "Upload",
      target: "community_health_workers.csv",
      user: "Dr. John Doe",
      time: "2024-03-19 09:15",
      status: "Processing",
    },
    {
      id: "ACT-003",
      action: "Download",
      target: "processed_epidemic_data.csv",
      user: "Admin System",
      time: "2024-03-18 16:45",
      status: "Completed",
    },
    {
      id: "ACT-004",
      action: "Upload",
      target: "hospital_admissions.xml",
      user: "Dr. John Doe",
      time: "2024-03-17 11:20",
      status: "Failed",
    },
    {
      id: "ACT-005",
      action: "Report",
      target: "Monthly Summary Q1",
      user: "System Job",
      time: "2024-03-17 01:00",
      status: "Completed",
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Overview</h1>
          <p className="text-slate-500 text-sm mt-1">
            Real-time monitoring of epidemic prediction data.
          </p>
        </div>
        <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50">
                <Download className="w-4 h-4" /> Export Report
            </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {adminStats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white border border-slate-200 p-4 flex flex-col justify-between h-32"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-500 text-xs uppercase font-semibold tracking-wider">{stat.name}</p>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-900">{stat.value}</span>
                </div>
              </div>
              <stat.icon className="w-5 h-5 text-slate-400" />
            </div>
            <div className="text-xs text-slate-500 mt-2 border-t border-slate-100 pt-2">
                {stat.change}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Data Table */}
        <div className="lg:col-span-2 bg-white border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">Recent Audit Logs</h3>
                <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 font-medium">ID</th>
                            <th className="px-6 py-3 font-medium">Action</th>
                            <th className="px-6 py-3 font-medium">File / Target</th>
                            <th className="px-6 py-3 font-medium">User</th>
                            <th className="px-6 py-3 font-medium">Status</th>
                            <th className="px-6 py-3 font-medium text-right">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {myRecentActivities.map((row) => (
                            <tr key={row.id} className="hover:bg-slate-50">
                                <td className="px-6 py-3 text-slate-500 font-mono text-xs">{row.id}</td>
                                <td className="px-6 py-3 font-medium text-slate-900">{row.action}</td>
                                <td className="px-6 py-3 text-slate-700">{row.target}</td>
                                <td className="px-6 py-3 text-slate-500">{row.user}</td>
                                <td className="px-6 py-3">
                                    <span className={`
                                        inline-flex items-center px-2 py-0.5 text-xs font-medium border
                                        ${row.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' : 
                                          row.status === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                          'bg-red-50 text-red-700 border-red-200'}
                                    `}>
                                        {row.status}
                                    </span>
                                </td>
                                <td className="px-6 py-3 text-right text-slate-500 tabular-nums">{row.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Status / Quick Actions */}
        <div className="space-y-4">
            <div className="bg-white border border-slate-200 p-6">
                 <h3 className="font-bold text-slate-900 mb-4">System Health</h3>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Sync Status</span>
                        <span className="text-green-600 flex items-center font-medium">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> Operational
                        </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2">
                        <div className="bg-green-500 h-2 w-[98%]"></div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm pt-2">
                        <span className="text-slate-600">Storage Usage</span>
                        <span className="text-slate-900 font-medium">45%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2">
                        <div className="bg-blue-600 h-2 w-[45%]"></div>
                    </div>

                     <div className="flex items-center justify-between text-sm pt-2">
                        <span className="text-slate-600">CPU Load</span>
                        <span className="text-slate-900 font-medium">12%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2">
                        <div className="bg-slate-400 h-2 w-[12%]"></div>
                    </div>
                 </div>
            </div>

            <div className="bg-white border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                     <button className="flex flex-col items-center justify-center p-3 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all text-center">
                        <Upload className="w-5 h-5 text-blue-600 mb-2" />
                        <span className="text-xs font-medium text-slate-700">Upload Data</span>
                     </button>
                     <button className="flex flex-col items-center justify-center p-3 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all text-center">
                        <Database className="w-5 h-5 text-blue-600 mb-2" />
                        <span className="text-xs font-medium text-slate-700">Manage DB</span>
                     </button>
                     <button className="flex flex-col items-center justify-center p-3 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all text-center">
                        <AlertTriangle className="w-5 h-5 text-amber-500 mb-2" />
                        <span className="text-xs font-medium text-slate-700">Broadcast</span>
                     </button>
                     <button className="flex flex-col items-center justify-center p-3 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all text-center">
                        <MoreHorizontal className="w-5 h-5 text-slate-400 mb-2" />
                        <span className="text-xs font-medium text-slate-700">More</span>
                     </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
