import React, { useState } from "react";
import { FiSearch, FiSettings } from "react-icons/fi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaQuestionCircle, FaBell } from "react-icons/fa";

const Navbar = () => {
  const Dropdown = (
    <RiArrowDropDownLine className="inline ml-1 text-gray-600 font-normal h-6 w-6" />
  );

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = menu => {
    setActiveDropdown(prev => (prev === menu ? null : menu));
  };

  const menuItems = [
    {
      label: "Your Work",
      links: [],
    },
    {
      label: "Projects",
      links: [
        { name: "Project 1", href: "#" },
        { name: "Project 2", href: "#" },
      ],
    },
    {
      label: "Filters",
      links: [
        { name: "Filter 1", href: "#" },
        { name: "Filter 2", href: "#" },
      ],
    },
    {
      label: "Dashboards",
      links: [
        { name: "Dashboard 1", href: "#" },
        { name: "Dashboard 2", href: "#" },
      ],
    },
    {
      label: "Apps",
      links: [
        { name: "App 1", href: "#" },
        { name: "App 2", href: "#" },
      ],
    },
    {
      label: "Peoples",
      links: [],
    },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center px-4 md:px-6 py-2 h-14">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="h-6 w-6 flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/dccqtnvxq/image/upload/v1735458283/jira/s6zss2m9hfezg3zuien7.svg"
                alt="menu"
                className="h-full w-auto"
              />
            </div>
            <div className="h-6 flex items-center">
              <img
                src="https://res.cloudinary.com/dccqtnvxq/image/upload/v1735458284/jira/d51stnxum7v1fcpphirn.png"
                alt="logo-Jira"
                className="h-full w-auto"
              />
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6 pl-6 text-gray-600 text-sm font-medium relative">
            {menuItems.map((item, index) => (
              <div key={index} className="relative">
                <button
                  onClick={() => toggleDropdown(item.label)}
                  className="hover:text-blue-500 focus:outline-none"
                >
                  {item.label}
                  {item.links.length > 0 && Dropdown}
                </button>
                {activeDropdown === item.label && item.links.length > 0 && (
                  <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                    {item.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.href}
                        className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-500"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 h-8">
              Create
            </button>
          </nav>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <div className="relative border-2 rounded border-gray-200">
            <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="pl-8 pr-4 py-1 rounded border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div className="flex items-center space-x-4">
            <FaBell className="text-gray-600 text-xl cursor-pointer hover:text-blue-500" />
            <FaQuestionCircle className="text-gray-600 text-xl cursor-pointer hover:text-blue-500" />
            <FiSettings className="text-gray-600 text-xl cursor-pointer hover:text-blue-500" />
            <img
              src="https://res.cloudinary.com/dccqtnvxq/image/upload/v1735458284/jira/b0r8utw6oy17ncjzedol.jpg"
              alt="Profile"
              className="rounded-full w-8 h-8"
            />
          </div>
        </div>

        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 hover:text-blue-500"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-sm absolute top-14 left-0 w-full px-4 py-2 space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative border-2 rounded border-gray-200 w-full">
              <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="pl-8 pr-4 py-1 rounded border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>
          </div>

          {menuItems.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => toggleDropdown(item.label)}
                className="w-full text-left py-2 text-gray-600 hover:text-blue-500"
              >
                {item.label}
                {item.links.length > 0 && Dropdown}
              </button>
              {activeDropdown === item.label && item.links.length > 0 && (
                <div className="ml-4 mt-2 space-y-2">
                  {item.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.href}
                      className="block text-gray-600 hover:bg-gray-100 hover:text-blue-500"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
            Create
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
