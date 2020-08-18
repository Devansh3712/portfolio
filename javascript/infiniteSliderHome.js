/* ////////////////////////////////////////////////////////////////////////////
//
// Infinite Slider
// V 1.0
// Alexandra Nantel
// Last Update 01/11/2012 10:22
//
/////////////////////////////////////////////////////////////////////////// */

function InfiniteSliderHome(wrapper,speed,duration,mode,easing,hover,animation){
	var _infiniteSlider = this;
		
	// If true : running
	this.animated = false;
	// Autorotation
	this.hover = hover;
	this.autorotation = animation;
	this.running = true;
	this.t;
	// Setting the container and controller
	this.wrapper = $(wrapper);
	this.container = $('.slider',this.wrapper);
	this.arrows = $('.slider-arrows',this.wrapper);
	this.count = $('.count',this.arrows);
	this.controls = $('.slider-controls',this.wrapper);
	this.infos = $('.slider-infos',this.wrapper);
	this.speed = speed;
	this.duration = duration;
	this.mode = mode; // slide - slidev - fade - demask
	this.easing = easing;
	this.width = this.container.width();
	this.height = this.container.height();
	// Setting index : slide ordered index || indexSlide : slide real index
	this.index = 0;
	this.indexSlide = 0;
	// Number of elements
	this.length = $('li', this.container).length - 1;
	
	/* Initialize
	//////////////////////////////////////////////////////////////////////// */
	
	// Identify each slide and control with initial order
	$('> ul > li', this.container).each(function(){
		$(this).attr('data-slide',$(this).index() + 1);
		
		if($(this).index() == 0){
			$(this).addClass('active');
			$(_infiniteSlider.controls).append('<li class="active" data-slide="'+($(this).index() + 1)+'"><a href="">Slide '+($(this).index() + 1)+'</a></li>');
		
			// Fill Content
			if($('#gallery').length == 1){
				$('h2 .big').html($(this).attr('data-project-title'));
				$('.infos .text > div').html($(this).attr('data-project-content'));
			}
		} else {
			$(this).addClass('inactive');
			$(_infiniteSlider.controls).append('<li class="inactive" data-slide="'+($(this).index() + 1)+'"><a href="">Slide '+($(this).index() + 1)+'</a></li>');
		}
	});
	
	$('li', this.controls).each(function(){
		$(this).attr('data-slide',$(this).index() + 1);
		
		if($(this).index() == 0) $(this).addClass('active');
		else $(this).addClass('inactive');
	});
	
	// Fill Count values
	$(this.count).html((this.index + 1)+' / '+(this.length + 1));
	
	// Fill First Infos
	if($('> ul > li:eq(0)', this.container).attr('data-infos') != '') $(this.infos).html($('> ul > li:eq(0)', this.container).attr('data-infos'));
	
	// Disable if just one slide
	if(this.length == 0){
		$(this.controls).hide();
		this.autorotation = false;
	}
	
	// Initiate Positioning
	this.reset(_infiniteSlider);
	
	// Bind
	/*if(this.hover){
		$(this.wrapper).mouseenter(function(){
			_infiniteSlider.stop(_infiniteSlider);
		});
		$(this.wrapper).mouseleave(function(){
			_infiniteSlider.start(_infiniteSlider);
		});
	}*/

	$('li a',this.controls).click(function(){
		_infiniteSlider.controlsClick($(this),_infiniteSlider);
		
		return false;
	});

	$('li a',this.arrows).click(function(){
		_infiniteSlider.arrowsClick($(this),_infiniteSlider);
		
		return false;
	});
	
	$(window).resize(function(){
		_infiniteSlider.reset(_infiniteSlider);
	});

	$(document).keydown(function(event){
		// Next
		if(event.keyCode == 39) $('.slider-arrows .next a').trigger('click');
		// Previous
		if(event.keyCode == 37) $('.slider-arrows .previous a').trigger('click');
	});
	
	// Start Autorotation
	if($('#gallery').length == 1) _infiniteSlider.running = false;
	if(this.running) this.autoRotation(_infiniteSlider);
}

/* ////////////////////////////////////////////////////////////////////////////
//
// Autorotation
//
/////////////////////////////////////////////////////////////////////////// */

InfiniteSliderHome.prototype.autoRotation = function(_infiniteSlider){
	clearTimeout(_infiniteSlider.t);

	if($('#gallery').length == 1) _infiniteSlider.running = false;
	
	if($('li', _infiniteSlider.controls).length > 1 && _infiniteSlider.autorotation){
		if(_infiniteSlider.running){
			_infiniteSlider.t = setTimeout(function(){
				_infiniteSlider.changeSlide(_infiniteSlider.indexSlide,_infiniteSlider.indexSlide + 1,_infiniteSlider)
			},_infiniteSlider.duration);
		}
	}
}

/* ////////////////////////////////////////////////////////////////////////////
//
// External Functions
//
/////////////////////////////////////////////////////////////////////////// */

InfiniteSliderHome.prototype.start = function(_infiniteSlider){ 
	_infiniteSlider.running = true;
	_infiniteSlider.autoRotation(_infiniteSlider);
	
	return false;
}

InfiniteSliderHome.prototype.stop = function(_infiniteSlider){ 
	clearTimeout(_infiniteSlider.t); 
	_infiniteSlider.running = false; 
	
	return false;
}

InfiniteSliderHome.prototype.arrowsClick = function(object,_infiniteSlider){
	if(!_infiniteSlider.animated){
		//_infiniteSlider.autorotation = false;
		// Stop timer
		clearTimeout(_infiniteSlider.t);
		
		if($(object).parent().hasClass('next')) var clicked = _infiniteSlider.indexSlide + 1;
		else var clicked = _infiniteSlider.indexSlide - 1;

		_infiniteSlider.changeSlide(_infiniteSlider.indexSlide,clicked,_infiniteSlider);
	}

	return false;
}

InfiniteSliderHome.prototype.controlsClick = function(object,_infiniteSlider){
	if(!_infiniteSlider.animated && $(object).parent().hasClass('active') == false){
		_infiniteSlider.autorotation = false;
		// Stop timer
		clearTimeout(_infiniteSlider.t);
		
		var clicked = $(object).parent().index();
		
		$('> ul > li',_infiniteSlider.container).each(function(){
			if($(this).attr('data-slide') == clicked + 1){
				_infiniteSlider.changeSlide(_infiniteSlider.indexSlide,$(this).index(),_infiniteSlider);
			} 
		});	
	}

	return false;
}

InfiniteSliderHome.prototype.reset = function(_infiniteSlider){
	if(!_infiniteSlider.animated){
		_infiniteSlider.stop(_infiniteSlider);
		_infiniteSlider.width = _infiniteSlider.container.width();
		_infiniteSlider.height = _infiniteSlider.container.height();
		
		_infiniteSlider.start(_infiniteSlider);
	}
}

/* ////////////////////////////////////////////////////////////////////////////
//
// Change slide
//
/////////////////////////////////////////////////////////////////////////// */

InfiniteSliderHome.prototype.changeSlide = function(current,clicked,_infiniteSlider){			
	_infiniteSlider.animated = true;
	var direction = 'next';
	if(clicked < current) direction = 'previous';
	
	// Check limits
	if(clicked > _infiniteSlider.length){
		clicked = 0;
	} else if(clicked < 0){
		clicked = _infiniteSlider.length;
	}
		
	// Redefine active slide
	$('> ul > li',_infiniteSlider.container).removeClass('active').addClass('inactive');
	$('> ul > li',_infiniteSlider.container).eq(clicked).removeClass('inactive').addClass('active');
			
	_infiniteSlider.index = parseInt($('> ul > li.active',_infiniteSlider.container).attr('data-slide')) - 1;
	_infiniteSlider.indexSlide = $('> ul > li.active',_infiniteSlider.container).index();
	
	// Redefine active control
	$('li',_infiniteSlider.controls).removeClass('active');
	$('li',_infiniteSlider.controls).eq(_infiniteSlider.index).addClass('active');

	// Animate Slides
	if(_infiniteSlider.mode == 'slide'){
		// Place new slide AFTER
		if(direction == 'next'){
			$('> ul > li',_infiniteSlider.container).eq(clicked)
				.css('left', _infiniteSlider.width+'px')
				.show();
			
			// Animate slides
			$('> ul > li',_infiniteSlider.container).animate({left: '-='+_infiniteSlider.width}, {'duration': _infiniteSlider.speed, easing: _infiniteSlider.easing, 'complete': function(){				
				_infiniteSlider.animated = false;
				$('> ul > li.inactive',_infiniteSlider.container).hide();
				if(_infiniteSlider.running) _infiniteSlider.autoRotation(_infiniteSlider);
			}});
		}
		// Place new slide BEFORE
		else {
			$('> ul > li',_infiniteSlider.container).eq(clicked)
				.css('left', -_infiniteSlider.width+'px')
				.show();
			
			// Animate slides
			$('> ul > li',_infiniteSlider.container).animate({left: '+='+_infiniteSlider.width}, {'duration': _infiniteSlider.speed, easing: _infiniteSlider.easing, 'complete': function(){				
				_infiniteSlider.animated = false;
				$('> ul > li.inactive',_infiniteSlider.container).hide();
				if(_infiniteSlider.running) _infiniteSlider.autoRotation(_infiniteSlider);
			}});
		}
	}	else if(_infiniteSlider.mode == 'slidev'){
		// Place new slide AFTER
		if(direction == 'next'){
			$('> ul > li',_infiniteSlider.container).eq(clicked)
				.css('top', _infiniteSlider.height+'px')
				.show();
			
			// Animate slides
			$('> ul > li',_infiniteSlider.container).animate({top: '-='+_infiniteSlider.height}, {'duration': _infiniteSlider.speed, easing: _infiniteSlider.easing, 'complete': function(){				
				_infiniteSlider.animated = false;
				$('> ul > li.inactive',_infiniteSlider.container).hide();
				if(_infiniteSlider.running) _infiniteSlider.autoRotation(_infiniteSlider);
			}});
		}
		// Place new slide BEFORE
		else {
			$('> ul > li',_infiniteSlider.container).eq(clicked)
				.css('top', -_infiniteSlider.height+'px')
				.show();
			
			// Animate slides
			$('> ul > li',_infiniteSlider.container).animate({top: '+='+_infiniteSlider.height}, {'duration': _infiniteSlider.speed, easing: _infiniteSlider.easing, 'complete': function(){				
				_infiniteSlider.animated = false;
				$('> ul > li.inactive',_infiniteSlider.container).hide();
				if(_infiniteSlider.running) _infiniteSlider.autoRotation(_infiniteSlider);
			}});
		}
	} else if(_infiniteSlider.mode == 'fade'){
		// Animate Slides
		$('> ul > li.active',_infiniteSlider.container).fadeIn(_infiniteSlider.speed, function(){
			$('> ul > li',_infiniteSlider.container).eq(current).hide();
			_infiniteSlider.animated = false;
			if(_infiniteSlider.running) _infiniteSlider.autoRotation(_infiniteSlider);
		});
	} else if(_infiniteSlider.mode == 'demask'){
		$('> ul > li.active',_infiniteSlider.container).animate({width: _infiniteSlider.width}, _infiniteSlider.speed, _infiniteSlider.easing, function(){
			$('> ul > li.inactive',_infiniteSlider.container).width(0);
			_infiniteSlider.animated = false;
			if(_infiniteSlider.running) _infiniteSlider.autoRotation(_infiniteSlider);
		});
	} else if(_infiniteSlider.mode == 'columns'){
		$('> ul > li',_infiniteSlider.container).eq(clicked).css('left', '0');
		$('> ul > li',_infiniteSlider.container).eq(current).find('.columns > li > div').animate({width: 0}, _infiniteSlider.speed, _infiniteSlider.easing, function(){
			$('> ul > li',_infiniteSlider.container).eq(current).css('left', '100%');
			$('> ul > li',_infiniteSlider.container).eq(current).find('.columns > li > div').width('100%');
			_infiniteSlider.animated = false;
			if(_infiniteSlider.running) _infiniteSlider.autoRotation(_infiniteSlider);
		});
	} else if(_infiniteSlider.mode == 'css'){
		// Transition Infos
		if($('#gallery').length == 1 && $('h2 .big').html() != $('> ul > li',_infiniteSlider.container).eq(clicked).attr('data-project-title')){
			$('h2 .big').html($('> ul > li',_infiniteSlider.container).eq(clicked).attr('data-project-title'));
			$('.infos .text > div').html($('> ul > li',_infiniteSlider.container).eq(clicked).attr('data-project-content'));
		}

		// Transition Images
		$('> ul > li',_infiniteSlider.container).eq(current).addClass('leaving');
		setTimeout(function(){
			$('> ul > li',_infiniteSlider.container).eq(current).addClass('no-anim');
			$('> ul > li',_infiniteSlider.container).eq(current).removeClass('leaving');
			$('> ul > li',_infiniteSlider.container).eq(current).removeClass('no-anim');
			_infiniteSlider.animated = false;
			_infiniteSlider.autoRotation(_infiniteSlider);
		}, _infiniteSlider.speed);
	}
}