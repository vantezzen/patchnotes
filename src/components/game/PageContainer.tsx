import { cn } from "@/lib/utils";
import React from "react";

function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("p-12 max-w-lg mx-auto mb-26", className)}>
      {children}
    </div>
  );
}

export default PageContainer;
