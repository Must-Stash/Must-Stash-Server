import React from 'react';
import { IndexLink, Link } from 'react-router';

const styles = require('./nav_styles.scss');

const Nav = React.createClass({
  render: function (){
    return (
      <div className="nav">
        <ul className= "navList">
          <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
          <li><Link to="/mySearch" activeClassName="active">My History</Link></li>
          <li><Link to="/about" activeClassName="active">About</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

module.exports = Nav;