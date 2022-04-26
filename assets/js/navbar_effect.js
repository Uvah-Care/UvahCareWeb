(function($) {

	// Navbar
		var $navbar = $('body.landing #header');
		$(window).scroll(function (event) {
			var scroll = $(window).scrollTop();
			if(scroll<=80){
				$navbar.css({
					
					"background": "-webkit-gradient(linear, 50% 0%, -30% 100%, from(rgb(0 0 0 / 0%)), to(rgb(245 254 255)))", 
					// "background-color":"transparent",
					"color": "aliceblue"
				});
			}
			else{
				$navbar.css({
					"background-color":"",
					"color":""
				});
			}
		});

})(jQuery);