$(document).on('change', '[u-upload-manager-avatar]', function(event) {
    var form = $(this).closest('[u-upload-avatar-form]')
    var data = new FormData(form[0]);
    $('[u-upload-manager-avatar]').prop("disabled", true);
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "uploadManagerAvatar",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 300000,
        success: function (data) {
            form.find('.avatar-upload__upload').removeClassWild("avatar-upload__upload_*");
            form.find('.avatar-upload__upload').html('<img src="/' + data + '" alt>');
            $('[u-upload-manager-avatar]').prop("disabled", false);
        },
        error: function (data) {
            $('[u-upload-manager-avatar]').prop("disabled", false);
        }
    });
});
$(document).on('change', '[u-upload-advertiser-avatar]', function(event) {
    var form = $(this).closest('[u-upload-avatar-form]')
    var data = new FormData(form[0]);
    $('[u-upload-advertiser-avatar]').prop("disabled", true);
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "uploadAdvertiserAvatar",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 300000,
        success: function (data) {
            form.find('.avatar-upload__upload').removeClassWild("avatar-upload__upload_*");
            form.find('.avatar-upload__upload').html('<img src="/' + data + '" alt>');
            $('[u-upload-advertiser-avatar]').prop("disabled", false);
        },
        error: function (data) {
            $('[u-upload-advertiser-avatar]').prop("disabled", false);
        }
    });
});
$(document).ready(function() {

    const $menuCreateManagerBtn = $('[js-create-manager]');
    const $menuCreateManagerCloseBtn = $('[js-menu-create-manager-close-btn]');
    const $menuCreateManager = $('[js-menu-create-manager]');

    const $saveManagerBtn = $('[js-save-manager]');
    const $createManagerForm = $('[js-manager-form]');

    $menuCreateManagerBtn.on('click', function () {
        $menuCreateManager.addClass('is-open');
        checkBodyHidden()
    });

    $menuCreateManagerCloseBtn.on('click', function() {
        $menuCreateManager.removeClass('is-open');
        $createManagerForm.trigger('reset');
        checkBodyHidden()
    });

    $saveManagerBtn.on('click', function(event) {
        event.preventDefault();
        $createManagerForm.trigger('submit');
    });

    $createManagerForm.submit(function (event) {
        event.preventDefault();
        if (validateForm(this)) {
            var userData = $createManagerForm.serializeObject();
            createManager(userData);
        }
    });

    const $menuCreateAdvertiserBtn = $('[js-create-advertiser]');
    const $menuCreateAdvertiserCloseBtn = $('[js-menu-create-advertiser-close-btn]');
    const $menuCreateAdvertiser = $('[js-menu-create-advertiser]');

    const $saveAdvertiserBtn = $('[js-save-advertiser]');
    const $createAdvertiserForm = $('[js-advertiser-form]');

    $menuCreateAdvertiserBtn.on('click', function () {
        $menuCreateAdvertiser.addClass('is-open');
        checkBodyHidden()
    });

    $menuCreateAdvertiserCloseBtn.on('click', function() {
        $menuCreateAdvertiser.removeClass('is-open');
        $createAdvertiserForm.trigger('reset');
        checkBodyHidden()
    });

    $saveAdvertiserBtn.on('click', function(event) {
        event.preventDefault();
        $createAdvertiserForm.trigger('submit');
    });

    $createAdvertiserForm.submit(function (event) {
        event.preventDefault();
        if (validateForm(this)) {
            var userData = $createAdvertiserForm.serializeObject();
            createAdvertiser(userData);
        }
    });


    const $managersListCloseBtn = $('[js-menu-managers-list-close-btn]');
    const $managersListMenu = $('[js-menu-managers-list]');
    const $managersList = $('[manager-list]');

    $managersListCloseBtn.on('click', function() {
        $managersListMenu.removeClass('is-open');
        $managersList.html('');

        TEMP_ROW.find('option:selected').removeAttr('selected');
        TEMP_ROW.val("true");
        TEMP_ROW.closest('[u-dismiss-wrapper]').removeClass('indicated-select_false').addClass('indicated-select_true');

        checkBodyHidden()
    });

    initDateUserPicker();
});

function createAdvertiser(userData) {
    $('[js-save-advertiser]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "createAdvertiser",
        data: JSON.stringify(userData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            addAdvertiserToTable(data);
            $('[js-menu-create-advertiser]').removeClass('is-open');
            checkBodyHidden();
            $('[js-advertiser-form]').trigger('reset');
            $('[js-save-advertiser]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-advertiser]').prop("disabled", false);
        }
    });
}

function createManager(userData) {
    $('[js-save-manager]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "saveManager",
        data: JSON.stringify(userData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            addManagerToTable(data);
            $('[js-menu-create-manager]').removeClass('is-open');
            checkBodyHidden();
            $('[js-manager-form]').trigger('reset');
            $('[js-save-manager]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-manager]').prop("disabled", false);
        }
    });
}
function addManagerToTable(manager) {

    var seloption = "";
    $.each($managerTypeList, function(index, value){
        seloption += '<option value="'+ value.id +'" ' + (value.id === manager.type ? 'selected="selected" ': '') +'>' + value.title + '</option>';
    });

    var table = $('[department="manager"]').closest('.custom-table__body');
    table.html('<tr data-manager="' + manager.id + '" department="manager" class="custom-table__body-row">' +
        '                        <input type="hidden" u-id value="' + manager.id + '" name="id" required>' +
        '                        <td class="custom-table__body-col" >' + manager.idManager + '</td>' +
        '                        <td class="custom-table__body-col">' +
        '                            <div class="avatar-upload">' +
        '                                <form u-upload-avatar-form action="#" enctype="multipart/form-data">' +
        '                                    <input type="hidden" value="' + manager.idManager + '" name="id" required>' +
        '                                    <input u-upload-manager-avatar accept="image/*,image/jpeg" class="input-file" name="file" type="file" id="avatarM' + manager.id + '">' +
        '                                    <label for="avatarM' + manager.id + '">' +
        '                                            <span class="avatar-upload__upload avatar-upload__upload_default-user" ></span>' +
        '                                    </label>' +
        '                                </form>' +
        '                            </div>' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_xlarge" >' +
        '                            <input u-name name="name"' +
        '                                   class="menu-input__input menu-input__input_small editable"' +
        '                                   title="' + manager.name + '"' +
        '                                   value="' + manager.name + '"' +
        '                                   disabled' +
        '                                   placeholder="—">' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_xlarge">' +
        '                            <input u-username name="username"' +
        '                                   class="menu-input__input menu-input__input_small editable"' +
        '                                   title="' + manager.username +'"' +
        '                                   value="' + manager.username + '"' +
        '                                   disabled' +
        '                                   placeholder="—"' +
        '                                   required>' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_medium">' +
        '                            <input u-password name="password"' +
        '                                   class="menu-input__input menu-input__input_small editable"' +
        '                                   value=""' +
        '                                   disabled' +
        '                                   placeholder="✱✱✱✱✱✱"' +
        '                                   required>' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_medium">' +
        '                            <input u-phone name="phone"' +
        '                                   class="menu-input__input menu-input__input_small editable"' +
        '                                   title="' + manager.phone + '"' +
        '                                   value="' + manager.phone + '"' +
        '                                   disabled' +
        '                                   placeholder="—">' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_medium">' +
        '                            <input u-link name="link"' +
        '                                   class="menu-input__input menu-input__input_small editable"' +
        '                                   title="' + manager.link + '"' +
        '                                   value="' + manager.link + '"' +
        '                                   disabled' +
        '                                   placeholder="—">' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_medium">' +
        '                            <input u-doorscardnumber name="doorsCardNumber"' +
        '                                   class="menu-input__input menu-input__input_small editable"' +
        '                                   title="' + manager.doorsCardNumber + '"' +
        '                                   value="' + manager.doorsCardNumber + '"' +
        '                                   disabled' +
        '                                   placeholder="—">' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_small">' +
        '                            <input u-birthday' +
        '                                   data-position="top left"' +
        '                                   name="birthday"' +
        '                                   class="datepicker-here-u menu-input__input menu-input__input_small editable"' +
        '                                   autocomplete="off"' +
        '                                   value="' + manager.birthday + '"' +
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
        '                                       id="keyM' + + manager.id + '"' +
                                              ((manager.isHasKey) ? 'checked=checked' : '') +
'                                               >' +
        '                                <label class="checkbox-label checkbox-label_gray" for="keyM' + manager.id + '"></label>' +
        '                            </div>' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_medium">' +
        '                            <div u-type-wrapper class="menu-input__wrapper menu-input__wrapper_select disabled">' +
        '                                <select u-type-selector disabled class="editable menu-input__input menu-input__input_medium menu-input__input_select menu-input__input_white">' +
        '                                    <option th:value="0" disabled>Выберите тип</option>' +
        seloption +
        '                                </select>' +
        '                            </div>' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_medium">' +
        '                            <div u-dismiss-wrapper class="indicated-select menu-input__wrapper menu-input__wrapper_select disabled indicated-select_true" >' +
        '                                <select u-dismiss-selector disabled class="editable menu-input__input menu-input__input_xsmall menu-input__input_select menu-input__input_white">' +
        '                                    <option value="true" selected=selected>Работает</option>' +
        '                                    <option value="false">Уволен</option>' +
        '                                </select>' +
        '                            </div>' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_small">' +
        '                            <div js-set-projects="" class="setting-wrapper">' +
        '                                   <div class="theme-setting theme-setting_big theme-setting_m"></div>' +
        '                           </div>' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_last">' +
        '                            <div edit-btns class="column-links display-flex-none">' +
        '                                <div edit-user-accept class="column_mwidth column_mwidth-accept"></div>' +
        '                                <div edit-user-cancel class="column_mwidth column_mwidth-cancel"></div>' +
        '                            </div>' +
        '                            <div edit-menu class="column-links display-flex-none is-open">' +
        '                                <div edit-user class="column_mwidth div-table__body-col_center column_mwidth-edit column_mwidth-edit-b"></div>' +
        '                            </div>' +
        '                        </td>' +
        '                    </tr>'
        + table.html());

    initDateUserPicker();
}
function addAdvertiserToTable(advertiser) {

    var seloption = "";
    $.each($advertiserTypeList, function(index, value){
        seloption += '<option value="'+ value.id +'" ' + (value.id === advertiser.type ? 'selected="selected" ': '') +'>' + value.title + '</option>';
    });

    var table = $('[department="advertiser"]').closest('.custom-table__body');
    table.html('<tr data-advertiser="' + advertiser.id + '" department="advertiser" class="custom-table__body-row" >' +
        '                        <input type="hidden" u-id value="' + advertiser.id + '" name="id" required>' +
        '                        <td class="custom-table__body-col" >' + advertiser.idManager + '</td>' +
        '                        <td class="custom-table__body-col">' +
        '                            <div class="avatar-upload">' +
        '                                <form u-upload-avatar-form action="#" enctype="multipart/form-data">' +
        '                                    <input type="hidden" th:value="${advertiser.idManager}" name="id" required>' +
        '                                    <input u-upload-avatar accept="image/*,image/jpeg" class="input-file" name="file" type="file" id="avatarA' +  advertiser.id + '">' +
        '                                    <label for="avatarA' + advertiser.id + '">' +
        '                                            <span class="avatar-upload__upload avatar-upload__upload_default-user"></span>' +
        '                                    </label>' +
        '                                </form>' +
        '                            </div>' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_xlarge" >' +
        '                            <input u-name name="name"' +
        '                                   class="menu-input__input menu-input__input_small editable"' +
        '                                   title="' + advertiser.name + '"' +
        '                                   value="' + advertiser.name + '"' +
        '                                   disabled' +
        '                                   placeholder="—">' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_xlarge">' +
        '                            <input u-username name="username"' +
        '                                   class="menu-input__input menu-input__input_small editable"' +
        '                                   title="' + advertiser.username + '"' +
        '                                   value="' + advertiser.username + '"' +
        '                                   disabled' +
        '                                   placeholder="—"' +
        '                                   required>' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_medium">' +
        '                            <input u-password name="password"' +
        '                                   class="menu-input__input menu-input__input_small editable"' +
        '                                   value=""' +
        '                                   disabled' +
        '                                   placeholder="✱✱✱✱✱✱"' +
        '                                   required>' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_medium">' +
        '                            <input u-phone name="phone"' +
        '                                   class="menu-input__input menu-input__input_small editable"' +
        '                                   title="' + advertiser.phone + '"' +
        '                                   value="' + advertiser.phone + '"' +
        '                                   disabled' +
        '                                   placeholder="—">' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_medium">' +
        '                            <input u-link name="link"' +
        '                                   class="menu-input__input menu-input__input_small editable"' +
        '                                   title="' + advertiser.link + '"' +
        '                                   value="' + advertiser.link + '"' +
        '                                   disabled' +
        '                                   placeholder="—">' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_medium">' +
        '                            <input u-doorscardnumber name="doorsCardNumber"' +
        '                                   class="menu-input__input menu-input__input_small editable"' +
        '                                   title="' + advertiser.doorsCardNumber + '"' +
        '                                   value="' + advertiser.doorsCardNumber + '"' +
        '                                   disabled' +
        '                                   placeholder="—">' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_small">' +
        '                            <input u-birthday' +
        '                                   data-position="top left"' +
        '                                   name="birthday"' +
        '                                   class="datepicker-here-u menu-input__input menu-input__input_small editable"' +
        '                                   autocomplete="off"' +
        '                                   value="' + advertiser.birthday + '"' +
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
        '                                       id="keyA' + advertiser.id + '"' +
        ((advertiser.isHasKey) ? 'checked=checked' : '') +
        '>' +
        '                                <label class="checkbox-label checkbox-label_gray" for="keyA' + advertiser.id + '"></label>' +
        '                            </div>' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_medium">' +
        '                            <div u-type-wrapper class="menu-input__wrapper menu-input__wrapper_select disabled">' +
        '                                <select u-type-selector disabled class="editable menu-input__input menu-input__input_medium menu-input__input_select menu-input__input_white">' +
        '                                    <option th:value="0" disabled>Выберите тип</option>' +
        seloption +
        '                                </select>' +
        '                            </div>' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_medium">' +
        '                            <div u-dismiss-wrapper class="indicated-select menu-input__wrapper menu-input__wrapper_select disabled indicated-select_true" >' +
        '                                <select u-dismiss-selector disabled class="editable menu-input__input menu-input__input_xsmall menu-input__input_select menu-input__input_white">' +
        '                                    <option value="true" selected=selected>Работает</option>' +
        '                                    <option value="false">Уволен</option>' +
        '                                </select>' +
        '                            </div>' +
        '                        </td>' +
        // '                        <td class="custom-table__body-col custom-table__body-col_medium">' +
        // '                            <div u-access-wrapper class="indicated-select menu-input__wrapper menu-input__wrapper_select disabled indicated-select_' + advertiser.access + '" >' +
        // '                                <select u-access-selector disabled class="editable menu-input__input menu-input__input_medium menu-input__input_select menu-input__input_white">' +
        // '                                    <option value="true" ' + ((advertiser.access) ? 'selected=selected' : '') + ' >Есть доступ</option>' +
        // '                                    <option value="false" ' + ((advertiser.access) ? '' : 'selected=selected') + '>Нет доступа</option>' +
        // '                                </select>' +
        // '                            </div>' +
        // '                        </td>' +
        '                           <td class="custom-table__body-col custom-table__body-col_small">' +
        '                            <div class="input-element__checkbox input-element__checkbox_mid">' +
        '                                <input u-access' +
        '                                       name="access"' +
        '                                       type="checkbox"' +
        '                                       class="checkbox"' +
        '                                       value="true"' +
        '                                       disabled' +
        '                                       id="keyAccess' + advertiser.id+ '"' +
                                                ((advertiser.access) ? 'checked=checked' : '') +
        '>' +
        '                                <label class="label-pk" for="keyAccess' + advertiser.id+ '"></label>' +
        '                            </div>' +
        '                        </td>' +
        '                        <td class="custom-table__body-col custom-table__body-col_last">' +
        '                            <div edit-btns class="column-links display-flex-none">' +
        '                                <div edit-user-accept class="column_mwidth column_mwidth-accept"></div>' +
        '                                <div edit-user-cancel class="column_mwidth column_mwidth-cancel"></div>' +
        '                            </div>' +
        '                            <div edit-menu class="column-links display-flex-none is-open">' +
        '                                <div edit-user class="column_mwidth div-table__body-col_center column_mwidth-edit column_mwidth-edit-b"></div>' +
        '                            </div>' +
        '                        </td>' +
        '                    </tr>'
        + table.html());

    initDateUserPicker();
}
function initDateUserPicker() {
    $('.datepicker-here-u').datepicker({
        autoClose: true
    });
}
//список фильтр
var $managerTypeList;
function setManagerTypes(managerTypeList) {
    $managerTypeList = managerTypeList;
}
//список фильтр
var $advertiserTypeList;
function setAdvertiserTypes(advertiserTypeList) {
    $advertiserTypeList = advertiserTypeList;
}

$(document).on('change', '[manager-access]', function (event) {
    var attr = $('option:selected', this).attr('data-access');
    if (typeof attr !== typeof undefined && attr === "false") {
        TEMP_MANAGER_ID = $(this).siblings('[name="idManagerAccess"]').val()
        TEMP_MANAGER_ID_LIST[TEMP_MANAGER_ID] = null;
        TEMP_ROW = $(this);

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "getManagers",
            dataType: 'json',
            cache: false,
            success: function (data) {
                openManagersMenu(data);
            },
            error: function (data) {
            }
        });
    }
});

//активация редактирования формы
var USERS_INFO_TEMP = {};
$(document).on('click', '[edit-user]', function(event) {
        event.preventDefault();
        $(this).closest('[edit-menu]').removeClass('is-open').siblings('[edit-btns]').addClass('is-open');
        var list = {};

        var name = $(this).closest('.custom-table__body-row').find('[u-name]');
        // name.removeAttr('disabled');
        list['name'] = name.val();

        var idManager = $(this).closest('.custom-table__body-row').find('[u-id-manager]');
        list['idManager'] = idManager.val();

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

        var isNeedShow = $(this).closest('.custom-table__body-row').find('[u-isneedshow]');
        isNeedShow.removeAttr('disabled');
        list['isNeedShow'] = isNeedShow.prop('checked');

        $(this).closest('.custom-table__body-row').find('[u-type-wrapper]').removeClass('disabled');
        $(this).closest('.custom-table__body-row').find('[u-type-selector]').removeAttr('disabled');
        var type = $(this).closest('.custom-table__body-row').find('[u-type-selector]');
        list['type'] = type.val();

        $(this).closest('.custom-table__body-row').find('[u-dismiss-wrapper]').removeClass('disabled');
        $(this).closest('.custom-table__body-row').find('[u-dismiss-selector]').removeAttr('disabled');
        var dismiss = $(this).closest('.custom-table__body-row').find('[u-dismiss-selector]');
        list['dismiss'] = dismiss.val();
        //
        // $(this).closest('.custom-table__body-row').find('[u-access-wrapper]').removeClass('disabled');
        // $(this).closest('.custom-table__body-row').find('[u-access-selector]').removeAttr('disabled');
        // var access = $(this).closest('.custom-table__body-row').find('[u-access-selector]');
        // list['access'] = access.val();

        var access = $(this).closest('.custom-table__body-row').find('[u-access]');
        access.removeAttr('disabled');
        list['access'] = access.prop('checked');

        $(this).closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');
        USERS_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[u-id]').val()] = list;
});
$(document).on('click', '[edit-user-cancel]', function(event) {
        event.preventDefault();
        var values = USERS_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[u-id]').val()];

        $(this).closest('.custom-table__body-row').find('[u-name]').val(values.name).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[u-username]').val(values.username).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[u-password]').val(values.password).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[u-phone]').val(values.phone).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[u-link]').val(values.link).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[u-doorscardnumber]').val(values.doorsCardNumber).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[u-birthday]').val(values.birthday).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[u-ishaskey]').prop('checked', values.isHasKey).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[u-isneedshow]').prop('checked', values.isNeedShow).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[u-type-wrapper]').addClass('disabled');
        $(this).closest('.custom-table__body-row').find('[u-type-selector]').val(values.type).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[u-dismiss-wrapper]').removeClassWild("indicated-select_*").addClass('indicated-select_' + values.dismiss).addClass('disabled');
        $(this).closest('.custom-table__body-row').find('[u-dismiss-selector]').val(values.dismiss).attr("disabled", true);
        // $(this).closest('.custom-table__body-row').find('[u-access-wrapper]').removeClassWild("indicated-select_*").addClass('indicated-select_' + values.access).addClass('disabled');
        // $(this).closest('.custom-table__body-row').find('[u-access-selector]').val(values.access).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[u-access]').prop('checked', values.access).attr("disabled", true);

        $(this).closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');

        delete USERS_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[u-id]').val()];
        delete TEMP_MANAGER_ID_LIST[$(this).closest('.custom-table__body-row').find('[u-id-manager]').val()];
});
var USERS_ACCEPT_BTN;
$(document).on('click', '[edit-user-accept]', function(event) {
        event.preventDefault();
        USERS_ACCEPT_BTN = $(this);

        var userData = new Object();
        userData.id = $(this).closest('.custom-table__body-row').find('[u-id]').val();
        userData.idCompany = $(this).closest('.custom-table__body-row').find('[u-id-company]').val();
        userData.name = $(this).closest('.custom-table__body-row').find('[u-name]').val();
        userData.username = $(this).closest('.custom-table__body-row').find('[u-username]').val();
        userData.password = $(this).closest('.custom-table__body-row').find('[u-password]').val();
        userData.phone = $(this).closest('.custom-table__body-row').find('[u-phone]').val();
        userData.link = $(this).closest('.custom-table__body-row').find('[u-link]').val();
        userData.doorsCardNumber = $(this).closest('.custom-table__body-row').find('[u-doorscardnumber]').val();
        userData.birthday = $(this).closest('.custom-table__body-row').find('[u-birthday]').val();
        userData.isHasKey = $(this).closest('.custom-table__body-row').find('[u-ishaskey]').prop('checked');
        userData.isNeedShow = $(this).closest('.custom-table__body-row').find('[u-isneedshow]').prop('checked');
        userData.type = $(this).closest('.custom-table__body-row').find('[u-type-selector]').val();
        userData.isNotDisMiss = $(this).closest('.custom-table__body-row').find('[u-dismiss-selector]').val();
        // userData.access = $(this).closest('.custom-table__body-row').find('[u-access-selector]').val();
        userData.access = $(this).closest('.custom-table__body-row').find('[u-access]').prop('checked');

        var department = $(this).closest('.custom-table__body-row').attr('department');
        var updateLink = "";
        if (department === 'manager') {
            updateLink = "updateManager";
            userData.idManager = $(this).closest('.custom-table__body-row').find('[u-id-manager]').val();
            userData.idManagerAccess = TEMP_MANAGER_ID_LIST[$(this).closest('.custom-table__body-row').find('[u-id-manager]').val()];
        } else if (department === 'advertiser') {
            updateLink = "updateAdvertiser";
        }

        $('[edit-user-accept]').prop("disabled", true);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: updateLink,
            data: JSON.stringify(userData),
            dataType: 'json',
            cache: false,
            success: function (data) {
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-name]').val(data.name).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-username]').val(data.username).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-password]').val('').attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-phone]').val(data.phone).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-link]').val(data.link).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-doorscardnumber]').val(data.doorsCardNumber).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-birthday]').val(data.birthday).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-ishaskey]').prop('checked', data.isHasKey).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-isneedshow]').prop('checked', data.isNeedShow).attr("disabled", true);

                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-type-wrapper]').addClass('disabled');
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-type-selector]').val(data.type).attr("disabled", true);
                if (typeof data.isNotDisMiss !== 'undefined') {
                    USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-dismiss-wrapper]').addClass('disabled');
                    USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-dismiss-selector]').val(data.isNotDisMiss.toString()).attr("disabled", true);

                    if (data.isNotDisMiss.toString() === "false") {
                        USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-dismiss-selector]').find('[data-access]').attr("data-access", "true");
                    }
                }
                if (typeof data.access !== 'undefined') {
                    // USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-access-wrapper]').addClass('disabled');
                    // USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-access-selector]').val(data.access.toString()).attr("disabled", true);

                    USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-access]').prop('checked', data.access).attr("disabled", true);


                }

                USERS_ACCEPT_BTN.closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');
                delete USERS_INFO_TEMP[data.id];
                delete TEMP_MANAGER_ID_LIST[USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-id-manager]').val()];

                $('[edit-user-accept]').prop("disabled", false);
            },
            error: function (data) {
                var values = USERS_INFO_TEMP[userData.id];

                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-name]').val(values.name).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-username]').val(values.username).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-password]').val('').attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-phone]').val(values.phone).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-link]').val(values.link).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-doorscardnumber]').val(values.doorsCardNumber).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-birthday]').val(values.birthday).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-ishaskey]').prop('checked', values.isHasKey).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-isneedshow]').prop('checked', values.isNeedShow).attr("disabled", true);

                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-type-wrapper]').addClass('disabled');
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-type-selector]').val(values.type).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-dismiss-wrapper]').addClass('disabled');
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-dismiss-selector]').val(values.dismiss).attr("disabled", true);
                // USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-access-wrapper]').addClass('disabled');
                // USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-access-selector]').val(values.access).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-access]').prop('checked', values.access).attr("disabled", true);

                USERS_ACCEPT_BTN.closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');

                delete USERS_INFO_TEMP[data.id];
                delete TEMP_MANAGER_ID_LIST[USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-id-manager]').val()];

                $('[edit-user-accept]').prop("disabled", false);
            }
        });
});


//
// $(document).on('click', '[delete-user]', function(event) {
//     event.preventDefault();
//     $('[delete-user-form]').trigger('submit');
// });

var TEMP_MANAGER_ID_LIST = {};
var TEMP_MANAGER_ID;
var TEMP_ROW;
$(document).on('submit', '[delete-user-form]', function(event) {
    event.preventDefault();
    TEMP_MANAGER_ID_LIST = $(this).find('[name="idManagerAccess"]').val();
    TEMP_ROW = $(this);

    $('[delete-user]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "getManagers",
        dataType: 'json',
        cache: false,
        success: function (data) {
            openManagersMenu(data);

            $('[delete-user]').prop("disabled", false);
        },
        error: function (data) {
            $('[delete-user]').prop("disabled", false);
        }
    });

});
function openManagersMenu(data) {
    var rows = "";

    $.each(data, function(index, value) {
        rows += '<div manager-row class="div-table__row">' +
            '       <div class="div-table__row-wrapper">' +
            '           <div class="div-table__body-row">' +
            '               <div class="div-table__body-col div-table__body-col_exsmall">' +
            '                    <div class="input-element__radio ">' +
            '                         <input type="radio" id="man' + value.id + '" class="radio radio_circle" name="idManager" value="' + value.id + '" required>' +
            '                         <label for="man' + value.id + '" class="circle "></label>' +
            '                   </div>' +
            '              </div>' +
            '              <div sms-check-text class="div-table__body-col div-table__body-col_full">' + value.name + '</div>' +
            '          </div>' +
            '      </div>' +
            '</div>'
    });

    $('[manager-list]').html(rows);
    $('[js-menu-managers-list]').addClass('is-open');
    checkBodyHidden();
}
$(document).on('click', '[manager-row]', function(event){
    $(this).find('input[type=radio]').prop("checked", true);
    $('[sms-check-row]').removeClass('div-table__row_selected');
    $(this).addClass('div-table__row_selected');
});

$(document).on('click', '[js-select-manager-btn]', function(event){
    event.preventDefault();
    $('[js-managers-list-form]').trigger('submit');
});
$(document).on('submit', '[js-managers-list-form]', function(event){
    event.preventDefault();
    if (validateForm(this)) {
        var requestData = $('[js-managers-list-form]').serializeObject();
        TEMP_MANAGER_ID_LIST[TEMP_MANAGER_ID] = requestData['idManager'];

        $('[js-menu-managers-list]').removeClass('is-open');
        $('[manager-list]').html('');

        checkBodyHidden();
    }
});




$(document).on('click', '[js-set-projects]', function(event){
    var idManager = $(this).closest('.custom-table__body-row').find('[u-id-manager]').val();
    setManagerProjectsFormData(idManager);
    $('[js-menu-set-projects]').addClass('is-open');
    checkBodyHidden();
});
function setManagerProjectsFormData(idManager) {
    $('[js-set-projects]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "getManagerProjects",
        data: JSON.stringify(idManager),
        dataType: 'json',
        cache: false,
        success: function (data) {
            $('[js-projects-form-id-manager]').val(idManager);

            $.each(data.projects, function(i, item) {
                $('input:checkbox[name="projects"][id="project' + item + '"]').attr('checked', true).prop("checked", true);
            });

            $('[js-set-projects]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-set-projects]').prop("disabled", false);
        }
    });
}

$(document).on('click', '[js-menu-set-projects-close-btn]', function(event){
    $('[js-menu-set-projects]').removeClass('is-open');
    checkBodyHidden();

    $('[js-projects-form]').trigger('reset');
    $('input:checkbox[name="projects"]').attr('checked',false).prop("checked", false);
});

$(document).on('click', '[js-save-projects]', function(event){
    event.preventDefault();
    $('[js-projects-form]').trigger('submit');
});
$(document).on('submit', '[js-projects-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        // var requestData = $('[js-projects-form]').serializeObject();
        var form = $('[js-projects-form]');
        var requestData = new FormData(form[0]);
        saveManagerProjects(requestData);
    }
});
function saveManagerProjects(requestData) {
    $('[jjs-save-projects]').prop("disabled", true);
    $.ajax({
        type: "POST",
        // contentType: "application/json",
        url: "saveManagerProjects",
        data: requestData,
        // dataType: 'json',
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $('[js-menu-set-projects]').removeClass('is-open');
            checkBodyHidden();

            $('[js-projects-form]').trigger('reset');
            $('input:checkbox[name="projects"]').attr('checked',false).prop("checked", false);

            $('[js-save-projects]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-projects]').prop("disabled", false);
        }
    });
}
//
// var TEMP_MANAGER_ID;
// var TEMP_ROW;
// $(document).on('submit', '[delete-user-form]', function(event) {
//     event.preventDefault();
//     TEMP_MANAGER_ID = $(this).find('[name="idManagerAccess"]').val();
//     TEMP_ROW = $(this);
//
//     $('[delete-user]').prop("disabled", true);
//     $.ajax({
//         type: "POST",
//         contentType: "application/json",
//         url: "getManagers",
//         dataType: 'json',
//         cache: false,
//         success: function (data) {
//             openManagersMenu(data);
//
//             $('[delete-user]').prop("disabled", false);
//         },
//         error: function (data) {
//             $('[delete-user]').prop("disabled", false);
//         }
//     });
//
// });
// function openManagersMenu(data) {
//     var rows = "";
//
//     $.each(data, function(index, value) {
//         rows += '<div manager-row class="div-table__row">' +
//             '       <div class="div-table__row-wrapper">' +
//             '           <div class="div-table__body-row">' +
//             '               <div class="div-table__body-col div-table__body-col_exsmall">' +
//             '                    <div class="input-element__radio ">' +
//             '                         <input type="radio" id="man' + value.id + '" class="radio radio_circle" name="idManager" value="' + value.id + '" required>' +
//             '                         <label for="man' + value.id + '" class="circle "></label>' +
//             '                   </div>' +
//             '              </div>' +
//             '              <div sms-check-text class="div-table__body-col div-table__body-col_full">' + value.name + '</div>' +
//             '          </div>' +
//             '      </div>' +
//             '</div>'
//     });
//
//     $('[manager-list]').html(rows);
//     $('[js-menu-managers-list]').addClass('is-open');
//     checkBodyHidden();
// }
// $(document).on('click', '[manager-row]', function(event){
//     $(this).find('input[type=radio]').prop("checked", true);
//     $('[sms-check-row]').removeClass('div-table__row_selected');
//     $(this).addClass('div-table__row_selected');
// });
//
// $(document).on('click', '[js-select-manager-btn]', function(event){
//     event.preventDefault();
//     $('[js-managers-list-form]').trigger('submit');
// });
// $(document).on('submit', '[js-managers-list-form]', function(event){
//     event.preventDefault();
//     if (validateForm(this)) {
//         var requestData = $('[js-managers-list-form]').serializeObject();
//         requestData['idManagerAccess'] = TEMP_MANAGER_ID;
//         createManagerAccess(requestData);
//     }
// });
//
// function createManagerAccess(requestData) {
//     $('[js-select-manager-btn]').prop("disabled", true);
//     $.ajax({
//         type: "POST",
//         contentType: "application/json",
//         url: "saveManagerAccess",
//         data: JSON.stringify(requestData),
//         dataType: 'json',
//         cache: false,
//         success: function (data) {
//             TEMP_ROW.closest('.custom-table__body-row').remove();
//             $('[js-menu-managers-list]').removeClass('is-open');
//             $('[manager-list]').html('');
//             $('[js-select-manager-btn]').prop("disabled", false);
//         },
//         error: function (data) {
//             $('[js-select-manager-btn]').prop("disabled", false);
//         }
//     });
// }