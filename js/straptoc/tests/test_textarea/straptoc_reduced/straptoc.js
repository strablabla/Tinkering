// var loadtoc = function(){
//     var sc = document.createElement('script');
//     sc.src = "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js";
//     document.head.appendChild(sc);
// }


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
    // "https://cdn.jsdelivr.net/gh/alertifyjs/alertify.js@v1.0.6/dist/js/alertify.js",
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
    * Lists
        * :: , makes folding list (close by default)
        * Alt L for folding/unfolding lists.
    * Insert docs
        * [video ;;](hyperlink) insert a video with the hyperlink through iframe element.
        * [pdf §§](hyperlink) insert a pdf with object tag.
        * [blabla ,,](hyperlink) insert whatever iframe
        * [blabla %%](hyperlink) insert a local video with no autoplay by default (works with Chrome but not with Firefox)
    * Pictures
        * [blabla %caption%](address) insert the caption under the image
        * Size image, enter the size after the name eg: blabla 500x500(address)
        * $portf and list of images in markdown language  after for making a portfolio with pictures.
        * $carr and list of images in markdown language  after for making a carrousel with pictures.
    * hide
        * double ^, is used to hide some text
    * Deactivate objects
        * Set notoc to true for removing the TOC.
        * novideo, at the beginning of the document to avoid loading of videos.
        * noiframes, at the beginning of the document to avoid loading of iframes.
    * Tooltips
        * insertion of tooltip : after h1 or h2, write the tooltip betweeen {}
    * @@ blabla, copy the li, blabla @@ paste the li (@@ must be glued)
    * @color to change color, for the moment works only for lists.
    * %%% for deleting symbolically a line, replacing  the tilde.
    * Common path
        * syntax : +++ rootpath for  \$carr or \$portf  \$pdf when muliple path with same root.
        *  eg for frames :
            * blabla
                +++ root
                [title iframe ,,](whatever.html)
        * Becareful
            * no space after blabla
            * +++ and [title .. on same column
    * ``` before code for show code.. no need to bracket the code.
    * links and buttons
        * §menu toto:hash bobo:trash, add items bobo and toto to navbar with links hash and trash
        * $input b blabla : makes a button blabla
        * $input i ohoh : makes a input for entering text with placeholder ohoh.
        * --link-- , creates a tag with id "link"
    * separation
        * $* : horizontal line separation
    * math
        * §mathsize : set the size of the equations. Possible values : tiny, small, normalsize, large, Large, LARGE, huge, Huge
        * $eq : put the equation in a box. Has to be put before Mathjax code..
    * $menu :
        * eg : before H1 place $menu_zax link:nm_Edit:ic_edit:href_Introduction
    * comments
        * $------- : permit to insert comment lines in the edition window
    * $u: utf8 string :, This replace the string between : by the utf8 translation.
    * $pdb : pdb files insertion in the document.
        * syntax is $pdb path_to_pdb(or pdb name in the database) options
        * eg: $pdb data/5u3j.pdb chA:cartoon
    * color, bold and underline
        * This is done using double quote and options
            * "blabla"u makes balbla underlined
            * "blabla"b makes blabla bold
            * "blabla"cb makes blabla with color blue
            * "blabla"cg makes blabla with color green etc..
            * available colors : 'r', 'b', 'y', 'g', 'o', 'm'
    * $post : insert a postit
        * eg: $post Il était une fois cb , makes a postit with text Il était une fois with blue color..
    */}.toString().slice(14,-3)

    var keys = function(){/*
    # Keys:
    * keys and syntax
        * Esc + k : show keys
        * Esc + s : show syntax
    * TOC
        * Esc + m : toggle TOC
    * Secondary panels
        * Esc + c : toggle carousels
        * Esc + t : toggle todo theme
    * Lists
        * Esc + l : toggle all lists
            * open/close
    * Handle windows
        * Esc + r : resize
        * Esc + d : toggle draggable
        * Esc + w : toggle all the windows (except TOC)
    * Plot :
        * shift + n : toggle plot tools
    */}.toString().slice(14,-3)

    var toc_params = function(){/*
    # Doc parameters:
    * §menu toto:  inserting links in the navbar
    * §noiframe : no iframes
    * §notoc : no TOC
    * §width_video 10%  : video width
    * §width_pdf 10%  : pdf width
    * §width_content 300  : page width
    * §width_iframe 1000 : iframe width
    * §height_iframe 500 : iframe height
    * §col_sublist0 col : color sub list 0
    * §col_sublist1 col  : color sub list 1
    * §col_sublist2 col : color sub list 2
    * §col_toc col  : color of TOC
    * §toggle_hide k : give to the key  k the ability to hide the toggable parts of the doc.
    * §help true  : possibility of having a help menu
    * §mathsize size : change the size of the equations written with Mathjax
    * §col_eq col : color for the equation box
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
                ul.append($('<li/>').text(text_insert).css({"font-weight": "bold"}))
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
    var reg_col_h1 = reg_func('col_h1')
    var reg_col_h2 = reg_func('col_h2')
    var reg_col_h3 = reg_func('col_h3')

    var reg_col_sublist0 = reg_func('col_sublist0')   // color sublist 0
    var reg_col_sublist1 = reg_func('col_sublist1')   // color sublist 1
    var reg_col_sublist2 = reg_func('col_sublist2')   // color sublist 2
    var reg_mathsize = reg_func('mathsize')           // size MathJax
    var reg_col_toc = reg_func('col_toc')             // color of the TOC
    var reg_col_eq = reg_func('col_eq')               // color of equation boxes
    var reg_notoc = reg_func('notoc')                 // remove the TOC
    var reg_width_video = reg_func('width_video')     // videos's width
    var reg_width_pdf = reg_func('width_pdf')         // pdf's width
    var reg_height_pdf = reg_func('height_pdf')        // pdf's width

    var reg_width_content = reg_func('width_content')        //  content width
    var reg_height_content = reg_func('height_content')      //  content height
    var reg_centered_content = reg_func('centered_content')
    var reg_width_iframe = reg_func('width_iframe')          //  iframe width
    var reg_height_iframe = reg_func('height_iframe')        //  iframe height
    var reg_toggle_hide = reg_func('toggle_hide')
    var reg_menu = reg_func('menu')
    var reg_help = reg_func('help')
    var reg_params = reg_func('params')
    var reg_sign = /[^§]§[^§]\w*/
    var reg_folder = /\<\</
    var reg_hyper = /\[\w*.*\]\(\w*.*\)/
    var reg_brack = /\[\w*.*\]/
    var reg_parent = /\(.*\w*.*\)/

// ============================================== Redefining some classes

    /*
    Removes color bugs in text area.
    */

    $('.str, .pun, .typ, .pln, .lit').css({"color":"black"})
    $('.prettyprint').css({"text-align":"justify"})

// ============================================== global parameters

    var num_slider = 0
    var prefcarr = 'carousel0' // default first name for carousel
    var statekey = -1; // state for keyboard interactions
    var list_wind_open = [] // list of open windows

//===================================================================== Dictionary for parameters

    /*
    Parameters for configuring the document
    */

    param = {
            'color_h1':{'reg':reg_col_h1, 'cut':'§col_h1', 'var': 'black'},
            'color_h2':{'reg':reg_col_h2, 'cut':'§col_h2', 'var': 'black'},
            'color_h3':{'reg':reg_col_h3, 'cut':'§col_h3', 'var': 'black'},
            'color_sublist0':{'reg':reg_col_sublist0, 'cut':'§col_sublist0', 'var': 'green'},
            'color_sublist1':{'reg':reg_col_sublist1, 'cut':'§col_sublist1', 'var': 'green'},
            'color_sublist2':{'reg':reg_col_sublist2, 'cut':'§col_sublist2', 'var': 'green'},
            'mathsize':{'reg':reg_mathsize, 'cut':'§mathsize', 'var': ''},
            'color_toc':{'reg':reg_col_toc, 'cut':'§col_toc', 'var': '#FFCC99'},
            'color_eq':{'reg':reg_col_eq, 'cut':'§col_eq', 'var': '#FFCC99'},
            'notoc':{'reg':reg_notoc, 'cut':'§notoc', 'var': false},
            'vid_width':{'reg':reg_width_video, 'cut':'§width_video', 'var': '80%' },
            'pdf_width':{'reg':reg_width_pdf, 'cut':'§width_pdf', 'var': '80%'},
            'pdf_height':{'reg':reg_height_pdf, 'cut':'§height_pdf', 'var': '80%'},
            'content_width':{'reg':reg_width_content, 'cut':'§width_content', 'var': false},
            'content_height':{'reg':reg_height_content, 'cut':'§height_content', 'var': false},
            'content_centered':{'reg':reg_centered_content, 'cut':'§centered_content', 'var': false},
            'iframe_width':{'reg':reg_width_iframe, 'cut':'§width_iframe', 'var': '900'},
            'iframe_height':{'reg':reg_height_iframe, 'cut':'§height_iframe', 'var': '400'},
            'toggle_hide':{'reg':reg_toggle_hide, 'cut':'§toggle_hide', 'var': 'p'},
            'menu_list':{'reg':reg_menu, 'cut':'§menu', 'var': ''},
            'help':{'reg':reg_help, 'cut':'§help', 'var': false},
            'params':{'reg':reg_params, 'cut':'§params', 'var': false}
         }




 //===================================================================== Frame for Mathjax equations


    /*
    Frame for equations
    */

    $('p').each(function(){
      var txt = $(this).text()
      if (txt.match(/^\$eq/)){
        // alert(txt)
        newtxt = txt.replace("$eq", " ")
        $(this).text(newtxt).wrap("<div class='eq'></div>")
      }   // end if
    })  // end each

    /*
    Activating or not box shadow for equations
    */

    $('.eq').each(function(){
        $(this).css({"box-shadow": "none", 'background-color' : param['color_eq']['var']})
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

 //===================================================================== separating line

    /*
    Simple line separation on the page.
    syntax : $*
    */

    $("p").each(function(){
      txt = $(this).text()
      if (txt.match(/^\$\*/)) {
            var hr = $('<hr/>')
            $(this).replaceWith(hr)
          }   // end if txt.mtch
      })   // end each p

 //===================================================================== Simple bash code

    /*
    Simplifying the syntax by replacing the use of the triple back quotes 2 times by using them only one time.
    syntax : * ```
                text to be quoted..
    */

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

  /*
   Register a shared path (root path) for group of images, pdfs, href etc..
   syntax : +++ rootpath
  */

  $("p, li").each(function(){
    var htm = $(this).html()
    var txt = htm.split('\n')[1] || ' '
    if (txt.match(/\+\+\+\.*/)) {
        var addroot = txt.split('+++')[1].trim()+'/'   // makes the root
        $(this).find('*').each(function(){

             //==============================   case of img

            if ($(this).parent().find('img')){
                  $(this).attr('src', addroot + $(this).attr('src')) // add root path to img
                }

             //==============================   case of pdfs

            if ($(this).text().match(/§§/)){
                $(this).attr('href', addroot + $(this).attr('href')) // add root path to pdf

            var reg_tooltip = /\{(.|\n)*\}/

            if ($(this).text().match(reg_tooltip)){
                    $(this).attr('title', $(this).text().match(reg_tooltip)[0].slice(1,-1)) // add the attribute title
                    var newhtm = $(this).html().replace(reg_tooltip, ' ')                   // remove the brackets
                    $(this).html(newhtm)
                } // end match

               } // end if
            //==============================   case of local videos

            if (htm.match(/%%/)){
                $(this).attr('href', addroot + $(this).attr('href')) // add root path to vid
              }
            //==============================   case of local html

            if (htm.match(/,,/)){
                //alert($(this).html())
                $(this).attr('href', addroot + $(this).attr('href')) // add root path to html
               }
            //==============================


            }) // end each
        } // end if txt.mtch
    }) // end each p, li


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
    /*
       Load all the parameters defined ant the beginning of the straptoc document
    */

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


    //===================================================================== Change color of titles

      /*
        Changing color of H1, H2, H3..
      */

        if (param['color_h1']['var'] != false){
            $('h1').css({'color': param['color_h1']['var']})
            }
        if (param['color_h2']['var'] != false){
            $('h2').css({'color': param['color_h2']['var']})
            }
        if (param['color_h3']['var'] != false){
            $('h3').css({'color': param['color_h3']['var']})
            }

 //===================================================================== Change content width

   /*
     Change the width of the page
     Parameter : $width_content
   */

   if (param['content_width']['var'] != false){
      $('#content').css({'width': param['content_width']['var']})
      }
    if (param['content_height']['var'] != false){
      $('#content').css({'height': param['content_height']['var']})
      }

    if (param['content_centered']['var'] == 'true'){
        // alert(param['content_centered']['var'])
      var midwidth = parseInt(param['content_width']['var'].slice(0,-2))/2
      midwidth  += 'px'
      $('#content').css({ 'position': 'absolute', 'margin-left': '50%', 'left': '-' + midwidth })
      }

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
    var list_split_h1 = $('#content').html().split('<h1')  // insert div with class "section" for following position in toc
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

//===================================================================== mathjax

    /*
    Mathjax made simply by adding $math at the beginning of the line.
    */

    $("p, li").each(function(){
    txt = $(this).text()
    if (txt.match(/^\$math/)) {
          if (param['mathsize']['var'].length>0){ mathsize = '\\'+param['mathsize']['var']+' ' }
          $(this).replaceWith('$$'+ mathsize + txt.split('$math')[1]+'$$')
        }   // end if txt.mtch
    })   // end each p, li


//===================================================================== Input

    /*

    Form button or input

    Add input
        * button with $inp b value
        * input form with $inp i value id name action

    */

    var makearea = function(form, dict){
        var txtarea = $('<textarea/>').addClass("form-control")
        for (k in dict){
            txtarea.attr(k,dict[k])
            }
        var divarea = $('<div/>').append(txtarea).addClass("form-group")
    // $('#content').append(divarea)
    form.append(divarea)
    }

    $('p').each( function(){
    	dic_form = {'v':'value', 'n':'name', 'i':'id', 'w':'width', 'r':'rows'}
        var regform = /^\$form\s*.*/
        var reginp = /^\$inp\s*.*/
        var regbut = /^\$but\s*.*/
        var regcode = /^\$code\s*.*/
        txt = $(this).text()
        var txtm = txt.match(regform)
        if (txtm){
            var ll = txt.split('\n')
            //var form = $('<div/>')
            for (i in ll){
            	l = ll[i]
            	// alert(l)
            	if (i==0){
            		var action = l.split(/\s+/)[1]
            		form = $('<form/>').attr('action', '/'+action)
            						   .attr('id', action)
            						   .attr('method', 'post')
            		}
            	else if (l.match(reginp)){        // input case
            		var ls = l.split(/\s+/)
            		var inp = $('<input/>')
            		// alert(ls)
            		// alert(ls.length)
            		for (j=1; j<ls.length; j++){
                			var el = ls[j]
                			// alert('elem is '+ el)
                			var att = dic_form[el[0]]
                			//alert(el.slice(2))
                			var val = el.slice(2)
                			// alert('param is '+ att)
                			// alert('val is '+val)
                			if (att == 'width'){
                				inp.css({'width': val})
                			}
                			else{
                				inp.attr(att, val)
                			}
            		   } // end for
            		form.append(inp)
            	  } // end else if
            	else if (l.match(regbut)){      // button case
            		var ls = l.split(/\s+/)
            		var but = $('<input/>')
            		for (j=1; j<ls.length; j++){
            			var el = ls[j]
            			var att = dic_form[el[0]]
            			var val = ls[j].slice(2)
            			if (att == 'width'){
            				but.css({'width': val})
            			  }
            			  else{
            				but.attr(att, val)
            			  }
            		   } // end for through args
            		but.addClass("btn btn-default")
            		but.click(function(){
            			$('#'+action).submit()
            		  }) // end click
            		form.append(but)
            	  } // end else if
            	else if (l.match(/\=/)){         // line feed
            	  	form.append($('<br/>'))
            	  } // end  else if =
                else if (l.match(regcode)){         // textarea
                    var ls = l.split(/\s+/)
                    dict_area = {}
                    for (j=1; j<ls.length; j++){
                        var el = ls[j]
                        var att = dic_form[el[0]]
                        var val = ls[j].slice(2)
                        dict_area[att] = val
                    } // end for through args
                    makearea(form, dict_area)   //
                  } // end else if
               } // end for loop on cases
              $(this).replaceWith(form)
            } // end if match form
    }) // end each p


//===================================================================== TOC

    /*
    Table of Contents
    It sums up the h1, h2 and h3 tags in a movable window with hyperlinks.
    */

    if(param['notoc']['var'] == false){
        $('body').prepend($('<div/>').addClass('onside').attr('id',"toc"))     // adds the Table of Contents at the beginning
    } // end if

    $('.onside').css({'background-color' : param['color_toc']['var']})    // modifying backgnd color for TOC

    $('#toc').append($('<a/>').append($('<span/>').text("[--]").addClass('li_h1')));
    var ul1 = $("<ul/>"); // first levels with class
    $('#toc').append(ul1);
    $('#toc').draggable() // make the toc draggable with jquery-ui widget draggable.
    toc_touch = $('<div/>').addClass('onside_touch').attr('id','toc_touch');
    $('#toc').append(toc_touch)

    $('#toc_touch').click(function(){
        $('#showtoc').toggle()
        $('#toc').toggle()
        }) // end toc_touch click


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



//===================================================================== Make bold, underline and color

/*
Change color in the text.
Example :

"blabla"cb colors blabla in blue,
"blabla"u underlines blabla,
"blabla"b makes blabla in bold
available colors : 'r', 'b', 'y', 'g', 'o', 'm'

*/

var buc = function(pli){

    var stl = ['b','u','c'] // 'b', 'u',
    for (i in stl){
        var currstl = stl[i]
        // alert(currstl)
        pli.each(function(){
            var txt = $(this).html().replace(/\<br\>/g, ' <br>'); // .replace('<br>',' ')
            if (currstl != 'c'){
                var re = new RegExp('\"[^"]+\"' + currstl + ' ', 'g')   // case color
                }
            else{
                var re = new RegExp('\"[^"]+\"' + currstl + '\.' +  ' ', 'g') // case b or u
            }
            var tm = txt.match(re)
            if (tm){
                for (i in tm){
                    // alert(tm[i])
                    txtm = tm[i].toString()
                    if (currstl != 'c'){               // case b or u
                        var ttmm = txtm.slice(1,-3)
                        nwstl = '<'+ currstl +'>' + ttmm  + '</'+ currstl +'>' + ' '
                        // alert(nwstl)
                        var bu = new RegExp(tm[i], 'g')
                        var txt = txt.replace(bu, nwstl)
                        $(this).html(txt)
                    }
                    else if (currstl == 'c'){    // case color
                        // alert('Text matched for color is ' + txtm)
                        dic_col = {'r':'red', 'b':'blue', 'y':'#ffe066', 'g':'#8cd98c', 'o':'orange', 'm':'#cc0066'}
                        var ttmm = txtm.slice(1,-4)
                        var col = txtm.slice(-2).trim()
                        //alert(col)
                        var nwstl =  $('<span/>').text(ttmm + ' ').css({'color':dic_col[col]})
                        interm = $('<div/>').append(nwstl)
                        var cc = new RegExp(tm[i], 'g')
                        var txt = txt.replace(cc, interm.html())
                        $(this).html(txt)
                    }
                } // end for (i in tm) i in text matched
              }  // end if tm
         }) // end each p, li
    } // end for (i in stl)
}

buc($("li")) // dealing with list
buc($("p"))  // dealing with p

//===================================================================== Folding videos

    /*
    Implements the possibility to fold videos in a list. Behaviour by default.
    */

    $('a').each(function(){            // modifying videos for permitting folded list mechanism.
            if ($(this).text().match(';;')){
                var tlist = $(this).text().split(';;')[0] +' ::'
                var underthis = $('<ul/>').append($('<li/>').append($(this).clone())) // put inside a list, inserted in ulvid
                var ulvid = $('<li/>').append(tlist).append(underthis) // <li> with text then clone
                $(this).parent().replaceWith(ulvid) // replace <a> with a <ul> containing <a>
             } // end if

             if ($(this).text().match('%%')){    // modifying local videos for permitting folded list mechanism.
                 var tlist = $(this).text().split('%%')[0] +' ::'
                 var underthis = $('<ul/>').append($('<li/>').append($(this).clone())) // put inside a list, inserted in ulvid
                 var ulvid = $('<li/>').append(tlist).append(underthis) // <li> with text then clone
                 $(this).parent().replaceWith(ulvid) // replace <a> with a <ul> containing <a>
              } // end if
        })

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

        if (event.keyCode == "m".charCodeAt(0)-32 && statekey == 1){   // Toggle TOC
            $('#toc').toggle()
          } // end if key code

          if (event.keyCode == "o".charCodeAt(0)-32 && statekey == 1){   // Toggle parameters information
              $('#params').toggle()
            } // end if key code

        if (event.keyCode == "s".charCodeAt(0)-32 && statekey == 1){   // Toggle syntax informations
            $('#syntax').toggle()
          } // end if key code

        if (event.keyCode == "n".charCodeAt(0)-32 && statekey == 1){   // Toggle Notes
            $('#notes').toggle()
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


        // if(event.keyCode == "q".charCodeAt(0)-32){  // "q" key for showing sliders
        //     $("a").each(function(){
        //           if ($(this).prop('id').match(/slider_\d*/)){
        //               $(this).toggle()
        //           } // end if
        //         }); // each
        //     } // end if key code

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
    var wpdf = '"' + param['pdf_width']['var'] + '"'
    var hpdf = '"' + param['pdf_height']['var'] + '"'
    var debend = { ',,' : {'color':'#ff0066'},
                   ';;' : {'deb' : '<iframe width='+'"' + param['vid_width']['var'] + '"' + 'height="315" src="', 'end' : '" frameborder="0" allowfullscreen></iframe>','color':'#cc99ff'},
                   '§§': {'deb' : '<object width='+ wpdf + ' height=' + hpdf + ' type="application/pdf" data="' , 'end' : '"></object>', 'color':'#ff6600'}}

//=====================================================================   No video

    /*
    Prevents the insertion of videos from the document parameters
    */

    $("p, li").each(function(){
        var textp = $(this).text()
         if (textp.match('§novideo')){
             $(this).hide()
             if (textp.trim() == '§novideo'){     // hides novideo
                sel = ['§§']                      // restricting the treatment to pdfs..
                $("a").each(function(){           // removing ;;
                    var texta = $(this).text()
                    if (texta.search(';;') != -1){
                        $(this).text(texta.replace(';;',''))
                               .css({'color': debend[';;']['color']}) // changes color for pdfs and videos
                        } // end if ==
                    }) // end a.each
            } // end if match
         }// end if novideo
    })  // end each

//===================================================================== No iframe
    /*
    Prevents the insertion of iframes from the document parameters
    */

    $("p, li").each(function(){
        var textp = $(this).text()
         var regnoifr = '§noiframe'
         if (textp.match(regnoifr)){
             $(this).hide()
             if (textp.trim() == regnoifr){  // hides novideo
                $("a").each(function(){ // removing ;;
                    var texta = $(this).text()
                    if (texta.search(',,') != -1){
                        $(this).text(texta.replace(',,',''))
                           .css({'color': debend[',,']['color']})
                        } // end if ==
                    }) // end a.each
            } // end if match
         }// end if noiframe
    })  // end each

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
                            .append(deb + self.attr('href')
                            .replace(patt[select][0], patt[select][1]) + end)) // make doc
        var text = self.text().replace(select,'')
        $('<a/>').text(text).append($('<a/>').append($('<span/>').text( " [-]").addClass(select)))
                 .insertBefore(self).css({'color':debend[select]['color']})
                 .attr('title', self.attr('title')) // Adding tooltip
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

//=====================================================================  Post it

    /*
    Insert draggable postits.
    */

    $("p").each(function(){ // POST'IT
             var html = $(this).html()
             var reg_post = /^\$post\s*/
             if (html.match(reg_post)){
                 var txt = html.split(reg_post)
                 var args = txt[1].trim().split(/\s+/)
                 var splhtml = html.split('$post')
                 var newtag = $('<div/>').html(splhtml[1])
                                         .addClass('postit')
                                         .draggable()
            dic_col = {'r':'red', 'b':'blue', 'y':'#ffe066', 'g':'#b3ffb3', 'o':'orange', 'm':'#cc0066'}
            // #b3ffb3
            // green #c2f0c2', '#c6ffb3'

            var arg = args.slice(-1)[0]
            // alert(arg.match(/c.$/))
            if (arg.match(/c.$/)){
                //alert(splitarg)
                var col = arg.slice(-1)[0]
                newtag.css({'background-color': dic_col[col]}) // modify the color
                var newhtm = newtag.html().replace('c'+col, '')
                // alert(newhtm)
                newtag.html(newhtm)
            }


                 $(this).replaceWith(newtag)
                }// end if
        })

//=====================================================================  Plot

    /*
    Insert a plot made with d3.js from given parameters.
    */

    $("p").each(function(){ // detect plot and apply plot function..
         var text = $(this).text()
         if (text.match(/^\$plot\s*/)){
                 var txt = text.split(/\s+/)
                 var id = txt[1].trim()
                 var addr = txt[2].trim()
                 var xmin = parseFloat(txt[3]); var xmax = parseFloat(txt[4])
                 var ymin = parseFloat(txt[5]); var ymax = parseFloat(txt[6])
                 var title = txt[7].trim()
                 var xlabel = txt[8].trim()
                 var ylabel = txt[9].trim()
                 var col = txt[10].trim()
                 var newtag = $('<div/>').attr('id',id).attr('class','chart') //.draggable()
                 $(this).replaceWith(newtag)
                params = { "xlim": [xmin, xmax], "ylim": [ymin, ymax], "title": title,
                    "xlabel": xlabel, "ylabel": ylabel, "color": col, "fill":"#ffffff"}
                //alert(params.xlim + ' ' + params.ylim + ' ' + params.title)
                plot(id, addr, 'nolink',  params)
            }// end if
        })// end each

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

   //=====================================================================   Youtube

 $(".youtube").each(function() { // take the youtube class element and replace..
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
         div.attr('id', "youtube_"+this.id)
         //div.draggable()
         // Replace the YouTube thumbnail with YouTube HTML5 Player
         $(this).replaceWith(div.append(iframe));
         $("#youtube_"+this.id).draggable() // make the video draggable
     }); // delegate

 }); // youtube each


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
    Esc + l, toggle all lists, open and close
    */

    if((event.keyCode == "l".charCodeAt(0)-32) && statekey == 1){
                $('a > span').each(function(){

                  //if ($(this).parent().next().css('display') == 'block'){

                    if ($(this).parents('div').last().attr('id') != 'toc'){
                      $(this).trigger('click') // close lists.
                      } // if not toc

                  // } // if display == block 

               }) // end a > span each(function(), 
           } // end if key code l
     }) // end keydown (end of all keys functions)

//=====================================================================

    /*
    pdf
    */

     $("a").each(function(){                             // insert pdf from folder
         var txt = $(this).text()
         if (txt.match(reg_folder)){                     // check <<
            var txt_short = txt.split('<<')[0].trim()    // take the title
            var jsoname = 'json/' + txt_short + ".json"  // make the address for the json
            $(this).text(txt_short)                      // remove << in the title
            // alert(jsoname)
            pdf_folder = $('<div/>')                    // make a div for inserting the pdfs
            pdf_folder.insertAfter($(this))             // insert the div after the initial element.
            $.getJSON(jsoname, function(result){
                for (i in result){                      // for each address in the json..
                    // alert(result[i])
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

    //===================================================================== parameters

    // Parameters for the document

    $('body').prepend($('<div/>').addClass('params').attr('id',"params"))
    $('#params').html(simple_md(toc_params)).toggle()
    $('#params').draggable()

    //===================================================================== syntax

    // Syntax for producing a document

    $('body').prepend($('<div/>').addClass('syntax').attr('id',"syntax"))
    $('#syntax').html(simple_md(help)).toggle()
    $('#syntax').draggable()

    //===================================================================== Notes

    // Taking Notes

    $('body').prepend($('<div/>').addClass('notes').attr('id',"notes"))
    $('#notes').html('<textarea class="form-control" name="textarea" id="tar" rows="15"></textarea>') 

    //$('#notes').draggable()

    //===================================================================== keys

    /*
     Keys shortcuts
     div containing all the shortcuts
    */

    $('body').prepend($('<div/>').addClass('keys').attr('id',"keys"))
    $('#keys').html(simple_md(keys))
    $('#keys').draggable()

    //===================================================================== Insert molecules

    /*
    Insert molecules for dynamic view of pdb files with D3mol.js
    pdbs can be load on the database or locally.
    It is possible to add visualisation options like the kind of representation (stick, cartoon etc.. )
    */
        var dic_style = {}

        $("p").each(function(){ // detect plot and apply plot function..
         var text = $(this).text()
         if (text.match(/^\$pdb\s*/)){
            var txt = text.split(/^\$pdb/)
            var args = txt[1].trim().split(/\s+/)
            //alert(args)
            var name_pdb = args[0]

            for (i in args){
                if (i != 0){
                    var splitarg = args[i].split(/\:/)
                    if (splitarg[0].match('ch')){
                        //alert(splitarg)
                        dic_style['data-select'+i] = 'chain:'+splitarg[0].slice(-1)
                        dic_style['data-style'+i]= splitarg[1]
                        //alert(dic_style['data-select'+i])
                    }
                } //
            }

            //-----------

            var shiftleft = parseInt($('#content').css('width').slice(0,-2))/4
            // alert(shiftleft)
            var divpdbout = $('<div/>').addClass('3D')
            var divpdb = $('<div/>').css({'left': shiftleft+'px','height':'400px','width':'400px', 'position': 'relative'})

            //-----------
            if (name_pdb.match(/\.pdb/)){
                // alert(name_pdb.trim())
                divpdb.attr('data-href',name_pdb.trim())
            }
            else {divpdb.attr('data-pdb',name_pdb.trim())}
            divpdb.attr('data-style','stick')
                  .attr('data-backgroundcolor','0xffffff')
                  .addClass('viewer_3Dmoljs')

            $.each(dic_style, function(key, value) {
                  // alert(key + '_' + value)
                  divpdb.attr(key, value)
                });

            //divpdbout.parent().css({'position':'relative'})
            divpdbout.append(divpdb)

            $(this).replaceWith(divpdbout);

            } // end if
        }) // end each

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

    //===================================================================== help

    var help = $('<div/>').addClass('help').attr('id',"help").text("help")
    $('body').prepend(help)
    $('#help').click(function(){$('#keys').toggle()})

    //===================================================================== showtoc

    var showtoc = $('<div/>').addClass('showtoc').attr('id',"showtoc").text("ToC")
    $('body').prepend(showtoc)
    $('#showtoc').click(function(){
        $('#toc').toggle()
        $('#showtoc').toggle()
    })
    $('#showtoc').toggle()

    //===================================================================== esc

    $('body').prepend($('<div/>').addClass('esc').attr('id',"esc"))
    $('#esc').toggle()

    //===================================================================== Show keys
    /*
    Click on the green square for showing the keys.
    */

    $('#esc').click(function(){
        $('#keys').toggle()
    })

     //    }  // end if all loads done
     // },25); // end  setInterval(function() {}, time )

}// end maketoc

/*=====================================================================
 ========================== End of maketoc =============================
===================================================================== */

registerKeyboardHandler = function(callback) {
  var callback = callback;
  d3.select(window).on("keydown", callback);
};



//=====================================================================  Sliders

    /*
    Sliders made with d3.js
    Possible to enter the size and direction (vertical, horizontal)
    */

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



//===================================================================== Nice scroller

    /*
    Fine and elegant scroller
    */

    $(document).ready(function () {
        $(window).scroll(fixTitle);
        $('[data-toggle="tooltip"]').tooltip(); // activates the tooltips
        $('.carousel').carousel({ interval: false }) // removing automatic carousel
        // Scroll
        lscrolls = ['syntax', 'toc', 'keys', 'carr', 'todotheme', 'params']
        for (i in lscrolls){
            Ps.initialize(document.querySelector('#'+lscrolls[i]))
        }

    });
