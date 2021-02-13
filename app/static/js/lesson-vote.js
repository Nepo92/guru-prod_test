$(document).on('click', '[vote]', function(event){
    event.preventDefault();
    var json = new Object();
    json.rate = Number($(this).data('rate'));

    vote(json);
});
function vote(json) {
    $('[js-save-project]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "vote",
        data: JSON.stringify(json),
        dataType: 'json',
        cache: false,
        success: function (data) {
            setMessage('Ваш голос принят, спасибо!');
        },
        error: function (data) {
            setMessage('Произошла ошибка, попробуйте проголосовать позднее.');
        }
    });
}
function setMessage(msg) {
    $('[vote-block-wrapper]').html(createBlock(msg));
}
function createBlock(message) {
    return '<div class="content-element__header-item">' +
        '       <div class="content-element__header-main">' +
        '           <div class="content-element__header-element">' +
        '               <span class="content-element__title title title-h6">' + message + '</span>' +
        '           </div>' +
        '       </div>' +
        '   </div>'
}