'use client';

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { 
  addMonths, 
  subMonths, 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isToday 
} from "date-fns";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export interface CalendarProps {
  className?: string;
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  mode?: "single" | "range" | "multiple";
  initialFocus?: boolean;
  showOutsideDays?: boolean;
}

export function Calendar({
  className,
  selected,
  onSelect,
  showOutsideDays = true,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState<Date>(selected || new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className={cn("p-3 bg-white rounded-lg shadow-sm w-72 select-none", className)}>
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h4 className="text-sm font-semibold text-gray-900">
          {format(currentMonth, "MMMM yyyy")}
        </h4>
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={prevMonth}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-7 w-7 p-0 bg-transparent text-gray-600 hover:text-gray-900"
            )}
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-7 w-7 p-0 bg-transparent text-gray-600 hover:text-gray-900"
            )}
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {weekDays.map((wd) => (
          <div key={wd} className="text-[11px] font-medium text-gray-400">
            {wd}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((day) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isSel = selected ? isSameDay(day, selected) : false;
          const isCurrentDay = isToday(day);

          if (!isCurrentMonth && !showOutsideDays) {
            return <div key={day.toISOString()} className="h-8 w-8" />;
          }

          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => onSelect?.(day)}
              className={cn(
                "h-8 w-8 text-xs font-normal rounded-md transition-colors flex items-center justify-center mx-auto",
                !isCurrentMonth && "text-gray-300",
                isCurrentMonth && "text-gray-700 hover:bg-gray-100",
                isCurrentDay && !isSel && "bg-indigo-50 text-indigo-700 font-semibold",
                isSel && "bg-indigo-600 text-white font-semibold hover:bg-indigo-700 hover:text-white"
              )}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

Calendar.displayName = "Calendar";
