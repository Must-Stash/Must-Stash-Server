'use strict';

const React = require('react');
const styles = require('./list_styles.scss');

const List = React.createClass({

  render: function() {
    var array = this.props.list;
    console.log(array, 'array');

    var arrayItems = array.map(function(activity){
      return (
        <div>
          <a href={activity._source.url} key={activity._id}>
            <p>{activity._source.title}</p>
          </a>
          <p>{activity._source.description}</p>
        </div>
      )
    });

    return (
      <div className="List">
        {arrayItems}
      </div>
    )
  }
})

module.exports = List;