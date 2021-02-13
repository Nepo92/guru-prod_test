$(document).ready(function(){
    const $filterForm = $('[tr-filter-form]');
    const $filterFormBtn = $('[tr-filter-form-btn]');
    const $filter = $('[tr-filter]');
    const $filterOpenBtn = $('[tr-filter-btn]');
    const $filterCloseBtn = $('[tr-filter-close-btn]');

    $filterOpenBtn.on('click', function() {
        $('body').addClass('hiddenOverflow');
        $filter.addClass('is-open');
    });

    $filterCloseBtn.on('click', function() {
        $('body').removeClass('hiddenOverflow');
        $filter.removeClass('is-open');
        resetFilter($filterFromBack);
    });

    $filterFormBtn.on('click', function(event) {
        event.preventDefault();
        $filterForm.trigger('submit');
    });

    $('.datepicker-here-f').datepicker({
        autoClose: true
    });

    downloadDealsExcel();



    $searchClient = $('[search-client]');
    $searchClientForm = $('[search-client-form]');
    $searchClientBtn = $('[search-client-btn]');
    $searchClientClear = $('[search-client-clear]');

    $searchClient.on('keyup', function () {
        $searchClientClear.removeClass('is-open');
        $searchClientBtn.addClass('is-open');
        $(this).addClass('active');
    });

    $searchClientBtn.on('click', function (event) {
        event.preventDefault();
        $searchClientForm.trigger('submit');
    });

    $searchClientClear.on('click', function (event) {
        event.preventDefault();
        $searchClient.val('');
        $searchClientForm.trigger('submit');
    });
});

//список фильтр
var $filterFromBack;
function setFilter(filter) {
    $filterFromBack = filter;
}

function resetFilter(filter) {
    $('#idManager option:selected').removeAttr('selected');
    $('#idManager').val(filter.idManager);

    $('#idSocial option:selected').removeAttr('selected');
    $('#idSocial').val(filter.idSocial);

    $('#projectId option:selected').removeAttr('selected');
    $('#projectId').val(filter.projectId);

    $('#product option:selected').removeAttr('selected');
    $('#product').val(filter.product);

    setKindToFilter($('[filter-courses]'));
    selectKind($filterFromBack.kind);

    $('#saleType option:selected').removeAttr('selected');
    $('#saleType').val(filter.saleType);

    $('#paymentMethod option:selected').removeAttr('selected');
    $('#paymentMethod').val(filter.paymentMethod);

    $('input:radio[name="trial"]').prop("checked", false).attr("checked", false).removeAttr("checked");
    $('input:radio[name="trial"]').filter('[value="' + filter.trial + '"]').attr('checked', true).prop("checked", true);

    $('input:radio[name="mailing"]').prop("checked", false).attr("checked", false).removeAttr("checked");
    $('input:radio[name="mailing"]').filter('[value="' + filter.mailing + '"]').attr('checked', true).prop("checked", true);

    $('#tag').val(filter.tag);
    $('#comment').val(filter.comment);

    $('#createDateFrom').val(filter.createDateFrom);
    $('#createDateTo').val(filter.createDateTo);
    $('#startDateFrom').val(filter.startDateFrom);
    $('#startDateTo').val(filter.startDateTo);

    $('#dealDateFrom').val(filter.dealDateFrom);
    $('#dealDateTo').val(filter.dealDateTo);
    $('#payDateFrom').val(filter.payDateFrom);
    $('#payDateTo').val(filter.payDateTo);
    $('#reminderDateFrom').val(filter.reminderDateFrom);
    $('#reminderDateTo').val(filter.reminderDateTo);

    $('#priceFrom').val(filter.priceFrom);
    $('#priceTo').val(filter.priceTo);
    $('#paidFrom').val(filter.paidFrom);
    $('#paidTo').val(filter.paidTo);

    $('input:checkbox[name="other"]').prop("checked", false).attr("checked", false).removeAttr("checked");
    $.each(filter.other, function(index, value) {
        $('input:checkbox[name="other"]').filter('[value="' + value + '"]').attr('checked', true).prop("checked", true);
    });

    $('input:checkbox[name="statuses"]').prop("checked", false).attr("checked", false).removeAttr("checked");
    $.each(filter.statuses, function(index, value) {
        $('input:checkbox[name="statuses"]').filter('[value="' + value + '"]').attr('checked', true).prop("checked", true);
    });

    $('input:checkbox[name="empties"]').prop("checked", false).attr("checked", false).removeAttr("checked");
    $.each(filter.statuses, function(index, value) {
        $('input:checkbox[name="empties"]').filter('[value="' + value + '"]').attr('checked', true).prop("checked", true);
    });
}

//скачивание файла
function downloadDealsExcel() {
    $('[js-download-deals-excel]').on('click', function () {
        $('[js-download-deals-excel]').prop("disabled", true);
        $.ajax({
            type: "POST",
            contentType: "text/html",
            url: "download/deals.xslx",
            data: '',
            dataType: 'json',
            cache: false,
            success: function (data) {
                $('[js-download-deals-excel]').prop("disabled", false);
            },
            error: function (data) {
                $('[js-download-deals-excel]').prop("disabled", false);
            }
        });
    })
}
