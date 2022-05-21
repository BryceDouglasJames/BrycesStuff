import React from 'react';

/*--------COMPONENTS--------*/
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';

/*--------STYLES--------*/
import './App.css';
import './index.css';

/*--------PAGES--------*/
import { About } from './pages/About';
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound';
import { ProjectsList } from './pages/Projects_List'

export default function App() {
  return (
    <div className='w-screen' style={{ backgroundColor: "#171717" }}>
      <div className="constructionMarquee grid grid-cols-2 m-auto h-center text-center">
        <h3 className="font-serif">WARNING: THIS SITE IS UNDER CONSTRUCTION</h3>
        <img className='mx-2 align-middle m-auto' src='https://stryvemarketing.com/wp-content/uploads/2016/04/image.gif' alt='construction' height="75px" width="100px"></img>
      </div>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}>
          </Route>
          <Route path="/projects" element={<ProjectsList></ProjectsList>}>
          </Route>
          <Route path="/about" element={<About></About>}>
          </Route>
          <Route path="*" element={<NotFound />}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
