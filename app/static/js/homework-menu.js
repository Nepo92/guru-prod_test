$(document).on('click', '[rate-homework]', function(event){
    event.preventDefault();
    var json = new Object();
    json.id = Number($(this).closest('[data-homework]').data('homework'));

    getHomework(json, true);
});
function getHomework(json, isNeedFormBlocks) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "getHomework",
        data: JSON.stringify(json),
        dataType: 'json',
        cache: false,
        success: function (data) {
            openHomework(data, isNeedFormBlocks);
        },
        error: function (data) {
        }
    });
}

$(document).on('click', '[view-homework]', function(event){
    event.preventDefault();
    var json = new Object();
    json.id = Number($(this).closest('[data-homework]').data('homework'));

    getHomework(json, false);
});
function openHomework(data, isNeedFormBlocks) {
    clearHomeworkForm();

    $('[h-rate-id]').val(data.id);
    setHomeworkComments(data);

    if(isNeedFormBlocks) {
        $('[rate-form-block]').addClass('is-open');
    } else {
        $('[rate-form-block]').removeClass('is-open');
    }

    $('[js-menu-rate-homework]').addClass('is-open');
    checkBodyHidden();
}
function clearHomeworkForm() {
    $('[rate-homework-form]').trigger('reset');
    $('[rate-comments]').html('');
    $('[upload-list]').html('');
    $('[rate-form-block]').removeClass('is-open');
}
function setHomeworkComments(data) {
    var commentsBlock = '';
    $.each(data.comments, function(index, comment){
        var isUserComment = comment.type == 'user';
        var filesBlock = '';
        $.each(comment.homeworkFiles, function(index2, file){
            if (file.type == 'jpeg' || file.type == 'jpg' || file.type == 'png') {
                filesBlock += '<div class="gallery__item">' +
                    '   <a href="/' + file.path + '" data-fancybox="' + file.name + '" class="gallery-item gallery-item_small">' +
                    '       <img class="gallery-item__preview" src="/' + file.path + '">' +
                    '   </a>' +
                    '</div>';
            } else if (file.type == 'doc' || file.type == 'pdf') {
                filesBlock +=
                '<a href="' + file.id + '/' + file.path +'" class="gallery__item">' +
                '   <div class="gallery-item gallery-item_small gallery-item_' + file.type + '">' +
                '       <div class="gallery-item__title">' + file.type + '</div>' +
                '       <div class="gallery-item__subtitle">' + file.name + '</div>' +
                '   </div>' +
                '</a>';
            }
        });

        commentsBlock += '<div class="comment comment_modal comment_large ' + (!isUserComment ? 'comment_right' : '') + '">' +
            '   <div class="comment__header -gap_2">' +
            '       <div class="comment__header-item">' +
            '           <div class="comment__title">' + (!isUserComment ? 'Ваш комментарий' : 'Комментарий пользователя') + '</div>' +
            '        </div>' +
            '    </div>' +
            '    <div class="comment__body comment__body_small ' + (!isUserComment ? 'comment__body_violet' : '') + '">' +
            '       <div class="comment__text comment__text_small">' + comment.text + '</div>' +
            '           <div class="gallery -gap-inner-top_1">' +
            '               <div class="gallery__wrapper gallery__wrapper_small custom-scroll">' +
            '                   <div class="gallery__list">' + filesBlock + '</div>' +
            '               </div>' +
            '           </div>' +
            '       </div>' +
            '   </div>' +
            '</div>'
    });

    $('[rate-comments]').html(commentsBlock);

}
$(document).on('click', '[js-menu-rate-homework-close-btn]', function(event){
    closeRateHomework();
});

function closeRateHomework() {
    $('[js-menu-rate-homework]').removeClass('is-open');
    checkBodyHidden();
}

$(document).on('click', '[rate-homework-btn]', function(event) {
    event.preventDefault();
    $('[rate-homework-form]').trigger('submit');
});

$(document).on('submit', '[rate-homework-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[rate-homework-form]')[0]);
        setFilesToFormData(formData);
        saveRate(formData);
    }
});

function saveRate(formData) {
    $('[save-homework-btn]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "saveRateHomework",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            changeRatedCounter();
            updateHomeworkRow(data);

            closeRateHomework();

            $('[save-homework-btn]').prop("disabled", false);
        },
        error: function (data) {
            closeRateHomework();
            $('[save-homework-btn]').prop("disabled", false);
        }
    });
}

function changeRatedCounter() {
    var ratedCounter = Number($('[rated-counter]').html()) + 1;
    $('[rated-counter]').html(ratedCounter);
}

function updateHomeworkRow(data) {
    var homeworkRow = $('[data-homework="' + data.id + '"]');
    homeworkRow.find('[homework-rate]').html(
        '<div class="homework-rate">' +
        '   <div class="homework-rate__wrapper">' +
        '       <div class="homework-rate__score">' + data.rate  + '</div>' +
        '   </div>' +
        '</div>');
    homeworkRow.find('[homework-status]').html(
        '<div view-homework class="btn btn_rated">' +
        '   <div class="btn__content btn__content_small">' +
        '       <span class="btn__title btn__title_xsmall">' +
        '           <span class="btn_title-text btn_title-text_small">Проверено</span>' +
        '       </span>' +
        '   </div>' +
        '</div>');
}