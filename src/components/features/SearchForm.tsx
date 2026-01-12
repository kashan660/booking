"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MapPin, Users, Clock, ArrowRightLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  pickup: z.string().min(2, "Pickup location is required"),
  dropoff: z.string().min(2, "Dropoff location is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  passengers: z.number().min(1, "At least 1 passenger"),
  returnDate: z.string().optional(),
  returnTime: z.string().optional(),
});

type SearchFormValues = z.infer<typeof searchSchema>;

export function SearchForm() {
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  
  const { register, handleSubmit, formState: { errors } } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      passengers: 1,
      date: format(new Date(), "yyyy-MM-dd"),
      time: "12:00",
    }
  });

  const onSubmit = (data: SearchFormValues) => {
    console.log("Search Data:", data);
    
    // Create query string
    const params = new URLSearchParams();
    params.set("pickup", data.pickup);
    params.set("dropoff", data.dropoff);
    params.set("date", data.date);
    params.set("time", data.time);
    params.set("passengers", data.passengers.toString());
    params.set("type", tripType);
    
    if (tripType === "round-trip" && data.returnDate && data.returnTime) {
      params.set("returnDate", data.returnDate);
      params.set("returnTime", data.returnTime);
    }

    router.push(`/booking?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden -mt-10 relative z-10 border border-slate-100">
      <div className="flex border-b">
        <button
          className={cn(
            "flex-1 py-4 text-sm font-medium text-center transition-colors",
            tripType === "one-way" 
              ? "bg-white text-primary border-b-2 border-primary" 
              : "bg-slate-50 text-slate-500 hover:text-slate-700"
          )}
          onClick={() => setTripType("one-way")}
        >
          One Way
        </button>
        <button
          className={cn(
            "flex-1 py-4 text-sm font-medium text-center transition-colors",
            tripType === "round-trip" 
              ? "bg-white text-primary border-b-2 border-primary" 
              : "bg-slate-50 text-slate-500 hover:text-slate-700"
          )}
          onClick={() => setTripType("round-trip")}
        >
          Round Trip
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pickup */}
        <div className="space-y-2">
          <Label htmlFor="pickup" className="flex items-center gap-2 text-slate-500">
            <MapPin className="h-4 w-4" /> Pickup Location
          </Label>
          <Input 
            id="pickup" 
            placeholder="Airport, Hotel or City" 
            {...register("pickup")}
            className={cn(errors.pickup && "border-destructive focus-visible:ring-destructive")}
          />
          {errors.pickup && <span className="text-xs text-destructive">{errors.pickup.message}</span>}
        </div>

        {/* Dropoff */}
        <div className="space-y-2">
          <Label htmlFor="dropoff" className="flex items-center gap-2 text-slate-500">
            <MapPin className="h-4 w-4" /> Dropoff Location
          </Label>
          <Input 
            id="dropoff" 
            placeholder="Airport, Hotel or City" 
            {...register("dropoff")}
            className={cn(errors.dropoff && "border-destructive focus-visible:ring-destructive")}
          />
          {errors.dropoff && <span className="text-xs text-destructive">{errors.dropoff.message}</span>}
        </div>

        {/* Date & Time */}
        <div className="space-y-2">
          <Label htmlFor="date" className="flex items-center gap-2 text-slate-500">
            <CalendarIcon className="h-4 w-4" /> Date & Time
          </Label>
          <div className="flex gap-2">
            <Input 
              type="date" 
              id="date" 
              {...register("date")}
              className={cn("flex-1", errors.date && "border-destructive")}
            />
            <Input 
              type="time" 
              id="time" 
              {...register("time")}
              className={cn("w-24", errors.time && "border-destructive")}
            />
          </div>
          {(errors.date || errors.time) && <span className="text-xs text-destructive">Date & Time required</span>}
        </div>

        {/* Passengers & Submit */}
        <div className="flex gap-4 items-end">
          <div className="space-y-2 w-24">
            <Label htmlFor="passengers" className="flex items-center gap-2 text-slate-500">
              <Users className="h-4 w-4" /> Pax
            </Label>
            <Input 
              type="number" 
              id="passengers" 
              min={1} 
              max={50}
              {...register("passengers", { valueAsNumber: true })}
              className={cn(errors.passengers && "border-destructive")}
            />
          </div>
          
          <Button type="submit" size="lg" className="flex-1">
            Search
          </Button>
        </div>

        {tripType === "round-trip" && (
          <div className="col-span-full border-t pt-4 mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             <div className="space-y-2 lg:col-start-3">
              <Label htmlFor="returnDate" className="flex items-center gap-2 text-slate-500">
                <ArrowRightLeft className="h-4 w-4" /> Return Date & Time
              </Label>
              <div className="flex gap-2">
                <Input 
                  type="date" 
                  id="returnDate" 
                  {...register("returnDate")}
                />
                <Input 
                  type="time" 
                  id="returnTime" 
                  {...register("returnTime")}
                  className="w-24"
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
