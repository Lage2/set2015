//indlude jquery required

//GLOBAL Variable
active_option = null;
dia_ativo = 2;

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


function show_dia(n)
{
	if(n != dia_ativo)
	{
		document.getElementById("dia_"+dia_ativo).className = "agenda-date";
		document.getElementById("dia_"+n).className = "agenda-date dia_selected";
		
		//$('#dia_container_'+dia_ativo).fadeOut("fast").css("display", "none");
		//$('#dia_container_'+n).fadeIn("fast").css("display", "table-cell");
		
		document.getElementById("dia_container_"+dia_ativo).className = "dia_container";
		document.getElementById("dia_container_"+n).className = "dia_container dia_container_selected";
		
		dia_ativo = n;
	}
}

