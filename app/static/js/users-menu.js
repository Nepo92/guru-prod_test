$(document).on('click', '[js-set-sale-type]', function(event){
    var idCompany = $(this).closest('.custom-table__body-row').find('[u-id-company]').val();
    setSaleTypeFormData(idCompany);
    $('[js-menu-sale-type]').addClass('is-open');
    checkBodyHidden();
});
$(document).on('click', '[js-menu-sale-type-close-btn]', function(event){
    $('[js-menu-sale-type]').removeClass('is-open');
    $('[js-sale-type-form]').trigger('reset');
    $('input:radio[sale-type][name="id"]').attr('checked',false).prop("checked", false);
    checkBodyHidden();
});
$(document).on('click', '[js-save-sale-type]', function(event){
    event.preventDefault();
    $('[js-sale-type-form]').trigger('submit');
});
$(document).on('submit', '[js-sale-type-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var formData = $('[js-sale-type-form]').serializeObject();
        saveSaleType(formData);
    }
});
function setSaleTypeFormData(idCompany) {
    $('[js-set-sale-type]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "getSaleType",
        data: JSON.stringify(idCompany),
        dataType: 'json',
        cache: false,
        success: function (data) {
            $('[js-sale-type-id-company]').val(idCompany);

            $('input:radio[sale-type][value="' + data.id + '"]').attr('checked', true).prop("checked", true);

            $('[js-set-sale-type]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-set-sale-type]').prop("disabled", false);
        }
    });
}
function saveSaleType(accessData) {
    $('[js-save-sale-type]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "updateSaleType",
        data: JSON.stringify(accessData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            $('[js-menu-sale-type]').removeClass('is-open');
            $('[js-sale-type-form]').trigger('reset');
            $('input:radio[sale-type][name="id"]').attr('checked',false).prop("checked", false);
            checkBodyHidden();
            $('[js-save-sale-type]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-sale-type]').prop("disabled", false);
        }
    });
}


$(document).on('click', '[js-set-access]', function(event){
    var idCompany = $(this).closest('.custom-table__body-row').find('[u-id-company]').val();
    setAccessFormData(idCompany);
    $('[js-menu-set-access]').addClass('is-open');
    checkBodyHidden();
});
$(document).on('click', '[js-menu-set-access-close-btn]', function(event){
    $('[js-menu-set-access]').removeClass('is-open');
    resetAccessForm()
    checkBodyHidden();
});
$(document).on('click', '[js-save-access]', function(event){
    event.preventDefault();
    $('[js-access-form]').trigger('submit');
});
$(document).on('submit', '[js-access-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var accessData = $('[js-access-form]').serializeObject();
        saveAccessInformation(accessData);
    }
});

function setAccessFormData(idCompany) {
    $('[js-set-access]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "getAccess",
        data: JSON.stringify(idCompany),
        dataType: 'json',
        cache: false,
        success: function (data) {
            $('[js-access-fotm-id-company]').val(idCompany);

            $('input:checkbox[name="about"]').attr('checked', data.about).prop("checked", data.about);
            $('input:checkbox[name="regulations"]').attr('checked', data.regulations).prop("checked", data.regulations);
            $('input:checkbox[name="bookmarks"]').attr('checked', data.bookmarks).prop("checked", data.bookmarks);
            $('input:checkbox[name="training"]').attr('checked', data.training).prop("checked", data.training);
            $('input:checkbox[name="events"]').attr('checked', data.events).prop("checked", data.events);
            $('input:checkbox[name="production"]').attr('checked', data.production).prop("checked", data.production);
            $('[js-set-access]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-set-access]').prop("disabled", false);
        }
    });
}

function saveAccessInformation(accessData) {
    $('[js-save-access]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "saveAccess",
        data: JSON.stringify(accessData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            $('[js-menu-set-access]').removeClass('is-open');
            checkBodyHidden();
            resetAccessForm()
            $('[js-save-access]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-access]').prop("disabled", false);
        }
    });
}

function resetAccessForm() {
    $('[js-access-form]').trigger('reset');

    $('input:checkbox[name="about"]').attr('checked',false).prop("checked", false);
    $('input:checkbox[name="regulations"]').attr('checked', false).prop("checked", false);
    $('input:checkbox[name="bookmarks"]').attr('checked', false).prop("checked", false);
    $('input:checkbox[name="training"]').attr('checked', false).prop("checked", false);
    $('input:checkbox[name="events"]').attr('checked', false).prop("checked", false);
    $('input:checkbox[name="production"]').attr('checked', false).prop("checked", false);
}
$(document).ready(function() {

    const $menuCreateUserBtn = $('[js-create-user]');
    const $menuCreateUserCloseBtn = $('[js-menu-create-user-close-btn]');
    const $menuCreateUser = $('[js-menu-create-user]');

    const $saveUserBtn = $('[js-save-manager]');
    const $createUserForm = $('[js-manager-form]');

    $menuCreateUserBtn.on('click', function () {
        $menuCreateUser.addClass('is-open');
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
            var userData = $createUserForm.serializeObject();
            createManager(userData);
        }
    });

    const $saveAdvertiserBtn = $('[js-save-advertiser]');
    const $createAdvertiserForm = $('[js-advertiser-form]');

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

    const $saveAdminBtn = $('[js-save-admin]');
    const $createAdminForm = $('[js-admin-form]');

    $saveAdminBtn.on('click', function(event) {
        event.preventDefault();
        $createAdminForm.trigger('submit');
    });

    $createAdminForm.submit(function (event) {
        event.preventDefault();
        if (validateForm(this)) {
            var userData = $createAdminForm.serializeObject();
            createAdmin(userData);
        }
    });

    initEditUsersFromList();
    initCancelEditUserFromList();
    initAcceptEditUserFromList();
    initDatePicker();
    uploadAvatar();

    changeSelectorIndicator();
});

function changeSelectorIndicator() {
    $('.indicated-select select').on('change', function(event) {
        var vl = $('option:selected', this).attr('value');
        $(this).closest('.indicated-select').removeClassWild("indicated-select_*").addClass('indicated-select_' + vl);
    });
}
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
            $('[js-menu-create-user]').removeClass('is-open');
            checkBodyHidden();
            $('[js-advertiser-form]').trigger('reset');
            $('[js-save-advertiser]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-advertiser]').prop("disabled", false);
        }
    });
}

function createAdmin(userData) {
    $('[js-save-advertiser]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "saveAdmin",
        data: JSON.stringify(userData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            $('[js-menu-create-user]').removeClass('is-open');
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
            $('[js-menu-create-user]').removeClass('is-open');
            checkBodyHidden();
            $('[js-manager-form]').trigger('reset');
            $('[js-save-manager]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-manager]').prop("disabled", false);
        }
    });
}

function initDatePicker() {
    $('.datepicker-here-cs').datepicker({
        autoClose: true
    });
}

//активация редактирования формы
var USERS_INFO_TEMP = {};
function initEditUsersFromList() {

    $('[edit-user]').on('click', function (event) {
        event.preventDefault();
        $(this).closest('[edit-menu]').removeClass('is-open').siblings('[edit-btns]').addClass('is-open');
        var list = {};

        var name = $(this).closest('.custom-table__body-row').find('[u-name]');
        // name.removeAttr('disabled');
        list['name'] = name.val();

        var companyName = $(this).closest('.custom-table__body-row').find('[u-company-name]');
        companyName.removeAttr('disabled');
        list['companyName'] = companyName.val();

        var legalName = $(this).closest('.custom-table__body-row').find('[u-legal-name]');
        legalName.removeAttr('disabled');
        list['legalName'] = legalName.val();

        var username = $(this).closest('.custom-table__body-row').find('[u-username]');
        username.removeAttr('disabled');
        list['username'] = username.val();

        var password = $(this).closest('.custom-table__body-row').find('[u-password]');
        password.removeAttr('disabled');
        list['password'] = password.val();

        var timezone = $(this).closest('.custom-table__body-row').find('[u-timezone]');
        timezone.removeAttr('disabled');
        list['timezone'] = timezone.val();

        var phone = $(this).closest('.custom-table__body-row').find('[u-phone]');
        phone.removeAttr('disabled');
        list['phone'] = phone.val();

        var link = $(this).closest('.custom-table__body-row').find('[u-link]');
        link.removeAttr('disabled');
        list['link'] = link.val();

        var companyCode = $(this).closest('.custom-table__body-row').find('[u-company-code]');
        companyCode.removeAttr('disabled');
        list['companyCode'] = companyCode.val();

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

        $(this).closest('.custom-table__body-row').find('[u-access-wrapper]').removeClass('disabled');
        $(this).closest('.custom-table__body-row').find('[u-access-selector]').removeAttr('disabled');
        var access = $(this).closest('.custom-table__body-row').find('[u-access-selector]');
        list['access'] = access.val();

        $(this).closest('.custom-table__body-row').find('[u-partner-wrapper]').removeClass('disabled');
        $(this).closest('.custom-table__body-row').find('[u-partner-selector]').removeAttr('disabled');
        var isPartner = $(this).closest('.custom-table__body-row').find('[u-partner-selector]');
        list['isPartner'] = isPartner.val();

        $(this).closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');
        USERS_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[u-id]').val()] = list;
    });
}
function initCancelEditUserFromList() {
    $('[edit-user-cancel]').on('click', function (event) {
        event.preventDefault();
        var values = USERS_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[u-id]').val()];

        $(this).closest('.custom-table__body-row').find('[u-name]').val(values.name).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[u-company-name]').val(values.companyName).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[u-legal-name]').val(values.legalName).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[u-username]').val(values.username).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[u-password]').val(values.password).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[u-timezone]').val(values.timezone).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[u-phone]').val(values.phone).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[u-link]').val(values.link).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[u-company-code]').val(values.companyCode).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[u-doorscardnumber]').val(values.doorsCardNumber).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[u-birthday]').val(values.birthday).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[u-ishaskey]').prop('checked', values.isHasKey).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[u-type-wrapper]').addClass('disabled');
        $(this).closest('.custom-table__body-row').find('[u-type-selector]').val(values.type).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[u-dismiss-wrapper]').removeClassWild("indicated-select_*").addClass('indicated-select_' + values.dismiss).addClass('disabled');
        $(this).closest('.custom-table__body-row').find('[u-dismiss-selector]').val(values.dismiss).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[u-access-wrapper]').removeClassWild("indicated-select_*").addClass('indicated-select_' + values.access).addClass('disabled');
        $(this).closest('.custom-table__body-row').find('[u-access-selector]').val(values.access).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[u-partner-wrapper]').removeClassWild("indicated-select_*").addClass('indicated-select_' + values.isPartner).addClass('disabled');
        $(this).closest('.custom-table__body-row').find('[u-partner-selector]').val(values.isPartner).attr("disabled", true);

        $(this).closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');
        delete USERS_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[u-id]').val()];
    });
}
var USERS_ACCEPT_BTN;
function initAcceptEditUserFromList() {
    $('[edit-user-accept]').on('click', function (event) {
        event.preventDefault();
        USERS_ACCEPT_BTN = $(this);

        var userData = new Object();
        userData.id = $(this).closest('.custom-table__body-row').find('[u-id]').val();
        userData.idCompany = $(this).closest('.custom-table__body-row').find('[u-id-company]').val();
        userData.name = $(this).closest('.custom-table__body-row').find('[u-name]').val();
        userData.companyName = $(this).closest('.custom-table__body-row').find('[u-company-name]').val();
        userData.legalName = $(this).closest('.custom-table__body-row').find('[u-legal-name]').val();
        userData.username = $(this).closest('.custom-table__body-row').find('[u-username]').val();
        userData.password = $(this).closest('.custom-table__body-row').find('[u-password]').val();
        userData.timezoneHour = $(this).closest('.custom-table__body-row').find('[u-timezone]').val();
        userData.phone = $(this).closest('.custom-table__body-row').find('[u-phone]').val();
        userData.link = $(this).closest('.custom-table__body-row').find('[u-link]').val();
        userData.companyCode = $(this).closest('.custom-table__body-row').find('[u-company-code]').val();
        userData.doorsCardNumber = $(this).closest('.custom-table__body-row').find('[u-doorscardnumber]').val();
        userData.birthday = $(this).closest('.custom-table__body-row').find('[u-birthday]').val();
        userData.isHasKey = $(this).closest('.custom-table__body-row').find('[u-ishaskey]').prop('checked');
        userData.type = $(this).closest('.custom-table__body-row').find('[u-type-selector]').val();
        userData.isNotDisMiss = $(this).closest('.custom-table__body-row').find('[u-dismiss-selector]').val();
        userData.access = $(this).closest('.custom-table__body-row').find('[u-access-selector]').val();
        userData.isPartner = $(this).closest('.custom-table__body-row').find('[u-partner-selector]').val();

        $('[edit-user-accept]').prop("disabled", true);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "update",
            data: JSON.stringify(userData),
            dataType: 'json',
            cache: false,
            success: function (data) {
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-name]').val(data.name).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-company-name]').val(data.companyName).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-legal-name]').val(data.legalName).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-username]').val(data.username).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-password]').val('').attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-timezone]').val(data.timezoneHour).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-phone]').val(data.phone).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-link]').val(data.link).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-company-code]').val(data.companyCode).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-doorscardnumber]').val(data.doorsCardNumber).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-birthday]').val(data.birthday).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-ishaskey]').prop('checked', data.isHasKey).attr("disabled", true);

                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-type-wrapper]').addClass('disabled');
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-type-selector]').val(data.type).attr("disabled", true);
                if (typeof data.isNotDisMiss !== 'undefined') {
                    USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-dismiss-wrapper]').addClass('disabled');
                    USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-dismiss-selector]').val(data.isNotDisMiss.toString()).attr("disabled", true);

                }
                if (typeof data.access !== 'undefined') {
                    USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-access-wrapper]').addClass('disabled');
                    USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-access-selector]').val(data.access.toString()).attr("disabled", true);
                }
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-partner-wrapper]').addClass('disabled');
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-partner-selector]').val(data.isPartner.toString()).attr("disabled", true);

                USERS_ACCEPT_BTN.closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');
                delete USERS_INFO_TEMP[data.id];

                $('[edit-user-accept]').prop("disabled", false);
            },
            error: function (data) {
                var values = USERS_INFO_TEMP[userData.id];

                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-name]').val(values.name).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-company-name]').val(values.companyName).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-legal-name]').val(values.legalName).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-username]').val(values.username).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-password]').val('').attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-timezone]').val(values.timezone).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-phone]').val(values.phone).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-link]').val(values.link).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-company-code]').val(values.companyCode).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-doorscardnumber]').val(values.doorsCardNumber).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-birthday]').val(values.birthday).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-ishaskey]').prop('checked', values.isHasKey).attr("disabled", true);

                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-type-wrapper]').addClass('disabled');
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-type-selector]').val(values.type).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-dismiss-wrapper]').addClass('disabled');
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-dismiss-selector]').val(values.dismiss).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-access-wrapper]').addClass('disabled');
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-access-selector]').val(values.access).attr("disabled", true);
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-partner-wrapper]').addClass('disabled');
                USERS_ACCEPT_BTN.closest('.custom-table__body-row').find('[u-partner-selector]').val(values.isPartner).attr("disabled", true);

                USERS_ACCEPT_BTN.closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');

                delete USERS_INFO_TEMP[data.id];
                $('[edit-user-accept]').prop("disabled", false);
            }
        });
    });
}

$(document).on('change', '[u-upload-background]', function(event){
    var form = $(this).closest('[u-upload-background-form]')
    var data = new FormData(form[0]);
    $('[u-upload-background]').prop("disabled", true);
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "uploadBackground",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 300000,
        success: function (data) {
            form.find('.avatar-upload__upload').removeClassWild("avatar-upload__upload_*");
            form.find('.avatar-upload__upload').html('<img src="/' + data + '" alt>');
            $('[u-upload-background]').prop("disabled", false);
        },
        error: function (data) {
            $('[u-upload-background]').prop("disabled", false);
        }
    });
});

function uploadAvatar() {
    $('[u-upload-avatar]').on('change', function () {
        var form = $(this).closest('[u-upload-avatar-form]')
        var data = new FormData(form[0]);
        $('[u-upload-avatar]').prop("disabled", true);
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
}

$(document).on('click', '[js-copy-company-link]', function(event){
    var $tmp = $("<textarea>");
    $("body").append($tmp);
    $tmp.val($(this).attr('data-link') + $(this).closest('.custom-table__body-row').find('[u-company-code]').val()).select();
    document.execCommand("copy");
    $tmp.remove();
});
$(document).on('click', '[js-open-company-link]', function(event){
    window.open($(this).attr('data-link') + $(this).closest('.custom-table__body-row').find('[u-company-code]').val(), '_blank')
});
