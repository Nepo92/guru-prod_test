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


    const $searchClient = $('[search-client]');
    const $searchClientForm = $('[search-client-form]');
    const $searchClientBtn = $('[search-client-btn]');
    const $searchClientClear = $('[search-client-clear]');

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


var $filterFromBack;
function setFilter(filter) {
    $filterFromBack = filter;
}