
import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default class App extends Component {
  pageSize = 15;
  apikey=process.env.REACT_APP_NEWAPI_KEY
  render() {
    return (
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<News key="general" apikey={this.apikey} pageSize={this.pageSize} category="general" />} />
          <Route path="/business" element={<News key="business" apikey={this.apikey} pageSize={this.pageSize} category="business" />} />
          <Route path="/entertainment" element={<News key="entertainment" apikey={this.apikey} pageSize={this.pageSize} category="entertainment" />} />
          <Route path="/health" element={<News key="health" apikey={this.apikey} pageSize={this.pageSize} category="health" />} />
          <Route path="/science" element={<News key="science" apikey={this.apikey} pageSize={this.pageSize} category="science" />} />
          <Route path="/sports" element={<News key="sports" apikey={this.apikey} pageSize={this.pageSize} category="sports" />} />
          <Route path="/technology" element={<News key="technology" apikey={this.apikey} pageSize={this.pageSize} category="technology" />} />
          
        </Routes>
      </Router>
    );
  }
}
