//indlude jquery required

//GLOBAL Variable
active_option = null;

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
	
	if(active_option != fadein){

		if(active_option != null){
			$('#'+active_option).fadeOut("fast", function(){
				$('#'+fadein).fadeIn('slow');
				active_option = fadein;				
			});
		}else{
			$('#'+fadein).fadeIn('slow');
			active_option = fadein;		
		}

	}

	/*
	for(var i =0; i<container.children.length; i++)
	{
		$('#'+container.children[i].id).fadeOut("fast");
		
	}
	
	$('#'+fadein).fadeIn('fast');
	active_option = fadein;
	*/
	
}

function change_src(id, src)
{
	alert("change_src");
	document.getElementById(id).src = src;			
}