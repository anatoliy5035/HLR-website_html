'use strict';

var Search = {

    init : function() {
        jQuery('.header-search button[type=submit]').val('').prop('disabled', true);
        this.events();
    },

    showSearch : function() {
        jQuery('body').addClass('search-open');
        jQuery('.header-nav .navicon-close').attr('id', 'js-close-search');
    },

    hideSearch : function() {
        jQuery('body').removeClass('search-open');
    },

    goUp : function(container) {
        var list = container.find('.live-search'),
            options = list.find('.search-item'),
            selected = list.find('.search-item.selected');

        if (selected.index() == 0) {
            options.removeClass('selected');
            options.eq(0).addClass('selected');
            list.find('.live-search-container').scrollTop(0);
            return false;
        }

        selected.removeClass('selected');
        options.eq(selected.index() - 1).addClass('selected').focus();

        list.scrollTop(list.scrollTop() - options.eq(selected.index()).innerHeight());
    },

    goDown : function(container) {
        var list = container.find('.live-search'),
            options = list.find('.search-item'),
            selected = list.find('.search-item.selected'),
            next = options.eq(selected.index() + 1);

        if (!next.length) {
            return false;
        }

        selected.removeClass('selected');
        next.addClass('selected').focus();

        list.find('.live-search-container').scrollTop(list.scrollTop() + next.position().top);
    },

    events : function() {
        jQuery('input[name="q"]').on('input', function(event) {
            var element = jQuery(this),
                container = element.closest('.header-search');

            if (element.val().length > 3) {
                /*jQuery.ajax({
                    type: "POST",
                    url: '/search/live',
                    cache: false,
                    data: { q : element.val() },
                    dataType: 'json',
                    success: function(response) {
                        if (response.status) {
                            container.find('.live-search-container').html(jQuery(response.html));
                            container.find('.live-search').show();
                        } else {
                            container.find('.live-search').hide();
                        }
                    },
                    error: function () {
                    }
                });*/
                container.find('.live-search').show();
            }

            if (element.val() && container.find('button[type=submit]').prop('disabled')) {
                container.find('button[type=submit]').prop('disabled', false);
            } else if (!jQuery(this).val()) {
                container.find('button[type=submit]').prop('disabled', true);
                container.find('.live-search').hide();
            }
        });

        jQuery('input[name="q"]').on('keydown', function(event) {
            var element = jQuery(this),
                container = element.closest('.header-search');

            if (event.keyCode == 38) {
                Search.goUp(container);
            } else if (event.keyCode == 40) {
                Search.goDown(container);
            }

            if (event.keyCode == 13) {
                if (container.find('.search-item.selected').length) {
                    var href = container.find('.search-item.selected .search-item-title a').attr('href');
                    location.href = href;
                    return false;
                }
            }
        });

        jQuery('#js-open-search').on('click', function(event) {
            event.preventDefault();
            Search.showSearch();
        });

        jQuery('.header-nav').on('click', '#js-close-search', function(event) {
            event.preventDefault();
            Search.hideSearch();
        });

    } //end events
};
