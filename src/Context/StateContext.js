import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const useStateContext = () => useContext(StateContext);

export const StateProvider = ({ children }) => {
  const [timesheetData, setTimesheetData] = useState([]);
  const [modalState, setModalState] = useState({ isOpen: false });

  const value = {
    timesheetData,
    setTimesheetData,
    modalState,
    setModalState,
  };

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};
