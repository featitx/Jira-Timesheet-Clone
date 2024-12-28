import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DateRangePicker = ({ isOpen, onClose, onApply }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const generateCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const prevDays = Array.from({ length: startingDay }, (_, i) => ({
      date: new Date(year, month - 1, prevMonthLastDay - startingDay + i + 1),
      isCurrentMonth: false
    }));

    const currentDays = Array.from({ length: totalDays }, (_, i) => ({
      date: new Date(year, month, i + 1),
      isCurrentMonth: true
    }));

    const remainingDays = 42 - (prevDays.length + currentDays.length);
    const nextDays = Array.from({ length: remainingDays }, (_, i) => ({
      date: new Date(year, month + 1, i + 1),
      isCurrentMonth: false
    }));

    return [...prevDays, ...currentDays, ...nextDays];
  };

  const handlePrevMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1));
  };

  const isInRange = (date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const handleDateClick = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date < startDate) {
        setStartDate(date);
        setEndDate(null);
      } else {
        setEndDate(date);
      }
    }
  };

  const handleDateHover = (date) => {
    if (startDate && !endDate) {
      setHoverDate(date);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-[700px]">
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
              <span className='text-gray-500'>Start Date</span>
            <div className="relative">
              <input
                type="text"
                className="w-full p-2 border rounded bg-gray-50 h-[40px]"
                value={formatDate(startDate)}
                readOnly
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </div>
          <div className="flex-1">
              <span className='text-gray-500'>End Date</span>
            <div className="relative">
              <input
                type="text"
                className="w-full p-2 border rounded bg-gray-50 h-[40px]"
                value={formatDate(endDate)}
                readOnly
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="flex-grow grid grid-cols-2 gap-8">
            {[0, 1].map(offset => {
              const currentMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + offset);
              return (
                <div key={offset} className="w-full">
                  <div className="mb-4 flex items-center justify-between">
                    {offset === 0 && (
                      <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                    )}

                     

                    <span className="text-sm font-semibold text-gray-700">
                      {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </span>
                    
                    {offset === 1 && (
                      <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                   
                  </div>
                  <div className="grid grid-cols-7 text-center">
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                      <div key={day} className="text-xs text-gray-500 py-2">{day}</div>
                    ))}
                    {generateCalendarDays(currentMonth).map((day, index) => {
                      const isSelected = (startDate && day.date.getTime() === startDate.getTime()) ||
                        (endDate && day.date.getTime() === endDate.getTime());
                      const isRangeDate = startDate && !endDate ? 
                        (hoverDate && day.date >= startDate && day.date <= hoverDate) :
                        isInRange(day.date);

                      return (
                        <button
                          key={index}
                          className={`
                            aspect-square p-2 text-sm relative
                            ${!day.isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
                            ${isSelected ? 'bg-gray-300 text-black rounded' : ''}
                            ${isRangeDate && !isSelected ? 'bg-blue-50' : ''}
                            hover:bg-gray-100
                          `}
                          onClick={() => handleDateClick(day.date)}
                          onMouseEnter={() => handleDateHover(day.date)}
                        >
                          {day.date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-44 border-l pl-4 flex flex-col gap-2">
            <button className="text-sm text-blue-600 hover:bg-blue-50 px-3 py-2 rounded text-left">
              Current week
            </button>
            <button className="text-sm text-blue-600 hover:bg-blue-50 px-3 py-2 rounded text-left">
              Last week
            </button>
            <button className="text-sm text-blue-600 hover:bg-blue-50 px-3 py-2 rounded text-left">
              Current month
            </button>
            <button className="text-sm text-blue-600 hover:bg-blue-50 px-3 py-2 rounded text-left">
              Last month
            </button>
            <button className="text-sm text-blue-600 hover:bg-blue-50 px-3 py-2 rounded text-left">
              Current quarter
            </button>
            <button className="text-sm text-blue-600 hover:bg-blue-50 px-3 py-2 rounded text-left">
              Last quarter
            </button>
            <div className="mt-2 flex items-center gap-2">
              <input type="text" className="w-16 p-2 border rounded text-sm" placeholder="7" />
              <span className="text-sm text-gray-600">Days</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => onApply(startDate, endDate)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
