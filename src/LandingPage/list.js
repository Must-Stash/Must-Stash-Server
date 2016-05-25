'use strict';

const React = require('react');
const styles = require('./list_styles.scss');

const List = React.createClass({

  render: function() {
    var array = this.props.list;

    console.log(this.props.hasResults);

    var arrayItems;

    if(this.props.hasResults === true){
      arrayItems = array.map(function(activity){
        return (
          <div key={activity._id}>
            <a href={activity._source.url}>
              <p>{activity._source.title}</p>
            </a>
            <p>{activity._source.description}</p>
          </div>
        )
      });
    }

    else {
      arrayItems = (
        <div className="emptylist"></div>
      )
    }

    return (
      <div className="List">
        {arrayItems}
      </div>
    )
  }
})

module.exports = List;