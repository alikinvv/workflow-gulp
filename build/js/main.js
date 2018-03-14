// Главное меню
$(function() {
	$('.header__menu').append("<span class='bar'></span>"); // create new element
	var $bar = $('.header__menu .bar');
	if($('.header__menu li').is('.active')) {
		var barLeft =  $('.header__menu li.active').position().left;
		var barWidth = $('.header__menu li.active').width();
	} else {
		var barLeft =  0;
		var barWidth = 0;
	}	
	$bar.css('width', barWidth).css('left', barLeft);

	// get hover menu item position and width
	$('.header__menu li').hover(function() {
		$bar.css('width', $(this).width()).css('left', $(this).position().left);  // get hover menu item position and width
	});

	// return to the original position of the active list item
	$('.header__menu').mouseleave(function() {
		$bar.css('width', barWidth).css('left', barLeft);
	});

	// сhanging the active menu item
	$('.header__menu li').click(function() {
		barLeft =  $(this).position().left;
		barWidth = $(this).width();
		$('.header__menu li').removeClass('active');
		$(this).addClass('active');
	});
});

// задаем одинаковую высоту всем блокам
function sameHeight(block) {
	if($('*').is(block)) {
		var maxHeight = 0;
        $(block).each(function () {
            var h_block = parseInt($(this).height());
            if(h_block > maxHeight) {
                maxHeight = h_block;
            };
        });
        $(block).height(maxHeight);
    }
}

// задаем одинаковую высоту всем блокам с учетом отступов
function sameOuterHeight(block) {
	if($('*').is(block)) {
		var maxHeight = 0;
        $(block).each(function () {
            var h_block = parseInt($(this).outerHeight());
            if(h_block > maxHeight) {
                maxHeight = h_block;
            };
        });
        $(block).height(maxHeight);
    }
}

// определяем левый отступ .incabFeatures__info в блоке .incabFeatures
function incabFeatures() {	
    if($('*').is('.incabFeatures')) {
    	$('.incabFeatures').each(function() {
    		var left = $(this).find('.incabFeatures__count').position().left;
    		$(this).find('.incabFeatures__info').css('left',left);    		
    	})
    }
}

// сжимаем блок на 30px 
function pinch() {
	if($('*').is('.pinch')) {
		$('.pinch').each(function() {
			var w = $(this).width();
			$(this).width(w-30);
		});		
	}	
}

var slickTrigger = false;
var searchTrigger = false;

$(document).ready(function(){
	sameHeight('.fourP__over');		
	incabFeatures();
	pinch();
	if($(window).width() >= 1024) 
		sameHeight('.useful-col');	

	// анимация поиска в шапке
	$('.header__search .searchForm__button').click(function(e) {
		e.preventDefault();
		$('.header__search .searchForm__input').addClass('slide');
		$('.header__search .searchForm__input').focus();
		$('.header__search').addClass('slide');
		searchTrigger = true;
	});

	$('.header__search .searchForm__input').focusout(function() {
		if(!$('.header__search .searchForm__input').val()) {
			$('.header__search .searchForm__input').removeClass('slide');
			$('.header__search').removeClass('slide');
		}
	})
	
	// 4П триггер
	if($('*').is('.fourPWrap') && $(window).width() <= 767 && !slickTrigger) {
		$('.fourPWrap .col-xs-12').slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  arrows: false
		});
		slickTrigger = true;
	} else if($('*').is('.fourPWrap') && $(window).width() >= 768 && slickTrigger) {
		$('.fourPWrap .col-xs-12').slick('destroy');
		slickTrigger = false;
	}

	// анимация блоков 4П
	if($('*').is('.fourP')) {
		$('.fourP').hover(function() {
			var left = $(this).position().left,
				right = $('.fourPWrap .col-xs-12').width() - ($(this).position().left +  $(this).width())
			$(this).siblings().css('pointer-events','none');
			$(this).addClass('active');
			$(this).find('.fourP__under').animate({
				left: -left,
				right: -right,
			},100);
		});
		$('.fourPWrap .fourP').mouseleave(function() {
			$('.fourP').css('pointer-events','all');
			setTimeout(function() {
				$('.fourP').removeClass('active');
			},0);
			$(this).find('.fourP__under').animate({
				left: '50%',
				right: '50%',
			},200);
		});
	}

	// Фильтрация кабелей в категории
	if($('*').is('.category__nav')) {
		var w = $('.cableItem').width();
		$('.category__nav a').click(function(e) {
			e.preventDefault();			

			if($('.category').find('.cableItem[data-target="' + $(this).attr('data-target') + '"]').hasClass('cableItem-hide')) {
				$('.category')
				.find('.cableItem[data-target="' + $(this).attr('data-target') + '"]')
				.removeClass('cableItem-hide')
				.animate({
					width: w,
					'margin-left': 15,
					'margin-right': 15
				});
				$('.category')
				.find('.cableItem:not([data-target="' + $(this).attr('data-target') + '"])')
				.addClass('cableItem-hide');
				$('.cableItem.cableItem-hide')					
					.css('width','0')
					.css('margin','0');
			} else {
				$('.category')
				.find('.cableItem:not([data-target="' + $(this).attr('data-target') + '"])')
				.addClass('cableItem-hide');
				setTimeout(function() {
					$('.cableItem.cableItem-hide')					
					.animate({
						width: 0,
					 	'margin': 0
					});
				},100);
			}			
		});
	}

	// точки на странице кабеля
	if($('*').is('.cable__dot')) {
		$('.cable__dot').each(function() {
			var parentHeight = $(this).parent().outerHeight();
			var dotPosition = $(this).position().top;
			$(this).css('height', parentHeight - dotPosition - 48);
			$(this).find('.cable__partNumber').hover(function() {
				$(this).parent().toggleClass('show');
			});
		});
	}
	
	// слайдер с пагинацией
    if($('*').hasClass('dotSlider')) {
    	var dotSwiper = new Swiper('.dotSlider', {
	      pagination: {
	        el: '.swiper-pagination',
	      },
	    });

	    if($('.dotSlider .swiper-slide').length <= 1) {
	    	$('.dotSlider .swiper-pagination').hide();
	    	$('.dotSlider').css('pointer-events','none');
	    }
    }

    // bootstrap tabs
	if($('*').hasClass('nav-tabs')) {
		$('.nav-tabs').append("<span class='bar'></span>"); // create new element
		var $bar = $('.nav-tabs .bar');
		var barLeft =  $('.nav-tabs li.active').position().left;
		var barWidth = $('.nav-tabs li.active').width();
		$bar.css('width', barWidth).css('left', barLeft);

		// get hover menu item position and width
		$('.nav-tabs li').hover(function() {
			$bar.css('width', $(this).width()).css('left', $(this).position().left);
		});

		// return to the original position of the active list item
		$('.nav-tabs').mouseleave(function() {
			$bar.css('width', barWidth).css('left', barLeft);  
		});

		// сhanging the active menu item
		$('.nav-tabs li').click(function() {
			barLeft =  $(this).position().left;
			barWidth = $(this).width();
		});
	}

	// селекты
	if($('*').hasClass('custom-select')) {
		$(".custom-select").each(function() {
		  var classes = $(this).attr("class"),
		      id      = $(this).attr("id"),
		      name    = $(this).attr("name");
		  var template =  '<div class="' + classes + '">';
		      template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
		      template += '<div class="custom-options">';
		      $(this).find("option").each(function() {
		        template += '<span class="custom-option" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
		      });
		  template += '</div></div>';
		  
		  $(this).wrap('<div class="custom-select-wrapper"></div>');
		  $(this).hide();
		  $(this).after(template);
		});
		$('.custom-options .custom-option[data-value="'+ $('.custom-select option.selection').attr('value') +'"]').addClass('selection');
		$(".custom-option:first-of-type").hover(function() {
		  $(this).parents(".custom-options").addClass("option-hover");
		}, function() {
		  $(this).parents(".custom-options").removeClass("option-hover");
		});
		$(".custom-select-trigger").on("click", function(event) {
		  $('html').one('click',function() {
		    $(".custom-select").removeClass("opened");
		  });
		  $(this).parents(".custom-select").toggleClass("opened");
		  event.stopPropagation();
		});
		$(".custom-option").on("click", function() {
		  $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
		  $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
		  $(this).addClass("selection");
		  $(this).parents(".custom-select").removeClass("opened");
		  $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
		  changeTable();
		});

		changeTable();
		function changeTable() {
			var activeOption = $('.custom-select .custom-option.selection').attr('data-value');
			console.log('Active option: ' + activeOption);
			$('.cableOptions__table table').hide();
			$('.cableOptions__table table[data-value="'+ activeOption +'"]').show();
		};
	}

	// слайдер с миниатюрами
	if($('*').hasClass('thumbSliderMain'))  {		
		 $('.thumbSliderMain').slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  arrows: false,
		  fade: true,
		  asNavFor: '.thumbSliderNav'
		});
		$('.thumbSliderNav').slick({
		  slidesToShow: 3,
		  slidesToScroll: 1,
		  asNavFor: '.thumbSliderMain',
		  infinite: true,
		  arrows: false,
		  centerMode: true,
		  focusOnSelect: true,
		  variableWidth: true
		});
	}

	// подгон точек по размеру картинки
	if($('*').hasClass('cable__imgWrap') && $(window).width() >= 1024) {
		$('.cable__imgWrap').css('width',$(this).find('.cable__img').width());
	} else {
		$('.cable__imgWrap').css('width','100%');
	}

	// подгон высоты секции по размеру видео
	if($('*').hasClass('mainVideo') && $(window).width() <= 1023 && $(window).width() > 414) {
		$('.mainVideo').css('height',$('.mainVideo__video').height());
	} else if($('*').hasClass('mainVideo') && $(window).width() < 414) {
		$('.mainVideo').css('height','');
	}

	// перевод кабельного меню в горизонтальный вид
	if($('*').hasClass('cableMenuWrap') && $(window).width() <= 767) {
		var w = 0;
		$('.cableMenu').each(function() {
			w += $(this).width();			
		});

		$('.cableMenuWrap').css('min-width',w);
		console.log('Cable menu width: ' + w);
	}

	// подгон высоты картинки коротких новостей
	if($('*').hasClass('secondEvents') && $(window).width() <= 767)
		$('.secondEvents .mainEvent__img').css('height',$('.secondEvents .mainEvent__info').outerHeight());
	

	// создание мобильного меню
	if(!$('*').hasClass('hamburger') && $(window).width() <= 767) {
		$('.header .row').append('<div class="hamburger"><span></span></div>');
	} else if($('*').hasClass('hamburger') && $(window).width() > 767) {
		$('.hamburger').hide();
	} else if($('*').hasClass('hamburger') && $(window).width() <= 767) {
		$('.hamburger').show();
	}

});

$(window).resize(function() {
	sameHeight('.fourP__over');
	incabFeatures();	
	// 4П триггер
	if($('*').is('.fourPWrap') && $(window).width() <= 767 && !slickTrigger) {
		$('.fourPWrap .col-xs-12').slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  arrows: false
		});
		slickTrigger = true;
	} else if($('*').is('.fourPWrap') && $(window).width() >= 768 && slickTrigger) {
		$('.fourPWrap .col-xs-12').slick('destroy');
		slickTrigger = false;
	}

	// подгон точек по размеру картинки
	if($('*').hasClass('cable__imgWrap') && $(window).width() >= 1024) {
		$('.cable__imgWrap').css('width',$(this).find('.cable__img').width());
	} else {
		$('.cable__imgWrap').css('width','100%');
	}

	// подгон высоты секции по размеру видео
	if($('*').hasClass('mainVideo') && $(window).width() <= 1023 && $(window).width() > 414) {
		$('.mainVideo').css('height',$('.mainVideo__video').height());
	} else if($('*').hasClass('mainVideo') && $(window).width() < 414) {
		$('.mainVideo').css('height','');
	}

	// создание мобильного меню
	if(!$('*').hasClass('hamburger') && $(window).width() <= 767) {
		$('.header .row').append('<div class="hamburger"><span></span></div>');
	} else if($('*').hasClass('hamburger') && $(window).width() > 767) {
		$('.hamburger').hide();
	} else if($('*').hasClass('hamburger') && $(window).width() <= 767) {
		$('.hamburger').show();
	}

	// подгон высоты картинки коротких новостей
	if($('*').hasClass('secondEvents') && $(window).width() <= 767)
		$('.secondEvents .mainEvent__img').css('height',$('.secondEvents .mainEvent__info').outerHeight());
});

$(document).bind('change', function(e){
    if( $(e.target).is(':invalid') ){
        $(e.target).addClass('invalid-input');
    } else {
        $(e.target).removeClass('invalid-input');
    }
});

$(window).on('load', function(){ 
	console.log('PAGE_ONLOAD');
});

// карта в контактах
if($('*').hasClass('office__map')) {
	var mapOffice;
	ymaps.ready(init);

	function init () {
	    // Создание экземпляра карты и его привязка к контейнеру
	    mapOffice = new ymaps.Map('mapOffice', {
	        // центр и коэффициент масштабирования.
	        center: [57.999969, 56.270843],
	        zoom: 16
	    }, {
	        searchControlProvider: 'yandex#search'
	    });

	    mapOffice.behaviors.disable('scrollZoom'); 

	}
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vINCT0LvQsNCy0L3QvtC1INC80LXQvdGOXHJcbiQoZnVuY3Rpb24oKSB7XHJcblx0JCgnLmhlYWRlcl9fbWVudScpLmFwcGVuZChcIjxzcGFuIGNsYXNzPSdiYXInPjwvc3Bhbj5cIik7IC8vIGNyZWF0ZSBuZXcgZWxlbWVudFxyXG5cdHZhciAkYmFyID0gJCgnLmhlYWRlcl9fbWVudSAuYmFyJyk7XHJcblx0aWYoJCgnLmhlYWRlcl9fbWVudSBsaScpLmlzKCcuYWN0aXZlJykpIHtcclxuXHRcdHZhciBiYXJMZWZ0ID0gICQoJy5oZWFkZXJfX21lbnUgbGkuYWN0aXZlJykucG9zaXRpb24oKS5sZWZ0O1xyXG5cdFx0dmFyIGJhcldpZHRoID0gJCgnLmhlYWRlcl9fbWVudSBsaS5hY3RpdmUnKS53aWR0aCgpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR2YXIgYmFyTGVmdCA9ICAwO1xyXG5cdFx0dmFyIGJhcldpZHRoID0gMDtcclxuXHR9XHRcclxuXHQkYmFyLmNzcygnd2lkdGgnLCBiYXJXaWR0aCkuY3NzKCdsZWZ0JywgYmFyTGVmdCk7XHJcblxyXG5cdC8vIGdldCBob3ZlciBtZW51IGl0ZW0gcG9zaXRpb24gYW5kIHdpZHRoXHJcblx0JCgnLmhlYWRlcl9fbWVudSBsaScpLmhvdmVyKGZ1bmN0aW9uKCkge1xyXG5cdFx0JGJhci5jc3MoJ3dpZHRoJywgJCh0aGlzKS53aWR0aCgpKS5jc3MoJ2xlZnQnLCAkKHRoaXMpLnBvc2l0aW9uKCkubGVmdCk7ICAvLyBnZXQgaG92ZXIgbWVudSBpdGVtIHBvc2l0aW9uIGFuZCB3aWR0aFxyXG5cdH0pO1xyXG5cclxuXHQvLyByZXR1cm4gdG8gdGhlIG9yaWdpbmFsIHBvc2l0aW9uIG9mIHRoZSBhY3RpdmUgbGlzdCBpdGVtXHJcblx0JCgnLmhlYWRlcl9fbWVudScpLm1vdXNlbGVhdmUoZnVuY3Rpb24oKSB7XHJcblx0XHQkYmFyLmNzcygnd2lkdGgnLCBiYXJXaWR0aCkuY3NzKCdsZWZ0JywgYmFyTGVmdCk7XHJcblx0fSk7XHJcblxyXG5cdC8vINGBaGFuZ2luZyB0aGUgYWN0aXZlIG1lbnUgaXRlbVxyXG5cdCQoJy5oZWFkZXJfX21lbnUgbGknKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdGJhckxlZnQgPSAgJCh0aGlzKS5wb3NpdGlvbigpLmxlZnQ7XHJcblx0XHRiYXJXaWR0aCA9ICQodGhpcykud2lkdGgoKTtcclxuXHRcdCQoJy5oZWFkZXJfX21lbnUgbGknKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHQkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHR9KTtcclxufSk7XHJcblxyXG4vLyDQt9Cw0LTQsNC10Lwg0L7QtNC40L3QsNC60L7QstGD0Y4g0LLRi9GB0L7RgtGDINCy0YHQtdC8INCx0LvQvtC60LDQvFxyXG5mdW5jdGlvbiBzYW1lSGVpZ2h0KGJsb2NrKSB7XHJcblx0aWYoJCgnKicpLmlzKGJsb2NrKSkge1xyXG5cdFx0dmFyIG1heEhlaWdodCA9IDA7XHJcbiAgICAgICAgJChibG9jaykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBoX2Jsb2NrID0gcGFyc2VJbnQoJCh0aGlzKS5oZWlnaHQoKSk7XHJcbiAgICAgICAgICAgIGlmKGhfYmxvY2sgPiBtYXhIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIG1heEhlaWdodCA9IGhfYmxvY2s7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChibG9jaykuaGVpZ2h0KG1heEhlaWdodCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vINC30LDQtNCw0LXQvCDQvtC00LjQvdCw0LrQvtCy0YPRjiDQstGL0YHQvtGC0YMg0LLRgdC10Lwg0LHQu9C+0LrQsNC8INGBINGD0YfQtdGC0L7QvCDQvtGC0YHRgtGD0L/QvtCyXHJcbmZ1bmN0aW9uIHNhbWVPdXRlckhlaWdodChibG9jaykge1xyXG5cdGlmKCQoJyonKS5pcyhibG9jaykpIHtcclxuXHRcdHZhciBtYXhIZWlnaHQgPSAwO1xyXG4gICAgICAgICQoYmxvY2spLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgaF9ibG9jayA9IHBhcnNlSW50KCQodGhpcykub3V0ZXJIZWlnaHQoKSk7XHJcbiAgICAgICAgICAgIGlmKGhfYmxvY2sgPiBtYXhIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIG1heEhlaWdodCA9IGhfYmxvY2s7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChibG9jaykuaGVpZ2h0KG1heEhlaWdodCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vINC+0L/RgNC10LTQtdC70Y/QtdC8INC70LXQstGL0Lkg0L7RgtGB0YLRg9C/IC5pbmNhYkZlYXR1cmVzX19pbmZvINCyINCx0LvQvtC60LUgLmluY2FiRmVhdHVyZXNcclxuZnVuY3Rpb24gaW5jYWJGZWF0dXJlcygpIHtcdFxyXG4gICAgaWYoJCgnKicpLmlzKCcuaW5jYWJGZWF0dXJlcycpKSB7XHJcbiAgICBcdCQoJy5pbmNhYkZlYXR1cmVzJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgIFx0XHR2YXIgbGVmdCA9ICQodGhpcykuZmluZCgnLmluY2FiRmVhdHVyZXNfX2NvdW50JykucG9zaXRpb24oKS5sZWZ0O1xyXG4gICAgXHRcdCQodGhpcykuZmluZCgnLmluY2FiRmVhdHVyZXNfX2luZm8nKS5jc3MoJ2xlZnQnLGxlZnQpOyAgICBcdFx0XHJcbiAgICBcdH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vINGB0LbQuNC80LDQtdC8INCx0LvQvtC6INC90LAgMzBweCBcclxuZnVuY3Rpb24gcGluY2goKSB7XHJcblx0aWYoJCgnKicpLmlzKCcucGluY2gnKSkge1xyXG5cdFx0JCgnLnBpbmNoJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHcgPSAkKHRoaXMpLndpZHRoKCk7XHJcblx0XHRcdCQodGhpcykud2lkdGgody0zMCk7XHJcblx0XHR9KTtcdFx0XHJcblx0fVx0XHJcbn1cclxuXHJcbnZhciBzbGlja1RyaWdnZXIgPSBmYWxzZTtcclxudmFyIHNlYXJjaFRyaWdnZXIgPSBmYWxzZTtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblx0c2FtZUhlaWdodCgnLmZvdXJQX19vdmVyJyk7XHRcdFxyXG5cdGluY2FiRmVhdHVyZXMoKTtcclxuXHRwaW5jaCgpO1xyXG5cdGlmKCQod2luZG93KS53aWR0aCgpID49IDEwMjQpIFxyXG5cdFx0c2FtZUhlaWdodCgnLnVzZWZ1bC1jb2wnKTtcdFxyXG5cclxuXHQvLyDQsNC90LjQvNCw0YbQuNGPINC/0L7QuNGB0LrQsCDQsiDRiNCw0L/QutC1XHJcblx0JCgnLmhlYWRlcl9fc2VhcmNoIC5zZWFyY2hGb3JtX19idXR0b24nKS5jbGljayhmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHQkKCcuaGVhZGVyX19zZWFyY2ggLnNlYXJjaEZvcm1fX2lucHV0JykuYWRkQ2xhc3MoJ3NsaWRlJyk7XHJcblx0XHQkKCcuaGVhZGVyX19zZWFyY2ggLnNlYXJjaEZvcm1fX2lucHV0JykuZm9jdXMoKTtcclxuXHRcdCQoJy5oZWFkZXJfX3NlYXJjaCcpLmFkZENsYXNzKCdzbGlkZScpO1xyXG5cdFx0c2VhcmNoVHJpZ2dlciA9IHRydWU7XHJcblx0fSk7XHJcblxyXG5cdCQoJy5oZWFkZXJfX3NlYXJjaCAuc2VhcmNoRm9ybV9faW5wdXQnKS5mb2N1c291dChmdW5jdGlvbigpIHtcclxuXHRcdGlmKCEkKCcuaGVhZGVyX19zZWFyY2ggLnNlYXJjaEZvcm1fX2lucHV0JykudmFsKCkpIHtcclxuXHRcdFx0JCgnLmhlYWRlcl9fc2VhcmNoIC5zZWFyY2hGb3JtX19pbnB1dCcpLnJlbW92ZUNsYXNzKCdzbGlkZScpO1xyXG5cdFx0XHQkKCcuaGVhZGVyX19zZWFyY2gnKS5yZW1vdmVDbGFzcygnc2xpZGUnKTtcclxuXHRcdH1cclxuXHR9KVxyXG5cdFxyXG5cdC8vIDTQnyDRgtGA0LjQs9Cz0LXRgFxyXG5cdGlmKCQoJyonKS5pcygnLmZvdXJQV3JhcCcpICYmICQod2luZG93KS53aWR0aCgpIDw9IDc2NyAmJiAhc2xpY2tUcmlnZ2VyKSB7XHJcblx0XHQkKCcuZm91clBXcmFwIC5jb2wteHMtMTInKS5zbGljayh7XHJcblx0XHQgIHNsaWRlc1RvU2hvdzogMSxcclxuXHRcdCAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblx0XHQgIGFycm93czogZmFsc2VcclxuXHRcdH0pO1xyXG5cdFx0c2xpY2tUcmlnZ2VyID0gdHJ1ZTtcclxuXHR9IGVsc2UgaWYoJCgnKicpLmlzKCcuZm91clBXcmFwJykgJiYgJCh3aW5kb3cpLndpZHRoKCkgPj0gNzY4ICYmIHNsaWNrVHJpZ2dlcikge1xyXG5cdFx0JCgnLmZvdXJQV3JhcCAuY29sLXhzLTEyJykuc2xpY2soJ2Rlc3Ryb3knKTtcclxuXHRcdHNsaWNrVHJpZ2dlciA9IGZhbHNlO1xyXG5cdH1cclxuXHJcblx0Ly8g0LDQvdC40LzQsNGG0LjRjyDQsdC70L7QutC+0LIgNNCfXHJcblx0aWYoJCgnKicpLmlzKCcuZm91clAnKSkge1xyXG5cdFx0JCgnLmZvdXJQJykuaG92ZXIoZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBsZWZ0ID0gJCh0aGlzKS5wb3NpdGlvbigpLmxlZnQsXHJcblx0XHRcdFx0cmlnaHQgPSAkKCcuZm91clBXcmFwIC5jb2wteHMtMTInKS53aWR0aCgpIC0gKCQodGhpcykucG9zaXRpb24oKS5sZWZ0ICsgICQodGhpcykud2lkdGgoKSlcclxuXHRcdFx0JCh0aGlzKS5zaWJsaW5ncygpLmNzcygncG9pbnRlci1ldmVudHMnLCdub25lJyk7XHJcblx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHQkKHRoaXMpLmZpbmQoJy5mb3VyUF9fdW5kZXInKS5hbmltYXRlKHtcclxuXHRcdFx0XHRsZWZ0OiAtbGVmdCxcclxuXHRcdFx0XHRyaWdodDogLXJpZ2h0LFxyXG5cdFx0XHR9LDEwMCk7XHJcblx0XHR9KTtcclxuXHRcdCQoJy5mb3VyUFdyYXAgLmZvdXJQJykubW91c2VsZWF2ZShmdW5jdGlvbigpIHtcclxuXHRcdFx0JCgnLmZvdXJQJykuY3NzKCdwb2ludGVyLWV2ZW50cycsJ2FsbCcpO1xyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCQoJy5mb3VyUCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0fSwwKTtcclxuXHRcdFx0JCh0aGlzKS5maW5kKCcuZm91clBfX3VuZGVyJykuYW5pbWF0ZSh7XHJcblx0XHRcdFx0bGVmdDogJzUwJScsXHJcblx0XHRcdFx0cmlnaHQ6ICc1MCUnLFxyXG5cdFx0XHR9LDIwMCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8vINCk0LjQu9GM0YLRgNCw0YbQuNGPINC60LDQsdC10LvQtdC5INCyINC60LDRgtC10LPQvtGA0LjQuFxyXG5cdGlmKCQoJyonKS5pcygnLmNhdGVnb3J5X19uYXYnKSkge1xyXG5cdFx0dmFyIHcgPSAkKCcuY2FibGVJdGVtJykud2lkdGgoKTtcclxuXHRcdCQoJy5jYXRlZ29yeV9fbmF2IGEnKS5jbGljayhmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcdFx0XHRcclxuXHJcblx0XHRcdGlmKCQoJy5jYXRlZ29yeScpLmZpbmQoJy5jYWJsZUl0ZW1bZGF0YS10YXJnZXQ9XCInICsgJCh0aGlzKS5hdHRyKCdkYXRhLXRhcmdldCcpICsgJ1wiXScpLmhhc0NsYXNzKCdjYWJsZUl0ZW0taGlkZScpKSB7XHJcblx0XHRcdFx0JCgnLmNhdGVnb3J5JylcclxuXHRcdFx0XHQuZmluZCgnLmNhYmxlSXRlbVtkYXRhLXRhcmdldD1cIicgKyAkKHRoaXMpLmF0dHIoJ2RhdGEtdGFyZ2V0JykgKyAnXCJdJylcclxuXHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2NhYmxlSXRlbS1oaWRlJylcclxuXHRcdFx0XHQuYW5pbWF0ZSh7XHJcblx0XHRcdFx0XHR3aWR0aDogdyxcclxuXHRcdFx0XHRcdCdtYXJnaW4tbGVmdCc6IDE1LFxyXG5cdFx0XHRcdFx0J21hcmdpbi1yaWdodCc6IDE1XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0JCgnLmNhdGVnb3J5JylcclxuXHRcdFx0XHQuZmluZCgnLmNhYmxlSXRlbTpub3QoW2RhdGEtdGFyZ2V0PVwiJyArICQodGhpcykuYXR0cignZGF0YS10YXJnZXQnKSArICdcIl0pJylcclxuXHRcdFx0XHQuYWRkQ2xhc3MoJ2NhYmxlSXRlbS1oaWRlJyk7XHJcblx0XHRcdFx0JCgnLmNhYmxlSXRlbS5jYWJsZUl0ZW0taGlkZScpXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0LmNzcygnd2lkdGgnLCcwJylcclxuXHRcdFx0XHRcdC5jc3MoJ21hcmdpbicsJzAnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkKCcuY2F0ZWdvcnknKVxyXG5cdFx0XHRcdC5maW5kKCcuY2FibGVJdGVtOm5vdChbZGF0YS10YXJnZXQ9XCInICsgJCh0aGlzKS5hdHRyKCdkYXRhLXRhcmdldCcpICsgJ1wiXSknKVxyXG5cdFx0XHRcdC5hZGRDbGFzcygnY2FibGVJdGVtLWhpZGUnKTtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0JCgnLmNhYmxlSXRlbS5jYWJsZUl0ZW0taGlkZScpXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0LmFuaW1hdGUoe1xyXG5cdFx0XHRcdFx0XHR3aWR0aDogMCxcclxuXHRcdFx0XHRcdCBcdCdtYXJnaW4nOiAwXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9LDEwMCk7XHJcblx0XHRcdH1cdFx0XHRcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Ly8g0YLQvtGH0LrQuCDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0LrQsNCx0LXQu9GPXHJcblx0aWYoJCgnKicpLmlzKCcuY2FibGVfX2RvdCcpKSB7XHJcblx0XHQkKCcuY2FibGVfX2RvdCcpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBwYXJlbnRIZWlnaHQgPSAkKHRoaXMpLnBhcmVudCgpLm91dGVySGVpZ2h0KCk7XHJcblx0XHRcdHZhciBkb3RQb3NpdGlvbiA9ICQodGhpcykucG9zaXRpb24oKS50b3A7XHJcblx0XHRcdCQodGhpcykuY3NzKCdoZWlnaHQnLCBwYXJlbnRIZWlnaHQgLSBkb3RQb3NpdGlvbiAtIDQ4KTtcclxuXHRcdFx0JCh0aGlzKS5maW5kKCcuY2FibGVfX3BhcnROdW1iZXInKS5ob3ZlcihmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkKHRoaXMpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKCdzaG93Jyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cdFxyXG5cdC8vINGB0LvQsNC50LTQtdGAINGBINC/0LDQs9C40L3QsNGG0LjQtdC5XHJcbiAgICBpZigkKCcqJykuaGFzQ2xhc3MoJ2RvdFNsaWRlcicpKSB7XHJcbiAgICBcdHZhciBkb3RTd2lwZXIgPSBuZXcgU3dpcGVyKCcuZG90U2xpZGVyJywge1xyXG5cdCAgICAgIHBhZ2luYXRpb246IHtcclxuXHQgICAgICAgIGVsOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuXHQgICAgICB9LFxyXG5cdCAgICB9KTtcclxuXHJcblx0ICAgIGlmKCQoJy5kb3RTbGlkZXIgLnN3aXBlci1zbGlkZScpLmxlbmd0aCA8PSAxKSB7XHJcblx0ICAgIFx0JCgnLmRvdFNsaWRlciAuc3dpcGVyLXBhZ2luYXRpb24nKS5oaWRlKCk7XHJcblx0ICAgIFx0JCgnLmRvdFNsaWRlcicpLmNzcygncG9pbnRlci1ldmVudHMnLCdub25lJyk7XHJcblx0ICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBib290c3RyYXAgdGFic1xyXG5cdGlmKCQoJyonKS5oYXNDbGFzcygnbmF2LXRhYnMnKSkge1xyXG5cdFx0JCgnLm5hdi10YWJzJykuYXBwZW5kKFwiPHNwYW4gY2xhc3M9J2Jhcic+PC9zcGFuPlwiKTsgLy8gY3JlYXRlIG5ldyBlbGVtZW50XHJcblx0XHR2YXIgJGJhciA9ICQoJy5uYXYtdGFicyAuYmFyJyk7XHJcblx0XHR2YXIgYmFyTGVmdCA9ICAkKCcubmF2LXRhYnMgbGkuYWN0aXZlJykucG9zaXRpb24oKS5sZWZ0O1xyXG5cdFx0dmFyIGJhcldpZHRoID0gJCgnLm5hdi10YWJzIGxpLmFjdGl2ZScpLndpZHRoKCk7XHJcblx0XHQkYmFyLmNzcygnd2lkdGgnLCBiYXJXaWR0aCkuY3NzKCdsZWZ0JywgYmFyTGVmdCk7XHJcblxyXG5cdFx0Ly8gZ2V0IGhvdmVyIG1lbnUgaXRlbSBwb3NpdGlvbiBhbmQgd2lkdGhcclxuXHRcdCQoJy5uYXYtdGFicyBsaScpLmhvdmVyKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkYmFyLmNzcygnd2lkdGgnLCAkKHRoaXMpLndpZHRoKCkpLmNzcygnbGVmdCcsICQodGhpcykucG9zaXRpb24oKS5sZWZ0KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIHJldHVybiB0byB0aGUgb3JpZ2luYWwgcG9zaXRpb24gb2YgdGhlIGFjdGl2ZSBsaXN0IGl0ZW1cclxuXHRcdCQoJy5uYXYtdGFicycpLm1vdXNlbGVhdmUoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCRiYXIuY3NzKCd3aWR0aCcsIGJhcldpZHRoKS5jc3MoJ2xlZnQnLCBiYXJMZWZ0KTsgIFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8g0YFoYW5naW5nIHRoZSBhY3RpdmUgbWVudSBpdGVtXHJcblx0XHQkKCcubmF2LXRhYnMgbGknKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0YmFyTGVmdCA9ICAkKHRoaXMpLnBvc2l0aW9uKCkubGVmdDtcclxuXHRcdFx0YmFyV2lkdGggPSAkKHRoaXMpLndpZHRoKCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8vINGB0LXQu9C10LrRgtGLXHJcblx0aWYoJCgnKicpLmhhc0NsYXNzKCdjdXN0b20tc2VsZWN0JykpIHtcclxuXHRcdCQoXCIuY3VzdG9tLXNlbGVjdFwiKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0ICB2YXIgY2xhc3NlcyA9ICQodGhpcykuYXR0cihcImNsYXNzXCIpLFxyXG5cdFx0ICAgICAgaWQgICAgICA9ICQodGhpcykuYXR0cihcImlkXCIpLFxyXG5cdFx0ICAgICAgbmFtZSAgICA9ICQodGhpcykuYXR0cihcIm5hbWVcIik7XHJcblx0XHQgIHZhciB0ZW1wbGF0ZSA9ICAnPGRpdiBjbGFzcz1cIicgKyBjbGFzc2VzICsgJ1wiPic7XHJcblx0XHQgICAgICB0ZW1wbGF0ZSArPSAnPHNwYW4gY2xhc3M9XCJjdXN0b20tc2VsZWN0LXRyaWdnZXJcIj4nICsgJCh0aGlzKS5hdHRyKFwicGxhY2Vob2xkZXJcIikgKyAnPC9zcGFuPic7XHJcblx0XHQgICAgICB0ZW1wbGF0ZSArPSAnPGRpdiBjbGFzcz1cImN1c3RvbS1vcHRpb25zXCI+JztcclxuXHRcdCAgICAgICQodGhpcykuZmluZChcIm9wdGlvblwiKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0ICAgICAgICB0ZW1wbGF0ZSArPSAnPHNwYW4gY2xhc3M9XCJjdXN0b20tb3B0aW9uXCIgZGF0YS12YWx1ZT1cIicgKyAkKHRoaXMpLmF0dHIoXCJ2YWx1ZVwiKSArICdcIj4nICsgJCh0aGlzKS5odG1sKCkgKyAnPC9zcGFuPic7XHJcblx0XHQgICAgICB9KTtcclxuXHRcdCAgdGVtcGxhdGUgKz0gJzwvZGl2PjwvZGl2Pic7XHJcblx0XHQgIFxyXG5cdFx0ICAkKHRoaXMpLndyYXAoJzxkaXYgY2xhc3M9XCJjdXN0b20tc2VsZWN0LXdyYXBwZXJcIj48L2Rpdj4nKTtcclxuXHRcdCAgJCh0aGlzKS5oaWRlKCk7XHJcblx0XHQgICQodGhpcykuYWZ0ZXIodGVtcGxhdGUpO1xyXG5cdFx0fSk7XHJcblx0XHQkKCcuY3VzdG9tLW9wdGlvbnMgLmN1c3RvbS1vcHRpb25bZGF0YS12YWx1ZT1cIicrICQoJy5jdXN0b20tc2VsZWN0IG9wdGlvbi5zZWxlY3Rpb24nKS5hdHRyKCd2YWx1ZScpICsnXCJdJykuYWRkQ2xhc3MoJ3NlbGVjdGlvbicpO1xyXG5cdFx0JChcIi5jdXN0b20tb3B0aW9uOmZpcnN0LW9mLXR5cGVcIikuaG92ZXIoZnVuY3Rpb24oKSB7XHJcblx0XHQgICQodGhpcykucGFyZW50cyhcIi5jdXN0b20tb3B0aW9uc1wiKS5hZGRDbGFzcyhcIm9wdGlvbi1ob3ZlclwiKTtcclxuXHRcdH0sIGZ1bmN0aW9uKCkge1xyXG5cdFx0ICAkKHRoaXMpLnBhcmVudHMoXCIuY3VzdG9tLW9wdGlvbnNcIikucmVtb3ZlQ2xhc3MoXCJvcHRpb24taG92ZXJcIik7XHJcblx0XHR9KTtcclxuXHRcdCQoXCIuY3VzdG9tLXNlbGVjdC10cmlnZ2VyXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdCAgJCgnaHRtbCcpLm9uZSgnY2xpY2snLGZ1bmN0aW9uKCkge1xyXG5cdFx0ICAgICQoXCIuY3VzdG9tLXNlbGVjdFwiKS5yZW1vdmVDbGFzcyhcIm9wZW5lZFwiKTtcclxuXHRcdCAgfSk7XHJcblx0XHQgICQodGhpcykucGFyZW50cyhcIi5jdXN0b20tc2VsZWN0XCIpLnRvZ2dsZUNsYXNzKFwib3BlbmVkXCIpO1xyXG5cdFx0ICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdH0pO1xyXG5cdFx0JChcIi5jdXN0b20tb3B0aW9uXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcblx0XHQgICQodGhpcykucGFyZW50cyhcIi5jdXN0b20tc2VsZWN0LXdyYXBwZXJcIikuZmluZChcInNlbGVjdFwiKS52YWwoJCh0aGlzKS5kYXRhKFwidmFsdWVcIikpO1xyXG5cdFx0ICAkKHRoaXMpLnBhcmVudHMoXCIuY3VzdG9tLW9wdGlvbnNcIikuZmluZChcIi5jdXN0b20tb3B0aW9uXCIpLnJlbW92ZUNsYXNzKFwic2VsZWN0aW9uXCIpO1xyXG5cdFx0ICAkKHRoaXMpLmFkZENsYXNzKFwic2VsZWN0aW9uXCIpO1xyXG5cdFx0ICAkKHRoaXMpLnBhcmVudHMoXCIuY3VzdG9tLXNlbGVjdFwiKS5yZW1vdmVDbGFzcyhcIm9wZW5lZFwiKTtcclxuXHRcdCAgJCh0aGlzKS5wYXJlbnRzKFwiLmN1c3RvbS1zZWxlY3RcIikuZmluZChcIi5jdXN0b20tc2VsZWN0LXRyaWdnZXJcIikudGV4dCgkKHRoaXMpLnRleHQoKSk7XHJcblx0XHQgIGNoYW5nZVRhYmxlKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRjaGFuZ2VUYWJsZSgpO1xyXG5cdFx0ZnVuY3Rpb24gY2hhbmdlVGFibGUoKSB7XHJcblx0XHRcdHZhciBhY3RpdmVPcHRpb24gPSAkKCcuY3VzdG9tLXNlbGVjdCAuY3VzdG9tLW9wdGlvbi5zZWxlY3Rpb24nKS5hdHRyKCdkYXRhLXZhbHVlJyk7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdBY3RpdmUgb3B0aW9uOiAnICsgYWN0aXZlT3B0aW9uKTtcclxuXHRcdFx0JCgnLmNhYmxlT3B0aW9uc19fdGFibGUgdGFibGUnKS5oaWRlKCk7XHJcblx0XHRcdCQoJy5jYWJsZU9wdGlvbnNfX3RhYmxlIHRhYmxlW2RhdGEtdmFsdWU9XCInKyBhY3RpdmVPcHRpb24gKydcIl0nKS5zaG93KCk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0Ly8g0YHQu9Cw0LnQtNC10YAg0YEg0LzQuNC90LjQsNGC0Y7RgNCw0LzQuFxyXG5cdGlmKCQoJyonKS5oYXNDbGFzcygndGh1bWJTbGlkZXJNYWluJykpICB7XHRcdFxyXG5cdFx0ICQoJy50aHVtYlNsaWRlck1haW4nKS5zbGljayh7XHJcblx0XHQgIHNsaWRlc1RvU2hvdzogMSxcclxuXHRcdCAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblx0XHQgIGFycm93czogZmFsc2UsXHJcblx0XHQgIGZhZGU6IHRydWUsXHJcblx0XHQgIGFzTmF2Rm9yOiAnLnRodW1iU2xpZGVyTmF2J1xyXG5cdFx0fSk7XHJcblx0XHQkKCcudGh1bWJTbGlkZXJOYXYnKS5zbGljayh7XHJcblx0XHQgIHNsaWRlc1RvU2hvdzogMyxcclxuXHRcdCAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblx0XHQgIGFzTmF2Rm9yOiAnLnRodW1iU2xpZGVyTWFpbicsXHJcblx0XHQgIGluZmluaXRlOiB0cnVlLFxyXG5cdFx0ICBhcnJvd3M6IGZhbHNlLFxyXG5cdFx0ICBjZW50ZXJNb2RlOiB0cnVlLFxyXG5cdFx0ICBmb2N1c09uU2VsZWN0OiB0cnVlLFxyXG5cdFx0ICB2YXJpYWJsZVdpZHRoOiB0cnVlXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8vINC/0L7QtNCz0L7QvSDRgtC+0YfQtdC6INC/0L4g0YDQsNC30LzQtdGA0YMg0LrQsNGA0YLQuNC90LrQuFxyXG5cdGlmKCQoJyonKS5oYXNDbGFzcygnY2FibGVfX2ltZ1dyYXAnKSAmJiAkKHdpbmRvdykud2lkdGgoKSA+PSAxMDI0KSB7XHJcblx0XHQkKCcuY2FibGVfX2ltZ1dyYXAnKS5jc3MoJ3dpZHRoJywkKHRoaXMpLmZpbmQoJy5jYWJsZV9faW1nJykud2lkdGgoKSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJy5jYWJsZV9faW1nV3JhcCcpLmNzcygnd2lkdGgnLCcxMDAlJyk7XHJcblx0fVxyXG5cclxuXHQvLyDQv9C+0LTQs9C+0L0g0LLRi9GB0L7RgtGLINGB0LXQutGG0LjQuCDQv9C+INGA0LDQt9C80LXRgNGDINCy0LjQtNC10L5cclxuXHRpZigkKCcqJykuaGFzQ2xhc3MoJ21haW5WaWRlbycpICYmICQod2luZG93KS53aWR0aCgpIDw9IDEwMjMgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA0MTQpIHtcclxuXHRcdCQoJy5tYWluVmlkZW8nKS5jc3MoJ2hlaWdodCcsJCgnLm1haW5WaWRlb19fdmlkZW8nKS5oZWlnaHQoKSk7XHJcblx0fSBlbHNlIGlmKCQoJyonKS5oYXNDbGFzcygnbWFpblZpZGVvJykgJiYgJCh3aW5kb3cpLndpZHRoKCkgPCA0MTQpIHtcclxuXHRcdCQoJy5tYWluVmlkZW8nKS5jc3MoJ2hlaWdodCcsJycpO1xyXG5cdH1cclxuXHJcblx0Ly8g0L/QtdGA0LXQstC+0LQg0LrQsNCx0LXQu9GM0L3QvtCz0L4g0LzQtdC90Y4g0LIg0LPQvtGA0LjQt9C+0L3RgtCw0LvRjNC90YvQuSDQstC40LRcclxuXHRpZigkKCcqJykuaGFzQ2xhc3MoJ2NhYmxlTWVudVdyYXAnKSAmJiAkKHdpbmRvdykud2lkdGgoKSA8PSA3NjcpIHtcclxuXHRcdHZhciB3ID0gMDtcclxuXHRcdCQoJy5jYWJsZU1lbnUnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR3ICs9ICQodGhpcykud2lkdGgoKTtcdFx0XHRcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJy5jYWJsZU1lbnVXcmFwJykuY3NzKCdtaW4td2lkdGgnLHcpO1xyXG5cdFx0Y29uc29sZS5sb2coJ0NhYmxlIG1lbnUgd2lkdGg6ICcgKyB3KTtcclxuXHR9XHJcblxyXG5cdC8vINC/0L7QtNCz0L7QvSDQstGL0YHQvtGC0Ysg0LrQsNGA0YLQuNC90LrQuCDQutC+0YDQvtGC0LrQuNGFINC90L7QstC+0YHRgtC10LlcclxuXHRpZigkKCcqJykuaGFzQ2xhc3MoJ3NlY29uZEV2ZW50cycpICYmICQod2luZG93KS53aWR0aCgpIDw9IDc2NylcclxuXHRcdCQoJy5zZWNvbmRFdmVudHMgLm1haW5FdmVudF9faW1nJykuY3NzKCdoZWlnaHQnLCQoJy5zZWNvbmRFdmVudHMgLm1haW5FdmVudF9faW5mbycpLm91dGVySGVpZ2h0KCkpO1xyXG5cdFxyXG5cclxuXHQvLyDRgdC+0LfQtNCw0L3QuNC1INC80L7QsdC40LvRjNC90L7Qs9C+INC80LXQvdGOXHJcblx0aWYoISQoJyonKS5oYXNDbGFzcygnaGFtYnVyZ2VyJykgJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY3KSB7XHJcblx0XHQkKCcuaGVhZGVyIC5yb3cnKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJoYW1idXJnZXJcIj48c3Bhbj48L3NwYW4+PC9kaXY+Jyk7XHJcblx0fSBlbHNlIGlmKCQoJyonKS5oYXNDbGFzcygnaGFtYnVyZ2VyJykgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjcpIHtcclxuXHRcdCQoJy5oYW1idXJnZXInKS5oaWRlKCk7XHJcblx0fSBlbHNlIGlmKCQoJyonKS5oYXNDbGFzcygnaGFtYnVyZ2VyJykgJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY3KSB7XHJcblx0XHQkKCcuaGFtYnVyZ2VyJykuc2hvdygpO1xyXG5cdH1cclxuXHJcbn0pO1xyXG5cclxuJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcclxuXHRzYW1lSGVpZ2h0KCcuZm91clBfX292ZXInKTtcclxuXHRpbmNhYkZlYXR1cmVzKCk7XHRcclxuXHQvLyA00J8g0YLRgNC40LPQs9C10YBcclxuXHRpZigkKCcqJykuaXMoJy5mb3VyUFdyYXAnKSAmJiAkKHdpbmRvdykud2lkdGgoKSA8PSA3NjcgJiYgIXNsaWNrVHJpZ2dlcikge1xyXG5cdFx0JCgnLmZvdXJQV3JhcCAuY29sLXhzLTEyJykuc2xpY2soe1xyXG5cdFx0ICBzbGlkZXNUb1Nob3c6IDEsXHJcblx0XHQgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cdFx0ICBhcnJvd3M6IGZhbHNlXHJcblx0XHR9KTtcclxuXHRcdHNsaWNrVHJpZ2dlciA9IHRydWU7XHJcblx0fSBlbHNlIGlmKCQoJyonKS5pcygnLmZvdXJQV3JhcCcpICYmICQod2luZG93KS53aWR0aCgpID49IDc2OCAmJiBzbGlja1RyaWdnZXIpIHtcclxuXHRcdCQoJy5mb3VyUFdyYXAgLmNvbC14cy0xMicpLnNsaWNrKCdkZXN0cm95Jyk7XHJcblx0XHRzbGlja1RyaWdnZXIgPSBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8vINC/0L7QtNCz0L7QvSDRgtC+0YfQtdC6INC/0L4g0YDQsNC30LzQtdGA0YMg0LrQsNGA0YLQuNC90LrQuFxyXG5cdGlmKCQoJyonKS5oYXNDbGFzcygnY2FibGVfX2ltZ1dyYXAnKSAmJiAkKHdpbmRvdykud2lkdGgoKSA+PSAxMDI0KSB7XHJcblx0XHQkKCcuY2FibGVfX2ltZ1dyYXAnKS5jc3MoJ3dpZHRoJywkKHRoaXMpLmZpbmQoJy5jYWJsZV9faW1nJykud2lkdGgoKSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJy5jYWJsZV9faW1nV3JhcCcpLmNzcygnd2lkdGgnLCcxMDAlJyk7XHJcblx0fVxyXG5cclxuXHQvLyDQv9C+0LTQs9C+0L0g0LLRi9GB0L7RgtGLINGB0LXQutGG0LjQuCDQv9C+INGA0LDQt9C80LXRgNGDINCy0LjQtNC10L5cclxuXHRpZigkKCcqJykuaGFzQ2xhc3MoJ21haW5WaWRlbycpICYmICQod2luZG93KS53aWR0aCgpIDw9IDEwMjMgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA0MTQpIHtcclxuXHRcdCQoJy5tYWluVmlkZW8nKS5jc3MoJ2hlaWdodCcsJCgnLm1haW5WaWRlb19fdmlkZW8nKS5oZWlnaHQoKSk7XHJcblx0fSBlbHNlIGlmKCQoJyonKS5oYXNDbGFzcygnbWFpblZpZGVvJykgJiYgJCh3aW5kb3cpLndpZHRoKCkgPCA0MTQpIHtcclxuXHRcdCQoJy5tYWluVmlkZW8nKS5jc3MoJ2hlaWdodCcsJycpO1xyXG5cdH1cclxuXHJcblx0Ly8g0YHQvtC30LTQsNC90LjQtSDQvNC+0LHQuNC70YzQvdC+0LPQviDQvNC10L3RjlxyXG5cdGlmKCEkKCcqJykuaGFzQ2xhc3MoJ2hhbWJ1cmdlcicpICYmICQod2luZG93KS53aWR0aCgpIDw9IDc2Nykge1xyXG5cdFx0JCgnLmhlYWRlciAucm93JykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiaGFtYnVyZ2VyXCI+PHNwYW4+PC9zcGFuPjwvZGl2PicpO1xyXG5cdH0gZWxzZSBpZigkKCcqJykuaGFzQ2xhc3MoJ2hhbWJ1cmdlcicpICYmICQod2luZG93KS53aWR0aCgpID4gNzY3KSB7XHJcblx0XHQkKCcuaGFtYnVyZ2VyJykuaGlkZSgpO1xyXG5cdH0gZWxzZSBpZigkKCcqJykuaGFzQ2xhc3MoJ2hhbWJ1cmdlcicpICYmICQod2luZG93KS53aWR0aCgpIDw9IDc2Nykge1xyXG5cdFx0JCgnLmhhbWJ1cmdlcicpLnNob3coKTtcclxuXHR9XHJcblxyXG5cdC8vINC/0L7QtNCz0L7QvSDQstGL0YHQvtGC0Ysg0LrQsNGA0YLQuNC90LrQuCDQutC+0YDQvtGC0LrQuNGFINC90L7QstC+0YHRgtC10LlcclxuXHRpZigkKCcqJykuaGFzQ2xhc3MoJ3NlY29uZEV2ZW50cycpICYmICQod2luZG93KS53aWR0aCgpIDw9IDc2NylcclxuXHRcdCQoJy5zZWNvbmRFdmVudHMgLm1haW5FdmVudF9faW1nJykuY3NzKCdoZWlnaHQnLCQoJy5zZWNvbmRFdmVudHMgLm1haW5FdmVudF9faW5mbycpLm91dGVySGVpZ2h0KCkpO1xyXG59KTtcclxuXHJcbiQoZG9jdW1lbnQpLmJpbmQoJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xyXG4gICAgaWYoICQoZS50YXJnZXQpLmlzKCc6aW52YWxpZCcpICl7XHJcbiAgICAgICAgJChlLnRhcmdldCkuYWRkQ2xhc3MoJ2ludmFsaWQtaW5wdXQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJChlLnRhcmdldCkucmVtb3ZlQ2xhc3MoJ2ludmFsaWQtaW5wdXQnKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4kKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbigpeyBcclxuXHRjb25zb2xlLmxvZygnUEFHRV9PTkxPQUQnKTtcclxufSk7XHJcblxyXG4vLyDQutCw0YDRgtCwINCyINC60L7QvdGC0LDQutGC0LDRhVxyXG5pZigkKCcqJykuaGFzQ2xhc3MoJ29mZmljZV9fbWFwJykpIHtcclxuXHR2YXIgbWFwT2ZmaWNlO1xyXG5cdHltYXBzLnJlYWR5KGluaXQpO1xyXG5cclxuXHRmdW5jdGlvbiBpbml0ICgpIHtcclxuXHQgICAgLy8g0KHQvtC30LTQsNC90LjQtSDRjdC60LfQtdC80L/Qu9GP0YDQsCDQutCw0YDRgtGLINC4INC10LPQviDQv9GA0LjQstGP0LfQutCwINC6INC60L7QvdGC0LXQudC90LXRgNGDXHJcblx0ICAgIG1hcE9mZmljZSA9IG5ldyB5bWFwcy5NYXAoJ21hcE9mZmljZScsIHtcclxuXHQgICAgICAgIC8vINGG0LXQvdGC0YAg0Lgg0LrQvtGN0YTRhNC40YbQuNC10L3RgiDQvNCw0YHRiNGC0LDQsdC40YDQvtCy0LDQvdC40Y8uXHJcblx0ICAgICAgICBjZW50ZXI6IFs1Ny45OTk5NjksIDU2LjI3MDg0M10sXHJcblx0ICAgICAgICB6b29tOiAxNlxyXG5cdCAgICB9LCB7XHJcblx0ICAgICAgICBzZWFyY2hDb250cm9sUHJvdmlkZXI6ICd5YW5kZXgjc2VhcmNoJ1xyXG5cdCAgICB9KTtcclxuXHJcblx0ICAgIG1hcE9mZmljZS5iZWhhdmlvcnMuZGlzYWJsZSgnc2Nyb2xsWm9vbScpOyBcclxuXHJcblx0fVxyXG59Il0sImZpbGUiOiJtYWluLmpzIn0=
