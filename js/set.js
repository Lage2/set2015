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


function updateAnchors(){
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
                    console.log("Scrolling for "+targetOffset);
                    $(this).click(function() {
                        $("#nav li a").removeClass("active");
                        $(this).addClass('active');
                        $('html, body').animate({scrollTop: targetOffset}, 1000);
                        return false;
                    });
                }
        }
    });
}


/*********************************************************
 * Document (Main Function)
 *********************************************************/

$(document).ready(function(){

    console.log("Document is Ready...");


    /* The following code is executed once the DOM is loaded
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
                    console.log("Scrolling for "+targetOffset);
                    $(this).click(function() {
                        $("#nav li a").removeClass("active");
                        $(this).addClass('active');
                        $('html, body').animate({scrollTop: targetOffset}, 1000);
                        return false;
                    });
                }
        }
    });
    */
    var root =  $('html,body');
    $('li a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        var href = $.attr(this, 'href');
        root.animate({
          scrollTop: target.offset().top - $('#navigation-bar').height()
        }, 1000, function(){window.location.hash = href;});
        
        return false;
      }
    }
    });

    $('.nav.nav-bar li').on('click', function(){
        alert();
    });
    

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
    $("img.lazy").lazyload({
        threshold : 250
    });
    
});



