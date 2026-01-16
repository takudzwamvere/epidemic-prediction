import React from "react";
import { Database } from "lucide-react";

export default function DatasetsPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-green-100 rounded-lg">
          <Database className="w-6 h-6 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Dataset Management</h1>
      </div>
      <div className="bg-white p-12 rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <Database className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">No Datasets Found</h3>
        <p className="text-gray-500 mt-2 max-w-sm">
          You haven't uploaded any datasets yet. Use the upload page to add
          health records to the system.
        </p>
      </div>
    </div>
  );
}
