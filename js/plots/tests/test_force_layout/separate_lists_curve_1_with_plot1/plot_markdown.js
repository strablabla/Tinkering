var plot_with_labels = function(elemid, add_data, add_nodes, add_links){
    
    queue()
      .defer(d3.json, add_nodes)
      .defer(d3.json, add_links)
      .defer(d3.json, add_data)
      .await(function(error, nodes, links, dat){
         this.chart = document.getElementById(elemid);
          var w = this.chart.clientWidth, // with of the picture
              h = this.chart.clientHeight; // height of the picture
        alert(h)
        alert(w)
          var color = d3.scale.category20();
          var svg = d3.select('#'+elemid)                //Create SVG element
                      .append("svg")
                      .attr("width", w)
                      .attr("height", h);
          make_labels(error, nodes, links, w, h, svg, color); 
          plot(svg, dat, w, h);
        } // end function
     ); // end await
    
}

var plot = function(svg, data, w, h){
    // Utility for plotting curves with d3.js
    alert("in plot  !!!")
    var xoffset = 100
    var col = 'k';
    var pos_line = 150;
    var curve_h = 100;
    var colrs = {'r':'red', 'k':'black', 'b':'blue', 'g':'green'};
    // var svg = d3.select(dom)                //Create SVG element
    //             .append("svg")
    //             .attr("w", w)
    //             .attr("h", h);
    var valueline = d3.svg.line()           // Define the line 
        .x(function(d) { return d.x*5; })
        .y(function(d) { return d.y*curve_h + pos_line; }) // positionned on the line
    var curve = function(data_curve){
        
        var x = d3.scale.linear()
            .domain([-w / 2, w / 2])
            .range([0, w]);
        
        var y = d3.scale.linear()
            .domain([-h / 2, h / 2])
            .range([h, 0]);

        var curved = svg.append("path")  
            .attr("class", "line")
            .attr("d", valueline(data_curve))
            .attr("transform", "translate(" + xoffset.toString() + ", 0)" ) // Translationin x
            .style({stroke : colrs[col],
                    fill : 'none',
                    'stroke-w' : '1.5px',
                })

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + h + ")")
            .call(xAxis);
        
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
            
        }; // end curve()

    curve(data)

} // end plot

function make_labels(error, nodes, links, w, h, svg, color) {
    /* Draw the node labels first */
    alert('in make_labels')
  var factx = 15
  var facty = 70
  var shift = 200
  //alert('width is'+w)
  nodes.forEach(function(data, i){
      
      data["x"] *= factx;
      data["y"] = data["y"]*facty+shift;
      data["fixed"] = true;
  })
  links.forEach(function(data, i){
     
      var n = nodes[links[i]["source"]]
      n["fixed"] = false                            // not fixed 
      n["name"] = parseFloat(n["x"]).toFixed(3)     // value of position
      n["y"] += -100                                // begin above.
  })
  //alert('before text')
   var texts = svg.selectAll("text")
                    .data(nodes)
                    .enter()
                    .append("text")
                    .attr("fill", "black")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "10px")
                    .text(function(d) { 
                        return d.name; }); 
   
    //alert('before force')
    var force = d3.layout.force()
                    .nodes(nodes)
                    .links(links)
                    .size([w,h])
                    .linkDistance([10])
                    .charge([-200])
                    .gravity(0.1)
                    .start();
    /* Draw the edges/links between the nodes */
    //alert('before line')
    var edges = svg.selectAll("line")
                    .data(links)
                    .enter()
                    .append("line")
                    .style("stroke", "#ccc")
                    .style("stroke-width", 1)
                    .attr("marker-end", "url(#end)");
    //alert('before circle')               
    var nodes = svg.selectAll("circle")
                    .data(nodes)
                    .enter()
                    .append("circle")
                    .attr("r", 5)
                    .attr("opacity", function(d,i) {if (d.fixed == false){return 0.8} else {return 0}})
                    .style("fill", function(d,i) { return color(i);})
                    .call(force.drag);
    //alert('run the force')
    force.on("tick", function() {
               edges.attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });
               nodes.attr("cx", function(d) { return d.x; })
                    .attr("cy", function(d) { return d.y; })
               texts.attr("transform", function(d) {
                        return "translate(" + d.x + "," + d.y + ")";
                        });
               }); // End tick func
}; //
