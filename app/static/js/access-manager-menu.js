
$(document).on('click', '[delete-ma]', function(event) {

    var row = $(this).closest('.custom-table__body-row');
    var maData = new Object();
    maData.id = row.find('[ma-id]').val();

    $('[ma]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "deleteManagerAccess",
        data: JSON.stringify(maData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            row.remove();
            $('[delete-ma]').prop("disabled", false);
        },
        error: function (data) {
            $('[delete-ma]').prop("disabled", false);
        }
    });
});

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
            var rowData = $createRowForm.serializeObject();
            createRow(rowData);
        }
    });

});

function createRow(rowData) {
    $('[js-save-row]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "saveManagerAccess",
        data: JSON.stringify(rowData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            updateRowOnFront(data);
            $('[js-menu-create-row]').removeClass('is-open');
            $('[js-row-form]').trigger('reset');
            $('[js-save-row]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-row]').prop("disabled", false);
        }
    });
}
function updateRowOnFront(managerAccess) {
    var row = $('[ma-id][value="' + managerAccess.id + '"]');
    if(!row.length) {
        var table = $('[table-body]');
        table.html('<tr class="custom-table__body-row">' +
            '                        <input type="hidden" ma-id value="' + managerAccess.id + '" name="id" required>' +
            '                        <td class="custom-table__body-col"></td>' +
            '                        <td class="custom-table__body-col custom-table__body-col_xlarge">' + managerAccess.managerName + '</td>' +
            '                        <td class="custom-table__body-col custom-table__body-col_xlarge">' + managerAccess.managerAccessName + '</td>' +
            '                        <td class="custom-table__body-col custom-table__body-col_last">' +
            '                            <div edit-menu class="column-links display-flex-none is-open">' +
            '                                <div delete-ma-form class="column-form">' +
            '                                    <button delete-ma type="button" class="column_mwidth column_mwidth-delete"></button>' +
            '                                </div>' +
            '                            </div>' +
            '                        </td>' +
            '                    </tr>'
            + table.html());
    }
}