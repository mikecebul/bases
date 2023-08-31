import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function TableSkeleton() {
  return (
    <div className="w-[1005] rounded-md flex flex-col p-3">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
      {Array(6)
        .fill(null)
        .map((__, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 space-y-2"
          >
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        ))}
    </div>
  );
}
