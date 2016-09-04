'use strict';

var Auth = {
	init : function () {
		this.login();
        this.registration();
		this.forgotPass();
		this.events();
	},

	login : function() {
		jQuery("[name=login-form]").validate({
			rules : {
				email : {
					required : true,
					email : true
				},
				password : {
					required : true,
					minlength : 5,
					maxlength : 20
				}
			},
			messages : {
				email : {
					required : '',
					email : ''
				},
				password : {
					required : '',
					minlength : 'Минимум 5 символов',
					maxlength : 'Максимум 20 символов'
				}
			},
			errorPlacement : function(error, element) {
                if (jQuery(element).attr('type') == 'password') {
                    error.insertAfter(element);
                }
			},
			submitHandler: function(form) {
                if (true) {
                    Popup.hide('#login-popup');
                    toastr.success('Успех');
                } else {
                    toastr.error('Ошибка');
                }
			}
		});
	},

    registration : function() {
        jQuery("[name=registration-form]").validate({
			rules : {
				email : {
					required : true,
					email : true
				},
                name : {
					required : true,
					onlyLetters : true
				},
                surname : {
					required : true,
					onlyLetters : true
				},
				password : {
					required : true,
					minlength : 5,
					maxlength : 20
				},
                password_2 : {
					required : true,
					minlength : 5,
					maxlength : 20
				}
			},
			messages : {
				email : {
					required : '',
					email : ''
				},
                name : {
					required : '',
					onlyLetters : ''
				},
                surname : {
					required : '',
					onlyLetters : ''
				},
				password : {
					required : '',
                    minlength : 'Минимум 5 символов',
					maxlength : 'Максимум 20 символов'
				},
                password_2 : {
					required : '',
                    minlength : 'Минимум 5 символов',
					maxlength : 'Максимум 20 символов'
				}
			},
			errorPlacement : function(error, element) {
				//error.insertAfter(element);
			},
			submitHandler: function(form) {
                if (true) {
                    Popup.hide('#registration-popup');
                    toastr.success('Успех');
                } else {
                    toastr.error('Ошибка');
                }
			}
		});
    },

	forgotPass : function() {
		jQuery("[name=password-form]").validate({
			rules : {
				email : {
					required : true,
					email : true
				}
			},
			messages : {
				email : {
					required : '',
					email : ''
				}
			},
			errorPlacement : function(error, element) {
				//error.insertAfter(element);
			},
			submitHandler: function(form) {
                if (true) {
                    Popup.hide('#password-popup');
                    toastr.success('Успех');
                } else {
                    toastr.error('Ошибка');
                }
			}
		});
	},

	events: function() {
        jQuery('#show-password-popup').click(function(event) {
            event.preventDefault();
            Popup.hide('#login-popup');
            Popup.show('#password-popup');
        });

        jQuery('#show-login-popup').click(function(event) {
            event.preventDefault();
            Popup.hide('#password-popup');
            Popup.show('#login-popup');
        });

        jQuery('#show-registration-popup').click(function(event) {
            event.preventDefault();
            Popup.hide('#login-popup');
            Popup.show('#registration-popup');
        });
	}

};
