$(document).on('change', '[js-report-file]', function(event){
    var fileName = '';

    if (event.target.value) {
        fileName = event.target.value.split('\\').pop();
    }

    if (fileName) {
        $(this).closest('form').trigger('submit');
    }
});

$(document).on('submit', '[js-report-form]', function(event){
    event.preventDefault();
    if (validateForm(this)) {
        processReport(new FormData($('[js-report-form]')[0]));
    }
});

function processReport (requestData) {
    $('[js-report-file]').prop("disabled", true);
    $.ajax({
        type: "POST",
        enctype: "multipart/form-data",
        url: "processReport",
        data: requestData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $('[dialog]').find('.dialog__title').html('Результат обработки отчета');
            $('[dialog]').find('.dialog__text').html(
                '<div>Прочитано строк из отчета: ' + data.reportRowCount + '</div>' +
                '<div>Найдено совпадений в базе: ' + data.dataBaseRowCount + '</div>' +
                '<div>Было обновлено в базе: ' + data.processedRowCount + '</div>'
            );
            $('[dialog]').addClass('is-open');

            $('[js-report-file]').prop("disabled", false);
            hideLoader();
        },
        error: function (data) {
            $('[js-report-file]').prop("disabled", false);
            hideLoader();
        },
        beforeSend: function() {
            showLoader();
        }
    });
    
}

$(document).on('click', '[close-dialog]', function(event) {
    location.reload();
});

