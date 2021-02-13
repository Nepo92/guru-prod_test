$(document).on('click', '[js-save-update-theme]', function(event){
    event.preventDefault();
    $('[js-update-theme-form]').trigger('submit');
});
$(document).on('submit', '[js-update-theme-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var themeData = $('[js-update-theme-form]').serializeObject();
        updateTheme(themeData);
    }
});
$(document).on('click', '[js-update-theme]', function(event) {
    setUpdateThemeFormData($(this).closest('.theme').attr('data-theme'));
    $('[js-menu-update-theme]').addClass('is-open');
    checkBodyHidden()
});



$(document).on('click', '[js-create-article]', function(event){
    $('[js-menu-create-article]').addClass('is-open');
    var idTheme = $(this).closest('.theme').attr('data-theme');
    $('[js-article-form-id-theme]').val(idTheme);
    checkBodyHidden();
});
$(document).on('click', '[js-update-article]', function(event) {
    setUpdateArticleFormData($(this).closest('.article').attr('data-article'));
    $('[js-menu-update-article]').addClass('is-open');
    checkBodyHidden()
});
$(document).on('click', '[js-update-save-article]', function(event){
    event.preventDefault();
    $('[js-update-article-form]').trigger('submit');
});
$(document).on('submit', '[js-update-article-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var form = $('#update-article-form')[0];
        var articleData = new FormData(form);
        updateArticle(articleData);
    }
});

$(document).ready(function() {

    const $menuCreateThemeBtn = $('[js-create-theme]');
    const $menuCreateThemeCloseBtn = $('[js-menu-create-theme-close-btn]');
    const $menuCreateTheme = $('[js-menu-create-theme]');

    const $saveThemeBtn = $('[js-save-theme]');
    const $createThemeForm = $('[js-theme-form]');

    $menuCreateThemeBtn.on('click', function () {
        $menuCreateTheme.addClass('is-open');
        checkBodyHidden()
    });

    $menuCreateThemeCloseBtn.on('click', function() {
        $menuCreateTheme.removeClass('is-open');
        $createThemeForm.trigger('reset');
        checkBodyHidden()
    });

    $saveThemeBtn.on('click', function(event) {
        event.preventDefault();
        $createThemeForm.trigger('submit');
    });

    $createThemeForm.submit(function (event) {
        event.preventDefault();
        if (validateForm(this)) {
            var themeData = $createThemeForm.serializeObject();
            createTheme(themeData);
        }
    });


    $('[js-menu-update-theme-close-btn]').on('click', function() {
        $('[js-menu-update-theme]').removeClass('is-open');
        $('[js-update-theme-form]').trigger('reset');
        checkBodyHidden()
    });

    const $menuCreateArticleCloseBtn = $('[js-menu-create-article-close-btn]');
    const $menuCreateArticle = $('[js-menu-create-article]');

    const $saveArticleBtn = $('[js-save-article]');
    const $createArticleForm = $('[js-article-form]');

    $menuCreateArticleCloseBtn.on('click', function() {
        $menuCreateArticle.removeClass('is-open');
        $createArticleForm.trigger('reset');
        $('.js-labelFile').removeClass('has-file');
        $('.js-fileName').html('Загрузите обложку 280x180');
        checkBodyHidden()
    });

    $saveArticleBtn.on('click', function(event) {
        event.preventDefault();
        $createArticleForm.trigger('submit');
    });

    $createArticleForm.submit(function (event) {
        event.preventDefault();
        if (validateForm(this)) {
            var form = $createArticleForm[0];
            var articleData = new FormData(form);
            createArticle(articleData);
        }
    });

    $('[js-menu-update-article-close-btn]').on('click', function() {
        $('[js-menu-update-article]').removeClass('is-open');
        $('[js-update-article-form]').trigger('reset');
        $('.js-labelFile').removeClass('has-file');
        $('.js-fileName').html('Загрузите обложку 280x180');
        checkBodyHidden()
    });

    initDeleteTheme();
    initDeleteArticle();
});

//работа с записями
function createArticle(articleData) {
    $('[js-save-article]').prop("disabled", true);
    $.ajax({
        type: "POST",
        enctype: "multipart/form-data",
        url: "saveArticle",
        data: articleData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            updateArticleInTheme(data);
            $('[js-menu-create-article]').removeClass('is-open');
            checkBodyHidden();
            $('[js-article-form]').trigger('reset');
            $('.js-labelFile').removeClass('has-file');
            $('.js-fileName').html('Загрузите обложку 280x180');
            $('[js-save-article]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-article]').prop("disabled", false);
        }
    });
}
function updateArticleInTheme(articleData) {
    var $themeArticles = $('.theme[data-theme="' + articleData.idTheme + '"]').find('.theme__articles');
    $themeArticles.html($themeArticles.html() +
        '<div class="article" data-article="' + articleData.id + '">' +
        '   <div class="article-wrapper">' +
        '       <div class="article__title">' + articleData.name + '</div>' +
        '       <div class="article-preview">' +
        '           <div class="article__preview">' +
        '               <div class="article__preview-hover"></div>' +
        '               <img src="/' + articleData.previewImg + '" alt="" class="article__img">' +
        '               <div class="article__link-wrapper">' +
        '                   <a href="' + articleData.link + '" target="_blank" class="article__link">Открыть</a>' +
        '                   <div js-update-article  class="article__btn-link">Редактировать</div>' +
        '               </div>' +
        '           </div>' +
        '       </div>' +
        '   </div>' +
        '</div>'
    );
}
function initDeleteArticle() {
    $('[js-delete-article]').on('click', function(event) {
        var idArticle = $('[js-update-article-form-id]').val();

        $('[js-delete-article]').prop("disabled", true);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "deleteArticle",
            data: JSON.stringify(idArticle),
            dataType: 'json',
            cache: false,
            success: function (data) {
                $('.article[data-article="' + idArticle + '"]').remove();
                $('[js-menu-update-article]').removeClass('is-open');
                checkBodyHidden();
                $('[js-update-article-form]').trigger('reset');
                $('.js-labelFile').removeClass('has-file');
                $('.js-fileName').html('Загрузите обложку 280x180');
                $('[js-delete-article]').prop("disabled", false);
            },
            error: function (data) {
                $('[js-delete-article]').prop("disabled", false);
            }
        });
    });
}
function setUpdateArticleFormData(idArticle) {
    $('[js-update-article]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "getArticle",
        data: JSON.stringify(idArticle),
        dataType: 'json',
        cache: false,
        success: function (data) {
            $('[js-update-article-form-id]').val(data.id);
            $('[js-update-article-form-name]').val(data.name);
            $('[js-update-article-form-link]').val(data.link);
            $('[js-update-article-form-img]').val(data.previewImg);
            $('[js-update-article]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-update-article]').prop("disabled", false);
        }
    });
}
function updateArticle(articleData) {
    $('[js-save-update-article]').prop("disabled", true);
    $.ajax({
        type: "POST",
        enctype: "multipart/form-data",
        url: "updateArticle",
        data: articleData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            updateArticleInContainer(data);
            $('[js-menu-update-article]').removeClass('is-open');
            checkBodyHidden();
            $('[js-update-article-form]').trigger('reset');
            $('.js-labelFile').removeClass('has-file');
            $('.js-fileName').html('Загрузите обложку 280x180');
            $('[js-save-update-article]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-update-article]').prop("disabled", false);
        }
    });
}
function updateArticleInContainer(articleData) {
    var $article = $('.article[data-article="' + articleData.id + '"]');
    $article.find('.article__title').html(articleData.name);
    $article.find('.article__img').attr('src', '/' + articleData.previewImg);
    $article.find('.article__link').attr('href', articleData.link);
}


//работа с темами
function createTheme(themeData) {
    $('[js-save-theme]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "saveTheme",
        data: JSON.stringify(themeData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            updateThemeContainer(data);
            $('[js-menu-create-theme]').removeClass('is-open');
            checkBodyHidden();
            $('[js-theme-form]').trigger('reset');
            $('[js-save-theme]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-theme]').prop("disabled", false);
        }
    });
}
function updateThemeContainer(data) {
    $('.theme-container').html($('.theme-container').html() +
        '<div class="theme" data-theme="' + data.id + '">' +
        '   <div class="theme-wrapper">' +
        '       <div class="theme__title-wrapper">' +
        '           <div theme-name class="theme-title theme-title_delim">' + data.name + '</div>' +
        '           <div js-update-theme class="theme-setting"></div>' +
        '           <div js-create-article class="add-button add-button_right">+ Добавить файл</div>' +
        '       </div>' +
        '       <div class="theme__articles">' +
        '       </div>' +
        '   </div>' +
        '</div>'
    );
}
function initDeleteTheme() {
    $('[js-delete-theme]').on('click', function(event) {
        var idTheme = $('[js-update-theme-form-id]').val();

        $('[js-delete-theme]').prop("disabled", true);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "deleteTheme",
            data: JSON.stringify(idTheme),
            dataType: 'json',
            cache: false,
            success: function (data) {
                $('.theme[data-theme="' + idTheme + '"]').remove();
                $('[js-menu-update-theme]').removeClass('is-open');
                checkBodyHidden();
                $('[js-update-theme-form]').trigger('reset');
                $('[js-delete-theme]').prop("disabled", false);
            },
            error: function (data) {
                $('[js-delete-theme]').prop("disabled", false);
            }
        });
    });
}
function setUpdateThemeFormData(idTheme) {
    $('[js-update-theme]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "getTheme",
        data: JSON.stringify(idTheme),
        dataType: 'json',
        cache: false,
        success: function (data) {
            $('[js-update-theme-form-id]').val(data.id);
            $('[js-update-theme-form-name]').val(data.name);
            $('[js-update-theme-form-type]').val(data.type);
            $('[js-update-theme]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-update-theme]').prop("disabled", false);
        }
    });
}
function updateTheme(themeData) {
    $('[js-save-update-theme]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "updateTheme",
        data: JSON.stringify(themeData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            updateThemeInContainer(data);
            $('[js-menu-update-theme]').removeClass('is-open');
            checkBodyHidden();
            $('[js-update-theme-form]').trigger('reset');
            $('[js-save-update-theme]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-update-theme]').prop("disabled", false);
        }
    });
}
function updateThemeInContainer(themeData) {
    if (themeData.type === $('[js-type]').attr('type')) {
        $('.theme[data-theme="' + themeData.id + '"]').find('[theme-name]').html(themeData.name);
    } else {
        $('.theme[data-theme="' + themeData.id + '"]').remove();
    }
}

function validateForm(form) {

    $(form).validate({
        onkeyup: false,
        onfocusout: false,
        errorPlacement: function(label, element) {
            label.addClass('error-wrapper');
            label.insertAfter(element.parent().last());
        },
        wrapper: 'span'
    });
    $(form).rules('add', {
        messages: {
            required: 'Заполните это поле.',
        }
    });

    return $(form).valid();
}

function resetCreateForm() {
    $('[js-theme-form]').trigger('reset');
    $('.js-labelFile').removeClass('has-file');
    $('.js-fileName').html('Загрузите обложку 280x180');
}
