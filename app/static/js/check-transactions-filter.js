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
});

//список фильтр
var $filterFromBack;
function setFilter(filter) {
    $filterFromBack = filter;
}

function resetFilter(filter) {
    $('#idManager option:selected').removeAttr('selected');
    $('#idManager').val(filter.idManager);

    $('#course option:selected').removeAttr('selected');
    $('#course').val(filter.course);

    $('#status option:selected').removeAttr('selected');
    $('#status').val(filter.status);

    $('#paymentMethod option:selected').removeAttr('selected');
    $('#paymentMethod').val(filter.paymentMethod);

    $('#paidFrom').val(filter.paidFrom);
    $('#paidTo').val(filter.paidTo);

    $('#payDateFrom').val(filter.payDateFrom);
    $('#payDateTo').val(filter.payDateTo);

    $('#client').val(filter.client);
    $('#accountNumber').val(filter.accountNumber);
    $('#transactionNumber').val(filter.transactionNumber);

    $('input:checkbox[name="empties"]').prop("checked", false).attr("checked", false).removeAttr("checked");
    $.each(filter.statuses, function(index, value) {
        $('input:checkbox[name="empties"]').filter('[value="' + value + '"]').attr('checked', true).prop("checked", true);
    });
}

