$(document).on('click', '[js-update-line-color]', function(event){
    setLineColors();
});
$(document).on('click', '[js-menu-line-color-close-btn]', function(event){
    closeLineColorMenu();
});

function setLineColors() {
    $.ajax({
        type: "POST",
        url: "getLineColors",
        data: null,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            var lineColors = $('[line-colors]');

            var list = "";
            $.each(data, function(index, value){
                list += '<div class="menu-input menu-input_xsmall menu-input_t30 menu-input_b0">' +
                    '                            <div class="menu-input__title">' + value.name + '</div>' +
                    '                           <input type="hidden" name="lineColors[' + index + '].id" value="' + value.id + '" required>' +
                    '                        </div>' +
                    '                        <div class="menu-input__wrapper menu-input__wrapper_row menu-input__wrapper_margin">' +
                    '                            <div class="menu-input menu-input_m menu-input_full">' +
                    '                                <div class="menu-input__title">Зеленый</div>' +
                    '                                <div class="menu-input__wrapper ">' +
                    '                                    <input name="lineColors[' + index + '].green" value="' + value.green + '" class="menu-input__input menu-input__input_small" placeholder="Введите значение" required>' +
                    '                                </div>' +
                    '                            </div>' +
                    '                            <div class="menu-input menu-input_m menu-input_full">' +
                    '                                <div class="menu-input__title">Желтый</div>' +
                    '                                <div class="menu-input__wrapper ">' +
                    '                                    <input name="lineColors[' + index + '].yellow" value="' + value.yellow + '"class="menu-input__input menu-input__input_small" placeholder="Введите значение" required>' +
                    '                                </div>' +
                    '                            </div>' +
                    '                            <div class="menu-input menu-input_m  menu-input_full">' +
                    '                                <div class="menu-input__title">Красный</div>' +
                    '                                <div class="menu-input__wrapper ">' +
                    '                                    <input name="lineColors[' + index + '].red" value="' + value.red + '" class="menu-input__input menu-input__input_small" placeholder="Введите значение" required>' +
                    '                                </div>' +
                    '                            </div>' +
                    '                        </div>';
            });

            lineColors.html(list);
            $('[js-menu-line-color]').addClass('is-open');
            checkBodyHidden();
        },
        error: function (data) {

        }
    });
}
$(document).on('click', '[js-save-line-color]', function(event){
    event.preventDefault();
    $('[js-line-color-form]').trigger('submit');
});
$(document).on('submit', '[js-line-color-form]', function(event){
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[js-line-color-form]')[0]);
        saveLineColors(formData);
    }
});
function saveLineColors(formData) {
    $.ajax({
        type: "POST",
        url: "updateLineColors",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            closeLineColorMenu();
        },
        error: function (data) {

        }
    });
}

function closeLineColorMenu() {
    $('[line-colors]').html();
    $('[js-line-color-form]').trigger('reset');

    $('[js-menu-line-color]').removeClass('is-open');
    checkBodyHidden();
}