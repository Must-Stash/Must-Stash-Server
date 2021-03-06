'use strict';

const React = require('react');
const styles = require('./aboutPage_styles.scss');
const Team  = require('./team.js');
const AboutPage = React.createClass({
  render: function() {
    return (

    <div className="AboutContainer">
      <div className="about-header-image"><img src="/images/horizonal-blue-elephant.svg" /></div>
      <div className="aboutUs">



        <img className="aboutPageImage" src="/images/large-blue.svg" />
          <div className="aboutContent">
            <div className="titleDiv">
              <img className="iconImage" src="/images/large-blue.svg" />
            </div>

            <div className="aboutText">
              <p>
              Have you ever wanted to revisit a site only to find that you have forgotten the
              exact google terms that took you there? Do you have bookmarks that don't
              help when you just need a quick pick-me-up? Super charge your Google-foo with
              MustStash and navigate your browsing history with ease.
              </p>
            </div>

                <p>
                   Reference your history quickly by fuzzy searching in the MustStash search bar and have the link most relevant to you returned instantly.
                </p>

                <p>
                  View on an interactive packing graph your most searched terms and the related links during that browsing window.
                </p>

                <p>
                  Have the option to determine the server you want your history to be saved to and keep it secure.
                </p>
          </div>


      </div>

        <h2 className="builtBy">Built By </h2>
        <Team />

    </div>

     )
   }
})

module.exports = AboutPage;
