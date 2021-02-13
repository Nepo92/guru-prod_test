$(document).on('change', '[qs-filter]', function() {
    $('[qs-filter-form]').trigger('submit');
});
var CURRENT_BTN;
$(document).on('click', '[add-rate]', function() {
    CURRENT_BTN = $(this);
    setDescription();
    setFields();
    $('[js-menu-rate]').addClass('is-open');
    checkBodyHidden();
});
function setDescription() {
    var root = CURRENT_BTN.closest('.custom-table__body-row');

    $('[rate-avatar]').html(root.find('[avatar]').html());
    $('[rate-employee-name]').html(root.find('[employee-name]').html());
    $('[rate-employee-position]').html(root.find('[employee-position]').html());
    $('[rate-employee-department]').html(root.closest('.template-setting').find('[department]').html());

    $('[rate-id-setting]').val(root.find('[data-setting]').data('setting'));
    $('[rate-id-template]').val(root.find('[data-template]').data('template'));
    $('[rate-day]').val(CURRENT_BTN.closest('[data-day]').data('day'));

    $('[rate-date ]').html(
        ("00" + CURRENT_BTN.closest('[data-day]').data('day')).slice(-2)
        + '.' +  ("00" + $('#month').val()).slice(-2)
        + '.' + $('#year').val());
}
function setFields() {
    var idTemplate = CURRENT_BTN.closest('.custom-table__body-row').find('[data-template]').data('template');

    var jsonItem = {};
    jsonItem['id'] = idTemplate;
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "getFields",
        data: JSON.stringify(jsonItem),
        dataType: 'json',
        cache: false,
        success: function (data) {
            var fields = $('[rate-fields]');
            $.each(data, function(index, field) {
                fields.html(fields.html() +
                '<div class="menu-rate-field">' +
                    '<input type="hidden" name="fields[' + index + '].field.fieldId" value="' + field.fieldId + '">' +
                    '   <div class="menu-rate-field__title">' + field.fieldName + '</div>' +
                    '   <div rate-filed class="menu-rate-field__rate">' +
                    '       <div class="rate-block">' +
                    '           <div class="rate-block__wrapper">' +
                    '               <div class="rate-block__btn">' +
                    '                   <input type="radio" id="like' + index + '" class="radio radio_like rate-value" name="fields[' + index + '].value" value="' + field.fieldValue + '" required>' +
                    '                   <label for="like' + index + '" class="label"></label>' +
                    '               </div>' +
                    '               <div class="rate-block__btn">' +
                    '                   <input type="radio" id="dislike' + index + '" class="radio radio_dislike rate-value" name="fields[' + index + '].value" value="0" required>' +
                    '                   <label for="dislike' + index + '" class="label"></label>' +
                    '               </div>' +
                    '           </div>' +
                    '       </div>' +
                    '       <div class="grade grade_right">' +
                    '       <div class="grade__values grade__values_without-margin">' +
                    '           <span field-value class="grade-value grade-value_bold">—</span>' +
                    '       </div>' +
                    '    </div>' +
                    '</div>' +
                    '<div class="menu-input menu-input_mt">' +
                    '     <div class="menu-input__title">Ваш комментарий</div>' +
                    '     <div class="menu-input__wrapper">' +
                    '        <textarea name="fields[' + index + '].comment" placeholder="Введите ваш комментарий" class="menu-input__input menu-input__input_textarea menu-input__input_small"></textarea>' +
                    '     </div>' +
                    '</div>' +
                    '<div class="rate-img">' +
                    '   <div class="rate-img__wrapper">' +
                    '       <input type="file" name="fields[' + index + '].img" accept="image/*,image/jpeg" id="fileUpdate' + index + '" class="input-file">' +
                    '       <label for="fileUpdate' + index + '" class="js-labelFile rate-img__label js-upload-banner">' +
                    '           <span class="menu-input__title rate-image__title js-fileName">Загрузите изображение</span>' +
                    '       </label>' +
                    '   </div>' +
                    '</div>' +
                '</div>'
                );
            });
        },
        error: function (data) {

        }
    });

}
$(document).on('click', '[js-menu-rate-close-btn]', function(event) {
    $('[js-menu-rate]').removeClass('is-open');
    checkBodyHidden();

    resetForm();
});
function resetForm() {
    $('[rate-fields]').html('');
    $('[total-rate-value]').val(0);
    $('[total-fields-value]').html(0);

    $('[js-rate-form]').trigger('reset');
}


$(document).on('change', '.rate-value', function() {
    var rate = Number($(this).val());
    $(this).closest('[rate-filed]').find('[field-value]').html(rate);

    countRateTotalValue();
});
function countRateTotalValue() {
    var total = 0;
    $.each($('.rate-value:checked'), function(index){
        total += Number($(this).val())
    });

    $('[total-rate-value]').val(total);
    $('[total-fields-value]').html(total);
}


$(document).on('click', '.rate-star', function(event) {
    var rate = Number($(this).html());
    $(this).closest('[rate-filed]').find('[rate-start]').val(rate);

    var stars = $(this).closest('.rate-stars').find('.rate-star');
    $.each(stars, function(index){
        if (index < rate) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });

    countRateValue($(this).closest('[rate-filed]'), rate);
});

function countRateValue(element, rate) {
    var max = Number(element.find('[field-max]').html());

    var value = Math.round(max / 5 * rate);
    element.find('[field-value]').html(value);
    element.find('[rate-value]').val(value);

    countRateValueSum();
}


function countRateValueSum() {
    var total = 0;
    $.each($('[field-value]'), function(index){
        total += Number($(this).html())
    });

    $('[total-rate-value]').val(total);
    $('[total-fields-value]').html(total);
}

$(document).on('click', '[js-save-rate]', function (event) {
    event.preventDefault();
    $('[js-rate-form]').trigger('submit');
});

$(document).on('submit', '[js-rate-form]', function(event) {
    event.preventDefault();
    if (validateCheckboxForm(this)) {
        var formData = new FormData($('[js-rate-form]')[0]);
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
            $('[js-menu-rate]').removeClass('is-open');
            checkBodyHidden();

            resetForm();

            var total = Number(formData.get('total'));
            CURRENT_BTN.html(total);
            CURRENT_BTN.removeAttr("add-rate").attr({'data-rate': data, 'update-rate': ''});

            CURRENT_BTN.addClass(total >= 90 ? 'rate_green' : (total > 50 ? 'rate_yellow' : 'rate_red'));

            setTotalEmployeeRate(formData.get('idSetting'));

            $('[js-save-rate]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-rate]').prop("disabled", false);
        }
    });
}

function setTotalEmployeeRate(idSetting) {
    var jsonItem = {};
    jsonItem['id'] = Number(idSetting);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/rating/getEmployeeTotalRate",
        data: JSON.stringify(jsonItem),
        dataType: 'json',
        cache: false,
        success: function (data) {
            var totalElement = CURRENT_BTN.closest('.custom-table__body-row').find('[total-emloyee-rate]');
            totalElement.removeClass("grade-value_green grade-value_yellow grade-value_red");
            totalElement.addClass(data >= 90 ? 'grade-value_green' : (data > 50 ? 'grade-value_yellow' : 'grade-value_red'));
            totalElement.html(data);
        },
        error: function (data) {
        }
    });
}

$(document).on('click', '[js-debate-rate-btn]', function (event) {
    var jsonItem = {};
    jsonItem['id'] = Number($(this).siblings('[name="id"]').val());

    var attrCheck = $(this).attr('examiner');

    $('[js-debate-rate-btn]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/rating/getFullRateInformation",
        data: JSON.stringify(jsonItem),
        dataType: 'json',
        cache: false,
        success: function (data) {

            if (typeof attrCheck === typeof undefined || attrCheck === false) {
                setRateInformation(data, false);
            } else {
                setRateInformation(data, true);
            }


            $('[js-menu-debate-rate]').addClass('is-open');
            checkBodyHidden();

            $('[js-debate-rate-btn]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-debate-rate-btn]').prop("disabled", false);
        }
    });
});

function setRateInformation(data, isExaminer) {
    $('[rate-id]').val(data.id);
    $('[rate-id-setting]').val(data.idSetting);
    $('[total-fields-value]').html(data.total);
    $('[rate-date]').html(data.date);

    $('[rate-employee-name]').html(data.employee.name);
    $('[rate-employee-position]').html(data.employee.position);
    $('[rate-employee-department]').html(data.employee.department);
    $('[rate-avatar]').html('<span class="avatar-image ' + (data.employee.avatar === null || data.employee.avatar === '' ? 'avatar-image_default' : '') + '" >' +
        (data.employee.avatar === null || data.employee.avatar === '' ? '' : '<img src="/' + data.employee.avatar + '" alt="">') +
        '</span>');

    var fields = $('[rate-fields]');
    $.each(data.fields, function(index, field) {

        fields.html(fields.html() +
            '<div class="menu-rate-field">' +
            '<input type="hidden" name="fields[' + index + '].id" value="' + field.id + '">' +
            '   <div class="menu-rate-field__title">' + field.field.fieldName + '</div>' +
            '   <div rate-filed class="menu-rate-field__rate">' +
            '       <div class="rate-block">' +
            '           <div class="rate-block__wrapper">' +
            '               <div class="rate-block__btn">' +
            '                   <input class="radio active ' + (field.value === 0 ? 'radio_dislike' : 'radio_like') + '">' +
            '                   <label class="label"></label>' +
            '               </div>' +
            '           </div>' +
            '       </div>' +

            '       <div class="grade grade_right">' +
            '       <div class="grade__values grade__values_without-margin">' +
            '           <span class="grade-value grade-value_bold">' + field.value + '</span>' +
            '       </div>' +
            '    </div>' +
            '</div>' +
            '<div class="menu-input menu-input_mt">' +
            '     <div class="menu-input__title">Комментарий специалиста по контролю</div>' +
            '     <div class="menu-input__wrapper">' +
            '        <div placeholder="" class="menu-input__input menu-input__input_textarea menu-input__input_textarea_disabled menu-input__input_small">' + field.comment + '</div>' +
            '     </div>' +
            '</div>' +
            '<div class="rate-img">' +
            '   <div class="rate-img__wrapper">' +
            ((field.imgPath !==  null)
             ?
                '<a class="rate-image" data-fancybox="gallery" href="/' + field.imgPath + '"><img src="/' + field.imgPath + '"></a>'
             :
                '<div class="js-upload-banner rate-image__banner"></div>') +
            '   </div>' +
            '</div>' +
            '<div class="menu-input menu-input_mt">' +
            '     <div class="menu-input__title">' + ((isExaminer) ? 'Комментарий сотрудника' : 'Ваш комментарий') +  '</div>' +
            '     <div class="menu-input__wrapper">' +
            ((isExaminer) ?
            '        <div placeholder="Введите ваш комментарий" class="menu-input__input menu-input__input_textarea menu-input__input_textarea_disabled menu-input__input_small">' + field.exComment + '</div>'
            :
            '       <textarea name="fields[' + index + '].exComment" placeholder="Введите ваш комментарий" class="menu-input__input menu-input__input_textarea menu-input__input_small"></textarea>'
            ) +
            '     </div>' +
            '</div>' +
            '</div>'
        );
    });
}

$(document).on('click', '[js-menu-debate-rate-close-btn]', function(event) {
    $('[js-menu-debate-rate]').removeClass('is-open');
    checkBodyHidden();

    resetDebateForm();
});

function resetDebateForm() {
    $('[rate-fields]').html('');
    $('[total-fields-value]').html(0);

    $('[js-debate-rate-form]').trigger('reset');
}

$(document).on('click', '[js-debate-rate]', function(event) {
    event.preventDefault();
    $('[js-debate-rate-form]').trigger('submit');
});

$(document).on('submit', '[js-debate-rate-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[js-debate-rate-form]')[0]);
        debateRate(formData);
    }
});

function debateRate(formData) {
    $('[js-debate-rate]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "debateRate",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $('[js-menu-debate-rate]').removeClass('is-open');
            checkBodyHidden();

            resetDebateForm();

            var btn = $('[data-rating="' + formData.get("id") + '"]').find('[js-debate-rate-btn]')
            btn.removeAttr("js-debate-rate-btn");
            btn.addClass('button_debate');
            btn.find('span').html('На рассмотрении');

            $('[js-debate-rate]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-debate-rate]').prop("disabled", false);
        }
    });
}

var ID_RATE_TEMP;

$(document).on('click', '[apply]', function(event) {
    event.preventDefault();
    $('[dialog]').find('.dialog__title').html('Вы действительно согласны с претензией?');
    $('[dialog]').find('.dialog__text').html('Оценка будет удалена');
    $('[dialog]').find('[accept-dialog]').attr('apply-debate', '');
    $('[dialog]').addClass('is-open');

    ID_RATE_TEMP = Number($(this).closest('.apply-block').siblings('[name="id"]').val());
});
$(document).on('click', '[reject]', function(event) {
    event.preventDefault();
    $('[dialog]').find('.dialog__title').html('Вы действительно хотите отклонить претензию?');
    $('[dialog]').find('.dialog__text').html('Оценка будет учитываться');
    $('[dialog]').find('[accept-dialog]').attr('reject-debate', '');
    $('[dialog]').addClass('is-open');

    ID_RATE_TEMP = Number($(this).closest('.apply-block').siblings('[name="id"]').val());
});
$(document).on('click', '[close-dialog]', function(event) {
    removeAcceptBtnAttribute($(this).siblings('[accept-dialog]'));
    $(this).closest('.dialog').removeClass('is-open');
});
$(document).on('click', '[apply-debate]', function(event) {
    event.preventDefault();
    $('[dialog]').removeClass('is-open');
    removeAcceptBtnAttribute($(this));
    debate("applyDebate");

    $('[js-menu-debate-rate]').removeClass('is-open');
    checkBodyHidden();

    resetDebateForm();

});
function debate(link) {
    var jsonItem = {};
    jsonItem['id'] = Number(ID_RATE_TEMP);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: link,
        data: JSON.stringify(jsonItem),
        dataType: 'json',
        cache: false,
        success: function (data) {
            $('[data-rating="' + ID_RATE_TEMP + '"]').remove();
        },
        error: function (data) {
        }
    });
}

$(document).on('click', '[reject-debate]', function(event) {
    event.preventDefault();
    $('[dialog]').removeClass('is-open');

    removeAcceptBtnAttribute($(this));
    debate("rejectDebate");


    $('[js-menu-debate-rate]').removeClass('is-open');
    checkBodyHidden();

    resetDebateForm();
});



$(document).on('mouseenter', '.c-tooltip', function(event) {
    var topOffset = -10;
    var content = $(this).find('.tooltip-content').html();
    var tooltip = $('.tooltip-wrapper');

    if (typeof content !== "undefined" && content !== '') {
        var rect = $(this)[0].getBoundingClientRect();
        tooltip.css({top: $(window).scrollTop() + rect.top + topOffset, left: rect.left});
        tooltip.html(content);
        tooltip.addClass('show');
    }
});
$(document).on('mouseleave', '.c-tooltip', function(event) {
    var tooltip = $('.tooltip-wrapper');
    tooltip.html('');
    tooltip.removeClass('show');
});

$(document).on('click', '[update-rate]', function () {
    CURRENT_BTN = $(this);

    var jsonItem = {};
    jsonItem['id'] = Number($(this).attr('data-rate'));

    $('[update-rate]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/rating/getFullRateInformation",
        data: JSON.stringify(jsonItem),
        dataType: 'json',
        cache: false,
        success: function (data) {
            setUpdateRateInformation(data);

            $('[js-menu-update-rate]').addClass('is-open');
            checkBodyHidden();

            $('[update-rate]').prop("disabled", false);
        },
        error: function (data) {
            $('[update-rate]').prop("disabled", false);
        }
    });
});

$(document).on('click', '[js-menu-update-rate-close-btn]', function () {
    $('[js-menu-update-rate]').removeClass('is-open');
    checkBodyHidden();

    resetUpdateForm();
});
function resetUpdateForm() {
    $('[u-rate-fields]').html('');
    $('[total-rate-value]').val(0);
    $('[total-fields-value]').html(0);

    $('[js-update-rate-form]').trigger('reset');
}

function setUpdateRateInformation(data) {
    $('[u-rate-id]').val(data.id);
    $('[u-rate-id-setting]').val(data.idSetting);
    $('[total-fields-value]').html(data.total);
    $('[total-rate-value]').val(data.total);
    $('[u-rate-date]').html(data.date);

    $('[u-rate-employee-name]').html(data.employee.name);
    $('[u-rate-employee-position]').html(data.employee.position);
    $('[u-rate-employee-department]').html(data.employee.department);
    $('[u-rate-avatar]').html('<span class="avatar-image ' + (data.employee.avatar === null || data.employee.avatar === '' ? 'avatar-image_default' : '') + '" >' +
        (data.employee.avatar === null || data.employee.avatar === '' ? '' : '<img src="/' + data.employee.avatar + '" alt="">') +
        '</span>');

    var fields = $('[u-rate-fields]');
    $.each(data.fields, function(index, field) {

        fields.html(fields.html() +
            '<div class="menu-rate-field">' +
            '<input type="hidden" name="fields[' + index + '].id" value="' + field.id + '">' +
            '   <div class="menu-rate-field__title">' + field.field.fieldName + '</div>' +
            '   <div rate-filed class="menu-rate-field__rate">' +
            '       <div class="rate-block">' +
            '           <div class="rate-block__wrapper">' +
            '               <div class="rate-block__btn">' +
            '                   <input ' + (field.value !== 0 ? 'checked' : '') + ' type="radio" id="like' + index + '" class="radio radio_like rate-value" name="fields[' + index + '].value" value="' + field.field.fieldValue + '" required>' +
            '                   <label for="like' + index + '" class="label"></label>' +
            '               </div>' +
            '               <div class="rate-block__btn">' +
            '                   <input ' + (field.value === 0 ? 'checked' : '') + ' type="radio" id="dislike' + index + '" class="radio radio_dislike rate-value" name="fields[' + index + '].value" value="0" required>' +
            '                   <label for="dislike' + index + '" class="label"></label>' +
            '               </div>' +
            '           </div>' +
            '       </div>' +
            '       <div class="grade grade_right">' +
            '       <div class="grade__values grade__values_without-margin">' +
            '           <span field-value class="grade-value grade-value_bold">' + field.value + '</span>' +
            '       </div>' +
            '    </div>' +
            '</div>' +
            '<div class="menu-input menu-input_mt">' +
            '     <div class="menu-input__title">Ваш комментарий</div>' +
            '     <div class="menu-input__wrapper">' +
            '        <textarea name="fields[' + index + '].comment" placeholder="Введите ваш комментарий" class="menu-input__input menu-input__input_textarea menu-input__input_small">' + field.comment + '</textarea>' +
            '     </div>' +
            '</div>' +
            '<div class="rate-img">' +
            '   <div class="rate-img__wrapper">' +
            ((field.imgPath !==  null)
                ?
                '<a class="rate-image" data-fancybox="gallery" href="/' + field.imgPath + '"><img src="/' + field.imgPath + '"></a>'
                :
                '       <input type="file" name="fields[' + index + '].img" accept="image/*,image/jpeg" id="fileUpdate' + index + '" class="input-file">' +
                '       <label for="fileUpdate' + index + '" class="js-labelFile rate-img__label js-upload-banner">' +
                '           <span class="menu-input__title rate-image__title js-fileName">Загрузите изображение</span>' +
                '       </label>') +
            '   </div>' +
            '</div>' +
            '</div>'
        );
    });
}

$(document).on('click', '[js-update-rate]', function (event) {
    event.preventDefault();
    $('[js-update-rate-form]').trigger('submit');
});

$(document).on('submit', '[js-update-rate-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[js-update-rate-form]')[0]);
        updateRate(formData);
    }
});

function updateRate(formData) {
    $('[js-update-rate]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "updateRate",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $('[js-menu-update-rate]').removeClass('is-open');
            checkBodyHidden();

            resetUpdateForm();

            var total = Number(formData.get('total'));
            CURRENT_BTN.html(total);

            CURRENT_BTN.removeClass("rate_green rate_yellow rate_red");
            CURRENT_BTN.addClass(total >= 90 ? 'rate_green' : (total > 50 ? 'rate_yellow' : 'rate_red'));

            setTotalEmployeeRate(formData.get('idSetting'));

            $('[js-update-rate]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-update-rate]').prop("disabled", false);
        }
    });
}

function validateCheckboxForm(form) {

    $(form).validate({
        onkeyup: false,
        onfocusout: false,
        errorPlacement: function(label, element) {
            label.addClass('error-wrapper');
            label.insertAfter(element.siblings('label').last());
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

var FORM_TMP;
$(document).on('click', '[js-delete-rate]', function(event) {
    event.preventDefault();
    $('[dialog]').find('.dialog__title').html('Вы действительно хотите удалить оценку?');
    $('[dialog]').find('.dialog__text').html('Оценка будет удалена');
    $('[dialog]').find('[accept-dialog]').attr('remove-rate', '');
    $('[dialog]').addClass('is-open');
});
$(document).on('click', '[remove-rate]', function(event) {
    event.preventDefault();
    $('[dialog]').removeClass('is-open');
    removeAcceptBtnAttribute($(this));
    deleteRate($('[js-update-rate-form]').serializeObject());
});
function deleteRate(formData) {
    var jsonItem = {};
    jsonItem['id'] = formData['id'];

    $('[js-delete-rate]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "removeRate",
        data: JSON.stringify(jsonItem),
        dataType: 'json',
        cache: false,
        success: function (data) {

            $('[js-menu-update-rate]').removeClass('is-open');
            checkBodyHidden();

            resetUpdateForm();

            CURRENT_BTN.html('—');

            CURRENT_BTN.removeClass("rate_green rate_yellow rate_red");
            CURRENT_BTN.removeAttr("update-rate").removeAttr("data-rate").attr('add-rate', '');

            setTotalEmployeeRate(formData['idSetting']);

            $('[js-delete-rate]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-delete-rate]').prop("disabled", false);
        }
    });
}