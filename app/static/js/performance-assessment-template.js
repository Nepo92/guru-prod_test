
$(document).on('click', '[add-template]', function(event){
    $('[js-menu-add-template]').addClass('is-open');
    checkBodyHidden();
    recalculateTotal();
});
$(document).on('click', '[js-menu-add-template-close-btn]', function(event){
    resetAddTemplateForm();
    $('[js-menu-add-template]').removeClass('is-open');
    checkBodyHidden();
});
$(document).on('keyup', '.rate-fields .menu-input__input_rate-value input', function (event){
   recalculateTotal();
});

function recalculateTotal(){
    var total = 0;
    $('.rate-fields .menu-input__input_rate-value input').each(function(index, item){
        var v = parseFloat($(item).val());
        if (!isNaN(v)) {
            total += v;
        }
    });
    $('[u-template-items-total]').html('Итого: ' + total).attr('template-items-total', total);
    $('[u-rate-alert]').toggle(total !== 5);
}

function resetAddTemplateForm() {
    $('[js-template-form]').trigger('reset');
    $('input[id^="addType"]').prop('checked', true);
    $('[data-item]').filter('[data-item!="0"]').remove();
    ITEMS_COUNT = 0;
}
var ITEMS_COUNT = 0;
$(document).on('click', '[add-rate-item]', function(event){
    ITEMS_COUNT++;
    $('[data-item]').last().after(
        '<div data-item="' + ITEMS_COUNT + '" class="rate-filed">' +
        '   <div class="rate-filed__wrapper menu-input__input_rate-filed">' +
        '      <input name="items[' + ITEMS_COUNT + '].name" autocomplete="off" class="menu-input__input menu-input__input_small " placeholder="Введите название пункта" required>' +
        '   </div>' +
        '   <div class="rate-filed__wrapper menu-input__input_rate-value">' +
        '      <input name="items[' + ITEMS_COUNT + '].goodScore" autocomplete="off" class="menu-input__input menu-input__input_small " placeholder="0" required>' +
        '   </div>' +
        '   <div delete-item class="rate-field__delete"></div>' +
        '</div>'
    );
    recalculateTotal();
});
$(document).on('click', '[delete-item]', function(event){
    $(this).closest('div[data-item]').remove();
    recalculateTotal();
});


$(document).on('click', '[save-template]', function(event){
    event.preventDefault();
    $('[js-template-form]').trigger('submit');
});
$(document).on('submit', '[js-template-form]', function(event){
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[js-template-form]')[0]);
        saveTemplate(formData);
    }
});
function saveTemplate(formData) {
    if (parseFloat($('[u-template-items-total]').attr('template-items-total')) !== 5) {
        return;
    }
    $('[save-template]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "savePerformanceAssessmentTemplate",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            setTemplate(data);

            resetAddTemplateForm();
            $('[js-menu-add-template]').removeClass('is-open');
            checkBodyHidden();
            $('[save-template]').prop("disabled", false);
        },
        error: function (data) {
            $('[save-template]').prop("disabled", false);
        }
    });
}
function setTemplate(data) {
    var rows = $('[template-list]').html();
    var newRow = createRow(data);

    $('[template-list]').html(newRow + rows);
}
function createRow(data) {
    var items = '';
    var userTypes = '';
    var itemCount = 0;
    $.each(data.items, function(index, item){
        itemCount++;
        items +=
            '<div class="c-tooltip__row">' +
            '   <div class="c-tooltip__text">' + item.name + '</div> ' +
            '</div>';
    });

    $.each(data.userTypes, function(index, userType){
        userTypes += '<span class="side-list__item">' + userType.title + '</span>';
    });

    return '<tr data-template="' + data.id + '" class="custom-table__body-row">' +
    '                                <td class="custom-table__body-col custom-table__body-col_25per">' +
    '                                    <div class="column-text">' + data.name + '</div>' +
    '                                </td>' +
    '                                <td class="custom-table__body-col custom-table__body-col_25per">' +
    '                                    <div class="side-tooltip ' + (itemCount !== 0 ? 'c-tooltip' : '') + '">' +
    '                                        <div class="c-tooltip__wrapper">' +
                                                items +
    '                                        </div>' +
    '                                        <span>' + itemCount + ' пунктов</span>' +
    '                                    </div>' +
    '                                </td>' +
    '                                <td class="custom-table__body-col custom-table__body-col_40per">' +
    '                                    <div class="side-list">' +
                                            userTypes +
    '                                    </div>' +
    '                                </td>' +
    '                                <td class="custom-table__body-col custom-table__body-col_10per">' +
    '                                    <div class="column-links display-flex-none is-open">' +
    '                                        <div update-template class="column_mwidth div-table__body-col_center column_mwidth-edit"></div>' +
    '                                        <form class="column-form" action="#">' +
    '                                            <button delete-template type="button" class="column_mwidth column_mwidth-delete"></button>' +
    '                                        </form>' +
    '                                    </div>' +
    '                                </td>' +
    '                            </tr>';
}

var DELETE_TEMPLATE;
$(document).on('click', '[delete-template]', function(event) {
    event.preventDefault();
    $('[dialog-accept]').find('.dialog__title').html('Вы действительно хотите удалить шаблон?');
    $('[dialog-accept]').find('.dialog__text').html('Шаблон будет удален');
    $('[dialog-accept]').find('[accept-dialog]').attr('accept-delete-template', '');
    $('[dialog-accept]').addClass('is-open');
    DELETE_TEMPLATE =  Number($(this).closest('[data-template]').data('template'));
});

$(document).on('click', '[close-dialog]', function(event) {
    removeAcceptBtnAttribute($(this).siblings('[accept-dialog]'));
    $(this).closest('.dialog').removeClass('is-open');
});

$(document).on('click', '[accept-delete-template]', function(event) {
    var formData = new FormData();
    formData.append('id', DELETE_TEMPLATE);

    $.ajax({
        type: "POST",
        url: "deletePerformanceAssessmentTemplate",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $('[data-template="' + DELETE_TEMPLATE + '"]').remove();

            $('[dialog-accept]').removeClass('is-open');
            removeAcceptBtnAttribute($(this));
        },
        error: function (data) {
            $('[dialog-accept]').removeClass('is-open');
            removeAcceptBtnAttribute($(this));
        }
    });

});

$(document).on('click', '[update-template]', function(event){
    var formData = new FormData();
    formData.append('id', Number($(this).closest('[data-template]').data('template')));

    $('[update-template]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getPerformanceAssessmentTemplate",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            setUpdateTemplate(data);

            $('[update-template]').prop("disabled", false);
        },
        error: function (data) {
            $('[update-template]').prop("disabled", false);
        }
    });
});

function setUpdateTemplate(data) {
    $('[u-template-id]').val(data.id);
    $('[u-template-name]').val(data.name);
    $.each(data.userTypes, function(index, userType){
        $('input[type="checkbox"][value="' + userType.id + '"]').prop('checked', true);
    });

    var items = '';
    $.each(data.items, function(index, item){
        items +=
            '<div data-item="' + index + '" class="rate-filed">' +
            '        <input type="hidden" value="' + item.id + '" name="items[' + index + '].id" required>' +
            '    <div class="rate-filed__wrapper menu-input__input_rate-filed">' +
            '        <input value="' + item.name + '" name="items[' + index + '].name" autocomplete="off" class="menu-input__input menu-input__input_small " placeholder="Введите название пункта" required>' +
            '    </div>' +
            '    <div class="rate-filed__wrapper menu-input__input_rate-value">' +
            '        <input value="' + item.goodScore + '" name="items[' + index + '].goodScore" autocomplete="off" class="menu-input__input menu-input__input_small " placeholder="0" required>' +
            '    </div>' +
            '    <div ' + (index !== 0 ? 'delete-item' : '') + ' class="rate-field__delete ' + (index === 0 ? 'rate-field__delete_disabled' : '') + '"></div>' +
            '</div>';
    });

    $('[u-template-items]').after(items);

    ITEMS_COUNT = data.items.length;

    $('[js-menu-update-template]').addClass('is-open');
    checkBodyHidden();
    recalculateTotal();
}

$(document).on('click', '[js-menu-update-template-close-btn]', function(event){
    resetUpdateTemplateForm();
    $('[js-menu-update-template]').removeClass('is-open');
    checkBodyHidden();
});

function resetUpdateTemplateForm() {
    $('[js-update-template-form]').trigger('reset');
    $('input[id^="updateType"]').prop('checked', false);
    $('[u-template-items]').siblings('[data-item]').remove();

    ITEMS_COUNT = 0;
    recalculateTotal();
}

$(document).on('click', '[u-template]', function(event){
    event.preventDefault();
    $('[js-update-template-form]').trigger('submit');
});

$(document).on('submit', '[js-update-template-form]', function(event){
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[js-update-template-form]')[0]);
        updateTemplate(formData);
    }
});

function updateTemplate(formData) {
    if (parseFloat($('[u-template-items-total]').attr('template-items-total')) !== 5) {
        return;
    }
    $('[u-template]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "updatePerformanceAssessmentTemplate",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $('[template-list]').find('[data-template="' + formData.get('id') + '"]').replaceWith(createRow(data));

            resetUpdateTemplateForm();
            $('[js-menu-update-template]').removeClass('is-open');
            checkBodyHidden();
            $('[u-template]').prop("disabled", false);
        },
        error: function (data) {
            $('[u-template]').prop("disabled", false);
        }
    });
}
