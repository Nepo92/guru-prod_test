$(document).on('click', '[open-comment]', function(event){
    resetOpenCommentMenu();
    openCommentMenu($(this).closest('[data-item]').data('item'));
});

function openCommentMenu(idComment) {
    var formData = new FormData();
    formData.append('id', idComment);

    $('[open-comment]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getRateItemInfo",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            setRateItemInfo(data);

            $('[js-menu-open-comment]').addClass('is-open');
            checkBodyHidden();
            $('[open-comment]').prop("disabled", false);
        },
        error: function (data) {
            $('[open-comment]').prop("disabled", false);
        }
    });
}

function resetOpenCommentMenu() {
    // $('[c-rate-mscore]').removeClassWild("score_*");
    // $('[examiner-comment]').removeClass('is-open');
    $('[process-btn]').removeClass('is-open');
    $('[not-process-btn]').removeClass('is-open');
    $('[debate-comment]').removeClass('is-open');

    $('[js-open-comment-form]').trigger('reset');
    $('.input-element__documents-new').html('');
    FILES = new FormData();

    $('[comments]').nextAll('.comment').remove();
}

function setRateItemInfo(data) {

    $('[c-rate-id]').val(data.id);

    var comments = '';
    $.each(data.comments, function(index, comment) {
        var documents = getDocuments(comment.commentFiles);
        if ((documents.length != 0 || comment.text != null) || comment.type == 'manager') {
            comments +=
                '<div class="comment">' +
                '   <div class="comment__wrapper ' + (comment.type == 'examiner' ? 'comment__wrapper_400 comment__wrapper_violet' : 'comment__wrapper_400 comment__wrapper_right') + '">' +
                (comment.type == 'manager' ?
                    '<div class="comment__score"><span>Желаемая оценка </span><div class="score ' + (comment.wishScore > 0 ? 'score_green' : (comment.wishScore === 0 ? 'score_gray' : 'score_red')) + '">' + comment.wishScore + '</div></div>' : '') +
                ((comment.text != null) ? '<div class="comment__text">' + comment.text + '</div>' : '') +
                '       <div class="comment__document-wrapper">' +
                documents +
                '       </div>' +
                '   </div>' +
                '</div>';
        }

        $('[c-rate-mscore]').val(comment.wishScore);
    });
    $('[comments]').after(comments);

    if (data.status !== 2) {
        $('[not-process-btn]').addClass('is-open');
    } else {
        $('[process-btn]').addClass('is-open');
        $('[debate-comment]').addClass('is-open');
    }
}

function getDocuments(documents) {
    var documentsBlock = '';
    $.each(documents, function(index, document){
        if (document.type === 'png' || document.type === 'jpeg' || document.type === 'jpg') {
            documentsBlock += '<div class="comment__document">' +
                '   <a class="comment__img" data-fancybox="' + document.name + '" href="/' + document.shortPath + '">  ' +
                '       <img src="/' + document.shortPath + '">' +
                '   </a>' +
                '</div>';
        } else {
            documentsBlock += '<div class="comment__document">' +
                '<a href="' + document.path + '" class="comment__file comment__file_' + document.type + '">' +
                '<div class="comment__file-type">' + document.type + '</div>' +
                // '<div class="comment__file-name">' + document.name + '</div>' +
                '</a>' +
                '</div>';
        }

    });

    return documentsBlock;
}

$(document).on('click', '[js-menu-open-comment-close-btn]', function(event){
    $('[js-menu-open-comment]').removeClass('is-open');
    checkBodyHidden();
});

$(document).on('click', '[approve]', function(event){
    var formData = new FormData($('[js-open-comment-form]')[0]);
    addFilesToFormData(formData);

    $('[approve]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "approveDebate",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            updateRateOnList(formData.get('id'), 'Подтвержден', $('[c-rate-mscore]').val());

            $('[js-menu-open-comment]').removeClass('is-open');
            checkBodyHidden();

            $('[approve]').prop("disabled", false);
        },
        error: function (data) {
            $('[approve]').prop("disabled", false);
        }
    });
});

$(document).on('click', '[reject]', function(event){
    var formData = new FormData($('[js-open-comment-form]')[0]);
    addFilesToFormData(formData);

    $('[reject]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "rejectDebate",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            updateRateOnList(formData.get('id'), 'Отклонен');

            $('[js-menu-open-comment]').removeClass('is-open');
            checkBodyHidden();
            $('[reject]').prop("disabled", false);
        },
        error: function (data) {
            $('[reject]').prop("disabled", false);
        }
    });
});

function updateRateOnList(id, status, score) {
    $('[data-item="' + id + '"]').find('.status').html(status);
    if (score) {
        $('[data-item="' + id + '"]').find('.score').removeClassWild("score_*");
        $('[data-item="' + id + '"]').find('.score').addClass((score > 0 ? 'score_green' : (score === 0 ? 'score_gray' : 'score_red')));
        var afterDot = (score.toString().includes('.')) ? (score.toString().split('.').pop().length) : 0;
        var wishScore = afterDot == 0 ? Number(score).toFixed(1) : score;
        $('[data-item="' + id + '"]').find('.score').html(score > 0 ? ('+' + wishScore)  : wishScore);
    }
}