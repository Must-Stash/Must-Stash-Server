'use strict';

const React = require('react');

  const List = React.createClass({

    render: function() {
     var array = this.props.list;
     console.log(array, 'array');
     var arrayItems = array.map(function(activity){
      return (
      <a href={activity._source.url} key={activity._id}>{activity._source.url}</a>
      )
     });
       return (
        <div className="List">
          <h1>whatever</h1>
          {arrayItems}
        </div>
      )
    }
  })

module.exports = List;