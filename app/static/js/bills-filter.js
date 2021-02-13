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

    setKindToFilter($('[filter-courses]'));
    selectKind($filterFromBack.kind);
});

//список фильтр
var $filterFromBack;
function setFilter(filter) {
    $filterFromBack = filter;
}

function resetFilter(filter) {
    $('#idManager option:selected').removeAttr('selected');
    $('#idManager').val(filter.idManager);

    $('#product option:selected').removeAttr('selected');
    $('#product').val(filter.product);

    $('#projectId option:selected').removeAttr('selected');
    $('#projectId').val(filter.projectId);

    setKindToFilter($('[filter-courses]'));
    selectKind($filterFromBack.kind);

    $('#status option:selected').removeAttr('selected');
    $('#status').val(filter.status);

    $('#paymentMethod option:selected').removeAttr('selected');
    $('#paymentMethod').val(filter.paymentMethod);

    $('#paidFrom').val(filter.paidFrom);
    $('#paidTo').val(filter.paidTo);

    $('#startDateFrom').val(filter.startDateFrom);
    $('#startDateTo').val(filter.startDateTo);

    $('#client').val(filter.client);
    $('#accountNumber').val(filter.accountNumber);

    $('#dealDateFrom').val(filter.dealDateFrom);
    $('#dealDateTo').val(filter.dealDateTo);
    $('#payDateFrom').val(filter.payDateFrom);
    $('#payDateTo').val(filter.payDateTo);

    $('input:checkbox[name="empties"]').prop("checked", false).attr("checked", false).removeAttr("checked");
    $.each(filter.statuses, function(index, value) {
        $('input:checkbox[name="empties"]').filter('[value="' + value + '"]').attr('checked', true).prop("checked", true);
    });
}

