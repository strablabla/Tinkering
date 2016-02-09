var plot = function(dom, data, col, axis_labels){
    // Utility for plotting curves with d3.js
    var col = col || 'k';
    var axis_labels = axis_labels || ['x', 'y']
    var pos_line = 150;
    var margin = {top: 30, right: 30, bottom: 50, left: 50},
        width = 500 //- margin.left - margin.right,
        height = 300 //- margin.top - margin.bottom;
    var curve_height = 100;
    var ticksize = 3
    var labsize = "13px"
    var ticks = 4
    var colrs = {'r':'red', 'k':'black', 'b':'blue', 'g':'green'};
    var svg = d3.select(dom)                //Create SVG element
                .append("svg")
                .attr("width", width)
                .attr("height", height)
    var valueline = d3.svg.line()           // Define the line 
        .x(function(d) { return d.x*5; })
        .y(function(d) { return d.y*curve_height + pos_line; }) // positionned on the line
    var tr = function(w, h, ang){
       ang = ang || 0
       return "translate(" + w + ","+ h + ") rotate("+ang+")"
        }
    var add_txt = function(label,w,h,ang){
        svg.append("text").attr("text-anchor", "middle")
            .attr("transform", tr(w,h, ang)) 
            .text(label)
        }
    var add_axis = function(cl, w, h, labsize, axis){
        svg.append("g").attr("class", cl).attr("transform", tr(w,h))  
              .style("font-size",labsize) //To change the font size of texts
              .call(axis);
          }
    var def_axis = function(scale, orient, ticksize){
        var axis = d3.svg.axis().scale(scale)
            .orient(orient)
            .tickSize(ticksize)
        return axis
        }
    var make_scale = function(domn, rg){
        var scale = d3.scale.linear().domain(domn).range(rg);
        return scale
    }
    var make_legend = function(svg, leg){
        add_txt(leg, width-margin.left, margin.top, 0)
        }
    var make_axis_labels = function(svg, xlabel, ylabel){
        //
        add_txt(xlabel, width/2, (height-margin.bottom/4), 0)
        add_txt(ylabel, margin.left/4, height/2, 90)
        } // end make_axis_labels
    var make_axes_svg = function(svg, xAxis, yAxis){
        //
        add_axis("x axis", 0, height-margin.bottom, labsize, xAxis)
        add_axis("y axis", margin.left,-margin.bottom, labsize, yAxis)
       }
    var make_axes = function(svg){
        var x = make_scale([0, width],[margin.left, width-margin.right] )
        var y = make_scale([0, height],[height, margin.top] )
        var xAxis = def_axis(x, "bottom", ticksize)
        var yAxis = def_axis(y, "left", ticksize)
        make_axes_svg(svg, xAxis, yAxis) 
         } // end make_axes
    var curve = function(data_curve){
        var curved = svg.append("path")  
            .attr("class", "line")
            .attr("d", valueline(data_curve))
            .attr("transform", tr(margin.left,-margin.bottom))
            .style({stroke : colrs[col], fill : 'none','stroke-width' : '1.5px'})
        make_legend(svg, 'comment')
        make_axes(svg)
        make_axis_labels(svg, axis_labels[0], axis_labels[1])
        function zoomed() {
              svg.select(".x.axis").call(xAxis);
              svg.select(".y.axis").call(yAxis);
             }
        }; // end curve()
    var set_data_plot = function(data){
        // if data is an array do nothing, if json, makes an array
         if (typeof(data) == 'string'){ 
             if (data.match(/\.json/)!=null){
                 d3.json(data, function(dataset) {curve(dataset)}); // end d3.json
                    }  // end if json
               } // end if string     
           else{curve(data)}
        }// end function
    set_data_plot(data)
} // end plot
