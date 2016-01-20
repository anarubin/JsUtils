(function ($) {
    'use strict';

    $(document).ready(function () {
        init();
    });

    function init() {
        jQuery.ajax({
            type: "get",
            url: "https://toto.fonbet.com/toto/current/ru",
            data: "",
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            success: function (data) {
                jQuery("#jackpot_email").html(data.jackpot);
            },
            error: function (data) {

            }
        });
    }

}(jQuery));