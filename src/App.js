import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Video, Call } from "./components";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomid" element={<Video />} />
        <Route path="/call/:callid" element={<Call />} />
      </Routes>
    </div>
  );
}
