'use strict';

const React       = require('react'),
      $           = require('jquery'),
      List        = require('./list.js'),
      Nav         = require('./nav.js'),
      Header      = require('./header.js')
      ;

const LandingPage = React.createClass({
  getInitialState: function() {
      return {
        urlList: [],
        query: ''
      };
  },

  loadDataFromServer: function(query) {
    console.log('query', query);
    $.ajax({
      url: "/api/search?q=" + encodeURIComponent(query),
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

  render: function() {

    return (
      <div>
        <Nav />
        <Header loadDataFromServer={this.loadDataFromServer}/>
        <List list={this.state.urlList} />
      </div>
    )
  }
})

module.exports = LandingPage;

