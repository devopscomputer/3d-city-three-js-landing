import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './screens/HomePage';
import ProjectPage from './screens/ProjectPage'; // Certifique-se de que o caminho esteja correto

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectPage />} />
      </Routes>
    </Router>
  );
};

export default App;
