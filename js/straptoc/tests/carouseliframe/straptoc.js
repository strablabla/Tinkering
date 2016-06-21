// var loadtoc = function(){
//     var sc = document.createElement('script');
//     sc.src = "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js";
//     document.head.appendChild(sc);
// }

//https://github.com/strablabla/Tinkering/207f765/js/straptoc/straptoc.js 
//https://github.com/strablabla/Tinkering/207f765/js/straptoc/straptoc.css


var maketoc = function(){
    
    
    /*
    Straptoc.js is a code for enhancing markdown capabilities. Straptoc.js modify the code produced by Strapdown.js. It adds many features such as possibility to insert videos (local, youtube), make Carousels, Portfolios.
    It simplifies also the markdown syntax in some cases. The whole code uses extensively jQuery library.
    */
    

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
    * $------- : permit to insert comment lines in the edition window
    * $u: utf8 string :, This replace the string between : by the utf8 translation.
    */}.toString().slice(14,-3)
    
    var keys = function(){/*
    # Keys: 
    * Esc + k : show keys
    * Esc + s : show syntax
    * Esc + d : toggle draggable
    * Esc + r : resize
    * Esc + c : toggle carousels
    * Esc + t : toggle todo theme
    * Esc + w : toggle all the windows (except TOC)
    * Plot :
        * shift + n : toggle plot tools
    */}.toString().slice(14,-3)

    basename = function(path) {  return path.replace( /.*\//, "" ); }
    dirname = function(path) { return path.match( /.*\// ); }

//===================================================================== Simple markdown 

    /*
    Simple markdown used for providing informations to the user. 
    It handles classical markdown list syntax.
    */
    
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

//===================================================================== Regexp for parameters

    /*
    Regexp
    Used for Straptoc document parametrization and other stuffs.
    */
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
    var reg_height_iframe = reg_func('height_iframe') 
    var reg_toggle_hide = reg_func('toggle_hide') 
    var reg_menu = reg_func('menu')
    var reg_help = reg_func('help')
    var reg_sign = /[^§]§[^§]\w*/
    var reg_folder = /\<\</
    var reg_hyper = /\[\w*.*\]\(\w*.*\)/
    var reg_brack = /\[\w*.*\]/
    var reg_parent = /\(.*\w*.*\)/

// ============================================== global parameters

    var num_slider = 0
    var prefcarr = 'carousel0' // default first name for carousel
    var statekey = -1; // state for keyboard interactions
    var list_wind_open = [] // list of open windows
    
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
             'iframe_height':{'reg':reg_height_iframe, 'cut':'§height_iframe', 'var': '400'},
             'toggle_hide':{'reg':reg_toggle_hide, 'cut':'§toggle_hide', 'var': 'p'},
             'menu_list':{'reg':reg_menu, 'cut':'§menu', 'var': ''},
             'help':{'reg':reg_help, 'cut':'§help', 'var': false}
         }

 //===================================================================== Go to top
    
    /*
    When near the bottom of the page, permits to go upward. 
    */

    $('body').prepend($('<div/>').attr('id','top'))
    $('body').append($('<a/>').attr('href','#top').addClass("scrollToTop").attr('title','go to top')
             .append($('<span/>').addClass("glyphicon glyphicon-chevron-up").attr('id','gotop')))

 //===================================================================== Go to bottom
 
    /*
    When near the top of the page, permits to go downward. 
    */

    $('body').prepend($('<div/>').attr('id','bottom'))
    $('body').append($('<a/>').attr('href','#bottom').addClass("scrollToBottom").attr('title','go to bottom')
             .append($('<span/>').addClass("glyphicon glyphicon-chevron-down").attr('id','gobottom')))

//===================================================================== Carousels

    /*
    Show all the Carousels implemented in the page. 
    */
    
    $('body').prepend($('<div/>').addClass('carr').attr('id',"carr")) 
    $('#carr').append($('<h1/>').text('Carousels')).toggle()
    $('#carr').draggable()
    
 //===================================================================== Remove separating marks from edition
    
  /*
   Separation for comments
   syntax : $------------- comments here. 
  */

    $("p").each(function(){
        if ($(this).text().match(/^\$----.*/)){
            $(this).remove()
        }
    })

 //===================================================================== Context menu

   /*
   Associating a context menu to whatever component on the page. 
  */
 
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
 
    /*
    Zooming in image in Portfolio
    */
    
    $('body').prepend($('<div/>').attr('id',"id_view_image_body"))
           .prepend($('<div/>').attr('id',"id_view_image"))



 //===================================================================== register root path for $portf or $carr
 
  /*
   Register a shared path (root path) for group of images, pdfs, href etc.. 
   syntax : +++ rootpath
  */

  $("p, li").each(function(){
    var htm = $(this).html()
    var txt = htm.split('\n')[1] || ' '
    if (txt.match(/\+\+\+\.*/)) { 
        var addroot = txt.split('+++')[1].trim()+'/'
        $(this).find('*').each(function(){
          
             //==============================   case of img
             
            if ($(this).parent().find('img')){    
                  $(this).attr('src', addroot+$(this).attr('src')) // add root path to img
                }
                
             //==============================   case of pdfs
             
            if ($(this).text().match(/§§/)){   
                $(this).attr('href', addroot+$(this).attr('href')) // add root path to pdf
               }
            //==============================   case of local videos
            
            if (htm.match(/%%/)){   
                $(this).attr('href', addroot+$(this).attr('href')) // add root path to vid
              }
            //==============================   case of local html

            if (htm.match(/,,/)){   
                //alert($(this).html())
                $(this).attr('href', addroot+$(this).attr('href')) // add root path to html
               }
            //==============================   
            }) // end each
        } // end if txt.mtch
    }) // end each p, li


//===================================================================== list of iframes

    /*
    Takes all the iframes addresses after $htm and insert in list. 
    */

    $("p, li").each(function(){
        if ($(this).text().match(/^\$htm/)) {  // detect list html
           var ulhtm = $('<ul/>')
           $(this).children('a').each(function(){
                //alert($(this).html())
                ulhtm.append($('<li/>').append($(this)))
             }) // end each 
           $(this).replaceWith(ulhtm) // replace whole p or li 
        }   // end if regexp
    })   // end each p, li


 //===================================================================== Portfolio
 
    /*
    Takes all the addresses after $portf and insert in list. 
    */

   $("p, li").each(function(){
     if ($(this).text().match(/^\$portf/)) {  // detect portfolio
        var divportf = $('<div/>').addClass("row")
        var nbcol = $(this).text().split(/^\$portf/)[1].split('\n')[0].trim() || 3 // number of columns
        var nbsuffix = 12/parseInt(nbcol) // suffix for bootstrap
        var classportf = "col-md-" +  nbsuffix
        $(this).children('img').each(function(i){
             var divportfinner = $('<div/>').addClass(classportf)
                 .append(
                       $('<div/>').addClass("thumbnail")   // class thumbnail
                         .append($(this)) // add image
                        ) // end append thumbnail
        divportf.append(divportfinner)
        }) // end each img
        $(this).replaceWith(divportf) // replace whole p or li with portfolio. 
     }   // end if regexp
 })   // end each p

//===================================================================== Carousel

    /*
    Takes all the addresses after $carr and insert in list. 
    */
    
    var div = $('<div/>').attr('id',"oo").text('ohhhhhh')
    $('#content').append(div)

    $("p, li").each(function(){
        //alert($(this).text())
        if ($(this).text().match(/^\$carr/)) { 
            
            alert($(this).html())
    
            var newcarr = function(){
                var num = parseInt(prefcarr.split('carousel')[1])+1
                var incremcarr = 'carousel' + num ;
                prefcarr = incremcarr ;
                return incremcarr
              }
    
            var namecarr = $(this).text().split(/^\$carr/)[1].split('\n')[0].trim() || 'default'
            if (namecarr=='default'){
                  namecarr=newcarr()
              }
            var divcarr = $('<div/>').addClass("carousel slide")
                                     .attr('id', namecarr)
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
                     .attr('href','#' + namecarr)
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
                      
              //======================= iframe items
              
              $(this).children('a').each(function(i){
                  //alert($(this).attr('href'))
                  var divitem = $('<div/>').addClass("item")
                                 .append($(this)
                                 ) // end append
                  if (i == 0){divitem.addClass("active")}
                  divcarrinner.append(divitem) // end append
                  }) // end each

            //=========================  make the whole div.

            divcarr.append(divcarrinner.append(aprev).append(anext)) 
            $(this).replaceWith(divcarr)
            //$('#carr').append(divcarr) // gathering all the carousels
            $('#oo').append(divcarr) // gathering all the carousels
           
        } // end if regexp
    }) // end each p
    
    $('.carousel').each(function(){
        alert($(this).html())
    })

//===================================================================== retrieving config param

    /*
    Corrects when there is no line feeding so as to split correctly the arguments.
    */

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
   Insert element in the Navbar with hyperlinks
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

//=====================================================================   line symbolic removal.

    /*
    Instead of writing tildes, just write %%% at the end of the line. 
    */

    var regcbarree = /[A-Za-z0-9\.\'\s\u0080-\u00FF]*\%\%\%/g  // replace %%% by deleted text. 
    var htm = $('#content').html()  
    var m = htm.replace(regcbarree,function(content){
        var barr = content.split('%%%')[0].trim()
        var barrcorr = '<del>'+barr+'</del>'
        return barrcorr
        }) // end replace
    $('#content').html(m) 


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

//===================================================================== Input
    
    /*
    Add input
        * button with $input b value 
        * input form with $input i value id
    */

    $('p').each( function(){
        var reginp = /^\$input\s*.*/
        var txt = $(this).text()
        var txtm = txt.match(reginp)
        var kind = {'b':'button', 'i':'input'}
        if (txtm){
            var arg = txtm[0].split('$input')[1].trim()
            var tinp = arg.split(/\s+/)[0]
            var val = arg.split(/\s+/)[1]
            var id = arg.split(/\s+/)[2]
            var inpbutt = '<input type="'+ kind[tinp] +'" value="'+ val +'" id="' + id +'"'  // pure input or button.
            if (kind[tinp] == 'button'){
                inpbutt += '" class="btn btn-default"' // Bootstrap button
            }
            inpbutt += '/>'
            var sub = $('<form/>').append(inpbutt)
            $(this).replaceWith(sub)
           }
        })

//===================================================================== TOC

    /*
    Table of Contents
    It sums up the h1, h2 and h3 tags in a movable window with hyperlinks. 
    */

    if(param['notoc']['var'] == false){
        $('body').prepend($('<div/>').addClass('onside').attr('id',"toc"))     // adds the Table of Contents at the beginning
    }
    
    $('.onside').css({'background-color' : param['color_toc']['var']})    // modifying backgnd color for TOC
    
    $('#toc').append($('<a/>').append($('<span/>').text("[--]").addClass('li_h1')));
    var ul1 = $("<ul/>"); // first levels with class
    $('#toc').append(ul1);
    $('#toc').draggable() // make the toc draggable with jquery-ui widget draggable. 
    // read all the headers and make the TOC (with ref) and the id names
    var lnotoc = ['Carousels'] // list of excluded H1 (defined with inner HTML)
    for(var i = 0,  elems = $(":header"); i < elems.length; i++) {
        var nameh = elems[i].innerHTML.trim().split(reg_id)[0];
        elems[i].id = nameh; // set the identity with inner html of the tag. 
        
        //===================================================================== H1
        
        if($('[id="'+nameh+'"]').prop("tagName") == 'H1'){    // if H1    
            if (lnotoc.indexOf(nameh) == -1){
                var nameh1 = nameh
                var li1 = $("<li/>");
                ul1.append(li1);
                var ul2 = $("<ul/>").addClass('lev1');                     // second levels with class
                li1.append($('<a/>').attr('href', namehhref).css({'color': 'black'}).html(nameh)
                             .append($('<span/>').text(" [-]").addClass('li_h2'))) // en append ul
                li1.append(ul2);
             }
        } // end if H1
        
        //===================================================================== H2
        
        else if($('[id="'+nameh+'"]').prop("tagName") == 'H2'){ // if H2
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
        
        else if($('[id="'+nameh+'"]').prop("tagName") == 'H3'){
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

//===================================================================== Folding iframes and root mechanism (+++) with multiple iframes

    /*
    Implements the possibility to fold iframes in a list
    It also registers root for multiple files with +++ mechanism. 
    */

    $("p, li").each(function(){
        var childframe = []
        $(this).children('a').each(function(){            // modifying iframe for permitting folded list mechanism.
               if ($(this).text().match(',,')){      // control that we are dealing with iframe
                    var txt = $(this).text().split(',,')[0]
                    var par = $(this).parent()
                    //================================== register root path for iframe
                    if (par.html().match(/\+\+\+\.*/)) {  
                        root = par.html().match(/\+\+\+.*/)[0].split(/\s/)[1] 
                        oldhref = $(this).attr('href') 
                        $(this).attr('href', root + '/' + oldhref) // setting the new path with root
                        }
                    var ifhref =  '<a href="'+ $(this).attr('href') + '">' + txt + '</a>' 
                    var tlist = ifhref+ ' ::'
                    var underthis = $('<ul/>').append($('<li/>').append($(this).clone())) // put inside a list
                    var ulframe = $('<li/>').append(tlist).append(underthis).addClass('iframe')  // insert class iframe
                    //==================================  root path 
                    if (par.html().match(/\+\+\+\.*/)) { 
                        var titleli = $('<li/>').append(tit ).append($('<ul/>').append(ulframe))                   
                        childframe.push(ulframe) // keep in a list
                        }
                    //====================================== no root path 
                    else{ par.replaceWith(ulframe)  // replace <a> parent with a <ul><li> containing <a>
                        }
               } // end if match ,,
            }) // end each a
            if (childframe.length> 0){
                var ul = $('<ul/>')
                for (i in childframe){
                    ul.append(childframe[i]) // adding each iframe inside a list 
                  }// end for
                var tit = $(this).html().split(/\n/)[0] // Title of the parent
                var newlistframe = $('<li/>').append(tit).append(ul)
                $(this).replaceWith(newlistframe) // replace  parent with a list containing the iframes
            } // end if childframe.length> 0
     }) // end each p, li
    
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

//===================================================================== Colors for sublists

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
    Implemented keys actions
    
    Esc + s : show the syntax
    Esc + k : show the shortcut keys
    Esc + d : toggle draggable attribute.
    Esc + r : toggle windows resize
    Esc + c : toggle window with all carousels
    Esc + t : toggle window with all list refering to the todo theme
    Esc + w : toggle all the windows
    Esc + p : toggle charts
    Plot : 
        * shift + n : toggle tools
    
    */

    $(document).keydown(function(event){

        var list_wind = ['syntax', 'keys', 'carr', 'todotheme'] // list of windows

        if (event.keyCode == "s".charCodeAt(0)-32 && statekey == 1){   // Toggle syntax informations
            $('#syntax').toggle()
          } // end if key code
        
        if (event.keyCode == "k".charCodeAt(0)-32 && statekey == 1){   // Toggle keys informations
            $('#keys').toggle()
            } // end if key code
        
        if (event.keyCode == "c".charCodeAt(0)-32 && statekey == 1){   // Toggle carousels informations
          $('#carr').toggle()
          } // end if key code
        
        if (event.keyCode == "r".charCodeAt(0)-32 && statekey == 1){   // Toggle resize
            for (i in list_wind ){
                  $('#'+list_wind[i]).css({ 'resize':'both', 'overflow' : 'scroll'})
              } // end for
             $("div").each(function(){ 
                if ($(this).hasClass('chart')
                    || $(this).attr('id') =='toc'){
                    $(this).resize()
                    } // end if
                }); // each
            } // end if key code

        if (event.keyCode == "w".charCodeAt(0)-32 && statekey == 1){   // Toggle all the windows
              for (i in list_wind ){
                  if ($('#'+list_wind[i]).css('display') != 'none'){
                     list_wind_open.push(list_wind[i])
                     $('#'+list_wind[i]).toggle()
                  }   // end if
                  else{
                     if (list_wind_open.indexOf(list_wind[i]) > -1){
                         $('#'+list_wind[i]).toggle()
                     }// end if css('display') != 'none'
                  } //end else
                } // end for (i in list_wind )
            } // end if key code
        
        if (event.keyCode == "t".charCodeAt(0)-32 && (statekey == 1 )){   // Toggle todotheme
            $('#todotheme').toggle()  
            if ($('#todotheme').is(':hidden')){ // todotheme is closed.
                $('.theme').remove()
                statekey = 1;
                }
            else{
              statekey = 'blocked' // prevent from opening windows when writing a theme. 
              } // end else
            } // end if key code
        
        if (event.keyCode == "p".charCodeAt(0)-32 && statekey == 1){   // Toggle charts
              $('.chart').toggle()
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
                if ($(this).hasClass('ui-draggable')){
                  $(this).draggable('destroy')
                  } // end if
                else if ($(this).hasClass('chart')
                        || $(this).attr('id') =='keys'
                        || $(this).attr('id') =='syntax'
                        || $(this).attr('id') =='toc'
                        || $(this).attr('id') =='todotheme'
                        || $(this).attr('id') =='carr'){
                  $(this).draggable()
                } // end else
            }); // each
          }// end if key code
        })

//===================================================================== 

    var sel = ['§§'] // ';;',
    var debend = { ',,' : {'color':'#ff0066'},
                   ';;' : {'deb' : '<iframe width='+'"' + param['vid_width']['var'] + '"' + 'height="315" src="', 'end' : '" frameborder="0" allowfullscreen></iframe>','color':'#cc99ff'},
                   '§§': {'deb' : '<object width='+'"' + param['pdf_width']['var'] + '"' + ' height="500" type="application/pdf" data="' , 'end' : '"></object>', 'color':'#ff6600'}}




//===================================================================== // taking href with blanks

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
       })  // end each 
       
    var maketag = function(self, deb, end, select){ // makes the tags for pdfs and videos
        patt = {';;' : ["watch?v=", "embed/"], '§§' : ["none", "none"]}
        var tag = $("<ul/>").append($("<li/>")
                            .append(deb+self.attr('href')
                            .replace(patt[select][0], patt[select][1])+end)) // make doc                                    
        var text = self.text().replace(select,'')
        $('<a/>').text(text).append($('<a/>').append($('<span/>').text( " [-]").addClass(select)))
                 .insertBefore(self).css({'color':debend[select]['color']})
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

//=====================================================================  Toggle ;; and §§

    /*
    Toggle pdf and videos for closing the associated lists.
    */

    $("a").click(function (evt) {  
        var evtc = evt.target.className;              
        if(evtc == ';;' | evtc == '§§') {      // toggle 
            $(this).parent().next().toggle(); // if click, activate next <ul>
            } // end if event      
        });// end click


//=====================================================================  Hide list

    /*
    Making a hidden list with ^^
    */

    $("li").each(function(){                // hide lists
        var reg_hide = /\s*\^\^\s*/
         var htm = $(this).html()
         if (htm.match(reg_hide)){
            $(this).toggle().addClass('^^')
            var newhtm = htm.replace(reg_hide , '')
            $(this).html(newhtm)
            }// end if
    })// end each

//=====================================================================  Toggle titles and list

    $("a").click(function (evt) {                   // toggle for H1, H2, H3 etc..( has to be after hide lists)
        var evtc = evt.target.className;
        //alert(evtc)
        if(evtc == 'li_h1' | evtc == 'li_h2' | evtc == 'li_h3' | evtc == '::')  // open close list on click
            $(this).next().toggle();
        });// end click
        
//=====================================================================  Change size img 

    /*
    Give the possibility to change size of images, [img widthxheight](href)
    */
    
    $("img").each(function(){               // retrieve and change size images
            var reg_im = /\s*\d*x\d*\s*/
            if ($(this).attr('alt').match(reg_im)){
                var sizeim = $(this).attr('alt').match(reg_im)[0];
                $(this).attr('width',sizeim.split('x')[0]);
                $(this).attr('height',sizeim.split('x')[1])
            }
        })

//=====================================================================  Catption img 
    
    /*
    Adding caption to image with %caption%
    */
    
     $("img").each(function(){               // retrieve the caption and insert it under the image.
             var reg_caption = /\%.*\%/
             if ($(this).attr('alt').match(reg_caption)){ 
               
               var capt = $(this).attr('alt').match(reg_caption)[0].slice(1,-1);
               var captid = capt.replace(/\s+/g, '') + Math.floor((Math.random() * 1000) + 1);
               //alert(captid)
               var caption = $('<figcaption/>').text(capt)
               $(this).wrap($('<figure/>').attr('id', captid).css({'text-align': 'center'})) // center image with caption
               $('#'+captid).append(caption)
             } // end if
         }) // end each
        
//=====================================================================  

 $('a').each(function(){

        //=====================================================================   Youtube

        if ($(this).text().match(';;')){      // replace the address with a div with 'youtube' class. 
            var id = $(this).attr('href').split('v=')[1].trim()
            var newtag = $('<div/>').addClass('youtube')
                   .css({'width': '500px', 'height': '281px'})
                   .attr('id', id)
            $(this).replaceWith(newtag) // replace the <a> with a <div> with class 'youtube'
         } // end if

        //=====================================================================   Insert iframe

        if  ($(this).text().match(',,')){       // insertion of iframes with regexp ',,' for inserting web pages
            var iframe_url = $(this).attr('href')
            var wid = (param['iframe_width']['var']).toString()  // width from configuration parameters
            var hei = (param['iframe_height']['var']).toString()  // height from configuration parameters
            var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': wid, 'height': hei })
            var div = $('<div/>').css({'text-align':'center'})
            $(this).replaceWith(div.append(iframe)); // replace the <a> with a <div> with iframe.
        } // end if

        //=====================================================================   Local video

        if  ($(this).text().match('%%')){       // insert local video, works with Chrome
            var vid_url = $(this).attr('href')
            var vid = $('<video/>', {'frameborder': '0', 'src': vid_url, 'width': '600', 'height': '400' })
            vid .prop("controls",true);
            var div = $('<div/>').css({'text-align':'center'})
            var keeplink = $('<a/>').text($(this).text().split('%%')[0])
                                    .attr('href',$(this).attr('href'))
            keeplink.insertBefore($(this))
            $(this).replaceWith(div.append(vid)); 
        } // end if
 }) // end each



//===================================================================== Esc for permitting some keys.

  $(document).keydown(function(event){   
    /*
    Close all the lists 
    */
    if(event.keyCode == 27){ // Trigger statekeys with Escape
          if (statekey != 'blcoked'){
            statekey *= -1
          }
          else{
            statekey = -1
          }
         $('#esc').toggle()
        } // end if

//===================================================================== Close all the lists

    /*
    keydown l close all the list in the whole document.
    */

    if((event.keyCode == "l".charCodeAt(0)-32) && statekey == 1){  
                $('a > span').each(function(){
                  if ($(this).parent().next().css('display')=='block'){
                    if ($(this).parents('div').last().attr('id') != 'toc'){
                      $(this).trigger('click') // close lists. 
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

     //===================================================================== utf8
    
    /*
    insert utf8 hex codage in straptoc document.
    */
    
    function decode_utf8(s) {
        return decodeURIComponent(s.replace(/\s+/g, '').replace(/[0-9a-f]{2}/g, '%$&'));
      }
    
    $("p, li").each(function(){
      var txt = $(this).text()
      var regu = /\$u:.*:/
      utf = txt.split('\n')[0].match(regu)
      if (utf){
        var u = utf[0].slice(3,-1) 
        var txt_decoded = txt.replace(regu, decode_utf8(u)) 
        $(this).text(txt_decoded) // 
        //alert(txt_decoded)
      }   // end if regexp
    })   // end each p

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
    
    //===================================================================== todotheme
    
    // Themes in todo list
  
    $('body').prepend($('<div/>').addClass('todotheme').attr('id',"todotheme")) 
    $('#todotheme').toggle()
    $('#todotheme').draggable()
    var inptheme = $('<input/>').attr('type', 'input')
                                .attr('value','theme')
                                .attr('id', 'todo_input')
    var buttheme = $('<input/>').attr('type', 'button')
                                .addClass('btn btn-default')
                                .attr('value','submit').click(function(){
                                        $('.theme').remove()
                                        showtheme()
                                        })
    var buttblock = $('<input/>').attr('type', 'button')
                            .addClass('btn btn-default')
                            .attr('value','unblock').click(function(){
                                    statekey = 1;
                                    })
    $('#todotheme').append(inptheme) // btn btn-default
    $('#todotheme').append(buttheme)  // submit theme
    $('#todotheme').append(buttblock) // unblock theme
    
    var showtheme = function(){
        var targ = $('#todo_input').val()
        // if ($('#todotheme').is(':hidden')){
              $('#todotheme').append($('<h1/>').text('Theme: '+targ).addClass('theme')) // set title
         $('li').each(function(){
             var txt_list = $(this).text().split('\n')[0]
             var par = $(this).parents('li').last()
             if (txt_list.match(targ) && !par.hasClass('^^')){   // match between list text and input
               var newline =  $('<li/>').html($(this).html())   //jQuery.extend(true, {}, $(this));
                 $('#todotheme').append(newline.addClass('theme'))   // adding lists referencing to the theme
               } // end if
            }) // end each
               $("a").click(function (evt) {                
               var evtc = evt.target.className;
               if(evtc == '::')  // open close list on click
                   $(this).next().toggle();
               });// end click
             $('#todotheme li ul').toggle()
          //} // end if hidden
      }// end shotheme function

    //===================================================================== esc

    $('body').prepend($('<div/>').addClass('esc').attr('id',"esc")) 
    $('#esc').toggle()

     //    }  // end if all loads done
     // },25); // end  setInterval(function() {}, time )
     
     $('.carousel').each(function(){
         alert($(this).html())
     })

}// end maketoc  

/*=====================================================================
 ========================== End of maketoc =============================
===================================================================== */

registerKeyboardHandler = function(callback) {
  var callback = callback;
  d3.select(window).on("keydown", callback);  
};



//=====================================================================  position in TOC

    /*
    Indicate position on the page by changing size of character in the TOC. 
    */

    function fixTitle() {
        $('div.section').each(function () {  // change fontsize with position in toc
            var $this = $(this);
            var offset = $this.offset().top;
            var scrollTop = $(window).scrollTop();
            if (scrollTop > offset) {
               var ind = $this.attr('id') 
               var origftsize = $('#toc').css("font-size")
               $('#toc li a').css("font-size", origftsize)
               $('#toc  li:nth-child(' + ind + ') > a').css("font-size", "150%")
            }
        });
    }

//=====================================================================  click on tumbnail-> above zoom center

    /*
    Zoom for Portfolio
    */

    function zoomabove() {
            $("img").click(function(){
            $("#id_view_image").html("<img src='"+$(this).attr('src')+"' class='view_image_img'/>");
            $("#id_view_image_body").addClass("view_image_body");
            $("#id_view_image").addClass("view_image");
            $(".thumbnail").parent().css({'z-index':'-1'})
            $("#id_view_image").css({'z-index':'4'})
        });

        $("#id_view_image").click(function(){

            $("#id_view_image").css({'z-index':'-1'})
            $(".thumbnail").parent().css({'z-index':'4'})
            $("#id_view_image").html("");
            $("#id_view_image_body").removeClass("view_image_body");
            $("#id_view_image").removeClass("view_image");
        }); 

    }

//===================================================================== Go to top

    /*
    Go to the top of the whole page. 
    */

    function gototop(){

       //Check to see if the window is top if not then display button
        $(window).scroll(function(){
            if ($(this).scrollTop() > $(document).height()/2) {
                // alert('$(this).scrollTop() > 10')
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
    
//===================================================================== Go to bottom

    /*
    Go to the bottom of the whole page. 
    */

    function gotobottom(){
        
        $(window).scroll(function(){
            if ($(this).scrollTop() < $(document).height()/2) {
                // alert('$(this).scrollTop() < 10')
                $('.scrollToBottom').fadeIn();
            } else {
                $('.scrollToBottom').fadeOut();
            }
        });
        //Click event to scroll to bottom
        $('.scrollToBottom').click(function(){
            $('html, body').animate({scrollTop : $(document).height()},800);
            return false;
        });
    }

//===================================================================== Nice scroller

    /*
    Fine and elegant scroller
    */
    
    $(document).ready(function () {
        $(window).scroll(fixTitle);
        $('[data-toggle="tooltip"]').tooltip(); // activates the tooltips
        $('.carousel').carousel({ interval: false }) // removing automatic carousel
        zoomabove()
        gototop() // go to the top of the page
        gotobottom() // go to the bottom of the page
        // Scroll
        lscrolls = ['syntax', 'toc', 'keys', 'carr', 'todotheme']
        for (i in lscrolls){
            Ps.initialize(document.querySelector('#'+lscrolls[i]))
        }

    });


