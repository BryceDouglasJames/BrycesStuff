import React from 'react';

/*--------COMPONENTS--------*/
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';

/*--------STYLES--------*/
import './App.css';

/*--------PAGES--------*/
import { About } from './pages/About';
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Navbar></Navbar>
            <Home></Home>
          </Route>
          <Route exact path="/about">
            <Navbar></Navbar>
            <About></About>
          </Route>
          <Route exact path="*">
            <Navbar></Navbar>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
