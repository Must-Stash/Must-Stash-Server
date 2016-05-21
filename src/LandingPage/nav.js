'use strict';

const React = require('react');

const Nav = React.createClass({
  render: function (){
    return(
      <div id="nav">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/mySearch">My History</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </div>
    )
  }
});

module.exports = Nav;