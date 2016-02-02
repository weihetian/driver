var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.simple_nav').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;

    if(st > 0){
        $('.simple_nav').addClass('nav-color');
    }else if(st == 0){
        $('.simple_nav').removeClass('nav-color');
    }

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('.simple_nav').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('.simple_nav').removeClass('nav-up').addClass('nav-down');
        }
    }

    lastScrollTop = st;
}

// alert();
// function mobile_menu(){
//   $('.mobile_nav_wrapper').show();
//   $('.mobile_nav').show();
//
//     $('.mobile_nav').transition({ y:10, opacity: 1 });
//
//
// }
//
// function mobile_menu_off(){
//
//     $('.mobile_nav').transition({ y:0, opacity: 0 },function(){
//
//         $('.mobile_nav').hide();
//         $('.mobile_nav_wrapper').hide();
//     });
//
// }
