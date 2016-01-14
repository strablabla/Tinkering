
var drag_joy = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on("dragstart", dragstarted)
    .on("drag", dragged_joy)
    .on("dragend", dragended);
    
var joy = function(data, name_svg){

	var joy_base = name_svg
      .selectAll("svg_joy_base")
      .data(data)
      .enter()
      .append("ellipse")       // attach an ellipse
      .attr("cx", function(d){return d.x})           // position the x-centre
      .attr("cy", function(d){return d.y;})           // position the y-centre
      .attr("rx", 70)           // set the x radius
      .attr("ry", 70)           // set the y radius
      .attr("fill", "black")
      .attr("class", "joy")

    var joy_butt = name_svg
      .selectAll("svg_joy_button")
      .data(data)
      .enter()
      .append("ellipse")       // attach an ellipse
      .attr("cx", function(d){return d.x})           // position the x-centre
      .attr("cy", function(d){return d.y;})           // position the y-centre
      .attr("rx", size_joy_butt)           // set the x radius
      .attr("ry", size_joy_butt)           // set the y radius
      .attr("fill", function(d){return d.col;})
      .attr("class", "joy")
      .call(drag_joy);
}



function dragstarted(d) {
  d3.event.sourceEvent.stopPropagation();
  d3.select(this).classed("dragging", true);
}

function dragged_joy(d) {
  d3.select(this).attr("cx", d.x  = d3.event.x)  
  				 .attr("cy", d.y  = d3.event.y); 
  $("#joypos").html((d.x-150).toString()+","+(d.y-150).toString())
    }

function dragended(d) {
  d3.select(this).classed("dragging", false)	
  				 .transition()
  				 .attr("cx", d.x  = 150)  
  				 .attr("cy", d.y  = 150); 
}

