import Navbar from "./components/shared/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// import Jobs from "./pages/Jobs";
// import Browse from "./pages/Browse";
// import JobDetails from "./pages/JobDetails";

function App() {
  return (

    <div className=" mx-auto ">
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
       {/*<Route path="/jobs" element={<Jobs />} />
         <Route path="/browse" element={<Browse />} />
        <Route path="/jobs/:id" element={<JobDetails />} /> */}
      </Routes>

    </div>
  );
}

export default App;
