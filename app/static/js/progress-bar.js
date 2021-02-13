$(document).ready(function() {
    $.each($(".progress-bar"), function(index, progressBar) {
        var progressWidth = $(progressBar).find('.progress-bar__progress').width();

        $.each($(progressBar).find('.progress-bar__text'), function(index, text) {
            var textWidth = $(text).width();
            var percent = (progressWidth - $(text).position().left)*100/textWidth;
            percent = percent > 100 ? 100 : percent;
            $(text).css({
                'background' : 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) ' + percent + '%, rgba(72,30,140,1) ' + percent + '%, rgba(72,30,140,1) 100%)',
                '-webkit-background-clip' : 'text',
                '-webkit-text-fill-color' : 'transparent'
            });
        });
    });
});