'use strict';

jQuery(function() {
    jQuery("[name=delivery-form]").validate({
        rules : {
            name : {
                required : true,
                onlyLetters : true
            },
            email : {
                required : true,
                email : true
            }
        },
        errorPlacement : function(error, element) {
            //error.insertAfter(element);
        },
        submitHandler: function(form) {
            if (true) {
                toastr.success('Успех');
            } else {
                toastr.error('Ошибка');
            }
        }
    });
});
