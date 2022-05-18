(function($){
    const cards = $('.card');
    console.log(cards);
    for(let i=1; i<=cards.length; i++){
        // $(`#sub-btn-${i}`).click(()=>{console.log("working on"+i)}); 
        
        $(`#sub-btn-${i}`).click( 
            function(){
                $(`#sub-popup-${i}`).removeClass('inactive-popup').addClass('active-popup');
            }
        );
        $(`#sub-close-popup-${i}`).click( 
            function(){
                $(`#sub-popup-${i}`).removeClass('active-popup').addClass('inactive-popup');
            }
        );
    }
})(jQuery);