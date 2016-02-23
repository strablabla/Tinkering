var plot = function(params){   
    // Utility for plotting curves with d3.js
    var col = params['color'] || 'k';
    var axis_labels = params['axis_labels'] || ['x', 'y']
    var pos_line = 150;
    var margin = {top: 30, right: 30, bottom: 50, left: 50},
        width = 500 // width of the plot
        height = 300 // height of the plot
        xlim = params['lim']['xlim']
        ylim = params['lim']['ylim']
    var curve_height = 100;
    var ticksize = 3
    var labsize = "13px"
    var ticks = 4
    var colrs = {'r':'red', 'k':'black', 'b':'blue', 'g':'green'};
    var zoom = d3.behavior.zoom()
        .scaleExtent([1, 10])
        .on("zoom", zoomed);
    var svg = d3.select(params['dom'])                //Create SVG element
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .call(zoom);
 
    var valueline = d3.svg.line()           // Define the line 
        .x(function(d) { return d.x*5; })
        .y(function(d) { return d.y*curve_height + pos_line; }) // positionned on the line
        .interpolate('monotone');
    var tr = function(w, h, ang){
       ang = ang || 0
       return "translate(" + w + ","+ h + ") rotate("+ang+")"
        }
    var add_html = function(htm, w,h,ang){ // adding html in the plot
        svg.append('foreignObject')
            .attr("transform", tr(w,h, ang))
            .attr('width', 200)
            .attr('height', 100)
            .append("xhtml:body")
            .html(htm)
        }
    var add_txt = function(label,w,h,ang){    // adding text in the plot, position : (w, h), angle : ang
        svg.append("text").attr("text-anchor", "middle")
            .attr("transform", tr(w,h, ang)) 
            .text(label)
        }
    var add_axis = function(cl, w, h, labsize, axis){ // append g object to svg for axis, called by make_axes_svg
        svg.append("g").attr("class", cl).attr("transform", tr(w,h))  
              .style("font-size",labsize) //To change the font size of texts
              .call(axis); // bind the object to axis
          }
    var def_axis = function(scale, orient, ticksize){ // called by make_axes before make_axes_svg
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
    var make_axis_labels = function(svg, xlabel, ylabel){ // label for axis, by default : x, y
        //
        add_txt(xlabel, width/2, (height-margin.bottom/4), 0)
        add_txt(ylabel, margin.left/4, height/2, 90)
        } // end make_axis_labels
    var make_axes_svg = function(svg, xAxis, yAxis){
        //
        //xAxis.exit().remove()
        //d3.svg.selectAll("g.x axis").exit().remove()
        add_axis("x axis", 0, height-margin.bottom, labsize, xAxis)
        add_axis("y axis", margin.left,-margin.bottom, labsize, yAxis)
       }
    var make_axes = function(svg, xc, yc){
        var x = make_scale(xc, [margin.left, width-margin.right])
        var y = make_scale(yc, [margin.top, height])
        var xAxis = def_axis(x, "bottom", ticksize)
        var yAxis = def_axis(y, "left", ticksize)
        make_axes_svg(svg, xAxis, yAxis) 
         } // end make_axes
    var curve = function(data_curve){
        var curved = svg.append("path")  
            .attr("class", "line")
            .attr("d", valueline(data_curve))
            .attr("transform", tr(margin.left+xlim[0],-ylim[0]))
            .style({stroke : colrs[col], fill : 'none','stroke-width' : '1.5px'})
        make_legend(svg, 'legend')
        make_axes(svg, d3.extent(data_curve, function(d) {
          return d['x'];
        }),   d3.extent(data_curve, function(d) {
            return d['y'];
          }))
        make_axis_labels(svg, axis_labels[0], axis_labels[1])
        htm = '<div style="width: 150px; color:blue">\
                This is some information about whatever</div>'
        add_html(htm, 100, 130, 0)
        }; // end curve()
    function zoomed() {
      svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
      svg.select('g.x.axis').call(xAxis);
      svg.select('g.y.axis').call(yAxis);
      // svg.selectAll(".x.axis").remove()
      // svg.selectAll(".y.axis").remove()
      // var scale = d3.event.scale
      // var transl = d3.event.translate
      // xtr = transl[0]
      // ytr = transl[1]
      // //alert(scale)
      // make_axes(svg, [(-xtr+xlim[0])/scale, (-xtr+xlim[1])/scale], [(-ytr+ylim[0])/scale, (-ytr+ylim[1])/scale])
      //alert(xlim[0]/scale +'  '+ xlim[1]/scale)
      //refresh(svg) 
    }
    

    

    var set_data_plot = function(data){
        // if data is an array do nothing, if json, makes an array
         if (typeof(data) == 'string'){ 
             if (data.match(/\.json/)!=null){
                 d3.json(data, function(dataset) {
                     curve(dataset)
                     }); // end d3.json
                    }  // end if json
               } // end if string     
           else{curve(data)}
        }// end function
    set_data_plot(params['data'])
} // end plot
