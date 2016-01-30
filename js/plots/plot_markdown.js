
var plot = function(dom, data_curve, xoffset){

    var pos_line = 150
    var width = 500,
        height = 200;
    var colrs = {'r':'red', 'k':'black', 'b':'blue', 'g':'green'};
    var svg = d3.select(dom) //Create SVG element
                .append("svg")
                .attr("width", width)
                .attr("height", height);
    var curve_height = 100;
    var valueline = d3.svg.line() // Define the line 
      .x(function(d) { return d.x*5; })
      .y(function(d) { return d.y*curve_height + pos_line; }) // positionned on the line
    curve = function(posx){
        var curved = svg.append("path")  
        .attr("class", "line")
        .attr("d", valueline(data_curve))
        .attr("transform", "translate(" + posx.toString() + ", 0)" ) // Translationin x
        };
    curve(xoffset)
} // end graph
