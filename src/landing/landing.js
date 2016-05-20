'use strict';

const React       = require('react'),
      $           = require('jquery'),
      List      = require('./list.js'),
      Nav         = require('./nav.js'),
      Header      = require('./header.js')
      ;

const LandingPage = React.createClass({

  getInitialState: function() {
      return {
        urlList: []
      };
  },

  loadDataFromServer: function() {
    // var uri = "http://www.codeacademy.com";
    $.ajax({
      url: "/api/search?q=" + encodeURIComponent('cat'),
      method: 'GET',
      cache: false,
      success: function(data) {
        console.log('data', data);
        this.setState({
          urlList: data.success
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("Error");
      }.bind(this),
    })
  },
  componentDidMount: function() {
    this.loadDataFromServer();
  },


  render: function() {

    return (
      <div>
        <h1> Landing Page</h1>
        <Nav />
        <Header />
        <List list={this.state.urlList} />
      </div>

      )

  }

})

module.exports = LandingPage;

