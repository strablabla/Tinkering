var maketoc = function(){

    $('#toc').append($('<a/>').append($('<span/>').text("[--]").addClass('li_h1')));
    var ul0 = $("<ul/>"); // first levels with class
    $('#toc').append(ul0);

    for(var i = 0,  elems = $(":header"); i < elems.length; i++) {
            var nameh1 = elems[i].innerHTML.trim();
            elems[i].id = nameh1;
            var nameh1href = '#'+nameh1;
            if($('[id=' + '"' + nameh1 + '"'+']').prop("tagName") == 'H2')
                {
                var li = $("<li/>");
                li.append(
                    $('<a/>')
                    .attr('href', nameh1href)
                    .html(nameh1)
                    .addClass(nameh1)
                    ) // end of li
                    .css({'list-style': 'square inside','line-height': '20px'}) // end append li
                ul.append(li)
                } // end if h2
            else{
                var li0 = $("<li/>");
                ul0.append(li0);
                var ul = $("<ul/>").addClass('lev2'); // second levels with class
                li0.append(
                    $('<a/>')
                    .attr('href', nameh1href)
                    .css({'color': 'black'})
                    .html(nameh1)
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