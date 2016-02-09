var plot = function(dom, data, xoffset, col){
    // Utility for plotting curves with d3.js
    var col = col || 'k';
    var pos_line = 150;
    var width = 500, // with of the picture
        height = 200; // height of the picture
    var curve_height = 100;
    var colrs = {'r':'red', 'k':'black', 'b':'blue', 'g':'green'};
    var svg = d3.select(dom)                //Create SVG element
                .append("svg")
                .attr("width", width)
                .attr("height", height);
    var valueline = d3.svg.line()           // Define the line 
        .x(function(d) { return d.x*5; })
        .y(function(d) { return d.y*curve_height + pos_line; }) // positionned on the line
    var curve = function(data_curve){
        
        

        // var x = d3.scale.linear()
        //     .domain([-width / 2, width / 2])
        //     .range([0, width]);
        // 
        // var y = d3.scale.linear()
        //     .domain([-height / 2, height / 2])
        //     .range([height, 0]);
        // 
        // var xAxis = d3.svg.axis()
        //     .scale(x)
        //     .orient("bottom")
        //     .tickSize(-height);
        // 
        // var yAxis = d3.svg.axis()
        //     .scale(y)
        //     .orient("left")
        //     .ticks(5)
        //     .tickSize(-width);
        // 
        // var zoom = d3.behavior.zoom()
        //     .x(x)
        //     .y(y)
        //     .scaleExtent([1, 32])
        //     .on("zoom", zoomed);
        ////////////////////////////////
        var curved = svg.append("path")  
            .attr("class", "line")
            .attr("d", valueline(data_curve))
            .attr("transform", "translate(" + xoffset.toString() + ", 0)" ) // Translationin x
            .style({stroke : colrs[col],
                    fill : 'none',
                    'stroke-width' : '1.5px',
                })
                // .append("g")
                //    .attr("transform", "translate(" + 40 + "," + 20 + ")")
                //    .call(zoom);

        // svg.append("g")
        //     .attr("class", "x axis")
        //     .attr("transform", "translate(0," + height + ")")
        //     .call(xAxis);
        // 
        // svg.append("g")
        //     .attr("class", "y axis")
        //     .call(yAxis);
        // 
        // function zoomed() {
        //   svg.select(".x.axis").call(xAxis);
        //   svg.select(".y.axis").call(yAxis);
        //  }
            
        }; // end curve()
    var set_data_plot = function(data){
        // if data is an array do nothing, if json, makes an array
         if (typeof(data)=='string'){ 
             if (data.match(/\.json/)!=null){
                 d3.json(data, function(dataset) {
                        curve(dataset)
                        }); // end d3.json
                    }  // end if json
               } // end if string     
           else{
               curve(data)
             }
        }// end function
    set_data_plot(data)
} // end plot
