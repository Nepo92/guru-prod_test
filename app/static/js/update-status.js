$(document).ready(function(){
    const $statusForm = $('[js-action-status-form]')
    const $statusSelector = $statusForm.find('[js-action-status]')

    $statusSelector.on('change', function () {
        $(this).parent().trigger('submit')
    })
});