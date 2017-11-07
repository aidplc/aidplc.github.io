
$(document).ready(function () {
    //On key up in texbox's hide error messages for required fields
    $('.required').keyup(function () {
        $(this)[0].style.borderColor = "";
    });
    //On key up for mobile number avoid non-numeric characters
    $('.mobile').keyup(function () {
        $(this)[0].style.borderColor = "";
        numericsonly(this); // definition of this function is above
    });

    $('.btn_validate').click(function (e) {
        return ValidateAll();
    });

    if (window.location.pathname.toLowerCase().indexOf('/en/') == -1) {
        $('.chatContent .required').first().before("<div class='error_message'>* من فضلك ادخل معلومات صحيحة</div>");
    }
    else {
        $('.chatContent .required').first().before("<div class='error_message'>* Please enter valid information</div>");
    }
});

function numericsonly(ob) {
    var invalidChars = /[^0-9]/gi
    if (invalidChars.test(ob.value)) {
        ob.value = ob.value.replace(invalidChars, "");
    }
}
//function to allow only numbers ends here

function ValidateAll() {
    var empty_count = 0; // variable to store error occured status
    $('.required').each(function () {
        if ($(this).val().length === 0) {
            $(this)[0].style.borderColor = "red";
            empty_count = 1;
        }
        else {
            $(this)[0].style.borderColor = "";
            if ($(this).hasClass('mobile')) {
                if ($(this).val().length != 10) {
                    $(this)[0].style.borderColor = "red";
                    empty_count = 1;
                }
                else {
                    $(this)[0].style.borderColor = "";
                }
            }
            if ($(this).hasClass('email')) {
                $(this)[0].style.borderColor = "";
                var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                if (filter.test($(this).val()) === false) {
                    $(this)[0].style.borderColor = "red";
                    empty_count = 1;
                }
                else {
                    $(this)[0].style.borderColor = "";
                }
            }
            if ($(this).hasClass('password')) {
                $(this)[0].style.borderColor = "";
                if ($(this).val().length < 8) {
                    $(this)[0].style.borderColor = "red";
                    empty_count = 1;
                }
                else {
                    $(this)[0].style.borderColor = "";
                    if ($(this).val() === $('.comfirm_password').val()) {
                    }
                    else {
                        $('.comfirm_password')[0].style.borderColor = "red";
                        empty_count = 1;
                    }
                }
            }
        }
    });
    $('.dpreq').next('.tooltip_outer').hide();
    $('.dpreq').each(function () {

        $(this)[0].style.borderColor = "";

        if ($(this).attr("selectedIndex") === 0) {
            $(this)[0].style.borderColor = "red";
            empty_count = 1;
        }
        else {
            $(this)[0].style.borderColor = "";
        }
    });
    if (empty_count === 1) {
        // Displat Error Message
        $('.error_message').show();
        return false;
    }
    else {
        $('.error_message').hide();
        return true;
    }
}