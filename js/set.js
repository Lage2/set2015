

$(document).ready(function(){
    /* The following code is executed once the DOM is loaded */
    $('a[href*=#]').each(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
            && location.hostname == this.hostname
            && this.hash.replace(/#/,'') ) {
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
     * 02 - Leaflet Maps                                                                *
     ************************************************************************************/
    // create a map in the "map" div, set the view to a given place and zoom
    var map = L.map('map', {scrollWheelZoom:false}).setView([38.7425995, -9.3019505], 13);
    

    // add an OpenStreetMap tile layer
    L.tileLayer(
        'http://{s}.tile.osm.org/{z}/{x}/{y}.png', 
        {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

    // add a marker in the given location, attach some popup content to it and open the popup
    L.marker([38.7425995, -9.3019505]).addTo(map)
        .openPopup();



    function sinple_fade_inout(fadein)
    {
        var element = document.getElementById(fadein);
        
        if(element.style.display == 'none' || element.style.display == '')
            $('#'+fadein).fadeIn('slow');
            
        else
            $('#'+fadein).fadeOut('slow');
        
    }   

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

});