var maketoc = function(){
    for(var i = 0, elems = document.getElementsByTagName('h1'); i < elems.length; i++) {
        var date = elems[i].innerHTML;
        elems[i].id = date;
        var datehref = '#'+date.trim()
        $('#toc').append($('<a/>').attr('href', datehref).html(date))
        $('#toc').append($('<br/>'))
   
    }
}