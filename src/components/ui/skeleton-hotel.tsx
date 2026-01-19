import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-200/80", className)}
      {...props}
    />
  );
}

export function HotelCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col md:flex-row h-auto md:h-56 w-full">
      {/* Image Skeleton */}
      <Skeleton className="w-full md:w-72 h-48 md:h-full flex-shrink-0" />
      
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Title and Badge */}
          <div className="flex justify-between items-start">
            <div className="space-y-2 w-full">
              <Skeleton className="h-7 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="h-8 w-12 rounded-md" />
          </div>

          {/* Amenities */}
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex justify-between items-end pt-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="h-10 w-40 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function HotelListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-6 w-32 rounded-full" />
      </div>
      
      {Array.from({ length: 3 }).map((_, i) => (
        <HotelCardSkeleton key={i} />
      ))}
    </div>
  );
}
