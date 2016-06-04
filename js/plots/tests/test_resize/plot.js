registerKeyboardHandler = function(callback) {
  var callback = callback;
  d3.select(window).on("keydown", callback);  
};

var plot = function(elemid, add_data, add_nodes_links, params){
    ''' 
    Main method. 
    '''
    if (add_nodes_links != 'nolink'){
            queue() // important !!! need of d3.js v3 at least for using queue correctly
                .defer(d3.json, add_data)
                .defer(d3.json, add_nodes_links)
                .await(function(error, dataset, nodes_links){
                    new make_plot(elemid, dataset, nodes_links, params); 
                }); // end await
        } // if links
     else{
          queue() // important !!! need of d3.js v3 at least for using queue correctly
              .defer(d3.json, add_data)
              .await(function(error, dataset){
                  new make_plot(elemid, dataset, 'nolink', params);


      $('.chart').resize(function(){
      var w = $('.chart').width()
      //if (w<200){
          //alert('hello')
          $('#chart1').empty()
          new make_plot(elemid, dataset, 'nolink', params)
          //}
      })
  

              }); // end await
      } // end else
    }

make_plot = function(elemid, dataset, nodes_links, params) {
  var self = this;
  
  this.id = elemid        // identity for the plot
  this.dataset = dataset
  this.nodes_links = nodes_links
  this.chart = document.getElementById(elemid);
  this.params = params || {};
  this.xlim = this.params['xlim']  // xlim 
  this.ylim = this.params['ylim']  // ylim 
  this.xlabel = this.params['xlabel'] // xlabel
  this.ylabel = this.params['ylabel']  // ylabel
  this.title = this.params['title'] // title
  this.col = this.params['color'] || 'k'; // Color used for the line
  this.cx = this.chart.clientWidth; // chart width
  this.cy = this.chart.clientHeight; // chart height
  fillplot = this.params['fill'] || "#EEEEEE"
  var colrs = {'r':'red', 'k':'black', 'b':'blue', 'g':'green'};
  // Interaction Parameters 
  this.show_circle = false; //
  this.moveaxis = false
  this.drag_zoom = false  // drag and mouse rolling zoom. 
  this.brush_active = false // brush tool for zoom
  this.list_domains = []
  this.zoom_margin = 20 // margin for dragging zoom 
  this.show_grid = true; // boolean for plotting the grid or not. 
  text_nb = 0
  list_txt = []
  this.insert_text = false // boolean for inserting text in the plot or not.
  this.zoomx = false // boolean for zoom only in x. 
  this.poszoom = 0   // index of the current zoom
  this.show_navig_plot = true;
  this.nbdecim = 3; // number of decimals
  this.zoom_direct = false;
  // Commands
  // Each commands executed is supposed to eliminates the other one in possible conflict.
  // * c : show the circles for modifying the plot
  // * b : mode brush
  // * q : makes a zoom in x.. 
  // * d : toggle for drag and zoom.
  
  

  var help_plot = function(){/*
  
   # Commands
   Each commands executed is supposed to eliminates the other ones in possible conflict.
   * c : show the circles for modifying the plot
   * b : zoom with brush
   * q : zoom in x with brush
   * d : toggle for drag and zoom.
   * x : move backward in the zoom
   * v : move forward in the zoom
   */}.toString().slice(14,-3)
  
  var tools = function(){/*
  
   # All tools
   Click on the tool
   * c : show the circles for modifying the plot
   * b : box zoom 
   * q : zoomx
   * d : toggle for drag and zoom.
   * x : move backward in the zoom
   * v : move forward in the zoom
   */}.toString().slice(14,-3)

  simple_md = function(text){          // mini markdown for the help
      var all_text = text.split('\n')
      var htm = $('<div/>')           // main html 
      var ul = $('<ul/>')             // preparing lists
      for (i in all_text){
          var text_insert = all_text[i].trim()    // cleaning
          if (all_text[i].match(/\s*\*/)){
              ul.append($('<li/>').text(text_insert.slice(1)))    // Make li
              }     // end if
          else if (all_text[i].match(/\s*\#/)){
              htm.append($('<h1/>').text(text_insert.slice(1)))    // Make h1
              }   // end if
          else{htm.append($('<p/>').text(text_insert)).css({'text-align':'left'})}
      }    // end for
      htm.append(ul); // Append the list at the end
      return htm.html()
  }     // end function

  var tr = function(w, h, ang){      // General translations and rotations in the svg
     ang = ang || 0
     return "translate(" + w + ","+ h + ") rotate(" + ang + ")"
      }

this.mousedownonelement = false;

window.getlocalmousecoord = function (svg, evt) {
    var pt = svg.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    var localpoint = pt.matrixTransform(svg.getScreenCTM().inverse());
    localpoint.x = Math.round(localpoint.x);
    localpoint.y = Math.round(localpoint.y);
    return localpoint;
};

window.createtext = function (localpoint, svg, txt, cl, ang, WW, HH) { // Create editable text in the svg
    var myforeign = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')
    var textdiv = document.createElement("div");
    var svgtxt = txt ||  "Click to edit";
    var angle = ang || 0;
    var clss = cl || 'noclass'
    var W = WW || '150';
    var H = HH || '40';
    var textnode = document.createTextNode(svgtxt);
    textdiv.appendChild(textnode);
    textdiv.setAttribute("contentEditable", "true");   // Editable
    textdiv.setAttribute("width", "auto");
    textdiv.setAttribute("class", cl);
    textdiv.setAttribute("id", txt + self.id);   //+self.id
    myforeign.setAttribute("width", W+"px"); // "100%"
    myforeign.setAttribute("height", H+"px"); // "60px"
    myforeign.classList.add("foreign");                      //to make div fit text
    textdiv.classList.add("insideforeign");                   //to make div fit text
    textdiv.addEventListener("mousedown", elementMousedown, false);
    myforeign.setAttributeNS(null, "transform", "translate(" + localpoint.x + " " + localpoint.y + ") rotate(" + angle + ")");
    svg.appendChild(myforeign);
    myforeign.appendChild(textdiv);

}; // end createtext

function elementMousedown(evt) {
    self.mousedownonelement = true;
}

  this.add_html = function(node, htm, w, h, ang, width, height, fclass){ // adding html in the plot
      ww = width || 200;
      hh = height || 100;
      cl = fclass || 'nofcl';
      var htmnode = node.append('foreignObject')
          .attr("transform", tr(w-100, h, ang))
          .attr('width', ww)
          .attr('height', hh)
          .attr('class', cl)
          .append("xhtml:body")
          .html(htm)
      return htmnode
      }
  
  var add_txt = function(label, w, h, ang, cl, W, H){    // adding text in the plot, position : (w, h), angle : ang
      var vv = document.getElementById('vis' + self.id);
      createtext({"x":w,"y":h}, vv, label, cl, ang, W, H)  
      }

  var add_txt_axis = function(label, w, h, ang, W, H){    // adding axis, (for Title and axis)
      add_txt(label, w, h, ang, 'axis_txt', W, H)  
      $('.axis_txt').addClass('axis')  
      return $('#' + label + self.id)  
      } 
          
  this.padding = {                                  // padding for the plot
     // "top":    this.title  ? 40 : 20,
     "top":    this.title  ? 80 : 20,
     "right":                 70,
     "bottom": this.xlabel ? 200 : 10,
     "left":   this.ylabel ? 70 : 45
  };

  this.size = {                                                         // real size of the figure
    "width":  this.cx - this.padding.left - this.padding.right,
    "height": this.cy - this.padding.top  - this.padding.bottom
  };
  
  make_scale = function(lim, size, inv){            // scale for the axis
      var inv = inv || false
      if (!inv){interv = [lim[0], lim[1]]} else {interv = [lim[1], lim[0]]}
      var scale = d3.scale.linear().domain(interv).nice().range([0, size]).nice();
      return scale
  }

  this.x = make_scale(this.xlim,this.size.width)          // x-scale
  this.y = make_scale(this.ylim,this.size.height, true)  // y-scale (inverted domain)
  this.downx = Math.NaN;       // drag x-axis logic
  this.downy = Math.NaN;        // drag y-axis logic
  this.dragged = this.selected = null;
  
  this.line = d3.svg.line()                                      // defining line function
      .x(function(d, i) { return this.x(this.dataset[i].x); })
      .y(function(d, i) { return this.y(this.dataset[i].y); })
      .interpolate('linear')
      
  datacount = this.size.width/30;
  
  this.vis = d3.select(this.chart).append("svg") // Create the main svg 
      .attr("width",  this.cx)
      .attr("height", this.cy)
      .attr("id", "vis" + self.id)
      .append("g")
        .attr("transform", tr(this.padding.left, this.padding.top));

  this.plot = this.vis.append("rect")  // For pointer events
      .attr("width", this.size.width)
      .attr("height", this.size.height)
      .style("fill", fillplot) 
      .attr("pointer-events", "all")
      .attr('class', self.id)

  if (this.drag_zoom == true){                  // drag and zoom in the whole plot
      this.plot
          .on("mousedown.drag", self.plot_drag())
          .on("touchstart.drag", self.plot_drag())
          .call(d3.behavior.zoom().x(this.x).y(this.y)
          .on("zoom", this.redraw_all()));
      }

  d3.select(this.chart)                         // drag the points of the curve
      .on("mousemove.drag", self.mousemove())
      .on("touchmove.drag", self.mousemove())
      .on("mouseup.drag",   self.mouseup())
      .on("touchend.drag",  self.mouseup());

  // add Chart Title
  if (this.title) {
        tit = add_txt_axis(this.title, this.size.width/2, 20)
        tit.css({"font-family": "Times New Roman","font-size": "25px"}) //"dy":"-1em",
        }
  // add the x-axis label
  if (this.xlabel) {
      var xlab = add_txt_axis(this.xlabel, this.size.width/2+50, 1.35*this.size.height)
          xlab.css({"font-family": "Times New Roman","font-size": "20px"}) //"dy":"2.4em", 
        }
  // add y-axis label
  if (this.ylabel) {
      var ylab = add_txt_axis(this.ylabel, 20, this.size.height, -90)
          ylab.css({"font-family": "Times New Roman","font-size": "20px"})
        }
        
    this.set_view = function(extent){                      // set the view for a given extent (double list). 
          self.x1 = self.x.invert(extent[0][0]); self.x2 = self.x.invert(extent[1][0]) // x1, x2
          self.y1 = self.y.invert(extent[0][1]); self.y2 = self.y.invert(extent[1][1])  // y1, y2
          self.x.domain([self.x1, self.x2]);                     // set x domain
          self.y.domain([self.y1, self.y2]);                     // set y domain
          self.list_domains.push([[self.x1, self.x2], [self.y1, self.y2]])       // save views in history
       }
        
    self.set_view([[0,0],[this.size.width, this.size.height]]) // Save the first view in self.list_domains (Initialisation)
  
    this.redraw_all()();
    
    this.vis.append("svg") // line attached to svg block"viewBox
      .attr("top", 0)
      .attr("left", 0)
      .attr("width", this.size.width)
      .attr("height", this.size.height)
      .attr("viewBox", "0 0 "+this.size.width+" "+this.size.height)
      .attr("class", "line")
      .append("path")
          .attr("class", "line") // line above grid
          .attr("d", this.line(this.dataset))
          .style({stroke : colrs[this.col], fill : 'none','stroke-width' : '1.5px'})

    if (self.show_navig_plot){
              $('#' + elemid).css({'height':'650'})
              $('#vis' + elemid).attr('height',650)
          }
          else{
              $('#' + elemid).css({'height':'500'})
              $('#vis' + elemid).attr('height',500)
          }

    self.refresh_navig_plot() // navig plot above the line

  this.make_brush = function(){                // zoom box with brush tool
      //alert("make brush")
      self.brush = self.vis.append("g")
         .attr("class", "brush")
         .call(d3.svg.brush()
           .x(d3.scale.identity().domain([0, self.size.width]))
           .y(d3.scale.identity().domain([0, self.size.height])) 
           .on("brush", function() {
               extent = d3.event.target.extent();
               if (self.zoomx ==true){                // zoomx
                   d3.selectAll(".extent")
                        .attr('height', self.size.height)
                        .attr('y',0)
                    extent[0][1] = 0;
                    extent[1][1] = self.size.height;
                }
            }) // end on brush
           .on("brushend", function(){
                d3.selectAll(".zoom_interact").remove()
                self.poszoom = self.list_domains.length;
                if ($('#direct_zoom').prop('checked')){
                  self.direct_zoom = true;
                  zoom_in()   // at the end of the brush action make a zoom
                }
                else{
                    var rr = self.vis 
                    .append('rect') // rectangle inside the brush rectangle
                    .attr("x", extent[0][0]+self.zoom_margin/2)
                    .attr("y", extent[0][1]+self.zoom_margin/2)
                    .attr("width", function(){return Math.abs(extent[0][0]-extent[1][0])-self.zoom_margin})
                    .attr("height", function(){return Math.abs(extent[0][1]-extent[1][1])-self.zoom_margin})
                    .attr("class", "brush zoom_interact")
                    .style("stroke","red")
                    .style("fill","red")
                    .style('opacity', .15)
                    .on('click', function(){
                      self.direct_zoom = false; // no direct zoom
                      zoom_in()
                    }) // end on
                } // end else
               })  // end "brushend"
            ) // end call
        } // end make_brush

  this.new_view = function(view_coord){
          self.x.domain(view_coord[0]);
          self.y.domain(view_coord[1]);
          self.redraw_all()();
     }
     
  this.deactivate_all_not = function(avoid){  // deactivate all the tools but.. 
      if ((avoid != 'b') & (avoid != 'q') ){
          d3.selectAll(".brush").remove();  // deactivate brush
          self.brush_active = false;
        }
     if (avoid != 'i'){
         if (self.insert_text == true){
             $("#vis"+self.id).off('click');
         }
     }
  }
  
  var zoom_in = function(){ // zoom in for zoom_b and zoomx
      
      d3.selectAll(".zoom_interact").remove() // remove the additional zoom windows
      self.set_view(extent)      // change the view
      self.redraw_all()();    // redraw axis etc
      d3.selectAll(".brush").remove();
      self.make_brush()    // reimplement the brush tool
      self.redraw_all()();    // redraw axis etc
  }

  var keyev = function(key, event){
    //deactivate_all_not(key)
    return (event.keyCode == key.charCodeAt(0)-32 && event.shiftKey)
  }
  
  $(document).keydown(function(event){   
      if(keyev('t', event)){    // "h", key for tools documentation
              $('.alertify .alert > *').css({'text-align':'left'});
              alertify.alert(simple_md(tools))
        } // end if key code          
      if(keyev('h', event)){    // "h", key for help documentation
              $('.alertify .alert > *').css({'text-align':'left'});
              alertify.alert(simple_md(help_plot))
        } // end if key code
      if(keyev('c', event)){    // add and remove circles.. 
          self.show_circle = !self.show_circle;
          self.vis.selectAll('circle').remove()
          self.redraw_all()();
      } // end if keyev

      if(keyev('d', event)){         // select the brush tool
           self.deactivate_all_not('d')   // deactivate all the other tools
           self.drag_zoom = ! self.drag_zoom;                          // toggle drag_zoom
           self.redraw_all()();
          } // end if keyev
          
      if(keyev('n', event)){         // remove the navig board. 
          self.show_navig_plot = ! self.show_navig_plot
          if (self.show_navig_plot){
              $('#' + elemid).css({'height':'650'})
              $('#vis' + elemid).attr('height',650)
          }
          else{
              $('#' + elemid).css({'height':'500'})
              $('#vis' + elemid).attr('height',500)
          }
           self.redraw_all()();
          } // end if keyev

      if(keyev('g', event)){      //  activate deactivate the grid
          self.deactivate_all_not('g')   // deactivate all the other tools
          self.show_grid = ! self.show_grid;
          self.redraw_all()();
          }     // end if keyev

      if(keyev('q', event)){      //  activate deactivate the direct zoom
          alert($('#direct_zoom').prop('checked'))
          }     // end if keyev
    
      if(keyev('a', event)){      //  activate deactivate the grid
          alert('aaaa')
          self.cx = 200
          self.redraw_all()();
          }     // end if keyev

  }) // end keydown
}; // end make_plot

//
// plot methods
//

make_plot.prototype.plot_drag = function() {
  var self = this;
  return function() {
    registerKeyboardHandler(self.keydown());
    d3.select('body').style("cursor", "move"); 
  }
};

make_plot.prototype.refresh_navig_plot = function() {
    var self = this;
    $('#navig_plot' + self.id).remove() // removing the menu
    self.menuplot(this.vis, this.add_html) // make the menu
    if (self.show_navig_plot == false){
        $('#navig_plot'+self.id).hide(); 
        }
    }

make_plot.prototype.update = function() {
    // update graph, axes, labels, circles..
    var self = this;
    var lines = this.vis.select("path").attr("d", this.line(this.dataset));
    self.refresh_navig_plot()   
    if (d3.event && d3.event.keyCode) {
    d3.event.preventDefault();
    d3.event.stopPropagation();
    } // end if
}

make_plot.prototype.mousemove = function() { // handling mouse movements
  var self = this;
  return function() {
    var p = d3.svg.mouse(self.vis[0][0]),
        t = d3.event.changedTouches;
    if (self.dragged) {
      self.dragged.y = self.y.invert(Math.max(0, Math.min(self.size.height, p[1])));
      self.update();
    };
  }
};

make_plot.prototype.mouseup = function() { // mouse in its normal state
  var self = this;
  return function() {
    document.onselectstart = function() { return true; };
    d3.select('body').style("cursor", "auto");
    if (self.dragged) { 
      self.dragged = null 
    }
  }
}

make_plot.prototype.redraw_all = function() {         // redraw the whole plot
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
    var sz_txt_ticks = "14px"                   // size of ticks text
    var make_axes = function(nodename, selfax, trans, txt, ax1, ax2, valmax, stroke){  // grid
      var node = self.vis.selectAll(nodename)
        .data(selfax.ticks(10), String)
        .attr("transform", trans);
      node.select("text")
          .text(txt);
      var nodee = node.enter().insert("g", "a")
          .attr("class", ax1)
          .attr("transform", trans);
      nodee.append("line")                          // make the lines
            .attr("class", "grid "+self.id)
            .attr("stroke", stroke)
            .attr(ax2+"1", 0)
            .attr(ax2+"2", valmax);

    return [node, nodee]
    } // end make_axes
    var ticks_txt = function(node, ax, axpos, shift, txt){          // text for the axes
        node.append("text")
            .attr("class", "axis")
            .attr(ax, axpos)
            .attr("dy", shift)
            .attr("text-anchor", "end")
            .attr("font-family", "Times New Roman")
            .attr("font-size", sz_txt_ticks)
            .text(txt)
            .style("cursor", "ew-resize")
    }
    // Regenerate x-ticks… 
    gg = make_axes("g.x", self.x, tx, fx, 'x', 'y', self.size.height, stroke)
    gx = gg[0]; gxe = gg[1]
    ticks_txt(gxe, "y", self.size.height, "1em", fx)
    gx.exit().remove();
    // Regenerate y-ticks…
    gg = make_axes("g.y", self.y, ty, fy, 'y', 'x', self.size.width, stroke)
    gy = gg[0]; gye = gg[1]
    ticks_txt(gye,"x",-3,".35em",fy)
    gy.exit().remove();
    grid_dic = {'x2':{true:self.size.width, false:0}, 'y2':{true:self.size.height, false:0}}
    $('g.y line.grid').each(function(){$(this).attr("x2", grid_dic['x2'][self.show_grid])}) 
    $('g.x line.grid').each(function(){$(this).attr("y2", grid_dic['y2'][self.show_grid])}) 
    if (self.drag_zoom == true){
         self.plot
         .call(d3.behavior.zoom().x(self.x).y(self.y)
                                .on("zoom", self.redraw_all())
                                )}            // end if self.drag_zoom
    self.update();       // update the whole plot
  }  
}

function make_labels(svg, nodes_links, w, h) {
    var color = d3.scale.category20();
    

    var nodes = nodes_links.nodes
    var links = nodes_links.links
    var factx = 15
    var facty = 70
    var shift = 200
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
                    .attr("marker-end", "url(#end)")
                    .attr("class","lll")
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

make_plot.prototype.navig_button = function(func, glyph, arg, tooltip){
      self = this;
      navmenu = $('#navig_plot' + self.id) 
      if (glyph != null){
            navmenu.append($('<button/>').attr('title', tooltip)
                .append($('<span/>').attr('class', glyph))
              .click(function(){
                  if (arg != null){func(arg)} // code with glyphicon and arg
                  else{func()} // code with glyphicon without arg
              })
          ) // end append button
       } // end if glyph
      else{navmenu.append(func())} // code without glyphicon
    } // end navig_button

make_plot.prototype.menuplot = function(fig, add_html){
    self = this;

    // add_html(fig,'<div id="navig_plot'+self.id+'"'+' class ="infos"></div>', 320,-0, 0, 600, 300) // x, y, ang, w, h
    add_html(fig,'<div id="navig_plot'+self.id+'"'+' class ="navig_plot"></div>', 160, 400, 0, 375, 300, 'navplt') // x, y, ang, w, h
    
    show_poszoom = function(){  // show current zoom position in the list of saved zoomed
        var numtot = Math.max(1, self.list_domains.length)
        var pos = self.poszoom+1 // increment zoom position
        return $('<span/>').attr('id','poszoom').text(pos+'/'+numtot)  // return position with number total of zooms saved.
    }

    zoom_nav = function(dir){         // Zoom navigation
        if (dir == 'forward'){              //  Go to next zoom view
            var elem_next = self.list_domains[self.poszoom+1]
            if (self.poszoom != self.list_domains.length-1){self.poszoom += 1}
            self.new_view(elem_next)
            }
        else if (dir == 'back'){             //  Go to previous zoom view
            var elem_prec = self.list_domains[self.poszoom-1]
            if (self.poszoom != 0){self.poszoom += -1;}
            self.new_view(elem_prec)
            }
        else if (dir == 'home'){            //  Go to first view
            var elem_first = self.list_domains[0];
            self.new_view(elem_first);
            self.poszoom = 0;
            }
      } // end zoom_nav
    
    put_text = function(){
         self.insert_text = ! self.insert_text;
            $('#vis'+self.id).click(function (evt) {
                var svg = document.getElementById('vis' + self.id);
                var localpoint = getlocalmousecoord(svg, evt);
                if (!self.mousedownonelement) {
                    createtext(localpoint, svg); // insert text with mouse
                } else {
                    self.mousedownonelement = false;
                }
            }); // end vis click
            if (self.insert_text == false){
                $("#vis"+self.id).off('click');
                } // end if
            self.redraw_all()()
       }
    
    grid_on_off = function(){    // grid on/off
        self.deactivate_all_not('g')   // deactivate all the other tools
        self.show_grid = ! self.show_grid;
        self.redraw_all()();
        } // end grid_on_off
    
    brush_b = function(){ // zoom box
        if (self.brush_active == true){
            self.deactivate_all_not('b')           // deactivate all the other tools
            if (self.zoomx == true){self.zoomx = false} //alert("passing zoomx to false")
        }
        else {
            self.make_brush();
            self.brush_active = true;
            }
        } // end brush_b
    
    brush_q = function(){   // zoom only in x
        self.zoomx = ! self.zoomx;
        if (self.brush_active == true){
            self.deactivate_all_not('q')            // deactivate all the other tools
        }
        else{
            self.make_brush();
            self.brush_active = true;
            } 
        } // end brush_q
    go_home = function(){       // return to the first view
        zoom_nav('home')
        var numtot = Math.max(1, self.list_domains.length)
        var pos = 1
        $('#poszoom').text(pos+'/'+numtot)
    }
    
    drag_plot = function(){    // drag the plot
        self.deactivate_all_not('d')   // deactivate all the other tools
        self.drag_zoom = ! self.drag_zoom;     // toggle drag_zoom
        self.redraw_all()();
    }
    
    self.navig_button(put_text, "glyphicon glyphicon-pencil", null, 'add text')  // add text
    self.navig_button(grid_on_off, "glyphicon glyphicon-th", null, 'toggle the grid')   // toggle grid
    self.navig_button(brush_b, "glyphicon glyphicon-search", null, 'pass to zoom box') // zoom box
    self.navig_button(brush_q, "glyphicon glyphicon-pause", null, 'pass to zoom in x')  // zoomx
    self.navig_button(go_home, "glyphicon glyphicon-home", null, 'go to first zoom') // go to first zoom
    self.navig_button(drag_plot, "glyphicon glyphicon-move", null, 'drag the plot')   // drag the plot
    self.navig_button(zoom_nav, "glyphicon glyphicon-chevron-left", "back", 'got to previous zoom')    // go to previous zoom
    self.navig_button(zoom_nav, "glyphicon glyphicon-chevron-right", "forward", 'got to next zoom')   // go to next zoom
    self.navig_button(show_poszoom)                  // indicate where is the view in all the views
    //alert("menu_plot "+self.x1)
    $('#navig_plot'+self.id).append($('<div/>')
                                .append($('<span/>').text('x coord : '))
                                .append($('<input/>').attr("size","25px")
                                                     .val(self.x1.toFixed(self.nbdecim)+','+self.x2.toFixed(self.nbdecim))
                                        ) // end append input
                            ) // end append div
    $('#navig_plot'+self.id).append($('<div/>')
                                .append($('<span/>').text('y coord : '))
                                    .append($('<input/>').attr("size","25px")
                                                     .val(self.y1.toFixed(self.nbdecim)+','+self.y2.toFixed(self.nbdecim))
                                        ) // end append input
                            ) // end append div
    
    $('#navig_plot'+self.id).append($('<div/>').append($('<span/>').text('direct zoom'))
                                                .append($('<input/>').attr('type','checkbox').attr('id','direct_zoom')
                                        )// end append input
                            ) // end append div
     $('#navig_plot'+self.id) //.draggable()
    if (self.direct_zoom == true){$('#direct_zoom').prop('checked', true)} // checkbox true for direct zoom
    $(document).ready(function(){ // activates the tooltips
                $('[data-toggle="tooltip"]').tooltip(); 
            })

    
} // end menu_plot
