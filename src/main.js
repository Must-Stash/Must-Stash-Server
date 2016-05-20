  'use strict';

const React       = require('react'),
      ReactDOM    = require('react-dom'),
      LandingPage = require('./landing/landing.js'),
      DataVis     = require('./datavis/datavis.js'),
      About       = require('./about/about.js')
      ;


  ReactDOM.render(
    <LandingPage />,
    <DataVis />,
    <About />,
    document.getElementById('App')
    )