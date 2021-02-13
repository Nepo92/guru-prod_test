var CHANGE_BTN;
var RADIO_BTN;
var PAYFORM;
var PAYDATE_TEMP;
$(document).ready(function(){
    initFancy();

    $('[js-change-amount]').on('keyup change', function () {
        $(this).siblings('[js-change-amount-btn]').addClass('block');
    })

    $('[js-change-amount-btn]').on('click', function (event) {
        event.preventDefault();
        CHANGE_BTN = $(this);
        $(this).closest('[js-change-amount-form]').trigger('submit');
    })

    $('[js-change-amount-form]').on('submit', function (event) {
        event.preventDefault();
        updateSum($(this).serializeObject());
    });

    //обновление статуса
    $('[js-status]').on('change', function (event) {
        event.preventDefault();
        RADIO_BTN = $(this);
        $(this).closest('[js-status-form]').trigger('submit');
    });

    $('[js-status-form]').on('submit', function (event) {
        event.preventDefault();
        updateStatus($(this).serializeObject());
    });

    //обновление типа оплаты
    $('[js-change-pm-selector]').on('change', function (event) {
        event.preventDefault();

        $(this).removeClassWild("column_pmethod_*");
        var pm = $('option:selected', this).attr('value');
        var code = $('option:selected', this).attr('data-code');
        $(this).addClass("column_pmethod_" + code);

        $(this).closest('[js-change-pm-form]').trigger('submit');
    });

    $('[js-change-pm-form]').on('submit', function (event) {
        event.preventDefault();
        updatePaymentMethod($(this).serializeObject());
    });

    $('[js-pay-date]').on('click', function () {
        PAYFORM = $(this).closest('[js-pay-form]');
        PAYDATE_TEMP = $(this).val();
    });
    $('[js-pay-date]').on('keydown', function (event) {
        return false;
    });
    $('[js-pay-form]').submit(function (event) {
        event.preventDefault();
        updateBillPayDate($(this).serializeObject());
    });
    initDatePicker();
})
function updateBillPayDate(formData) {
    $('[js-pay-date]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "updateBillPayDate",
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            $('[js-pay-date]').prop("disabled", false);
        },
        error: function (data) {
            PAYFORM.find('[js-pay-date]').val(PAYDATE_TEMP);
            $('[js-pay-date]').prop("disabled", false);
        }
    });
}
function updateStatus(formData) {
    $('[js-status]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "updateStatus",
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            var form = RADIO_BTN.closest('[js-status-form]');
            form.closest('.body__row').find('.column_bstatus').removeClassWild('column_bstatus_*');
            if (formData['status'] === "2") {
                form.closest('.body__row').find('.column_bstatus').addClass('column_bstatus_checked');
            } else {
                form.closest('.body__row').find('.column_bstatus').addClass('column_bstatus_unchecked');
            }

            $('[js-status]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-status]').prop("disabled", false);
        }
    });
}

function updateSum(formData) {
    $('[js-change-amount-btn]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "updateSum",
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            CHANGE_BTN.removeClass('block');
            $('[js-change-amount-btn]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-change-amount-btn]').prop("disabled", false);
        }
    });
}

function updatePaymentMethod(formData) {
    $('[js-change-pm-selector]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "updatePaymentMethod",
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            $('[js-change-pm-selector]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-change-pm-selector]').prop("disabled", false);
        }
    });
}
function initDatePicker() {
    $('.datepicker-here-b').datepicker({
        autoClose: true,
        onSelect: function(formattedDate, date, inst) {
            PAYFORM.trigger('submit');
        }
    });
}
function initFancy() {
    $('[data-fancybox]').fancybox({
        infobar: false,
        buttons: [
            "close"
        ],
    });
}