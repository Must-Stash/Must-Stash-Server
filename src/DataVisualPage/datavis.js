'use strict';
const styles = require('./datavis_styles.scss');
console.log(styles);

const React = require('react');

const DataVisualPage = React.createClass({
  render: function() {
    return (
      <div className={styles.container}>
        <h1>Data Visualization</h1>
        <p>DOPE A$$ VISUAL!</p>
      </div>
    )
  }
})

module.exports = DataVisualPage;
