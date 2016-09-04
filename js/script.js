'use strict';

    /*mobile*/
    var useragents=['android','astel','audiovox','blackberry','chtml','docomo','ericsson','hand','iphone ','ipod','2me','ava','j-phone','kddi','lg','midp','mini','minimo','mobi','mobile','mobileexplorer','mot-e','motorola','mot-v','netfront','nokia', 'palm','palmos','palmsource','pda','pdxgw','phone','plucker','portable','portalmmm','sagem','samsung','sanyo','sgh','sharp','sie-m','sie-s','smartphone','softbank','sprint','symbian','telit','tsm','vodafone','wap','windowsce','wml','xiino'];

    var agt=navigator.userAgent.toLowerCase();
    var is_mobile=false;
      for(var i=0;i<useragents.length;i++){
        if(agt.indexOf(useragents[i])!=-1){
          is_mobile=true;
          var user_agent=agt; break;
        }
      }
    /*!mobile*/

    function throttle (callback, limit) {
        var wait = false;                  // Initially, we're not waiting

        return function () {               // We return a throttled function
            if (!wait) {                   // If we're not waiting
                callback.call();           // Execute users function
                wait = true;               // Prevent future invocations
                setTimeout(function () {   // After a period of time
                    wait = false;          // And allow future invocations
                }, limit);
            }
        }
    };

    jQuery.fn.reset = function () {
        this[0].reset();
        return this;
    };

    jQuery.validator.addMethod("onlyLetters",
        function(value, element, regexp) {
        	var re = new RegExp(/\d+/);
        	return !(re.test(value));
        },
        "Please enter a valid value."
    );

    jQuery.validator.addMethod("birthday",
        function(value, element, regexp) {
        	var re = new RegExp(/^[\d]{2}(\.|-|\/)[\d]{2}\1[\d]{4}$/i);
        	return re.test(value);
        },
        "Please enter a valid value."
    );

    jQuery(function() {

        if (typeof toastr != 'undefined') {
            toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };
        }

        Header.init();
        Search.init();
        Popup.init();
        //Auth.init();


        jQuery('.dropdown').dropdown();
        jQuery("input[type='tel']").mask("+38 (999) 999-99-99");

    });



$(function() {

    //init
    $('.customselect').customselect();

    //get value
    var value = $('#js-customselect-2').customselect('getValue');
    console.log('js-customselect-2 value = ' + value);

    //set value
    $('#set-value').click(function() {
        $('#js-customselect-1').customselect('setValue', 3);
    });

    //toggle
    $('#toggle').click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        $('#js-customselect-2').customselect('toggle');
    });

    //disabled
    $('#disabled').click(function (event) {
        event.preventDefault();
        $('#js-customselect-2').customselect('disabled', true);
    });

    //enabled
    $('#enabled').click(function (event) {
        event.preventDefault();
        $('#js-customselect-2').customselect('disabled', false);
    });

    //onchange event
    $('#js-customselect-1').on('onchange', function(event, value) {
        console.log('js-customselect-1 value = ' + value);
    });

    $('#js-customselect-2').on('onchange', function(event, value) {
        console.log('js-customselect-2 value = ' + value);
    });

    //dynamic onchange event
    $('body').on('onchange', '#dynamic-select', function(event, value) {
        console.log('dynamic select value ' + value);
    });

});

$('document').ready(function () {
    ///popup gallery
    var popup = $('.custom-popup-bg');
    $('.document-item').on('click' , function () {
        popup.addClass('active');
        $('body').css('overflow-x','hidden');
        $('.custom-popup-bg').addClass('active');

        var imgsrc = $(this).find('img').attr('src');
        var target = $(this).data('target');
        var text = $(this).find('.document-caption span')[0].innerText;

        popup.find('.pop-up-doc-img').attr('src' , imgsrc);
        popup.find('.doc-popup-caption')[0].innerText = text;


        // $('.doc-popup-caption').clientWidth = +imgWidth + 'px';
    });
    popup.on('click' , function () {
        $(this).removeClass('active');
        $('body').css('overflow-x','visible');
    });
    //finish popup gallery

    $('.js-gallery').lightSlider({
        gallery:true,
        item:1,
        loop:true,
        slideMargin:0,
        thumbMargin: 10,
        enableDrag: false,
        currentPagerPosition:'middle',
        onSliderLoad: function(el) {
            el.lightGallery({
                selector: '.js-gallery .lslide'
            });
        }
    });


});


// map

var Map =

{
    init: function() {
        if ( $( "#map" ).length ) {
            Map.initMap();
        }
    },

    initMap: function  () {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {lat: 50.531179, lng: 30.807825},
        scrollwheel: false
    });

    var image = 'images/marker.png';

    var beachMarker = new google.maps.Marker({
        position: {lat: 50.527796, lng: 30.809005},
        map: map,
        icon: image
    });

    var secondMarker = new google.maps.Marker({
        position: {lat: 50.534453, lng: 30.814520},
        map: map,
        icon: image
    });
},

}

Map.init();







