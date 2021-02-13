$(document).on('keyup', '[js-sms-checks-search]', function(event){
    var $v = $(this).val().toLowerCase();

    $('[sms-check-row]').each(function () {
        if (!(~$(this).find('[sms-check-text]').text().toLowerCase().indexOf($v))) {
            $(this).addClass('none');
        } else {
            $(this).removeClass('none');
        }
    })
});

$(document).on('click', '[sms-check-row]', function(event){
    $(this).find('input[type=radio]').prop("checked", true);
    $('[sms-check-row]').removeClass('div-table__row_selected');
    $(this).addClass('div-table__row_selected');
});

$(document).on('click', '[js-delete-sms-check]', function(event){
    var button = $(this);
    var idBill = button.closest('[data-bill-id]').attr('data-bill-id');

    $('[js-delete-sms-check]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/sms-checks/untieSmsCheck",
        data: JSON.stringify(idBill),
        dataType: 'json',
        cache: false,
        success: function (data) {
            $('[js-delete-sms-check]').prop("disabled", false);
            updateSmsCheckButton(idBill, '');
        },
        error: function (data) {
            $('[js-delete-sms-check]').prop("disabled", false);
        }
    });
});

// var SMS_CHECK_BUTTON = {};
$(document).on('click', '[js-add-sms-check]', function(event){
    var button = $(this);
    // SMS_CHECK_BUTTON  = $(this);
    var idBill = button.closest('[data-bill-id]').attr('data-bill-id');

    $('[js-add-sms-check]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/sms-checks/getUnusedSmsChecks",
        dataType: 'json',
        cache: false,
        success: function (data) {
            $('[js-sms-checks-list-form]').find('[js-id-bill]').val(idBill);
            openSmsChecksMenu(data);
            $('[js-add-sms-check]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-add-sms-check]').prop("disabled", false);
        }
    });
});


$(document).on('click', '[js-select-sms-check]', function(event){
    event.preventDefault();
    $('[js-sms-checks-list-form]').trigger('submit');
});
$(document).on('submit', '[js-sms-checks-list-form]', function(event){
    event.preventDefault();
    if (validateForm(this)) {
        var checkData = $('[js-sms-checks-list-form]').serializeObject();
        tieSmsCheck(checkData);
    }
});

$(document).ready(function() {
    const $menuSmsCheckListCloseBtn = $('[js-menu-sms-checks-list-close-btn]');
    const $menuSmsCheckList= $('[js-menu-sms-checks-list]');

    $menuSmsCheckListCloseBtn.on('click', function() {
        $menuSmsCheckList.removeClass('is-open');
        resetSmsCheckListForm();
        checkBodyHidden()
    });
});

function tieSmsCheck(checkData) {
    $('[js-select-sms-check]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/sms-checks/tieSmsCheck",
        data: JSON.stringify(checkData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            $('[js-select-sms-check]').prop("disabled", false);
            updateSmsCheckButton(data.idBill, data.text);
            $('[js-menu-sms-checks-list]').removeClass('is-open');
            resetSmsCheckListForm();
            checkBodyHidden()
        },
        error: function (data) {
            $('[js-select-sms-check]').prop("disabled", false);
        }
    });
}

function resetSmsCheckListForm() {
    $('[js-sms-checks-list-form]').trigger('reset');
    $('[sms-checks-list]').html('');
    $('[js-select-sms-check-btn]').attr("js-select-sms-check", "");
}
function openSmsChecksMenu(data) {
    var rows = "";

    if (data.length === 0) {
        $('[js-select-sms-check-btn]').removeAttr("js-select-sms-check");
    }

    $.each(data, function(index, value) {
        rows += '<div sms-check-row class="div-table__row">' +
            '       <div class="div-table__row-wrapper">' +
            '           <div class="div-table__body-row">' +
            '               <div class="div-table__body-col div-table__body-col_exsmall">' +
            '                    <div class="input-element__radio ">' +
            '                         <input type="radio" id="' + value.id + '" class="radio radio_circle" name="id" value="' + value.id + '" required>' +
            '                         <label for="' + value.id + '" class="circle "></label>' +
            '                   </div>' +
            '              </div>' +
            '              <div class="div-table__body-col div-table__body-col_small">' + value.date + '</div>' +
            '              <div sms-check-text class="div-table__body-col div-table__body-col_full">' + value.text + '</div>' +
            '          </div>' +
            '      </div>' +
            '</div>'
    });

    $('[sms-checks-list]').html(rows);
    $('[js-menu-sms-checks-list]').addClass('is-open');
    checkBodyHidden();
}

function updateSmsCheckButton(idBill, comment) {
    var button = $('[data-bill-id="' + idBill + '"]').find('[js-check-btn]');

    var attr = button.attr('js-delete-sms-check');
    if (typeof attr !== typeof undefined && attr !== false) {
        button.removeAttr("js-delete-sms-check").removeAttr("title").removeClass('column_mwidth-delete-check')
            .attr("js-add-sms-check",'').addClass('column_mwidth-add-check');
    } else {
        button.removeAttr('js-add-sms-check').removeClass('column_mwidth-add-check')
            .attr("js-delete-sms-check",'').attr("title", comment).addClass('column_mwidth-delete-check');
    }
}