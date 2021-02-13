$(document).ready(function() {

    const $menuCreateRowBtn = $('[js-create-row]');
    const $menuCreateRowCloseBtn = $('[js-menu-create-row-close-btn]');
    const $menuCreateRow = $('[js-menu-create-row]');

    const $saveRowBtn = $('[js-save-row]');
    const $createRowForm = $('[js-row-form]');

    $menuCreateRowBtn.on('click', function () {
        $menuCreateRow.addClass('is-open');
        checkBodyHidden()
    });

    $menuCreateRowCloseBtn.on('click', function() {
        $menuCreateRow.removeClass('is-open');
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
            var data = $createRowForm.serializeObject();
            saveRow(data);
        }
    });

    initDeleteRowFromList();
    initDatePicker();
});
function saveRow(rowData) {
    $('[js-save-row]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "saveRow",
        data: JSON.stringify(rowData),
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
function addRowToFrontList(data) {
    $('[table-body]').html(
        '<tr class="custom-table__body-row">' +
        '<td class="custom-table__body-col"></td>' +
        '<td class="custom-table__body-col">' + data.date + '</td>' +
        '                        <td class="custom-table__body-col">' + data.count + '</td>' +
        '                        <td class="custom-table__body-col">' + data.course + '</td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_last">' +
        '                            <div edit-menu class="column-links display-flex-none is-open">' +
        '                                <form delete-row-form class="column-form" action="#">' +
        '                                    <input type="hidden" value="' + data.id + '" name="id" required>' +
        '                                    <button delete-row type="button" class="column_mwidth column_mwidth-delete"></button>' +
        '                                </form>' +
        '                            </div>' +
        '                        </td>' +
        '                    </tr>'
        + $('[table-body]').html()
    );
    initDeleteRowFromList();
}
function initDatePicker() {
    $('.datepicker-here-cs').datepicker({
        autoClose: true
    });
}

var CURRENT_ROW = {};
//активация формы удаления
function initDeleteRowFromList() {
    $('[delete-row]').on('click', function (event) {
        event.preventDefault();
        CURRENT_ROW = $(this);
        $(this).closest('[delete-row-form]').trigger('submit');
    });

    $('[delete-row-form]').submit(function (event) {
        event.preventDefault();
        if (validateForm(this)) {
            var formData = $(this).serializeObject();
            deleteRowFromList(formData);
        }
    });
}
function deleteRowFromList(formData) {
    $('[delete-row]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "deleteRow",
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            CURRENT_ROW.closest('.custom-table__body-row').remove();
            $('[delete-row]').prop("disabled", false);
        },
        error: function (data) {
            $('[delete-row]').prop("disabled", false);
        }
    });
}