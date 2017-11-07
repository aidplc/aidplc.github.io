function InitilizePageFunction() {
    InitializeISIC();
}

function InitializeISIC() {
    $("#homeSlider").owlCarousel({
        //animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        items: 1,
        smartSpeed: 450,
        mouseDrag: false,
        autoplay: true,
        autoplayTimeout: 3000,
        touchDrag: false,
        loop: true,
        dots: false
    });

    $("#cards_carousel").owlCarousel({
        mouseDrag: false,
        margin: 10,
        dots: false,
        nav: true,
        navText: '',
        navRewind: false,
        responsive: {
            // breakpoint from 0 up
            0: {
                items: 1,
                nav: false,
                dots: true

            },
            480: {
                items: 2,
                nav: false,
                dots: true
            },
            980: {
                items: 3,
                nav: true,
                dots: false
            }
        }

    });

    $("#offers_carousel").owlCarousel({
        mouseDrag: false,
        margin: 20,
        dots: false,
        nav: true,
        navText: '',
        navRewind: false,
        responsive: {
            // breakpoint from 0 up
            0: {
                items: 1,
                margin: 0,
                nav: false,
                dots: true

            },
            767: {
                items: 3,
                nav: true,
                dots: false
            }
        }
    });

    //Clone of navigation for mobile 
    $(".navigation ul").clone().appendTo(".mobile-navigation");

    $('.mobile-navigation ul li a').on('click', function () {
        $('.mobile-navigation').fadeOut();
    });

    $('.icon-close').on('click', function () {
        $('.mobile-navigation').fadeOut();
    });

    $('.icon-menu').on('click', function () {
        $('.mobile-navigation').fadeIn();
    });

    // Initialize One page navigation
    $('#nav').onePageNav();

    //anchor linking animate scroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        var target = this.hash;
        $target = $(target);

        $('html,body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });
    
    $("[id$='thumbForYouthCards']").on('click', function (e) {
        e.preventDefault();

        var target = "#youth-cards";
        $target = $(target);

        $('html,body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    }); 

    //Back to Top Visibility function
    $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
            $('.icon-top').addClass('active');
        }
        else {
            $('.icon-top').removeClass('active');
        }
    });

    //Initialize scrollr js
    if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        skrollr.init({
            forceHeight: false
        });
    }
}