$(document).on('click', '[open-rates]', function(event){
    openRatesMenu($(this).closest('[data-deal]').data('deal'));
});
$(document).on('click', '[js-menu-rates-close-btn]', function(event){
    $('[js-menu-rates]').removeClass('is-open');
    checkBodyHidden();
});
function openRatesMenu(idDeal) {
    var formData = new FormData();
    formData.append('id', idDeal);

    $('[open-rates]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getRateTemplatesInfo",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            resetRateTemplatesInfo();
            setRateTemplatesInfo(data);

            $('[js-menu-rates]').addClass('is-open');
            checkBodyHidden();
            $('[open-rates]').prop("disabled", false);
        },
        error: function (data) {
            $('[open-rates]').prop("disabled", false);
        }
    });
}
function setRateTemplatesInfo(data) {
    var avatar = data.employee.avatar;
    if (avatar === null) {
        $('[rate-avatar]').addClass('avatar-image_default');
        $('[rate-avatar]').html('');
    } else {
        $('[rate-avatar]').html('<img src="/' + avatar + '" alt="">');
    }

    $('[rate-employee-name]').html(data.employee.name);
    $('[rate-employee-position]').html(data.employee.position);
    $('[rate-date]').html((data.editDate !== null ? data.editDate : ''));
    $('[rate-deal]').html('Сделка № ' + data.idDeal);

    $('[rate-id-deal]').val(data.idDeal);

    var templates = '';
    $.each(data.templates, function(index, template){
        templates += '<tr template-info="' + template.id + '" class="custom-table__body-row">' +
            '<td class="custom-table__body-col custom-table__body-col_xxxsmall">' +
            '   <div class="column_bstatus ' + ((template.isRated) ? "column_bstatus_checked" : "column_bstatus_unchecked") + '"></div>' +
            '</td>' +
            '<td class="custom-table__body-col custom-table__body-col_60per">' +
            '   <div class="column-text column-text_full">' + template.name + '</div>' +
            '</td>' +
            '<td class="custom-table__body-col custom-table__body-col_10per">' +
            '   <div class="column-text">' + template.items.length + '</div>' +
            '</td>' +
            '<td class="custom-table__body-col custom-table__body-col_5per">' +
            (template.totalScore !== null
                ? '<div class="score ' + (template.totalScore > 0 ? 'score_green' : (template.totalScore == 0 ? 'score_gray' : 'score_red')) + '">' + (template.totalScore > 0 ? ('+' + template.totalScore) : (template.totalScore)) + '</div>'
                : '<div class="score score_gray">—</div>') +
            '</td>' +
            '<td class="custom-table__body-col custom-table__body-col_20per custom-table__body-col_r16">' +
            ((template.isRated) ? '<div data-rate="' + template.idRate + '" open-rate class="button button_white">Подробнее</div>' : '<div data-template="' + template.id + '" add-rate class="button button_violet">Оценить по списку</div>') +
            '</td>' +
            '</tr>';
    });
    $('[templates]').html(templates);

}
$(document).on('click', '[add-rate]', function(event){
    openAddRateMenu($(this).attr('data-template'));
});

function openAddRateMenu(idDeal) {
    var formData = new FormData();
    formData.append('id', idDeal);

    $('[add-rate]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getPerformanceAssessmentTemplatesItems",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $('[rate-id-template]').val(formData.get('id'));
            resetTotalScore();
            setTemplateItems(data);

            $('[js-menu-rate]').addClass('is-open');
            checkBodyHidden();
            $('[add-rate]').prop("disabled", false);
        },
        error: function (data) {
            $('[add-rate]').prop("disabled", false);
        }
    });
}
// function setRateTemplateInfo(data) {
//     var avatar = data.employee.avatar;
//     if (avatar === null) {
//         $('[rate-avatar]').addClass('avatar-image_default');
//         $('[rate-avatar]').html('');
//     } else {
//         $('[rate-avatar]').html('<img src="/' + avatar + '" alt="">');
//     }
//
//     $('[rate-employee-name]').html(data.employee.name);
//     $('[rate-employee-position]').html(data.employee.position);
//     $('[rate-date]').html((data.editDate !== null ? data.editDate : ''));
//     $('[rate-deal]').html('Сделка № ' + data.idDeal);
//
//     $('[rate-id-deal]').val(data.idDeal);
//
//     var templates = '';
//     $.each(data.availableTemplates, function(index, template){
//         templates += '<option value="' + template.id + '">' + template.name + '</option>';
//     });
//     $('[rate-templates]').html(templates);
//
//     $('[rate-templates]').trigger('change');
//
// }
$(document).on('click', '[js-menu-rate-close-btn]', function(event){
    resetRateTemplateInfo();
    $('[js-menu-rate]').removeClass('is-open');
    checkBodyHidden();
});
function resetRateTemplateInfo() {
    $('[js-save-rate]').attr('disabled', '');
    resetTotalScore();
    TEMP_DATA = {};
}
function resetRateTemplatesInfo() {
    $('[rate-avatar]').removeClass('avatar-image_default');
    $('[rate-avatar]').html('');
    $('[rate-employee-name]').html('');
    $('[rate-employee-position]').html('');
    $('[rate-date]').html('');
    $('[rate-deal]').html('');
    $('[templates]').html('');
}

$(document).on('change', '[rate-templates]', function(event){
    var formData = new FormData();
    formData.append('id', Number($('option:selected', this).val()));

    $('[rate-templates]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getPerformanceAssessmentTemplatesItems",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $('[rate-id-template]').val(formData.get('id'));
            resetTotalScore();
            setTemplateItems(data);

            $('[rate-templates]').prop("disabled", false);
        },
        error: function (data) {
            $('[rate-templates]').prop("disabled", false);
        }
    });
});

function resetTotalScore() {
    $('.total-score').removeClassWild("score_*");
    $('.total-score').html('—');
}

function setTemplateItems(data) {
    var row = '';
    $.each(data, function(index, item){
        row += '<tr class="custom-table__body-row item-row">' +
            '<input type="hidden" name="items[' + index + '].idItem" value="' + item.id + '" required>' +
            '<td class="custom-table__body-col custom-table__body-col_25per">' + item.name + '</td>' +
            '<td class="custom-table__body-col custom-table__body-col_25per">' +
            '   <div add-comment data-index="' + index + '" class="button button_white">Оставить комментарий</div>' +
            '</td>' +
            '<td class="custom-table__body-col custom-table__body-col_10per custom-table__body-col_center">' +
            '   <div class="score item-score">—</div>' +
            '</td>' +
            '<td class="custom-table__body-col custom-table__body-col_40per">' +
            '   <div class="rate-block">           ' +
            '       <div class="rate-block__wrapper">               ' +
            '           <div class="rate-block__btn rate-block__btn_small">                   ' +
            '               <input type="radio" id="good' + index + '" class="radio radio_icon radio_like rate-value" name="items[' + index + '].score" value="' + item.goodScore + '" required>                   ' +
            '               <label for="good' + index + '" class="label">Отлично</label>               ' +
            '           </div>               ' +
            '           <div class="rate-block__btn rate-block__btn_small">                   ' +
            '               <input type="radio" id="bad' + index + '" class="radio radio_icon radio_dislike rate-value" name="items[' + index + '].score" value="0" required>                   ' +
            '               <label for="bad' + index + '" class="label">Плохо</label>               ' +
            '           </div>           ' +
            '       </div>       ' +
            '   </div>' +
            '</td>' +
            '</tr>';
    });
    $('[template-fields]').html(row);
}

$(document).on('change', '.rate-value', function() {
    var score = Number($(this).val());
    var scoreBlock = $(this).closest('.item-row').find('.item-score');

    scoreBlock.removeClassWild("score_*");
    if (score > 0) {
        scoreBlock.addClass('score_green');
    } else if (score < 0) {
        scoreBlock.addClass('score_red');
    } else {
        scoreBlock.addClass('score_gray');
    }
    scoreBlock.html(score);

    checkAllRateValueSelected();
    countTotalScore();
});

function checkAllRateValueSelected() {
    var i = 0;
    var isAllSelected = true;
    while (true) {
        if ($('input[type="radio"][name="items[' + i + '].score"]').length) {
            if (!$('input[type="radio"][name="items[' + i + '].score"]').is(':checked')) {
                isAllSelected = false;
            }
        } else {
            break;
        }
        i++;
    }

    if (isAllSelected) {
        $('[js-save-rate]').removeAttr('disabled');
    }
}
function countTotalScore() {
    var total = 0;
    $.each($('.rate-value:checked'), function(index){
        total += Number($(this).val())
    });

    var totalScoreBlock = $('.total-score');

    totalScoreBlock.removeClassWild("score_*");
    if (total > 0) {
        totalScoreBlock.addClass('score_green');
    } else if (total < 0) {
        totalScoreBlock.addClass('score_red');
    } else {
        totalScoreBlock.addClass('score_gray');
    }

    totalScoreBlock.html(total);
}

$(document).on('click', '[js-save-rate]', function(event){
    event.preventDefault();
    $('[js-rate-form]').trigger('submit');
});
$(document).on('submit', '[js-rate-form]', function(event) {
    event.preventDefault();
    if (validateCheckboxForm(this)) {
        var formData = new FormData($('[js-rate-form]')[0]);


        $.each(TEMP_DATA, function(index, item){
            formData.append('items[' + index + '].exComment', item.get('exComment'));
            $.each(item.getAll('files'), function(index2, file){
                formData.append('items[' + index + '].files', file);
            });
        });

        saveRate(formData);
    }
});

function saveRate(formData) {
    $('[js-save-rate]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "saveRate",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            replaceTemplateInfoRow(data);

            resetRateTemplateInfo();
            $('[js-menu-rate]').removeClass('is-open');
            checkBodyHidden();

            $('[js-save-rate]').prop("disabled", false);
            hideLoader();
        },
        error: function (data) {
            $('[js-save-rate]').prop("disabled", false);
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
function replaceTemplateInfoRow(data) {
    $('[template-info="' + data.idPerformanceAssessmentTemplate + '"]').replaceWith(
        '<tr template-info="' + data.idPerformanceAssessmentTemplate + '" class="custom-table__body-row">' +
        '<td class="custom-table__body-col custom-table__body-col_xxxsmall">' +
        '   <div class="column_bstatus column_bstatus_checked"></div>' +
        '</td>' +
        '<td class="custom-table__body-col custom-table__body-col_60per">' +
        '   <div class="column-text">' + data.performanceAssessmentTemplateName + '</div>' +
        '</td>' +
        '<td class="custom-table__body-col custom-table__body-col_10per">' +
        '   <div class="column-text">' + data.items.length + '</div>' +
        '</td>' +
        '<td class="custom-table__body-col custom-table__body-col_5per">' +
        '   <div class="score ' + (data.totalScore > 0 ? 'score_green' : (data.totalScore == 0 ? 'score_gray' : 'score_red')) + '">' + (data.totalScore > 0 ? ('+' + data.totalScore) : (data.totalScore)) + '</div>' +
        '</td>' +
        '<td class="custom-table__body-col custom-table__body-col_20per custom-table__body-col_r16">' +
        '   <div data-rate="' + data.id + '" open-rate class="button button_white">Подробнее</div>' +
        '</td>' +
        '</tr>');
}

var TEMP_DATA = {};
$(document).on('click', '[add-comment]', function(event){
    var index = $(this).data('index');
    $('[comment-index]').val(index);

    $('[js-menu-add-comment]').addClass('is-open');
    checkBodyHidden();
});
$(document).on('click', '[js-menu-add-comment-close-btn]', function(event){
    resetAddCommentForm();

    $('[js-menu-add-comment]').removeClass('is-open');
    checkBodyHidden();
});
function resetAddCommentForm() {
    $('[js-add-comment-form]').trigger('reset');
    $('.input-element__documents-new').html('');
    FILES = new FormData();
}

$(document).on('click', '[js-add-comment]', function(event){
    event.preventDefault();
    var formData = new FormData($('[js-add-comment-form]')[0]);
    addFilesToFormData(formData);


    var index = $('[comment-index]').val();
    if (formData.get('exComment') !== "" || formData.getAll('files').length !== 0) {
        $('[add-comment][data-index="' + index + '"]').removeClass('button_white');
        $('[add-comment][data-index="' + index + '"]').html('Посмотреть комментарий');
        $('[add-comment][data-index="' + index + '"]').removeAttr('add-comment').attr('open-comment', '');
        TEMP_DATA[index] = formData;
    } else {
        $('[add-comment][data-index="' + index + '"]').addClass('button_white');
        $('[add-comment][data-index="' + index + '"]').html('Оставить комментарий');
        $('[add-comment][data-index="' + index + '"]').removeAttr('open-comment').attr('add-comment', '');
        delete TEMP_DATA[index];
    }

    resetAddCommentForm();
    $('[js-menu-add-comment]').removeClass('is-open');
    checkBodyHidden();
});

$(document).on('click', '[open-comment]', function(event){
    var index = $(this).data('index');
    $('[comment-index]').val(index);

    var formData = TEMP_DATA[index];
    $('[comment-index]').val(formData.get('index'));
    $('[comment-desc]').val(formData.get('exComment'));
    FILES = new FormData();

    setFiles(formData.getAll('files'));
    updateFiles($('[comment-files]'));

    $('[js-menu-add-comment]').addClass('is-open');
    checkBodyHidden();
});



$(document).on('click', '[view-comment]', function(event){
    openCommentMenu($(this).attr('data-item'));
});

function openCommentMenu(idComment) {
    var formData = new FormData();
    formData.append('id', idComment);

    $('[view-comment]').prop("disabled", true);
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
            $('[view-comment]').prop("disabled", false);
        },
        error: function (data) {
            $('[view-comment]').prop("disabled", false);
        }
    });
}
$(document).on('click', '[js-menu-open-comment-close-btn]', function(event){
    $('[js-menu-open-comment]').removeClass('is-open');
    checkBodyHidden();
});
function setRateItemInfo(data) {
    resetOpenCommentMenu();

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

function resetOpenCommentMenu() {
    $('[comments]').nextAll('.comment').remove();
}

$(document).on('click', '[js-menu-rate-close-btn]', function(event){
    $('[js-menu-rate]').removeClass('is-open');
    checkBodyHidden();
});

$(document).on('click', '[open-rate]', function(event){
    openRateMenu($(this).attr('data-rate'));
});

function openRateMenu(idRate) {
    var formData = new FormData();
    formData.append('id', idRate);

    $('[open-rate]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getRateInfo",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            setRateInfo(data);

            $('[js-menu-rate-items]').addClass('is-open');
            checkBodyHidden();
            $('[open-rate]').prop("disabled", false);
        },
        error: function (data) {
            $('[open-rate]').prop("disabled", false);
        }
    });
}

function setRateInfo(data) {
    var rows = '';
    $.each(data.items, function(index, item){
        rows +=
            '<tr class="custom-table__body-row">' +
            '   <td class="custom-table__body-col custom-table__body-col_xxxlarge">' + item.itemName + '</td>' +
            '   <td class="custom-table__body-col custom-table__body-col_center custom-table__body-col_xsmall">' +
            '       <div class="score ' + (item.score > 0 ? 'score_green' : (item.score == 0 ? 'score_gray' : 'score_red')) + '">' + (item.score > 0 ? ('+' + item.score) : (item.score)) + '</div>' +
            '   </td>' +
            '   <td class="custom-table__body-col custom-table__body-col_r16">   ' +
            '       <div view-comment data-item="' + item.id + '" class="button button_white">Посмотреть</div>' +
            '   </td>' +
            '</tr>';
    });
    $('[rate-items]').html(rows);
}

$(document).on('click', '[js-menu-rate-items-close-btn]', function(event){
    $('[js-menu-rate-items]').removeClass('is-open');
    checkBodyHidden();
});
