$(document).on('click', '[js-menu-rate-close-btn]', function(event){
    $('[js-menu-rate]').removeClass('is-open');
    checkBodyHidden();
});

$(document).on('click', '[open-rate]', function(event){
    openRateMenu($(this).closest('[data-rate]').data('rate'));
});

function openRateMenu(idRate) {
    var formData = new FormData();
    formData.append('id', idRate);

    $('[open-rate]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "/performance-assessment/getRateInfo",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            setRateInfo(data);

            $('[js-menu-rate]').addClass('is-open');
            checkBodyHidden();
            $('[open-rate]').prop("disabled", false);
        },
        error: function (data) {
            $('[open-rate]').prop("disabled", false);
        }
    });
}

function setRateInfo(data) {
    $('[rate-header]').html(data.performanceAssessmentTemplateName);
    $('[rate-date]').html(data.createDate);
    $('[rate-deal]').html('Сделка № ' + data.idDeal);
    $('[rate-score ]').html(data.totalScore);
    $('[rate-score ]').removeClassWild("score_*");
    $('[rate-score ]').addClass((data.totalScore > 0 ? 'score_green' : (data.totalScore === 0 ? 'score_gray' : 'score_red')));

    var rows = '';
    $.each(data.items, function(index, item){
        rows +=
            '<tr class="custom-table__body-row">' +
            '   <td class="custom-table__body-col custom-table__body-col_xxxlarge">' + item.itemName + '</td>' +
            '   <td class="custom-table__body-col custom-table__body-col_center custom-table__body-col_xsmall">' +
            '       <div class="score ' + (item.score > 0 ? 'score_green' : (item.score == 0 ? 'score_gray' : 'score_red')) + '">' + (item.score > 0 ? ('+' + item.score) : (item.score)) + '</div>' +
            '   </td>' +
            '   <td class="custom-table__body-col custom-table__body-col_r16">   ' +
            '       <div open-comment data-item="' + item.id + '" class="button button_white">Посмотреть</div>' +
            '   </td>' +
            '</tr>';
    });
    $('[rate-items]').html(rows);
}

$(document).on('click', '[open-comment]', function(event){
    openCommentMenu($(this).closest('[data-item]').data('item'));
});

function openCommentMenu(idComment) {
    var formData = new FormData();
    formData.append('id', idComment);

    $('[open-comment]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "/performance-assessment/getRateItemInfo",
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
    $('[js-open-comment-form]').trigger('reset');
    $('.input-element__documents-new').html('');
    FILES = new FormData();
    //
    // $('[c-rate-score]').removeClassWild("score_*");
    // $('.wish-score').html('—');
    // $('.wish-score').removeClassWild("score_*");

    $('[comments]').nextAll('.comment').remove();

    $('[debate-btn-block]').removeClass('is-open');
    $('[debate-block]').removeClass('is-open');
    //
    // $('[ex-comment]').removeClass('comment__wrapper_400 comment__wrapper_violet');
    // $('[c-rate-mcomment]').html('');
    // $('[c-rate-mdocuments]').html('');
    // $('[c-rate-mscore]').removeClassWild("score_*");
    // $('[examiner-comment]').removeClass('is-open');
    // $('[manager-comment]').removeClass('is-open');

}
// function setRateItemInfo(data) {
//     resetOpenCommentMenu();
//
//     $('[c-rate-id]').val(data.id);
//     $('[c-rate-id-item]').val(data.idItem);
//     $('[c-rate-item-name]').html(data.itemName);
//
//     if (data.exComment !== null || data.documents.length !== 0) {
//         $('[examiner-comment]').addClass('is-open');
//     }
//
//     $('[c-rate-comment]').html(data.exComment);
//
//     $('[c-rate-score]').html(data.score);
//     $('[c-rate-score]').addClass((data.score > 0 ? 'score_green' : (data.score === 0 ? 'score_gray' : 'score_red')));
//
//     setDocuments(data.documents, $('[c-rate-documents]'));
//
//     if (!data.isExpired && (data.status === 1 || data.status === 4)) {
//         $('[debate-btn-block]').addClass('is-open');
//     }
//
//     if (data.status !== 1 && data.status !== 4) {
//         $('[c-rate-mcomment]').html(data.managerComment);
//         setDocuments(data.managerDocuments , $('[c-rate-mdocuments]'));
//
//         $('[ manager-comment]').addClass('is-open');
//         $('[ex-comment]').addClass('comment__wrapper_400 comment__wrapper_violet');
//
//         $('[c-rate-mscore]').html(data.wishScore);
//         $('[c-rate-mscore]').addClass((data.wishScore > 0 ? 'score_green' : (data.wishScore === 0 ? 'score_gray' : 'score_red')));
//
//     }
//
//     $('[c-rate-mgood]').val(data.goodScore);
//     $('[c-rate-mbad]').val(data.badScore);
// }
function setRateItemInfo(data) {
    resetOpenCommentMenu();

    $('[c-rate-id]').val(data.id);
    $('[c-rate-id-item]').val(data.idItem);
    $('[c-rate-item-name]').html(data.itemName);

    $('[c-rate-score]').html(data.score);
    $('[c-rate-score]').addClass((data.score > 0 ? 'score_green' : (data.score === 0 ? 'score_gray' : 'score_red')));

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
                '</div>'
        }
    });
    $('[comments]').after(comments);

    if (!data.isExpired && (data.status === 1 || data.status === 4)) {
        $('[debate-btn-block]').addClass('is-open');
    }
    $('[c-rate-mgood]').val(data.goodScore);
    $('[c-rate-mbad]').val(data.badScore);
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

$(document).on('click', '[debate-btn]', function(event){
    $('[debate-btn-block]').removeClass('is-open');
    $('[debate-block]').addClass('is-open');
});

$(document).on('click', '[accept-debate]', function(event) {
    event.preventDefault();
    $('[js-open-comment-form]').trigger('submit');
});
$(document).on('submit', '[js-open-comment-form]', function(event) {
    event.preventDefault();
    if (validateCheckboxForm(this)) {
        var formData = new FormData($('[js-open-comment-form]')[0]);
        addFilesToFormData(formData);

        saveDebate(formData);
    }
});

function saveDebate(formData) {
    $('[accept-debate]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "/performance-assessment/saveDebate",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $('[js-menu-open-comment]').removeClass('is-open');
            checkBodyHidden();

            $('[data-item="' + formData.get('id') + '"]').find('.status').html('На рассмотрении');

            $('[accept-debate]').prop("disabled", false);
            hideLoader();
        },
        error: function (data) {
            $('[accept-debate]').prop("disabled", false);
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

$(document).on('change', '.wish-value', function() {
    var score = Number($(this).val());
    var scoreBlock = $('.wish-score');

    scoreBlock.removeClassWild("score_*");
    if (score > 0) {
        scoreBlock.addClass('score_green');
    } else if (score < 0) {
        scoreBlock.addClass('score_red');
    } else {
        scoreBlock.addClass('score_gray');
    }
    scoreBlock.html(score);
});