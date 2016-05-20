'use strict';

const React       = require('react'),
      Nav         = require('./nav.js'),
      Header      = require('./header.js'),
      List      = require('./list.js')
      ;

const LandingPage = React.createClass({

  render: function() {

    return (
      <div>
        <h1> Landing Page</h1>
        <Nav />
        <Header />
        <List />
      </div>

      )

  }

})
module.exports = LandingPage;

