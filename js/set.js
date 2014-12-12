var active_option = null;


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
}

$(document).ready(function(){

    console.log("Document is Ready...");

    /* The following code is executed once the DOM is loaded */
    $('a[href*=#]').each(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
            && location.hostname == this.hostname
            && this.hash.replace(/#/,'')
            && this.hash != "#jumbo-carousel" ) {
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
    

    i18n.init(function(t) {
        // translate nav
        $(".nav").i18n();

        // programatical access
        var appName = t("app.name");
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
     ************************************************************************************/
     var timespan = countdown(new Date(2015, 03, 2), null, countdown.DAYS);
     console.log("time "+timespan.days);

     $('#days').append(timespan.days);

    /************************************************************************************
     * 01 - Formulário de Participação das Empresas
     ************************************************************************************/
    $('#company-submit').click(function(){
        console.log("sending mail");

        
        var sendto = "set@lage2.tecnico.ulisboa.pt";
        var company = $('#company-name').val();
        var phone   = $('#company-phone').val();
        var email   = $('#company-email').val();

        console.log("\'"+company+"\'")
        if(company === '' || email === ''){
            $('#form-error').show("slow");
        }else{
            var body_pt = "Nós na empresa "+company+" estamos interessados em ficar a conhecer melhor o vosso evento.\r\n"+
                "Gostariamos assim de entrar em contacto convosco.\r\n\r\n"+
                "Email:\t"+email+"\r\n"+
                "Telefone:\t"+phone+"\r\n";
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


});