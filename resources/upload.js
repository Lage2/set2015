var files;

// Grab the files and set them to our variable
function prepareUpload(event)
{
	console.log("prepareUpload");
	files = event.target.files;
}

function uploadFile(event){

	console.log("uploadFile");

	event.stopPropagation();
	event.preventDefault();

	//Ficheiros são adicionados à FormData
	var data = new FormData();
	$.each(files, function(key, value)
    {
    	console.log("Submiting "+key+" "+value);
        data.append(key, value);
    });

	
	$.ajax({
		url: 'submit.php?files',
		type: 'POST',
		data: data,
		cache: false,
		dataType: 'json',
		processData: false, // Don't process the files
		contentType: false, // Set content type to false as jQuery will tell the server its a query string request
		success: function(data, textStatus, jqXHR)
		{
		    if(typeof data.error === 'undefined')
		    {
		        // Success so call function to process the form
		        console.log('SUCCESS: '+data+"; mime="+data.mime);
		        submitForm(event, data);
		    }
		    else
		    {
		        // Handle errors here
		        console.log('ERRORS2: ' + data.error + " - "+data+"; mime="+data.mime);
		    }
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			// Handle errors here
			console.log('ERRORS: ' + textStatus);
			// STOP LOADING SPINNER
		}
	});
}

function submitForm(event, data)
{
  // Create a jQuery object from the form
    $form = $(event.target);

    // Serialize the form data
    var formData = $form.serialize();

    // You should sterilise the file names
    $.each(data.files, function(key, value)
    {
        formData = formData + '&filenames[]=' + value;
    });

    $.ajax({
        url: 'submit.php',
        type: 'POST',
        data: formData,
        cache: false,
        dataType: 'json',
        success: function(data, textStatus, jqXHR)
        {
            if(typeof data.error === 'undefined')
            {
                // Success so call function to process the form
                console.log('SUCCESS: ' + data.success);
            }
            else
            {
                // Handle errors here
                console.log('ERRORS: ' + data.error);
            }
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
            // Handle errors here
            console.log('ERRORS: ' + textStatus);
        },
        complete: function()
        {
            // STOP LOADING SPINNER
        }
    });
}

$(document).ready(function(){

	console.log("Document is ready...");

	$('input[type=file]').on('change', prepareUpload);
	$('form').on('submit', uploadFile);

});