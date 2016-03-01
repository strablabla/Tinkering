
var tr = function(w, h, ang){      // Translation and Rotation
 ang = ang || 0
 return "translate(" + w + ","+ h + ") rotate(" + ang + ")"
  }

// d3.select('#thesvg').append('text')
//     .attr("transform", tr(20,30))
//     .text("hello")
//     .attr("contentEditable", "true")


var mousedownonelement = false;

window.getlocalmousecoord = function (svg, evt) {
    var pt = svg.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    var localpoint = pt.matrixTransform(svg.getScreenCTM().inverse());
    localpoint.x = Math.round(localpoint.x);
    localpoint.y = Math.round(localpoint.y);
    return localpoint;
};

window.createtext = function (localpoint, svg, txt, cl) {
    var myforeign = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')
    var textdiv = document.createElement("div");
    //var textdiv = $("<div/>");
    var svgtxt = txt ||  "Click to edit"
    var textnode = document.createTextNode(svgtxt);
    textdiv.appendChild(textnode);
    textdiv.setAttribute("contentEditable", "true");
    textdiv.setAttribute("width", "auto");
    textdiv.setAttribute("class", cl);
    myforeign.setAttribute("width", "100%");
    myforeign.setAttribute("height", "100%");
    myforeign.classList.add("foreign"); //to make div fit text
    textdiv.classList.add("insideforeign"); //to make div fit text
    textdiv.addEventListener("mousedown", elementMousedown, false);
    myforeign.setAttributeNS(null, "transform", "translate(" + localpoint.x + " " + localpoint.y + ")");
    svg.appendChild(myforeign);
    myforeign.appendChild(textdiv);

};

function elementMousedown(evt) {
    mousedownonelement = true;
}

var add_txt = function(node,label,w,h,ang,cl){    // adding text in the plot, position : (w, h), angle : ang
    // alert(w+'  '+h)
    // alert(label)
    createtext({"x":w,"y":h}, node, label, cl)  
    }

var add_txt_axis = function(node, label,w,h,ang){    // adding axis, (for Title and axis)
    add_txt(node, label,w,h,ang,'axis_txt')  
    $('.axis_txt').addClass('axis')  
                  .attr("id", label)
    return $('#'+label)  
    }

$('#thesvg').click(function (evt) {
    var svg = document.getElementById('thesvg');
    var localpoint = getlocalmousecoord(svg, evt);
    if (!mousedownonelement) {
        createtext(localpoint, svg);
    } else {
        mousedownonelement = false;
    }
});



