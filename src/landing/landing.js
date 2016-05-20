'use strict';

const React       = require('react'),
      $           = require('jquery'),
      Nav         = require('./nav.js'),
      Header      = require('./header.js'),
      List      = require('./list.js')
      ;

const LandingPage = React.createClass({

  getInitialState: function() {
      return {
        urlList: []
      };
  },

  loadDataFromServer: function() {
    $.ajax({
      url: "http://127.0.0.1:3000/api/search?q=" + encodeURIComponent('cats'),
      method: 'GET',
      cache: false,
      success: function(data) {
        this.setState({
          urlList: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("Error")
      }.bind(this)
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

