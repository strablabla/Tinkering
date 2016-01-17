// leave at least 2 line with only a star on it below, or doc generation fails
/**
 *
 *
 * Placeholder for custom user javascript
 * mainly to be overridden in profile/static/custom/custom.js
 * This will always be an empty file in Jupyter
 *
 * User could add any javascript in the `profile/static/custom/custom.js` file
 * (and should create it if it does not exist).
 * It will be executed by the ipython notebook at load time.
 *
 * Same thing with `profile/static/custom/custom.css` to inject custom css into the notebook.
 *
 * Example :
 *
 * Create a custom button in toolbar that execute `%qtconsole` in kernel
 * and hence open a qtconsole attached to the same kernel as the current notebook
 *
 *    $([Jupyter.events]).on('app_initialized.NotebookApp', function(){
 *        Jupyter.toolbar.add_buttons_group([
 *            {
 *                 'label'   : 'run qtconsole',
 *                 'icon'    : 'icon-terminal', // select your icon from http://fortawesome.github.io/Font-Awesome/icons
 *                 'callback': function () {
 *                     Jupyter.notebook.kernel.execute('%qtconsole')
 *                 }
 *            }
 *            // add more button here if needed.
 *            ]);
 *    });
 *
 * Example :
 *
 *  Use `jQuery.getScript(url [, success(script, textStatus, jqXHR)] );`
 *  to load custom script into the notebook.
 *
 *    // to load the metadata ui extension example.
 *    $.getScript('/static/notebook/js/celltoolbarpresets/example.js');
 *    // or
 *    // to load the metadata ui extension to control slideshow mode / reveal js for nbconvert
 *    $.getScript('/static/notebook/js/celltoolbarpresets/slideshow.js');
 *
 *
 * @module Jupyter
 * @namespace Jupyter
 * @class customjs
 * @static
 */

// LIVE_REVEAL START

// to prevent timeout
requirejs.config({
    waitSeconds: 60
});


define(['base/js/namespace'], function (Jupyter) {
  "use strict";
  /*
  Table of Contents (TOC) for Ipython Notebook. Makes the TOC for markdowns cells containing #, ## or a date.
  Permits also to toggle the sublinks associated to the double diese ##. 
  Text beginning with ## is a sublink of the preceding link indicated by #. Those sublinks are collapsable. 
  */
  
  var all_toc_elem = [];
  
    var create_toc_div = function () {                 // makes the html jQUery TOC
        var toc_wrapper = $('<div id="toc-wrapper"/>')
        .append(
            $("<div/>")
            .addClass("header")
            .text("Contents ")
            .click( function(){
                console.log(this);
                $('#toc').slideToggle();
                $('#toc-wrapper').toggleClass('closed');
                if ($('#toc-wrapper').hasClass('closed')){
                    $('#toc-wrapper .hide-btn').text('[+]');
                } else {
                    $('#toc-wrapper .hide-btn').text('[-]');
                }
                return false;
            }).append(
        $("<a/>")
        .attr("href", "#")
        .addClass("hide-btn")
        .text("[-]")
      )
    ).append(
        $("<div/>").attr("id", "toc")
    );
    $("body").append(toc_wrapper);
    };
  
    var nbturns = 0;
  
    var table_of_contents = function (threshold) {
    
        if (threshold === undefined) {
          threshold = 4;
        }
        this.cells = Jupyter.notebook.get_cells();
        var toc_wrapper = $("#toc-wrapper");
        if (toc_wrapper.length === 0) {
          create_toc_div();
        } 
    
    var reg_beg = /^\d{1,2}\/\d{1,2}\/\d{2}/; //find dates beginning a line
    var reg_free = /\d{1,2}\/\d{1,2}\/\d{2}/; //find dates whatever is its position.
    var reg_ref = />\d{1,2}\/\d{1,2}\/\d{2}</; //find dates whatever is its position.
    var reg_md1 = /^#\s*\w/           // Markdown 1
    var reg_md2 = /^##\s*\w/           // Markdown 2
    var reg_md1_id = /^#<\w/        // Markdown 1 with id
    var reg_md2_id = /^##<\w/       // Markdown 2 with id
    
    this.toc_clean_cell = function(text_cell){         
          /*
          For each cell, removes all the links associated to #, ## or a date and recreate the original text without hyperlinks.  
          */
          //alert('cleaning');
          var lines =  text_cell.split('\n');
          var newcell = '';
          var diesetoc = '';
          var diesetocpar = ''; // name of the parent
          var nbdieses = 0;
          var toc_elem = [];
          for (var i = 0, len = lines.length; i < len; i++)  //cleaning doc from references
                  {   
                  //alert('lines[i] '+lines[i]);
                  if (lines[i].match(reg_md1_id)){
                         diesetoc = lines[i].substr(1).split('>')[1].split('<')[0]
                         var newline = '# ' + diesetoc.trim();
                         } // end  if
                  else if (lines[i].match(reg_md2_id) ){                        // sudirectory
                     diesetoc = lines[i].substr(2).split('>')[1].split('<')[0];
                     var newline = '## ' + diesetoc.trim(); //
                     } // end  else if 
                  else if (lines[i].match(reg_beg) || lines[i].match(reg_ref)){                // dates
                         diesetoc = lines[i].match(reg_free);
                         var newline = diesetoc; //
                         //alert('in clean '+ newline);
                         } // end  else if 
                  else{var newline = lines[i]};
                 lines[i] = newline;
                 newline +='\n';
                 newcell += newline;
              }//end for
          //alert('set_text ' + newcell.trim());
          
          return newcell.trim()
          };  // end toc_clean_cell

    this.toc_cell_infos = function(text_cell){ 
        /*
         For each cell creates new lines according to markdowns values.
         And return list for handling the TOC construction.
        */
        //alert('toc_cell_infos');
        var lines =  text_cell.split('\n');
        var newcell = '';
        var diesetoc = '';
        var nbdieses = 0;
        var toc_elem = [];
        for (var i = 0, len = lines.length; i < len; i++) //reads lines of a cell
                {   
                //alert(lines[i]);
                var dieseone = lines[i].substr(1);
                var diesetwo = lines[i].substr(2);
                if (lines[i].match(reg_md1)){                    //#
                    var newline = '#<a id="' + dieseone.trim().split(' ').join('_') + '">' + dieseone + '</a>';
                    //alert(newline); .split(' ').join('')
                    diesetocpar = lines[i].substr(1); // registerig name of parent
                    //alert('first '+newline); .split(' ').join('_')
                    }  // end if
                else if (lines[i].match(reg_md2))
                    {                       // ##
                    var newline = '##<a class="links" id="' + diesetocpar.trim().split(' ').join('_') + '_' + diesetwo.trim().split(' ').join('_') + '">' + diesetwo + '</a>';
                    //alert('first passage '+ line[i]);
                    }  // end else if
                else if (lines[i].match(reg_beg) || lines[i].match(reg_ref)){       // date begins line or is between > and <
                    //alert(diesetocpar);
                    var lmatch = lines[i].match(reg_free);
                    //alert(diesetocpar + lmatch);
                        if (lines[i].match(reg_beg)){       // data begins the line
                            var newline = '<a id="'+ diesetocpar.trim().split(' ').join('_') + '_' +  lmatch + '">' + lmatch + '</a>'; // makes the id 
                            if (lines[i+1] != ''){newline +='\n'};
                            }
                        else{
                            var newline = lines[i]; // date is yet as an id
                        }
                        //alert('after toc_cell_infos : ' + newline);
                    }  // end else if
                else{var newline = lines[i]
                   }; // end else
                newline +='\n';
                newcell += newline;
               /*
               Keeping informations for making the TOC
               */
                if (lines[i].match(reg_md1_id)){        // case of existing link
                       diesetoc = lines[i].substr(1).split('>')[1].split('<')[0].trim().split(' ').join('_'); // if blanks, reduces with '_'
                       //diesetocpar = diesetoc;
                       nbdieses = 1;
                       toc_elem.push([diesetoc, nbdieses]); //
                       } // end  if
                else if (lines[i].match(reg_md2_id)){ // case of existing link,  sub paragraph
                   //alert('lines[i] ' + lines[i]);
                   var dd = lines[i].substr(2).split('>')[1].trim();
                   //alert(dd);
                   diesetoc = dd.split('<')[0];
                   nbdieses = 2;
                   //alert('diesetoc## '+diesetoc);
                   toc_elem.push([diesetoc, nbdieses]); //
                   //alert(toc_elem);
                   } // end  else if 
                else if (lines[i].match(reg_free)){              // dates
                    if  (lines[i][0] == '<') {  
                       diesetoc = lines[i].match(reg_free);
                       nbdieses = 3;
                       //alert(diesetocpar+diesetoc);
                       toc_elem.push([diesetoc, nbdieses]); //
                       } // end  if
                }; // end else if
            };  // end for
        cell.set_text(newcell.trim()); // set new cell with links
        
        return toc_elem;
        };  // end toc_cell_infos
                
    var ol = $("<ul/>");
    $("#toc").empty().append(ol);
    all_toc_elem = [];
    //alert('nbturns is '+nbturns);

    //this.clean_all_cells = function(cells){

	//};
    //alert('clean cells');
    if (nbturns == 0){  // clean only the first time
	for (var i=0; i < this.cells.length; i++) { // cleaning toc
           var cell = this.cells[i]; // get the ith cell
           if (cell.cell_type == 'markdown'){
             var cleaned = this.toc_clean_cell(cell.get_text()); // toc_elem contains informations on one cell
	     cell.set_text(cleaned); // set new cell with links
             }; // 
          }; //end for
       }// endif
          
    /*
    Beginning the TOC here
    */
    //alert('making toc');
    var diesetocpar = ''; // name of the parent
    for (var i=0; i < this.cells.length; i++) {               // Reads all cells
          var cell = this.cells[i];              // get the ith cell
          var toc_elem = [];        // new string for the toc
          if (cell.cell_type == 'markdown'){     // if cell is a markdown
              toc_elem = this.toc_cell_infos(cell.get_text()); // toc_elem contains the list of newtocs with associated nbdieses
              }; // if a markdown 'only one #' detected 
              //alert(toc_elem);
              for (var j=0; j < toc_elem.length; j++) { // makes clases for subdirectories
                    var newtoc = toc_elem[j][0]
                    var nbdieses = toc_elem[j][1];
                    //alert(newtoc); //
                    //alert(nbdieses); 
                    if (newtoc != '' & nbdieses == 1){    // if newtoc is not empty, (first pass)
                        var newtocpar = newtoc;
                        all_toc_elem.push(newtoc);              // Keeping the parents
                        var reference = '<a href = "#'+ newtoc +'">' + newtoc +'</a>'; // adds the reference to the cell
                        //alert(reference);
                        var newliclasschild = "<li class = "+ "'" + newtoc + "'" + ">" // class for children
                        var newliclassparent = "<li class = "+ "'" + 'p' + newtoc + "'" + ">" // class for parents
                        var newone = newliclassparent + newtoc +"</li>" 
                        ol.append($(newone));
                        }// end if newtoc
                    else if (newtoc != '' & ((nbdieses == 2) | (nbdieses == 3))){     
                        if (nbdieses != 3){newtoc = newtoc.trim().split(' ').join('_')} ;       
                        var reference = '<a href = "#' + newtocpar + '_' + newtoc + '">' + newtoc +'</a>'; // add the reference to the cell
                        //alert(reference);
                        var newdbl = "<ul>"+ newliclasschild + reference + "</ul></li>"
                        //alert(newdbl);
                        ol.append($(newdbl)); //</li></ul>
                      } // end else if newtoc
                 } // end for
        } // end for on cells
        /*
        Associates parents with toggle() function. Parent class is same as children with "p" at beginning.
        */
        for (var j=0; j < all_toc_elem.length; j++) {      
              var tocparent = ".p" + all_toc_elem[j]; // parent class is children class with "p" at beginning.
              $(tocparent).click(function() {
                  $('.' + this.className.slice(1)).toggle(); // Associates toggle() function to parent.
              }); 
          };
        /*
        Hides all the sublinks
        */
        for (var j=0; j < all_toc_elem.length; j++) {      
              var tocparent = ".p" + all_toc_elem[j];
              $(tocparent).each(function() {                //  reads all the children.
                  $('.'+this.className.slice(1)).hide(); // Hide each child of the parent. 
              }); 
          };
      /*
       Activate all the sublinks
       */
     //$('.links').click();
     
          
    nbturns +=1;
       
    $(window).resize(function(){
      $('#toc').css({maxHeight: $(window).height() - 200});
      });
    $(window).trigger('resize');
    //Jupyter.notebook.save_notebook();
  };
  
  ///////////
  var toggle_toc = function () {
    // toggle draw (first because of first-click behavior)
    $("#toc-wrapper").toggle();
    // recompute:
    table_of_contents();
  };

  var toc_button = function () {
    if (!Jupyter.toolbar) {
      $([Jupyter.events]).on("app_initialized.NotebookApp", toc_button);
      return;
    }
    if ($("#toc_button").length === 0) {
      Jupyter.toolbar.add_buttons_group([
        {
          'label'   : 'Table of Contents',
          'icon'    : 'icon-list',
          'callback': toggle_toc,
          'id'      : 'toc_button'
        },
      ]);
    }
  };

/////////////////////////

  var toggle_toc_sub = function () {
    for (var j=0; j < all_toc_elem.length; j++) {      
           var tocparent = ".p" + all_toc_elem[j];
           $(tocparent).each(function() {                //  reads all the children.
               //alert('.'+this.className.slice(1));
               $('.'+this.className.slice(1)).hide(); // Hide each child of the parent. 
                }); 
       };//end for
    // recompute:
    table_of_contents();
  };
  
  
  var toc_button_sub = function () {
    if (!Jupyter.toolbar) {
      $([Jupyter.events]).on("app_initialized.NotebookApp", toc_button_sub);
      return;
      }
   
      Jupyter.toolbar.add_buttons_group([
          {
          'label'   : 'hide TOC',
          'icon'    : 'icon-double-angle-up',
          'callback': toggle_toc_sub,
          'id'      : 'toc_button_sub'
          },
      ]);
   
  };

/////////////////////////

  var toggle_toc_rem = function () {
    //var cells = Jupyter.notebook.get_cells();
    var tab_cont = new table_of_contents();
    //alert('toc_rem');
    for (var i=0; i < tab_cont.cells.length; i++) { // cleaning toc
       var cell = tab_cont.cells[i]; // get the ith cell
       if (cell.cell_type == 'markdown'){
	 //alert(cell.get_text());
	 //if (cell.get_text()=='ooo'){cell.set_text('hiiiii')};
         var cleaned = tab_cont.toc_clean_cell(cell.get_text()); // 
	 cell.set_text(cleaned);
         }; // 
      }; //end for
  };
  
  var toc_button_rem = function () {

     if (!Jupyter.toolbar) {
      $([Jupyter.events]).on("app_initialized.NotebookApp", toc_button_rem);
      return;
      }
   
      Jupyter.toolbar.add_buttons_group([
          {
          'label'   : 'rem TOC',
          'icon'    : 'icon-home',
          'callback': toggle_toc_rem,
          'id'      : 'toc_button_rem'
          },
      ]);
   
  };

///////////////////

  var load_css = function () {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = require.toUrl("./toc.css");
    console.log(link);
    document.getElementsByTagName("head")[0].appendChild(link);
  };

  var load_ipython_extension = function () {
    load_css();
    toc_button();
    toc_button_sub();
    toc_button_rem();
    $([Jupyter.events]).on("notebook_loaded.Notebook", table_of_contents);
    console.log('Table of Contents extension loaded');
    
  };

  return {
    load_ipython_extension : load_ipython_extension,
    toggle_toc : toggle_toc,
    table_of_contents : table_of_contents,
  };
});


// LIVE_REVEAL END