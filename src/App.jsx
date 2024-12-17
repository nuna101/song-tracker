import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLibrary from './Components/MainLibrary'
import AddSongPage from './Components/AddSongPage';
import TrackingPage from './Components/TrackingPage';
import EditPage from './Components/EditPage';

import './App.css'

function App() {
  

  return (
    <>
      <Router>
            <Routes>
                <Route path="/" element={<MainLibrary />} />
                <Route path="/addSongPage" element={<AddSongPage />} />
                <Route path="/trackingPage" element={<TrackingPage />} />
                <Route path="/editPage" element={<EditPage />} />
            </Routes>
        </Router>
    </>
  )
}

export default App
