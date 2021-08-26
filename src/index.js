import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router';
import './index.css';
import { Router, Route } from 'react-router';

import App from './pages/App';
import About from './pages/About';
import NotFound from './pages/NotFound';
import BookAppointment from './pages/BookAppointment';
import Services from './pages/Services';
import LocationHours from './pages/LocationHours';
import AdminView from './pages/AdminView/index'
import Success from './pages/BookAppointment/Components/Success'

//TODO: route to id after appointment is reserved?
const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path='/admin' component={AdminView} />
    <Route path="/about" component={About} />
    <Route path="/appointment" component={BookAppointment}>
      <Route path="/appointment/:id" component={Success} />
    </Route>
    <Route path="/services" component={Services} />
    <Route path="/locationandhours" component={LocationHours} />
    <Route path="*" component={NotFound} />
  </Router>
);

ReactDOM.render(
  <Routes history={hashHistory} />,
  document.getElementById('root')
);