import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUserAlt, FaProjectDiagram, FaBriefcase, FaLaptop  } from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="bg-gradient-to-b from-gray-900 to-gray-800 text-white w-64 h-screen p-6 shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-center">Menu</h2>
      <nav>
        <ul className="space-y-4">
          {[
            { to: "/", icon: <FaHome />, label: "Home" },
            { to: "/about", icon: <FaUserAlt />, label: "About" },
            { to: "/projects", icon: <FaProjectDiagram />, label: "Projects" },
            { to: "/experience", icon: <FaBriefcase />, label: "Experience" },
            { to: "/service", icon: <FaLaptop  />, label: "Service" },
          ].map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center space-x-4 bg-gradient-to-r from-teal-500 to-cyan-500 p-3 rounded-lg shadow-lg text-white transition-transform transform hover:scale-105"
                    : "flex items-center space-x-4 hover:bg-gradient-to-r from-teal-600 to-cyan-600 p-3 rounded-lg transition-transform transform hover:scale-105"
                }
              >
                {item.icon}
                <span className="text-lg font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
