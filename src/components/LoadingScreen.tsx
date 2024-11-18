import { Loader2 } from "lucide-react";
import React from "react";

function LoadingScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-100 bg-brand-50">
      <div className="flex flex-col items-center">
        <Loader2 className="animate-spin w-10 h-10" />
        <div className="mt-4 text-sm text-gray-700">{children}</div>
      </div>
    </div>
  );
}

export default LoadingScreen;
