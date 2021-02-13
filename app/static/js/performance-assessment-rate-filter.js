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

    $('.datepicker-here-f').datepicker({
        autoClose: true
    });


    $searchDeal = $('[search-deal]');
    $searchDealForm = $('[search-deal-form]');
    $searchDealBtn = $('[search-deal-btn]');
    $searchDealClear = $('[search-deal-clear]');

    $searchDeal.on('keyup', function () {
        $searchDealClear.removeClass('is-open');
        $searchDealBtn.addClass('is-open');
        $(this).addClass('active');
    });

    $searchDealBtn.on('click', function (event) {
        event.preventDefault();
        $searchDealForm.trigger('submit');
    });

    $searchDealClear.on('click', function (event) {
        event.preventDefault();
        $searchDeal.val('');
        $searchDealForm.trigger('submit');
    });
});

//список фильтр
var FILTER_FROM_BACK;
function setDashboardFilter(filter) {
    FILTER_FROM_BACK = filter;
}

function resetFilter(filter) {
    $('#createDateFrom').val(filter.createDateFrom);
    $('#createDateTo').val(filter.createDateTo);
}