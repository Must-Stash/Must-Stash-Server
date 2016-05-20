'use strict';

const React = require('react')

  const Header = React.createClass({

    render: function() {
      return (
        <div className="Header">
          <h1> Must Stash </h1>
          <form className="searchForm">
          <input type="text" id="bigSearchInput" placeholder="Enter Search Items" />
          </form>
        </div>
      )
    }
  })
module.exports = Header;