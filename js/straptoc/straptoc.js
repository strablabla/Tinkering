var maketoc = function(){
    
    // Javascript code to ease navigation in notes written in Markdown
    // format and transformed with strapdown in html code. 
    // Maketoc supposes the code is yet in html format.
    // The whole code uses extensively jQuery library.
    // Commands:
    //  * :: , close the list and make a toggle tool in the main page.
    //  * -link- , creates a tag with id "link"
    //  * [video ;;](hyperlink) insert a video with the hyperlink through iframe element.
    //  * [pdf §§](hyperlink) insert a pdf with object tag.
    // https://github.com/strablabla/Tinkering/508e7e5/js/straptoc/straptoc.js 
    
    var reg_free = /\d{1,2}\/\d{1,2}\/\d{2}/; //find dates whatever is its position with regexp
    var reg_id = /-\w*-/; //regexp for identity

    $("p").each(function() {                                // Replacing dates with p in date with h2 and 
        if ($(this).html().match(reg_free)){
            $(this).replaceWith(function(){ 
                var h1prev = $(this).prev("h1").text()
                var dateh2 = $('<h2/>').text($(this).text())
                return dateh2; 
            }) // end replaceWith
        } // end if
    }); // end each
    $("H1").each(function(i){       // insertion of <p id = identity> </p> where found the pattern -identity-
        if($(this).html().search(reg_id)!=-1){
            match_id = $(this).html().match(reg_id)[0]
            var idslice = match_id.slice(1,-1)
            var text = $(this).html().replace(match_id,"")
            $(this).html(text);
            $(this).append($("<p/>").attr("id",idslice))
            }// end if
        }); // each
    $('#toc').append($('<a/>').append($('<span/>').text("[--]").addClass('li_h1')));
    var ul1 = $("<ul/>"); // first levels with class
    $('#toc').append(ul1);
    // read all the headers and make the TOC (with ref) and the id names
    for(var i = 0,  elems = $(":header"); i < elems.length; i++) {
            var nameh = elems[i].innerHTML.trim();
            elems[i].id = nameh; 
            if($('[id=' + '"' + nameh + '"'+']').prop("tagName") == 'H1')    // if H1
                {                        
                var nameh1 = nameh
                var li1 = $("<li/>");
                ul1.append(li1);
                var ul2 = $("<ul/>").addClass('lev1');                     // second levels with class
                li1.append(  
                    $('<a/>')
                    .attr('href', namehhref)                               // add ref to id done just before
                    .css({'color': 'black'})
                    .html(nameh)
                    .append($('<span/>').text(" [-]").addClass('li_h2'))   // button for H1
                    ) // en append ul
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
                li2.append(  
                    $('<a/>')
                    .attr('href', namehhref)                                    // adds ref to id done just before
                    .html(nameh)
                    .append($('<span/>').text(" [-]").addClass('li_h3'))        // button for H2
                    ) // end of li
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
                li3.append(  
                    $('<a/>')
                    .attr('href', namehhref)                            // adds ref to id done just before
                    .html(nameh)
                    .addClass(nameh)
                    ) // end of li
                    .css({'list-style': 'circle inside','line-height': '20px'}) // end append li3
                } // end else if H3
    }                                                                   // end for elems
    // bit of code for closing list when it finds :: in the code.
    $("li").each(function(i){    // need to be placed before  $("a").click    
        var htm = $(this).html(); var childr = $(this).children()
        if(htm.split('\n')[0].search('::')!=-1){ 
                childr.toggle();                // close the sub lists 
                childr.css({'color':'green'})   // change color children
                $('<a/>').append($('<span/>').text(" [-]").addClass('::'))
                         .insertBefore(childr)
            } // end if 
        }); // end each
    
    $('ul').each(function (){  // remove the double :
            if ($(this).find("*").hasClass('::')){
                var html = $(this).html().replace(/\:\:\s*\<a\>/g,'\<a\>')
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
    $(document).keydown(function(event){
        if(event.keyCode == 37){  //M letter
            alert("hello");
        	} // end if
    	}); // end keydown
    
    $("p").each(function(){
             var text = $(this).text()
             if (text.match(/\[\w*.*\]\(\w*.*\)/) != null){
                 var text1 = text.match(/\[\w*.*\]/)[0].slice(1,-1)
                 var text2 = text.match(/\(.*\w*.*\)/)[0].slice(1,-1)
                 var newtag = $('<a/>').text(text1).attr('href',text2)
                 $(this).replaceWith(newtag)
                }// end if
        })  
        
    var maketag = function(self, deb, end, select){
        patt = {';;' : ["watch?v=", "embed/"], '§§' : ["none", "none"]}
        var tag = $("<ul/>").append($("<li/>").append(deb+self.attr('href').replace(patt[select][0],patt[select][1])+end))
        var text = self.text().replace(select,'')
        $('<p/>').text(text).append($('<a/>').append($('<span/>').text( " [-]").addClass(select)))
                 .insertBefore(self).css({'color':debend[select]['color']})
        return tag
    }
    var debend = {';;' : {'deb' : '<iframe width="420" height="315" src="', 'end' : '" frameborder="0" allowfullscreen></iframe>','color':'#cc99ff'},
                   '§§': {'deb' : '<object width="80%" height="500" type="application/pdf" data="' , 'end' : '"></object>', 'color':'#ff6600'}}
    $("a").each(function(){  // Deals with videos and pdfs
         var sel = [';;','§§']
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
        if(evtc == ';;' | evtc == '§§')       // toggle 
            $(this).parent().next().toggle();
        });// end click
    
    $("p").each(function(){
             var html = $(this).html()
             if (html.match(/^\$post\s*/) != null){
                 var newtag = $('<div/>').html(html.split('$post')[1]).addClass('postit')
                 $(this).replaceWith(newtag)
                }// end if
        })
        
}// end maketoc

