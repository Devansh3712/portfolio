// Detect IE
var browserIE = false;
if(whichBrs() == 'Internet Explorer') browserIE = true;

// Detect Mobile
var browserMobile = false;
if($('body').hasClass('layout-mobile')) browserMobile = true;

// Elements
var $wrapper = $('#wrapper'),
	$btnHeader = $('#header_btn-menu'),
	$header = $('#header'),
	$section = $('#section'),
	$footer = $('#footer'),
	$valign = $('.valign'),
	$fullHeight = $('.full-height'),
	$imgFit = $('.img-fit'),
	$toLoad = $('.to-load'),
	$parallax = $('.parallax'),
	$parallaxIcon = $('.parallax-icon');

var animRunning = false,
	currentScroll = -1,
	infiniteSliderSquares;

$('html,body').scrollTop(0);
$(window).load(function(){
	/* ////////////////////////////////////////
	//
	// General
	//
	/////////////////////////////////////// */

	// Anchor Buttons
	$('.btn-anchor').on('click', function(){
		if(!animRunning && !$(this).hasClass('active')){
			var $object = $(this);

			var anchor = $object.attr('data-anchor');
			var $target = $('#'+anchor);
			var scroll = Math.abs(currentScroll - $target.offset().top);
			var scrollVal = $target.offset().top;

			var scrollTime = scroll * 0.5;
			if(scrollTime < 1250) scrollTime = 1250;

			$('html,body').animate({scrollTop: scrollVal}, scrollTime, 'easeInOutQuad');
		}

		return false;
	});

	// Slider Squares
	$('#slider-container-squares').each(function(){
		if(whichBrs() == 'Safari' || browserMobile) $(this).addClass('t-scale');
		else $(this).addClass('t-translate');

		infiniteSliderSquares = new InfiniteSliderHome($(this),2000,6000,'css','easeOutQuad',false,true);
	});

	// Header
	$btnHeader.on('click', function(){
		$(this).addClass('hidden');
		$header.addClass('opened').fadeIn(450, function(){
			$('.card-container', this).removeClass('no-anim').addClass('loaded');
		});

		return false;
	});

	$header.on('click', function(event){
		if(event.target.tagName == 'HEADER'){
			$header.removeClass('opened').fadeOut(450, function(){
				$btnHeader.removeClass('hidden');
				$('.card-container', this).addClass('no-anim').removeClass('loaded');
			});
		}
	});

	/* ////////////////////////////////////////
	//
	// Home
	//
	/////////////////////////////////////// */

	// Slider Arrows in Header
	$('.card-container.home .btn-previous, .card-container.home .btn-next').on('click', function(){
		var object = $(this);
		var delay = 1;
		if(currentScroll > 0){
			delay = 750;
			$('html,body').animate({scrollTop: 0}, 750, 'easeInOutQuad');
		}

		setTimeout(function(){
			switch(object.attr('class')){
				case 'btn-previous':
					$('#slider-container-squares .slider-arrows .previous a').trigger('click');
				break;

				case 'btn-next':
					$('#slider-container-squares .slider-arrows .next a').trigger('click');
				break;
			}
		}, delay);

		return false;
	});

	// Init


	/* ////////////////////////////////////////
	//
	// Portfolio
	//
	/////////////////////////////////////// */

	$('#portfolio .card-container > div > div').each(function(){
		var fixWidth = $('h2', this).outerWidth() + $('h3', this).outerWidth() + 1;
		$(this).width(fixWidth);
	});

	/* ////////////////////////////////////////
	//
	// Gallery
	//
	/////////////////////////////////////// */

	// Change Image
	$('#slider-container-squares .card-container .btn-previous, #slider-container-squares .card-container .btn-next').on('click', function(){
		var object = $(this);

		switch(object.attr('class')){
			case 'btn-previous':
				$('#slider-container-squares .slider-arrows .previous a').trigger('click');
			break;

			case 'btn-next':
				$('#slider-container-squares .slider-arrows .next a').trigger('click');
			break;
		}

		return false;
	});

	// Open Menu
	$('#slider-container-squares .card-container .btn-menu a').on('click', function(){
		$('#header_btn-menu').trigger('click');

		return false;
	});

	// Open Infos
	$('#slider-container-squares .card-container .btn-infos a').on('click', function(){
		var container = $(this).parents('.card-container');

		if(!animRunning){
			animRunning = true;
			$(this).parent().fadeOut(450, function(){
				$('#slider-container-squares .card-container .btn-infos-close').fadeIn(450)
			});

			$('> div > div', container).width('auto');
			container.animate({width: 585}, 450, 'easeInOutQuad', function(){
				$('.infos', container).animate({height: $('.infos > .text', container).outerHeight()}, 550, 'easeInOutQuad', function(){
					animRunning = false;
				});
			});
		}

		return false;
	});

	// Close Infos
	$('#slider-container-squares .card-container .btn-infos-close a').on('click', function(){
		var container = $(this).parents('.card-container');

		if(!animRunning){
			animRunning = true;
			$(this).parent().fadeOut(450, function(){
				$('#slider-container-squares .card-container .btn-infos').fadeIn(450)
			});

			$('.infos', container).animate({height: 0}, 550, 'easeInOutQuad', function(){
				container.animate({width: 480}, 450, 'easeInOutQuad', function(){
					$('> div > div', container).width(432);
					animRunning = false;
				});
			});
		}

		return false;
	});

	/* ////////////////////////////////////////
	//
	// Tips
	//
	/////////////////////////////////////// */

	var slidersArray = [];
	$('#tips .slider-container').each(function(){
		if($('.slider > ul > li', this).length > 1){
			slidersArray.push(new InfiniteSlider($(this),1500,4000,'slide','easeInOutQuint',false,false));
		} else {
			$(this).addClass('disabled');
		}

		$('.slider > ul > li > div', this).on('click', function(){
			$(this).parents('.slider-container').find('.slider-arrows .next a').trigger('click');
		});
	});

	/* ////////////////////////////////////////
	//
	// Contact
	//
	/////////////////////////////////////// */

	// Init Maps
	$('#contact .map > div').each(function(){
		var latitude = parseFloat($(this).attr('data-latitude'));
		var longitude = parseFloat($(this).attr('data-longitude'));
		var mapID = $(this).attr('id');

		initializeMap(latitude, longitude, mapID);
	});

	/* ////////////////////////////////////////
	//
	// Init
	//
	/////////////////////////////////////// */

	positionContent();
	$('#loading-mask').fadeOut(750, function(){
		// Init Header
		setTimeout(function(){
			$btnHeader.addClass('loaded');
		}, 450);

		// Init Homepage
		$('#homepage').each(function(){
			setTimeout(function(){
				$('#block1 .card-container').addClass('loaded');
				setTimeout(function(){
					$('.btn-scroll-down').addClass('loaded');
					if(browserMobile) $('.to-load').addClass('loaded');
				}, 1500);
			}, 750);
		});

		// Init About
		$('#about').each(function(){
			$('#block1').addClass('active');
			$('#block1 .text-grid').addClass('visible');
			$('#block1 .text-grid .line').addClass('loaded');
			setTimeout(function(){
				$('.img').addClass('loaded');
			}, 250);
			setTimeout(function(){
				$('#block1 .card-container').addClass('loaded');
				setTimeout(function(){
					$('.btn-scroll-down').addClass('loaded');
					if(browserMobile) $('.to-load').addClass('loaded');
				}, 1500);
				if(window.location.hash != ''){
					var anchor = window.location.hash.replace('#','');
					var $target = $('#block'+anchor);
					var scroll = Math.abs(currentScroll - $target.offset().top);
					var scrollVal = $target.offset().top;

					var scrollTime = scroll * 0.5;
					if(scrollTime < 1250) scrollTime = 1250;

					$('html,body').animate({scrollTop: scrollVal}, scrollTime, 'easeInOutQuad');
				}
			}, 750);
		});

		// Init Services
		$('#services').each(function(){
			setTimeout(function(){
				$('#block1 .card-container').addClass('loaded');
				setTimeout(function(){
					$('.btn-scroll-down').addClass('loaded');
					if(browserMobile) $('.to-load').addClass('loaded');
				}, 1500);
			}, 750);
		});

		// Init Portfolio
		$('#portfolio').each(function(){
			setTimeout(function(){
				$('#block1 > .centered .framed-block').addClass('loaded');
				if(browserMobile) $('.to-load').addClass('loaded');
			}, 950);
		});

		// Init Gallery
		$('#gallery').each(function(){
			setTimeout(function(){
				$('#slider-container-squares .card-container').addClass('loaded');
				if(browserMobile) $('.to-load').addClass('loaded');
			}, 750);
		});

		// Init Contact
		$('#contact').each(function(){
			setTimeout(function(){
				$('#block1 > .centered .framed-block').addClass('loaded');
				if(browserMobile) $('.to-load').addClass('loaded');
			}, 950);
		});

		// Init Tips
		$('#tips').each(function(){
			setTimeout(function(){
				$('#block1 .bullet').addClass('loaded');
				setTimeout(function(){
					$('#block1 .sidebar .card-container').addClass('loaded');
					if(browserMobile) $('.to-load').addClass('loaded');
					if(window.location.hash != ''){
						var anchor = window.location.hash.replace('#','');
						var $target = $('#tips'+anchor);
						var scroll = Math.abs(currentScroll - $target.offset().top);
						var scrollVal = $target.offset().top;

						var scrollTime = scroll * 0.5;
						if(scrollTime < 1250) scrollTime = 1250;

						$('html,body').animate({scrollTop: scrollVal}, scrollTime, 'easeInOutQuad');
					}
				}, 100);
			}, 250);
		});
	});
});

/* ////////////////////////////////////////////////////////////////////////////
//
// Window Functions
//
/////////////////////////////////////////////////////////////////////////// */

$(window).resize(function(){
	positionContent();
});

$(window).scroll(function(){
	scrollContent();
});

/* ////////////////////////////////////////////////////////////////////////////
//
// Google Maps
//
/////////////////////////////////////////////////////////////////////////// */

function initializeMap(latitude, longitude, mapID) {
    var g = new google.maps.LatLng(latitude, longitude);
    var b = {
        zoom: 15,
        center: g,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
	    navigationControl: false,
	    mapTypeControl: false,
	    scaleControl: false,
        styles: [
		  {
		    "stylers": [
		      { "gamma": 2.49 },
		      { "lightness": -25 },
		      { "hue": "#ff9100" },
		      { "saturation": 10 }
		    ]
		  },{
		    "featureType": "water",
		    "stylers": [
		      { "saturation": -67 },
		      { "lightness": -7 }
		    ]
		  },{
		    "featureType": "road",
		    "stylers": [
		      { "saturation": -65 }
		    ]
		  },{
		    "featureType": "landscape",
		    "stylers": [
		      { "visibility": "simplified" }
		    ]
		  },{
		    "featureType": "poi",
		    "stylers": [
		      { "visibility": "simplified" },
		      { "saturation": -55 }
		    ]
		  },{
		    "featureType": "transit",
		    "stylers": [
		      { "visibility": "off" }
		    ]
		  },{
		    "featureType": "road.arterial",
		    "elementType": "geometry",
		    "stylers": [
		      { "lightness": 8 },
		      { "hue": "#ffa200" },
		      { "saturation": 30 }
		    ]
		  },{
		    "featureType": "poi.business",
		    "elementType": "geometry",
		    "stylers": [
		      { "visibility": "off" }
		    ]
		  },{
		    "featureType": "poi.park",
		    "stylers": [
		      { "visibility": "simplified" },
		      { "saturation": 6 },
		      { "lightness": -11 }
		    ]
		  },{
		    "featureType": "road",
		    "elementType": "labels",
		    "stylers": [
		      { "visibility": "on" },
		      { "lightness": 15 },
		      { "saturation": 17 }
		    ]
		  },{
		    "featureType": "poi.school",
		    "stylers": [
		      { "visibility": "off" }
		    ]
		  },{
		    "featureType": "road.local",
		    "stylers": [
		      { "saturation": 24 },
		      { "lightness": -6 }
		    ]
		  }
		]
    };
    var d = new google.maps.Map(document.getElementById(mapID), b);
    var image = new google.maps.MarkerImage('images/layout/contact_map-pin.png',
        // This marker is 20 pixels wide by 32 pixels tall.
        new google.maps.Size(47, 93),
        // The origin for this image is 0,0.
        new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at 0,32.
        new google.maps.Point(23, 46));

	var marker = new google.maps.Marker({
	  position: new google.maps.LatLng(latitude,longitude),
	  map: d,
	  icon: image
	});

	google.maps.event.addDomListener(window, 'resize', function() {
	  var position = new google.maps.LatLng(latitude,longitude);
	  d.setCenter(position);
	});
}

/* ////////////////////////////////////////////////////////////////////////////
//
// Position Content
//
/////////////////////////////////////////////////////////////////////////// */

function positionContent(){
	// Full Height
	$fullHeight.height($(window).height());
	$('.divided-block').each(function(){
		$('.centered > div', this).css('min-height', $(window).height());
	});

	// Centered Vertically
	$valign.each(function(){
		$(this).css('padding-top', ($(this).parent().height()/2 - $(this).height()/2));
	});

	// Fit Images
	$imgFit.each(function(){
		var bg_main = $(this);
		var wrapper = $(this).parent();
		var wrapperWidth = wrapper.width();
		if($(this).parents('.section-header').length == 0 && wrapperWidth < 1920) wrapperWidth = 1920;
		var wrapperHeight = wrapper.height();

		var bgMainSizes = $(this).attr('data-size').split('|');
		var bgMainRatio = bgMainSizes[0]/bgMainSizes[1];
		var wrapperRatio = wrapperWidth/wrapperHeight;

		if(bgMainRatio > wrapperRatio){
			bg_main
				.height(wrapperHeight)
				.width(wrapperHeight * bgMainRatio)
				.css('left',(wrapperWidth/2 - (wrapperHeight * bgMainRatio)/2));
				//.css('top','0');
		} else {
			bg_main
				.width(wrapperWidth)
				.height(wrapperWidth / bgMainRatio)
				.css('left','0');
				//.css('top',(wrapperHeight/2 - (wrapperWidth / bgMainRatio)/2));
		}
	});

	// Adjust Text Grids
	$('.text-grid').each(function(){
		var model = $('.line:eq(0) > div:eq(0)', this).width();

		$('.line > div', this).height(model);
		$(this).css('margin-top', - model / 2);
	});

	// Portfolio
	$('#wrapper #portfolio > #block1 > .centered .framed-block .content > .left-block .intro').each(function(){
		$(this).height($('#wrapper #portfolio > #block1 > .centered .framed-block .content > .right-block .intro').height());
	});

	// About - Button Scroll
	$('.btn-scroll-down.about').each(function(){
		$(this).css('left', $('#about #block1 > .centered').offset().left);
	});

	// Contact
	$('#contact > #block1 > .centered .framed-block .content > .left-block').each(function(){
		$('ul', this).height($('#contact > #block1 > .centered .framed-block .content > .right-block ul').height());
		$('.sectors', this).height($('#contact > #block1 > .centered .framed-block .content > .right-block .sectors').height());
	});

	// Services Adjust Columns Height
	$('#services').each(function(){
		$('#block3 .left-block > div').height($('#block3 .right-block > div').height());
	});

	// Tips
	$('#tips').each(function(){
		$('.slider-container > .slider > ul > li > div > div',this).width($('.slider-container > .slider > ul > li > div > div img').width() - 1);
	});

	// Resize Footer
	$wrapper.css('padding-bottom', $footer.height());

	scrollContent();
}

var aboutTimeout;
function scrollContent(){
	var totalScroll = $(document).height() - $(window).height();

	newScroll = $(window).scrollTop(); 

	// Loading
	if(!browserMobile){
		$toLoad.each(function(){
			var object = $(this);

			if(newScroll + $(window).height() * 0.85 > $(this).offset().top){
				object.removeClass('no-anim');
				object.addClass('loaded');
			} else if(newScroll + $(window).height() < $(this).offset().top) {
				object.addClass('no-anim');
				object.removeClass('loaded');
			}
		});
	}

	// Parallax
	if(!browserMobile){
		$parallax.each(function(){
			var textScroll = $(this).offset().top - newScroll;
			var tempScroll = $(this).offset().top - newScroll;
			// Set Limits
			if(tempScroll < - $(this).height()) tempScroll = - $(this).height();
			if(tempScroll > $(this).height()) tempScroll = $(this).height();
			// Get Percentage
			var percTranslate = tempScroll / $(this).height();

			// Cards and Images
			$('.card-container.card2', this).css({'transform': 'translate(0, '+(150 * - percTranslate)+'px)', '-webkit-transform': 'translate(0, '+(150 * - percTranslate)+'px)'});
			$('.img', this).css({'transform': 'translate(0, '+(550 * - percTranslate)+'px)', '-webkit-transform': 'translate(0, '+(550 * - percTranslate)+'px)'});

			// Text Grid
			$('.text-grid', this).css({'transform': 'translate(0, '+(- textScroll)+'px)', '-webkit-transform': 'translate(0, '+(- textScroll)+'px)'});

			// Make Active
			if(newScroll + $(window).height() * 0.5 > $(this).offset().top && newScroll + $(window).height() * 0.5 < $(this).offset().top + $(this).height() && !$(this).hasClass('active')){
				// Unload
				$parallax.removeClass('active');
				$('.text-grid', $parallax).removeClass('visible');
				$('.text-grid .line', $parallax).removeClass('loaded');
				// Reload
				var object = $(this);
				object.addClass('active');
				clearTimeout(aboutTimeout);
				aboutTimeout = setTimeout(function(){
					$('.text-grid', object).addClass('visible');
					$('.text-grid .line', object).addClass('loaded');
				}, 750);
			}
		});
	}

	// Parallax Icons
	if(!browserMobile){
		$parallaxIcon.each(function(){
			var textScroll = ($(this).parent().offset().top - (newScroll + $(window).height())) * 0.5;
			if($(this).hasClass('icon-2')) textScroll = ($(this).parent().offset().top - (newScroll + $(window).height())) * 0.75;
			if($(this).hasClass('icon-10')) textScroll = ($(this).parent().offset().top - (newScroll + $(window).height())) * 0.25;
			$(this).css({'transform': 'translate(0, '+(- textScroll)+'px)', '-webkit-transform': 'translate(0, '+(- textScroll)+'px)'});
		});
	}

	// Scroll Slider Squares
	$('.no-slider').each(function(){
		var sliderPos = 0;
		if(newScroll + $(window).height() > $(this).offset().top) sliderPos = $(this).offset().top - (newScroll + $(window).height());

		$('#slider-container-squares').css('top', sliderPos);
		$('#slider-container-squares .slider').css({'top': (- sliderPos * 0.75)});
	});

	// Homepage Fake Header
	if(!browserMobile){
		$('#homepage').each(function(){
			var tempHeader = $('#block1 .card-container');

			// Hide Header
			if(newScroll < tempHeader.offset().top + tempHeader.height()){
				$btnHeader.addClass('no-menu');
				if($header.hasClass('opened')) $header.trigger('click');
			}
			// Show Header
			else {
				if(!$header.hasClass('opened')) $btnHeader.removeClass('no-menu');
			}
		});
	}

	// Homepage Blur
	$('#slider-container-squares .active .blur').each(function(){
		var tempOpacity = (newScroll * 1.5) / $(window).height();
		$(this).css('opacity', tempOpacity);
	});

	$('#slider-container-squares').each(function(){
		if(newScroll > 10) infiniteSliderSquares.stop(infiniteSliderSquares);
		else infiniteSliderSquares.start(infiniteSliderSquares);
	});

	// Tips - Sidebar
	$('#tips .sidebar').each(function(){
		var newPos = newScroll;
		if(newScroll + $(this).height() + parseInt($(this).css('top')) > $('#block1').height() - 210) newPos = newScroll - ((newScroll + $(this).height() + parseInt($(this).css('top'))) - ($('#block1').height() - 210));

		$(this).css({'transform': 'translate(0, '+newPos+'px)', '-webkit-transform': 'translate(0, '+newPos+'px)'});
	});

	$('#tips #block1 .listing').each(function(){
		var currentIndex = $('#tips #block1 .sidebar ul li.active').index();
		var newIndex = $('#tips #block1 .sidebar ul li.active').index();

		$('> li', this).each(function(){
			if(newScroll + $(window).height() / 2 > $(this).offset().top){
				newIndex = $(this).index();
			}
		});

		if(newIndex != currentIndex){
			$('#tips #block1 .sidebar ul li.active').removeClass('active');
			$('#tips #block1 .sidebar ul li').eq(newIndex).addClass('active');
		}
	});

	// Scroll Buttons
	$('.btn-scroll-down').each(function(){
		if(newScroll > 10) $(this).addClass('hidden');
		else $(this).removeClass('hidden');
	});

	// Demask Footer
	$footer.each(function(){
		var tempScroll = 220;
		if(newScroll > totalScroll - 220) tempScroll = 220 - (newScroll - (totalScroll - 220));

		$('> .centered', $footer).css({'transform': 'translate(0, '+tempScroll+'px)', '-webkit-transform': 'translate(0, '+tempScroll+'px)'});
	});

	currentScroll = newScroll;
}

/* ////////////////////////////////////////////////////////////////////////////
//
// Get Browser
//
/////////////////////////////////////////////////////////////////////////// */

function whichBrs() {
	var agt=navigator.userAgent.toLowerCase();
	if (agt.indexOf("opera") != -1) return 'Opera';
	if (agt.indexOf("staroffice") != -1) return 'Star Office';
	if (agt.indexOf("webtv") != -1) return 'WebTV';
	if (agt.indexOf("beonex") != -1) return 'Beonex';
	if (agt.indexOf("chimera") != -1) return 'Chimera';
	if (agt.indexOf("netpositive") != -1) return 'NetPositive';
	if (agt.indexOf("phoenix") != -1) return 'Phoenix';
	if (agt.indexOf("firefox") != -1) return 'Firefox';
	if (agt.indexOf("chrome") != -1) return 'Chrome';
	if (agt.indexOf("safari") != -1) return 'Safari';
	if (agt.indexOf("skipstone") != -1) return 'SkipStone';
	if (agt.indexOf("msie") != -1) return 'Internet Explorer';
	if (agt.indexOf("netscape") != -1) return 'Netscape';
	if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
	if (agt.indexOf('\/') != -1) {
		if (agt.substr(0,agt.indexOf('\/')) != 'mozilla') {
			return navigator.userAgent.substr(0,agt.indexOf('\/'));
		} else return 'Netscape';
	} else if (agt.indexOf(' ') != -1)
		return navigator.userAgent.substr(0,agt.indexOf(' '));
	else return navigator.userAgent;
}
