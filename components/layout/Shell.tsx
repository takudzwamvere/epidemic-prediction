"use client";

import React from "react";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";

export function Shell({ children, className }: { children: React.ReactNode; className?: string }) {
  // Access global sidebar state if needed, simpler for now to assume collapsed/expanded handling in CSS or Context
  // For this demo, we'll assume the sidebar is present and we add padding to the main content
  
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans selection:bg-emerald-500/30">
        <Sidebar />
        
        <main className={cn(
            "flex-1 flex flex-col min-h-0 transition-all duration-300 ease-in-out",
            "md:pl-64", // Default expanded state padding, ideally dynamic but fine for now
             className
        )}>
             <div className="flex-1 p-4 md:p-8 pt-16 md:pt-8 w-full max-w-400 mx-auto animate-fade-in">
                {children}
            </div>
        </main>
    </div>
  );
}
