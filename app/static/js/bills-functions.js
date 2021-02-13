var BILL_ROW;

$(document).ready(function() {

    //изменение чекера напоминания при редактировании сделки
    $('[js-update-open-reminder]').on('click', function () {
        $('[js-update-form-deal-reminder-btn]').removeClass('is-open');
        $('[js-update-form-deal-reminder-block]').addClass('is-open');
        $('[js-update-form-deal-reminder-date]').val('');
        $('[js-update-form-deal-reminder-msg]').val('');
        $('[js-update-form-deal-reminder]').prop("checked", true);
    });
    //изменение чекера напоминания при редактировании сделки закрытие
    $('[js-update-close-reminder]').on('click', function () {
        $('[js-update-form-deal-reminder-btn]').addClass('is-open');
        $('[js-update-form-deal-reminder-block]').removeClass('is-open');
        $('[js-update-form-deal-reminder-date]').val('—');
        $('[js-update-form-deal-reminder-msg]').val('');
        $('[js-update-form-deal-reminder]').prop("checked", false);
    });
    //изменение чекера напоминания при создании сделки открытие
    $('[js-open-reminder]').on('click', function () {
        $('[js-deal-form-reminder-btn]').removeClass('is-open');
        $('[js-deal-form-reminder-block]').addClass('is-open');
        $('[js-deal-form-reminder-date]').val('');
        $('[js-deal-form-reminder-msg]').val('');
        $('[js-deal-form-reminder]').prop("checked", true);
    });
    //изменение чекера напоминания при создании сделки закрытие
    $('[js-close-reminder]').on('click', function () {
        $('[js-deal-form-reminder-btn]').addClass('is-open');
        $('[js-deal-form-reminder-block]').removeClass('is-open');
        $('[js-deal-form-reminder-date]').val('—');
        $('[js-deal-form-reminder-msg]').val('');
        $('[js-deal-form-reminder]').prop("checked", false);
    });



    $('[filter-courses]').on('change', function () {
        setKindToFilter($(this));
        selectKind('all');
    });
});

//активация формы удаления счета
var DELETE_BILL_FORM;
$(document).on('click', '[js-delete-bill]', function(event) {
    event.preventDefault();
    $('[dialog]').find('.dialog__title').html('Вы действительно хотите удалить счет?');
    $('[dialog]').find('.dialog__text').html('Вся информация о выставленном счете будет удалена');
    $('[dialog]').find('[accept-dialog]').attr('accept-delete-bill', '');
    $('[dialog]').addClass('is-open');
    DELETE_BILL_FORM =  $(this).closest('[js-delete-bill-form]');
    BILL_ROW = $(this);
});

$(document).on('click', '[accept-delete-bill]', function(event) {
    event.preventDefault();
    $('[dialog]').removeClass('is-open');
    removeAcceptBtnAttribute($(this));
    DELETE_BILL_FORM.trigger('submit');
});
//
// $(document).on('click', '[js-delete-bill]', function(event){
//     event.preventDefault();
//     BILL_ROW = $(this);
//     $(this).closest('[js-delete-bill-form]').trigger('submit');
// });

$(document).on('submit', '[js-delete-bill-form]', function(event){
    event.preventDefault();
    if (validateForm(this)) {
        var formData = $(this).serializeObject();
        deleteBill(formData);
    }
});
//функция удаления счета
function deleteBill(formData) {
    $('[js-delete-bill]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/bills/deleteBill",
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            BILL_ROW.closest('.div-table__body-row').remove();
            BILL_ROW.closest('.custom-table__body-row').remove();
            updateDealCard($CLIENT);
            $('[js-delete-bill]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-delete-bill]').prop("disabled", false);
        }
    });
}

var BILLS_TEMP_INFO = {};

$(document).on('change', '[b-pm-selector]', function(event){
    $(this).removeClassWild("column_pmethod_*");
    var pm = $('option:selected', this).attr('value');
    var code = $('option:selected', this).attr('data-code');
    $(this).addClass("column_pmethod_" + code);
    $(this).closest('.div-table__body-row').find('[b-pm]').val(pm);
    $(this).closest('.div-table__body-row').find('[b-pm-code]').val(code);

    $(this).closest('.custom-table__body-row').find('[b-pm]').val(pm);
    $(this).closest('.custom-table__body-row').find('[b-pm-code]').val(code);
});
//активация редактирования формы
function initEditBillForm() {


    $('[js-edit-bill]').on('click', function (event) {
        event.preventDefault();
        $(this).closest('[js-edit-menu]').removeClass('is-open').siblings('[js-edit-btns]').addClass('is-open');
        var list = {};
        var pd = $(this).closest('.div-table__body-row').find('[b-pay-date]');
        pd.removeAttr('disabled');
        list['payDate'] = pd.val();

        var s = $(this).closest('.div-table__body-row').find('[b-sum]');
        s.removeAttr('disabled');
        list['sum'] = s.val();

        $(this).closest('.div-table__body-row').find('[b-pm-wrapper]').removeClass('disabled');
        $(this).closest('.div-table__body-row').find('[b-pm-selector]').removeAttr('disabled');
        var pm = $(this).closest('.div-table__body-row').find('[b-pm]');
        list['paymentMethod'] = pm.val();
        var pmCode = $(this).closest('.div-table__body-row').find('[b-pm-code]');
        list['paymentMethodCode'] = pmCode.val();

        var an = $(this).closest('.div-table__body-row').find('[b-account-number]');
        an.removeAttr('disabled');
        list['accountNumber'] = an.val();

        // var c = $(this).closest('.div-table__body-row').find('[b-comment]');
        // c.removeAttr('disabled');
        // list['comment'] = c.val();

        BILLS_TEMP_INFO[$(this).closest('.div-table__body-row').find('[b-id-bill]').val()] = list;
    });
}

function initCancelEditBill() {
    $('[js-edit-bill-cancel]').on('click', function (event) {
        event.preventDefault();
        var values = BILLS_TEMP_INFO[$(this).closest('.div-table__body-row').find('[b-id-bill]').val()];

        $(this).closest('.div-table__body-row').find('[b-pay-date]').val(values.payDate).attr("disabled", true);
        $(this).closest('.div-table__body-row').find('[b-sum]').val(values.sum).attr("disabled", true);
        $(this).closest('.div-table__body-row').find('[b-account-number]').val(values.accountNumber).attr("disabled", true);
        // $(this).closest('.div-table__body-row').find('[b-comment]').val(values.comment).attr("disabled", true);

        $(this).closest('.div-table__body-row').find('[b-pm-wrapper]').addClass('disabled');
        $(this).closest('.div-table__body-row').find('[b-pm-selector]')
            .removeClassWild("column_pmethod_*").addClass("column_pmethod_" + values.paymentMethodCode).attr("disabled", true);
        $(this).closest('.div-table__body-row').find('[b-pm]').val(values.paymentMethod);
        $(this).closest('.div-table__body-row').find('[b-pm-code]').val(values.paymentMethodCode);

        $(this).closest('[js-edit-btns]').removeClass('is-open').siblings('[js-edit-menu]').addClass('is-open');
        delete BILLS_TEMP_INFO[$(this).closest('.div-table__body-row').find('[b-id-bill]').val()];
    });
}

var ACCEPT_BTN;
function initAcceptEditBill() {
    $('[js-edit-bill-accept]').on('click', function (event) {
        event.preventDefault();
        ACCEPT_BTN = $(this);
        var billData = $(this).closest('.div-table__body-row').find('[b-update-bill-form]').serializeObject();
        $('[js-edit-bill-accept]').prop("disabled", true);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/api/bills/updateBill",
            data: JSON.stringify(billData),
            dataType: 'json',
            cache: false,
            success: function (data) {
                ACCEPT_BTN.closest('.div-table__body-row').find('[b-pay-date]').val(data.payDate).attr("disabled", true);
                ACCEPT_BTN.closest('.div-table__body-row').find('[b-sum]').val(data.sum).attr("disabled", true);
                ACCEPT_BTN.closest('.div-table__body-row').find('[b-account-number]').val(data.accountNumber).attr("disabled", true);
                // ACCEPT_BTN.closest('.div-table__body-row').find('[b-comment]').val(data.comment).attr("disabled", true);

                if(data.payDate === null || data.payDate === '') {
                    ACCEPT_BTN.closest('.div-table__body-row').find('.col-status').removeClass('div-table__body-col_green').html('Выставлен');
                } else {
                    ACCEPT_BTN.closest('.div-table__body-row').find('.col-status').addClass('div-table__body-col_green').html('Оплачен');
                }

                ACCEPT_BTN.closest('.div-table__body-row').find('[b-pm-wrapper]').addClass('disabled');
                ACCEPT_BTN.closest('.div-table__body-row').find('[b-pm-selector]')
                    .removeClassWild("column_pmethod_*").addClass("column_pmethod_" + data.paymentMethodCode).attr("disabled", true);
                ACCEPT_BTN.closest('.div-table__body-row').find('[b-pm]').val(data.paymentMethod);
                ACCEPT_BTN.closest('.div-table__body-row').find('[b-pm-code]').val(data.paymentMethodCode);


                ACCEPT_BTN.closest('[js-edit-btns]').removeClass('is-open').siblings('[js-edit-menu]').addClass('is-open');
                delete BILLS_TEMP_INFO[data.id];
                updateDealCard($CLIENT);
                updateBillOnFrontCard(data);
                $('[js-edit-bill-accept]').prop("disabled", false);
            },
            error: function (data) {
                var values = BILLS_TEMP_INFO[billData.id];

                ACCEPT_BTN.closest('.div-table__body-row').find('[b-pay-date]').val(values.payDate).attr("disabled", true);
                ACCEPT_BTN.closest('.div-table__body-row').find('[b-sum]').val(values.sum).attr("disabled", true);
                ACCEPT_BTN.closest('.div-table__body-row').find('[b-account-number]').val(values.accountNumber).attr("disabled", true);
                // ACCEPT_BTN.closest('.div-table__body-row').find('[b-comment]').val(values.comment).attr("disabled", true);

                ACCEPT_BTN.closest('.div-table__body-row').find('[b-pm-wrapper]').addClass('disabled');
                ACCEPT_BTN.closest('.div-table__body-row').find('[b-pm-selector]')
                    .removeClassWild("column_pmethod_*").addClass("column_pmethod_" + values.paymentMethodCode).attr("disabled", true);
                ACCEPT_BTN.closest('.div-table__body-row').find('[b-pm]').val(values.paymentMethod);
                ACCEPT_BTN.closest('.div-table__body-row').find('[b-pm-code]').val(values.paymentMethodCode);

                ACCEPT_BTN.closest('[js-edit-btns]').removeClass('is-open').siblings('[js-edit-menu]').addClass('is-open');
                delete BILLS_TEMP_INFO[data.id];
                $('[js-edit-bill-accept]').prop("disabled", false);
            }
        });
    });
}
//список типов продуктов
var $courseKindsList;
function setCourseKindsList(courseKindsList) {
    $courseKindsList = courseKindsList;
}

function createKindList(course) {
    return $courseKindsList.filter($courseKindsList => $courseKindsList['courseName'] === course);
}
function createKindOptions(kindList) {
    var options = '<option value="" disabled selected>Выберите тип</option>';

    kindList.forEach(function (kind) {
        options += '<option value="' + kind["name"] + '">' + kind["name"] + '</option>';
    })
    return options;
}
function createKindOptionsWithAll(kindList) {
    var options = '<option value="all">Все типы</option>';

    kindList.forEach(function (kind) {
        options += '<option value="' + kind["name"] + '">' + kind["name"] + '</option>';
    })
    return options;
}
function createKindOptionsAll() {
    return '<option value="all">Все типы</option>';
}

function setKindToFilter(selector) {
    $list = createKindList($('option:selected', selector).val());
    if ($list.length > 0) {
        $('[filter-course-kinds]').html(createKindOptionsWithAll($list));
        // $('[filter-course-kinds]').prop("disabled", false);
    } else {
        $('[filter-course-kinds]').html(createKindOptionsAll());
        // $('[filter-course-kinds]').prop("disabled", true);
    }
}
function selectKind(kind) {
    $('#kind option:selected').removeAttr('selected');
    $('#kind').val(kind);
}

function updateBillOnFrontCard(data) {
    var billRow = $('[data-bill="' + data.id + '"]');
    if (billRow.length !== 0) {
        billRow.find('[b-pm-selector]').removeClassWild("column_pmethod_*").addClass("column_pmethod_" + data.paymentMethodCode);
        billRow.find('[b-pm]').val(data.paymentMethod);
        billRow.find('[b-pm-code]').val(data.paymentMethodCode);
        billRow.find('[b-account-number]').val(data.accountNumber);
        billRow.find('[b-sum]').val(data.sum + ' ₽');
        billRow.find('[b-pay-date]').val(data.payDate);

        if (data.payDate === null || data.payDate === '') {
            billRow.find('[data-bill-status]').html('<div class="column-bill__status">Выставлен</div>');
        } else {
            billRow.find('[data-bill-status]').html('<div class="column-bill__status column-bill__status_paid">Оплачен</div>');
        }
    }
}