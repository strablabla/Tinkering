var maketoc = function(){
    
    var reg_free = /\d{1,2}\/\d{1,2}\/\d{2}/; //find dates whatever is its position with regexp

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
    var ul1 = $("<ul/>"); // first levels with class
    $('#toc').append(ul1);

    for(var i = 0,  elems = $(":header"); i < elems.length; i++) {
            var nameh = elems[i].innerHTML.trim();
            elems[i].id = nameh; 

            if($('[id=' + '"' + nameh + '"'+']').prop("tagName") == 'H1')
                {                        // if H1
                var nameh1 = nameh
                var li1 = $("<li/>");
                ul1.append(li1);
                var ul2 = $("<ul/>").addClass('lev1'); // second levels with class
                li1.append(  
                    $('<a/>')
                    .attr('href', namehhref) // add ref to id done just before
                    .css({'color': 'black'})
                    .html(nameh)
                    .append($('<span/>').text(" [-]").addClass('li_h2')) // button for H1
                    ) // en append ul
                li1.append(ul2);
            } // end if H1

            else if($('[id=' + '"' + nameh + '"'+']').prop("tagName") == 'H2')
                {
                elems[i].id = nameh1 +'_'+ nameh; // makes an id for H2
                var nameh2 = elems[i].id
                var namehhref = '#'+nameh2;
                var li2 = $("<li/>");
                ul2.append(li2);
                var ul3 = $("<ul/>").addClass('lev2'); 
                li2.append(  
                    $('<a/>')
                    .attr('href', namehhref) // adds ref to id done just before
                    .html(nameh)
                    .append($('<span/>').text(" [-]").addClass('li_h3')) // button for H2
                    ) // end of li
                    .css({'list-style': 'square inside','line-height': '20px'}) // end append li2
                li2.append(ul3)
                } // end else if H2

            else if($('[id=' + '"' + nameh + '"'+']').prop("tagName") == 'H3')
                {
                elems[i].id = nameh2 +'_'+ nameh; // makes an id for H3
                var nameh3 = elems[i].id
                var namehhref = '#'+nameh3;
                var li3 = $("<li/>");
                ul3.append(li3);
                //var ul4 = $("<ul/>").addClass('lev3'); 
                li3.append(  
                    $('<a/>')
                    .attr('href', namehhref) // adds ref to id done just before
                    .html(nameh)
                    .addClass(nameh)
                    ) // end of li
                    .css({'list-style': 'circle inside','line-height': '20px'}) // end append li3
                } // end else if H3

    } // end for elems
    
    $('ul.lev1').toggle();                  // 
    $('ul.lev2').toggle();                  // 

    $("a").click(function (evt) {           // toggle for H1
        if(evt.target.className == 'li_h1') 
            $(this).next().toggle();
        else if(evt.target.className == 'li_h2') 
            $(this).next().toggle();
        else if(evt.target.className == 'li_h3') 
            $(this).next().toggle();
        });
 
}