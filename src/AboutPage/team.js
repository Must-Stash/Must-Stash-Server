'use strict';

const React = require('react');

const Team = React.createClass({
  render: function() {
    return (

      <div className="teamContainer">



        <div className="photosContainer">



            <div className="teamMember">
              <figure>
                <img src="http://i.imgsafe.org/6a5b608.jpg" alt="" class="img-responsive" />
                <figcaption>

                  <ul>
                    <li><a href=""><i class="fa fa-facebook fa-2x"></i></a></li>
                    <li><a href=""><i class="fa fa-twitter fa-2x"></i></a></li>
                    <li><a href=""><i class="fa fa-linkedin fa-2x"></i></a></li>
                  </ul>
                </figcaption>
              </figure>
              <h4 className="name">Taylor Kennedy</h4>

            </div>

            <div className="teamMember">
              <figure>
                <img src="http://i.imgsafe.org/6a5b608.jpg" alt="" class="img-responsive" />
                <figcaption>

                  <ul>
                    <li><a href=""><i class="fa fa-facebook fa-2x"></i></a></li>
                    <li><a href=""><i class="fa fa-twitter fa-2x"></i></a></li>
                    <li><a href=""><i class="fa fa-linkedin fa-2x"></i></a></li>
                  </ul>
                </figcaption>
              </figure>
              <h4 className="name">Natalie Macias</h4>

            </div>

            <div className="teamMember">
              <figure>
                <img src="http://i.imgsafe.org/6a5b608.jpg" alt="" class="img-responsive" />
                <figcaption>

                  <ul>
                    <li><a href=""><i class="fa fa-facebook fa-2x"></i></a></li>
                    <li><a href=""><i class="fa fa-twitter fa-2x"></i></a></li>
                    <li><a href=""><i class="fa fa-linkedin fa-2x"></i></a></li>
                  </ul>
                </figcaption>
              </figure>
              <h4 className="name">Pamela Yang</h4>

            </div>


            <div className="teamMember">
              <figure>
                <img src="http://i.imgsafe.org/6a5b608.jpg" alt="" class="img-responsive" />
                <figcaption>

                  <ul>
                    <li><a href=""><i class="fa fa-facebook fa-2x"></i></a></li>
                    <li><a href=""><i class="fa fa-twitter fa-2x"></i></a></li>
                    <li><a href=""><i class="fa fa-linkedin fa-2x"></i></a></li>
                  </ul>
                </figcaption>
              </figure>
              <h4 className="name">Owen Yang</h4>

            </div>



        </div>




      </div>




     )
   }
})

module.exports = Team;
