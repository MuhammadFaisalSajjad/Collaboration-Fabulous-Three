// import React from "react";
// import { NavLink } from "react-router-dom";
// import { FaHome, FaUserAlt, FaProjectDiagram } from "react-icons/fa";

// function Sidebar() {
//   return (
//     <React.Fragment>
//       <aside className="bg-gray-800 text-white w-64 h-screen p-6 sticky top-0 shadow-lg">
//         <h2 className="text-2xl font-bold mb-8 text-center tracking-wide">
//           Dashboard
//         </h2>
//         <nav>
//           <ul className="space-y-6">
//             <li>
//               <NavLink
//                 to="/"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "flex items-center space-x-4 bg-blue-600 rounded-lg p-3 text-white shadow-md transition-transform transform hover:scale-105"
//                     : "flex items-center space-x-4 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg p-3 transition-transform transform hover:scale-105"
//                 }
//               >
//                 <FaHome className="text-xl" />
//                 <span className="text-lg">Home</span>
//               </NavLink>
//             </li>

//             <li>
//               <NavLink
//                 to="/about"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "flex items-center space-x-4 bg-blue-600 rounded-lg p-3 text-white shadow-md transition-transform transform hover:scale-105"
//                     : "flex items-center space-x-4 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg p-3 transition-transform transform hover:scale-105"
//                 }
//               >
//                 <FaUserAlt className="text-xl" />
//                 <span className="text-lg">About Me</span>
//               </NavLink>
//             </li>

//             <li>
//               <NavLink
//                 to="/projects"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "flex items-center space-x-4 bg-blue-600 rounded-lg p-3 text-white shadow-md transition-transform transform hover:scale-105"
//                     : "flex items-center space-x-4 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg p-3 transition-transform transform hover:scale-105"
//                 }
//               >
//                 <FaProjectDiagram className="text-xl" />
//                 <span className="text-lg">Projects</span>
//               </NavLink>
//             </li>
//           </ul>
//         </nav>
//       </aside>
//     </React.Fragment>
//   );
// }

// export default Sidebar;

// -----------------------------------------------------------------------------------------------------

// Web 3type design

import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUserAlt, FaProjectDiagram } from "react-icons/fa";

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

// ------------------------------------------------------------------------------------------------------------

// import React from "react";
// import { NavLink } from "react-router-dom";
// import { FaHome, FaUserAlt, FaProjectDiagram } from "react-icons/fa";

// function Sidebar() {
//   return (
//     <aside className="bg-white shadow-md w-64 h-screen p-6">
//       <h2 className="text-2xl font-semibold mb-8 text-gray-900">Menu</h2>
//       <nav>
//         <ul className="space-y-4">
//           {[
//             { to: "/", icon: <FaHome />, label: "Home" },
//             { to: "/about", icon: <FaUserAlt />, label: "About" },
//             { to: "/projects", icon: <FaProjectDiagram />, label: "Projects" },
//           ].map((item) => (
//             <li key={item.to}>
//               <NavLink
//                 to={item.to}
//                 className={({ isActive }) =>
//                   `flex items-center space-x-4 p-3 rounded-lg transition-transform transform hover:scale-105 ${
//                     isActive
//                       ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white"
//                       : "text-gray-700 hover:bg-gray-200"
//                   }`
//                 }
//               >
//                 {item.icon}
//                 <span className="text-lg font-medium">{item.label}</span>
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </aside>
//   );
// }

// export default Sidebar;
