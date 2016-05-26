import React from 'react';
import { IndexLink, Link } from 'react-router';

const styles = require('./nav_styles.scss');

const Nav = React.createClass({
  render: function (){
    return (
      <div className="nav">
        <div className= "navList">
          <li><a href="/" activeClassName="active">Home</a></li>
          <li><a href="/d3.html">Visualization</a></li>
          <li><Link to="/about" activeClassName="active">About Us</Link></li>
        </div>
        {this.props.children}
      </div>
    )
  }
})

module.exports = Nav;