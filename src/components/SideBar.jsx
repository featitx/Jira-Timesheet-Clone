import React from 'react';
import { FiCheckCircle, FiClipboard, FiUser, FiSettings, FiHelpCircle } from 'react-icons/fi';
import { TbCalendarTime } from 'react-icons/tb';
import { FaQuestionCircle } from "react-icons/fa";



const SideBar = () => {
  const menuItems = [
    { icon: <TbCalendarTime />, label: 'Tasks' },
    { icon: <FiUser />, label: 'People' },
    { icon: <FiSettings />, label: 'Settings' },
  ];

  return (
    <aside className=" w-16 h-screen sticky top-0 flex flex-col items-center py-4 space-y-6 bg-[#F4F5F7] text-customBlue">
     

      {/*Logo*/}
      <img
        src="src\Assets\Images\sidebar_img_1.png"
        alt="User Avatar"
        className="w-[32px] h-[23.1px]"
      />

      {/* Menu Icons */}
      <nav className="flex-1 flex flex-col space-y-4 mt-6">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-center items-center w-full p-2 rounded-lg icon_Bg hover:bg-gray-300 cursor-pointer"
            title={item.label}
          >
            <span className="text-xl">{item.icon}</span>
          </div>
        ))}
      </nav>

      {/* Help/Support Icon */}
      <div
        className=" aside_bg p-2 pb-20 w-10 h-10 rounded-lg cursor-pointer flex justify-center items-center"
        title="Help & Support"
      >
        <FaQuestionCircle className="text-xl" />
      </div>
    </aside>
  );
};

export default SideBar;
