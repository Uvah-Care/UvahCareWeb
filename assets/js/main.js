(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '821px',   '980px'  ],
			small:    [ '481px',   '820px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');

	// Scrolly links.
		$('.scrolly').scrolly({
			speed: 2000
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right',
			hideDelay: 350
		});

	// Nav.

		// Title Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"><i class="fa-solid fa-bars"></i></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Parallax.
	// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
		if (browser.name == 'ie'
		||	browser.mobile) {

			$.fn._parallax = function() {

				return $(this);

			};

		}
		else {

			$.fn._parallax = function() {

				$(this).each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						$this
							.css('background-position', 'center 0px');

						$window
							.on('scroll._parallax', function() {

								var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

								$this.css('background-position', 'center ' + (pos * -0.15) + 'px');

							});

					};

					off = function() {

						$this
							.css('background-position', '');

						$window
							.off('scroll._parallax');

					};

					breakpoints.on('<=medium', off);
					breakpoints.on('>medium', on);

				});

				return $(this);

			};

			$window
				.on('load resize', function() {
					$window.trigger('scroll');
				});

		}
	
	// Navbar
		// var $navbar = $('body.landing #header');
		// $(window).scroll(function (event) {
		// 	var scroll = $(window).scrollTop();
		// 	if(scroll<=80){
		// 		$navbar.css({
					
		// 			"background": "-webkit-gradient(linear, 50% 0%, -30% 100%, from(rgb(0 0 0 / 0%)), to(rgb(245 254 255)))", 
		// 			// "background-color":"transparent",
		// 			"color": "aliceblue"
		// 		});
		// 	}
		// 	else{
		// 		$navbar.css({
		// 			"background-color":"",
		// 			"color":""
		// 		});
		// 	}
		// });

	// Spotlights.
		var $spotlights = $('.spotlight');

		$spotlights
			._parallax()
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					var top, bottom, mode;

					// Use main <img>'s src as this spotlight's background.
						$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

					// Side-specific scrollex tweaks.
						if ($this.hasClass('top')) {

							mode = 'top';
							top = '-20%';
							bottom = 0;

						}
						else if ($this.hasClass('bottom')) {

							mode = 'bottom-only';
							top = 0;
							bottom = '20%';

						}
						else {

							mode = 'middle';
							top = 0;
							bottom = 0;

						}

					// Add scrollex.
						$this.scrollex({
							mode:		mode,
							top:		top,
							bottom:		bottom,
							initialize:	function(t) { $this.addClass('inactive'); },
							terminate:	function(t) { $this.removeClass('inactive'); },
							enter:		function(t) { $this.removeClass('inactive'); },

							// Uncomment line below to "rewind" when this spotlight scrolls out of view.

							//leave:	function(t) { $this.addClass('inactive'); },

						});

				};

				off = function() {

					// Clear spotlight's background.
						$this.css('background-image', '');

					// Remove scrollex.
						$this.unscrollex();

				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Wrappers.
		var $wrappers = $('.wrapper');

		$wrappers
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					$this.scrollex({
						top:		250,
						bottom:		0,
						initialize:	function(t) { $this.addClass('inactive'); },
						terminate:	function(t) { $this.removeClass('inactive'); },
						enter:		function(t) { $this.removeClass('inactive'); },

						// Uncomment line below to "rewind" when this wrapper scrolls out of view.
						//leave:	function(t) { $this.addClass('inactive'); },

					});

				};

				off = function() {
					$this.unscrollex();
				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	//experts carrousel
		var $experts = $('.experts');

		$experts
			.each(function(){
				var $this = $(this),
					on, off;

				on = function() {
					$this.html(`	
						<a href="#0" class="carnext car-control"> <i class="fa-solid fa-arrow-right-long"></i> </a>
						<a href="#0" class="carprev car-control"> <i class="fa-solid fa-arrow-left-long"></i> </a>
						<div class="car">
							<ul>
								<li>
									<div class="align-center">
										<span class="image round-avatar-image">
											<img src="/images/expert-2.png" alt="">
										</span>
										<h3>A</h3>
										<p><b>Experience:</b> +8 Years <br> <b>Specialization:</b> Fitness & Pregnancy Yoga <br> <b>Certification:</b> Morarji Desai National Institute of Yoga</p>
									</div>
								</li>
								<li>
									<div class="align-center">
										<span class="image round-avatar-image">
											<img src="/images/expert-2.png" alt="">
										</span>
										<h3>B</h3>
										<p><b>Experience:</b> +8 Years <br> <b>Specialization:</b> Fitness & Pregnancy Yoga <br> <b>Certification:</b> Morarji Desai National Institute of Yoga</p>
									</div>
								</li>
								<li>
									<div class="align-center">
										<span class="image round-avatar-image">
											<img src="/images/expert-2.png" alt="">
										</span>
										<h3>C</h3>
										<p><b>Experience:</b> +8 Years <br> <b>Specialization:</b> Fitness & Pregnancy Yoga <br> <b>Certification:</b> Morarji Desai National Institute of Yoga</p>
									</div>
								</li>
								<li>
									<div class="align-center">
										<span class="image round-avatar-image">
											<img src="/images/expert-2.png" alt="">
										</span>
										<h3>D</h3>
										<p><b>Experience:</b> +8 Years <br> <b>Specialization:</b> Fitness & Pregnancy Yoga <br> <b>Certification:</b> Morarji Desai National Institute of Yoga</p>
									</div>
								</li>
								<li>
									<div class="align-center">
										<span class="image round-avatar-image">
											<img src="/images/expert-2.png" alt="">
										</span>
										<h3>E</h3>
										<p><b>Experience:</b> +8 Years <br> <b>Specialization:</b> Fitness & Pregnancy Yoga <br> <b>Certification:</b> Morarji Desai National Institute of Yoga</p>
									</div>
								</li>
							</ul>
							<div class="slider_option">
								<Button class="btn">Autoplay</Button>
							</div>
						</div>
						<script>
							(function($){
								var slideCount =  $(".car ul li").length;
								var slideWidth =  $(".car ul li").width();
								var slideHeight =  $(".car ul li").height();
								var slideUlWidth =  slideCount * slideWidth;
								
								$(".car").css({"max-width":(3*slideWidth + 75), "height": slideHeight});
								$(".car ul").css({"width":(slideUlWidth+ 40*slideCount + 50), "margin-left": (- slideWidth - 60) });
								$(".car ul li:last-child").prependTo($(".car ul"));
								
								function carmoveLeft() {
									$(".car ul").stop().animate(
										{left: + slideWidth+40}
										,700
										,function() {
											$(".car ul li:last-child").prependTo($(".car ul"));
											$(".car ul").css("left","");
										}
									);
								}
								
								function carmoveRight() {
									$(".car ul").stop().animate(
										{left: - slideWidth-40}
										,700
										,function() {
											$(".car ul li:first-child").appendTo($(".car ul"));
											$(".car ul").css("left","");
										}
									);
								}
								
								$(".carnext").on("click",function(){
									carmoveRight();
								});
								
								$(".carprev").on("click",function(){
									carmoveLeft();
								});
								setInterval(function(){ 
									carmoveRight();
								}, 5000);
								//moves carossuel every 5 seconds
							})(jQuery);
						</script>
						`
					);
				}
				off = function() {
					$this.html( `<div class="row aln-center">
									<div class="col-4 col-5-medium col-12-small">
										<span class="image round-avatar-image">
											<img src="/images/expert-1.png" alt="">
										</span>
										<h3>Shalini Sharma</h3>
										<p><b>Experience:</b> +8 Years <br> <b>Specialization:</b> Fitness & Pregnancy Yoga <br> <b>Certification:</b> Morarji Desai National Institute of Yoga</p>
									</div>
									<div class="col-4 col-5-medium col-12-small">										
										<span class="image round-avatar-image">
											<img src="/images/expert-2.png" alt="">
										</span>
										<h3>Dr. Reena Arora</h3>
										<p><b>Experience:</b> +20 Years <br> <b>Specialization:</b> Ayurvedic Medicine <br> <b>Certification:</b> Morarji Desai National Institute of Yoga</p>
									</div>
									<div class="col-4 col-5-medium col-12-small">
										<span class="image round-avatar-image">
											<img src="./images/banner.jpg" alt="">
										</span>
										<h3>Cubilia cep lobortis</h3>
										<p><b>Experience:</b> +15 Years <br> <b>Specialization:</b> Lorem ipsum dolor  <br> <b>Certification:</b> Lorem ipsum dolor sit amet consectetur </p>
									</div>
								</div>`
					);
				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Banner.
		var $banner = $('#banner');

		$banner
			._parallax();

	// testimonials carrousel
		var $testimonials = $('.testimonials-carrousel');
		$testimonials
			.each(function(){
				var $this = $(this),
				slides_3, slides_2, slides_1;
				
				var slideCount =  $(".slider ul li").length;
				var slideWidth =  $(".slider ul li").width();
				var slideHeight =  $(".slider ul li").height();
				var slideUlWidth =  slideCount * slideWidth;

				slides_3 = function(){
					$(".slider").css({"max-width":(3*slideWidth + 75), "height": slideHeight});
					$(".slider ul").css({"width":slideUlWidth + (40*slideCount) + 50, "margin-left": (- slideWidth - 60) });
				}
				slides_2 = function(){
					$(".slider").css({"max-width":(2*slideWidth + 80), "height": slideHeight});
					$(".slider ul").css({"width":slideUlWidth + (40*slideCount) + 50, "margin-left": (- slideWidth - 60) });
				}
				slides_1 = function(){
					$(".slider").css({"max-width":(1*slideWidth + 44 ), "height": slideHeight});
					$(".slider ul").css({"width":slideUlWidth + (40*slideCount) + 50, "margin-left": (- slideWidth - 36) });	
				}
				$(".slider ul li:last-child").prependTo($(".slider ul"));
				
				breakpoints.on('>small', slides_2);
				breakpoints.on('<=small', slides_1);
				breakpoints.on('>medium', slides_3);

				function moveLeft() {
					$(".slider ul").stop().animate(
						{left: + slideWidth+40}
						,700
						,function() {
							$(".slider ul li:last-child").prependTo($(".slider ul"));
							$(".slider ul").css("left","");
						}
					);
				}
				
				function moveRight() {
					$(".slider ul").stop().animate(
						{left: - slideWidth-40}
						,700
						,function() {
							$(".slider ul li:first-child").appendTo($(".slider ul"));
							$(".slider ul").css("left","");
						}
					);
				}
				
				$(".next").on("click",function(){
					moveRight();
				});
				
				$(".prev").on("click",function(){
					moveLeft();
				});
				setInterval(function(){ 
					// moveRight();
				}, 5000);
				
			});


	//slider-2
		// 	var slideCount =  $(".car ul li").length;
		// 	var slideWidth =  $(".car ul li").width();
		// 	var slideHeight =  $(".car ul li").height();
		// 	var slideUlWidth =  slideCount * slideWidth;
			
		// 	$(".car").css({"max-width":(3*slideWidth + 75), "height": slideHeight});
		// 	$(".car ul").css({"width":(slideUlWidth+ 40*slideCount + 50), "margin-left": (- slideWidth - 60) });
		// 	$(".car ul li:last-child").prependTo($(".car ul"));
			
		// 	function carmoveLeft() {
		// 		$(".car ul").stop().animate(
		// 			{left: + slideWidth+40}
		// 			,700
		// 			,function() {
		// 				$(".car ul li:last-child").prependTo($(".car ul"));
		// 				$(".car ul").css("left","");
		// 			}
		// 		);
		// 	}
			
		// 	function carmoveRight() {
		// 		$(".car ul").stop().animate(
		// 			{left: - slideWidth-40}
		// 			,700
		// 			,function() {
		// 				$(".car ul li:first-child").appendTo($(".car ul"));
		// 				$(".car ul").css("left","");
		// 			}
		// 		);
		// 	}
			
		// 	$(".carnext").on("click",function(){
		// 		carmoveRight();
		// 	});
			
		// 	$(".carprev").on("click",function(){
		// 		carmoveLeft();
		// 	});
		// 	setInterval(function(){ 
		// 		carmoveRight();
		// 	}, 5000);
			//moves carossuel every 5 seconds	
})(jQuery);