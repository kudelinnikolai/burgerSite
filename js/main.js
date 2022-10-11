//======================  YANDEX-MAP  =============================
ymaps.ready(function () {	
    var myMap = new ymaps.Map('yandex-map', {
            center: [55.36180422, 86.11736106],
            zoom: 12,
            controls: [],
        });

		var coords = [
					[55.34605007, 86.14870299],
					[55.34575660, 86.09926452],
					[55.38760274, 86.08690490],
					[55.33993194, 86.17321454],
				];

		var myCollection = new ymaps.GeoObjectCollection({}, {
					draggable: false,
					iconLayout: 'default#image',
					iconImageHref: 'img/icons/map-marker.svg',
					iconImageSize: [46, 57],
					iconImageOffset: [-26, -52],
				});

		for (var i = 0; i < coords.length; i++) {
			myCollection.add(new ymaps.Placemark(coords[i]));
		}

		myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');
});
//======================  YANDEX-MAP  =============================
//==========================  END  ================================


//=====================  ONE PAJE SCROLL  =========================
$(function(){

	var sections = $('.section'),
			display = $('.main-content'),
			inScroll = false;

	var scrollToSection = function (sectionNum) {
		var position = 0;

		if(!inScroll) {
			inScroll = true

			position = (sections.eq(sectionNum).index() * -100) + '%';

			sections.eq(sectionNum).addClass('active')
				.siblings().removeClass('active');

			display.css({
				'transform' : 'translate3d(0, ' + position + ', 0)'
			})
				
			$('.fixed-menu__item').eq(sectionNum).addClass('fixed-menu__item_active').
				siblings().removeClass('fixed-menu__item_active');

			setTimeout(function() {
				inScroll = false;
			}, 1100)
		}
	}

	$('.wrapper').on('wheel', function(e) {
		//console.log(e.originalEvent.deltaY);
		var deltaY = e.originalEvent.deltaY,
				nowSection= sections.filter('.active'),
				nextSection = nowSection.next(),
				prevSection = nowSection.prev();

		if (deltaY > 0) {
			if (nextSection.length) {
				scrollToSection(nextSection.index());
			};
		} else {
			if (prevSection.length) {
				scrollToSection(prevSection.index());
			};
		}

	})

	$('.fixed-menu__link, .down__arrow, .nav__link, .order-link, .burger-slidrer__buy').on('click', function (e) {
		e.preventDefault();

		var href = +$(this).attr('href');
		scrollToSection(href);
	})

	$(document).on('keydown', function(e) {

		var nowSection = sections.filter('.active'),
				nextSection = nowSection.next(),
				prevSection = nowSection.prev();

		switch (e.keyCode) {
			case 37:
			case 38:
				if (prevSection.length) {
					scrollToSection(prevSection.index());
				};
				break;

			case 39:
			case 40:
				if (nextSection.length) {
					scrollToSection(nextSection.index());
				};
				break;
		}
	})

})
//===================  ONE PAJE SCROLL  ===========================
//==========================  END  ================================


//=========================  Slider  ==============================
$(function() {
	var burgerCarousel = $('.burger-slider__list').owlCarousel({
		'items': 1,
		'loop': true,
		'smartSpeed': 500,
	})

	$('.burger-slider__btn_next').on('click', function(e){
		e.preventDefault();
		burgerCarousel.trigger('next.owl.carousel');
	})
	$('.burger-slider__btn_prev').on('click', function(e){
		e.preventDefault();
		burgerCarousel.trigger('prev.owl.carousel');
	})
})
//=========================  Slider  ==============================
//==========================  END  ================================


//===================  VERTICAL ACCORDEON  ========================
$(function() {		
	var isAnimation = false;
	$('.team-accord__trigger').on('click', function(e){
		e.preventDefault();

		var $this = $(this),
				item = $this.closest('.team-accord__item'),
				accordeon = $this.closest('.team-accord'),
				items = accordeon.find('.team-accord__item'),
				content = item.find('.team-accord__content'),
				allContent = accordeon.find('.team-accord__content');

		if (!isAnimation) {
			isAnimation = true;

			if (!item.hasClass('team-accord__item_active')) {
				items.removeClass('team-accord__item_active');
				item.addClass('team-accord__item_active');
				allContent.slideUp();
				content.slideDown();
			} else {
				item.removeClass('team-accord__item_active');
				content.slideUp();
			}

			setTimeout(function() {
				isAnimation = false;
			}, 400)
		};

	})
})
//===================  VERTICAL ACCORDEON  ========================
//==========================  END  ================================


//==================  HORIZONTAL ACCORDEON  =======================
$(function() {
	$('.menu-accord__trigger').on('click', function(e){
		e.preventDefault();
		
		var $this = $(this),
				item = $this.closest('.menu-accord__item'),
				accordeon = $this.closest('.menu-accord'),
				items = accordeon.find('.menu-accord__item'),
				content = item.find('.menu-accord__content'),
				allContent = accordeon.find('.menu-accord__content');

		if (!item.hasClass('menu-accord__item_active')) {
			items.removeClass('menu-accord__item_active');
			item.addClass('menu-accord__item_active');
		} else {
			item.removeClass('menu-accord__item_active');
		}

	})

	$('.section.menu').on('click', function(e){
		var $this = $(e.target);

		if(!$this.closest('.menu-accord').length) {
			$('.menu-accord__item').removeClass('menu-accord__item_active');
		}
	});
});
//==================  HORIZONTAL ACCORDEON  =======================
//==========================  END  ================================


//=======================  INPUT MASK  ============================
$(function() {
	$('.phone-mask').inputmask('+7 (999) 999 99 99');
});
//=======================  INPUT MASK  ============================
//==========================  END  ================================


//=========================  IPOPUP  ==============================$(function() {
$(function() {
	$('.review__details').fancybox({
		'type': 'inline',
		'maxWidth': 460,
		'fitToView': false,
		'padding': 0,
	});

	$('.full-review__cancel').on('click', function(e){
		e.preventDefault();
		$.fancybox.close();
	});
});
//=========================  IPOPUP  ==============================
//==========================  END  ================================


//======================  FORM SUBMITER  ==========================
$(function() {
	$('#order-form').on('submit',function(e) {
		e.preventDefault();

		var form = $(this);

		$.ajax({
			url: '../php/mail.php',
			type: 'POST',
			data: {
				name: "Коля",
			},
			success: function(data) {
				console.log(data);
			}
		});
	});
});