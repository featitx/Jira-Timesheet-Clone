import React from "react";

const generateDateRange = () => {
  const start = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
  const dates = [];

  while (start <= end) {
    const day = start.getDate();
    const month = start.getMonth() + 1;
    const year = start.getFullYear();
    const weekday = start
      .toLocaleString("en-us", { weekday: "short" })
      .toUpperCase();
    dates.push({ day, month, year, weekday });
    start.setDate(start.getDate() + 1);
  }

  return dates;
};

const TimeSheetTable = ({ timesheetData }) => {
  const calculateTotalHours = (logs) =>
    logs.reduce((total, log) => total + log.hours, 0);

  const dateRange = generateDateRange();

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white">
              <th
                className="border-y border-r border-gray-200 p-3 text-left font-normal text-sm sticky left-0 bg-white z-10 min-w-[250px]"
                style={{
                  borderLeft: "none", 
                }}
              >
                Issue
              </th>
              <th className="border border-gray-200 p-3 text-left font-normal text-sm min-w-[80px]">
                Logged
              </th>
              {dateRange.map(({ day, month, year, weekday }) => {
                const isToday =
                  day === new Date().getDate() &&
                  month === new Date().getMonth() + 1 &&
                  year === new Date().getFullYear();

                return (
                  <th
                    key={day}
                    className="border border-gray-200 p-2 text-center font-normal text-xs min-w-[40px]"
                  >
                    <div className="text-gray-600">{weekday}</div>
                    <div
                      className={`text-sm ${
                        isToday
                          ? "bg-blue-100 text-blue-500 font-normal rounded-[50%_50%/43%] px-2 py-1 border border-blue-500"
                          : ""
                      }`}
                    >
                      {day}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {timesheetData.map((entry, index) => (
              <tr key={index} className="group hover:bg-[#E9F2FF]">
                <td
                  className="border-y border-r border-gray-200 p-3 sticky left-0 bg-white z-10 group-hover:bg-[#E9F2FF]"
                  style={{
                    borderLeft: "none", 
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <img
                        src="https://res.cloudinary.com/dccqtnvxq/image/upload/v1735458283/jira/rvqilucg1sajjbfn9yvq.png"
                        alt="Lightning bolt"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm font-medium">
                        {entry.issue}
                        <span className="text-gray-500 text-sm font-normal">
                          {" "}
                          Issue summary
                        </span>
                      </span>
                    </div>
                  </div>
                </td>
                <td className="border border-gray-200 p-3 text-center text-sm font-semibold">
                  {calculateTotalHours(entry.logs).toFixed(1)}
                </td>
                {dateRange.map(({ day, month, year }) => {
                  const log = entry.logs.find((log) => {
                    const logDate = new Date(log.date);
                    return (
                      logDate.getDate() === day &&
                      logDate.getMonth() + 1 === month &&
                      logDate.getFullYear() === year
                    );
                  });
                  return (
                    <td
                      key={day}
                      className="border border-gray-200 p-3 text-center text-sm"
                    >
                      {log ? `${log.hours.toFixed(1)}` : ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-white font-medium">
              <td
                className="border-y border-r border-gray-200 p-3 sticky left-0 bg-white z-10 text-sm"
                style={{
                  borderLeft: "none", 
                }}
              >
                Total
              </td>
              <td className="border border-gray-200 p-3 text-center text-sm">
                {timesheetData
                  .reduce(
                    (total, entry) => total + calculateTotalHours(entry.logs),
                    0
                  )
                  .toFixed(1)}
              </td>
              {dateRange.map(({ day, month, year }) => (
                <td
                  key={day}
                  className="border border-gray-200 p-3 text-center text-sm"
                >
                  {timesheetData
                    .reduce((total, entry) => {
                      const log = entry.logs.find((log) => {
                        const logDate = new Date(log.date);
                        return (
                          logDate.getDate() === day &&
                          logDate.getMonth() + 1 === month &&
                          logDate.getFullYear() === year
                        );
                      });
                      return total + (log ? log.hours : 0);
                    }, 0)
                    .toFixed(1)}
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default TimeSheetTable;
