'use strict';

const React = require('react');
const styles = require('./about_styles.scss');

const AboutPage = React.createClass({
  render: function() {
    return (
      <div className="AboutPage">
        <h1>About Must-Stash</h1>
        <p id="aboutMessage">Bacon ipsum dolor amet kielbasa shank sausage ham hock, frankfurter tail chicken jerky beef ribs short loin pancetta ham cow fatback kevin. Pork chop jerky salami chicken meatball turducken. Picanha shankle landjaeger, chicken turkey chuck rump spare ribs capicola tri-tip t-bone. Fatback tail turkey, tongue ribeye jowl doner tri-tip shankle corned beef beef short loin cupim rump. Prosciutto venison pork belly leberkas rump. Pancetta ham hock strip steak turducken. Shank sausage tail doner swine, t-bone filet mignon porchetta pork belly shoulder corned beef chicken jowl. Brisket salami pork loin fatback pork. Spare ribs pork loin fatback doner meatloaf venison jowl cupim strip steak ribeye picanha tail meatball. Meatball ball tip spare ribs, capicola cupim sirloin ham hock pork belly venison. Capicola pork loin hamburger turkey strip steak pork belly fatback turducken brisket pastrami meatball beef ribs ham hock shankle. Turkey ball tip picanha pork chop shankle short loin frankfurter porchetta ground round beef ribs prosciutto pastrami.
        </p>
      </div>
     )
   }
})

module.exports = AboutPage;
