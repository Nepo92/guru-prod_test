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
        resetFilter(FILTER_FROM_BACK);
    });

    $filterFormBtn.on('click', function(event) {
        event.preventDefault();
        $filterForm.trigger('submit');
    });
});

//список фильтр
var FILTER_FROM_BACK;
function setDashboardFilter(filter) {
    FILTER_FROM_BACK = filter;
}

function resetFilter(filter) {
    $('#idManager option:selected').removeAttr('selected');
    $('#idManager').val(filter.idManager);

    $('#course option:selected').removeAttr('selected');
    $('#course').val(filter.projectId);

    $('#startPeriod').val(filter.startPeriod);
    $('#endPeriod').val(filter.endPeriod);
    $('#payDate').val(filter.payDate);
    $('#dealDate').val(filter.dealDate);
    $('#client').val(filter.client);
    $('#link').val(filter.link);
    $('#number').val(filter.number);
    $('#sum').val(filter.sum);
}

$(document).on('change', '[filter-parameter]', function() {
    $(this).closest('form').trigger('submit');
});;