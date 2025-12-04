import React, { useState } from 'react';

interface TimeSlot {
  time: string;
  available: boolean;
  fewLeft?: boolean;
}

interface AvailableDay {
  date: string;
  label: string;
  weekday: string;
  dayNumber: number;
  slots: TimeSlot[];
}

interface TimeSlotPickerProps {
  availableDays: AvailableDay[];
  selectedDate?: string;
  selectedSlot?: string;
  onChange: (date: string, slot: string) => void;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  availableDays,
  selectedDate: initialDate,
  selectedSlot: initialSlot,
  onChange,
}) => {
  const [selectedDate, setSelectedDate] = useState(initialDate || availableDays[0]?.date || '');
  const [selectedSlot, setSelectedSlot] = useState(initialSlot || '');

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(''); // Reset slot when date changes
  };

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
    onChange(selectedDate, slot);
  };

  const currentDay = availableDays.find((day) => day.date === selectedDate);

  return (
    <div className="space-y-4">
      {/* Date selector */}
      <div>
        <h4 className="text-sm font-semibold text-slate-900 mb-3">Select a date</h4>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {availableDays.map((day) => (
            <button
              key={day.date}
              onClick={() => handleDateSelect(day.date)}
              className={`flex-shrink-0 flex flex-col items-center justify-center w-20 py-3 rounded-2xl font-medium transition-all ${
                selectedDate === day.date
                  ? 'bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <div className="text-xs mb-1">{day.weekday}</div>
              <div className="text-lg font-bold">{day.dayNumber}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Time slots */}
      {currentDay && (
        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-3">Available times</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {currentDay.slots.map((slot, index) => (
              <button
                key={index}
                onClick={() => slot.available && handleSlotSelect(slot.time)}
                disabled={!slot.available}
                className={`relative py-3 px-4 rounded-full font-medium text-sm transition-all ${
                  selectedSlot === slot.time
                    ? 'bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white shadow-md'
                    : slot.available
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    : 'bg-slate-50 text-slate-400 cursor-not-allowed'
                }`}
              >
                {slot.time}
                {slot.fewLeft && slot.available && selectedSlot !== slot.time && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-orange-500 text-white text-[10px] font-semibold rounded-full">
                    Few left
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected summary */}
      {selectedDate && selectedSlot && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-center gap-2 text-sm text-green-700">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">
              Selected: {currentDay?.label} at {selectedSlot}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSlotPicker;
