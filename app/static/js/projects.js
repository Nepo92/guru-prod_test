
$(document).on('click', '[js-save-project]', function(event){
    event.preventDefault();
    $('[js-project-form]').trigger('submit');
});
$(document).on('submit', '[js-project-form]', function(event){
    event.preventDefault();
    if (validateForm(this)) {
        saveProject($(this).serializeObject());
    }
});
function saveProject(requestData) {
    $('[js-save-project]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "saveProject",
        data: JSON.stringify(requestData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            addProjectOnList(data);
            $('[js-menu-create-project]').removeClass('is-open');
            checkBodyHidden();
            $('[js-project-form]').trigger('reset');
            $('[js-save-project]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-project]').prop("disabled", false);
        }
    });
}
function addProjectOnList(data) {
    $('[projects-table]').html(
        $('[projects-table]').html() +
        '<tr class="custom-table__body-row">' +
        '<input type="hidden" p-id value="'+ data.id + '" name="id" required>' +
        '<input type="hidden" p-id-company value="' + data.idCompany + '" name="idCompany" required>' +
        '                        <td class="custom-table__body-col">' + data.id + '</td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_xxxlarge" >' +
        '                            <input p-name name="name"' +
        '                                   class="menu-input__input menu-input__input_small editable"' +
        '                                   title="' + data.name + '"' +
        '                                   value="' + data.name + '"' +
        '                                   disabled' +
        '                                   placeholder="—">' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_last">' +
        '                            <div edit-btns class="column-links display-flex-none">' +
        '                                <div edit-project-accept class="column_mwidth column_mwidth-accept"></div>' +
        '                                <div edit-project-cancel class="column_mwidth column_mwidth-cancel"></div>' +
        '                            </div>' +
        '                            <div edit-menu class="column-links display-flex-none is-open">' +
        '                                <div edit-project class="column_mwidth div-table__body-col_center column_mwidth-edit column_mwidth-edit-b"></div>' +
        '                            </div>' +
        '                        </td>' +
        '                    </tr>'
    );
}

$(document).on('click', '[js-create-project]', function(event){
    $('[js-menu-create-project]').addClass('is-open');
    checkBodyHidden();
});

$(document).on('click', '[js-menu-create-project-close-btn]', function(event){
    $('[js-menu-create-project]').removeClass('is-open');
    $('[js-project-form]').trigger('reset');
    checkBodyHidden();
});


var PROJECTS_INFO_TEMP = {};
$(document).on('click', '[edit-project]', function(event){
    event.preventDefault();
    $(this).closest('[edit-menu]').removeClass('is-open').siblings('[edit-btns]').addClass('is-open');
    var list = {};

    var name = $(this).closest('.custom-table__body-row').find('[p-name]');
    name.removeAttr('disabled');
    list['name'] = name.val();

    $(this).closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');
    PROJECTS_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[p-id]').val()] = list;
});

$(document).on('click', '[edit-project-cancel]', function(event){
    event.preventDefault();
    var values = PROJECTS_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[p-id]').val()];

    $(this).closest('.custom-table__body-row').find('[p-name]').val(values.name).attr("disabled", true);

    $(this).closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');
    delete PROJECTS_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[p-id]').val()];
});

$(document).on('click', '[edit-project-accept]', function(event){
    event.preventDefault();
   PROJECT_ACCEPT_BTN = $(this);

    var requestData = new Object();
    requestData.id = $(this).closest('.custom-table__body-row').find('[p-id]').val();
    requestData.name = $(this).closest('.custom-table__body-row').find('[p-name]').val();

    $('[edit-project-accept]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "updateProject",
        data: JSON.stringify(requestData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            PROJECT_ACCEPT_BTN.closest('.custom-table__body-row').find('[p-name]').val(data.name).attr("disabled", true);

            PROJECT_ACCEPT_BTN.closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');
            delete PROJECTS_INFO_TEMP[data.id];

            $('[edit-project-accept]').prop("disabled", false);
        },
        error: function (data) {
            var values = PROJECTS_INFO_TEMP[requestData.id];

            PROJECT_ACCEPT_BTN.closest('.custom-table__body-row').find('[p-name]').val(values.name).attr("disabled", true);

            PROJECT_ACCEPT_BTN.closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');
            delete PROJECTS_INFO_TEMP[data.id];
            $('[edit-user-accept]').prop("disabled", false);
        }
    });
});