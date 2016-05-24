import React from 'react';
import { IndexLink, Link } from 'react-router';

const Nav = React.createClass({
  render: function (){
    return (
      <div id="nav">
        <ul>
          <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
          <li><Link to="/mySearch" activeClassName="active">My History</Link></li>
          <li><Link to="/about" activeClassName="active">About</Link></li>
          <li><a href="/d3.html">Chart Visuals</a></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

module.exports = Nav;