$(document).on('change', '[js-action-form-action-type]', function(event){

    const $rank = $('[js-action-rank]');
    const $unrank = $('[js-action-unrank]');
    const $indiv = $('[js-action-indiv]');

    if ($(this).val() == 1) {
        $rank.css('display', 'none');
        $indiv.css('display', 'none');
        $unrank.css('display', 'flex');

        $('input[js-bonus]').val(null);
        $('input[js-mech]').val(null);
        $('input[js-place]').val(null);
        $('input[js-min]').val(null);
    } else if($(this).val() == 2){
        $unrank.css('display', 'none');
        $indiv.css('display', 'none');
        $rank.css('display', 'flex');

        $('input[js-bonus]').val('0');
        $('input[js-mech]').val(0);
        $('input[js-place]').val(null);
        $('input[js-min]').val(null);
    } else if($(this).val() == 3){
        $rank.css('display', 'none');
        $unrank.css('display', 'none');
        $indiv.css('display', 'flex');

        $('input[js-bonus]').val(null);
        $('input[js-mech]').val(null);
        $('input[js-place]').val(null);
        $('input[js-min]').val(null);
    }
});
$(document).on('click', '[js-action-form-mech]', function(event) {
    const $value = $('[js-action-form-value]');
    const $minimum = $('[js-action-form-minimum]');
    var $checked = $(this).children().first().val();
    if($checked == 2) {
        $value.parent().removeClassWild("menu-input__wrapper_*").addClass("menu-input__wrapper_count");
        $minimum.parent().removeClassWild("menu-input__wrapper_*").addClass("menu-input__wrapper_count");
    } else {
        $value.parent().removeClassWild("menu-input__wrapper_*").addClass("menu-input__wrapper_sum");
        $minimum.parent().removeClassWild("menu-input__wrapper_*").addClass("menu-input__wrapper_sum");
    }
});
$(document).on('change', '[js-action-form-bonus-type]', function(event) {
    const $bonus = $('[js-bonus]');
    const $place = $('[js-place]');

    if($(this).val() == 1) {
        $bonus.parent().removeClassWild("menu-input__wrapper_*").addClass("menu-input__wrapper_sum");
        $place.parent().removeClassWild("menu-input__wrapper_*").addClass("menu-input__wrapper_sum");
    } else {
        $bonus.parent().removeClassWild("menu-input__wrapper_*");
        $place.parent().removeClassWild("menu-input__wrapper_*");
    }
});

$(document).ready(function(){
    const $createActionBtn = $('[js-create-action]');
    const $menuCreateAction = $('[js-menu-create-action]');
    const $menuCreateActionCloseBtn = $('[js-menu-create-action-close-btn]');

    $createActionBtn.on('click', function() {
        $menuCreateAction.addClass('is-open');
        checkBodyHidden()
    });

    $menuCreateActionCloseBtn.on('click', function() {
        $menuCreateAction.removeClass('is-open');
        resetForm();
        checkBodyHidden()
    });

    const $saveAction = $('[js-save-action]');
    const $actionForm = $('[js-action-form]');

    $saveAction.on('click', function() {
        event.preventDefault();
        $actionForm.trigger('submit');
    });

    $actionForm.submit(function (event) {
        event.preventDefault();
        if (validateForm(this)) {
            var form = $('#actionForm')[0];
            var actionData = new FormData(form);
            if (actionData.get('actionType') === "3") {
                addLevelValues(actionData);
            }
            saveAction(actionData);
        }
    });

    initDatePickerStart();
    initDatePickerCs();

    initActionManagersTypeSelector();

    initDeleteLevel();
    initAddLevel();
})

function addLevelValues(actionData) {
    let counter = 0;
    for (let i = 1; i <= DEFAULT_LEVEL_COUNT; i++) {
        var data = $('div[data-level="' + i + '"]');
        actionData.append('levels[' + counter +'].level', data.attr('data-level'));
        actionData.append('levels[' + counter +'].value', data.find('[js-action-form-value]').val());
        actionData.append('levels[' + counter +'].bonus', data.find('[js-action-form-bonus]').val());

        counter++;
    }
}

function initDatePickerStart() {
    $('.datepicker-here-start').datepicker({
        autoClose: true,
        minDate: new Date()
    });
}
function initDatePickerCs() {
    $('.datepicker-here-cs').datepicker({
        autoClose: true
    });
}
var DEFAULT_LEVEL_COUNT = 1;
function initDeleteLevel() {
    $('[js-delete-level]').on('click', function() {
        if (DEFAULT_LEVEL_COUNT > 1) {
            $('div[data-level="' + DEFAULT_LEVEL_COUNT + '"]').remove();
            DEFAULT_LEVEL_COUNT -= 1;
        }
    });
}
function initAddLevel() {
    $('[js-add-level]').on('click', function() {
        var lastLevelBlock = $('div[data-level="' + DEFAULT_LEVEL_COUNT + '"]');
        var bonusType = $('[js-action-form-bonus-type]').val();
        DEFAULT_LEVEL_COUNT += 1;
        lastLevelBlock.after(
            '<div js-action-indiv data-level="' + DEFAULT_LEVEL_COUNT + '" class="menu-input__wrapper menu-input__wrapper_row menu-input__wrapper_margin">' +
            '                        <div class="menu-input menu-input_m menu-input_full">' +
            '                            <div class="menu-input__title">Значение ур.' + DEFAULT_LEVEL_COUNT + ' *</div>' +
            '                            <div class="menu-input__wrapper menu-input__wrapper_sum">' +
            '                                <input js-mech js-action-form-value name="value' + DEFAULT_LEVEL_COUNT + '" class="menu-input__input menu-input__input_small" placeholder="Введите значение" required/>' +
            '                            </div>' +
            '                        </div>' +
            '                        <div class="menu-input menu-input_m  menu-input_full">' +
            '                            <div class="menu-input__title">Награда ур.' + DEFAULT_LEVEL_COUNT + ' *</div>' +
            '                            <div class="menu-input__wrapper ' + (bonusType == 1 ? 'menu-input__wrapper_sum' : '') + '">' +
            '                                <input js-bonus js-action-form-bonus name="bonus' + DEFAULT_LEVEL_COUNT + '" class="menu-input__input menu-input__input_small" placeholder="Введите награду" required/>' +
            '                            </div>' +
            '                        </div>' +
            '                    </div>'
        );
    });
}

function initActionManagersTypeSelector() {
    $('input[name=managers]').prop("checked", true);

    const $actionManagerType = $('[js-action-form-manager-type]');
    const $managers = $('[js-managers-row]');

    $actionManagerType.on('change', function () {
        if ($actionManagerType.val() == 1) {
            $managers.css('display','none');
            $('input[name=managers]').prop("checked", true);
        } else if($actionManagerType.val() == 2) {
            $managers.css('display','flex');
            $('input[name=managers]').prop("checked", false);
        }
    })
}

function resetForm() {
    $('[js-action-form]').trigger('reset');

    $('.js-labelFile').removeClass('has-file');
    $('.js-fileName').html('Загрузите изображение акции 420х340');

    $('[js-managers-row]').removeAttr('style');
    $('input[name=managers]').prop("checked", true);

    $('[js-action-unrank]').removeAttr('style');
    $('[js-action-rank]').removeAttr('style');
    $('[js-action-indiv]').removeAttr('style');

    $('[js-bonus]').parent().removeClassWild("menu-input__wrapper_*").addClass("menu-input__wrapper_sum");
    $('[js-place]').parent().removeClassWild("menu-input__wrapper_*").addClass("menu-input__wrapper_sum");

    $('[js-action-form-value]').parent().removeClassWild("menu-input__wrapper_*").addClass("menu-input__wrapper_sum");
   $('[js-action-form-minimum]').parent().removeClassWild("menu-input__wrapper_*").addClass("menu-input__wrapper_sum");
}

function validateForm(form) {

    $(form).validate({
        onkeyup: false,
        onfocusout: false,
        errorPlacement: function(label, element) {
            label.addClass('error-wrapper');
            label.insertAfter(element.parent().last());
        },
        wrapper: 'span'
    });
    $(form).rules('add', {
        messages: {
            required: 'Заполните это поле.',
        }
    });

    return $(form).valid();
}

function saveAction(actionData) {
    $('[js-save-action]').prop("disabled", true);
    $.ajax({
        type: "POST",
        enctype: "multipart/form-data",
        url: "saveAction",
        data: actionData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $('[js-menu-create-action]').removeClass('is-open');
            checkBodyHidden();
            resetForm();
            $('[js-save-action]').prop("disabled", false);
            location.reload();
        },
        error: function (data) {
            $('[js-save-action]').prop("disabled", false);
        }
    });
}


var DEFAULT_PLACE_COUNT = 1;
$(document).on('click', '[js-delete-place]', function(event) {
    if (DEFAULT_PLACE_COUNT > 1) {
        $('div[data-place="' + DEFAULT_PLACE_COUNT + '"]').remove();
        DEFAULT_PLACE_COUNT -= 1;
    }
});
$(document).on('click', '[js-add-place]', function(event) {
    var lastAddBlock = $('div[data-place="' + DEFAULT_PLACE_COUNT + '"]');
    var bonusType = $('[js-action-form-bonus-type]').val();
    if (DEFAULT_PLACE_COUNT < 3) {
        DEFAULT_PLACE_COUNT += 1;
        lastAddBlock.after(
            ' <div js-action-rank data-place="' + DEFAULT_PLACE_COUNT + '" class="menu-input__wrapper menu-input__wrapper_row menu-input__wrapper_margin">' +
            '   <div class="menu-input menu-input_m  menu-input_full">' +
            '       <div class="menu-input__title">' + DEFAULT_PLACE_COUNT + ' место *</div>' +
            '           <div class="menu-input__wrapper ' + (bonusType == 1 ? 'menu-input__wrapper_sum' : '') + '">' +
            '                <input js-place name="places" class="menu-input__input menu-input__input_small" placeholder="Введите награду" required/>' +
            '           </div>' +
            '       </div>' +
            '   </div>'
        );
    }
});