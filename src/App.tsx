import React, { useEffect, useState } from 'react';

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
import { Footer } from './pages/Footer';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function App(): JSX.Element {

  const [getScrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);
    //console.log(getScrollPosition);
    let inner = getWindowDimensions().height;
    let num = new Number(getScrollPosition / ((document.body.offsetHeight - inner)));
    document.body.style.setProperty('--scroll', num.toString());
    return () => window.removeEventListener('scroll', handleScroll);
  }, [getScrollPosition]);
  return (

    <>
      <div className='w-screen mb-auto p-auto' style={{ backgroundColor: "#171717" }}>
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
          <Footer></Footer>
        </Router>
      </div>
    </>
  );
}
