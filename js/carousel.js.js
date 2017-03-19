;(function($){

	$.fn.carousel = function(options) {

		var defaults = {
			imgArr: [],
			slideSpeed: 1000
		};

		var settings = $.extend(defaults, options);

		var $link = this;
		var lastCheckedPos = 0; // Return previous checked object  
	  var nextChecked = 0; // Next checked object position
	  var numberOfSlides = 0; // Number of slides to slide
	  var arrLength = settings.imgArr.length;
	  var execute = false; // To prevent multiple click on arrows

	  function init() {
	  	createCarousel();

	  	$('.carousel-slides-container li:last').insertBefore($('.carousel-slides-container li:first'));
	  	$('.carousel-slides-container').css({
	  		marginLeft: '-=100%'
			}); // Add last slide before first for carousel effect

	  }

		function createCarousel() {
			var i;
			var $modal, $leftArrow, $rightArrow, $ul, $li;

			$modal = $('<div class="carousel-modal"></div>')
			$leftArrow = $('<a href="#" class="carousel-arrow carousel-left-arrow"></a>')
			$rightArrow = $('<a href="#" class="carousel-arrow carousel-right-arrow"></a>')
			$ul = $('<ul class="carousel-slides-container"></ul>')

			if (settings.imgArr.length > 0) {
				for (i = 0; i < arrLength; i++) {
					$li = $('<li class="carousel-li"></li>').css({
						backgroundImage: 'url('+settings.imgArr[i]+')',
						backgroundRepeat: 'no-repeat',
						backgroundSize: '100% 100%'
					})
					$ul.append($li)
				};
			};

			$modal.append($leftArrow);
			$modal.append($rightArrow);
			$modal.append($ul);
			$link.append($modal);

			createRadioButton($modal);

			$leftArrow.on('click', function(e){
				e.preventDefault();
				prev();
			});
			$rightArrow.on('click', function(e){
				e.preventDefault();
				next();
			});

		};

		function prev() {
			if(!execute) {
				execute = true
				$('.carousel-slides-container').animate({
					marginLeft: '+=100%'
				},settings.slideSpeed, function() {
					$('.carousel-slides-container li:last').insertBefore($('.carousel-slides-container li:first'));
					$(this).css({
						marginLeft: '-=100%'
					})
					execute = false;
				});
				if (nextChecked > 0) {
					nextChecked--;
				} else {
					nextChecked = arrLength - 1
				};
				$('input[name="carousel-radio"]').eq(nextChecked).prop("checked", true);
				lastCheckedPos = $('input[name="carousel-radio"]').eq(nextChecked).prop("checked", true);
			} else {
				return;
			};
		};

		function next() {
			if(!execute) {
				execute = true
				$('.carousel-slides-container').animate({
					marginLeft: '-=100%'
				},settings.slideSpeed, function() {
					$('.carousel-slides-container li:last').after($('.carousel-slides-container li:first'));
					$(this).css({
						marginLeft: '+=100%'
					})
					execute = false;
				});
				if (nextChecked < arrLength - 1) {
					nextChecked++;
				} else {
					nextChecked = 0
				};
				$('input[name="carousel-radio"]').eq(nextChecked).prop("checked", true);
				lastCheckedPos = $('input[name="carousel-radio"]').eq(nextChecked).prop("checked", true);
			} else {
				return;
			};
		};

		function createRadioButton($modal) {
			var i;
			var $radioButtonBlock, $label, $radioButton;
			$radioButtonBlock = $('<div class="carousel-radio-buttons"></div>');
			for (i = 0; i < settings.imgArr.length; i++) {
				$label = $("<label></label>")
				$radioButton = $('<input type="radio" name="carousel-radio">').css({
					display: 'none'
				});
				$pseudoRadio = $('<div class="carousel-radio-style"></div>')
				$label.append($radioButton);
				$label.append($pseudoRadio);
				$radioButtonBlock.append($label);
			};
			$modal.append($radioButtonBlock);
			$('input[name="carousel-radio"]').eq(0).prop('checked', true)
			radioButtonClick()
		};

    function radioButtonClick() { 
    	
    	$('input[name="carousel-radio"]').each(function(index, element) {
    		$(element).click(function(){
					var currentChecked = $('.carousel-radio-buttons').find('input[name="carousel-radio"]').index(lastCheckedPos) // Find last checked pos
					nextChecked =  $('.carousel-radio-buttons').find('input[name="carousel-radio"]').index($(this)) // Current click pos 

					if(nextChecked > currentChecked) {
						numberOfSlides = nextChecked - currentChecked;
						for(var i = 0; i < numberOfSlides; i++) { 
							$('.carousel-slides-container').animate({
								marginLeft: '-=100%'
							},100, function() {
								$('.carousel-slides-container li:last').after($('.carousel-slides-container li:first'));
								$(this).css({
									marginLeft: '+=100%'
								})
							});
						};
					} else {
						numberOfSlides = currentChecked - nextChecked
						for(var i = 0; i < numberOfSlides; i++) {
							$('.carousel-slides-container').animate({
								marginLeft: '+=100%'
							},100, function() {
								$('.carousel-slides-container li:last').insertBefore($('.carousel-slides-container li:first'));
								$(this).css({
									marginLeft: '-=100%'
								})
							});
						};
					};
					lastCheckedPos = $('.carousel-radio-buttons').find('input[name="carousel-radio"]:checked') 
				});

			});
    };   

		init();
		return this;
	};

})(jQuery);