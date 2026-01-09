"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  UploadCloud,
  Activity,
  AlertTriangle,
  Settings,
  Menu,
  X,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Data Import", href: "/upload", icon: UploadCloud },
  { label: "Analytics", href: "/analytics", icon: Activity },
  { label: "Alerts & Response", href: "/alerts", icon: AlertTriangle },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(true);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  return (
    <>
      {/* Mobile Trigger */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-slate-900/50 backdrop-blur-md border border-slate-700"
        >
          {isMobileOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar Container */}
      <motion.aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen bg-slate-50 border-r border-slate-300 transition-all duration-300 ease-in-out md:translate-x-0",
          isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full md:w-64",
          !isOpen && "md:w-20"
        )}
        initial={false}
      >
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="h-16 flex items-center px-6 border-b border-slate-200">
            <ShieldAlert className="w-8 h-8 text-blue-600 mr-3 shrink-0" />
            <motion.span
              className={cn(
                "font-bold text-lg tracking-wider text-slate-800 whitespace-nowrap overflow-hidden transition-all",
                !isOpen && "md:opacity-0 md:w-0"
              )}
            >
              EPI-SENTRY
            </motion.span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center p-3 text-sm font-medium transition-all group relative overflow-hidden",
                    // Sharp edges
                    "rounded-none",
                    isActive
                      ? "text-blue-700 bg-blue-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-blue-100/50 border-l-4 border-blue-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                  <Icon className={cn("w-5 h-5 shrink-0 transition-colors", isActive ? "text-blue-600" : "text-slate-500 group-hover:text-slate-700")} />
                  <span
                    className={cn(
                      "ml-3 transition-all duration-300 whitespace-nowrap",
                      !isOpen && "md:opacity-0 md:w-0 md:ml-0"
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile / Collapse Toggle */}
          <div className="p-4 border-t border-slate-200">
            <div className={cn("flex items-center transition-all", !isOpen ? "justify-center" : "justify-between")}>
              
               <div className={cn("flex items-center gap-3 overflow-hidden", !isOpen && "hidden")}>
                  <div className="w-8 h-8 rounded-full bg-slate-300 border border-slate-400" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900">Dr. Admin</span>
                    <span className="text-xs text-slate-500">Epidemiologist</span>
                  </div>
               </div>

               <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex text-slate-500 hover:text-slate-900"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <Menu className="w-4 h-4" />
               </Button>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Overlay for Mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden animate-fade-in"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
