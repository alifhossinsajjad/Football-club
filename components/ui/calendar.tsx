"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  eachDayOfInterval,
  isToday
} from "date-fns";
import { cn } from "@/lib/utils";

interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
}

export function Calendar({ selected, onSelect, className }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(selected || new Date());

  const daysHeader = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className={cn("p-4 w-64 bg-[#171b2f] border border-gray-800 rounded-2xl shadow-2xl", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-black text-white uppercase tracking-widest">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <div className="flex gap-1">
          <button 
            onClick={prevMonth}
            className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-all border border-transparent hover:border-gray-800"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={nextMonth}
            className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-all border border-transparent hover:border-gray-800"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysHeader.map((day) => (
          <div key={day} className="text-[10px] text-gray-500 font-black uppercase text-center py-2">
            {day[0]}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => {
          const isSelected = selected && isSameDay(day, selected);
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isTodayDate = isToday(day);

          return (
            <button
              key={idx}
              onClick={() => onSelect?.(day)}
              className={cn(
                "h-8 w-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center border border-transparent",
                !isCurrentMonth && "text-gray-700 opacity-30",
                isCurrentMonth && !isSelected && "text-gray-400 hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/20",
                isSelected && "bg-cyan-500 text-[#0B0D2C] shadow-[0_0_12px_rgba(6,182,212,0.4)] font-black",
                isTodayDate && !isSelected && "border-white/10 text-white"
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
