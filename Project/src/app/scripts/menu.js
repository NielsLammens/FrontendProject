/**
 * Created by sam_b_000 on 13/12/2014.
 */
(function ($) {
    'use strict';
    $.fn.menuSlide = function (options) {
        var settings = $.extend({
            'menu': ('#menu'),
            'push': ('.push'),
            'menuWidth': '15em',
            'speed': '300'
        }, options);

        var menuLink = this,
            menu = $(settings.menu),
            push = $(settings.push),
            width = settings.menuWidth;

        var positionOffScreen = {
            'position': 'fixed',
            'top': '0',
            'bottom': '0',
            'left': '-' + settings.menuWidth,
            'width': settings.menuWidth,
            'height': '100%'
        };

        var animateSlide = {
            '-webkit-transition': 'left ' + settings.speed + 'ms ease',
            '-moz-transition': 'left ' + settings.speed + 'ms ease',
            '-ms-transition': 'left ' + settings.speed + 'ms ease',
            '-o-transition': 'left ' + settings.speed + 'ms ease',
            'transition': 'left ' + settings.speed + 'ms ease'
        };

        menu.css(positionOffScreen);

        menuLink.on('click.menuSlide', function () {

            menu.css(animateSlide);
            push.css(animateSlide);

            menu.toggleClass('slide');
            push.toggleClass('slide');

            if (menu.hasClass('slide') === true) {
                menu.css('left', '0');
                $(".info").animate({
                    "margin-left": "100px"
                }, { duration: 250 });
            } else {
                $(".info").animate({
                    "margin-left": "55px"
                }, { duration: 250 });
                menu.css('left', '-' + width);
            }

            if (push.hasClass('slide') === true) {
                push.css('left', width);
            } else {
                push.css('left', '0');
            }
            return false;
        });
    };
}(jQuery));

$(document).ready(function () {
    $('.menu-link').menuSlide();
});
