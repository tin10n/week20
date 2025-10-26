import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './components/Search';
import Movie from './components/Movie';
import "./styles/main.css"

function App() {

  return (
   <Router>
      <Routes>
        <Route path="/" element={<Search/>} />
        <Route path="/movie/:id" element={<Movie/>} />
      </Routes>
    </Router>
  );
}

export default App
