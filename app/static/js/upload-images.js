$(document).ready(function(){
    const $inputFile = $('[js-input-file]');

    $inputFile.on('change', function (e) {
        var fileName = '';
        var $label = $(this).siblings('.js-labelFile'),
            labelVal = $label.html();

        if (e.target.value) {
            fileName = e.target.value.split('\\').pop();
        }

        fileName ? $label.addClass('has-file').children('.js-fileName').html(fileName) : $label.removeClass('has-file').html(labelVal);
    })
});