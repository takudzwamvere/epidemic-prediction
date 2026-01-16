import React from "react";
import { FileText } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <FileText className="w-6 h-6 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Quality Reports</h1>
      </div>
      <div className="bg-white p-12 rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">No Reports Available</h3>
        <p className="text-gray-500 mt-2 max-w-sm">
          Quality reports will appear here once you process your first dataset.
        </p>
      </div>
    </div>
  );
}
