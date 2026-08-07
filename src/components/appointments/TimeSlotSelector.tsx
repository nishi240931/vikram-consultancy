import React from "react";
import { Clock } from "lucide-react";
import { TimeSlot } from "@/services/appointment.service";

export interface TimeSlotSelectorProps {
  slots: TimeSlot[];
  selectedSlot: string;
  onSelectSlot: (slot: string) => void;
}

export const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  slots,
  selectedSlot,
  onSelectSlot,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Select Consultation Time (IST)
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
        {slots.map((slot) => {
          const isSelected = selectedSlot === slot.time;
          return (
            <button
              key={slot.time}
              type="button"
              disabled={!slot.available}
              onClick={() => onSelectSlot(slot.time)}
              className={`p-3 rounded-xl text-xs font-bold transition-all duration-200 text-center flex items-center justify-center gap-1.5 ${
                !slot.available
                  ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed line-through"
                  : isSelected
                  ? "bg-[#0B1B3D] text-[#D4AF37] border-2 border-[#D4AF37] shadow-md"
                  : "bg-white text-slate-800 border border-slate-200 hover:border-[#D4AF37]"
              }`}
            >
              <Clock className={`w-3.5 h-3.5 ${isSelected ? "text-[#D4AF37]" : "text-slate-400"}`} />
              <span>{slot.time}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
