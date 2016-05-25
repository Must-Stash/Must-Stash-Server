'use strict';

const React = require('react');

const List = React.createClass({

  render: function() {
    var array = this.props.list;
    console.log(array, 'array');

    var arrayItems = array.map(function(activity){
      return (
        <div>
          <a href={activity.url} key={activity.id}>
            <p>{activity.title}</p>
          </a>
          <p>{activity.description}</p>
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