$(document).on('click', '.datepicker-here', function(event){
    $('.datepicker.active').find('[data-action="today"]').trigger('click');
});
$(document).ready(function() {

    const $menuCreateCheckBtn = $('[js-create-check]');
    const $menuCreateCheckCloseBtn = $('[js-menu-create-check-close-btn]');
    const $menuCreateCheck = $('[js-menu-create-check]');

    const $saveCheckBtn = $('[js-save-check]');
    const $createCheckForm = $('[js-check-form]');

    $menuCreateCheckBtn.on('click', function () {
        $menuCreateCheck.addClass('is-open');
        checkBodyHidden()
    });

    $menuCreateCheckCloseBtn.on('click', function() {
        $menuCreateCheck.removeClass('is-open');
        $createCheckForm.trigger('reset');
        checkBodyHidden()
    });

    $saveCheckBtn.on('click', function(event) {
        event.preventDefault();
        $createCheckForm.trigger('submit');
    });

    $createCheckForm.submit(function (event) {
        event.preventDefault();
        if (validateForm(this)) {
            var checkData = $createCheckForm.serializeObject();
            createCheck(checkData);
        }
    });

    initDatePicker();
});

function createCheck(checkData) {
    $('[js-save-check]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "saveCheck",
        data: JSON.stringify(checkData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            addRowToTable(data);
            $('[js-menu-create-check]').removeClass('is-open');
            checkBodyHidden();
            $('[js-check-form]').trigger('reset');
            $('[js-save-check]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-check]').prop("disabled", false);
        }
    });
}
function addRowToTable(smsCheck) {
    $('[table-body]').html(
        '<tr class="custom-table__body-row">' +
        '  <input type="hidden" s-id value="' + smsCheck.id + '" name="id" required>' +
        '     <td class="custom-table__body-col">' + smsCheck.id + '</td>' +
        '     <td class="custom-table__body-col custom-table__body-col_medium">' +
        '        <input s-date' +
        '           data-position="top left"' +
        '           name="date"' +
        '           class="datepicker-here menu-input__input menu-input__input_small editable"' +
        '           autocomplete="off"' +
        '           value="' + smsCheck.date + '"' +
        '           disabled' +
        '           data-autoclose="true"' +
        '           placeholder="—"' +
        '           required>' +
        '     </td>' +
        '     <td class="custom-table__body-col custom-table__body-col_full" >' +
        '        <input s-text name="text"' +
        '            class="menu-input__input menu-input__input_small editable"' +
        '           title="' + smsCheck.text + '"' +
        '           value="' + smsCheck.text + '"' +
        '           disabled' +
        '           placeholder="—"' +
        '           required>' +
        '     </td>' +
        '     <td class="custom-table__body-col custom-table__body-col_medium">' +
        '        <div class="indicated-select menu-input__wrapper indicated-select_false">' +
        '           <div class="menu-input__input menu-input__input_xxsmall menu-input__input_white">Не забран</div>' +
        '       </div>' +
        '     </td>' +
        '     <td class="custom-table__body-col custom-table__body-col_last">' +
        '         <div edit-btns class="column-links display-flex-none">' +
        '             <div edit-check-accept class="column_mwidth column_mwidth-accept"></div>' +
        '             <div edit-check-cancel class="column_mwidth column_mwidth-cancel"></div>' +
        '         </div>' +
        '         <div edit-menu class="column-links display-flex-none is-open">' +
        '             <div edit-check class="column_mwidth div-table__body-col_center column_mwidth-edit column_mwidth-edit-b"></div>' +
        '         </div>' +
        '     </td>' +
        ' </tr>'
        + $('[table-body]').html()
    );

    initDatePicker();
}

function initDatePicker() {
    $('.datepicker-here-sc').datepicker({
        autoClose: true,
        todayButton: true
    });
}

//активация редактирования формы
var CHECKS_INFO_TEMP = {};
$(document).on('click', '[edit-check]', function(event) {
    event.preventDefault();
    $(this).closest('[edit-menu]').removeClass('is-open').siblings('[edit-btns]').addClass('is-open');
    var list = {};

    var date = $(this).closest('.custom-table__body-row').find('[s-date]');
    date.removeAttr('disabled');
    list['date'] = date.val();

    var text = $(this).closest('.custom-table__body-row').find('[s-text]');
    text.removeAttr('disabled');
    list['text'] = text.val();

    $(this).closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');
    CHECKS_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[s-id]').val()] = list;
});
$(document).on('click', '[edit-check-cancel]', function(event) {
    event.preventDefault();
    var values = CHECKS_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[s-id]').val()];

    $(this).closest('.custom-table__body-row').find('[s-date]').val(values.date).attr("disabled", true);
    $(this).closest('.custom-table__body-row').find('[s-text]').val(values.text).attr("disabled", true);

    $(this).closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');
    delete CHECKS_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[s-id]').val()];
});

var CHECKS_ACCEPT_BTN;
$(document).on('click', '[edit-check-accept]', function(event) {
    event.preventDefault();
    CHECKS_ACCEPT_BTN = $(this);

    var checkData = new Object();
    checkData.id = $(this).closest('.custom-table__body-row').find('[s-id]').val();
    checkData.date = $(this).closest('.custom-table__body-row').find('[s-date]').val();
    checkData.text = $(this).closest('.custom-table__body-row').find('[s-text]').val();


    $('[edit-check-accept]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/sms-checks/update",
        data: JSON.stringify(checkData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            CHECKS_ACCEPT_BTN.closest('.custom-table__body-row').find('[s-date]').val(checkData.date).attr("disabled", true);
            CHECKS_ACCEPT_BTN.closest('.custom-table__body-row').find('[s-text]').val(checkData.text).attr("disabled", true);

            CHECKS_ACCEPT_BTN.closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');
            delete CHECKS_INFO_TEMP[checkData.id];

            $('[edit-check-accept]').prop("disabled", false);
        },
        error: function (data) {
            var values = CHECKS_INFO_TEMP[checkData.id];

            CHECKS_ACCEPT_BTN.closest('.custom-table__body-row').find('[s-text]').val(values.text).attr("disabled", true);
            CHECKS_ACCEPT_BTN.closest('.custom-table__body-row').find('[s-date]').val(values.date).attr("disabled", true);

            CHECKS_ACCEPT_BTN.closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');

            delete CHECKS_INFO_TEMP[checkData.id];
            $('[edit-check-accept]').prop("disabled", false);
        }
    });
});

$(document).on('click', '[delete-check]', function(event) {

    var row = $(this).closest('.custom-table__body-row');
    var checkData = new Object();
    checkData.id = row.find('[s-id]').val();

    $('[delete-check]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/sms-checks/delete",
        data: JSON.stringify(checkData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            row.remove();
            $('[delete-check]').prop("disabled", false);
        },
        error: function (data) {
            $('[delete-check]').prop("disabled", false);
        }
    });
});