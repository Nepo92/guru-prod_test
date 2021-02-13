$(document).on('click', '[js-copy-link]', function(event){
    var $tmp = $("<textarea>");
    $("body").append($tmp);
    $tmp.val($(this).attr('data-link')).select();
    document.execCommand("copy");
    $tmp.remove();
});
