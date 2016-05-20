'use strict';

const React       = require('react'),
      ReactDOM    = require('react-dom'),
      Nav         = require('./nav.js'),
      Header      = require('./header.js')
      ;

const AppPage = React.createClass({

  render: function() {

    return (
      <div>
        <h1> Hello World </h1>
        <Nav />
        <Header />

      </div>
      )

  }

})

  ReactDOM.render(
    <AppPage />,

    document.getElementById('AppPage')

    )