'use strict';

const React = require('react');
const styles = require('./list_styles.scss');

const List = React.createClass({

  render: function() {
    var array = this.props.list;

    console.log(this.props.hasResults);

    if(this.props.hasResults === true){
      var arrayItems = array.map(function(activity){
        return (
          <div key={activity.id}>
            <a className="activity-title" href={activity.url}>
              {activity.title}
            </a>
            <p className="activity-description">{activity.description}</p>
          </div>
        )
      });

      return (
        <div className="List">
          {arrayItems}
        </div>
      )
    }

    else {
      return (
        <div className="emptylist"></div>
      )
    }


  }
})

module.exports = List;