// var loadtoc = function(){
//     var sc = document.createElement('script');
//     sc.src = "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js";
//     document.head.appendChild(sc);
// }


var maketoc = function(){
    
    // Javascript code for enhancing markdown capabilities.
    // format and transformed with strapdown in html code. 
    // Maketoc supposes the code is yet in html format.
    // The whole code uses extensively jQuery library.
    // 
    
    
    // var scriptsToLoad = 0;
    
    
    // ["https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js",
    // "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.js",
    // "https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.1.1/jquery.contextMenu.js",
    // "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js", 
    // "https://cdn.rawgit.com/alertifyjs/alertify.js/v1.0.6/dist/js/alertify.js", 
    // "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"
    // // "https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.6.11/js/min/perfect-scrollbar.min.js"
    // ].forEach(
    //     function(addjs) {
    //     s = document.createElement('script');
    //     s.src = addjs;
    //     document.head.appendChild(s)
    //     scriptsToLoad += 1;
    //     s.onload = function() {
    //         scriptsToLoad -= 1;
    //         //alert(addjs+' Loaded')
    //         };
    //    }
    // ) // end for Each
    // 
    // var cssToLoad = 0;
    // [// 'https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.6.11/css/perfect-scrollbar.css', 
    //          "https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.1.1/jquery.contextMenu.css", 
    //          'https://fonts.googleapis.com/css?family=Enriqueta', 
    //          'https://fonts.googleapis.com/css?family=Londrina+Solid', 
    //          'https://fonts.googleapis.com/css?family=Pathway+Gothic+One', 
    //          "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css",
    //          "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css"
    //       ].forEach(function(href) {
    //          var linkEl = document.createElement('link');
    //          //alert(href)
    //          linkEl.href = href;
    //          linkEl.rel = 'stylesheet';
    //          document.head.appendChild(linkEl);
    //          cssToLoad +=1;
    //          linkEl.onload = function() {
    //                  cssToLoad -= 1;
    //                  //alert(href+' Loaded')
    //                  };
    //          }
    //      ) // end for each

 
    // var timer = setInterval(function() {
    //     //alert("scriptsToLoad "+ scriptsToLoad)
    //     if(scriptsToLoad == 0 & cssToLoad ==0) {
    //         clearInterval(timer);


   
    

    var help = function(){/*
    
    # Extended markdown: 
    * :: , makes folding list (close by default)
    * --link-- , creates a tag with id "link" 
    * [video ;;](hyperlink) insert a video with the hyperlink through iframe element.
    * [pdf §§](hyperlink) insert a pdf with object tag.
    * [blabla ,,](hyperlink) insert whatever iframe
    * [blabla %%](hyperlink) insert a local video with no autoplay by default (works with Chrome but not with Firefox)
    * novideo, at the beginning of the document to avoid loading of videos.
    * @@ blabla, copy the li, blabla @@ paste the li (@@ must be glued)
    * key "k", to make appear disappear the sliders.
    * insertion of tooltip : after h1 or h2, write the tooltip betweeen {}
    * double ^, is used to hide some text
    * Alt L for folding/unfolding lists.
    * Set notoc to true for removing the TOC.
    * Size image, enter the size after the name eg: blabla 500x500(address)
    * @color to change color, for the moment works onl for lists.
    * [blabla %caption%](address) insert the caption under the image
    * %%% for deleting symbolically a line, replacing  the tilde. 
    * $carr and list of images in markdown language  after for making a carrousel with pictures. 
    * $portf and list of images in markdown language  after for making a portfolio with pictures. 
    * noiframes, at the beginning of the document to avoid loading of iframes.
    * +++ rootpath for registering root path for \$carr or \$portf when muliple path with same root. 
        *  eg for frames :
            * blabla
                +++ root
                [title iframe ,,](whatever.html)
        * Becareful
            * no space after blabla 
            * +++ and [title .. on same column
    * ``` before code for show code.. no need to bracket the code.
    * §menu toto:hash bobo:trash, add items bobo and toto to navbar with links hash and trash
    * $input b blabla : makes a button blabla
    * $input i ohoh : makes a input for entering text with placeholder ohoh. 
    * $* : line separation
    * §mathsize : set the size of the equations. Possible values : tiny, small, normalsize, large, Large, LARGE, huge, Huge
    * $menu : 
        * eg : before H1 place $menu_zax link:nm_Edit:ic_edit:href_Introduction
    */}.toString().slice(14,-3)
    
    var keys = function(){/*
    # Keys: 
    * Esc + k : show keys
    * Esc + s : show syntax
    * Esc + d : toggle draggable
    * Plot :
        * shift + n : toggle plot tools
    */}.toString().slice(14,-3)
     
    
    //https://github.com/strablabla/Tinkering/9a148b3/js/straptoc/straptoc.js 
    //https://github.com/strablabla/Tinkering/9a148b3/js/straptoc/straptoc.css

    basename = function(path) {  return path.replace( /.*\//, "" ); }

    dirname = function(path) { return path.match( /.*\// ); }
    
    simple_md = function(text){ // mini markdown for the help
        var all_text = text.split('\n')
        var htm = $('<div/>')
        var ul = $('<ul/>').css({'text-align':'left'})
        for (i in all_text){
            var text_insert = all_text[i].trim().slice(1) // prepare text
            if (all_text[i].match(/^\s{4}\*/)){    // detect list first level
                ul.append($('<li/>').text(text_insert))
                } // end if
            if (all_text[i].match(/^\s{8}\*/)){  // detect list second level
                    var interm1 = $('<ul/>').append($('<li/>').text(text_insert))
                    ul.append(interm1)
                    } // end if
            if (all_text[i].match(/^\s{12}\*/)){  // detect list third level
                    var interm2 = $('<ul/>').append($('<li/>').text(text_insert))
                    interm1.append(interm2)
                    } // end if
            if (all_text[i].match(/\s*\#/)){ // detect #
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
    var reg_col_sublist0 = reg_func('col_sublist0') 
    var reg_col_sublist1 = reg_func('col_sublist1')
    var reg_col_sublist2 = reg_func('col_sublist2')
    var reg_mathsize = reg_func('mathsize')
    var reg_col_toc = reg_func('col_toc')
    var reg_notoc = reg_func('notoc')
    var reg_width_video = reg_func('width_video') 
    var reg_width_pdf = reg_func('width_pdf') 
    var reg_width_iframe = reg_func('width_iframe') 
    var reg_toggle_hide = reg_func('toggle_hide') 
    var reg_menu = reg_func('menu')
    var reg_help = reg_func('help')
    var reg_sign = /[^§]§[^§]\w*/
    var reg_folder = /\<\</
    var reg_hyper = /\[\w*.*\]\(\w*.*\)/
    var reg_brack = /\[\w*.*\]/
    var reg_parent = /\(.*\w*.*\)/
    //
    var num_slider = 0
    var prefcarr = 'carousel0' // default first name for carousel
    var statekey = -1; // state for keyboard interactions
    
//===================================================================== Dictionary for parameters

    param = {
             'color_sublist0':{'reg':reg_col_sublist0, 'cut':'§col_sublist0', 'var': 'green'},
             'color_sublist1':{'reg':reg_col_sublist1, 'cut':'§col_sublist1', 'var': 'green'},
             'color_sublist2':{'reg':reg_col_sublist2, 'cut':'§col_sublist2', 'var': 'green'},
             'mathsize':{'reg':reg_mathsize, 'cut':'§mathsize', 'var': ''},
             'color_toc':{'reg':reg_col_toc, 'cut':'§col_toc', 'var': '#FFCC99'},
             'notoc':{'reg':reg_notoc, 'cut':'§notoc', 'var': false},
             'vid_width':{'reg':reg_width_video, 'cut':'§width_video', 'var': '80%' },
             'pdf_width':{'reg':reg_width_pdf, 'cut':'§width_pdf', 'var': '80%'},
             'iframe_width':{'reg':reg_width_iframe, 'cut':'§width_iframe', 'var': '900'},
             'toggle_hide':{'reg':reg_toggle_hide, 'cut':'§toggle_hide', 'var': 'p'},
             'menu_list':{'reg':reg_menu, 'cut':'§menu', 'var': ''},
             'help':{'reg':reg_help, 'cut':'§help', 'var': false}
         }

 //===================================================================== Go to top

    $('body').prepend($('<div/>').attr('id','top'))
    $('body').append($('<a/>').attr('href','#top').addClass("scrollToTop").attr('title','go to top')
            .append($('<span/>').addClass("glyphicon glyphicon-chevron-up").attr('id','gotop')))

 //===================================================================== Context menu
 
   $('body').attr('contextmenu',"share")
   $("p").each(function(){
       var txt = $(this).text().match(/^\$menu.*/)
       if (txt) {
           var args = txt[0].trim().split(/\s+/)
           var select = args[0].split('_')[1]
           var dic_args = {}
           for (i in args){ 
               if (i>0){
               var comm = args[i]
                  var sepcomm = comm.split(/\:/)
                  var item = sepcomm[0]
                  var item_name = sepcomm[1].split('_')[1]
                  var item_icon = sepcomm[2].split('_')[1]
                  var item_href = sepcomm[3].split('_')[1]
                  dic_args[item] = JSON.stringify({ name: item_name, icon : item_icon, href : item_href })
               }
           }
            var menu  = $(this).next().addClass("context-menu-one  " + select)
            $(this).remove()
       }
       $(function() {
           $.contextMenu({
             selector: '.'+select,
             build: function() {
               var options = {
                 callback: function(key, options) {    // callback
                   var m = "clicked: " + key;
                   var id  = JSON.parse(dic_args[key])['href']
                   document.getElementById(id).scrollIntoView()
                 },
                 items: {}
               };
                for (key in dic_args){
                    options.items[key] = JSON.parse(dic_args[key])
                }
               return options;
             }
           });
           $('.context-menu-one').on('click', function(e){
               console.log('clicked', this);
           })    
       });
    }) // end each

 //===================================================================== Zoom thumbnail and image

    $('body').prepend($('<div/>').attr('id',"id_view_image_body"))
           .prepend($('<div/>').attr('id',"id_view_image"))

 //===================================================================== separating line

    $("p").each(function(){
      txt = $(this).text()
      if (txt.match(/^\$\*/)) { 
            $(this).replaceWith($('<hr/>'))
          }   // end if txt.mtch
      })   // end each p

 //===================================================================== Simple bash code

  $("p, li").each(function(){
    htm = $(this).html().split('\n')[0]
    if (htm.match(/\`\`\`/)) { 
        ht = $(this).html()
        var newtxt = ht.replace('```',' ').replace('<br>','\n').trim()
        var pre = $('<pre/>').append(
            $('<code/>').addClass("prettyprint lang- prettyprinted").attr('style', "")
                .append($('<span/>').addClass("pln").text(newtxt))
                ) // end append
           $(this).text('').append(pre) 
        }   // end if txt.mtch
    })   // end each p, li

 //===================================================================== register root path for $portf or $carr
 
  // Register path for img, pdfs, href

  $("p, li").each(function(){
    var htm = $(this).html()
    var txt = htm.split('\n')[1] || ' '
    if (txt.match(/\+\+\+\.*/)) { 
        var addroot = txt.split('+++')[1].trim()+'/'
        $(this).find('*').each(function(){
          
             //==============================   case of img
             
            if ($(this).parent().find('img')){    
                  $(this).attr('src', addroot+$(this).attr('src')) // changing path
                }
                
             //==============================   case of pdfs
             
            if ($(this).text().match(/§§/)){   
                $(this).attr('href', addroot+$(this).attr('href')) // changing path
               }
            //==============================   case of videos
            
            if (htm.match(/%%/)){   
                $(this).attr('href', addroot+$(this).attr('href')) // changing path
               }
            }) // end each
        } // end if txt.mtch
    }) // end each p, li

//===================================================================== list of pdfs

  $("p, li").each(function(){
        if ($(this).text().match(/^\$pdf/)) {  // detect list pdfs
           var ulpdf = $('<ul/>')
           $(this).children('a').each(function(){
                ulpdf.append($('<li/>').append($(this)))
             }) // end each 
           $(this).replaceWith(ulpdf) // replace whole p or li 
        }   // end if regexp
    })   // end each p, li

//===================================================================== list of local videos

  $("p, li").each(function(){
        if ($(this).text().match(/^\$vid/)) {  // detect list of local videos
           var ulvid = $('<ul/>')
           $(this).children('a').each(function(){
                ulvid.append($('<li/>').append($(this)))
             }) // end each 
           $(this).replaceWith(ulvid) // replace whole p or li 
        }   // end if regexp
    })   // end each p, li
    
 //===================================================================== Portfolio

   $("p, li").each(function(){
     if ($(this).text().match(/^\$portf/)) {  // detect portfolio
        //var reg_caption = /\%.*\%/
        // var capt = $(this).text().match(reg_caption) || '' // caption for thumbnail
        // alert($(this).text())

        var divportf = $('<div/>').addClass("row")
        var nbcol = $(this).text().split(/^\$portf/)[1].split('\n')[0].trim() || 3 // number of columns
        var nbsuffix = 12/parseInt(nbcol) // suffix for bootstrap
        var classportf = "col-md-" +  nbsuffix
        $(this).children('img').each(function(i){
             var divportfinner = $('<div/>').addClass(classportf)
                 .append(
                       $('<div/>').addClass("thumbnail")   // class thumbnail
                         .append($(this)) // add image
                         //.append($('<p/>').addClass("caption").text(capt))
                        ) // end append thumbnail
        divportf.append(divportfinner)
        }) // end each img
        $(this).replaceWith(divportf) // replace whole p or li with portfolio. 
     }   // end if regexp
 })   // end each p
 


 //===================================================================== Carousels

 // All Carousels

 $('body').prepend($('<div/>').addClass('carr').attr('id',"carr")) 
 //$('#carr').toggle()
 $('#carr').draggable()

 $("p").each(function(){
     $('#carr').append($(this))
  })
 
 

//===================================================================== Carousel

  $("p, li").each(function(){
    //alert($(this).text())
    if ($(this).text().match(/^\$carr/)) { 
        
        var newcarr = function(){
            var num = parseInt(prefcarr.split('carousel')[1])+1
            var incremcarr = 'carousel'+num ;
            prefcarr = incremcarr ;
            return incremcarr
          }
        
        var namecarr = $(this).text().split(/^\$carr/)[1].split('\n')[0].trim() || 'default'
        if (namecarr=='default'){
              namecarr=newcarr()
          }
        var divcarr = $('<div/>').addClass("carousel slide")
                                 .attr('id',namecarr)
        var divcarrinner = $('<div/>').addClass("carousel-inner").attr('role','listbox')

        //======================== go to previous

        var aprev = $('<a/>').addClass("left carousel-control")
                             .attr('role','button')
                             .attr('data-slide','prev')
                             .attr('href','#'+namecarr)
            aprev.text('<').css({"font-size": "20px"})
                         
        //======================= go to next

        var anext = $('<a/>').addClass("right carousel-control")
                 .attr('role','button')
                 .attr('data-slide','next')
                 .attr('href','#'+namecarr)
            anext.text('>').css({"font-size": "20px"})

        //======================= image items

        $(this).children('img').each(function(i){
            var divitem = $('<div/>').addClass("item")
                           .append($(this)
                                .attr('width','460')
                                .attr('height','365')
                           ) // end append
            if (i == 0){divitem.addClass("active")}
            divcarrinner.append(divitem) // end append
            }) // end each

        //=========================  make the whole div.

        divcarr.append(divcarrinner.append(aprev).append(anext)) 
        $(this).replaceWith(divcarr)
        
      } // end if regexp
    }) // end each p
    
    
    


//===================================================================== retrieving config param

    $("p").each(function(){   // correction if there is no line feeding after each parameter. 
        if ($(this).text().match(/^§/)) {              
            var txtsplit = $(this).text().split(/§/).slice(1)
            for (i in txtsplit){
                $('body').prepend($('<p/>').text('§'+txtsplit[i])) 
                $(this).hide()
            }   // end for
            $(this).remove() // remove the <p> block containign the parameters, only separated <p>
        } // end if
      }); // end each

    //============================ Load the parameters

    $("p").each(function() {          // Need to be placed before position in TOC.                       
        for (elem in param){
            //alert($(this).text())
            if ($(this).text().match(param[elem]['reg']) ){     // finds loading parameters
                var interm = $(this).text().split(param[elem]['cut'])[1]
                var newtag = $('<p/>').text('')
                $(this).replaceWith(newtag)     // remove text of the optional parameters
                param[elem]['var'] = interm.trim()    // retrieve the value of parameters in the dic param
               }// end if
        } // end for
    }); // end each

 //===================================================================== Navbar menu
   
   /*
   usage : $menu toto:hash 
            toto is the name in the menu    
            hash is the hyperlink.
   */   

    var lmenu = param['menu_list']['var'].split(/\s+/)
    var ul = $('<ul/>').addClass("nav navbar-nav")
    for (i in lmenu){
        var name = lmenu[i].split(':')[0]
        var href = lmenu[i].split(':')[1]
        ul.append($('<li/>').append($('<a/>').text(name).attr('href',href)))
       } // end for
    $('.navbar-inner').children().append(ul)
              
//=====================================================================  Dates

    /*
    eg : 12/7/1974 
    the date is recognized and integrated in the TOC.
    */
    
    $("p").each(function() { 
      if ($(this).html().match(reg_date)){
                $(this).replaceWith(function(){     // Replacing dates with p in date with h2 and 
                    var h1prev = $(this).prev("h1").text()
                    var dateh2 = $('<h2/>').text($(this).text()).addClass('date')
                    return dateh2; 
                   }) // end replaceWith
               } // end if
      }); // end each

//=====================================================================   Position in TOC.

    /*
    The current selected part of the document is indicated my a bigger police in the TOC. 
    */

    var newhtml = ''
    var list_split_h1 = $('#content').html().split('<h1')  // insert div for following position in toc
    for (i in list_split_h1){
        if ((i>=1)&(i<list_split_h1.length)){
            newhtml += '<div class="section" id="'+i+'">\n<h1'+ list_split_h1[i] + '</div>\n'
            }
        } // end for
    $('#content').html(newhtml)



//===================================================================== mathjax

  $("p, li").each(function(){
    txt = $(this).text()
    if (txt.match(/^\$math/)) { 
          if (param['mathsize']['var'].length>0){ mathsize = '\\'+param['mathsize']['var']+' ' }
          //alert(param['mathsize']['var'])
          $(this).replaceWith('$$'+ mathsize + txt.split('$math')[1]+'$$')
        }   // end if txt.mtch
    })   // end each p, li

//=====================================================================  Tooltips

    /*
    Tooltips are added by using curly brackets at the end of the line. 
    eg: # Title{This is a title}
    */
    
    for (i=0; i<4; i++){     // Tooltips, iteration for nested list
        $("li, h1, h2, h3, h4").each(function(){     // Tooltips for h1, h2, h3, h4 and li
            var text = $(this).html().split('\n')[0]
            var reg_tooltip = /\{.*\}/
            if (text.match(reg_tooltip)){
                $(this).attr('title', text.match(reg_tooltip)[0].slice(1,-1)) // add the attribute title
                var newhtm = $(this).html().replace(reg_tooltip, ' ') // remove the brackets
                $(this).html(newhtm)
                } // end match
            })
        }



//===================================================================== TOC

    /*
    Table of Contents
    It sums up the h1, h2 and h3 tags in a movable window with hyperlinks. 
    */

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

        //===================================================================== H1
        
        if($('[id=' + '"' + nameh + '"'+']').prop("tagName") == 'H1'){    // if H1                    
            var nameh1 = nameh
            var li1 = $("<li/>");
            ul1.append(li1);
            var ul2 = $("<ul/>").addClass('lev1');                     // second levels with class
            li1.append($('<a/>').attr('href', namehhref).css({'color': 'black'}).html(nameh)
                         .append($('<span/>').text(" [-]").addClass('li_h2'))) // en append ul
            li1.append(ul2);
        } // end if H1
        
        //===================================================================== H2
        
        else if($('[id=' + '"' + nameh + '"'+']').prop("tagName") == 'H2'){ // if H2
            elems[i].id = nameh1 +'_'+ nameh;                               // makes an id for H2
            var nameh2 = elems[i].id
            var namehhref = '#' + nameh2;
            var li2 = $("<li/>");
            ul2.append(li2);
            var ul3 = $("<ul/>").addClass('lev2'); 
            li2.append($('<a/>').attr('href', namehhref).html(nameh)
                                .append($('<span/>').text(" [-]").addClass('li_h3'))) // end of li
                .css({'list-style': 'square inside', 'line-height': '20px', 'color': param['color_sublist0']['var']}) // end append li2
                //childr.css({'color': param['color_sublist']['var']}) 
            li2.append(ul3)
            } // end else if H2
            
        //===================================================================== H3
        
        else if($('[id=' + '"' + nameh + '"'+']').prop("tagName") == 'H3'){
            elems[i].id = nameh2 +'_'+ nameh;                               // makes an id for H3
            var nameh3 = elems[i].id
            var namehhref = '#'+nameh3;
            var li3 = $("<li/>");
            ul3.append(li3);
            //var ul4 = $("<ul/>").addClass('lev3'); 
            li3.append($('<a/>').attr('href', namehhref).html(nameh).addClass(nameh)) // end of li
                .css({'list-style': 'circle inside','line-height': '20px', 'color': param['color_sublist1']['var']}) // end append li3
            } // end else if H3
       }                                                                   // end for elems



    
//===================================================================== Folding lists, first step

    /*
    Implements the possibility to fold lists. 
    Go to sublevels.  
    It is the first processing step. Insert :: etc.. 
    */

    $("li").each(function(){    // need to be placed before  $("a").click    
        var htm = $(this).html();
        var childr = $(this).children('ul') // closing list when it finds :: in the code
        if(htm.split('\n')[0].search('::')!=-1){ 
                childr.toggle();                // close the sub lists 
                $('<a/>').append($('<span/>').text(" [-]").addClass('::'))
                         .insertBefore(childr)
            } // end if 
        }); // end each
    
    $("li ul li").css({'color': param['color_sublist0']['var']}) 
    $("li ul li ul li").css({'color': param['color_sublist1']['var']}) 
    $("li ul li ul li ul li").css({'color': param['color_sublist2']['var']}) 

//=====================================================================  Folding lists, second step

    /*
    Implements the possibility to fold lists. 
    Go to sublevels.  
    It is the second processing step. 
    */

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

//===================================================================== key actions
    
    /*
    Implements action from keys
    h : show the help
    a : make sliders appearing
    
    */

    $(document).keydown(function(event){

        if(event.keyCode == "s".charCodeAt(0)-32 && statekey == 1){   // Toggle syntax informations
            $('#syntax').toggle()
          } // end if key code
        
          if(event.keyCode == "k".charCodeAt(0)-32 && statekey == 1){   // Toggle keys informations
            $('#keys').toggle()
            } // end if key code
        
        if(event.keyCode == "c".charCodeAt(0)-32 && statekey == 1){   // Toggle carousels informations
          $('#carr').toggle()
          } // end if key code

        if(event.keyCode == "h".charCodeAt(0)-32){    // "h", key for help documentation
            if (param['help']['var'] != false){
                $('.alertify .alert > *').css({'text-align':'left'});
                alertify.alert(simple_md(help))
                }
          } // end if key code

        if(event.keyCode == "q".charCodeAt(0)-32){  // "q" key for showing sliders
            $("a").each(function(){ 
                  if ($(this).prop('id').match(/slider_\d*/)){
                      $(this).toggle()
                  } // end if
                }); // each
            } // end if key code
        if(event.keyCode == param['toggle_hide']['var'].charCodeAt(0)-32){  // hiding text key defined in the parameters
            $("li").each(function(){ 
                if ($(this).hasClass('^^')){
                    $(this).toggle()
                } // end if
              }); // each
          }// end if key code
       if(event.keyCode == 'd'.charCodeAt(0)-32 && statekey == 1){  // toggle draggable
            $("div").each(function(){ 
                //if ($(this).hasClass('chart') || $(this).hasClass('keys')|| $(this).hasClass('toc')){
                if ($(this).hasClass('ui-draggable')){
                  $(this).draggable('destroy')
                  } // end if
                else if ($(this).hasClass('chart')
                        || $(this).attr('id') =='keys'
                        || $(this).attr('id') =='syntax'
                        || $(this).attr('id') =='toc'){
                  $(this).draggable()
                } // end else
            }); // each
          }// end if key code
    
      if(event.keyCode == 'r'.charCodeAt(0)-32 && statekey == 1){  // resize
           $("div").each(function(){ 
               if ($(this).hasClass('chart') || $(this).hasClass('keys')|| $(this).hasClass('toc')){
                 $(this).resize()
             } // end if
           }); // each
         }// end if key code
    
        })



//=====================================================================  Toggle titles and list

    $("a").click(function (evt) {                   // toggle for H1, H2, H3 etc..( has to be after hide lists)
        var evtc = evt.target.className;
        //alert(evtc)
        if(evtc == 'li_h1' | evtc == 'li_h2' | evtc == 'li_h3' | evtc == '::')  // open close list on click
            $(this).next().toggle();
        });// end click
        

//===================================================================== Close all the lists

  $(document).keydown(function(event){   
    /*
    Close all the lists 
    */
     if(event.keyCode == 27){ // Trigger statekeys with Escape
          statekey *= -1
         $('#esc').toggle()
        }
        if((event.keyCode == "l".charCodeAt(0)-32) && statekey == 1){  
                $('a > span').each(function(){
                  if ($(this).parent().next().css('display')=='block'){
                    if ($(this).parents('div').last().attr('id') != 'toc'){
                      $(this).trigger('click')
                    }
                  }
                } // end function
              ) //end each
           } // end if key code
     }) // end keydown
     
     


//===================================================================== 

     $("a").each(function(){                             // insert pdf from folder
         var txt = $(this).text()
         if (txt.match(reg_folder)){                     // check <<
            var txt_short = txt.split('<<')[0].trim()    // take the title
            var jsoname = 'json/' + txt_short + ".json"  // make the adress for the json
            $(this).text(txt_short)                      // remove << in the title
            alert(jsoname)
            pdf_folder = $('<div/>')                    // make a div for inserting the pdfs
            pdf_folder.insertAfter($(this))             // insert the idv after the initial element.
            $.getJSON(jsoname, function(result){
                for (i in result){                      // for each address in the json.. 
                    alert(result[i])
                var obj = $('<object/>').attr('data',result[i])
                                        .attr('type', "application/pdf")
                                        .attr('width',"100%")
                                        .attr('height',"100%")
                pdf_folder.append(obj)                  // append the obj to the div.
                } // end for
            }) // end get json
         }// end if 
     }) // end each

    $('#content').addClass('effect2')
    $('body').addClass('bodybgcol1')

    //===================================================================== syntax
    
    // Syntax for producing a document

    $('body').prepend($('<div/>').addClass('syntax').attr('id',"syntax")) 
    $('#syntax').html(simple_md(help)).toggle()
    $('#syntax').draggable()

    //===================================================================== keys
    
    // Keys shortcuts
  
    $('body').prepend($('<div/>').addClass('keys').attr('id',"keys")) 
    $('#keys').html(simple_md(keys)).toggle()
    $('#keys').draggable()

    //===================================================================== esc

    $('body').prepend($('<div/>').addClass('esc').attr('id',"esc")) 
    $('#esc').toggle()


    
 


}// end maketoc  

/*=====================================================================
 ========================== End of maketoc =============================
===================================================================== */


//===================================================================== 

$(document).ready(function () {
    $(window).scroll(fixTitle);
    $('[data-toggle="tooltip"]').tooltip(); // activates the tooltips
    $('.carousel').carousel({ interval: false }) // removing automatic carousel
    zoomabove()
    gototop()
    var syntaxscroll = document.querySelector('#syntax');
    Ps.initialize(syntaxscroll);
    var tocscroll = document.querySelector('#toc');
    Ps.initialize(tocscroll);
    var keyscroll = document.querySelector('#keys');
    Ps.initialize(keyscroll);

});







