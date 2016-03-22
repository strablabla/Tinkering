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
