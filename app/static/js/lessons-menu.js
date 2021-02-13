

$(document).on('click', '[js-update-lesson]', function(event) {
    var idLesson = $(this).closest('.lesson').attr('data-lesson');
    setUpdateLessonFormData(idLesson);
    $('[js-menu-update-lesson]').addClass('is-open');
    checkBodyHidden();
});
$(document).on('click', '[js-update-delete-doc]', function() {
    var request = new FormData();
    request.append('idLesson', $('[js-update-lesson-form-id]').val());
    request.append('file',  $(this).attr('data-file'));

    var element = $(this);

    $('[js-update-delete-doc]').prop("disabled", true);
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "deleteDocument",
        data: request,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 300000,
        success: function (data) {
            element.closest('.input-element__document-wrapper').remove();
            $('[js-update-delete-doc]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-update-delete-doc]').prop("disabled", false);
        }
    });
});
$(document).on('click', '[js-menu-update-lesson-close-btn]', function(event) {
    $('[js-menu-update-lesson]').removeClass('is-open');
    resetUpdateLessonForm();
    checkBodyHidden();
});
$(document).on('click', '[js-update-save-lesson]', function(event){
    event.preventDefault();
    $('[js-update-lesson-form]').trigger('submit');
});
$(document).on('submit', '[js-update-lesson-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var form = $('[js-update-lesson-form]')[0];
        var lessonData = new FormData(form);
        addFilesToFormData(lessonData);
        updateLesson(lessonData);
    }
});
$(document).on('click', '[js-create-lesson]', function(event) {
    var idTutorial = $(this).closest('.theme').attr('data-tutorial');
    $('[js-lesson-form-id-tutorial]').val(idTutorial);
    $('[js-menu-create-lesson]').addClass('is-open');
    checkBodyHidden();
});
$(document).on('click', '[js-menu-create-lesson-close-btn]', function(event) {
    $('[js-menu-create-lesson]').removeClass('is-open');
    resetCreateLessonForm();
    checkBodyHidden();
});
$(document).on('click', '[js-save-lesson]', function(event){
    event.preventDefault();
    $('[js-lesson-form]').trigger('submit');
});
$(document).on('submit', '[js-lesson-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var form = $('[js-lesson-form]')[0];
        var lessonData = new FormData(form);
        addFilesToFormData(lessonData);
        createLesson(lessonData);
    }
});

$(document).ready(function() {
    initDeleteLesson();
});

function createLesson(lessonData) {
    $('[js-save-lesson]').prop("disabled", true);
    $.ajax({
        type: "POST",
        enctype: "multipart/form-data",
        url: "saveLesson",
        data: lessonData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            updateLessonInTutorialContainer(data);
            $('[js-menu-create-lesson]').removeClass('is-open');
            resetCreateLessonForm();
            checkBodyHidden();
            $('[js-save-lesson]').prop("disabled", false);
            hideLoader();
        },
        error: function (data) {
            $('[js-save-lesson]').prop("disabled", false);
            hideLoader();
        },
        beforeSend: function() {
            showLoader();
        },
        afterSend: function() {
            hideLoader();
        }
    });
}


function updateLesson(lessonData) {
    $('[js-update-save-lesson]').prop("disabled", true);
    $.ajax({
        type: "POST",
        enctype: "multipart/form-data",
        url: "updateLesson",
        data: lessonData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            updateLessonAfterUpdate(data);
            $('[js-menu-update-lesson]').removeClass('is-open');
            resetUpdateLessonForm();
            checkBodyHidden();
            $('[js-update-save-lesson]').prop("disabled", false);
            hideLoader();
        },
        error: function (data) {
            $('[js-update-save-lesson]').prop("disabled", false);
            hideLoader();
        },
        beforeSend: function() {
            showLoader();
        },
        afterSend: function() {
            hideLoader();
        }
    });
}


function updateLessonAfterUpdate(data) {
    var $lesson = $('.lesson[data-lesson="' + data.id + '"]');
    $lesson.find('.lesson-header__title').html(data.name);
    $lesson.find('.lesson-video').attr('href', data.videoLink);

    var videoPreview = data.videoLink.substr(data.videoLink.lastIndexOf('/') + 1, data.videoLink.length);
    $lesson.find('.lesson-video__preview').attr('src', '//img.youtube.com/vi/' + videoPreview + '/hqdefault.jpg');
    $lesson.find('.lesson-description').html(data.description);

    var documents = '';
    $.each(data.documents, function (index, value) {
        var document = '<a href="' + value.path +'" class="lesson-document">' +
            '<div class="lesson-document__type lesson-document__type_' + value.type + '">' + value.type + '</div>' +
            '<div class="lesson-document__name">' + value.name + '</div>' +
            '</a>';

        documents += document;
    });
    $lesson.find('.lesson__documents').html(documents);
}
function updateLessonInTutorialContainer(data) {
    var $themeLessons = $('.theme[data-tutorial="' + data.idTutorial + '"]').find('.theme__lessons');
    var lastIndex = $('.theme[data-tutorial="' + data.idTutorial + '"]').find('.theme__lessons .lesson:last').find('.lesson-header__number').find('[lesson-counter]').html();

    var videoPreview = data.videoLink.substr(data.videoLink.lastIndexOf('/') + 1, data.videoLink.length);

    var documents = '';
    $.each(data.documents, function (index, value) {
        var document = '<a href="' + value.path +'" class="lesson-document">' +
            '<div class="lesson-document__type lesson-document__type_' + value.type + '">' + value.type + '</div>' +
            '<div class="lesson-document__name">' + value.name + '</div>' +
            '</a>';

        documents += document;
    });

    $themeLessons.html($themeLessons.html() +
        '<div class="lesson" data-lesson="' + data.id + '"">' +
        '   <div js-update-lesson class="theme-setting theme-setting_top theme-setting_absolute theme-setting_big"></div>' +
        '   <div class="lesson__header">' +
        '       <div class="lesson-header__number">' +
        '           <span lesson-counter>' + ((typeof lastIndex == "undefined") ? 1 : parseInt(lastIndex) + 1) + '</span>' +
        '           <span>урок</span>' +
        '       </div>' +
        '       <div class="lesson-header__title">' + data.name + '</div>' +
        '   </div>' +
        '   <div class="lesson__content">' +
        '       <div class="lesson__content-wrapper">' +
        '       <div class="lesson-content__side">' +
        '           <a href="' + data.videoLink + '" class="lesson-video js-fancybox">' +
        '               <img src="//img.youtube.com/vi/' + videoPreview + '/hqdefault.jpg" class="lesson-video__preview" alt="">' +
        '           </a>' +
        '       </div>' +
        '       <div class="lesson-content__main">' +
        '           <div class="lesson-description">' + data.description + '</div>' +
        '           <div class="lesson__documents">' +
                        documents +
                    '</div>' +
        '       </div>' +
        '       </div>' +
        '   </div>' +
        '</div>'
    );

    initFancy();
}


function resetCreateLessonForm() {
    var form = $('[js-lesson-form]');
    form.trigger('reset');
    clearFiles(form);
}
function resetUpdateLessonForm() {
    var form = $('[js-update-lesson-form]');
    form.trigger('reset');
    $('[js-update-lesson-form-documents]').html('');
    clearFiles(form);
}

function setUpdateLessonFormData(idLesson) {
    $('[js-update-lesson]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "getLesson",
        data: JSON.stringify(idLesson),
        dataType: 'json',
        cache: false,
        success: function (data) {
            $('[js-update-lesson-form-id]').val(data.id);
            $('[js-update-lesson-form-name]').val(data.name);
            $('[js-update-lesson-form-desc]').val(data.description);
            $('[js-update-lesson-form-video-link]').val(data.videoLink);

            var documents = '';
            $.each(data.documents, function (index, value) {
                var doc = '<div class="input-element__document-wrapper">' +
                    '<div class="lesson-document lesson-document_full lesson-document_without-hover">' +
                    '<div class="lesson-document__type lesson-document__type_' + value.type + '">' + value.type + '</div>' +
                    '<div class="lesson-document__name">' + value.name + '</div>' +
                    '</div>' +
                    '<div js-update-delete-doc data-file="' + value.name + '.' + value.type + '" class="lesson-document__delete-btn"></div>' +
                    '</div>';

                documents += doc;
            });
            $('[js-update-lesson-form-documents]').html(documents);

            $('[js-update-lesson]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-update-lesson]').prop("disabled", false);
        }
    });
}

function initDeleteLesson() {
    $('[js-delete-lesson]').on('click', function(event) {
        var idLesson = $('[js-update-lesson-form-id]').val();

        $('[js-delete-lesson]').prop("disabled", true);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "deleteLesson",
            data: JSON.stringify(idLesson),
            dataType: 'json',
            cache: false,
            success: function (data) {
                $('.lesson[data-lesson="' + idLesson + '"]').remove();
                $('[js-menu-update-lesson]').removeClass('is-open');
                checkBodyHidden();
                resetUpdateLessonForm();
                $('[js-delete-lesson]').prop("disabled", false);
            },
            error: function (data) {
                $('[js-delete-lesson]').prop("disabled", false);
            }
        });
    });
}
