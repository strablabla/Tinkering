registerKeyboardHandler = function(callback) {
  var callback = callback;
  d3.select(window).on("keydown", callback);  
};


// var makeplot = function(elemid, data, params){
//     // if data is an array do nothing, if json, makes an array
//      if (typeof(data)=='string'){ 
//          if (data.match(/\.json/)!=null){
//              alert('it is a json')
//              d3.json(data, function(dat) {
//                     make_plot(elemid, dat, params)
//                     }); // end d3.json
//                 }  // end if json
//            } // end if string     
//        else{
//            make_plot(data)
//          }
//     }// end function


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

  // if (this.drag_zoom == true){
  //   alert('permitting drag')
  //     this.plot
  //         .on("mousedown.drag", self.plot_drag())
  //         .on("touchstart.drag", self.plot_drag())
  //         .call(d3.behavior.zoom().x(this.x).y(this.y)
  //         .on("zoom", this.redraw()));
  //     }

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

          // d3.selectAll(".brush").remove();
          // d3.selectAll('.brush').call(brush.clear());
          // d3.selectAll(".brush").call(brush());
          

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
        self.drag_zoom = ! self.drag_zoom; // toggle on zoom
        self.redraw()();
       } // end if
  }) // end keydown
};
  
//
// plot methods
//

plot.prototype.plot_drag = function() {
  var self = this;
  return function() {
    registerKeyboardHandler(self.keydown());
    d3.select('body').style("cursor", "move");
    if (d3.event.altKey) {                // drag the whole window
      var p = d3.svg.mouse(self.vis.node());
      var newpoint = {};
      newpoint.x = self.x.invert(Math.max(0, Math.min(self.size.width,  p[0])));
      newpoint.y = self.y.invert(Math.max(0, Math.min(self.size.height, p[1])));
      self.dataset.push(newpoint);
      self.dataset.sort(function(a, b) {
        if (a.x < b.x) { return -1 };
        if (a.x > b.x) { return  1 };
        return 0
      });
      self.selected = newpoint;
      self.update();
      d3.event.preventDefault();
      d3.event.stopPropagation();
    }    
  }
};

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

plot.prototype.datapoint_drag = function() {
  var self = this;
  return function(d) {
    registerKeyboardHandler(self.keydown());
    document.onselectstart = function() { return false; };
    self.selected = self.dragged = d;
    self.update();
  }
};

plot.prototype.mousemove = function() {
  var self = this;
  return function() {
    var p = d3.svg.mouse(self.vis[0][0]),
        t = d3.event.changedTouches;
    if (self.dragged) {
      self.dragged.y = self.y.invert(Math.max(0, Math.min(self.size.height, p[1])));
      self.update();
    };
    if (!isNaN(self.downx)) {           // moving x axis for zooming
      d3.select('body').style("cursor", "ew-resize");
      var rupx = self.x.invert(p[0]),
          xaxis1 = self.x.domain()[0],
          xaxis2 = self.x.domain()[1],
          xextent = xaxis2 - xaxis1;
      if (rupx != 0) {
        var changex, new_domain;
        changex = self.downx / rupx;
        new_domain = [xaxis1, xaxis1 + (xextent * changex)];
        self.x.domain(new_domain);
        self.redraw()();
      }
      d3.event.preventDefault();
      d3.event.stopPropagation();
    };
    if (!isNaN(self.downy)) { // moving y axis for zooming
      d3.select('body').style("cursor", "ns-resize");
      var rupy = self.y.invert(p[1]),
          yaxis1 = self.y.domain()[1],
          yaxis2 = self.y.domain()[0],
          yextent = yaxis2 - yaxis1;
      if (rupy != 0) {
        var changey, new_domain;
        changey = self.downy / rupy;
        new_domain = [yaxis1 + (yextent * changey), yaxis1];
        self.y.domain(new_domain);
        self.redraw()();
      }
      d3.event.preventDefault();
      d3.event.stopPropagation();
    }
  }
};

plot.prototype.mouseup = function() { // mouse in its normal state
  var self = this;
  return function() {
    document.onselectstart = function() { return true; };
    d3.select('body').style("cursor", "auto");
    if (!isNaN(self.downx)) {
      self.redraw()();
      self.downx = Math.NaN;
      d3.event.preventDefault();
      d3.event.stopPropagation();
    };
    if (!isNaN(self.downy)) { 
      self.redraw()();
      self.downy = Math.NaN;
      d3.event.preventDefault();
      d3.event.stopPropagation();
    }
    if (self.dragged) { 
      self.dragged = null 
    }
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

plot.prototype.xaxis_drag = function() {
  var self = this;
  return function(d) {
    document.onselectstart = function() { return false; };
    var p = d3.svg.mouse(self.vis[0][0]);
    self.downx = self.x.invert(p[0]);
  }
};

plot.prototype.yaxis_drag = function(d) {
  var self = this;
  return function(d) {
    document.onselectstart = function() { return false; };
    var p = d3.svg.mouse(self.vis[0][0]);
    self.downy = self.y.invert(p[1]);
  }




};
