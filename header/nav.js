'use strict';

var React = require('react');

const Nav = React.createClass({
  render: function() {

    return (
      <div className="Nav">
        <ul>
          <li> <a href="/">Home</a> </li>
          <li> <a href="/dataView">Data View</a> </li>
          <li> <a href="/about">About</a> </li>
        </ul>
          {this.props.children}
      </div>
      )

  }

})

module.exports = Nav;