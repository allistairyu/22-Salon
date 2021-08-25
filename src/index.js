import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
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
    <Route path="/22-Salon" component={App} />
    <Route path='/22-Salon/admin' component={AdminView} />
    <Route path="/22-Salon/about" component={About} />
    <Route path="/22-Salon/appointment" component={BookAppointment} />
    {/* <Route path="/appointment/:id" component={Success} /> */}
    <Route path="/22-Salon/services" component={Services} />
    <Route path="/22-Salon/locationandhours" component={LocationHours} />
    <Route path="*" component={NotFound} />
  </Router>
);

ReactDOM.render(
  <Routes history={browserHistory} />,
  document.getElementById('root')
);
