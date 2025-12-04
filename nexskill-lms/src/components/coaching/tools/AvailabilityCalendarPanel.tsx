import React, { useState } from 'react';

interface TimeSlot {
  time: string;
  available: boolean;
  booked: boolean;
}

interface DayAvailability {
  day: string;
  slots: TimeSlot[];
}

interface AvailabilityCalendarPanelProps {
  availabilityConfig: DayAvailability[];
  onChange: (updatedConfig: DayAvailability[]) => void;
}

const AvailabilityCalendarPanel: React.FC<AvailabilityCalendarPanelProps> = ({
  availabilityConfig,
  onChange,
}) => {
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');

  const toggleSlot = (dayIndex: number, slotIndex: number) => {
    const newConfig = [...availabilityConfig];
    newConfig[dayIndex].slots[slotIndex].available = !newConfig[dayIndex].slots[slotIndex].available;
    onChange(newConfig);
  };

  const getSlotColor = (available: boolean) => {
    return available
      ? 'bg-[#E0E5FF] text-[#304DB5] border-[#304DB5]'
      : 'bg-gray-100 text-gray-400 border-gray-200';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-[#111827]">Availability Calendar</h3>
          <p className="text-sm text-[#5F6473] mt-1">
            Configure your coaching availability by clicking time slots
          </p>
        </div>
        {/* View Toggle */}
        <div className="flex gap-1 bg-[#F5F7FF] rounded-lg p-1">
          <button
            onClick={() => setViewMode('week')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              viewMode === 'week'
                ? 'bg-white text-[#304DB5] shadow-sm'
                : 'text-[#5F6473] hover:text-[#304DB5]'
            }`}
          >
            Week view
          </button>
          <button
            onClick={() => setViewMode('day')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              viewMode === 'day'
                ? 'bg-white text-[#304DB5] shadow-sm'
                : 'text-[#5F6473] hover:text-[#304DB5]'
            }`}
          >
            Day view
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 p-4 bg-[#F5F7FF] rounded-xl">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#E0E5FF] border-2 border-[#304DB5]" />
          <span className="text-sm text-[#5F6473]">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-100 border-2 border-gray-200" />
          <span className="text-sm text-[#5F6473]">Unavailable</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#22C55E] border-2 border-[#22C55E]" />
          <span className="text-sm text-[#5F6473]">Booked (example)</span>
        </div>
      </div>

      {/* Week Grid */}
      <div className="bg-white rounded-2xl border border-[#EDF0FB] p-6 overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header Row */}
          <div className="grid grid-cols-8 gap-3 mb-4">
            <div className="text-xs font-semibold text-[#5F6473] uppercase">Time</div>
            {availabilityConfig.map((dayConfig) => (
              <div key={dayConfig.day} className="text-center">
                <div className="text-sm font-bold text-[#111827]">{dayConfig.day}</div>
              </div>
            ))}
          </div>

          {/* Time Slots Grid */}
          <div className="space-y-3">
            {availabilityConfig[0].slots.map((_, slotIndex) => (
              <div key={slotIndex} className="grid grid-cols-8 gap-3">
                {/* Time Label */}
                <div className="flex items-center text-sm font-medium text-[#5F6473]">
                  {availabilityConfig[0].slots[slotIndex].time}
                </div>

                {/* Day Slots */}
                {availabilityConfig.map((dayConfig, dayIndex) => {
                  const slot = dayConfig.slots[slotIndex];
                  const slotColor = slot.booked
                    ? 'bg-[#22C55E] border-[#22C55E]'
                    : getSlotColor(slot.available);
                  return (
                    <button
                      key={`${dayIndex}-${slotIndex}`}
                      onClick={() => !slot.booked && toggleSlot(dayIndex, slotIndex)}
                      disabled={slot.booked}
                      className={`h-12 rounded-lg border-2 transition-all hover:scale-105 ${slotColor} ${
                        slot.booked ? 'cursor-not-allowed opacity-70' : ''
                      }`}
                    >
                      <span className="sr-only">
                        {dayConfig.day} at {slot.time}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-[#EDF0FB] p-4">
          <div className="text-2xl font-bold text-[#304DB5] mb-1">
            {availabilityConfig.reduce(
              (total, day) => total + day.slots.filter((s) => s.available).length,
              0
            )}
          </div>
          <p className="text-xs text-[#5F6473]">Available slots this week</p>
        </div>
        <div className="bg-white rounded-xl border border-[#EDF0FB] p-4">
          <div className="text-2xl font-bold text-[#5F6473] mb-1">
            {availabilityConfig.reduce(
              (total, day) => total + day.slots.filter((s) => !s.available).length,
              0
            )}
          </div>
          <p className="text-xs text-[#5F6473]">Unavailable slots</p>
        </div>
        <div className="bg-white rounded-xl border border-[#EDF0FB] p-4">
          <div className="text-2xl font-bold text-[#22C55E] mb-1">0</div>
          <p className="text-xs text-[#5F6473]">Booked slots</p>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendarPanel;
