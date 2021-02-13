$(document).on('click', '[js-update-tutorial]', function(event) {
    setUpdateTutorialFormData($(this).closest('.theme').attr('data-tutorial'));
    $('[js-menu-update-tutorial]').addClass('is-open');
    checkBodyHidden();
});
$(document).on('click', '[js-menu-update-tutorial-close-btn]', function(event) {
    $('[js-menu-update-tutorial]').removeClass('is-open');
    resetUpdateForm();
    checkBodyHidden();
});
$(document).on('click', '[js-update-save-tutorial]', function(event){
    event.preventDefault();
    $('[js-update-tutorial-form]').trigger('submit');
});
$(document).on('submit', '[js-update-tutorial-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var form = $('[js-update-tutorial-form]')[0];
        var tutorialData = new FormData(form);
        updateTutorial(tutorialData);
    }
});

$(document).ready(function() {
    const $menuCreateTutorialBtn = $('[js-create-tutorial]');
    const $menuCreateTutorialCloseBtn = $('[js-menu-create-tutorial-close-btn]');
    const $menuCreateTutorial = $('[js-menu-create-tutorial]');

    const $saveTutorialBtn = $('[js-save-tutorial]');
    const $createTutorialForm = $('[js-tutorial-form]');

    $menuCreateTutorialBtn.on('click', function () {
        $menuCreateTutorial.addClass('is-open');
        checkBodyHidden()
    });

    $menuCreateTutorialCloseBtn.on('click', function () {
        $menuCreateTutorial.removeClass('is-open');
        resetCreateForm();
        checkBodyHidden()
    });

    $saveTutorialBtn.on('click', function (event) {
        event.preventDefault();
        $createTutorialForm.trigger('submit');
    });

    $createTutorialForm.submit(function (event) {
        event.preventDefault();
        if (validateForm(this)) {
            var form = $createTutorialForm[0];
            var tutorialData = new FormData(form);
            createTutorial(tutorialData);
        }
    });

    initDeleteTutorial();

});

function updateTutorial(tutorialData) {
    $('[js-save-update-tutorial]').prop("disabled", true);
    $.ajax({
        type: "POST",
        enctype: "multipart/form-data",
        url: "updateTutorial",
        data: tutorialData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            updateTutorialAfterUpdate(data);
            $('[js-menu-update-tutorial]').removeClass('is-open');
            checkBodyHidden();
            resetUpdateForm();
            $('[js-save-update-tutorial]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-update-tutorial]').prop("disabled", false);
        }
    });
}

function updateTutorialAfterUpdate(tutorialData) {
    if (tutorialData.type === $('[js-type]').attr('type')) {
        $('.theme[data-tutorial="' + tutorialData.id + '"]').find('[tutorial-name]').html(tutorialData.name);
        $('.theme[data-tutorial="' + tutorialData.id + '"]').find('[tutorial-preview]').attr('src', '/' + tutorialData.previewImg);
    } else {
        $('.theme[data-tutorial="' + tutorialData.id + '"]').remove();
    }
}

function setUpdateTutorialFormData(idTutorial) {
    $('[js-update-tutorial]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "getTutorial",
        data: JSON.stringify(idTutorial),
        dataType: 'json',
        cache: false,
        success: function (data) {
            $('[js-update-tutorial-form-id]').val(data.id);
            $('[js-update-tutorial-form-name]').val(data.name);
            $('[js-update-tutorial-form-type]').val(data.type);
            $('[js-update-tutorial-form-img]').val(data.previewImg);
            $('[js-update-tutorial]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-update-tutorial]').prop("disabled", false);
        }
    });
}

function createTutorial(tutorialData) {
    $('[js-save-tutorial]').prop("disabled", true);
    $.ajax({
        type: "POST",
        enctype: "multipart/form-data",
        url: "saveTutorial",
        data: tutorialData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            updateTutorialInContainer(data);
            $('[js-menu-create-tutorial]').removeClass('is-open');
            resetCreateForm();
            checkBodyHidden();
            $('[js-save-tutorial]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-tutorial]').prop("disabled", false);
        }
    });
}
function updateTutorialInContainer(data) {
    if (data.type === $('[js-type]').attr('type')) {
        $('.theme-container').html($('.theme-container').html() +
            '<div class="theme " data-tutorial="' + data.id + '">' +
            '   <div class="theme-wrapper">' +
            '       <div class="theme__title-wrapper theme__title-wrapper_b20">' +
            '           <div tutorial-name class="theme-title theme-title_delim">' + data.name + '</div>' +
            '           <div js-update-tutorial class="theme-setting"></div>' +
            '           <div js-create-lesson class="add-button add-button_right">+ Добавить урок</div>' +
            '       </div>' +
            '       <div class="theme__img">' +
            '           <img tutorial-preview class="article__img"src="/' + data.previewImg + '">' +
            '       </div>' +
            '       <div class="theme__lessons">' +
            '       </div>' +
            '   </div>' +
            '</div>'
        );
    }
}
function resetCreateForm() {
    $('[js-tutorial-form]').trigger('reset');
    $('.js-labelFile').removeClass('has-file');
    $('.js-fileName').html('Загрузите обложку курса 1180x350');
}

function resetUpdateForm() {
    $('[js-update-tutorial-form]').trigger('reset');
    $('.js-labelFile').removeClass('has-file');
    $('.js-fileName').html('Загрузите обложку курса 1180x350');
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

function initDeleteTutorial() {
    $('[js-delete-tutorial]').on('click', function(event) {
        var idTutorial = $('[js-update-tutorial-form-id]').val();

        $('[js-delete-tutorial]').prop("disabled", true);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "deleteTutorial",
            data: JSON.stringify(idTutorial),
            dataType: 'json',
            cache: false,
            success: function (data) {
                $('.theme[data-tutorial="' + idTutorial + '"]').remove();
                $('[js-menu-update-tutorial]').removeClass('is-open');
                checkBodyHidden();
                resetUpdateForm();
                $('[js-delete-tutorial]').prop("disabled", false);
            },
            error: function (data) {
                $('[js-delete-tutorial]').prop("disabled", false);
            }
        });
    });
}