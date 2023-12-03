import Navbar from "./components/main/Navbar";
import HomePage from "./components/pages/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Statics from "./components/pages/Statics";
import LiveStream from "./components/pages/LiveStream";
export function App() {
  return (
    <div className="flex flex-col max-w-7xl h-full mx-auto">
      <BrowserRouter>
        <Navbar />
        <div className="h-full flex items-center justify-center">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cameras" element={<Statics />} />
            <Route path="/live" element={<LiveStream />} />
            <Route path="/contact" element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
