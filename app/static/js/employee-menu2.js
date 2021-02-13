//список фильтр
var $typeList;
function setTypes(typeList) {
    $typeList = typeList;
}
$(document).on('change', '[u-upload-avatar]', function(event) {
    var form = $(this).closest('[u-upload-avatar-form]')
    var data = new FormData(form[0]);
    $('[js-upload-bill]').prop("disabled", true);
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "uploadAvatar",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 300000,
        success: function (data) {
            form.find('.avatar-upload__upload').removeClassWild("avatar-upload__upload_*");
            form.find('.avatar-upload__upload').html('<img src="/' + data + '" alt>');
            $('[u-upload-avatar]').prop("disabled", false);
        },
        error: function (data) {
            $('[u-upload-avatar]').prop("disabled", false);
        }
    });
});
$(document).on('change', '.indicated-select select', function(event) {
    var vl = $('option:selected', this).attr('value');
    $(this).closest('.indicated-select').removeClassWild("indicated-select_*").addClass('indicated-select_' + vl);
});



$(document).on('click', '[js-create-examiner]', function(event) {
    $('[js-menu-create-examiner]').addClass('is-open');
    addTypeOptions($(this).siblings('[department]').attr("department"));
    addIdDepartment($(this).siblings('[department]').attr("id-department"));
    checkBodyHidden();
});

$(document).on('click', '[js-menu-create-examiner-close-btn]', function(event) {
    $('[js-menu-create-examiner]').removeClass('is-open');
    $('[js-examiner-form]').trigger('reset');
    checkBodyHidden();
});

$(document).on('click', '[js-save-examiner]', function(event) {
    event.preventDefault();
    $('[js-examiner-form]').trigger('submit');
});
$(document).on('submit', '[js-examiner-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var userData = new FormData($('[js-examiner-form]')[0]);
        createEmployee(userData, true);
    }
});

$(document).ready(function() {

    const $menuCreateUserBtn = $('[js-create-employee]');
    const $menuCreateUserCloseBtn = $('[js-menu-create-employee-close-btn]');
    const $menuCreateUser = $('[js-menu-create-employee]');

    const $saveUserBtn = $('[js-save-employee]');
    const $createUserForm = $('[js-employee-form]');

    $menuCreateUserBtn.on('click', function () {
        $menuCreateUser.addClass('is-open');
        var dep = $(this).siblings('[department]').attr("department");
        if (dep === 'supervision'){
            $('[js-supervisor-password-item]').show();
            $('[js-supervisor-login-item]').show();
        }else{
            $('[js-supervisor-password-item]').hide();
            $('[js-supervisor-login-item]').hide();
        }
        addTypeOptions(dep);
        addIdDepartment($(this).siblings('[department]').attr("id-department"));
        checkBodyHidden()
    });

    $menuCreateUserCloseBtn.on('click', function() {
        $menuCreateUser.removeClass('is-open');
        $createUserForm.trigger('reset');
        checkBodyHidden()
    });

    $saveUserBtn.on('click', function(event) {
        event.preventDefault();
        $createUserForm.trigger('submit');
    });

    $createUserForm.submit(function (event) {
        event.preventDefault();
        if (validateForm(this)) {
            // var userData = $createUserForm.serializeObject();
            var userData = new FormData($('[js-employee-form]')[0]);
            createEmployee(userData, false);
        }
    });

    initDatePicker();
});

function createEmployee(userData, needLogin) {
    $('[js-save-employee]').prop("disabled", true);
    $('[js-save-examiner]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "saveEmployee",
        data: userData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            addRowToTable(data, needLogin);

            $('[js-menu-create-employee]').removeClass('is-open');
            $('[js-menu-create-examiner]').removeClass('is-open');
            checkBodyHidden();

            $('[js-employee-form]').trigger('reset');
            $('[js-examiner-form]').trigger('reset');

            $('[js-save-employee]').prop("disabled", false);
            $('[js-save-examiner]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-employee]').prop("disabled", false);
            $('[js-save-examiner]').prop("disabled", false);
        }
    });
}

function addTypeOptions(department) {
    var seloption = '<option value="" disabled selected>Выберите статус</option>';
    var arr = $typeList['' + department + ''];
    $.each(arr, function(index, value){
        seloption += '<option value="'+ value.id +'">' + value.title + '</option>';
    });

    $('[js-employee-form-type]').html(seloption);
}
function addIdDepartment(idDepartment) {
    $('[js-employee-dep]').val(idDepartment);
}
function addRowToTable(data, needLogin) {
    var seloption = "";
    var arr = $typeList['' + data.department + ''];
    $.each(arr, function(index, value){
        seloption += '<option value="'+ value.id +'" ' + (value.id === data.type ? 'selected="selected" ': '') +'>' + value.title + '</option>';
    });
    var table = $('[id-department=' + data.idDepartment + ']').closest('.content-main__panel').find('[table-body]');

    table.html(
        '<tr data-employee="' + data.idEmployee + '" class="custom-table__body-row">' +
        '                        <input type="hidden" u-id value="' + data.idEmployee + '" name="id" required>' +
        '                        <td class="custom-table__body-col">' + data.idEmployee + '</td>' +
        '                        <td class="custom-table__body-col">' +
        '                            <div class="avatar-upload">' +
        '                                <form u-upload-avatar-form action="#" enctype="multipart/form-data">' +
        '                                    <input type="hidden" value="' + data.idEmployee + '" name="id" required>' +
        '                                    <input u-upload-avatar accept="image/*,image/jpeg" class="input-file" name="file" type="file" id="avatar' + data.idEmployee + '">' +
        '                                    <label for="avatar' + data.idEmployee + '">' +
        '                                            <span class="avatar-upload__upload avatar-upload__upload_default-user"></span>' +
        '                                    </label>' +
        '                                </form>' +
        '                            </div>' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_xlarge" >' +
        '                            <input u-name name="name"' +
        '                                   class="menu-input__input menu-input__input_small editable"' +
        '                                   title="' + data.name + '"' +
        '                                   value="' + data.name + '"' +
        '                                   disabled' +
        '                                   placeholder="—">' +
        '                        </td>' +
        ((needLogin)
            ?         '                        <td class="custom-table__body-col custom-table__body-col_xlarge">' +
            '                            <input u-username name="user.username"' +
            '                                   class="menu-input__input menu-input__input_small editable"' +
            '                                   title="' + data.user.username + '"' +
            '                                   value="' + data.user.username + '"' +
            '                                   disabled' +
            '                                   placeholder="—"' +
            '                                   required>' +
            '                        </td>' +
            '                        <td class="custom-table__body-col custom-table__body-col_medium">' +
            '                            <input u-password name="user.password"' +
            '                                   class="menu-input__input menu-input__input_small editable"' +
            '                                   value=""' +
            '                                   disabled' +
            '                                   placeholder="✱✱✱✱✱✱"' +
            '                                   required>' +
            '                        </td>'
            : '') +
        '                        <td class="custom-table__body-col custom-table__body-col_medium">' +
        '                            <input u-phone name="phone"' +
        '                                   class="menu-input__input menu-input__input_small editable"' +
        '                                   title="' + data.phone + '"' +
        '                                   value="' + data.phone + '"' +
        '                                   disabled' +
        '                                   placeholder="—">' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_medium">' +
        '                            <input u-link name="link"' +
        '                                   class="menu-input__input menu-input__input_small editable"' +
        '                                   title="' + data.link + '"' +
        '                                   value="' + data.link + '"' +
        '                                   disabled' +
        '                                   placeholder="—">' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_medium">' +
        '                            <input u-doorscardnumber name="doorsCardNumber"' +
        '                                   class="menu-input__input menu-input__input_small editable"' +
        '                                   title="' + data.doorsCardNumber + '"' +
        '                                   value="' + data.doorsCardNumber + '"' +
        '                                   disabled' +
        '                                   placeholder="—">' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_small">' +
        '                            <input u-birthday' +
        '                                   data-position="top left"' +
        '                                   name="birthday"' +
        '                                   class="datepicker-here-cs menu-input__input menu-input__input_small editable"' +
        '                                   autocomplete="off"' +
        '                                   value="' + data.birthday + '"' +
        '                                   disabled' +
        '                                   data-autoclose="true"' +
        '                                   placeholder="—">' +
        '                        </td>' +
        '                        <td class="custom-table__body-col">' +
        '                            <div class="input-element__checkbox input-element__checkbox_mid">' +
        '                                <input u-ishaskey' +
        '                                       name="isHasKey"' +
        '                                       type="checkbox"' +
        '                                       class="checkbox"' +
        '                                       value="true"' +
        '                                       disabled' +
        '                                       id="key' + data.idEmployee + '"' +
                                              ((data.isHasKey) ? 'checked=checked' : '') +
        '                                  ">' +
        '                                <label class="checkbox-label checkbox-label_gray" for="key' + data.idEmployee +'"></label>' +
        '                            </div>' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_medium">' +
        '                            <div u-type-wrapper class="menu-input__wrapper menu-input__wrapper_select disabled">' +
        '                                <select u-type-selector disabled class="editable menu-input__input menu-input__input_medium menu-input__input_select menu-input__input_white">' +
        '                                    <option value="0" disabled>Выберите тип</option>' +
                                             seloption +
        '                                </select>' +
        '                            </div>' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_medium">' +
        '                            <div u-dismiss-wrapper class="indicated-select menu-input__wrapper menu-input__wrapper_select disabled indicated-select_' + data.isNotDisMiss + '">' +
        '                                <select u-dismiss-selector disabled class="editable menu-input__input menu-input__input_xsmall menu-input__input_select menu-input__input_white">' +
        '                                    <option value="true" selected=selected>Работает</option>' +
        '                                    <option value="false">Уволен</option>' +
        '                                </select>' +
        '                            </div>' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_last">' +
        '                            <div edit-btns class="column-links display-flex-none">' +
        '                                <div edit-employee-accept class="column_mwidth column_mwidth-accept"></div>' +
        '                                <div edit-employee-cancel class="column_mwidth column_mwidth-cancel"></div>' +
        '                            </div>' +
        '                            <div edit-menu class="column-links display-flex-none is-open">' +
        '                                <div edit-employee class="column_mwidth div-table__body-col_center column_mwidth-edit column_mwidth-edit-b"></div>' +
        '                            </div>' +
        '                        </td>' +
        '                    </tr>'
        + table.html()
    );

    initDatePicker();
}

function initDatePicker() {
    $('.datepicker-here-e').datepicker({
        autoClose: true
    });
}

//активация редактирования формы
var EMPLOYEE_INFO_TEMP = {};
$(document).on('click', '[edit-employee]', function(event) {
    event.preventDefault();
    $(this).closest('[edit-menu]').removeClass('is-open').siblings('[edit-btns]').addClass('is-open');
    var list = {};

    var name = $(this).closest('.custom-table__body-row').find('[u-name]');
    // name.removeAttr('disabled');
    list['name'] = name.val();

    var username = $(this).closest('.custom-table__body-row').find('[u-username]');
    username.removeAttr('disabled');
    list['username'] = username.val();

    var password = $(this).closest('.custom-table__body-row').find('[u-password]');
    password.removeAttr('disabled');
    list['password'] = password.val();

    var phone = $(this).closest('.custom-table__body-row').find('[u-phone]');
    phone.removeAttr('disabled');
    list['phone'] = phone.val();

    var link = $(this).closest('.custom-table__body-row').find('[u-link]');
    link.removeAttr('disabled');
    list['link'] = link.val();

    var doorsCardNumber = $(this).closest('.custom-table__body-row').find('[u-doorscardnumber]');
    doorsCardNumber.removeAttr('disabled');
    list['doorsCardNumber'] = doorsCardNumber.val();

    var birthday = $(this).closest('.custom-table__body-row').find('[u-birthday]');
    birthday.removeAttr('disabled');
    list['birthday'] = birthday.val();

    var isHasKey = $(this).closest('.custom-table__body-row').find('[u-ishaskey]');
    isHasKey.removeAttr('disabled');
    list['isHasKey'] = isHasKey.prop('checked');

    $(this).closest('.custom-table__body-row').find('[u-type-wrapper]').removeClass('disabled');
    $(this).closest('.custom-table__body-row').find('[u-type-selector]').removeAttr('disabled');
    var type = $(this).closest('.custom-table__body-row').find('[u-type-selector]');
    list['type'] = type.val();

    $(this).closest('.custom-table__body-row').find('[u-dismiss-wrapper]').removeClass('disabled');
    $(this).closest('.custom-table__body-row').find('[u-dismiss-selector]').removeAttr('disabled');
    var dismiss = $(this).closest('.custom-table__body-row').find('[u-dismiss-selector]');
    list['dismiss'] = dismiss.val();

    $(this).closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');
    EMPLOYEE_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[u-id]').val()] = list;
});
$(document).on('click', '[edit-employee-cancel]', function(event) {
    event.preventDefault();
    var values = EMPLOYEE_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[u-id]').val()];

    $(this).closest('.custom-table__body-row').find('[u-name]').val(values.name).attr("disabled", true);
    $(this).closest('.custom-table__body-row').find('[u-username]').val(values.username).attr("disabled", true);
    $(this).closest('.custom-table__body-row').find('[u-password]').val(values.password).attr("disabled", true);
    $(this).closest('.custom-table__body-row').find('[u-phone]').val(values.phone).attr("disabled", true);
    $(this).closest('.custom-table__body-row').find('[u-link]').val(values.link).attr("disabled", true);
    $(this).closest('.custom-table__body-row').find('[u-doorscardnumber]').val(values.doorsCardNumber).attr("disabled", true);
    $(this).closest('.custom-table__body-row').find('[u-birthday]').val(values.birthday).attr("disabled", true);
    $(this).closest('.custom-table__body-row').find('[u-ishaskey]').prop('checked', values.isHasKey).attr("disabled", true);
    $(this).closest('.custom-table__body-row').find('[u-type-wrapper]').addClass('disabled');
    $(this).closest('.custom-table__body-row').find('[u-type-selector]').val(values.type).attr("disabled", true);
    $(this).closest('.custom-table__body-row').find('[u-dismiss-wrapper]').removeClassWild("indicated-select_*").addClass('indicated-select_' + values.dismiss).addClass('disabled');
    $(this).closest('.custom-table__body-row').find('[u-dismiss-selector]').val(values.dismiss).attr("disabled", true);

    $(this).closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');
    delete EMPLOYEE_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[u-id]').val()];
});

var EMPLOYEE_ACCEPT_BTN;
$(document).on('click', '[edit-employee-accept]', function(event) {
    event.preventDefault();
    EMPLOYEE_ACCEPT_BTN = $(this);

    var userData = new FormData();
    userData.set('idEmployee', $(this).closest('.custom-table__body-row').find('[u-id]').val());
    // userData.set('idCompany', $(this).closest('.custom-table__body-row').find('[u-id-company]').val());
    userData.set('name', $(this).closest('.custom-table__body-row').find('[u-name]').val());
    userData.set('user.username', $(this).closest('.custom-table__body-row').find('[u-username]').val());
    userData.set('user.password', $(this).closest('.custom-table__body-row').find('[u-password]').val());
    userData.set('phone', $(this).closest('.custom-table__body-row').find('[u-phone]').val());
    userData.set('link', $(this).closest('.custom-table__body-row').find('[u-link]').val());
    userData.set('doorsCardNumber', $(this).closest('.custom-table__body-row').find('[u-doorscardnumber]').val());
    userData.set('birthday', $(this).closest('.custom-table__body-row').find('[u-birthday]').val());
    userData.set('isHasKey', $(this).closest('.custom-table__body-row').find('[u-ishaskey]').prop('checked'));
    userData.set('type', $(this).closest('.custom-table__body-row').find('[u-type-selector]').val());
    userData.set('isNotDisMiss', $(this).closest('.custom-table__body-row').find('[u-dismiss-selector]').val());

    $('[edit-employee-accept]').prop("disabled", true);
    $.ajax({
        // type: "POST",
        // contentType: "application/json",
        // url: "update",
        // data: JSON.stringify(userData),
        // dataType: 'json',
        // cache: false,
        type: "POST",
        url: "update",
        data: userData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            EMPLOYEE_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-name]').val(data.name).attr("disabled", true);
            EMPLOYEE_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-username]').val(data.username != null ? data.username : data.user.username).attr("disabled", true);
            EMPLOYEE_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-password]').val(data.password != null ? data.password : data.user.password).attr("disabled", true);
            EMPLOYEE_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-phone]').val(data.phone).attr("disabled", true);
            EMPLOYEE_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-link]').val(data.link).attr("disabled", true);
            EMPLOYEE_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-doorscardnumber]').val(data.doorsCardNumber).attr("disabled", true);
            EMPLOYEE_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-birthday]').val(data.birthday).attr("disabled", true);
            EMPLOYEE_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-ishaskey]').prop('checked', data.isHasKey).attr("disabled", true);

            EMPLOYEE_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-type-wrapper]').addClass('disabled');
            EMPLOYEE_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-type-selector]').val(data.type).attr("disabled", true);
            if (typeof data.isNotDisMiss !== 'undefined') {
                EMPLOYEE_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-dismiss-wrapper]').addClass('disabled');
                EMPLOYEE_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-dismiss-selector]').val(data.isNotDisMiss.toString()).attr("disabled", true);

            }

            EMPLOYEE_ACCEPT_BTN.closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');
            delete EMPLOYEE_INFO_TEMP[data.id];

            $('[edit-employee-accept]').prop("disabled", false);
        },
        error: function (data) {
            var values = EMPLOYEE_INFO_TEMP[userData.get('idEmployee')];

            EMPLOYEE_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-name]').val(values.name).attr("disabled", true);
            EMPLOYEE_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-username]').val(values.username).attr("disabled", true);
            EMPLOYEE_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-password]').val(values.password).attr("disabled", true);
            EMPLOYEE_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-phone]').val(values.phone).attr("disabled", true);
            EMPLOYEE_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-link]').val(values.link).attr("disabled", true);
            EMPLOYEE_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-doorscardnumber]').val(values.doorsCardNumber).attr("disabled", true);
            EMPLOYEE_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-birthday]').val(values.birthday).attr("disabled", true);
            EMPLOYEE_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-ishaskey]').prop('checked', values.isHasKey).attr("disabled", true);

            EMPLOYEE_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-type-wrapper]').addClass('disabled');
            EMPLOYEE_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-type-selector]').val(values.type).attr("disabled", true);
            EMPLOYEE_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-dismiss-wrapper]').addClass('disabled');
            EMPLOYEE_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-dismiss-selector]').val(values.dismiss).attr("disabled", true);

            EMPLOYEE_ACCEPT_BTN.closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');

            delete EMPLOYEE_INFO_TEMP[data.id];
            $('[edit-employee-accept]').prop("disabled", false);
        }
    });
});
