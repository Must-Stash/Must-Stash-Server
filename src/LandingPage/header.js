'use strict';

const React       = require('react')
const styles      = require('./header_styles.scss')
const FontAwesome = require('react-fontawesome');

const Header = React.createClass({

  handleSubmit: function(event) {
    event.preventDefault();
    console.log('HERE', this.refs['searchBar'].value)
    this.props.loadDataFromServer(this.refs['searchBar'].value)
  },
  render: function() {
    return (
      <div className="Header">
        <div className="imageBlock">
          <img className="mainPageImage" src="/images/large-blue.svg" />
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            className="search-form"
            type="text"
            placeholder="Search Your History"
            ref="searchBar"
          />
        </form>
      </div>
    )
  }
})

module.exports = Header;

