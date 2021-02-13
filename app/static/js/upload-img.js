$(document).on('change', '.input-file', function(element) {
    var $input = $(this),
        $label = $input.next('.js-labelFile'),
        labelVal = $label.html();

    var fileName = '';
    if (element.target.value) fileName = element.target.value.split('\\').pop();
    fileName ? $label.addClass('has-file').find('.js-fileName').html(fileName) : $label.removeClass('has-file').html(labelVal);

});