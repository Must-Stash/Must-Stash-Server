'use strict';

const React = require('react');

const Team = React.createClass({
  render: function() {
    return (

      <div className="teamContainer">

        <div className="photosContainer">

            <div className="teamMember">
              <div className="circle-pic owen"></div>
              <h4 className="name">Owen Yang</h4>
            </div>

            <div className="teamMember">
              <div className="circle-pic nat"></div>
              <h4 className="name">Natalie Macias</h4>
            </div>

            <div className="teamMember">
              <div className="circle-pic pam"></div>
              <h4 className="name">Pamela Yang</h4>
            </div>


            <div className="teamMember">
              <div className="circle-pic taylor"></div>
              <h4 className="name">Taylor Kennedy</h4>
            </div>

        </div>

      </div>
     )
   }
})

module.exports = Team;
