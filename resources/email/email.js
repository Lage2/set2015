
function validateFields(){
	console.log("validateFields");

	console.log("Name:"+$('#name').val());
	console.log("Email:"+$('#email').val());
	console.log("Message: "+$('#message').val())
}

function sendEmail(){
	console.log("sendEmail");

	validateFields();

	$.post("email.php", $('form').serialize(), function(data){
		console.log(data);
	});
}


$(document).ready(function(){

	//$('form').on('submit', sendEmail);

});
