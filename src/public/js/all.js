$(document).ready(function () {
    var mySwiper = new Swiper ('.banner__slider', {
        // Optional parameters
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        speed: 600,
        loop: true,
        breakpoints: {
            768: {
                nextButton: '.swiper-button-disabled',
                prevButton: '.swiper-button-disabled'
            }
        }
    });
    var mySwiper = new Swiper ('.clients__slider', {
        // Optional parameters
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        speed: 600,
        loop: true,
        spaceBetween: 20,
        slidesPerView: 4,
        breakpoints: {
            1024: {
                slidesPerView: 4
            },
            768: {
                slidesPerView: 3
            },
            640: {
                slidesPerView: 2
            },
            500: {
                slidesPerView: 1
            }
        }
    });
    $('.fancybox').fancybox();
});
