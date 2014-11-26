$(document).ready(function(){
    /* The following code is executed once the DOM is loaded */

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
});