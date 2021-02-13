//открытие модалки
$(document).on('click', '[js-open-article]', function(event) {
    setArticleDataToModal($(this).closest('.theme').attr('data-article'));
    $('[js-menu-open-article]').addClass('is-open');
    checkBodyHidden()
});
$(document).on('click', '[js-menu-open-article-close-btn]', function(event) {
    $('[js-menu-open-article]').removeClass('is-open');
    checkBodyHidden()
});


function setArticleDataToModal(idArticle) {
    $('[js-open-article]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "getArticle",
        data: JSON.stringify(idArticle),
        dataType: 'json',
        cache: false,
        success: function (data) {
            $('[js-open-title]').html(data.name);
            $('[js-open-text]').html(data.text);
            $('[js-open-article]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-open-article]').prop("disabled", false);
        }
    });
}