'use strict';

(function ($) {

    var methods = {

        init : function(options) {

            methods.events();

            return this.each(function() {
                //var settings = $.extend({}, options);
                var self = $(this);

                self.on('click', '[data-dropdown]', function(event) {
                    self.dropdown('toggle', event);
                });

            });
        },

        setPosition : function() {
            var $this = $(this),
                position,
                dropdown_menu = $this.find('.dropdown-menu');

            if ( (dropdown_menu.offset().top + dropdown_menu.outerHeight() - $(document).scrollTop()) > $(window).height() ) {
                position = 'bottom';
                dropdown_menu.css('margin-bottom', $this.outerHeight() + 'px');
            } else {
                position = 'top';
                dropdown_menu.css('margin-bottom', 'auto');
            }

            $this.addClass(position);
        },

        toggle : function(event) {
            event.preventDefault();
            event.stopPropagation();

            var $this = $(this);

            $('.dropdown').not($this).removeClass('active');

            if ($this.hasClass('active')) {
                $this.removeClass('active');
            } else {
                $this.removeClass('top bottom').addClass('active');
                $this.dropdown('setPosition');
            }
        },

        events : function() {
            $('html').on('click', function(event) {
                if ( $(event.target).closest('.dropdown').length || $(event.target).hasClass('dropdown') ) {
                    //return false;
                } else {
                    $('.dropdown.active').removeClass('active');
                }
            });
        }
    };

    $.fn.dropdown = function (method) {
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Метод с именем ' +  method + ' не существует для jQuery.dropdown' );
        }
    };

})(jQuery);
