$(document).on('click', '[save-homework]', function (event) {
    event.preventDefault();
    $('[save-homework-form]').trigger('submit');
});

$(document).on('submit', '[save-homework-form]', function (event) {
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[save-homework-form]')[0]);
        setFilesToFormData(formData);
        saveHomework(formData);
    }
});

function saveHomework(formData) {
    $('[save-homework]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "saveHomework",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $('[save-homework]').prop("disabled", false);
            $('  <div class="content-element">\n' +
                '                        <div class="content-element__wrapper">\n' +
                '                            <div class="homework-accepted">\n' +
                '                                <div class="homework-accepted__content">\n' +
                '                                    Спасибо! Ваше домашнее задание принято на проверку, ответ получите в скором времени!\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>').insertAfter($('[save-homework-form]'));
            $('[js-hide-on-complete]').remove();
        },
        error: function (data) {
            $('[save-homework]').prop("disabled", false);
        }
    });
}
