import './App.css';
import React from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  const pageSize = 15;
  const apikey = process.env.REACT_APP_NEWAPI_KEY;

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<News key="general" apikey={apikey} pageSize={pageSize} category="general" />} />
        <Route path="/business" element={<News key="business" apikey={apikey} pageSize={pageSize} category="business" />} />
        <Route path="/entertainment" element={<News key="entertainment" apikey={apikey} pageSize={pageSize} category="entertainment" />} />
        <Route path="/health" element={<News key="health" apikey={apikey} pageSize={pageSize} category="health" />} />
        <Route path="/science" element={<News key="science" apikey={apikey} pageSize={pageSize} category="science" />} />
        <Route path="/sports" element={<News key="sports" apikey={apikey} pageSize={pageSize} category="sports" />} />
        <Route path="/technology" element={<News key="technology" apikey={apikey} pageSize={pageSize} category="technology" />} />
      </Routes>
    </Router>
  );
};

export default App;
