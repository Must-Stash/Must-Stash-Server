var req = new XMLHttpRequest();
req.addEventListener("load", function(){
  console.log(JSON.parse(this.response));
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
            name: url,
            children : [{
              name : url,
              children : [{
                name : url,
                size : 300
              }]
            }]
          }]
        });
      }

      else {
        var index = queries.indexOf(query);

        root.children[index].children.push({
          name : url,
          children : [{
            name : url,
            size: 300
          }]
        });
      }

    }


  });

 var margin = 20,
      diameter = 1100;

  var color = d3.scale.linear()
      .domain([-1, 5])
      .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
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
      .style("fill", function(d) { return d.children ? color(d.depth) : null; })
      .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

  var text = svg.selectAll("text")
      .data(nodes)
    .enter().append("text")
      .attr("class", "label")
      .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
      .style("display", function(d) { return d.parent === root ? null : "none"; })
      .text(function(d) { return d.name; });

  var node = svg.selectAll("circle,text");

  d3.select(".container")
      .style("background", color(-1))
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


// var root = {
//   "children":
//   [{
//     "name": "Chicken",
//     "children":
//     [{
//       "name": "axis",
//       "children": [
//       {"name": "www.wiki.com/Chicken",
//         "children": [
//          {"name": "www.wiki.com/Chicken", "size": 416}
//         ]},
//       {"name": "www.chickenSoupForLostSouls.com",
//         "children": [
//          {"name": "www.chickenSoupForLostSouls.com", "size": 300}
//         ]},
//       {"name": "www.recipes.com/ChickenPotPieRecipe",
//         "children": [
//          {"name": "www.recipes.com/ChickenPotPieRecipe", "size": 300}
//         ]},
//       {"name": "www.nytimes.com/ChickenMassacreInTexasAustin",
//         "children": [
//          {"name": "www.nytimes.com/ChickenMassacreInTexasAustin", "size": 550}
//         ]}
//       ]
//     }]
//   },
//   {
//     "name": "Duck",
//     "children":
//     [{
//       "name": "axis",
//       "children": [
//       {"name": "www.duckduckGo.com",
//         "children": [
//          {"name": "www.duckduckGo.com", "size": 4116}
//         ]},
//       {"name": "www.mysteriousFacts.org/duckTales",
//         "children": [
//          {"name": "www.mysteriousFacts.org/duckTales", "size": 300}
//         ]},
//       {"name": "www.fancypets.io/duckling-adoption",
//         "children": [
//          {"name": "www.fancypets.io/duckling-adoption", "size": 250}
//         ]}
//       ]
//     }]
//   },
//   {
//     "name": "Cats",
//     "children":
//     [{
//       "name": "axis",
//       "children":
//       [{
//         "name": "axis",
//         "children": [
//         {"name": "www.cuteStrayAnimals.org/kittens",
//           "children": [
//            {"name": "www.cuteStrayAnimals.org/kittens", "size": 416}
//           ]},
//         {"name": "www.marvel.com/catwoman",
//           "children": [
//            {"name": "www.marvel.com/catwoman", "size": 300}
//           ]},
//         {"name": "www.whatsTheDeal/catsForSale",
//           "children": [
//            {"name": "www.whatsTheDeal/catsForSale", "size": 300}
//           ]},
//         {"name": "www.justMary.org",
//           "children": [
//            {"name": "www.justMary.org", "size": 300}
//           ]},
//         {"name": "www.uber.com/Uber_a_cat_today",
//           "children": [
//            {"name": "www.uber.com/Uber_a_cat_today", "size": 300}
//           ]},
//         {"name": "www.unhappyTruths.com/catCruelty",
//           "children": [
//            {"name": "www.unhappyTruths.com/catCruelty", "size": 300}
//           ]},
//         {"name": "www.silentRead.com/catInTheHat",
//           "children": [
//            {"name": "www.silentRead.com/catInTheHat", "size": 300}
//           ]},
//         {"name": "www.noMoreCats.co/catCostumesForSale",
//           "children": [
//            {"name": "www.noMoreCats.co/catCostumesForSale", "size": 550}
//           ]}
//         ]
//       }]
//     }]
//   }]
// };



