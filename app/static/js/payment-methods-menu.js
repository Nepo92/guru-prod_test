$(document).ready(function() {

    const $menuCreatePMBtn = $('[js-create-row]');
    const $menuCreatePMCloseBtn = $('[js-menu-create-row-close-btn]');
    const $menuCreatePM = $('[js-menu-create-row]');

    const $saveRowBtn = $('[js-save-row]');
    const $createRowForm = $('[js-row-form]');

    $menuCreatePMBtn.on('click', function () {
        $menuCreatePM.addClass('is-open');
        checkBodyHidden()
    });

    $menuCreatePMCloseBtn.on('click', function() {
        $menuCreatePM.removeClass('is-open');
        $createRowForm.trigger('reset');
        checkBodyHidden()
    });

    $saveRowBtn.on('click', function(event) {
        event.preventDefault();
        $createRowForm.trigger('submit');
    });

    $createRowForm.submit(function (event) {
        event.preventDefault();
        if (validateForm(this)) {
            var formData = $createRowForm.serializeObject();
            createPaymentMethod(formData);
        }
    });

    initEditRowFromList();
    initCancelEditRowFromList();
    initAcceptEditUserFromList();

    changeSelectorIndicator();
});

function changeSelectorIndicator() {
    $('.indicated-select select').on('change', function(event) {
        var vl = $('option:selected', this).attr('value');
        $(this).closest('.indicated-select').removeClassWild("indicated-select_*").addClass('indicated-select_' + vl);
    });
}

function createPaymentMethod(userData) {
    $('[js-save-row]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "savePaymentMethod",
        data: JSON.stringify(userData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            addRowToFrontList(data);
            $('[js-menu-create-row]').removeClass('is-open');
            checkBodyHidden();
            $('[js-row-form]').trigger('reset');
            $('[js-save-row]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-row]').prop("disabled", false);
        }
    });
}
//активация редактирования формы
var ROW_INFO_TEMP = {};
function initEditRowFromList() {

    $('[edit-row]').on('click', function (event) {
        event.preventDefault();
        $(this).closest('[edit-menu]').removeClass('is-open').siblings('[edit-btns]').addClass('is-open');
        var list = {};

        $(this).closest('.custom-table__body-row').find('[pm-enable-wrapper]').removeClass('disabled');
        $(this).closest('.custom-table__body-row').find('[pm-enable-selector]').removeAttr('disabled');
        var enable = $(this).closest('.custom-table__body-row').find('[pm-enable-selector]');
        list['enable'] = enable.val();

        $(this).closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');
        ROW_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[pm-id]').val()] = list;
    });
}
function initCancelEditRowFromList() {
    $('[edit-row-cancel]').on('click', function (event) {
        event.preventDefault();
        var values = ROW_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[pm-id]').val()];

        $(this).closest('.custom-table__body-row').find('[pm-enable-wrapper]').removeClassWild("indicated-select_*").addClass('indicated-select_' + values.enable).addClass('disabled');
        $(this).closest('.custom-table__body-row').find('[pm-enable-selector]').val(values.enable).attr("disabled", true);

        $(this).closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');
        delete ROW_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[pm-id]').val()];
    });
}
var ROW_ACCEPT_BTN;
function initAcceptEditUserFromList() {
    $('[edit-row-accept]').on('click', function (event) {
        event.preventDefault();
        ROW_ACCEPT_BTN = $(this);

        var rowData = new Object();
        rowData.id = $(this).closest('.custom-table__body-row').find('[pm-id]').val();
        rowData.isActive = $(this).closest('.custom-table__body-row').find('[pm-enable-selector]').val();

        $('[edit-row-accept]').prop("disabled", true);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "updatePaymentMethod",
            data: JSON.stringify(rowData),
            dataType: 'json',
            cache: false,
            success: function (data) {
                ROW_ACCEPT_BTN.closest('.custom-table__body-row').find('[pm-enable-wrapper]').addClass('disabled');
                ROW_ACCEPT_BTN.closest('.custom-table__body-row').find('[pm-enable-selector]').val(data.isActive.toString()).attr("disabled", true);

                ROW_ACCEPT_BTN.closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');
                delete ROW_INFO_TEMP[data.id];

                $('[edit-row-accept]').prop("disabled", false);
            },
            error: function (data) {
                var values = ROW_INFO_TEMP[rowData.id];

                ROW_ACCEPT_BTN.closest('.custom-table__body-row').find('[pm-enable-wrapper]').addClass('disabled');
                ROW_ACCEPT_BTN.closest('.custom-table__body-row').find('[pm-enable-selector]').val(values.isActive).attr("disabled", true);

                ROW_ACCEPT_BTN.closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');

                delete ROW_INFO_TEMP[data.id];
                $('[edit-row-accept]').prop("disabled", false);
            }
        });
    });
}
function addRowToFrontList(data) {
    $('[table-body]').html(
        '<tr class="custom-table__body-row">' +
        '<input type="hidden" pm-id value="' + data.id + '" name="id" required>' +
        '<td class="custom-table__body-col"></td>' +
        '<td class="custom-table__body-col">' +
        '<div class="column_pmethod column_pmethod_' + data.code + '"></div>' +
        '</td>'+
        '<td class="custom-table__body-col">' + data.title + '</td>' +
        '<td class="custom-table__body-col custom-table__body-col_medium">' +
        '<div pm-enable-wrapper class="indicated-select menu-input__wrapper menu-input__wrapper_select indicated-select_true disabled">' +
        '<select pm-enable-selector class="editable menu-input__input menu-input__input_medium menu-input__input_select menu-input__input_white" disabled>' +
        '<option value="true" selected>Активен</option>' +
        '<option value="false">Не активен</option>' +
        '</select>' +
        '</div>' +
        '</td>' +
        '<td class="custom-table__body-col custom-table__body-col_last">' +
        '<div edit-btns class="column-links display-flex-none">' +
        '<div edit-row-accept class="column_mwidth column_mwidth-accept"></div>' +
        '<div edit-row-cancel class="column_mwidth column_mwidth-cancel"></div>' +
        '</div>' +
        '<div edit-menu class="column-links display-flex-none is-open">' +
        '<div edit-row class="column_mwidth div-table__body-col_center column_mwidth-edit column_mwidth-edit-b"></div>' +
        '</div>' +
        '</td>' +
        '</tr>'
        + $('[table-body]').html()
    );
    initEditRowFromList();
    initCancelEditRowFromList();
    initAcceptEditUserFromList();

    changeSelectorIndicator();
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