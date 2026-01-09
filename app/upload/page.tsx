"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, CloudUpload, FileText, Loader2, Trash2, X } from "lucide-react";
import React, { useCallback, useState } from "react";

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Mock upload progress
  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setCompleted(true);
      setTimeout(() => {
        setFiles([]);
        setCompleted(false);
      }, 3000);
    }, 2000);
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
      e.dataTransfer.clearData();
    }
  }, []);

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Data Ingestion</h1>
        <p className="text-slate-500">
          Upload Electronic Health Records (EHR) for analysis. Supports CSV, JSON, and XML.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Area */}
        <Card className="col-span-1 lg:col-span-2 rounded-none">
          <CardHeader>
            <CardTitle>File Upload</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className={cn(
                "border-2 border-dashed p-10 flex flex-col items-center justify-center transition-all cursor-pointer h-[300px]",
                isDragging
                  ? "border-blue-500 bg-blue-50 scale-[1.02]"
                  : "border-slate-300 bg-slate-50 hover:bg-slate-100"
              )}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
              <div className="bg-white border border-slate-200 p-4 rounded-full mb-4 shadow-sm">
                <CloudUpload className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">
                Drag & Drop files here
              </h3>
              <p className="text-slate-500 text-sm mt-2 text-center max-w-xs">
                or click to browse from your computer. <br />
                Supported formats: CSV, JSON, XML
              </p>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-slate-500">Selected Files</h4>
                <AnimatePresence>
                  {files.map((file, index) => (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between p-3 bg-white border border-slate-200 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-indigo-500" />
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-slate-800">{file.name}</span>
                            <span className="text-xs text-slate-500">{(file.size / 1024).toFixed(2)} KB</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                <div className="pt-4 flex justify-end">
                    <Button 
                        onClick={handleUpload} 
                        disabled={uploading || completed}
                        className={cn("w-full md:w-auto", completed && "bg-emerald-600 hover:bg-emerald-700")}
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                                Processing...
                            </>
                        ) : completed ? (
                            <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Upload Complete
                            </>
                        ) : (
                            "Start Ingestion Pipeline"
                        )}
                    </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pipeline Status Side Panel */}
        <Card className="col-span-1 rounded-none">
          <CardHeader>
            <CardTitle>Pipeline Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative pl-6 space-y-8 border-l border-slate-200">
                {[
                    { title: "Data Ingestion", status: uploading ? "processing" : completed ? "completed" : "waiting", desc: "Receiving packets..." },
                    { title: "Validation", status: uploading ? "waiting" : completed ? "completed" : "waiting", desc: "Checking schema..." },
                    { title: "Sanitization", status: completed ? "processing" : "waiting", desc: "Anonymizing PII..." },
                    { title: "ARIMA Analysis", status: "waiting", desc: "Time series forecasting..." },
                ].map((step, i) => (
                    <div key={i} className="relative">
                        <div className={cn(
                            "absolute -left-7.25 w-4 h-4 rounded-full border-2 bg-white transition-colors duration-500",
                            step.status === "completed" ? "border-emerald-500 bg-emerald-500" :
                            step.status === "processing" ? "border-amber-500 animate-pulse" :
                            "border-slate-300"
                        )} />
                        <h4 className={cn("text-sm font-medium transition-colors", 
                            step.status === "completed" ? "text-emerald-600" : 
                            step.status === "processing" ? "text-amber-600" : "text-slate-400"
                        )}>
                            {step.title}
                        </h4>
                        <p className="text-xs text-slate-500">{step.desc}</p>
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
