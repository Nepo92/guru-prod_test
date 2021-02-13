
$(document).on('change', '[qs-filter]', function() {
    $('[qs-filter-form]').trigger('submit');
});

var JSON_OBJECT = [];
$(document).on('change', '[template-setting]', function() {
    var jsonItem = {};
    jsonItem['year'] = $('#year').val();
    jsonItem['month'] = $(this).closest('[data-month]').data('month');
    jsonItem['idEmployee'] = $(this).closest('[data-employee]').data('employee');
    jsonItem['idDepartment'] = $(this).closest('[data-department]').data('department');
    jsonItem['idTemplate'] = Number($(this).val());

    JSON_OBJECT.push(jsonItem);
    check(JSON_OBJECT);
});
function check(jsonObj) {
    jsonObj.length > 0 ? $('.drop-message').addClass('active') : $('.drop-message').removeClass('active');
}

$(document).on('click', '[setting-btn]', function (event) {
    event.preventDefault();
    $('[setting-form]').trigger('submit');
});

$(document).on('submit', '[setting-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        saveSettings(JSON_OBJECT);
    }
});
function saveSettings(json) {
    $('[setting-btn]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "saveSettings",
        data: JSON.stringify(json),
        dataType: 'json',
        cache: false,
        success: function (data) {
            JSON_OBJECT = [];
            check(JSON_OBJECT);

            $('[setting-btn]').prop("disabled", false);
        },
        error: function (data) {
            $('[setting-btn]').prop("disabled", false);
        }
    });
}