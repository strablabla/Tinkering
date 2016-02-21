registerKeyboardHandler = function(callback) {
  var callback = callback;
  d3.select(window).on("keydown", callback);  
};

plot = function(elemid, dataset, params) {
  var self = this;
  
  this.dataset = dataset
  this.chart = document.getElementById(elemid);
  this.params = params || {};
  this.xlim = this.params['xlim']
  this.ylim = this.params['ylim']
  this.xlabel = this.params['xlabel']
  this.ylabel = this.params['ylabel']
  this.title = this.params['title']
  this.col = this.params['color'] || 'k';
  this.cx = this.chart.clientWidth;
  this.cy = this.chart.clientHeight;
  fillplot = this.params['fill'] || "#EEEEEE"
  var colrs = {'r':'red', 'k':'black', 'b':'blue', 'g':'green'};
  // Interaction Parameters 
  this.show_circle = false;
  this.moveaxis = false
  this.drag_zoom = false
  // Commands
  // * c : show the circles for modifying the plot
  // * b : mode Brush
  // * q : zoom for mode Brush
  // * d : toggle for drag and zoom.
  
  var tr = function(w, h, ang){      // Translation and Rotation
     ang = ang || 0
     return "translate(" + w + ","+ h + ") rotate("+ang+")"
      }
  
  var add_txt = function(node, label,w,h,ang){    // adding text in the plot, position : (w, h), angle : ang
      newtext = node.append("text").style("text-anchor", "middle")
          .attr("transform", tr(w,h, ang)) 
          .text(label)
       return newtext
      }
  var add_txt_axis = function(node, label,w,h,ang){    // adding axis, (for Title and axis)
      newax = add_txt(node, label,w,h,ang)
      newax.attr('class','axis')
      return newax
      }
          
  this.padding = {
     "top":    this.title  ? 40 : 20,
     "right":                 30,
     "bottom": this.xlabel ? 60 : 10,
     "left":   this.ylabel ? 70 : 45
  };

  this.size = {
    "width":  this.cx - this.padding.left - this.padding.right,
    "height": this.cy - this.padding.top  - this.padding.bottom
  };
  
  make_scale = function(lim, size, inv){
      var inv = inv || false
      if (!inv){interv = [lim[0], lim[1]]} else {interv = [lim[1], lim[0]]}
      var scale = d3.scale.linear().domain(interv).nice().range([0, size]).nice();
      return scale
  }

  this.x = make_scale(this.xlim,this.size.width)  // x-scale
  this.y = make_scale(this.ylim,this.size.height, true)  // y-scale (inverted domain)
  this.downx = Math.NaN; // drag x-axis logic
  this.downy = Math.NaN; // drag y-axis logic
  this.dragged = this.selected = null;
  
  //this.brush = null;
  
  this.line = d3.svg.line()
      .x(function(d, i) { return this.x(this.dataset[i].x); })
      .y(function(d, i) { return this.y(this.dataset[i].y); })
      .interpolate('linear')
      //
  var xrange =  (this.xlim[1] - this.xlim[0]),
      yrange2 = (this.ylim[1] - this.ylim[0]) / 2,
      yrange4 = yrange2 / 2,
      datacount = this.size.width/30;

  this.vis = d3.select(this.chart).append("svg")
      .attr("width",  this.cx)
      .attr("height", this.cy)
      .append("g")
        .attr("transform", tr(this.padding.left, this.padding.top));

  this.plot = this.vis.append("rect")
      .attr("width", this.size.width)
      .attr("height", this.size.height)
      .style("fill", fillplot) 
      .attr("pointer-events", "all")

  if (this.drag_zoom == true){
    alert('permitting drag')
      this.plot
          .on("mousedown.drag", self.plot_drag())
          .on("touchstart.drag", self.plot_drag())
          .call(d3.behavior.zoom().x(this.x).y(this.y)
          .on("zoom", this.redraw()));
      }

    d3.select(this.chart)              // drag the points of the curve
          .on("mousemove.drag", self.mousemove())
          .on("touchmove.drag", self.mousemove())
          .on("mouseup.drag",   self.mouseup())
          .on("touchend.drag",  self.mouseup());


  this.vis.append("svg")
      .attr("top", 0)
      .attr("left", 0)
      .attr("width", this.size.width)
      .attr("height", this.size.height)
      .attr("viewBox", "0 0 "+this.size.width+" "+this.size.height)
      .attr("class", "line")
      .append("path")
          .attr("class", "line")
          .attr("d", this.line(this.dataset))
          .style({stroke : colrs[this.col], fill : 'none','stroke-width' : '1.5px'})

  // add Chart Title
  if (this.title) {
        tit = add_txt_axis(this.vis, this.title, this.size.width/2, 0)
        tit.attr("dy","-0.5em")
           .attr("font-family", "Times New Roman")
           .attr("font-size", "30px")
  }
  // Add the x-axis label
  if (this.xlabel) {
      var xlab = add_txt(this.vis, this.xlabel, this.size.width/2, this.size.height)
      xlab.attr("dy","2.4em")
          .attr("font-family", "Times New Roman")
          .attr("font-size", "20px")
  }
  // add y-axis label
  if (this.ylabel) {
      var ylab = add_txt(this.vis, this.ylabel, this.size.width/2, this.size.height)
      ylab. attr("transform", tr(-40,this.size.height/2,-90))
          .attr("font-family", "Times New Roman")
          .attr("font-size", "20px")
  }

  this.redraw()();
  
  $(document).keydown(function(event){          // add and remove circles.. 
      if(event.keyCode == "c".charCodeAt(0)-32){
          self.show_circle = !self.show_circle;
          self.vis.selectAll('circle').remove()
          self.redraw()();
      } // end if
      if(event.keyCode == "q".charCodeAt(0)-32){ // Apply the zoom
          x1 = self.x.invert(extent[0][0])
          x2 = self.x.invert(extent[1][0])
          y1 = self.y.invert(extent[0][1])
          y2 = self.y.invert(extent[1][1])
          self.x.domain([x1,x2]);
          self.y.domain([y1,y2]);
          self.redraw()();

          d3.selectAll(".brush").remove();
          
          d3.selectAll('.brush').call(brush.clear());
          d3.selectAll(".brush").call(brush());
          extent = []
          

      } // end if
      if(event.keyCode == "b".charCodeAt(0)-32){ // select the brush tool
        self.brush = self.vis.append("g")
          .attr("class", "brush")
          .call(d3.svg.brush()
            .x(d3.scale.identity().domain([0, self.size.width]))
            .y(d3.scale.identity().domain([0, self.size.height])) 
            .on("brush", function() {
            extent = d3.event.target.extent();
            }) // end on
          ); // end call
       } // end if
      if(event.keyCode == "d".charCodeAt(0)-32){    
        self.drag_zoom = ! self.drag_zoom;
        self.redraw()();
       } // end if
  }) // end keydown
};
  
//
// plot methods
//


plot.prototype.update = function() {
  var self = this;
  var lines = this.vis.select("path").attr("d", this.line(this.dataset));
  //alert(this.show_circle)
  if (this.show_circle == true){   // show circle for modifying the points.
      var circle = this.vis.select("svg").selectAll("circle")
          .data(this.dataset, function(d) { return d; });

      circle.enter().append("circle")
          .attr("class", function(d) { return d === self.selected ? "selected" : null; })
          .attr("cx",    function(d) { return self.x(d.x); })
          .attr("cy",    function(d) { return self.y(d.y); })
          .attr("r", 3.0)
          .style("cursor", "ns-resize")
          .on("mousedown.drag",  self.datapoint_drag())
          .on("touchstart.drag", self.datapoint_drag());

      circle
          .attr("class", function(d) { return d === self.selected ? "selected" : null; })
          .attr("cx",    function(d) { 
            return self.x(d.x); })
          .attr("cy",    function(d) { return self.y(d.y); });

      circle.exit().remove();
  }// end if show circle

  if (d3.event && d3.event.keyCode) {
    d3.event.preventDefault();
    d3.event.stopPropagation();
  }
}




plot.prototype.keydown = function() { // moving points
  var self = this;
  return function() {
    if (!self.selected) return; // if no point selected, pass
    switch (d3.event.keyCode) {
      // case 8: // backspace
      case 46: { // delete
        var i = self.dataset.indexOf(self.selected);
        self.dataset.splice(i, 1);
        self.selected = self.dataset.length ? self.dataset[i > 0 ? i - 1 : 0] : null;
        self.update();
        break;
        } 
    }// end switch
  }
};

plot.prototype.redraw = function() { // Redraw the whole plot
  var self = this;
  return function() {
    var tx = function(d) { 
      return "translate(" + self.x(d) + ",0)"; 
    },
    ty = function(d) { 
      return "translate(0," + self.y(d) + ")";
    },
    stroke = function(d) { 
      return d ? "#ccc" : "#666"; 
    },
    fx = self.x.tickFormat(10),
    fy = self.y.tickFormat(10);

    var sz_txt_ticks = "14px" // size of ticks text

    // Regenerate x-ticks…


    // var gax = function(nodename, selfax, txt, trans, ax, valmax){

    //   var node = self.vis.selectAll(nodename)
    //     .data(selfax.ticks(10), String)
    //     .attr("transform", tx);
    //   node.select("text")
    //       .text(txt);
    //   var nodee = node.enter().insert("g", "a")
    //       .attr("class", ax)
    //       .attr("transform", trans);
    //   nodee.append("line")
    //       .attr("stroke", stroke)
    //       .attr(ax+"1", 0)
    //       .attr(ax+"2", valmax);
    // return node
    // }

    //gx = gax("g.x", self.x, fx, tx, 'y', self.size.height)


    var gx = self.vis.selectAll("g.x")
        .data(self.x.ticks(10), String)
        .attr("transform", tx);

    gx.select("text")
        .text(fx);

    var gxe = gx.enter().insert("g", "a")
        .attr("class", "x")
        .attr("transform", tx);

    gxe.append("line")
        .attr("stroke", stroke)
        .attr("y1", 0)
        .attr("y2", self.size.height);



    var ticks_txt = function(node,ax,axpos,shift,txt, axdrag){
        node.append("text")
        .attr("class", "axis")
        .attr(ax, axpos)
        .attr("dy", shift)
        .attr("text-anchor", "end")
        .attr("font-family", "Times New Roman")
        .attr("font-size", sz_txt_ticks)
        .text(txt)
        .style("cursor", "ew-resize")
        .on("mouseover", function(d) { d3.select(this).style("font-weight", "bold");})
        .on("mouseout",  function(d) { d3.select(this).style("font-weight", "normal");})
        .on("mousedown.drag",  axdrag)
        .on("touchstart.drag", axdrag);
    }

    ticks_txt(gxe,"y",self.size.height,"1em",fx, self.xaxis_drag())

    gx.exit().remove();

    // Regenerate y-ticks…
    var gy = self.vis.selectAll("g.y")
        .data(self.y.ticks(10), String)
        .attr("transform", ty);

    gy.select("text")
        .text(fy);

    var gye = gy.enter().insert("g", "a")
        .attr("class", "y")
        .attr("transform", ty)
        .attr("background-fill", "#FFEEB6");

    gye.append("line")
        .attr("stroke", stroke)
        .attr("x1", 0)
        .attr("x2", self.size.width);
    
    ticks_txt(gye,"x",-3,".35em",fy, self.yaxis_drag())

    gy.exit().remove();
    if (self.drag_zoom == true){
      self.plot.call(d3.behavior.zoom().x(self.x).y(self.y)
                                .on("zoom", self.redraw())
                                //.on("drag", self.redraw())
                                );
      }
    else{
      self.plot.call(d3.behavior.zoom().x(self.x).y(self.y)
                                .on("zoom", null)
                                //.on("drag", null)
                                );
      //d3.event.stopPropagation(); 
    }
    self.update();    
  }  
}



var brush = d3.svg.brush()
    .x(x)
    .on("brush", brushmove)
    .on("brushend", brushend);


var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

svg.append("g")
    .attr("class", "brush")
    .call(brush)
  .selectAll('rect')
    .attr('height', height);

svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height + 20);



function brushmove() {
  var extent = brush.extent();
  points.classed("selected", function(d) {
    is_brushed = extent[0] <= d.index && d.index <= extent[1];
    return is_brushed;
  });
}

function brushend() {
  get_button = d3.select(".clear-button");
  if(get_button.empty() === true) {
    clear_button = svg.append('text')
      .attr("y", 460)
      .attr("x", 825)
      .attr("class", "clear-button")
      .text("Clear Brush");
  }

  x.domain(brush.extent());

  transition_data();
  reset_axis();

  points.classed("selected", false);
  d3.select(".brush").call(brush.clear());

  clear_button.on('click', function(){
    x.domain([0, 50]);
    transition_data();
    reset_axis();
    clear_button.remove();
  });
}

function transition_data() {
  svg.selectAll(".point")
    .data(data)
  .transition()
    .duration(500)
    .attr("cx", function(d) { return x(d.index); });
}

function reset_axis() {
  svg.transition().duration(500)
   .select(".x.axis")
   .call(xAxis);
}

