function getLevelField() {
    return '<div class="rate-level">' +
        '<input rate-level js-rate-level name="templateCoefficients[0].level" type="hidden" value="1">' +
        '<div class="menu-input__input menu-input__input_small menu-input__input_level">1</div>' +
        '<div class="rate-filed__wrapper menu-input__input_level-filed">' +
        '<input rate-level-from name="templateCoefficients[0].levelFrom" autocomplete="off" class="menu-input__input menu-input__input_small " placeholder="0" required>' +
        '</div>' +
        '<div class="level-reverse"></div>' +
        '<div class="rate-filed__wrapper menu-input__input_level-filed">' +
        '<input rate-level-to name="templateCoefficients[0].levelTo" autocomplete="off" class="menu-input__input menu-input__input_small" placeholder="0" required>' +
        '</div>' +
        '<div class="rate-filed__wrapper menu-input__input_rate-value">' +
        '<input rate-level-coef name="templateCoefficients[0].levelCoefficient" autocomplete="off" class="menu-input__input menu-input__input_small " placeholder="0.0" required>' +
        '</div>' +
        '<div class="rate-level__delete"></div>' +
        '</div>';
}

function getRateField() {
    return '<div class="rate-filed">' +
        '<div class="rate-filed__wrapper menu-input__input_rate-filed">' +
        '<input field-name name="templateFields[0].fieldName" autocomplete="off" class="menu-input__input menu-input__input_small " placeholder="Введите название пункта" required>' +
        '</div>' +
        '<div class="rate-filed__wrapper menu-input__input_rate-value">' +
        '<input field-value grade-value name="templateFields[0].fieldValue" autocomplete="off" class="menu-input__input menu-input__input_small " placeholder="0" required>' +
        '</div>' +
        '<div class="rate-field__delete"></div>' +
        '</div>'
}

$(document).on('click', '[js-create-template]', function(event){
    $('[js-menu-create-template]').addClass('is-open');
    $('[js-template-form-department]').val($(this).closest('[data-department]').data('department'));
    checkBodyHidden();
});
$(document).on('click', '[js-menu-create-template-close-btn]', function(event){
    $('[js-menu-create-template]').removeClass('is-open');
    checkBodyHidden();
    resetTemplateForm();
});
function resetTemplateForm() {
    $('[js-template-form]').trigger('reset');

    $('input:checkbox[name="metrics"]').attr('checked', false).prop("checked", false);

    $('.rate-fields').html(getRateField());
    setGradeValuesSum();

    $('.rate-levels').html(getLevelField());
    setLevels();
}
function recountRateField() {
    $('[field-name]').each(function(index) {
        $(this).attr("name", "templateFields[" + index + "].fieldName");
    });
    $('[field-value]').each(function(index) {
        $(this).attr("name", "templateFields[" + index + "].fieldValue");
    });
}
function recountRateLevel() {
    $('[rate-level]').each(function(index) {
        $(this).attr("name", "templateCoefficients[" + index + "].level");
    });
    $('[rate-level-from]').each(function(index) {
        $(this).attr("name", "templateCoefficients[" + index + "].levelFrom");
    });
    $('[rate-level-to]').each(function(index) {
        $(this).attr("name", "templateCoefficients[" + index + "].levelTo");
    });
    $('[rate-level-coef]').each(function(index) {
        $(this).attr("name", "templateCoefficients[" + index + "].levelCoefficient");
    });
}
$(document).on('click', '.rate-field__delete', function(event) {
    $(this).closest('.rate-filed').remove();
    setGradeValuesSum();
    recountRateField();
});
$(document).on('keyup', '[rate-level-from]', function(event){
    var tempVal = $(this).val();

    if (!$.isNumeric(tempVal)) {
        $(this).val('');
    }
});
$(document).on('keyup', '[rate-level-to]', function(event){
    var tempVal = $(this).val();

    if (!$.isNumeric(tempVal)) {
        $(this).val('');
    }
});
$(document).on('keyup', '[rate-level-coef]', function(event){
    var tempVal = $(this).val();

    if (!$.isNumeric(tempVal) && tempVal !== ".") {
        $(this).val('');
    }
});
$(document).on('keyup', '[grade-value]', function(event){
    var tempVal = $(this).val();

    if ($.isNumeric(tempVal) || tempVal === "") {
        var tempSum = sumGradeValues();
        if (tempSum > 100) {
            $(this).val($(this).val() - (tempSum - 100));
        }
    } else {
        $(this).val('');
    }

    setGradeValuesSum();
});
$(document).on('click', '[js-add-rate-filed]', function(event){
    var rateFields = $('.rate-fields');

    var tempLast = rateFields.find('.rate-filed').last();
    var titles = rateFields.find('.rate-titles');

    if (tempLast.length !== 0) {
        tempLast.after(getRateField());
        recountRateField();
    } else {
        titles.after(getRateField());
    }
});
function setGradeValuesSum() {
    var tempSum = sumGradeValues();
    var sumBlock = $('[grade-values-sum]');

    if (tempSum < 100) {
        sumBlock.removeClass('grade-value_green').addClass('grade-value_red');
        $('[js-save-template]').attr("disabled", "disabled");
    } else {
        sumBlock.removeClass('grade-value_red').addClass('grade-value_green');
        $('[js-save-template]').removeAttr("disabled");
    }

    sumBlock.html(tempSum);
}
function sumGradeValues() {
    var sum = 0;

    $('[grade-value]').each(function() {
        sum += Number($(this).val());
    });

    return sum;
}



const $tabs = $('[js-tab]');
const $tabPanels = $('[js-tab-panel]');

$(document).on('click', '[js-tab]', function(event) {
    var $currentTab = $(this);
    var currentActiveId = $currentTab.data('tab');

    $tabs.removeClass('active');
    $currentTab.addClass('active');

    $tabPanels.removeClass('is-open').filter('[data-tab=' + currentActiveId + ']').addClass('is-open');
});



$(document).on('click', '[js-add-rate-level]', function(event){
    var rateLevels = $('.rate-levels');

    var tempLast = rateLevels.find('.rate-level').last();
    var titles = rateLevels.find('.rate-titles');

    if (tempLast.length !== 0) {
        tempLast.after(getLevelField());
        recountRateLevel();
    } else {
        titles.after(getLevelField());
    }

    setLevels();
});
$(document).on('click', '.rate-level__delete', function(event) {
    $(this).closest('.rate-level').remove();
    setLevels();
    recountRateLevel();
});
function setLevels() {
    $('.menu-input__input_level').each(function(index) {
        $(this).html(index + 1);
    });
    $('[js-rate-level]').each(function(index) {
        $(this).val(index + 1);
    });
}

$(document).on('click', '[js-save-template]', function (event) {
    event.preventDefault();
    var attr = $(this).attr('disabled');
    if (typeof attr === typeof undefined || attr === false) {
        $('[js-template-form]').trigger('submit');
    }
});

$(document).on('submit', '[js-template-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[js-template-form]')[0]);
        saveTemplate(formData);
    }
});

function saveTemplate(formData) {
    $('[js-save-template]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "saveTemplate",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            createTemplate(data);

            $('[js-menu-create-template]').removeClass('is-open');
            checkBodyHidden();
            resetTemplateForm();

            $('[js-save-template]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-template]').prop("disabled", false);
        }
    });
}
function createTemplate(data) {
    var templateList = $('[data-department="' + data.idDepartment + '"]').find('.templates__list');

    var fields = "";
    $.each(data.templateFields, function(index, field){
        fields +=  '<div class="template-field">' +
            '   <div class="template-field__title" >' + field.fieldName + '</div>' +
            '   <div class="template-field__value" >' + field.fieldValue + '</div>' +
            '</div>';
    });

    var coeffs = ""
    $.each(data.templateCoefficients, function(index, coeff){
        coeffs +=  '<div class="c-tooltip__text c-tooltip__text_flex">' +
            '   <span>' + coeff.levelFrom + ' - ' + coeff.levelTo + '</span>' +
            '   <span class="c-tooltip__note">' + coeff.levelCoefficient + '</span>' +
            '</div>';
    });

    var metrics = ""
    $.each(data.metrics, function(index, metric){
        metrics +=  '<div class="c-tooltip__text">' + metric.name + '</div>';
    });

    templateList.html(
        '<div class="template" data-template="' + data.id + '">' +
        '   <div class="template__header">' +
        '       <div class="template-title" >' + data.name + '</div>' +
        '   </div>' +
        '   <div class="template__fields template__fields_told custom-scroll">' +
                fields +
        '   </div>' +
        '   <div class="template__fields">' +
        '       <div class="template-field">' +
        '           <div class="template-field__title">Коэффициенты</div>' +
        '           <div class="template-field__tooltip c-tooltip">' +
        '               <div class="c-tooltip__wrapper c-tooltip__wrapper_medium">' +
                                coeffs +
        '               </div>' +
        '               <span>' +
                                 data.templateCoefficients[0].levelCoefficient + ' - ' + data.templateCoefficients[data.templateCoefficients.length - 1].levelCoefficient +
        '                </span>' +
        '            </div>' +
        '        </div>' +
        '        <div class="template-field">' +
        '            <div class="template-field__title">Метрики учитываются</div>' +
        '            <div class="template-field__tooltip c-tooltip">' +
        '                <div class="c-tooltip__wrapper c-tooltip__wrapper_medium">' +
                                       metrics +
        '                </div>' +
        '                <span >' + data.metrics.length + '</span>' +
        '            </div>' +
        '         </div>' +
        '      </div>' +
        '      <div class="template__footer">' +
        '           <form class="button_full" action="#" js-disable-template-form>' +
        '               <input name="id" type="hidden" value="' + data.id + '">' +
        '                   <button type="button" class="button button_white button_full" js-disable-template-btn>' +
        '                            <span class="hidden-btn hidden-btn_right hidden-btn_right-large hidden-btn_hide">Удалить шаблон</span>' +
        '                   </button>' +
        '           </form>' +
        '       </div>' +
        '</div>'
        + templateList.html()
    );
}

$(document).on('change', '[template-metric]', function(event) {
    var counter = 0;
    $('[template-metric]').each(function(index) {
        var isChecked = $(this).is(':checked');
        if (!isChecked) {
            $(this).attr("name", "templateMetric");
        } else {
            $(this).attr("name", "metrics[" + counter + "].id");
            counter++;
        }
    });
});


var DISABLE_TEMPLATE_FORM;
$(document).on('click', '[js-disable-template-btn]', function(event) {
    event.preventDefault();
    $('[dialog]').find('.dialog__title').html('Вы действительно хотите удалить шаблон?');
    $('[dialog]').find('.dialog__text').html('Шаблон будет помещен в архив');
    $('[dialog]').find('[accept-dialog]').attr('disable-template', '');
    $('[dialog]').addClass('is-open');
    DISABLE_TEMPLATE_FORM =  $(this).closest('[js-disable-template-form]');
});
$(document).on('click', '[close-dialog]', function(event) {
    removeAcceptBtnAttribute($(this).siblings('[accept-dialog]'));
    $(this).closest('.dialog').removeClass('is-open');
});
$(document).on('click', '[disable-template]', function(event) {
    event.preventDefault();
    $('[dialog]').removeClass('is-open');
    removeAcceptBtnAttribute($(this));
    DISABLE_TEMPLATE_FORM.trigger('submit');
});

$(document).on('submit', '[js-disable-template-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var formData = $(this).serializeObject();
        disableTemplate(formData);
    }
});
function disableTemplate(formData) {
    $('[js-disable-template-btn]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "disableTemplate",
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            $('[js-disable-template-btn]').prop("disabled", false);
            $('[data-template="' + formData.id + '"]').remove();
        },
        error: function (data) {
            $('[js-disable-template-btn]').prop("disabled", false);
        }
    });
}

var ENABLE_TEMPLATE_FORM;
$(document).on('click', '[js-enable-template-btn]', function(event) {
    event.preventDefault();
    $('[dialog]').find('.dialog__title').html('Вы действительно хотите восстановить шаблон?');
    $('[dialog]').find('.dialog__text').html('Шаблон будет помещен в список доступных шаблонов');
    $('[dialog]').find('[accept-dialog]').attr('enable-template', '');
    $('[dialog]').addClass('is-open');
    ENABLE_TEMPLATE_FORM =  $(this).closest('[js-enable-template-form]');
});
$(document).on('click', '[enable-template]', function(event) {
    event.preventDefault();
    $('[dialog]').removeClass('is-open');
    removeAcceptBtnAttribute($(this));
    ENABLE_TEMPLATE_FORM.trigger('submit');
});

$(document).on('submit', '[js-enable-template-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var formData = $(this).serializeObject();
        enableTemplate(formData);
    }
});
function enableTemplate(formData) {
    $('[js-enable-template-btn]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "enableTemplate",
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            $('[js-enable-template-btn]').prop("disabled", false);
            $('[data-template="' + formData.id + '"]').remove();
        },
        error: function (data) {
            $('[js-enable-template-btn]').prop("disabled", false);
        }
    });
}


$(document).on('change', '[qs-filter]', function() {
    $('[qs-filter-form]').trigger('submit');
});