'use strict';

(function ($) {

    var methods = {

        init : function(options) {

            methods.events();

            return this.each(function() {
                //var settings = $.extend({}, options);
                var self = $(this);
                self.find('[data-customselect-head]').click(function (event) {
                    self.customselect('toggle');
                });

                self.find('[data-customselect-option]').click(function (event) {
                    event.preventDefault();
                    var option = $(this);
                    self.customselect('change', option);
                });

                self.each(function (index, element) {
                    $(element).customselect('setDefaultValue');
                });
            });
        },

        setPosition : function() {
            var $this = $(this),
                position,
                customselect_body = $this.find('.customselect-body');

            if ( (customselect_body.offset().top + customselect_body.outerHeight() - $(document).scrollTop()) > $(window).height() ) {
                position = 'bottom';
                customselect_body.css('margin-bottom', $this.outerHeight() + 'px');
            } else {
                position = 'top';
                customselect_body.css('margin-bottom', 'auto');
            }

            $this.addClass(position);
        },

        toggle : function () {
            var $this = $(this);

            if (!!$this.attr('data-customselect-disabled')) {
                return false;
            }

            $('[data-customselect]').not($this).removeClass('opened'); // hide all another

            if ($this.hasClass('opened')) {
                $this.removeClass('opened');
            } else {
                $this.removeClass('top bottom').addClass('opened');
                $this.customselect('setPosition');
            }
        },

        getValue : function() {
            return this.find('input[type="hidden"]').val();
        },

        setDefaultValue : function () {
            var $this = this,
                title = $this.find('[data-customselect-title]'),
                options = $this.find('[data-customselect-option]'),
                first_option = options.eq(0),
                selected = $this.find('[data-customselect-selected]'),
                input = $this.find('input[type="hidden"]');

            if ( !selected.length ) {
                title.html( first_option.html() );
                first_option.attr('data-customselect-selected', 'selected').addClass('active');
                input.val(first_option.attr('value'));
            } else {
                title.html( selected.html() );
                selected.addClass('active');
                input.val(selected.attr('data-customselect-value'));
            }
        },

        setValue : function(value) {
            var $this = this,
                title = $this.find('[data-customselect-title]'),
                option = $this.find('[data-customselect-option][data-customselect-value='+value+']'),
                selected = $this.find('[data-customselect-selected]'),
                input = $this.find('input[type="hidden"]');

            if ( !option.length ) {
                $this.customselect('setDefaultValue');
                return false;
            }

            title.html(option.html());
            selected.removeAttr('data-customselect-selected').removeClass('active');
            option.attr('data-customselect-selected', 'selected').addClass('active');
            input.val(value);

            if ( $this.hasClass('opened') ) {
                $this.customselect('toggle');
            }
            $this.trigger('onchange',value);
        },

        change : function(option) {
            var $this = $(this),
                value = option.attr('data-customselect-value');

            if (!!option.attr('data-customselect-disabled')) {
                return false;
            }

            $this.customselect('setValue', value);
        },

        disabled : function(flag) {
            var $this = this;

            if (flag) {
                $this.attr('data-customselect-disabled', 'disabled').addClass('disabled');
            } else {
                $this.removeAttr('data-customselect-disabled').removeClass('disabled');
            }
        },

        disabledOption : function(value, flag) {
            var $this = this,
                option = $this.find('[data-customselect-option][data-customselect-value='+value+']');

            if (!option.length) {
                return false;
            }

            if (flag) {
                option.attr('data-customselect-disabled', 'disabled').addClass('disabled');
            } else {
                option.removeAttr('data-customselect-disabled').removeClass('disabled');
            }
        },

        events : function () {
            $('html').on('click', function(event) {
                if ( $(event.target).closest('.customselect').length || $(event.target).hasClass('customselect') ) {
                    return false;
                }
                $('.customselect').removeClass('opened');
            });
        }
    };

    $.fn.customselect = function (method) {
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Метод с именем ' +  method + ' не существует для jQuery.customselect' );
        }
    };

})(jQuery);
