var maketoc = function(){
    
    // Javascript code to ease navigation in notes written in Markdown
    // format and transformed with strapdown in html code. 
    // Maketoc supposes the code is yet in html format.
    // The whole code uses extensively jQuery library.
    // Commands:
    //  * :: , close the list and make a toggle tool in the main page.
    //  * --link-- , creates a tag with id "link"
    //  * [video ;;](hyperlink) insert a video with the hyperlink through iframe element.
    //  * [pdf §§](hyperlink) insert a pdf with object tag.
    //  * write novideo at the beginning of the document to avoid loading of videos.
    //  * @@blabla, cut the <li>, blabla@@ paste the <li>
    //  * key "k" to make appear disappear the sliders.
    // https://github.com/strablabla/Tinkering/4d6408c/js/straptoc/straptoc.js 
    
    var reg_date = /\d{1,2}\/\d{1,2}\/\d{2}/; //find dates whatever is its position with regexp
    var reg_id = /--\w*--/; //regexp for identity
    var num_slider = 0
    var reg_col = /^\§col\s*/
    var reg_width_video = /^\§width_video\s*/
    var reg_width_pdf = /^\§width_pdf\s*/
    var reg_sign = /[^§]§[^§]\w*/
    
    $('body').prepend($('<div/>').addClass('onside').attr('id',"toc"))
    
    param = {'color':{'reg':reg_col, 'cut':'§col', 'var': 'green'},
             'vid_width':{'reg':reg_width_video, 'cut':'§width_video', 'var': '80%' },
             'pdf_width':{'reg':reg_width_pdf, 'cut':'§width_pdf', 'var': '80%'}}
    // $("p").each(function(){    
    //     if ($(this).html().match(reg_sign)){
    //         alert($(this).html())
            
    //         var listspl = $(this).html().split('§').slice(1)
    //            for (ll in listspl){
    //                alert(listspl[ll])
    //                $('body').append(('<p/>').text('§'+listspl[ll]))
    //                }
    //         $(this).hide()
    //         //alert($(this).html().split('§'))
    //         }// end if
    //     }) // end each
    $("p").each(function() {                                
        if ($(this).html().match(reg_date)){
            $(this).replaceWith(function(){                 // Replacing dates with p in date with h2 and 
                var h1prev = $(this).prev("h1").text()
                var dateh2 = $('<h2/>').text($(this).text())
                return dateh2; 
               }) // end replaceWith
           } // end if
        for (elem in param){
            if ($(this).text().match(param[elem]['reg']) != null){  // finds loading parameters
                var interm = $(this).text().split(param[elem]['cut'])[1]
                var newtag = $('<p/>').text('')
                $(this).replaceWith(newtag)
                param[elem]['var'] = interm
               }// end if
        } // end for
    }); // end each
    
    $('#toc').append($('<a/>').append($('<span/>').text("[--]").addClass('li_h1')));
    var ul1 = $("<ul/>"); // first levels with class
    $('#toc').append(ul1);
    // read all the headers and make the TOC (with ref) and the id names
    for(var i = 0,  elems = $(":header"); i < elems.length; i++) {
            var nameh = elems[i].innerHTML.trim().split(reg_id)[0];
            elems[i].id = nameh; 
            if($('[id=' + '"' + nameh + '"'+']').prop("tagName") == 'H1')    // if H1
                {                        
                var nameh1 = nameh
                var li1 = $("<li/>");
                ul1.append(li1);
                var ul2 = $("<ul/>").addClass('lev1');                     // second levels with class
                li1.append($('<a/>').attr('href', namehhref).css({'color': 'black'}).html(nameh)
                    		 .append($('<span/>').text(" [-]").addClass('li_h2'))) // en append ul
                li1.append(ul2);
            } // end if H1
            else if($('[id=' + '"' + nameh + '"'+']').prop("tagName") == 'H2') // if H2
                {
                elems[i].id = nameh1 +'_'+ nameh;                               // makes an id for H2
                var nameh2 = elems[i].id
                var namehhref = '#'+nameh2;
                var li2 = $("<li/>");
                ul2.append(li2);
                var ul3 = $("<ul/>").addClass('lev2'); 
                li2.append($('<a/>').attr('href', namehhref).html(nameh)
                					.append($('<span/>').text(" [-]").addClass('li_h3'))) // end of li
                    .css({'list-style': 'square inside','line-height': '20px'}) // end append li2
                li2.append(ul3)
                } // end else if H2
            else if($('[id=' + '"' + nameh + '"'+']').prop("tagName") == 'H3')
                {
                elems[i].id = nameh2 +'_'+ nameh;                               // makes an id for H3
                var nameh3 = elems[i].id
                var namehhref = '#'+nameh3;
                var li3 = $("<li/>");
                ul3.append(li3);
                //var ul4 = $("<ul/>").addClass('lev3'); 
                li3.append($('<a/>').attr('href', namehhref).html(nameh).addClass(nameh)) // end of li
                    .css({'list-style': 'circle inside','line-height': '20px'}) // end append li3
                } // end else if H3
    }                                                                   // end for elems
    $("li").each(function(){ //
             var htm = $(this).html();
             if (htm.split('\n')[0].match(/@@\w+/) != null){
                var htmnew = htm.replace(/@@\w+/, '')
                copy = $(this).clone()
                copy.html(htmnew)
                $(this).html(htmnew)
                $("li").each(function(){ //
                    var htm = $(this).html();
                    if (htm.split('\n')[0].match(/\s*\w+@@/) != null){
                        var htmnew = htm.replace(/\s*\w+@@/, '')
                        $(this).html(htmnew)
                        $(this).append(copy)
                    } // end if
                }) // end each
            }// end if
        })// end each
    // bit of code for closing list when it finds :: in the code.
    $("li").each(function(i){    // need to be placed before  $("a").click    
        var htm = $(this).html(); var childr = $(this).children('ul')
        if(htm.split('\n')[0].search('::')!=-1){ 
                childr.toggle();                // close the sub lists 
                childr.css({'color': param['color']['var']})   // change color children
                $('<a/>').append($('<span/>').text(" [-]").addClass('::'))
                         .insertBefore(childr)
            } // end if 
        }); // end each
    $("H1, H2, p, a, li").each(function(){       // insertion of <p> with id in tag <a>
        if($(this).html().split('\n')[0].search(reg_id)!=-1){
            match_id = $(this).html().match(reg_id)[0]
            var idslice = match_id.slice(2,-2)
            var text = $(this).html().replace(match_id,"")
            $(this).html(text);
            if ($(this).prop("tagName")=='LI'){
                if ($(this).children('a').length >0){
                    //alert($(this).children('a').prop('tagName'))
                    $(this).children('ul').prepend($("<a/>").attr("id",idslice))
                    } // yet existing <a> for folding list.
                else{$("<a/>").attr("id",idslice).insertBefore($(this).children('ul'))} // no  <a> for folding list.
                }
            else{$("<p/>").attr("id",idslice).insertBefore($(this))} // general case, insert <p> before the tag
            }// end if
        }); // each
    $('ul').each(function (){  // remove the ::
            if ($(this).find("*").hasClass('::')){
                var html = $(this).html().replace(/\:\:[\s\w\-]*\<a\>/g,'\<a\>')
                $(this).html(html)
            }
          } // end function after each
        )// end each
    $('ul.lev1').toggle();                          //  close level 1 in TOC
    $('ul.lev2').toggle();                          //  close level 2 in TOC
    $("a").click(function (evt) {                   // toggle for H1
        var evtc = evt.target.className;
        if(evtc == 'li_h1' | evtc == 'li_h2' | evtc == 'li_h3' | evtc == '::') 
            $(this).next().toggle();
        });// end click
    
    jQuery(document).bind('keydown', function (evt){
        $("a").each(function(i){ 
            if ($(this).prop('id').match(/slider_\d*/) != null ){
                $(this).toggle()
                }
            }); // each
       }); // end bind
    var reg_hyper = /\[\w*.*\]\(\w*.*\)/
    var reg_brack = /\[\w*.*\]/
    var reg_parent = /\(.*\w*.*\)/
    var sel = [';;','§§']
    var debend = {';;' : {'deb' : '<iframe width='+'"' + param['vid_width']['var'] + '"' + 'height="315" src="', 'end' : '" frameborder="0" allowfullscreen></iframe>','color':'#cc99ff'},
                   '§§': {'deb' : '<object width='+'"' + param['pdf_width']['var'] + '"' + ' height="500" type="application/pdf" data="' , 'end' : '"></object>', 'color':'#ff6600'}}
    $("p, li").each(function(){
             var textp = $(this).text()
             if (textp.match(reg_hyper)){ // search for format [blabla](addr blabla)
                 var text1 = textp.match(reg_brack)[0].slice(1,-1) // takes [blabla]
                 var text2 = textp.match(reg_parent)[0].slice(1,-1) // takes (addr blabla)
                 var newtag = $('<a/>').text(text1).attr('href',text2)
                 if ($(this).prop('tagName')== 'LI'){var newtag = $('<li/>').append(newtag)} // correction of link to local file.
                 $(this).replaceWith(newtag)
                }// end if
             if (textp.match('§novideo')){ 
                 $(this).hide() 
                 if (textp.trim() == '§novideo'){  // hide novideo
                    sel = ['§§']
                    $("a").each(function(){ // removing ;;
                        var texta = $(this).text()
                        if (texta.search(';;') != -1){
                            $(this).text(texta.replace(';;',''))
                            	   .css({'color': debend[';;']['color']})
                            } // end if == 
                        }) // end a.each
                } // end if match
             }// end if novideo
   
        })  // end each 
    var maketag = function(self, deb, end, select){
        patt = {';;' : ["watch?v=", "embed/"], '§§' : ["none", "none"]}
        num_slider += 1;
        var nameslider = 'slider_' + num_slider
        var tag = $("<ul/>").append($("<li/>").append(deb+self.attr('href').replace(patt[select][0],patt[select][1])+end)) // make doc                                    
        var text = self.text().replace(select,'')
        $('<a/>').text(text).append($('<a/>').append($('<span/>').text( " [-]").addClass(select))
                                             .append($('<a/>').attr('id', nameslider))) // insert slider
                 .insertBefore(self).css({'color':debend[select]['color']})
        //alert(self.next().prop("tagName"))
        var chgx = function(){$("#slider_value").html(d3.event.x)}
        var param_slider_x = [{'xbar':100, 'x':100,'ybar':10, 'y':10, 'col': 'violet', 'dir':'x', 'slength': 100, 'action':chgx}]
        var svgslider = d3.select("#" + nameslider)
                    .append("svg").attr("width", 600).attr("height", 20);
        slide(param_slider_x, svgslider)
        $("#" + nameslider).toggle()
        return tag
    }
    $("a").each(function(){  // Deals with videos and pdfs
         for (i in sel){
             if($(this).text().search(sel[i]) != -1){
                   var obj = maketag($(this), debend[sel[i]]['deb'], debend[sel[i]]['end'], sel[i])
                   $(this).replaceWith(obj)
                   obj.toggle()
                 } // end if
              }// end for
         }); // end each
    $("a").click(function (evt) {  
        var evtc = evt.target.className;              
        if(evtc == ';;' | evtc == '§§') {      // toggle 
            $(this).parent().next().toggle(); // activate next <ul>
            } // end if event      
        });// end click
    $("p").each(function(){ // POST'IT
             var html = $(this).html()
             if (html.match(/^\$post\s*/) != null){
                 var newtag = $('<div/>').html(html.split('$post')[1]).addClass('postit')
                 $(this).replaceWith(newtag)
                }// end if
        })
    $("p").each(function(){ //
             var text = $(this).text()
             if (text.match(/^\$plot\s*/) != null){
                     var texts = text.split(/\s+/)
                     var id = texts[1].trim()
                     var name = texts[2].trim()
                     var ampl = texts[3].trim()
                     var newtag = $('<div/>').text('here').attr('id',id)
                     $(this).replaceWith(newtag)
                     plot('#'+id, 'data/data_curve.json', 100);
                }// end if
        })// end each
}// end maketoc  /\>\>\w*/

var plot = function(dom, data, xoffset, col){
    var col = col || 'k';
    var pos_line = 150;
    var width = 500,
        height = 200;
    var curve_height = 100;
    var colrs = {'r':'red', 'k':'black', 'b':'blue', 'g':'green'};
    var svg = d3.select(dom)                //Create SVG element
                .append("svg").attr("width", width).attr("height", height);
    var valueline = d3.svg.line()           // Define the line 
        .x(function(d) { return d.x*5; })
        .y(function(d) { return d.y*curve_height + pos_line; }) // positionned on the line
    var curve = function(data_curve){
        var curved = svg.append("path")  
        .attr("class", "line")
        .attr("d", valueline(data_curve))
        .attr("transform", "translate(" + xoffset.toString() + ", 0)" ) // Translationin x
        .style({stroke : colrs[col],
                fill : 'none',
                'stroke-width' : '1.5px',
            })
        };
    var set_data_plot = function(data){
         if (typeof(data)=='string'){ 
             if (data.match(/\.json/)!=null){
                 d3.json(data, function(dataset){curve(dataset)}); // end d3.json
                    }  // end if json
               } // end if string     
           else{
               curve(data)
             }
        }// end function
    set_data_plot(data)
} // end plot

var drag_slider = d3.behavior.drag()
    .origin(function(d) {  return d }) 
    .on("dragstart", dragstarted)
    .on("drag", function(d) {
        if (d.dir == "x"){
            d.action(); // 
            return d3.select(this).attr("cx", d.x  = d3.event.x);
            }
        else if (d.dir == "y"){
            $("#slider_value").html(d3.event.y);
            d.action();
            return d3.select(this).attr("cy", d.y  = d3.event.y);
            }
    })
    .on("dragend", dragended);

var slide = function(data, name_svg){ // Vertical or horizontal slider
   
    slider_line = function(data){
          var svg_slider_line = name_svg
            .selectAll("svg_slider_line")
            .data(data)
            .enter()
            .append("line")
            .attr('x1', function(d){return d.xbar}) // 
            .attr('y1', function(d){return d.ybar})
            .attr('x2', function(d){if ( d.dir=="x" ){ return d.slength + d.xbar } else { return d.xbar }}) // 
            .attr('y2', function(d){if ( d.dir=="y" ){ return d.slength + d.ybar } else { return d.ybar }})
            .attr('stroke', function(d){return d.col})
            .attr('stroke-width', '4px')
        }

    slider_button = function(data){ 

        var slider_butt = name_svg
          .selectAll("svg_slider_button")
          .data(data)
          .enter()
          .append("ellipse")       // attach an ellipse
          .attr("cx", function(d){return d.x})           // position the x-centre
          .attr("cy", function(d){return d.y})           // position the y-centre
          .attr("rx", 7)           // set the x radius
          .attr("ry", 7)           // set the y radius
          .attr("fill", function(d){return d.col})
          .attr("class", "slide")
          .call(drag_slider);
        }  
    slider_line(data);
    slider_button(data);
}

function dragstarted(d) {
  d3.event.sourceEvent.stopPropagation();
  d3.select(this).classed("dragging", true);
}

function dragended(d){ d3.select(this).classed("dragging", false) }

