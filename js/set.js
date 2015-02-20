var active_option = null;
var files;
var linkedinId;

var nav = { active_div : null, speakers : 1, sponsors: 2, map: 3, route: 4, organization: 5 };

var transportation = {
    active: 0,
    buttons : {
        train   : $('#train-option'),
        bus     : $('#bus-option'),
        taxi    : $('#taxi-option'),
        car     : $('#car-option')    
    }
    
}

function validation()
{
    
    var contactname=document.enq.name.value;
    var name_exp=/^[A-Za-z\s]+$/;
    if(contactname=='' || email=='')
    {
        console.log("FORM: não tem nome ou email");
        $(".error").hide(function(){$('#form-error').show();});
        document.enq.name.focus();
        return false;
    }


    var email=document.enq.email.value;
    //var email_exp=/^[A-Za-z0-9\.-_\$]+@[A-Za-z]+\.[a-z]{2,4}$/;
    var email_exp=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if(!email.match(email_exp))
    {
        console.log("FORM: formato do email não é suportado");
        $(".error").hide(function(){$('#form-error').show();});
        document.enq.email.focus();
        return false;
    }

    var phone=document.enq.phone.value;
    var phone_regex = /^\d{9}$/;
    if(phone!=='' && !phone.match(phone_regex) ){
        console.log("FORM: telefone errado \'"+phone+"\'");
        $(".error").hide(function(){$('#phone-error').show();});
        document.enq.email.focus();
        return false;   
    }

    $(".error").hide();

    return true;
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
	else
	{
		$('#'+active_option).fadeOut("fast");
		active_option = null;
	}
}




/*********************************************************
 * Curriculum
 *********************************************************/
// Grab the files and set them to our variable
function prepareFile(event)
{
    
    files = event.target.files;

    console.log("prepareFile "+files[0].name);

    $('#filename').empty();
    $('#filename').append(files[0].name);
}

function fakeClick(event){
    console.log("fakeClicking...")
    $('#curriculum').click();
    
}

/**
 *
 */
function clearCurriculumInfo(event){
    console.log('Clearing curriculum information...');
    
    files = null;
    $('#filename').empty();
    $('#linkedinId').val('');
}

function uploadFile(event){

    console.log("uploadFile");
    event.stopPropagation();
    event.preventDefault();


    var data = new FormData();
    var file_count = 0;

    linkedinId = $('#linkedinId').val();


    if(linkedinId != ""){
        console.log("LinkedIn ID is "+linkedinId);
        var tokens = linkedinId.split('&');
        data.append("linkedinId", tokens[0]);
    }else
        console.log("No LinkedIn ID specified");

    //Ficheiros são adicionados à FormData  
    if(files === undefined)
        console.log("No curriculum was uploaded");
    else
        $.each(files, function(key, value)
        {
            console.log("Submiting "+key+" "+value);
            data.append(key, value);
            file_count++;
        });

    console.log(file_count+" files being sent");
    
    $.ajax({
        url: './resources/curriculum/submit.php?files',
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

                clearCurriculumInfo();

                $('#success').css('display','inline-block');
                $('#success').show().delay(5000).fadeOut();

                submitForm(event, data);   
            }
            else
            {
                // Handle errors here
                console.log('ERRORS2: ' + data.error + " - "+data+"; mime="+data.mime+"; Error code="+data.error_code);

                $('#error-msg').empty();

                switch(data.error_code){
                    case 0: 
                        //$('#error-msg').append(decodeURIComponent(escape("Por favor envia o teu currículo como um PDF.")));
                        $('#error-msg').append("Por favor envia o teu currículo como um PDF.");
                        break;
                    case 1:
                        //$('#error-msg').append(decodeURIComponent(escape("O teu currículo é demasiado grande, envia um currículo até 12MB.")));
                        $('#error-msg').append("O teu currículo é demasiado grande, envia um currículo até 12MB.");
                        break;
                    case 2:
                        //$('#error-msg').append(decodeURIComponent(escape("O teu currículo é demasiado pequeno, envia um currículo com pelo menos 64kB.")));
                        $('#error-msg').append("O teu currículo é demasiado pequeno, envia um currículo com pelo menos 64kB.");
                        break;
                    case 3:
                        //$('#error-msg').append(decodeURIComponent(escape("Este currículo já foi submetido, por favor introduz outro currículo.")));
                        $('#error-msg').append("Este currículo já foi submetido, por favor introduz outro currículo.");
                        break;
                }

                $('#error').css('display','inline-block');
                $('#error').show().delay(5000).fadeOut();
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
        url: './resources/curriculum/submit.php',
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

/*
function lazyload(){
   var wt = $(window).scrollTop();    //* top of the window
   var wb = wt + $(window).height();  //* bottom of the window

   $(".lazy").each(function(){
      var ot = $(this).offset().top - 150;  //* top of object 
      var ob = ot + $(this).height(); //* bottom of object

      if(!$(this).attr("loaded") && wt<=ob && wb >= ot){
         
         $(this).attr("loaded",true);
         $(this).fadeIn(50000).attr("loaded",true);

         console.log("Lazy loading "+$(this).attr('id'));
      }
   });
}
*/

/*********************************************************
 * Document (Main Function)
 *********************************************************/

$(document).ready(function(){

    console.log("Document is Ready...");

    /* Submissão de currículos */
    $('input[type=file]').on('change', prepareFile);
    $('#file-input').on('click', fakeClick);
    $('#submit').on('click', uploadFile);
    $('#clear').on('click', clearCurriculumInfo);

    /* The following code is executed once the DOM is loaded */
    $('a[href*=#]').each(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
            && location.hostname == this.hostname
            && this.hash.replace(/#/,'')
            && this.hash != "#jumbo-carousel" 
            && this.hash != "#job-board-carousel") {
                var $targetId = $(this.hash),
                $targetAnchor = $('[name=' + this.hash.slice(1) +']');
                var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;
            
                if ($target) {
                    var targetOffset = $target.offset().top - $('#navigation-bar').height();
                    
                    $(this).click(function() {
                        $("#nav li a").removeClass("active");
                        $(this).addClass('active');
                        $('html, body').animate({scrollTop: targetOffset}, 1000);
                        return false;
                    });
                }
        }
    }); 
    
    /*
    i18n.init(function(t) {
        // translate nav
        $(".nav").i18n();

        // programatical access
        var appName = t("app.name");
    });    
    */


    $('.oradorTrigger').mouseenter(function(){


        // $(this) point to the clicked .oradorFlip element (caching it in elem for speed):

        var elem = $(this);

        // data('flipped') is a flag we set when we flip the element:

        
        if(elem.data('flipped')){}
        else
        {
            elem.siblings('.oradorData').stop(true,true).slideToggle("slow");
            elem.data("flipped",true);
        }

            // Setting the flag:
        
        });

    $('.oradorTrigger').mouseleave(function(){
        var elem = $(this);

            if(elem.data('flipped')){
                elem.siblings('.oradorData').stop(true,true).slideToggle(1000);
                elem.data("flipped",false); 
            }
        });

    /************************************************************************************
     * 00 - Countdown                                                                *
     ************************************************************************************
     var timespan = countdown(new Date(2015, 03, 2), null, countdown.DAYS);
     console.log("time "+timespan.days);

     $('#days').append(timespan.days);
     */

    /************************************************************************************
     * 01 - Formulário de Participação das Empresas
     ************************************************************************************/
    $('#submitButton').click(function(){
        console.log("sending mail");

        
        var sendto = "set@lage2.tecnico.ulisboa.pt";
        var company = $('#company-name').val();
        var phone   = $('#company-phone').val();
        var email   = $('#company-email').val();

        console.log("\'"+company+"\'")
        if(validation()){
                var body_pt = "Nós na empresa "+company+" estamos interessados em ficar a conhecer melhor o vosso evento.<br>"+
                "Gostariamos assim de entrar em contacto convosco.<br><br>"+
                "Email:\t"+email+"<br>"+
                "Telefone:\t"+phone+"<br>";
                $('#form-error').hide();

                window.open('mailto:'+sendto+'?subject='+company+' como parceiros da SET'+'&body='+body_pt);
        }
            
        

    });


    /************************************************************************************
     * 03 - Modos de Deslocação                                                         *
     ************************************************************************************/
    

    function fade(fadein, fadeout)
    {
        var div = document.getElementById(fadein);
        var container = document.getElementById(fadeout);
        
        for(var i =0; i<container.children.length; i++)
        {
            $('#'+container.children[i].id).fadeOut();
        }
        
        $('#'+fadein).fadeIn('slow');
        
    }


    /************************************************************************************
     * 04 - Redes Sociais
     ************************************************************************************/
    //Altura da div 'speakers-container'
    $('#social-media').hide();
    
    var speakers_threshold = $('#speakers-container').offset();
    var main_threshold = $('#jumbo-carousel').offset().top;
    
    //var social_media_threshold = $('#speakers-container').offset().top - ($('#jumbo-carousel').height()/2);
    var social_media_threshold = main_threshold;

    $(window).scroll(function(){
        if($(window).scrollTop() >= 1)
            $('#social-media').show("slow");
        else
            $('#social-media').hide("slow");

        /* Mudar a cor da opcao na nav bar quando a janela se encontra nessa div
        if($(window).scrollTop() >= speakers_threshold.top && nav.active_option != nav.speakers){
            nav.active_option = nav.speakers;
            $('#nav-speakers').css('color', 'orange');
        }
        */

    });

    /************************************************************************************
     * 05 - Lazy Load
     ************************************************************************************/
    
});



