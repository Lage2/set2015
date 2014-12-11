var active_option = null;

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
     * 02 - Leaflet Maps                                                                *
     ************************************************************************************/
    $('#company-submit').click(function(){
        console.log("TODO");
        alert("TODO: implementar algo");

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

    function change_src(id, src)
    {
        document.getElementById(id).src = src;          
    }

    /************************************************************************************
     * 04 - Redes Sociais
     ************************************************************************************/
    //Altura da div 'speakers-container'
    $('#social-media').hide();
    
    var social_media_threshold = $('#speakers-container').offset().top - ($('#jumbo-carousel').height()/2);

    $(window).scroll(function(){
        if($(window).scrollTop() >= social_media_threshold)
            $('#social-media').show("slow");
        else
            $('#social-media').hide("slow");
    });


});