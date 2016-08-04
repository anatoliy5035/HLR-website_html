'use strict';

var Popup = {

        scrollbar_width: 0,

        init: function() {
            this.getScrollbarWidth();
            this.events();
        },

        show: function(id) {
            jQuery('body').addClass('popup-open');
            jQuery('<div class="popup-bg"></div>').appendTo( jQuery('body') );
            jQuery(id).addClass('active');

            if ( jQuery(document).height() > jQuery(window).height() ) {
                jQuery('body').css('padding-right', this.scrollbar_width + 'px');
                jQuery(id).css('padding-right', this.scrollbar_width + 'px');
            }

            this.centerMode(id);

            jQuery(id).trigger("show.popup");

            setTimeout(function() {
                jQuery(id).trigger("shown.popup");
            }, 500);
        },

        hide: function(id) {
            jQuery('body').removeClass('popup-open').css('padding-right', 0);
            jQuery('.popup-bg').remove();
            jQuery(id).removeClass('active').css('padding-right', 0);

            jQuery(id).trigger("hide.popup");

            setTimeout(function() {
                jQuery(id).trigger("hidden.popup");
            }, 500);
        },

        centerMode: function(id) {
            var popup = jQuery(id).find('.popup'),
                images = popup.find('img');

            if (images.length) {
                popup.find('img').load(function() {
                    var popup_h = popup.height(),
                        margin = jQuery(window).height() - popup_h;
                    (margin > 0) ? popup.css('margin-top', (margin / 2) + 'px') : false;
                });
            } else {
                var popup_h = popup.height(),
                    margin = jQuery(window).height() - popup_h;
                (margin > 0) ? popup.css('margin-top', (margin / 2) + 'px') : false;
            }
        },

        getScrollbarWidth: function() {
            var div = document.createElement('div');

            div.style.overflowY = 'scroll';
            div.style.width = '50px';
            div.style.height = '50px';

            div.style.visibility = 'hidden';
            document.body.appendChild(div);
            this.scrollbar_width = div.offsetWidth - div.clientWidth;
            document.body.removeChild(div);
        },

        events: function() {
            jQuery('.popup-container').click(function(event) {
                if ( jQuery(event.target).hasClass('popup-container') ) {
                    Popup.hide('.popup-container');
                }
            });

            jQuery('[data-popup]').click(function(event) {
                event.preventDefault();

                var id = jQuery(this).data('target');

                Popup.show(id);
                return false;
            });

            jQuery('[data-popup-close]').click(function() {
                var id = jQuery(this).closest('.popup-container').attr('id');

                if (id) {
                    Popup.hide('#'+id);
                    return false;
                }
            });
        }

    }
