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

const servicesDict = {
  'mensHaircut': ["Men's Haircut", 15],
  'womensHaircut': ["Women's Haircut", 18],
  'seniorKids': ["Seniors & Kids 11 and Under", 10],
  'beardTrim': ["Beard Trim", 5],
  'permAndColor': ["Perm & Color Start", 60],
  'styleStart': ["Style Starting", 25],
  'shampoo': ["Shampoo Only", 5],
  'pedicure': ["Pedicure", 28],
  'manicure': ["Manicure", 15],
  'pediMani': ["Pedi Mani", 40],
  'fullSet': ["Full Set", 28],
  'fill': ["Fill", 18],
  'eyebrow': ["Eyebrow Wax", 10],
  'lips': ["Lips", 5],
  'chin': ["Chin", 8]
}

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path='/admin' component={AdminView} />
    <Route path="/about" component={About} />
    <Route path="/appointment" component={BookAppointment} />
    <Route path="/services" component={Services} />
    <Route path="/locationandhours" component={LocationHours} />
    <Route path="*" component={NotFound} />
  </Router>
);

ReactDOM.render(
  <Routes history={browserHistory} />,
  document.getElementById('root')
);
