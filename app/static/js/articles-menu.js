// //открытие модалки
// $(document).on('click', '[js-open-article]', function(event) {
//     setArticleDataToModal($(this).closest('.theme').attr('data-article'));
//     $('[js-menu-open-article]').addClass('is-open');
//     checkBodyHidden()
// });
// $(document).on('click', '[js-menu-open-article-close-btn]', function(event) {
//     $('[js-menu-open-article]').removeClass('is-open');
//     checkBodyHidden()
// });

$(document).on('click', '[js-update-article]', function(event) {
    setUpdateArticleFormData($(this).closest('.theme').attr('data-article'));
    $('[js-menu-update-article]').addClass('is-open');
    checkBodyHidden()
});
$(document).on('click', '[js-menu-update-article-close-btn]', function(event) {
    $('[js-menu-update-article]').removeClass('is-open');
    resetUpdateForm();
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
        updateTextArticle(articleData);
    }
});

$(document).ready(function() {
    const $menuCreateArticleBtn = $('[js-create-article]');
    const $menuCreateArticleCloseBtn = $('[js-menu-create-article-close-btn]');
    const $menuCreateArticle = $('[js-menu-create-article]');
    const $saveArticleBtn = $('[js-save-article]');
    const $createArticleForm = $('[js-article-form]');

    $menuCreateArticleBtn.on('click', function () {
        $menuCreateArticle.addClass('is-open');
        checkBodyHidden();
    });

    $menuCreateArticleCloseBtn.on('click', function() {
        $menuCreateArticle.removeClass('is-open');
        resetCreateForm();
        checkBodyHidden();
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

    initChangeKindRadiobutton();
    initDeleteArticle();


    initEditor();
    initUpdateEditor();
});
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
                $('.theme[data-article="' + idArticle + '"]').remove();
                $('[js-menu-update-article]').removeClass('is-open');
                checkBodyHidden();
                resetUpdateForm();
                $('[js-delete-article]').prop("disabled", false);
            },
            error: function (data) {
                $('[js-delete-article]').prop("disabled", false);
            }
        });
    });
}
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
            updateArticleInContainer(data);
            $('[js-menu-create-article]').removeClass('is-open');
            checkBodyHidden();
            resetCreateForm();
            $('[js-save-article]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-article]').prop("disabled", false);
        }
    });
}

function initChangeKindRadiobutton() {
    const $articleKind = $('[js-article-kind]');

    $articleKind.on('click', function () {
        var idKind = $(this).children().first().val();
        changeKind(idKind);
    })
}
function changeKind(idKind) {
    const $link = $('[js-kind-link]');
    const $editor = $('[js-kind-editor]');

    if(idKind == 1) {
        $link.removeClass("is-open");
        $editor.removeClass("is-open");
    } else if (idKind == 2) {
        $link.removeClass("is-open");
        $editor.addClass("is-open");
    } else if (idKind == 3) {
        $link.addClass("is-open");
        $editor.removeClass("is-open");
    }
}
function resetCreateForm() {
    $('[js-article-form]').trigger('reset');
    $('[js-kind-link]').removeClass("is-open");
    $('[js-kind-editor]').removeClass("is-open");

    $('.js-labelFile').removeClass('has-file');
    $('.js-fileName').html('Загрузите обложку 900x100');
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

function updateArticleInContainer(articleData) {
    $('.article-container').html($('.article-container').html() +
        '<div class="theme" data-article="' + articleData.id + '">' +
        '   <div class="theme-wrapper theme-wrapper_row">' +
        '       <div class="theme__text-wrapper">' +
        (
        (articleData.kind == 1) ? '<img class="article__img" src="/' + articleData.previewImg + '">' :

        (articleData.kind == 2) ? '<img js-open-article class="article__img article__img_modal" src="/' + articleData.previewImg + '">' :

        (articleData.kind == 3) ? '<a target="_blank" href="' + articleData.link + '">' +
            '                            <img class="article__img" src="/' + articleData.previewImg + '">' +
            '                      </a>' : ''
        ) +
        '       </div>' +
        '       <div js-update-article class="theme-setting theme-setting_top theme-setting_big"></div>' +
        '   </div>' +
        '</div>'
    );
}
// function setArticleDataToModal(idArticle) {
//     $('[js-open-article]').prop("disabled", true);
//     $.ajax({
//         type: "POST",
//         contentType: "application/json",
//         url: "getArticle",
//         data: JSON.stringify(idArticle),
//         dataType: 'json',
//         cache: false,
//         success: function (data) {
//             $('[js-open-title]').html(data.name);
//             $('[js-open-text]').html(data.text);
//             $('[js-open-article]').prop("disabled", false);
//         },
//         error: function (data) {
//             $('[js-open-article]').prop("disabled", false);
//         }
//     });
// }


function resetUpdateForm() {
    $('[js-update-article-form]').trigger('reset');
    $('[js-kind-link]').removeClass("is-open");
    $('[js-kind-editor]').removeClass("is-open");
    $('#js-update-article-form-type option:selected').removeAttr('selected');
    $("input[name=kind]").prop("checked", false);
    $("input[name=kind][value='1']").prop("checked",true);

    $('.js-labelFile').removeClass('has-file');
    $('.js-fileName').html('Загрузите обложку 900x100');
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
            $('[js-update-article-form-type]').val(data.type);
            $('[js-update-article-form-img]').val(data.previewImg);
            $('#editor-update .ql-editor').html(data.text);
            $('#editor-hidden-update').val(data.text);
            $("input[name=kind][value='" + data.kind + "']").prop("checked",true);
            changeKind(data.kind);
            $('[js-update-article]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-update-article]').prop("disabled", false);
        }
    });
}





function initEditor() {
    const toolbarOptions = [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic'],
        [{ 'list': 'bullet' }],
        [{ 'align': ['', 'center', 'right'] }],
        ['video'],
        ['image'],
        // ['iframe'],
        ['clean']
    ];
    const $hiddenEditor = $('#editor-hidden');

    var quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
            toolbar: toolbarOptions
        }
    });

    quill.on('text-change', function(delta, oldDelta, source) {
        $hiddenEditor.val(quill.root.innerHTML);
    });
}

function initUpdateEditor() {
    const toolbarOptions = [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic'],
        [{ 'list': 'bullet' }],
        [{ 'align': ['', 'center', 'right'] }],
        ['video'],
        ['image'],
        // ['iframe'],
        ['clean']
    ];
    const $hiddenEditor = $('#editor-hidden-update');

    var quill = new Quill('#editor-update', {
        theme: 'snow',
        modules: {
            toolbar: toolbarOptions
        }
    });

    quill.on('text-change', function(delta, oldDelta, source) {
        $hiddenEditor.val(quill.root.innerHTML);
    });
}

function updateTextArticle(articleData) {
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
            updateArticleAfterUpdate(data);
            $('[js-menu-update-article]').removeClass('is-open');
            checkBodyHidden();
            resetUpdateForm();
            $('[js-save-update-article]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-update-article]').prop("disabled", false);
        }
    });
}
function updateArticleAfterUpdate(articleData) {
    if (articleData.type === $('[js-type]').attr('type')) {
        $('.theme[data-article="' + articleData.id + '"]').find('.theme__text-wrapper').html(
            (
                (articleData.kind == 1) ? '<img class="article__img" src="/' + articleData.previewImg + '">' :

                (articleData.kind == 2) ? '<img js-open-article class="article__img article__img_modal" src="/' + articleData.previewImg + '">' :

                (articleData.kind == 3) ? '<a target="_blank" href="' + articleData.link + '">' +
                '                            <img class="article__img" src="/' + articleData.previewImg + '">' +
                '                          </a>' : ''
            )
        );
    } else {
        $('.theme[data-article="' + articleData.id + '"]').remove();
    }
}