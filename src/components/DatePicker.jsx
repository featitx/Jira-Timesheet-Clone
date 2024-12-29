import React, { useState } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import DateRangePicker from "./DateRangePicker";
import LogTimeModal from "./LogTimeModal";
import initialData from "../Assets/data.json";

const DatePicker = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [timesheetData, setTimesheetData] = useState(initialData);

  const handleDataUpdate = newLog => {
    setTimesheetData(prevData => {
      const updatedData = [...prevData];
      const issueIndex = updatedData.findIndex(
        item => item.issue === newLog.issue
      );

      if (issueIndex !== -1) {
        const existingLogIndex = updatedData[issueIndex].logs.findIndex(
          log => log.date === newLog.log.date
        );

        if (existingLogIndex !== -1) {
          updatedData[issueIndex].logs[existingLogIndex] = newLog.log;
        } else {
          updatedData[issueIndex].logs.push(newLog.log);
        }
      } else {
        updatedData.push({
          issue: newLog.issue,
          logs: [newLog.log],
        });
      }

      return updatedData;
    });
  };
  const handleDateRange = (startDate, endDate) => {
    console.log("Selected date range:", startDate, endDate);
    setIsDatePickerOpen(false);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
            <img
              src="https://res.cloudinary.com/dccqtnvxq/image/upload/v1735458284/jira/b0r8utw6oy17ncjzedol.jpg"
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-normal text-gray-900">Divya Shah</span>
        </div>
        <div className="flex items-center gap-2">
          <select className="px-3 py-1 border rounded-md text-sm h-8">
            <option>Days</option>
            <option>Weeks</option>
            <option>Months</option>
          </select>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm h-8 w-28"
          >
            Log time
          </button>
          <button className="p-1 text-gray-600 border rounded-md">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center border rounded-md h-8 text-sm">
          <button className="p-1 hover:bg-gray-100">
            <ChevronLeft size={20} />
          </button>
          <div
            className="px-3 py-1 border-x cursor-default"
            onClick={() => setIsDatePickerOpen(true)}
          >
            01/Jun/24 - 30/Jun/24
          </div>

          <button className="p-1 hover:bg-gray-100">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm text-gray-600">Group by</span>
          <select className="px-3 py-1 border rounded-md text-sm h-8">
            <option>Issues</option>
            <option>Projects</option>
            <option>Categories</option>
          </select>
        </div>
      </div>

      <LogTimeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDataUpdate={handleDataUpdate}
        timesheetData={timesheetData}
      />

      <DateRangePicker
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        onApply={handleDateRange}
      />
    </div>
  );
};

export default DatePicker;
