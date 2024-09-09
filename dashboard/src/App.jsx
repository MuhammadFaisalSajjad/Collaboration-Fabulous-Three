// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Header from "./components/Header";
// import Sidebar from "./components/Sidebar";
// import Home from "./components/Home";
// import About from "./components/About";
// import Projects from "./components/Projects";
// import Footer from "./components/Footer";

// function App() {
//   return (
//     <React.Fragment>
//       <Router>
//         <div className="flex flex-col min-h-screen">
//           <Header />
//           <div className="flex flex-1">
//             {/* Sidebar becomes sticky */}
//             <Sidebar className="sticky top-0" />
//             <main className="flex-1 p-6 bg-gray-100">
//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/about" element={<About />} />
//                 <Route path="/projects" element={<Projects />} />
//               </Routes>
//             </main>
//           </div>
//           <Footer />
//         </div>
//       </Router>
//     </React.Fragment>
//   );
// }

// export default App;

// -----------------------------------------------------------------------------------------------------

// Web 3 type design

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-900 to-gray-800">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-8 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

// ------------------------------------------------------------------------------------------------------------

// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Header from "./components/Header";
// import Sidebar from "./components/Sidebar";
// import Home from "./components/Home";
// import About from "./components/About";
// import Projects from "./components/Projects";
// import Footer from "./components/Footer";

// function App() {
//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen bg-gray-100">
//         <Header />
//         <div className="flex flex-1">
//           <Sidebar />
//           <main className="flex-1 p-6 lg:p-12">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/about" element={<About />} />
//               <Route path="/projects" element={<Projects />} />
//             </Routes>
//           </main>
//         </div>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;
