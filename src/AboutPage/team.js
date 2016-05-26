'use strict';

const React = require('react');

const Team = React.createClass({
  render: function() {
    return (

      <div className="teamContainer">

        <div className="photosContainer">

            <div className="teamMember">
              <figure>
                <img src="/images/owen.JPG" alt="" class="img-responsive" />
                <h4 className="name">Owen Yang</h4>
              </figure>

            </div>

            <div className="teamMember">
              <figure>
                <img src="/images/natty.JPG" alt="" class="img-responsive" />
                <h4 className="name">Natalie Macias</h4>
              </figure>

            </div>

            <div className="teamMember">
              <figure>
                <img src="/images/pammy.JPG" alt="" class="img-responsive" />
                <h4 className="name">Pamela Yang</h4>
              </figure>

            </div>


            <div className="teamMember">
              <figure>
                <img src="/images/taytay.JPG" alt="" class="img-responsive" />
                <h4 className="name">Taylor Kennedy</h4>
              </figure>

            </div>



        </div>




      </div>




     )
   }
})

module.exports = Team;
