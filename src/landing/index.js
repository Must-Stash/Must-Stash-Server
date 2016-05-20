'use strict';

const React       = require('react'),
      ReactDOM    = require('react-dom'),
      Nav         = require('./nav.js'),
      Header      = require('./header.js')
      ;

const AppPage = React.createClass({

  render: function() {

    return (
      <h1> Hello World </h1>

      )

  }

})

  ReactDOM.render(
    <AppPage />,
    document.getElementById('AppPage')

    )