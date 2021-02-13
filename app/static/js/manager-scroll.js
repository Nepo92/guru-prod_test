$(document).ready(function(){
    const $managers = $('[manager-name]');
    const $left = $managers.offset().left;
    var $offset = $left - $('.main-nav').width();

    processScroll($offset, $managers);

    $(window).resize(function(){
        $offset = $left - $('.main-nav').width();
    });

    $(window).scroll(function() {
        processScroll($offset, $managers);
    });
});

function processScroll(offset, managers) {
    var $width = $('body').scrollLeft();
    var $translate = $width - offset;
    if($width > offset) {
        managers.css('transform','translateX(' + $translate +  'px' + ')');
        managers.css('-moz-transform','translateX(' + $translate +  'px' + ')');
        managers.css('-webkit-transform','translateX(' + $translate +  'px' + ')');
        managers.addClass('lb');
    } else {
        managers.removeClass('lb');
        managers.css('transform','translateX(' + 0 +  'px' + ')');
    }
}