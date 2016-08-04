'use strict';

var Header = {

    init: function() {
        this.events();
    },

    fixed: function() {
        if ( jQuery(document).scrollTop() > jQuery('.header').innerHeight() ) {
            jQuery('.header-top').addClass('fixed');
            jQuery('body').css('paddingTop', jQuery('.header-top').innerHeight()+'px');
        } else {
            jQuery('.header-top').removeClass('fixed');
            jQuery('body').css('paddingTop', 0);
        }
    },

    showMobileMenu: function() {
        jQuery('body').addClass('mobile-menu-open');
    },

    hideMobileMenu: function() {
        jQuery('body').removeClass('mobile-menu-open');
    },

    toggleSubmenu: function(element) {
        var parent = element.closest('li'),
            submenu = jQuery(element.data('submenu'));

        parent.toggleClass('open');
        parent.find(submenu).slideToggle();
    },

    events: function() {

        // fixed
        jQuery(document).on('scroll', throttle(function() {
            Header.fixed();
        }, 0));

        if (!is_mobile) {
            $(window).on('resize', function() {
                Header.fixed();
            });
        } else {
            jQuery('.is-hover').removeClass('is-hover').addClass('is-touch');
            $(window).on('orientationchange', function() {
                setTimeout(function() {
                    Header.fixed();
                }, 500);
            });
        }

        //for tables
        if (is_mobile) {
            jQuery('.header-bottom-menu').on('click', '.header-bottom-menu-child.is-touch .header-bottom-menu-link, .header-submenu-main-child.is-touch .header-submenu-main-link', function(event) {
                if (!jQuery('body').hasClass('mobile-menu-open')) {
                    var child = jQuery(this),
                        parent = child.closest('li');

                    if (parent.hasClass('is-hover')) {
                        location.href = child.attr('href');
                    } else {
                        event.preventDefault();
                        parent.addClass('is-hover');
                    }
                }
            });
        }

        //for mobile
        jQuery('#show-navicon').click(function(event) {
            event.preventDefault();
            Header.showMobileMenu();
        });

        jQuery('#hide-navicon').click(function(event) {
            event.preventDefault();
            Header.hideMobileMenu();
        });

        jQuery('.header-bottom-menu').on('click', '.header-menu-button, .header-submenu-button', function(event) {
            event.preventDefault();
            Header.toggleSubmenu( jQuery(this) );
        });

    }
};
