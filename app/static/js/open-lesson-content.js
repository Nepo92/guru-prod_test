$(document).on('click', '.lesson .lesson__header', function(event) {
    $('.lesson .lesson__content').not($(this).next()).slideUp(400);
    $(this).next().slideToggle(400);

    $('.lesson .lesson__header').not($(this)).removeClass('lesson__header_active');
    $(this).toggleClass('lesson__header_active');
});

$(document).ready(function() {
    initFancy();
});


function initFancy() {
    $('.js-fancybox').fancybox({
        youtube: {
            showinfo: 0
        }
    });
}