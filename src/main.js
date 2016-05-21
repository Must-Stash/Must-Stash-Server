'use strict';

const React           = require('react'),
      ReactDOM        = require('react-dom'),
      Router          = require('react-router').Router,
      Route           = require('react-router').Router,
      browserHistory  = require('react-router').browserHistory,
      LandingPage     = require('./LandingPage/landing.js'),
      DataVisualPage  = require('./DataVisualPage/datavis.js'),
      AboutPage       = require('./AboutPage/about.js')
      ;


  ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/" component={LandingPage}></Route>
      <Route path="/mySearch" component={DataVisualPage}></Route>
      <Route path="/about" component={AboutPage}></Route>
    </Router>,
    document.getElementById('App')
  )