'use strict';

jQuery(function() {

    if (jQuery('#js-main-slider').length) {
        jQuery('#js-main-slider').slick({
            fade: true,
            autoplay: true,
            autoplaySpeed: 3000,
            infinite: true,
            slidesToShow: 1,
            adaptiveHeight: true,
            arrows: true,
            prevArrow: '<button type="button" class="slick-prev"></button>',
            nextArrow: '<button type="button" class="slick-next"></button>',
            dots: true
        });
        jQuery('.slider-dots-child:first-child .slider-dots-item').addClass('active');
        jQuery('#js-main-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
          jQuery('.slider-dots-item').removeClass('active');
          jQuery('.slider-dots-child').eq(nextSlide).find('.slider-dots-item').addClass('active');
        });
        jQuery('.slider-dots-item').click(function() {
            var index = $(this).closest('.slider-dots-child').index();
            jQuery('.slider-dots-item').removeClass('active');
            jQuery(this).addClass('active');
            jQuery('#js-main-slider').slick('slickGoTo', index);
        });
    }

    if (jQuery('.js-carousel').length) {
        jQuery('.js-carousel').each(function(index, element) {
            var slides_to_show = jQuery(element).data('show'),
                slides_to_scroll = jQuery(element).data('scroll');

            jQuery(element).slick({
                infinite: true,
                slidesToShow: slides_to_show || 3,
                slidesToScroll: slides_to_scroll || 2,
                adaptiveHeight: true,
                arrows: true,
                dots: false,
                responsive: [
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: slides_to_show || 3,
                        slidesToScroll: slides_to_scroll || 2,
                        infinite: true,
                        dots: false
                      }
                    },
                    {
                      breakpoint: 667,
                      settings: {
                        slidesToShow: slides_to_show-1 || 2,
                        slidesToScroll: slides_to_scroll-1 || 1
                      }
                    },
                    {
                      breakpoint: 568,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                      }
                    }
                  ]
            });
        });

        jQuery('.js-carousel-prev').click(function(event) {
            event.preventDefault();

            var carousel = jQuery(this).closest('.section-body-carousel').find('.slick-initialized');

            if (carousel.length) {
                carousel.find('.slick-prev').click();
            }

        });

        jQuery('.js-carousel-next').click(function(event) {
            event.preventDefault();

            var carousel = jQuery(this).closest('.section-body-carousel').find('.slick-initialized');

            if (carousel.length) {
                carousel.find('.slick-next').click();
            }

        });
    }

    jQuery('.main-blog-item').on('mouseenter', function() {
        var element = jQuery(this),
            title = element.find('.main-blog-item-title'),
            article = element.find('article'),
            footer = element.find('footer');

        element.addClass('is-hover');
        title.stop().animate({
            'top' : '0px'
        }, 300, function() {
            article.css('opacity', '1');
            footer.css('opacity', '1');
        });

    });

    jQuery('.main-blog-item').on('mouseleave', function() {
        var element = jQuery(this),
            title = element.find('.main-blog-item-title'),
            article = element.find('article'),
            footer = element.find('footer');

        element.removeClass('is-hover');
        footer.css('opacity', '0');
        article.css('opacity', '0');
        title.stop().animate({
            'top' : '110px'
        }, 300);
    });

});
