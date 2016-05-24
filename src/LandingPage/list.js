'use strict';

const React = require('react');

const List = React.createClass({

  render: function() {
    var array = this.props.list;
    console.log(array, 'array');

    var arrayItems = array.map(function(activity){
      var html = activity._source.html;
      var start = html.indexOf("<title>") + 7;
      var end = html.indexOf("</title>", start)
      var title = html.substring(start,end);

      var startDes = html.indexOf("<p>") + 3;
      var endDes = html.indexOf("</p>", startDes)
      var description = html.substring(startDes, endDes);

      description = description.replace(/<.+?>/g, '');
      description = description.replace(/ *\[[^\]]*]/g, '');
      description = description.replace(/[^a-z .?"']+/ig, '');
      description = description.replace(/\n/g, '');
      description = description.replace(/\t/g, '');
      description = description.replace(/['"]/g, '');

      if(description.length > 250){
        description = description.substring(0,250) + "..."
      }

      return (
        <div>
          <a href={activity._source.url} key={activity._id}>
            <p>{title}</p>
          </a>
          <p>{description}</p>
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