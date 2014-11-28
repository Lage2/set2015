//indlude jquery required

function sinple_fade_inout(fadein)
{
	var element = document.getElementById(fadein);
	
	if(element.style.display == 'none' || element.style.display == '')
		$('#'+fadein).fadeIn('fast');
	else
		$('#'+fadein).fadeOut('fast');
	
}	

function fade(fadein, fadeout)
{
	var div = document.getElementById(fadein);
	var container = document.getElementById(fadeout);
	
	for(var i =0; i<container.children.length; i++)
	{
		$('#'+container.children[i].id).fadeOut("fast");
	}
	
	$('#'+fadein).fadeIn('fast');
	
	
}

function change_src(id, src)
{
	document.getElementById(id).src = src;			
}