$(document).ready(function () {
    let touch = $('#touch-menu');
    let menu = $('.nav');

    $(touch).on('click', function (e) {
        e.preventDefault();
        menu.slideToggle();
    });
    $(window).resize(function () {
        let wid = $(window).width();
        if(wid > 976 && menu.is(':hidden')) {
            menu.removeAttr('style')
        }
    });
});