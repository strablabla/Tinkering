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
     * [blabla ,,](hyperlink) insert whatever iframe
     * [blabla %%](hyperlink) insert a local video with no autoplay by default (works with Chrome but not with Firefox)
     * novideo, at the beginning of the document to avoid loading of videos.
     * @@blabla, copy the li, blabla@@ paste the li
     * key "k", to make appear disappear the sliders.
     * insertion of tooltip : after h1 or h2, write the tooltip betweeen {}
     * double ^, is used to hide some text
     * Alt L for folding/unfolding lists.
     * Set notoc to true for removing the TOC.
     * Size image, enter the size after the name eg: [blabla 500x500](address)
     * @color to change color, for the moment works onl for lists.
     * [blabla %caption%](address) insert the caption under the image
     * %%% for deleting symbolically a line, replacing  the tilde. 
     */}.toString().slice(14,-3)
     //alert(help)

    //https://github.com/strablabla/Tinkering/814ca7a/js/straptoc/straptoc.js 
    //https://github.com/strablabla/Tinkering/72f2d1e/js/straptoc/straptoc.css

    basename = function(path) {
    return path.replace( /.*\//, "" );
    }

    dirname = function(path) {
         return path.match( /.*\// );
    }
    
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
    // var reg_width_iframe = reg_func('width_iframe') 
    var reg_toggle_hide = reg_func('toggle_hide') 
    var reg_help = reg_func('help')
    var reg_sign = /[^§]§[^§]\w*/
    var reg_folder = /\<\</
    var reg_hyper = /\[\w*.*\]\(\w*.*\)/
    var reg_brack = /\[\w*.*\]/
    var reg_parent = /\(.*\w*.*\)/
    //
    var num_slider = 0
    
    param = {
             'color_sublist':{'reg':reg_col_sublist, 'cut':'§col_sublist', 'var': 'green'},
             'color_toc':{'reg':reg_col_toc, 'cut':'§col_toc', 'var': '#FFCC99'},
             'notoc':{'reg':reg_notoc, 'cut':'§notoc', 'var': false},
             'vid_width':{'reg':reg_width_video, 'cut':'§width_video', 'var': '80%' },
             'pdf_width':{'reg':reg_width_pdf, 'cut':'§width_pdf', 'var': '80%'},
             // 'iframe_width':{'reg':reg_width_iframe, 'cut':'§width_iframe', 'var': '900'},
             'toggle_hide':{'reg':reg_toggle_hide, 'cut':'§toggle_hide', 'var': 'p'},
             'help':{'reg':reg_help, 'cut':'§help', 'var': false}
         }
  
     $('body').prepend($('<div/>').attr('id','top'))
     $('body').append($('<a/>').attr('href','#top').addClass("scrollToTop").attr('title','go to top')
                .append($('<span/>').addClass("glyphicon glyphicon-chevron-up").attr('id','gotop')))

    $("p").each(function(){
        //alert($(this).text())
        if ($(this).text().match(/^\$carr/)) { 

            var divcarr = $('<div/>').addClass("carousel slide")
                                     .attr('id','mycarr')
            var ol = $('<ol/>').addClass("carousel-indicators")
            var divcarrinner = $('<div/>').addClass("carousel-inner").attr('role','listbox')
            var aprev = $('<a/>').addClass("left carousel-control")
                                 .attr('role','button')
                                 .attr('data-slide','prev')
                                 .attr('href','#mycarr')
                                 .append($('<span/>').addClass("glyphicon glyphicon-chevron-left")
                                                     .attr("aria-hidden","true")
                                    )
            var anext = $('<a/>').addClass("right carousel-control")
                     .attr('role','button')
                     .attr('data-slide','next')
                     .attr('href','#mycarr')
                     .append($('<span/>').addClass("glyphicon glyphicon-chevron-right")
                                         .attr("aria-hidden","true")
                        )

            $(this).children('img').each(function(i){
                var litarget = $('<li/>').attr("data-target","#mycarr")
                                    .attr("data-slide-to", i)
                if (i == 0){litarget.addClass("active")}
                ol.append( litarget ) // end append
                var divitem = $('<div/>').addClass("item")
                               .append($(this)
                                    .attr('width','460')
                                    .attr('height','365')
                               ) // end append
                if (i == 0){divitem.addClass("active")}
                divcarrinner.append( divitem) // end append
                }) // end each
            divcarr.append(ol)
                   .append(divcarrinner.append(aprev).append(anext))
            $(this).replaceWith(divcarr)
        } // end if regexp
    }) // end each p

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
            //alert(param[elem]['reg'])
            if ($(this).text().match(param[elem]['reg']) ){     // finds loading parameters
          
                var interm = $(this).text().split(param[elem]['cut'])[1]
                var newtag = $('<p/>').text('')
                $(this).replaceWith(newtag)     // remove text of the optional parameters
                param[elem]['var'] = interm.trim()    // retrieve the value of parameters in the dic param
          
               }// end if
        } // end for
    }); // end each


    var newhtml = ''
    var list_split_h1 = $('#content').html().split('<h1')  // insert div for following position in toc
    for (i in list_split_h1){
        if ((i>=1)&(i<list_split_h1.length)){
            newhtml += '<div class="section" id="'+i+'">\n<h1'+ list_split_h1[i] + '</div>\n'
            }
        } // end for

    $('#content').html(newhtml)

    var regcbarree = /[A-Za-z0-9\.\'\s\u0080-\u00FF]*\%\%\%/g  // replace %%% by deleted text. 
    var htm = $('#content').html()  
    var m = htm.replace(regcbarree,function(content){
        var barr = content.split('%%%')[0].trim()
        var barrcorr = '<del>'+barr+'</del>'
        return barrcorr
        }) // end replace
    $('#content').html(m) 
    
    for (i=0; i<4; i++){     // Tooltips, iteration for nested list
        $("li, h1, h2, h3, h4").each(function(){     // Tooltips for h1, h2, h3, h4 and li
            var text = $(this).html().split('\n')[0]
            if (text.match(/\{.*\}/)){
                $(this).attr('title', text.match(/\{.*\}/)[0].slice(1,-1)) // attribute title
                var newhtm = $(this).html().replace(/\{.*\}/, ' ') // remove the brackets
                $(this).html(newhtm)
                } // end match
            })
    	}

    //alert(param['notoc']['var'])
    if(param['notoc']['var'] == false){
        $('body').prepend($('<div/>').addClass('onside').attr('id',"toc"))     // adds the Table of Contents at the beginning
    }
    
    $('.onside').css({'background-color' : param['color_toc']['var']})    // modifying backgnd color for TOC
    
    $('#toc').append($('<a/>').append($('<span/>').text("[--]").addClass('li_h1')));
    var ul1 = $("<ul/>"); // first levels with class
    $('#toc').append(ul1);
    $('#toc').draggable() // make the toc draggable with jquery-ui widget draggable. 
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

 $('a').each(function(){            // modifying videos for permitting folded list mechanism.
        if ($(this).text().match(';;')){    
            alert("dealing with video")
            var tlist = $(this).text().split(';;')[0] +' ::'
            var underthis = $('<ul/>').append($('<li/>').append($(this).clone()))
            var ulvid = $('<li/>').append(tlist).append(underthis)
            alert($(this).parent().prop('tagName'))
            $(this).parent().replaceWith(ulvid)
         } // end if
    })
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
                else{$("<a/>").attr("id", idslice).insertBefore($(this).children('ul'))} // no  <a> for folding list.
                }
            else{$("<p/>").attr("id", idslice).insertBefore($(this))} // general case, insert <p> before the tag
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


    var sel = ['§§'] // ';;',
    var debend = {';;' : {'deb' : '<iframe width='+'"' + param['vid_width']['var'] + '"' + 'height="315" src="', 'end' : '" frameborder="0" allowfullscreen></iframe>','color':'#cc99ff'},
                   '§§': {'deb' : '<object width='+'"' + param['pdf_width']['var'] + '"' + ' height="500" type="application/pdf" data="' , 'end' : '"></object>', 'color':'#ff6600'}}
    $("p, li").each(function(){
         var textp = $(this).text()
         if (textp.match(reg_hyper)){    // search for format [blabla](addr blabla)
             var text1 = textp.match(reg_brack)[0].slice(1,-1)    // takes [blabla]
             var text2 = textp.match(reg_parent)[0].slice(1,-1)    // takes (addr blabla)
             var newtag = $('<a/>').text(text1).attr('href',text2)
             if ($(this).prop('tagName')== 'LI'){var newtag = $('<li/>').append(newtag)}    // correction of link to local file.
             if ($(this).prop('tagName')== 'P'){var newtag = $('<p/>').append(newtag)}   // correction to avoid gluing lines.. 
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
                            .replace(patt[select][0], patt[select][1])+end)) // make doc                                    
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
 

    $("li").each(function(){                // hide lists
        var reg_hide = /\s*\^\^\s*/
         var htm = $(this).html()
         if (htm.match(reg_hide)){
            $(this).toggle().addClass('^^')
            var newhtm = htm.replace(reg_hide , '')
            $(this).html(newhtm)
            }// end if
    })// end each


    $("a").click(function (evt) {                   // toggle for H1, H2, H3 etc..( has to be after hide lists)
        var evtc = evt.target.className;
        //alert(evtc)
        if(evtc == 'li_h1' | evtc == 'li_h2' | evtc == 'li_h3' | evtc == '::')  // open close list on click
            $(this).next().toggle();
        });// end click


    $("img").each(function(){               // retrieve and change size images
            var reg_im = /\s*\d*x\d*\s*/
            var sizeim = $(this).attr('alt').match(reg_im)[0];
            $(this).attr('width',sizeim.split('x')[0]);
            $(this).attr('height',sizeim.split('x')[1])
        })



    $("img").each(function(){               // retrieve the caption and insert it under the image.
            var reg_caption = /\%.*\%/
            var capt = $(this).attr('alt').match(reg_caption)[0].slice(1,-1);
            var captcl = capt.replace(/\s+/g, '')
            var caption = $('<figcaption/>').text(capt)
            $(this).wrap($('<figure/>').attr('class', captcl).css({'text-align': 'center'})) // center image with caption
            $('.'+captcl).append(caption)
        })


     $(document).keydown(function(event){   
          
         if(event.keyCode == "l".charCodeAt(0)-32 && event.altKey){    
                $('ul').toggle() // alt + l open all the lists. 
           } // end if key code
     }) // end keydown

}// end maketoc  


registerKeyboardHandler = function(callback) { // begin plot
  var callback = callback;
  d3.select(window).on("keydown", callback);  
};


function fixTitle() {
    $('div.section').each(function () {  // change fontsize with position in toc
        var $this = $(this);
        var offset = $this.offset().top;
        var scrollTop = $(window).scrollTop();
        if (scrollTop > offset) {
           var ind = $this.attr('id') 
           var origftsize = $('#toc').css("font-size")
           $('#toc li a').css("font-size", origftsize)
           $('#toc li:nth-child('+ind+') a').css("font-size", "150%")
        }
    });
}


function gototop(){

   //Check to see if the window is top if not then display button
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });
    //Click event to scroll to top
    $('.scrollToTop').click(function(){
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });

}


$(document).ready(function () {
    $(window).scroll(fixTitle);
    $('[data-toggle="tooltip"]').tooltip(); // activates the tooltips
    $('.carousel').carousel({ interval: false })
    gototop()
});


