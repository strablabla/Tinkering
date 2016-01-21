var maketoc = function(){
    
    var reg_free = /\d{1,2}\/\d{1,2}\/\d{2}/; //find dates whatever is its position.

    $("p").each(function() {  // Replacing dates with p in date with h2 and 
        if ($(this).html().match(reg_free)){
            $(this).replaceWith(function(){ 
                var h1prev = $(this).prev("h1").text()
                var dateh2 = $('<h2/>').text($(this).text())
                return dateh2; 
            }) // end replaceWith
        } // end if
    }); // end each

    $('#toc').append($('<a/>').append($('<span/>').text("[--]").addClass('li_h1')));
    var ul0 = $("<ul/>"); // first levels with class
    $('#toc').append(ul0);

    for(var i = 0,  elems = $(":header"); i < elems.length; i++) {
            var nameh = elems[i].innerHTML.trim();
            elems[i].id = nameh;
            if($('[id=' + '"' + nameh + '"'+']').prop("tagName") == 'H2')
                {
                elems[i].id = nameh1 +'_'+ nameh;
                var namehhref = '#'+elems[i].id;
                var li = $("<li/>");
                li.append(  // H1 tags
                    $('<a/>')
                    .attr('href', namehhref)
                    .html(nameh)
                    .addClass(nameh)
                    ) // end of li
                    .css({'list-style': 'square inside','line-height': '20px'}) // end append li
                ul.append(li)
                } // end if h2
            else{                        // if H1
                var nameh1 = nameh
                var li0 = $("<li/>");
                ul0.append(li0);
                var ul = $("<ul/>").addClass('lev2'); // second levels with class
                li0.append(  // H2 tags
                    $('<a/>')
                    .attr('href', namehhref)
                    .css({'color': 'black'})
                    .html(nameh)
                    .append($('<span/>').text("[-]").addClass('li_h2')) // 
                    ) // en append ul
                li0.append(ul);
            } // end else
    } // end for elems
    
    $('ul.lev2').toggle();                  // close all the  second levels
    $("a").click(function (evt) {           // toggle for second levels
        if(evt.target.className == 'li_h2') 
            $(this).next().toggle();
        });
    $("a").click(function (evt) {           // toggle for first levels
        if(evt.target.className == 'li_h1') 
            $(this).next().toggle();
        });

}