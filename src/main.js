'use strict';

const React           = require('react'),
      ReactDOM        = require('react-dom'),
      Router          = require('react-router').Router,
      Route           = require('react-router').Router,
      IndexRoute      = require('react-router').IndexRoute,
      browserHistory  = require('react-router').browserHistory,
      LandingPage     = require('./LandingPage/landing.js'),
      DataVisualPage  = require('./DataVisualPage/datavis.js'),
      AboutPage       = require('./AboutPage/about.js'),
      Header          = require('./LandingPage/header.js'),
      Nav             = require('./LandingPage/nav.js')
      ;


  ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/" component={Nav}>
        <IndexRoute component={LandingPage} />
        <Route path="/mySearch" component={DataVisualPage}></Route>
        <Route path="/about" component={AboutPage}></Route>
      </Route>
    </Router>,
    document.getElementById('App')
  )