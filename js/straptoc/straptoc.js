var maketoc = function(){
    
    // Javascript code for enhancing markdown capabilities.
    // format and transformed with strapdown in html code. 
    // Maketoc supposes the code is yet in html format.
    // The whole code uses extensively jQuery library.

    var help = function(){/*
    
     # Commands: 
     * :: , makes folding list. Begin close.
     * --link-- , creates a tag with id "link" 
     * [video ;;](hyperlink) insert a video with the hyperlink through iframe element.
     * [pdf §§](hyperlink) insert a pdf with object tag.
     * novideo, at the beginning of the document to avoid loading of videos.
     * @@blabla, copy the li, blabla@@ paste the li
     * key "k", to make appear disappear the sliders.
     * insertion of tooltip : after h1 or h2, write the tooltip betweeen {}
     * double ^, is used to hide some text
     * Alt L for folding/unfolding lists.
     * Set notoc to true for removing the TOC.
     */}.toString().slice(14,-3)
     //alert(help)

    //https://github.com/strablabla/Tinkering/72f2d1e/js/straptoc/straptoc.js 
    //https://github.com/strablabla/Tinkering/72f2d1e/js/straptoc/straptoc.css
    
    simple_md = function(text){ // mini markdown for the help
        var all_text = text.split('\n')
        var htm = $('<div/>')
        var ul = $('<ul/>').css({'text-align':'left'})
        for (i in all_text){
        	var text_insert = all_text[i].trim().slice(1)
            if (all_text[i].match(/\s*\*/)){
            ul.append($('<li/>').text(text_insert))
            } // end if
            if (all_text[i].match(/\s*\#/)){
                htm.append($('<h1/>').text(text_insert))
            } // end if
        } // end for
        htm.append(ul);
        return htm.html()
    } // end function
    // Definitions of regexp 
    reg_func = function(name){return RegExp('^\\§'+name+'\\s*','g') } // function for regexp for configuration
    var reg_date = /\d{1,2}\/\d{1,2}\/\d{2}/; //find dates whatever is its position with regexp
    var reg_id = /--\w*--/; //regexp for identity
    var reg_col_sublist = reg_func('col_sublist') 
    var reg_col_toc = reg_func('col_toc')
    var reg_notoc = reg_func('notoc')
    var reg_width_video = reg_func('width_video') 
    var reg_width_pdf = reg_func('width_pdf') 
    var reg_toggle_hide = reg_func('toggle_hide') 
    var reg_help = reg_func('help')
    var reg_sign = /[^§]§[^§]\w*/
    //
    var num_slider = 0
    
    param = {
             'color_sublist':{'reg':reg_col_sublist, 'cut':'§col_sublist', 'var': 'green'},
             'color_toc':{'reg':reg_col_toc, 'cut':'§col_toc', 'var': '#FFCC99'},
             'notoc':{'reg':reg_notoc, 'cut':'§notoc', 'var': false},
             'vid_width':{'reg':reg_width_video, 'cut':'§width_video', 'var': '80%' },
             'pdf_width':{'reg':reg_width_pdf, 'cut':'§width_pdf', 'var': '80%'},
             'toggle_hide':{'reg':reg_toggle_hide, 'cut':'§toggle_hide', 'var': 'p'},
             'help':{'reg':reg_help, 'cut':'§help', 'var': false}
         }
    
    for (i=0;i<4;i++){     // Tooltips, iteration for nested list
        $("li, h1, h2").each(function(){  // Tooltips for h1, h2 and li
            var text = $(this).html().split('\n')[0]
            if (text.match(/\{.*\}/)){
                $(this).attr('title', text.match(/\{.*\}/)[0].slice(1,-1))
                var newhtm = $(this).html().replace(/\{.*\}/, ' ')
                $(this).html(newhtm)
                } // end match
            })
    	}
    $("p").each(function(){   // rewriting the option from bloc to <p>
    if ($(this).text().match(/^§/)) {              
        var txtsplit = $(this).text().split(/§/).slice(1)
        for (i in txtsplit){
            $('body').prepend($('<p/>').text('§'+txtsplit[i]))
            $(this).hide()
        }
      }
    }); // each
    $("p").each(function() {                                
        if ($(this).html().match(reg_date)){
            $(this).replaceWith(function(){                 // Replacing dates with p in date with h2 and 
                var h1prev = $(this).prev("h1").text()
                var dateh2 = $('<h2/>').text($(this).text())
                return dateh2; 
               }) // end replaceWith
           } // end if
        for (elem in param){
            if ($(this).text().match(param[elem]['reg']) ){  // finds loading parameters
                var interm = $(this).text().split(param[elem]['cut'])[1]
                var newtag = $('<p/>').text('')
                $(this).replaceWith(newtag) // remove text of the optional parameters
                param[elem]['var'] = interm.trim() // retrieve the value of parameters in the dic param
               }// end if
        } // end for
    }); // end each
    //alert(param['notoc']['var'])
    if(param['notoc']['var'] == false){
        $('body').prepend($('<div/>').addClass('onside').attr('id',"toc")) // adds the Table of Contents at the beginning
    }
    
    $('.onside').css({'background-color' : param['color_toc']['var']}) // modifying backgnd color for TOC
    
    $('#toc').append($('<a/>').append($('<span/>').text("[--]").addClass('li_h1')));
    var ul1 = $("<ul/>"); // first levels with class
    $('#toc').append(ul1);
    // read all the headers and make the TOC (with ref) and the id names
    for(var i = 0,  elems = $(":header"); i < elems.length; i++) {
        var nameh = elems[i].innerHTML.trim().split(reg_id)[0];
        elems[i].id = nameh; 
        if($('[id=' + '"' + nameh + '"'+']').prop("tagName") == 'H1'){    // if H1                    
            var nameh1 = nameh
            var li1 = $("<li/>");
            ul1.append(li1);
            var ul2 = $("<ul/>").addClass('lev1');                     // second levels with class
            li1.append($('<a/>').attr('href', namehhref).css({'color': 'black'}).html(nameh)
                         .append($('<span/>').text(" [-]").addClass('li_h2'))) // en append ul
            li1.append(ul2);
        } // end if H1
        else if($('[id=' + '"' + nameh + '"'+']').prop("tagName") == 'H2'){ // if H2
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
        else if($('[id=' + '"' + nameh + '"'+']').prop("tagName") == 'H3'){
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
    $("li").each(function(){                // plugin list from one place to another..
         var htm = $(this).html();
         if (htm.split('\n')[0].match(/@@\w+/)){
            var htmnew = htm.replace(/@@\w+/, '')
            copy = $(this).clone()
            copy.html(htmnew)
            $(this).html(htmnew)
            $("li").each(function(){ //
                var htm = $(this).html();
                if (htm.split('\n')[0].match(/\s*\w+@@/)){
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
                childr.css({'color': param['color_sublist']['var']})   // change color children
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
                    $(this).children('ul').prepend($("<a/>").attr("id", idslice))
                    } // yet existing <a> for folding list.
                else{$("<a/>").attr("id",idslice).insertBefore($(this).children('ul'))} // no  <a> for folding list.
                }
            else{$("<p/>").attr("id",idslice).insertBefore($(this))} // general case, insert <p> before the tag
            }// end if
        }); // each
    $('ul').each(function (){  // remove the :: (closing list sign)
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
        if(evtc == 'li_h1' | evtc == 'li_h2' | evtc == 'li_h3' | evtc == '::')  // open close list on click
            $(this).next().toggle();
        });// end click
    
    $(document).keydown(function(event){
        if(event.keyCode == "h".charCodeAt(0)-32){    // "h", key for help documentation
            if (param['help']['var'] != false){
                $('.alertify .alert > *').css({'text-align':'left'});
                alertify.alert(simple_md(help))
                }
          } // end if key code
        if(event.keyCode == "q".charCodeAt(0)-32){  // "q" key for showing sliders
            $("a").each(function(i){ 
                  if ($(this).prop('id').match(/slider_\d*/)){
                      $(this).toggle()
                  } // end if
                }); // each
            } // end if key code
        if(event.keyCode == param['toggle_hide']['var'].charCodeAt(0)-32){  // hiding text key defined in the parameters
            $("li").each(function(i){ 
                if ($(this).hasClass('^^')){
                    $(this).toggle()
                } // end if
              }); // each
          }// end if key code
        })
    var reg_hyper = /\[\w*.*\]\(\w*.*\)/
    var reg_brack = /\[\w*.*\]/
    var reg_parent = /\(.*\w*.*\)/
    var sel = ['§§'] // ';;',
    var debend = {';;' : {'deb' : '<iframe width='+'"' + param['vid_width']['var'] + '"' + 'height="315" src="', 'end' : '" frameborder="0" allowfullscreen></iframe>','color':'#cc99ff'},
                   '§§': {'deb' : '<object width='+'"' + param['pdf_width']['var'] + '"' + ' height="500" type="application/pdf" data="' , 'end' : '"></object>', 'color':'#ff6600'}}
    $("p, li").each(function(){
         var textp = $(this).text()
         if (textp.match(reg_hyper)){ // search for format [blabla](addr blabla)
             var text1 = textp.match(reg_brack)[0].slice(1,-1) // takes [blabla]
             var text2 = textp.match(reg_parent)[0].slice(1,-1) // takes (addr blabla)
             var newtag = $('<a/>').text(text1).attr('href',text2)
             if ($(this).prop('tagName')== 'LI'){var newtag = $('<li/>').append(newtag)} // correction of link to local file.
             if ($(this).prop('tagName')== 'P'){var newtag = $('<p/>').append(newtag)} // correction to avoid gluing lines.. 
             $(this).replaceWith(newtag) // Replace the original tag
            }// end if
         if (textp.match('§novideo')){ 
             $(this).hide() 
             if (textp.trim() == '§novideo'){  // hides novideo
                sel = ['§§'] // restricting the treatment to pdfs..
                $("a").each(function(){ // removing ;;
                    var texta = $(this).text()
                    if (texta.search(';;') != -1){
                        $(this).text(texta.replace(';;',''))
                               .css({'color': debend[';;']['color']}) // changes color for pdfs and videos
                        } // end if == 
                    }) // end a.each
            } // end if match
         }// end if novideo
       })  // end each 
    var maketag = function(self, deb, end, select){ // makes the tags for pdfs and videos
        patt = {';;' : ["watch?v=", "embed/"], '§§' : ["none", "none"]}
        num_slider += 1;
        var nameslider = 'slider_' + num_slider
        var tag = $("<ul/>").append($("<li/>")
                            .append(deb+self.attr('href')
                            .replace(patt[select][0],patt[select][1])+end)) // make doc                                    
        var text = self.text().replace(select,'')
        $('<a/>').text(text).append($('<a/>').append($('<span/>').text( " [-]").addClass(select))
                                             .append($('<a/>').attr('id', nameslider))) // insert slider
                 .insertBefore(self).css({'color':debend[select]['color']})
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
                   var obj = maketag($(this), debend[sel[i]]['deb'], debend[sel[i]]['end'], sel[i]) // makes the tag.
                   $(this).replaceWith(obj)
                   obj.toggle() // hide 
                 } // end if
              }// end for
         }); // end each
    $("a").click(function (evt) {  
        var evtc = evt.target.className;              
        if(evtc == ';;' | evtc == '§§') {      // toggle 
            $(this).parent().next().toggle(); // if click, activate next <ul>
            } // end if event      
        });// end click
    $("p").each(function(){ // POST'IT
             var html = $(this).html()
             if (html.match(/^\$post\s*/)){
                 var newtag = $('<div/>').html(html.split('$post')[1]).addClass('postit')
                 $(this).replaceWith(newtag)
                }// end if
        })
    $("p").each(function(){ // detect plot and apply plot function..
         var text = $(this).text()
         if (text.match(/^\$plot\s*/)){
                 var txt = text.split(/\s+/)
                 var id = txt[1].trim()
                 var addr = txt[2].trim()
                 var xmin = parseFloat(txt[3]); var xmax = parseFloat(txt[4])
                 var ymin = parseFloat(txt[5]); var ymax = parseFloat(txt[6])
                 //alert(xmin + '_' + xmax + '_' + ymin + '_' + ymax)
                 var title = txt[7].trim()
                 var xlabel = txt[8].trim()
                 var ylabel = txt[9].trim()
                 var col = txt[10].trim()
                 var newtag = $('<div/>').attr('id',id).attr('class','chart')
                 $(this).replaceWith(newtag)
                params = { "xlim": [xmin, xmax], "ylim": [ymin, ymax], "title": title,
                    "xlabel": xlabel, "ylabel": ylabel, "color": col, "fill":"#ffffff"}
                plot(id, addr, params)

            }// end if
        })// end each
    $("li").each(function(){ //
        var reg_hide = /\s*\^\^\s*/
         var htm = $(this).html()
         if (htm.match(reg_hide)){
            $(this).toggle().addClass('^^')
            var newhtm = htm.replace(reg_hide , '')
            $(this).html(newhtm)
            }// end if
    })// end each
    
    $("img").each(function(){
        var reg_im = /\s*\d*x\d*\s*/
        var sizeim = $(this).attr('alt').match(reg_im)[0];
        $(this).attr('width',sizeim.split('x')[0]);
        $(this).attr('height',sizeim.split('x')[1])
        })



 $('a').each(function(){
        if ($(this).text().match(';;')){
            var id = $(this).attr('href').split('v=')[1].trim()
            var newtag = $('<div/>').addClass('youtube')
                   .css({'width': '500px', 'height': '281px'})
                   .attr('id', id)
            $(this).replaceWith(newtag)

    } // end if
 }) // end each


 $(".youtube").each(function() {
     // Based on the YouTube ID, we can easily find the thumbnail image
     $(this).css('background-image', 'url(http://img.youtube.com/vi/' + this.id + '/hqdefault.jpg)');
     // Overlay the Play icon to make it look like a video player
     $(this).append($('<div/>', {'class': 'play'}));
     $(document).delegate('#'+this.id, 'click', function() {
         // Create an iFrame with autoplay set to true
         var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
         if ($(this).data('params')) iframe_url+='&'+$(this).data('params');
         // The height and width of the iFrame should be the same as parent
         var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': $(this).width(), 'height': $(this).height() })
         var div = $('<div/>').css({'text-align':'center'})
         // Replace the YouTube thumbnail with YouTube HTML5 Player
         $(this).replaceWith(div.append(iframe));
     });
 });


// $("p").each(function(){ // plot
//          var html = $(this).html()
//          if (html.match(/^\$plot\s*/)){
//              alert(html.split('$plot')[1]) //.split(/\s*/)

//             }// end if
//     })

 $(document).keydown(function(event){   
      
     if(event.keyCode == "l".charCodeAt(0)-32 && event.altKey){    
            $('ul').toggle()
       } // end if key code
 }) // end keydown


}// end maketoc  /\>\>\w*/



registerKeyboardHandler = function(callback) { // begin plot
  var callback = callback;
  d3.select(window).on("keydown", callback);  
};

var plot = function(elemid, data, params){
     // if data is an array do nothing, if json, makes an array
      if (typeof(data)=='string'){ 
          if (data.match(/\.json/)!=null){
              //alert('it is a json')
              d3.json(data, function(dat) {
                     new make_plot(elemid, dat, params)
                     }); // end d3.json
                 }  // end if json
            } // end if string     
        else{
            plot(data)
          }
     }// end function


make_plot = function(elemid, dataset, params) {
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
  this.brush_active = false
  this.list_domains = []
  this.zoom_margin = 20
  text_nb = 0
  list_txt = []
  insert_text = false
  // Commands
  // Each commands executed is supposed to eliminates the other one in possible conflict.
  // * c : show the circles for modifying the plot
  // * b : mode brush
  // * q : zoom for mode brush
  // * d : toggle for drag and zoom.
  
  var help = `
  
   # Commands
   Each commands executed is supposed to eliminates the other ones in possible conflict.
   * c : show the circles for modifying the plot
   * b : mode brush
   * q : zoom for mode brush
   * d : toggle for drag and zoom.

  ` /// Becareful, end of help
  
  var tools = `
  
   # All tools
   Click on the tool
   * c : show the circles for modifying the plot
   * b : mode brush
   * q : zoom for mode brush
   * d : toggle for drag and zoom.

  ` /// Becareful, end of tools

  simple_md = function(text){ // mini markdown for the help
      var all_text = text.split('\n')
      var htm = $('<div/>') // main html 
      var ul = $('<ul/>') // preparing lists
      for (i in all_text){
          var text_insert = all_text[i].trim() // cleaning
          if (all_text[i].match(/\s*\*/)){
              ul.append($('<li/>').text(text_insert.slice(1))) // Make li
              } // end if
          else if (all_text[i].match(/\s*\#/)){
              htm.append($('<h1/>').text(text_insert.slice(1))) // Make h1
              } // end if
          else{htm.append($('<p/>').text(text_insert)).css({'text-align':'left'})}
      } // end for
      htm.append(ul); // Append the list at the end
      return htm.html()
  } // end function

  var tr = function(w, h, ang){      // Translation and Rotation
     ang = ang || 0
     return "translate(" + w + ","+ h + ") rotate(" + ang + ")"
      }

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

window.createtext = function (localpoint, svg, txt, cl, ang) {
    var myforeign = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')
    var textdiv = document.createElement("div");
    var svgtxt = txt ||  "Click to edit";
    var angle = ang || 0;
    var clss = cl || 'noclass'
    var textnode = document.createTextNode(svgtxt);
    textdiv.appendChild(textnode);
    textdiv.setAttribute("contentEditable", "true");
    textdiv.setAttribute("width", "auto");
    textdiv.setAttribute("class", cl);
    textdiv.setAttribute("id", txt);
    myforeign.setAttribute("width", "100%");
    myforeign.setAttribute("height", "60px");
    myforeign.classList.add("foreign");              //to make div fit text
    textdiv.classList.add("insideforeign");                   //to make div fit text
    textdiv.addEventListener("mousedown", elementMousedown, false);
    myforeign.setAttributeNS(null, "transform", "translate(" + localpoint.x + " " + localpoint.y + ") rotate(" + angle + ")");
    svg.appendChild(myforeign);
    myforeign.appendChild(textdiv);

};

function elementMousedown(evt) {
    mousedownonelement = true;
}

  var add_html = function(node,htm,w,h,ang){ // adding html in the plot
      var htmnode = node.append('foreignObject')
          .attr("transform", tr(w-100,h,ang))
          .attr('width', 200)
          .attr('height', 100)
          .append("xhtml:body")
          .html(htm)
      return htmnode
      }
  
  var add_txt = function(label,w,h,ang,cl){    // adding text in the plot, position : (w, h), angle : ang
      var vv = document.getElementById('vis');
      createtext({"x":w,"y":h}, vv, label, cl, ang)  
      }
  
  var add_txt_axis = function(label,w,h,ang){    // adding axis, (for Title and axis)
      add_txt(label,w,h,ang,'axis_txt')  
      $('.axis_txt').addClass('axis')  
      return $('#'+label)  
      }  
          
  this.padding = {                                  // padding
     // "top":    this.title  ? 40 : 20,
      "top":    this.title  ? 80 : 20,
     "right":                 30,
     "bottom": this.xlabel ? 80 : 10,
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
  this.downx = Math.NaN; // drag x-axis logic
  this.downy = Math.NaN; // drag y-axis logic
  this.dragged = this.selected = null;
  
  this.line = d3.svg.line()                                      // defining line function
      .x(function(d, i) { return this.x(this.dataset[i].x); })
      .y(function(d, i) { return this.y(this.dataset[i].y); })
      .interpolate('linear')
      //

  datacount = this.size.width/30;
  
  this.vis = d3.select(this.chart).append("svg")
      .attr("width",  this.cx)
      .attr("height", this.cy)
      .attr("id", "vis")
      .append("g")
        .attr("transform", tr(this.padding.left, this.padding.top));

  this.plot = this.vis.append("rect")
      .attr("width", this.size.width)
      .attr("height", this.size.height)
      .style("fill", fillplot) 
      .attr("pointer-events", "all")

  if (this.drag_zoom == true){                  // drag and zoom of the whole plot
    alert('permitting drag')
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

  this.vis.append("svg") // line attached to svg block"viewBox
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
        tit = add_txt_axis(this.title, this.size.width/2, 20)
        tit.css({"font-family": "Times New Roman","font-size": "25px"}) //"dy":"-1em",
        }
  // add the x-axis label
  if (this.xlabel) {
      var xlab = add_txt_axis(this.xlabel, this.size.width/2+50, 1.5*this.size.height)
          xlab.css({"font-family": "Times New Roman","font-size": "20px"}) //"dy":"2.4em", 
        }
  // add y-axis label
  if (this.ylabel) {
      var ylab = add_txt_axis(this.ylabel, 20, this.size.height, -90)
          ylab.css({"font-family": "Times New Roman","font-size": "20px"})
        }
        
  //add_html(this.vis, '<p><span class="glyphicon glyphicon-envelope"></span></p>', 60,30)
    
  this.redraw_all()();
  
  make_brush = function(){                // zoom box with brush tool
      self.brush = self.vis.append("g")
         .attr("class", "brush")
         .call(d3.svg.brush()
           .x(d3.scale.identity().domain([0, self.size.width]))
           .y(d3.scale.identity().domain([0, self.size.height])) 
           .on("brush", function() {
               extent = d3.event.target.extent();
                    }) // end on
           .on("brushend", function(){
                d3.selectAll(".zoom_interact").remove()
                var rr = self.vis 
                    .append('rect')
                    .attr("x", extent[0][0]+self.zoom_margin/2)
                    .attr("y", extent[0][1]+self.zoom_margin/2)
                    .attr("width", function(){return Math.abs(extent[0][0]-extent[1][0])-self.zoom_margin})
                    .attr("height", function(){return Math.abs(extent[0][1]-extent[1][1])-self.zoom_margin})
                    .attr("class", "zoom_interact")
                    .style("stroke","red")
                    .style("fill","red")
                    .style('opacity', .15)
                    .on('click', function(){zoom_in()})
               })  // end on      
            ) // end call
  }
  
  set_view = function(extent){                      // set the view for a given extent double list. 
        x1 = self.x.invert(extent[0][0]); x2 = self.x.invert(extent[1][0]) // x1, x2
        y1 = self.y.invert(extent[0][1]); y2 = self.y.invert(extent[1][1])  // y1, y2
        self.x.domain([x1,x2]);                     // set x domain
        self.y.domain([y1,y2]);                     // set y domain
        self.list_domains.push([[x1,x2],[y1,y2]])       // save in history
  }
  set_view([[0,0],[this.size.width, this.size.height]]) // Save the first view in self.list_domains (Initialisation)
  
  var desactivate_all_not = function(avoid){  // desactivate all the tools but.. 
      if (avoid != 'b'){
          d3.selectAll(".brush").remove();  // desactivate brush
          self.brush_active = false;
        }
     if (avoid != 'i'){
         if (insert_text == true){
             $("#vis").off('click');
         }
     }
  }
  
  var zoom_in = function(){
      
      d3.selectAll(".zoom_interact").remove()
      set_view(extent)
      self.redraw_all()();
      d3.selectAll(".brush").remove();
      make_brush()
  }
  
  $(document).keydown(function(event){   
      if(event.keyCode == "t".charCodeAt(0)-32 && event.altKey){    // "h", key for help documentation
              $('.alertify .alert > *').css({'text-align':'left'});
              alertify.alert(simple_md(tools))
        } // end if key code          
      if(event.keyCode == "h".charCodeAt(0)-32 && event.altKey){    // "h", key for help documentation
              $('.alertify .alert > *').css({'text-align':'left'});
              alertify.alert(simple_md(help))
        } // end if key code
      if(event.keyCode == "i".charCodeAt(0)-32 && event.altKey){    // "i", insert text
            insert_text = ! insert_text;
            $('#vis').click(function (evt) {
                var svg = document.getElementById('vis');
                var localpoint = getlocalmousecoord(svg, evt);
                if (!mousedownonelement) {
                    createtext(localpoint, svg); // insert text with mouse
                } else {
                    mousedownonelement = false;
                }
            }); // end vis click
            if (insert_text == false){
                $("#vis").off('click');
            }
      } // end if key code
      if(event.keyCode == "c".charCodeAt(0)-32 && event.altKey){    // add and remove circles.. 
          self.show_circle = !self.show_circle;
          self.vis.selectAll('circle').remove()
          self.redraw_all()();
      } // end if
      if(event.keyCode == "w".charCodeAt(0)-32 && event.altKey){                            // home view
          desactivate_all_not('w')   // desactivate all the other tools
          var elem_first = self.list_domains[0]
          self.x.domain(elem_first[0]);
          self.y.domain(elem_first[1]);
          self.redraw_all()();
          } // end if
      if(event.keyCode == "q".charCodeAt(0)-32 && event.altKey){                        // Apply the zoom
          zoom_in()
      } // end if
      if(event.keyCode == "z".charCodeAt(0)-32 && event.altKey){
             alert(self.list_extent)
             alert(self.list_extent.length)
            }
      if(event.keyCode == "b".charCodeAt(0)-32 && event.altKey){                    // select the brush tool
        if (self.brush_active == true){
            desactivate_all_not('b') // desactivate all the other tools
        }
        else{
            make_brush();
            self.brush_active = true;
            }
       } // end if
      if(event.keyCode == "d".charCodeAt(0)-32 && event.altKey){ 
        desactivate_all_not('d')   // desactivate all the other tools
        self.drag_zoom = ! self.drag_zoom;                          // toggle drag_zoom
        self.redraw_all()();
       } // end if
  }) // end keydown
  
};

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

make_plot.prototype.update = function() {
  // update graph, axes, labels, circles..
  var self = this;
  var lines = this.vis.select("path").attr("d", this.line(this.dataset));
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
    } // end if
  //prep_edit()
}

make_plot.prototype.datapoint_drag = function() {    // moving points
  var self = this;
  return function(d) {
    document.onselectstart = function() { return false; };
    self.selected = self.dragged = d;
    self.update();
  }
};

make_plot.prototype.mousemove = function() {
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

make_plot.prototype.redraw_all = function() {         // redraw_all the whole plot
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

    var make_axes = function(nodename, selfax, trans, txt, ax1, ax2, valmax, stroke){
      var node = self.vis.selectAll(nodename)
        .data(selfax.ticks(10), String)
        .attr("transform", trans);
      node.select("text")
          .text(txt);
      var nodee = node.enter().insert("g", "a")
          .attr("class", ax1)
          .attr("transform", trans);
      nodee.append("line")
          .attr("stroke", stroke)
          .attr(ax2+"1", 0)
          .attr(ax2+"2", valmax);
    return [node, nodee]
    }

    var ticks_txt = function(node,ax,axpos,shift,txt){
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
    gg = make_axes("g.x", self.x, tx, fx, 'x','y', self.size.height, stroke)
    gx = gg[0]; gxe = gg[1]
    ticks_txt(gxe,"y",self.size.height,"1em",fx)
    gx.exit().remove();
    // Regenerate y-ticks…
    gg = make_axes("g.y", self.y, ty, fy, 'y','x', self.size.width, stroke)
    gy = gg[0]; gye = gg[1]
    ticks_txt(gye,"x",-3,".35em",fy)
    gy.exit().remove();
    if (self.drag_zoom == true){
      self.plot.call(d3.behavior.zoom().x(self.x).y(self.y)
                                .on("zoom", self.redraw_all())
                                )}// end if
    self.update();    // update the whole plot
  }  
}


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

$(document).ready(function(){ // activates the tooltips
    $('[data-toggle="tooltip"]').tooltip(); 
});

