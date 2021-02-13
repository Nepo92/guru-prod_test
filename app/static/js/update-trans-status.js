$(document).ready(function(){
    const $statusForm = $('[js-status-form]')
    const $statusSelector = $statusForm.find('[js-status]')

    $statusSelector.on('change', function () {
        $(this).parent().parent().trigger('submit')
    });

    initFancy();
});
function initFancy() {
    $('[data-fancybox]').fancybox({
        infobar: false,
        buttons: [
            "close"
        ],
    });
}