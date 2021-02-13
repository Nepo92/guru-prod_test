$(document).on('click', '[js-edit-btn]', function(event) {
    $('[js-client-card-name]').removeAttr('disabled');
    $('[js-client-card-link]').removeAttr('disabled');
    $('[js-client-card-link]').closest('.menu-input').find('.menu-input__title').html('Ссылка ВК **');
    $('[js-client-card-phone]').removeAttr('disabled');
    $('[js-client-card-phone]').closest('.menu-input').find('.menu-input__title').html('Номер телефона **');
    $('[js-client-card-email]').removeAttr('disabled');
    $('[js-client-card-email]').closest('.menu-input').find('.menu-input__title').html('Email **');

    $('[check-required="edit-client-info"]').trigger('change');

    $('[js-client-card-desc]').addClass('is-open');
    $('[js-edit-footer]').addClass('is-open');
});

function closeEdit() {
    $('[js-client-card-name]').attr("disabled", true);
    $('[js-client-card-link]').attr("disabled", true);
    $('[js-client-card-link]').closest('.menu-input').find('.menu-input__title').html('Ссылка ВК');
    $('[js-client-card-phone]').attr("disabled", true);
    $('[js-client-card-phone]').closest('.menu-input').find('.menu-input__title').html('Номер телефона');
    $('[js-client-card-email]').attr("disabled", true);
    $('[js-client-card-email]').closest('.menu-input').find('.menu-input__title').html('Email');
    $('[js-client-card-desc]').removeClass('is-open');
    $('[js-edit-footer]').removeClass('is-open');
}

//кнопка редактирования клиента
$(document).on('click', '[js-edit-client-btn]', function(event) {
    event.preventDefault();
    $(this).closest('[js-edit-client-form]').trigger('submit');
});
//form'a редактирование клиента
$(document).on('submit', '[js-edit-client-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var formData = $(this).serializeObject();
        updateClient(formData);
    }
});
function updateClient(formData) {
    $('[js-update-deal]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/clients/updateClient",
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            closeEdit();
            updateClientNameOnFront(data);
            updateClientLinkOnFront(data);
            updateClientPhoneOnFront(data);
            updateClientNameOnList(data);
            $('[js-update-deal]').prop("disabled", false);
            $('[js-client-name-copy]').text(data.name);
            $('[js-client-name-copy]').attr('data-link', data.name);
        },
        error: function (data) {
            $('[js-update-deal]').prop("disabled", false);
        }
    });
}
function updateClientNameOnFront(value) {
    var clientRow = $('[data-client="' + value.id + '"]');
    clientRow.siblings('span').html(value.name);
}
function updateClientLinkOnFront(value) {
    var clientCell = $('[data-link-client="' + value.id + '"]');
    if (value.link === null || value.link === '') {
        clientCell.html('<div>—</div>');
    } else {
        clientCell.html('<div class="column-links">' +
            '<div js-copy-link class="column_mwidth column_mwidth-copy" data-link="' + value.link + '"></div>' +
            '<a href="' + value.link + '" target="_blank" class="column_mwidth column_mwidth-open"></a>' +
            '</div>');
    }
}
function updateClientPhoneOnFront(value) {
    var clientCell = $('[data-phone-client="' + value.id + '"]');
    if (value.phone === null || value.phone === '') {
        clientCell.html('');
    } else {
        clientCell.html('<div js-copy-link class="client-phone" data-link="' + value.phone + '">' + value.phone + '</div>');
    }
}

function updateClientNameOnList(value) {
    var clientCard = $('[value="' + value.id + '"].js-client-id-l');
    var card = clientCard.closest('[js-client-card]');
    card.find('.client-card__title').html(value.name);
    card.find('.client-card__info-link').html(value.link);
    card.find('.client-card__info-phone').html(value.phone);
}