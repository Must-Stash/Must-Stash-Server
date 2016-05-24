'use strict';

const React = require('react')
const styles = require('./header_styles.scss')

const Header = React.createClass({

  handleSubmit: function(event) {
    event.preventDefault();
    console.log('HERE', this.refs['searchBar'].value)
    this.props.loadDataFromServer(this.refs['searchBar'].value)
  },
  render: function() {
    return (
      <div className="Header">
        <img className="mainPageImage" src="/images/large-blue.svg" />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Enter Search Items"
            ref="searchBar"
          />
          <button id="searchBtn">Search</button>
        </form>
      </div>
    )
  }
})

module.exports = Header;

