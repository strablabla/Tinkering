var maketoc = function(){
	$("#toc > h2").css({
    marginLeft:'12px'
});
    for(var i = 0,	elems = $(":header"); i < elems.length; i++) {
    		var nameh1 = elems[i].innerHTML.trim();
    		//alert(nameh1);
	        elems[i].id = nameh1;
	        var nameh1href = '#'+nameh1;
	        if($('[id='+'"'+nameh1+'"'+']').prop("tagName") == 'H2'){
	        	$('#toc').append($('<a/>')
	        	.attr('href', nameh1href)
	        	.css({'color': 'black', 'padding':'30px'})
	        	.html(nameh1))
	        	}
	        else{
	        $('#toc').append($('<a/>')
	        	.attr('href', nameh1href)
	        	.html(nameh1))
	        }
	        $('#toc').append($('<br/>')); // go to new line
    } // end for elems
}