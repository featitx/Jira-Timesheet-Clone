import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import DatePicker from './components/DatePicker';
import TimeSheetTable from './components/TimeSheetTable';
import initialData from './Assets/data.json';


function App() {

  const [timesheetData, setTimesheetData] = useState(initialData);

  const handleDataUpdate = (newLog) => {
    setTimesheetData(prevData => {
      const updatedData = [...prevData];
      const issueIndex = updatedData.findIndex(item => item.issue === newLog.issue);
  
      if (issueIndex !== -1) {
        // Update existing issue
        const existingLogIndex = updatedData[issueIndex].logs.findIndex(
          log => log.date === newLog.log.date
        );
  
        if (existingLogIndex !== -1) {
          // Update existing log
          updatedData[issueIndex].logs[existingLogIndex] = newLog.log;
        } else {
          // Add new log
          updatedData[issueIndex].logs.push(newLog.log);
        }
      } else {
        // Add new issue with log
        updatedData.push({
          issue: newLog.issue,
          logs: [newLog.log]
        });
      }
  
      return updatedData;
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <div className="flex-1 overflow-y-auto ">    
          <main className="p-6">
            <DatePicker onDataUpdate={handleDataUpdate} />
            <TimeSheetTable timesheetData={timesheetData} />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
