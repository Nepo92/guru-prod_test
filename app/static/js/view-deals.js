$(document).on('click', '[js-view-deal-btn]', function(event) {
    event.preventDefault();
    $(this).closest('[js-view-deal-form]').trigger('submit');
});

$(document).on('submit', '[js-view-deal-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var formData = $(this).serializeObject();
        getViewDealInfo(formData);
    }
});

$(document).on('click', '[js-menu-view-deal-close-btn]', function(event){
    $('[js-menu-view-deal]').removeClass('is-open');
    checkBodyHidden();
});
function getViewDealInfo(data) {
    $('[js-view-deal-btn]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/deals/getViewDeal",
        data: JSON.stringify(data),
        dataType: 'json',
        cache: false,
        success: function (data) {
            setViewDealInfo(data);
            $('[js-view-deal-btn]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-view-deal-btn]').prop("disabled", false);
        }
    });
}

function setViewDealInfo(data) {
    resetViewDealMenu();
    $('[d-view-status]').html(data.statusName);
    $('[d-view-social]').html(data.socialName);
    $('[d-view-deal-date]').html(data.dealDate);
    $('[d-view-product]').html(data.product);
    $('[d-view-course]').html(data.course);
    $('[d-view-type]').html(data.type);
    $('[d-view-price]').html(data.price);
    $('[d-view-tag]').html(data.tag);
    $('[d-view-comment]').html(data.comment);

    if (data.type === 'Трафик') {
        $('[view-deal-mailing-block]').addClass('is-open');
        $('[d-view-mailing]').prop("checked", data.isMailing);

    }

    if (data.kind !== null) {
        $('[view-deal-kind-block]').addClass('is-open');
        $('[d-view-kind]').prop("checked", data.kind);

    }

    if (data.idSaleType === 2) {
        $('[view-deal-start-date-block]').addClass('is-open');
        $('[d-view-start-date]').html(data.startDate);

        $('[view-deal-trial-block]').addClass('is-open');
        $('[d-view-mailing]').prop("checked", data.trial);
    }

    $('[js-menu-view-deal]').addClass('is-open');
    checkBodyHidden();
}
function resetViewDealMenu() {
    $('[d-view-status]').html('');
    $('[d-view-social]').html('');
    $('[d-view-deal-date]').html('');
    $('[d-view-product]').html('');
    $('[d-view-course]').html('');
    $('[d-view-type]').html('');
    $('[d-view-price]').html('');
    $('[d-view-tag]').html('');
    $('[d-view-comment]').html('');

    $('[view-deal-mailing-block]').removeClass('is-open');
    $('[d-view-mailing]').prop("checked", false);

    $('[view-deal-kind-block]').removeClass('is-open');
    $('[d-view-kind]').prop("checked", false);

    $('[view-deal-start-date-block]').removeClass('is-open');
    $('[d-view-start-date]').html('');

    $('[view-deal-trial-block]').removeClass('is-open');
    $('[d-view-mailing]').prop("checked", false);
}