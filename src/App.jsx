import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <Routes>
      {/* Layout Route */}
      <Route path="/" element={<MainLayout />}>
        
        {/* Nested routes */}
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />

      </Route>
    </Routes>
  );
}

export default App;