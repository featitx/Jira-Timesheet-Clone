import React, { useState, useEffect } from "react";
import { Search, Calendar, Clock, FileText } from "lucide-react";
import jsonData from "../Assets/data.json";

const LogTimeModal = ({ isOpen, onClose }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeLog, setTimeLog] = useState({
    searchIssue: "",
    selectedIssue: "",
    date: "",
    hours: "",
    description: "",
  });

  useEffect(() => {
    if (isOpen) {
      setTimeLog({
        searchIssue: "",
        selectedIssue: "",
        date: formatDate(new Date()),
        hours: "",
        description: "",
      });
    }
  }, [isOpen]);

  // Handle search functionality with debounce
  useEffect(() => {
    if (timeLog.searchIssue.trim() === "") {
      setSearchResults([]);
      return;
    }

    const searchTerm = timeLog.searchIssue.toLowerCase();
    const results = jsonData.filter(item =>
      item.issue.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [timeLog.searchIssue]);

  const handleSelectIssue = issue => {
    setTimeLog(prev => ({
      ...prev,
      searchIssue: issue,
      selectedIssue: issue,
    }));
    setSearchResults([]);
  };

  const generateCalendarDates = date => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDay = firstDay.getDay();
    const monthLength = lastDay.getDate();

    const weeks = [];
    let week = new Array(7).fill(null);
    let day = 1;

    for (let i = startingDay; i < 7 && day <= monthLength; i++) {
      week[i] = new Date(year, month, day++);
    }
    weeks.push(week);

    week = new Array(7).fill(null);
    let weekDay = 0;
    while (day <= monthLength) {
      week[weekDay] = new Date(year, month, day++);
      if (weekDay === 6) {
        weeks.push(week);
        week = new Array(7).fill(null);
        weekDay = 0;
      } else {
        weekDay++;
      }
    }
    if (weekDay > 0) weeks.push(week);

    return weeks;
  };

  const handleDateSelect = date => {
    if (date) {
      setSelectedDate(date);
      setTimeLog(prev => ({
        ...prev,
        date: formatDate(date),
      }));
      setShowDatePicker(false);
    }
  };

  const formatDate = date => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear().toString().slice(2);
    return `${day}/${month}/${year}`;
  };

  const handleSaveLog = () => {
    if (!timeLog.selectedIssue || !timeLog.date || !timeLog.hours) {
      alert("Please fill in all required fields");
      return;
    }

    const hours = parseFloat(timeLog.hours);
    const startTime = "09:00";
    const endHour = 9 + Math.floor(hours);
    const endMinutes = Math.round((hours % 1) * 60);
    const endTime = `${endHour.toString().padStart(2, "0")}:${endMinutes
      .toString()
      .padStart(2, "0")}`;

    const [day, month, year] = timeLog.date.split("/");
    const months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    const formattedDate = `20${year}-${months[month]}-${day}`;

    const newLog = {
      date: formattedDate,
      startTime,
      endTime,
      description: timeLog.description,
    };

    const issueIndex = jsonData.findIndex(
      item => item.issue === timeLog.selectedIssue
    );
    if (issueIndex !== -1) {
      const existingLogIndex = jsonData[issueIndex].logs.findIndex(
        log => log.date === formattedDate
      );

      if (existingLogIndex !== -1) {
        jsonData[issueIndex].logs[existingLogIndex] = newLog;
      } else {
        jsonData[issueIndex].logs.push(newLog);
      }

      console.log("Updated Data:", jsonData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[480px]">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Log time</h3>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              className="w-full p-2 pl-3 pr-10 border border-gray-200 rounded-md"
              value={timeLog.searchIssue}
              onChange={e =>
                setTimeLog({ ...timeLog, searchIssue: e.target.value })
              }
              placeholder="Search issues"
            />
            <Search
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />

            {searchResults.length > 0 && (
              <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto z-50">
                {searchResults.map(item => (
                  <div
                    key={item.issue}
                    className="p-2 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleSelectIssue(item.issue)}
                  >
                    {item.issue}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                className="w-full p-2 pl-3 pr-10 border border-gray-200 rounded-md"
                value={timeLog.date}
                onClick={() => setShowDatePicker(true)}
                readOnly
                placeholder="DD/MMM/YY"
              />
              <Calendar
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                size={20}
                onClick={() => setShowDatePicker(true)}
              />

              {showDatePicker && (
                <div className="absolute mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-2 z-50">
                  <div className="grid grid-cols-7 gap-1">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
                      <div
                        key={day}
                        className="text-center text-sm font-medium text-gray-600 p-1"
                      >
                        {day}
                      </div>
                    ))}
                    {generateCalendarDates(selectedDate).map(
                      (week, weekIndex) => (
                        <React.Fragment key={weekIndex}>
                          {week.map((date, dateIndex) => (
                            <button
                              key={dateIndex}
                              onClick={() => date && handleDateSelect(date)}
                              className={`p-1 text-sm rounded hover:bg-blue-50 ${
                                date ? "cursor-pointer" : "invisible"
                              } ${
                                date &&
                                date.toDateString() ===
                                  selectedDate.toDateString()
                                  ? "bg-blue-100"
                                  : ""
                              }`}
                            >
                              {date ? date.getDate() : ""}
                            </button>
                          ))}
                        </React.Fragment>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="relative flex-1">
              <input
                type="number"
                className="w-full p-2 pl-3 pr-10 border border-gray-200 rounded-md"
                value={timeLog.hours}
                onChange={e =>
                  setTimeLog({ ...timeLog, hours: e.target.value })
                }
                placeholder="0h"
                min="0"
                step="0.5"
              />
              <Clock
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              className="w-full p-2 pl-3 pr-10 border border-gray-200 rounded-md"
              value={timeLog.description}
              onChange={e =>
                setTimeLog({ ...timeLog, description: e.target.value })
              }
              placeholder="Description"
            />
            <FileText
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveLog}
            className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
          >
            Log time
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogTimeModal;
