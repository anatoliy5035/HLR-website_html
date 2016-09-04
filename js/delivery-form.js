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
                jQuery(form).reset();
            } else {
                toastr.error('Ошибка');
            }
        }
    });
});

jQuery(function() {
    jQuery("[name=comment-form]").validate({
        rules : {
            name : {
                required : true,
                onlyLetters : true
            },
            email : {
                required : true,
                email : true
            },
            comment : {
                required : true
            },
            textMessage : {
                required : true
            },
            organization : {
                required : true
            },
            phone : {
                required : true
            }
        },
        errorPlacement : function(error, element) {
            //error.insertAfter(element);
        },
        submitHandler: function(form) {
            if (true) {
                toastr.success('Успех');
                jQuery(form).reset();
            } else {
                toastr.error('Ошибка');
            }
        }
    });
});

jQuery(function() {
    jQuery("[name=register-form]").validate({
        rules : {
            name : {
                required : true,
                onlyLetters : true
            },
            email : {
                required : true,
                email : true
            },
            phone : {
                required : true
            },
            orgeanization : {
                required : true
            }
        },
        errorPlacement : function(error, element) {
            //error.insertAfter(element);
        },
        submitHandler: function(form) {
            if (true) {
                toastr.success('Успех');
                jQuery(form).reset();
            } else {
                toastr.error('Ошибка');
            }
        }
    });
});


