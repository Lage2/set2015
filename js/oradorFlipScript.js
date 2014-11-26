$(document).ready(function(){
    /* The following code is executed once the DOM is loaded */

    $('.oradorFlip').mouseenter(function(){


        // $(this) point to the clicked .oradorFlip element (caching it in elem for speed):

        var elem = $(this);

        // data('flipped') is a flag we set when we flip the element:

        
        if(elem.data('flipped')){}
        else
        {
            elem.stop(true,true).fadeTo(1500, 0.2);
            elem.siblings('.oradorData').slideToggle(1500);
            elem.data("flipped",true);
        }

            // Setting the flag:
        
        });

    $('.oradorFlip').mouseleave(function(){
        var elem = $(this);

            if(elem.data('flipped')){
                elem.stop(true,true).fadeTo(1000, 1.0);
                elem.siblings('.oradorData').slideToggle(1000, function(){ var x = $(this); x.clearQueue(); });
                elem.data("flipped",false); 
            }
        });
});