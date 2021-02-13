$(document).on('change paste keyup', '[js-menu-search-input]', function(event) {
    $('[js-create-client]').attr('disabled', 'disabled');
});

$(document).on('change paste keyup', '[check-required]', function(event) {
    var requiredType = $(this).attr('check-required'),
        inputs = $('[check-required="' + requiredType + '"]'),
        isRequired = true;

    $.each(inputs, function(index, input) {
        if ($.trim(input.value) !== '') {
            isRequired = false
        }
    })

    if (isRequired) {
        $('[check-required="' + requiredType + '"]').attr('required', 'required');
    } else {
        $('[check-required="' + requiredType + '"]').removeAttr('required');
    }
});

var OLD_SELECTOR_VALUE = 0;
$(document).on('focusin', '[check-target-status]', function(event) {
    OLD_SELECTOR_VALUE = $('option:selected', this).val();
});

$(document).on('change', '[check-target-status]', function(event) {
    if ($('option:selected', this).val() == 1) {
        $(this).closest('form').find('[not-target]').removeClass('is-open').addClass('menu-input_close');
    } else if (OLD_SELECTOR_VALUE == 1) {
        $(this).closest('form').find('[not-target]').removeClass('menu-input_close').addClass('is-open');
        checkUpdateDealProductTypes();
    }
});

$(document).on('change', '[check-social]', function(event) {
    if ($('option:selected', this).val() == 2) {
        $(this).closest('form').find('[whatsap-required]').find('.menu-input__title').html('ID рекламной кампании / Смайлик + база *');
        $(this).closest('form').find('[whatsap-required]').find('input').attr('required', 'required');
    } else {
        $(this).closest('form').find('[whatsap-required]').find('.menu-input__title').html('ID рекламной кампании / Смайлик + база');
        $(this).closest('form').find('[whatsap-required]').find('input').removeAttr('required');
    }
});


function resetSearchClientMenu() {
    $('[js-menu-search-input]').val('');
    $('[js-create-client]').attr('disabled', 'disabled');
}

//кнопка открытия создания клиента
$(document).on('click', '[js-create-client]', function(event) {
    $('[js-create-client-form]').trigger('reset');

    var searchValue = $('[js-menu-search-input]').val();

    var emailPattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
    var phonePattern = /[^\d]/g;
    var vkPattern = "vk.com";

    if (emailPattern.test(searchValue)) {
        $('[js-create-client-email]').val(searchValue).trigger('change');
    } else if (searchValue.replace(phonePattern, '').length === 11) {
        $('[js-create-client-phone]').val(searchValue).trigger('change');
    } else if (searchValue.includes(vkPattern)) {
        $('[js-create-client-link]').val(searchValue).trigger('change');
    } else {
        $('[js-create-client-name]').val(searchValue);
    }

    $('[check-required="client-info"]').trigger('change');

    $('[js-menu-create-client]').addClass('is-open');
    checkBodyHidden();
});


function resetCreateDealForm() {
    $('[js-deal-form-kind-block]').removeClass('is-open');
    $('[js-deal-form-kind]').html('');
    $('[js-deal-form-mailing-block]').removeClass('is-open');
    $('[js-deal-form-mailing]').prop("checked", false);
    $('[js-deal-form-trial]').prop("checked", false);
    $('[product-block]').addClass('menu-input_close');
    $('[trial-block]').addClass('menu-input_close');
    $('[product-category-block]').addClass('menu-input_close');
    $('[js-deal-form-reminder-block]').removeClass('is-open');
    $('[js-deal-form-reminder-btn]').addClass('is-open');
    $('[js-deal-form-reminder]').prop("checked", false);
    $('[js-deal-form]').trigger('reset');

    $('[check-target-status]').val("1").trigger('change');

    checkCreateDealProductTypes();
}

function checkCreateDealProductTypes() {
    if ($('[product-types] option').length <= 2) {
        $('[product-types-block]').removeClass('is-open');

        var optionVal = $('[product-types] option:last').val();
        $('[product-types]').val(optionVal).trigger('change');
    } else {
        $('[product-types-block]').addClass('is-open');
    }
}


function setUpdateDealInfo(data) {
    $('#js-update-form-deal-status option:selected').removeAttr('selected');
    $('#js-update-form-deal-social option:selected').removeAttr('selected');
    $('#js-update-form-deal-pr option:selected').removeAttr('selected');
    $('#js-update-form-deal-pr option:first').prop('selected', true);
    $('#js-update-form-deal-sale-type option:selected').removeAttr('selected');
    $('#js-update-form-deal-sale-type option:first').prop('selected', true);
    $('#u-product-types option:selected').removeAttr('selected');
    $('#u-product-types option:first').prop('selected', true);
    $('#u-product-category option:selected').removeAttr('selected');
    $('#u-product-category option:first').prop('selected', true);

    $('[u-product-category-block]').addClass('menu-input_close');
    $('[u-product-block]').addClass('menu-input_close');
    $('[u-trial-block]').addClass('menu-input_close');
    $('[u-start-date-block]').addClass('menu-input_close');

    $('[js-update-form-kind-block]').removeClass('is-open');
    $('[js-update-form-kind]').html('');
    $('[js-update-form-deal-mailing]').prop("checked", false);
    $('[js-update-form-deal-reminder]').prop("checked", false);
    $('[js-update-form-deal-price]').val(0);

    $("#js-update-form-deal-status").val(data.status).trigger('change');
    $("#js-update-form-deal-social").val(data.social).trigger('change');
    $('[js-update-form-deal-deal-date]').val(data.dealDate);
    $('[js-update-form-deal-tag]').val(data.tag);
    $('[js-update-form-deal-comment]').val(data.comment);

    $('[js-update-form-deal-client]').val(data.idClient);
    $('[js-update-form-deal-manager]').val(data.idManager);
    $('[js-update-form-deal-id]').val(data.id);

    $("#js-update-form-deal-sale-type").val(data.type);

    if (data.type === 'traffic') {
        $('[js-update-form-deal-mailing-block]').addClass('is-open');
        if (data.isMailing) {
            $('[js-update-form-deal-mailing]').prop("checked", true);
        } else {
            $('[js-update-form-deal-mailing]').prop("checked", false);
        }
    } else {
        $('[js-update-form-deal-mailing-block]').removeClass('is-open');
        $('[js-update-form-deal-mailing]').prop('checked', false);
    }

    if (data.reminder) {
        $('[js-update-form-deal-reminder-block]').addClass('is-open');
        $('[js-update-form-deal-reminder-btn]').removeClass('is-open');
        $('[js-update-form-deal-reminder]').prop("checked", true);
        $('[js-update-form-deal-reminder-date]').val(data.reminderDate);
        $('[js-update-form-deal-reminder-msg]').val(data.reminderMessage);
    } else {
        $('[js-update-form-deal-reminder-block]').removeClass('is-open');
        $('[js-update-form-deal-reminder-btn]').addClass('is-open');
        $('[js-update-form-deal-reminder]').prop("checked", false);
        $('[js-update-form-deal-reminder-date]').val('');
        $('[js-update-form-deal-reminder-msg]').val('');
    }


    if (data.status !== 1) {

        if (data.idSaleType == 3) {
            createProductOptions($productMap[data.idProductCategory], 'js-update-form-deal-pr');
            $('[u-product-category-block]').removeClass('menu-input_close');
            $("#u-product-category").val(data.idProductCategory);
            $('[u-trial-block]').addClass('menu-input_close');
        } else {
            createProductOptions($coursesList, 'js-update-form-deal-pr');
            $('[u-start-date-block]').removeClass('menu-input_close');
            $('[js-update-form-deal-start-date]').html('<option value="' + data.idStream + '">' + data.startDate + '</option>');
            setUpdateStreams(data.idProduct);
            $('[u-trial-block]').removeClass('menu-input_close');
        }

        if ($('#u-product-types option').length > 2) {
            $('[u-product-types-block]').addClass('is-open');
        } else {
            $('[u-product-types-block]').removeClass('is-open');
        }
        $('#u-product-types [data-id="' + data.idSaleType +'"]').prop('selected', true);
        $('#js-update-form-deal-pr [data-id="' + data.idProduct +'"]').prop('selected', true);

        $('[u-product-block]').removeClass('menu-input_close');

        var list = createKindList(data.course);
        if (list.length > 0) {
            $('[js-update-form-kind]').html(createKindOptions(list));
            $('[js-update-form-kind]').val(data.kind);
            $('[js-update-form-kind-block]').addClass('is-open');
        }

        $('[js-update-form-deal-trial]').prop('checked', data.trial);
        $('[js-update-form-deal-price]').val(data.price);
        $('[js-deal-open-lessons]').prop('checked', data.allModulesHomeworkAllowed);

        $('[js-update-form-deal-product-type]').val(data.product);
        $('[js-update-form-deal-product-id]').val(data.idProduct);
    }

    $('[js-menu-update-deal]').addClass('is-open');

    checkBodyHidden();
}

function checkUpdateDealProductTypes() {
    if ($('#u-product-types option').length <= 2) {
        $('[u-product-types-block]').removeClass('is-open');

        var optionVal = $('#u-product-types option:last').val();
        $('#u-product-types').val(optionVal).trigger('change');
    } else {
        $('[u-product-types-block]').addClass('is-open');
    }
}
