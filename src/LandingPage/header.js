'use strict';

const React       = require('react');
const styles      = require('./header_styles.scss');
const FontAwesome = require('react-fontawesome');

const Header = React.createClass({

  handleSubmit: function(event) {
    event.preventDefault();
    console.log('HERE', this.refs['searchBar'].value)
    this.props.loadDataFromServer(this.refs['searchBar'].value)
  },
  render: function() {

    var header;

    console.log('this.props.hasResults', this.props.hasResults);

    if(!this.props.hasResults){
      header = (
        <div>
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

    else {
      header = (
        <div className="searchingHeader">
          <img src="./images/horizonal-blue-elephant.svg" />
          <form onSubmit={this.handleSubmit}>
            <input
              className="search-form-small"
              type="text"
              placeholder="Search"
              ref="searchBar"
            />
          </form>
        </div>
      )
    }

    return (
      <div className="Header">
        {header}
      </div>
    )
  }
})

module.exports = Header;

