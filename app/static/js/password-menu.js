//открытие меню категории
$(document).on('click', '[add-category]', function(event){
    $('[js-menu-add-category]').addClass('is-open');
    checkBodyHidden();
});

$(document).on('click', '[js-menu-add-category-close-btn]', function(event){
    closeAddCategoryMenu();
});

function closeAddCategoryMenu() {
    $('[js-menu-add-category]').removeClass('is-open');
    $('[js-add-category-form]').trigger('reset');
    checkBodyHidden();
}

//сохранение категории
$(document).on('click', '[save-password-category]', function(event){
    event.preventDefault();
    $('[js-add-category-form]').trigger('submit');
});
$(document).on('submit', '[js-add-category-form]', function(event){
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[js-add-category-form]')[0]);
        formData.append('password', $('[data-part="1"]'). val() + $('[data-part="2"]'). val() + $('[data-part="3"]'). val() + $('[data-part="4"]'). val());
        savePasswordCategory(formData);
    }
});
function savePasswordCategory(formData) {
    $('[save-password-category]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "savePasswordCategory",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            addCategoryToList(data);

            closeAddCategoryMenu();
        },
        error: function (data) {
            $('[save-password-category]').prop("disabled", false);
        }
    });
}

function addCategoryToList(data) {
    var listItems = $('[category-list]').html();

    $('[category-list]').html(listItems +
        '<div category data-category="' + data.id + '" class="side-category__item">' +
        '   <div category-name open-category class="side-category__link">' + data.name + '</div>' +
        '   <div class="side-category__setting"></div>' +
        '</div>'
    );
}
$(document).on('keydown', '[data-part]', function(event) {
    if (event.keyCode == 46 || event.keyCode == 8) {
        return;
    } else {
        if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
            event.preventDefault();
        }
    }
});

$(document).on('keyup', '[data-part]', function(event){
    var currentPart = Number($(this).attr('data-part'));
    if (event.keyCode == 46 || event.keyCode == 8) {
        var prev = $('[data-part="' + (currentPart - 1) + '"]');
        if (prev.length) { prev.focus(); prev.select(); }
    } else {
        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105 )) {
            var next = $('[data-part="' + (currentPart + 1) + '"]');
            if (next.length) { next.focus(); }
        }
    }

    checkFullPassword($('[data-part]'), $(this));
});
function checkFullPassword(parts, currentBtn) {
    var isFull = true;

    parts.each(function() {
        if ($(this).val().length !== 1) {
            isFull = false;
        }
    });

    if (isFull) {
        parts.addClass('active');
        currentBtn.closest('form').find('[disabled-btn]').removeAttr("disabled");
    } else {
        parts.removeClass('active');
        currentBtn.closest('form').find('[disabled-btn]').attr("disabled", "disabled");
    }
}
$(document).on('keydown', '[data-password-part]', function(event) {
    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 13) {
        return;
    } else {
        if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
            event.preventDefault();
        }
    }
});
$(document).on('keyup', '[data-password-part]', function(event){
    var currentPart = Number($(this).attr('data-password-part'));
    if (event.keyCode == 46 || event.keyCode == 8) {
        var prev = $('[data-password-part="' + (currentPart - 1) + '"]');
        if (prev.length) { prev.focus(); prev.select(); }
    } else {
        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105 )) {
            var next = $('[data-password-part="' + (currentPart + 1) + '"]');
            if (next.length) { next.focus(); }
        }
    }

    checkFullPassword($('[data-password-part]'), $(this));
});

//модалка входа в категорию
$(document).on('click', '[open-category]', function(event) {
    event.preventDefault();
    $('[category-form-id]').val($(this).closest('[category]').data('category'));
    $('[taboo-dialog]').find('[accept-dialog]').attr('category-accept', '');
    $('[taboo-dialog]').find('form').attr('category-open-form', '');
    $('[taboo-dialog]').addClass('is-open');
});

$(document).on('click', '[close-dialog]', function(event) {
    removeAcceptBtnAttribute($(this).siblings('[accept-dialog]'));
    $(this).closest('.dialog').removeClass('is-open');
});

function removeAcceptBtnAttribute(btn) {
    btn.each(function() {
        var attributes = $.map(this.attributes, function(item) {
            return item.name;
        });

        var img = $(this);
        $.each(attributes, function(i, item) {
            if (item !== 'accept-dialog' && item !== 'class' && item !== 'disabled-btn' && item !== 'disabled')  {
                img.removeAttr(item);
            }
        });
    });
}

$(document).on('click', '[close-taboo-dialog]', function(event) {
    resetTabooModal();
});

$(document).on('click', '[category-accept]', function(event) {
    event.preventDefault();
    $('[category-open-form]').trigger('submit');
});

$(document).on('submit', '[category-open-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[category-open-form]')[0]);
        formData.append('password', $('[data-password-part="1"]'). val() + $('[data-password-part="2"]'). val() + $('[data-password-part="3"]'). val() + $('[data-password-part="4"]'). val());
        openPasswordCategory(formData);
    }
});
function openPasswordCategory(formData) {
    $('[category-accept]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "openPasswordCategory",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            resetTabooModal();

            $('[category]').removeClass('active');
            $('[category]').find('[category-name]').attr('open-category', '');
            setPasswordCategory(formData.get('id'), data);
        },
        error: function (data) {
            resetTabooModal();

            resetCategory();
            $('[category]').removeClass('active');
            $('[category]').find('[category-name]').attr('open-category', '');

            $('[dialog-info]').find('.dialog__title').html('Ошибка входа в категорию');
            $('[dialog-info]').find('.dialog__text').html('Пароль неверный, повторите ввод');
            $('[dialog-info]').addClass('is-open');
        }
    });
}
function resetTabooModal() {
    $('[taboo-dialog]').removeClass('is-open');
    removeAcceptBtnAttribute($('[taboo-dialog]').find('[accept-dialog]'));
    $('[category-form]').removeAttr('category-update-form');
    $('[category-form]').removeAttr('category-open-form');
    $('[category-form]').trigger('reset');
    $('[category-form]').find('[disabled-btn]').attr("disabled", "disabled");
    $('[data-password-part]').removeClass('active');
}
function resetCategory() {
    $('[passwords]').html(
        '<div class="message">' +
        '   <div class="message__title">Пожалуйста, выберите<br>категорию</div>' +
        '</div>');
}

function setPasswordCategory(idCategory, data) {
    $('[category][data-category="' + idCategory + '"]').addClass('active');
    $('[category][data-category="' + idCategory + '"]').find('[category-name]').removeAttr('open-category');
    var categoryName = $('[category][data-category="' + idCategory + '"]').find('[category-name]').html();

    var header =
        '<div data-category="' + idCategory + '" class="side-header side-header_bordered">' +
        '    <div category-name class="side-header__title">' + categoryName + '</div>' +
        '    <div add-password class="add-button add-button_right">+ Добавить пароль</div>' +
        '</div>';

    var rows =  '';
    $.each(data, function(index, value){
        rows += createRow(value);
    });

    var table =
        ' <div class="side-content__table">' +
        '                <table class="custom-table">' +
        '                    <thead class="custom-table__header">' +
        '                        <td class="custom-table__header-col custom-table__header-col_big custom-table__header-col_gray">Назввание</td>' +
        '                        <td class="custom-table__header-col custom-table__header-col_big custom-table__header-col_gray">Логин</td>' +
        '                        <td class="custom-table__header-col custom-table__header-col_big custom-table__header-col_gray">Пароль</td>' +
        '                        <td class="custom-table__header-col custom-table__header-col_big custom-table__header-col_gray">Телефон</td>' +
        '                        <td class="custom-table__header-col custom-table__header-col_big custom-table__header-col_gray">Доступен</td>' +
        '                        <td class="custom-table__header-col custom-table__header-col_big custom-table__header-col_gray"></td>' +
        '                    </thead>' +
        '                    <tbody password-rows class="custom-table__body custom-table__body_white">' + rows +
        '                    </tbody>' +
        '                </table>' +
        '            </div>';

    $('[passwords]').html( header + table);
}
function createRow(value) {
    var employees = '';
    var employeeCount = 0;
    $.each(value.passwordDepartments, function(index, passwordDepartment){
        $.each(passwordDepartment.employees, function(index2, employee) {
            employeeCount++;
            employees +=
                '<div class="c-tooltip__row">' +
                '       <div class="avatar">' +
                '           <div class="avatar__wrapper avatar__wrapper_small">' +
                '                <span class="avatar-image ' + (employee.avatar === null || employee.avatar === '' ? 'avatar-image_default' : '') + '">' +
                (employee.avatar !== null ? ('<img src="/' + employee.avatar + '" alt="">') : '') +
                '                </span>' +
                '           </div>' +
                '        </div>' +
                '   <div class="c-tooltip__text c-tooltip__text_p16">' + employee.name + '</div>' +
                '</div>';
        });
    });

    return '<tr data-password="' + value.id + '" class="custom-table__body-row custom-table__body-row_large">' +
        '                            <td class="custom-table__body-col custom-table__body-col_30per">' +
        '                               <div class="side-wrapper">' +
        '                                   <div class="side-wrapper side-wrapper_col side-wrapper_w100">' +
        '                                       <div class="side-text side-text_bold">' + value.name + '</div>' +
        '                                       <div class="side-desc">' + value.desc + '</div>' +
        '                                   </div>' +
        '                                    <div class="column-links">' +
        '                                        <div js-copy-link class="column_mwidth column_mwidth-copy" data-link="' + value.url + '"></div>' +
        '                                        <a target="_blank" class="column_mwidth column_mwidth-open" href="' + value.url + '"></a>' +
        '                                    </div>' +
        '                               </div>' +
        '                            </td>' +
        '                            <td class="custom-table__body-col custom-table__body-col_20per">' +
        '                                <div js-copy-link data-link="' + value.login + '" class="side-copy">' +
        '                                    <div class="side-text">' + value.login + '</div>' +
        '                                </div>' +
        '                            </td>' +
        '                            <td class="custom-table__body-col custom-table__body-col_10per">' +
        '                                <div js-copy-link data-link="' + value.password + '" class="side-copy">' +
        '                                    <div class="side-text">**********</div>' +
        '                                </div>' +
        '                            </td>' +
        '                            <td class="custom-table__body-col custom-table__body-col_15per">' +
        '                                <div class="side-text">' + value.phone + '</div>' +
        '                            </td>' +
        '                            <td class="custom-table__body-col custom-table__body-col_15per">' +
        '                                <div class="side-tooltip ' + (employeeCount !== 0 ? 'c-tooltip' : '') + '">' +
        '                                    <div class="c-tooltip__wrapper c-tooltip__wrapper_large">' + employees + '</div>' +
        '                                    <span>' + employeeCount + ' сотрудников</span>' +
        '                                </div>' +
        '                            </td>' +
        '                            <td class="custom-table__body-col custom-table__body-col_10per">' +
        '                                <div class="column-links display-flex-none is-open">' +
        '                                    <div update-password class="column_mwidth div-table__body-col_center column_mwidth-edit"></div>' +
        '                                    <form class="column-form" action="#">' +
        '                                        <button delete-password type="button" class="column_mwidth column_mwidth-delete"></button>' +
        '                                    </form>' +
        '                                </div>' +
        '                            </td>' +
        '                        </tr>';
}

//модалка обновления категории
$(document).on('click', '[update-category]', function(event) {
    event.preventDefault();
    $('[category-form-id]').val($(this).closest('[category]').data('category'));
    $('[taboo-dialog]').find('[accept-dialog]').attr('category-accept-update', '');
    $('[taboo-dialog]').find('form').attr('category-update-form', '');
    $('[taboo-dialog]').addClass('is-open');
});
$(document).on('click', '[category-accept-update]', function(event) {
    event.preventDefault();
    $('[category-update-form]').trigger('submit');
});

$(document).on('submit', '[category-update-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[category-update-form]')[0]);
        formData.append('password', $('[data-password-part="1"]'). val() + $('[data-password-part="2"]'). val() + $('[data-password-part="3"]'). val() + $('[data-password-part="4"]'). val());
        openUpdatePasswordCategory(formData);
    }
});
function openUpdatePasswordCategory(formData) {
    $('[category-accept-update]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getPasswordCategory",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            resetTabooModal();

            $('[update-category-id]').val(data.id);
            $('[update-category-password]').val(formData.get('password'));
            $('[update-category-name]').val(data.name);

            $('[js-menu-update-category]').addClass('is-open');
            checkBodyHidden();
        },
        error: function (data) {
            resetTabooModal();

            $('[dialog-info]').find('.dialog__title').html('Ошибка входа в категорию');
            $('[dialog-info]').find('.dialog__text').html('Пароль неверный, повторите ввод');
            $('[dialog-info]').addClass('is-open');
        }
    });
}
$(document).on('keydown', '[data-p]', function(event) {
    if (event.keyCode == 46 || event.keyCode == 8) {
        return;
    } else {
        if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
            event.preventDefault();
        }
    }
});

$(document).on('keyup', '[data-p]', function(event){
    var currentPart = Number($(this).attr('data-p'));
    if (event.keyCode == 46 || event.keyCode == 8) {
        var prev = $('[data-p="' + (currentPart - 1) + '"]');
        if (prev.length) { prev.focus(); prev.select(); }
    } else {
        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105 )) {
            var next = $('[data-p="' + (currentPart + 1) + '"]');
            if (next.length) { next.focus(); }
        }
    }

    checkRequiredPassword($('[data-p]'));
});
function checkRequiredPassword(parts) {
    var isRequired = false;

    parts.each(function() {
        if ($(this).val().length === 1) {
            isRequired = true;
        }
    });

    if (isRequired) {
        parts.attr('required', '');
    } else {
        parts.removeAttr("required");
    }
}
$(document).on('click', '[js-menu-update-category-close-btn]', function(event){
    closeUpdateCategoryMenu();
});

function closeUpdateCategoryMenu() {
    $('[js-menu-update-category]').removeClass('is-open');
    $('[js-update-category-form]').trigger('reset');
    checkBodyHidden();
}

$(document).on('click', '[update-password-category]', function(event) {
    event.preventDefault();
    $('[js-update-category-form]').trigger('submit');
});

$(document).on('submit', '[js-update-category-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[js-update-category-form]')[0]);
        formData.append('newPassword', $('[data-p="1"]'). val() + $('[data-p="2"]'). val() + $('[data-p="3"]'). val() + $('[data-p="4"]'). val());
        updatePasswordCategory(formData);
    }
});

function updatePasswordCategory(formData) {
    $('[update-password-category]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "updatePasswordCategory",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $('[data-category="' + data.id + '"]').find('[category-name]').html(data.name);

            closeUpdateCategoryMenu();
            $('[update-password-category]').prop("disabled", false);
        },
        error: function (data) {
            $('[update-password-category]').prop("disabled", false);
        }
    });
}

var $employeeTypes;
function setEmployeeTypes(employeeTypes) {
    $employeeTypes = employeeTypes;
}
var $employeeByTypes;
function setEmployeeByTypes(employeeByTypes) {
    $employeeByTypes = employeeByTypes;
}

$(document).on('change', '[password-department]', function(event){
    var idAccessBlock = $(this).closest('[data-access]').data('access');
    $('[data-access="' + idAccessBlock + '"]').find('[password-role]').html('<option value="0" selected>Все роли</option>');

    var selectedDepartment = Number($('option:selected', this).val());
    if (selectedDepartment !== 0) {
        var seloption = "";
        $.each($employeeTypes[selectedDepartment], function(index, value){
            seloption += '<option value="' + value.id + '">' + value.title + '</option>';
        });

        $('[data-access="' + idAccessBlock + '"]').find('[password-role]').html($('[data-access="' + idAccessBlock + '"]').find('[password-role]').html() + seloption);
    }
    var idDepartment = Number($('[data-access="' + idAccessBlock + '"]').find('[password-department] option:selected').val());
    var idRole = Number($('[data-access="' + idAccessBlock + '"]').find('[password-role] option:selected').val());
    setEmployee($('[data-access="' + idAccessBlock + '"]').find('[manager-rows]'), idDepartment, idRole);
});

$(document).on('change', '[u-password-department]', function(event){
    var idAccessBlock = $(this).closest('[data-access]').data('access');
    $('[data-access="' + idAccessBlock + '"]').find('[u-password-role]').html('<option value="0" selected>Все роли</option>');

    var selectedDeaprtment = Number($('option:selected', this).val());
    if (selectedDeaprtment !== 0) {
        var seloption = "";
        $.each($employeeTypes[selectedDeaprtment], function(index, value){
            seloption += '<option value="' + value.id + '">' + value.title + '</option>';
        });

        $('[data-access="' + idAccessBlock + '"]').find('[u-password-role]').html($('[data-access="' + idAccessBlock + '"]').find('[u-password-role]').html() + seloption);
    }
    var idDepartment = Number($('[data-access="' + idAccessBlock + '"]').find('[u-password-department] option:selected').val());
    var idRole = Number($('[data-access="' + idAccessBlock + '"]').find('[u-password-role] option:selected').val());
    setEmployee($('[data-access="' + idAccessBlock + '"]').find('[u-manager-rows]'), idDepartment, idRole);
});

$(document).on('change', '[u-password-role]', function(event){
    var idAccessBlock = $(this).closest('[data-access]').data('access');
    var idDepartment = Number($('[data-access="' + idAccessBlock + '"]').find('[u-password-department] option:selected').val());
    var idRole = Number($('[data-access="' + idAccessBlock + '"]').find('[u-password-role] option:selected').val());
    setEmployee($('[data-access="' + idAccessBlock + '"]').find('[u-manager-rows]'), idDepartment, idRole);
});


function setEmployee(managerRows, idDepartment, idRole) {

    managerRows.html('');
    var idAccessBlock = managerRows.closest('[data-access]').data('access');

    if (idDepartment !== 0) {
        if (idRole !== 0) {

            var rows = "";
            $.each($employeeByTypes[idDepartment][idRole], function(index, value){
                rows +=
                    '<div class="cb">' +
                    '    <input checked type="checkbox" id="block' + idAccessBlock + 'id' + value.id + '" class="cb__checkbox"  name="passwordDepartments[' + idAccessBlock + '].employees[' + index + '].id" value="' + value.id + '">' +
                    '    <label class="cb__label" for="block' + idAccessBlock + 'id' + value.id + '">' +
                    '       <div class="avatar">' +
                    '           <div class="avatar__wrapper">' +
                    '                <span class="avatar-image ' + (value.avatar === null || value.avatar === '' ? 'avatar-image_default' : '') + '">' +
                                        (value.avatar !== null ? ('<img src="/' + value.avatar + '" alt="">') : '')  +
                    '                </span>' +
                    '           </div>' +
                    '        </div>' +
                    '        <span class="cb__text cb__text_bordered">' + value.name + '</span> ' +
                    '        <span class="cb__text">' + value.position + '</span> ' +
                    '    </label>' +
                    '</div>';
            });

            managerRows.html(rows);
        } else {
            var rows = "";
            var counter = 0;
            $.each($employeeByTypes[idDepartment], function(index, value){
                $.each(value, function(index2, value2){
                    rows +=
                        '<div class="cb">' +
                        '    <input checked type="checkbox" id="block' + idAccessBlock + 'id' + value2.id + '" class="cb__checkbox" name="passwordDepartments[' + idAccessBlock + '].employees[' + counter + '].id" value="' + value2.id + '">' +
                        '    <label class="cb__label" for="block' + idAccessBlock + 'id' + value2.id + '">' +
                        '       <div class="avatar">' +
                        '           <div class="avatar__wrapper">' +
                        '                <span class="avatar-image ' + (value2.avatar === null || value2.avatar === '' ? 'avatar-image_default' : '') + '">' +
                                            (value2.avatar !== null ? ('<img src="/' + value2.avatar + '" alt="">') : '')  +
                        '                </span>' +
                        '           </div>' +
                        '        </div>' +
                        '        <span class="cb__text cb__text_bordered">' + value2.name + '</span> ' +
                        '        <span class="cb__text">' + value2.position + '</span> ' +
                        '    </label>' +
                        '</div>';

                    counter++;
                });
            });
            managerRows.html(rows);
        }

    }
}

$(document).on('change', '[password-role]', function(event){
    var idAccessBlock = $(this).closest('[data-access]').data('access');
    var idDepartment = Number($('[data-access="' + idAccessBlock + '"]').find('[password-department] option:selected').val());
    var idRole = Number($('[data-access="' + idAccessBlock + '"]').find('[password-role] option:selected').val());
    setEmployee($('[data-access="' + idAccessBlock + '"]').find('[manager-rows]'), idDepartment, idRole);
});

$(document).on('click', '[add-password]', function(event){
    $('[password-category-id]').val($(this).closest('[data-category]').data('category'));
    $('[js-menu-add-password]').addClass('is-open');
    checkBodyHidden();
});

$(document).on('click', '[js-menu-add-password-close-btn]', function(event){
    closeAddPasswordMenu();
});

$(document).on('click', '[save-password]', function(event) {
    event.preventDefault();
    $('[js-add-password-form]').trigger('submit');
});

$(document).on('submit', '[js-add-password-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[js-add-password-form]')[0]);
        savePassword(formData);
    }
});

function savePassword(formData) {
    $('[save-password]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "savePassword",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            addPasswordToList(data);

            closeAddPasswordMenu();
            $('[save-password]').prop("disabled", false);
        },
        error: function (data) {
            $('[save-password]').prop("disabled", false);
        }
    });
}

function addPasswordToList(data) {
    var rows = $('[password-rows]').html();
    var newRow = createRow(data);

    $('[password-rows]').html(newRow + rows);
}

function closeAddPasswordMenu() {
    $('[js-menu-add-password]').removeClass('is-open');
    $('[js-add-password-form]').trigger('reset');
    $('[data-access]').remove();
    ACCESS_BLOCK_COUNTER = -1;
    checkBodyHidden();
}
var DELETE_PASSWORD;
$(document).on('click', '[delete-password]', function(event) {
    event.preventDefault();
    $('[dialog-accept]').find('.dialog__title').html('Вы действительно хотите удалить пароль?');
    $('[dialog-accept]').find('.dialog__text').html('Пароль будет удален');
    $('[dialog-accept]').find('[accept-dialog]').attr('accept-delete-password', '');
    $('[dialog-accept]').addClass('is-open');
    DELETE_PASSWORD =  Number($(this).closest('[data-password]').data('password'));
});

$(document).on('click', '[accept-delete-password]', function(event) {
    var formData = new FormData();
    formData.append('id', DELETE_PASSWORD);

    $.ajax({
        type: "POST",
        url: "deletePassword",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $('[data-password="' + DELETE_PASSWORD + '"]').remove();

            $('[dialog-accept]').removeClass('is-open');
            removeAcceptBtnAttribute($(this));
        },
        error: function (data) {
            $('[dialog-accept]').removeClass('is-open');
            removeAcceptBtnAttribute($(this));
        }
    });

});

$(document).on('click', '[update-password]', function(event){
    openUpdatePasswordMenu($(this).closest('[data-password]').data('password'));
});
function openUpdatePasswordMenu(idPassword) {
    var formData = new FormData();
    formData.append('id', idPassword);

    $('[update-password]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getPassword",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            setUpdatePasswordInfo(data);

            $('[update-password]').prop("disabled", false);
        },
        error: function (data) {
            $('[update-password]').prop("disabled", false);
        }
    });
};

function setUpdatePasswordInfo(data) {
    $('[u-password-id]').val(data.id);
    $('[u-password-category-id]').val(data.idCategory);
    $('[u-password-name]').val(data.name);
    $('[u-password-desc]').val(data.desc);
    $('[u-password-url]').val(data.url);
    $('[u-password-login]').val(data.login);
    $('[u-password-password]').val(data.password);
    $('[u-password-phone]').val(data.phone);

    $.each(data.passwordDepartments, function(index, value){
        var accessBlock = ' <div data-access="' + index + '" class="menu-input menu-input_xsmall">' +
            '            <div class="menu-input__title">Отдел</div>' +
            '            <div class="menu-input__wrapper menu-input__wrapper_select">' +
            '                <select u-password-department id="u-password-department" name="passwordDepartments[' + index + '].idDepartment" class="menu-input__input menu-input__input_small menu-input__input_select" required>' +
            '                      <option value="" disabled>Выберите отдел</option>' +
            '                      <option value="1000">Продажи</option>' +
            '                      <option value="1001">Маркетинг</option>' +
            '                 </select>' +
            '            </div>' +
            '        </div>' +
            '        <div data-access="' + index + '" class="menu-input menu-input_xsmall">' +
            '             <div class="menu-input__title">Роли</div>' +
            '             <div class="menu-input__wrapper menu-input__wrapper_select">' +
            '                 <select u-password-role id="u-password-role" name="passwordDepartments[' + index + '].idEmployeeType" class="menu-input__input menu-input__input_small menu-input__input_select" required>' +
            '                      <option value="" selected disabled>Выберите роль</option>' +
            '                 </select>' +
            '              </div>' +
            '         </div>' +
            '         <div data-access="' + index + '" class="menu-input__delim">' +
            '              <span></span>' +
            '         </div>' +
            '         <div data-access="' + index + '" class="menu-input menu-input_xsmall">' +
            '              <div class="input-element__input input-element__input_light-violet input-element__input_row">' +
            '                  <div class="input-element__radio">' +
            '                       <input u-password-type type="radio" id="utypeAll' + index + '" class="radio radio-check" name="passwordDepartments[' + index + '].passwordType" value="1" checked="checked">' +
            '                       <label for="utypeAll' + index + '">Все сотрудники</label>' +
            '                  </div>' +
            '                  <div class="input-element__radio">' +
            '                       <input u-password-type type="radio" id="utypeFew' + index + '" class="radio radio-check" name="passwordDepartments[' + index + '].passwordType" value="2">' +
            '                       <label for="utypeFew' + index + '">Некоторые сотрудники</label>' +
            '                  </div>' +
            '              </div>' +
            '         </div>' +
            '         <div data-access="' + index + '" class="menu-input menu-input_xsmall">' +
            '              <div u-manager-rows class="menu-input__checkbox-wrapper">' +
            '              </div>' +
            '         </div>' +
            '         <div u-access-delimiter data-access="' + index + '" class="menu-input__delim">' +
            '              <span></span>' +
            '         </div>';

        if (index === 0) {
            $('[u-access-delimiter]').after(accessBlock);
        } else {
            $('[u-access-delimiter][data-access="' + (index - 1) + '"]').after(accessBlock);
        }

        $('[data-access="' + index + '"]').find('[u-password-type][value="' + value.passwordType + '"]').prop('checked', true);
        $('[data-access="' + index + '"]').find('[u-password-department]').val(value.idDepartment);
        $('[data-access="' + index + '"]').find('[u-password-department]').trigger('change');

        $('[data-access="' + index + '"]').find('[u-password-role]').val(value.idEmployeeType);
        $('[data-access="' + index + '"]').find('[u-password-role]').trigger('change');

        $('[data-access="' + index + '"]').find('[u-manager-rows]').find('input[type="checkbox"]').prop('checked', false);
        $.each(value.employees, function(index3, employee){
            $('[data-access="' + index + '"]').find('[u-manager-rows]').find('input[type="checkbox"][value="' + employee.id + '"]').prop('checked', true);
        });

    });

    ACCESS_BLOCK_COUNTER = data.passwordDepartments.length - 1;

    $('[js-menu-update-password]').addClass('is-open');
    checkBodyHidden();
}

$(document).on('click', '[js-menu-update-password-close-btn]', function(event){
    closeUpdatePasswordMenu();
});
function closeUpdatePasswordMenu() {
    $('[js-menu-update-password]').removeClass('is-open');
    $('[js-update-password-form]').trigger('reset');
    $('[data-access]').remove();
    ACCESS_BLOCK_COUNTER = -1;
    checkBodyHidden();
}

$(document).on('click', '[save-update-password]', function(event){
    event.preventDefault();
    $('[js-update-password-form]').trigger('submit');
});
$(document).on('submit', '[js-update-password-form]', function(event){
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[js-update-password-form]')[0]);
        updatePassword(formData);
    }
});
function updatePassword(formData) {
    $('[save-update-password]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "updatePassword",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $('[password-rows]').find('[data-password="' + formData.get('id') + '"]').replaceWith(createRow(data));
            closeUpdatePasswordMenu();

            $('[save-update-password]').prop("disabled", false);
        },
        error: function (data) {
            $('[save-update-password]').prop("disabled", false);
        }
    });
}

//добавление удаление блока доступа
var ACCESS_BLOCK_COUNTER = -1;
$(document).on('click', '[add-access]', function(event){
    ACCESS_BLOCK_COUNTER++;

    var depId = '';
    var roleId = '';
    var managersBlock = '';
    var attr = $(this).attr('is-update');
    var isUpdate = (typeof attr !== typeof undefined && attr !== false);
    if (isUpdate) {
        depId = ' u-password-department id="u-password-department" ';
        roleId = ' u-password-role id="u-password-role" ';
        managersBlock = ' u-manager-rows ';
    } else {
        depId = ' password-department id="password-department" ';
        roleId = ' password-role id="password-role" ';
        managersBlock = ' manager-rows ';
    }

    var accessBlock = ' <div data-access="' + ACCESS_BLOCK_COUNTER + '" class="menu-input menu-input_xsmall">' +
        '            <div class="menu-input__title">Отдел</div>' +
        '            <div class="menu-input__wrapper menu-input__wrapper_select">' +
        '                <select ' + depId + ' name="passwordDepartments[' + ACCESS_BLOCK_COUNTER + '].idDepartment" class="menu-input__input menu-input__input_small menu-input__input_select" required>' +
        '                      <option value="" disabled>Выберите отдел</option>' +
        '                      <option value="1000">Продажи</option>' +
        '                      <option value="1001">Маркетинг</option>' +
        '                 </select>' +
        '            </div>' +
        '        </div>' +
        '        <div data-access="' + ACCESS_BLOCK_COUNTER + '" class="menu-input menu-input_xsmall">' +
        '             <div class="menu-input__title">Роли</div>' +
        '             <div class="menu-input__wrapper menu-input__wrapper_select">' +
        '                 <select ' + roleId + ' name="passwordDepartments[' + ACCESS_BLOCK_COUNTER + '].idEmployeeType" class="menu-input__input menu-input__input_small menu-input__input_select" required>' +
        '                      <option value="" selected disabled>Выберите роль</option>' +
        '                 </select>' +
        '              </div>' +
        '         </div>' +
        '         <div data-access="' + ACCESS_BLOCK_COUNTER + '" class="menu-input__delim">' +
        '              <span></span>' +
        '         </div>' +
        '         <div data-access="' + ACCESS_BLOCK_COUNTER + '" class="menu-input menu-input_xsmall">' +
        '              <div class="input-element__input input-element__input_light-violet input-element__input_row">' +
        '                  <div class="input-element__radio">' +
        '                       <input type="radio" id="typeAll' + ACCESS_BLOCK_COUNTER + '" class="radio radio-check" name="passwordDepartments[' + ACCESS_BLOCK_COUNTER + '].passwordType" value="1" checked="checked">' +
        '                       <label for="typeAll' + ACCESS_BLOCK_COUNTER + '">Все сотрудники</label>' +
        '                  </div>' +
        '                  <div class="input-element__radio">' +
        '                       <input type="radio" id="typeFew' + ACCESS_BLOCK_COUNTER + '" class="radio radio-check" name="passwordDepartments[' + ACCESS_BLOCK_COUNTER + '].passwordType" value="2">' +
        '                       <label for="typeFew' + ACCESS_BLOCK_COUNTER + '">Некоторые сотрудники</label>' +
        '                  </div>' +
        '              </div>' +
        '         </div>' +
        '         <div data-access="' + ACCESS_BLOCK_COUNTER + '" class="menu-input menu-input_xsmall">' +
        '              <div ' + managersBlock + ' class="menu-input__checkbox-wrapper">' +
        '              </div>' +
        '         </div>' +
        '         <div ' + (isUpdate ? 'u-access-delimiter' : '') + ' access-delimiter data-access="' + ACCESS_BLOCK_COUNTER + '" class="menu-input__delim">' +
        '              <span></span>' +
        '         </div>';

    if (ACCESS_BLOCK_COUNTER === 0) {
        if (isUpdate) {
            $('[u-access-delimiter]').after(accessBlock);
        } else {
            $('[access-delimiter]').after(accessBlock);
        }
    } else {
        if (isUpdate) {
            $('[u-access-delimiter][data-access="' + (ACCESS_BLOCK_COUNTER - 1) + '"]').after(accessBlock);
        } else {
            $('[access-delimiter][data-access="' + (ACCESS_BLOCK_COUNTER - 1) + '"]').after(accessBlock);
        }
    }
});
$(document).on('click', '[del-access]', function(event) {

    if (ACCESS_BLOCK_COUNTER >= 0 ) {
        $('[data-access="' + ACCESS_BLOCK_COUNTER + '"]').remove();
        ACCESS_BLOCK_COUNTER--;
    }
});