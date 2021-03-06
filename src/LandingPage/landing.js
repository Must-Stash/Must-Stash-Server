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
        query: '',
        hasResults: false
      };
  },
  loadDataFromServer: function(query) {
    $.ajax({
      url: "/api/search?q=" + encodeURIComponent(query),
      method: 'GET',
      cache: false,
      success: function(data) {
        this.setState({
          urlList: data.success
        });
        if(data.success.length > 0){
          this.setState({
            hasResults: true
          });
          console.log('this.state.hasResults', this.state.hasResults);
        }
        console.log('data', data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("Error");
      }.bind(this),
    })
  },

  render: function() {

    if(window.location.hash){
      var hash = window.location.hash.substring(1);
      var query = decodeURIComponent(hash);
      this.setState({
        query: query
      })

      this.loadDataFromServer(query);

      window.location.hash = "";
    }

    return (
      <div>
        <Header hasResults={this.state.hasResults} loadDataFromServer={this.loadDataFromServer} />
        <List hasResults={this.state.hasResults} list={this.state.urlList} />
      </div>
    )
  }
})

module.exports = LandingPage;

