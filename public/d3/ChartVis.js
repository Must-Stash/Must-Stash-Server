var req = new XMLHttpRequest();
req.addEventListener("load", function(){
  var allData = JSON.parse(this.response).success;

  var root = {
    children: []
  };

  var queries = [];

  allData.forEach(function(element){

    if(element.query){

      var query = element.query.query_string;
      var url = element.activity.url;

      if(queries.indexOf(query) === -1){
        queries.push(query);
        root.children.push({
          name : query,
          children : [{
            name : url,
            size : 250
          }]
        });
      }

      else {
        var index = queries.indexOf(query);

        root.children[index].children.push({
          name : url,
          size: 250
        });
      }

    }


  });

 root.children.forEach(function(query){
  var urls = [];
  query.children.forEach(function(activity, index){
    if(urls.indexOf(activity.name) === -1){
      urls.push(activity.name);
    }
    else {
      var firstIndex = urls.indexOf(activity.name);

      query.children[firstIndex].size += 75;
      query.children.splice(index, 1);
    }


  });
 });


 var margin = 20,
      diameter = 800;

  var color = d3.scale.linear()
      .domain([0, 6])
      .range(["#CEEEFA", "#005283"])
      .interpolate(d3.interpolateHcl);

  var pack = d3.layout.pack()
      .padding(2)
      .size([diameter - margin, diameter - margin])
      .value(function(d) { return d.size; });

  var svg = d3.select(".container").append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
    .append("g")
      .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

  var focus = root,
      nodes = pack.nodes(root),
      view;

  var circle = svg.selectAll("circle")
      .data(nodes)
    .enter().append("circle")
      .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
      .style("fill", function(d) { return d.children ? color(d.depth) : "#51A4BB"; })
      .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });


// #C5E0DC
  var text = svg.selectAll("text")
      .data(nodes)
    .enter().append("text")
      .attr("class", "label")
      .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
      .style("display", function(d) { return d.parent === root ? null : "none"; })
      .text(function(d) { return d.name; });



  var node = svg.selectAll("circle,text");

  d3.select(".container")
      .style("background", color(-6))
      .on("click", function() { zoom(root); });

  zoomTo([root.x, root.y, root.r * 2 + margin]);

  function zoom(d) {
    var focus0 = focus; focus = d;

    var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", function(d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
          return function(t) { zoomTo(i(t)); };
        });

    transition.selectAll("text")
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
        .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
        .each("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }

  function zoomTo(v) {
    var k = diameter / v[2]; view = v;
    node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
    circle.attr("r", function(d) { return d.r * k; });
  }


  d3.select(self.frameElement).style("height", diameter + "px");

});
req.open("GET", "/api/qa");
req.send();


