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
});

//список фильтр
var FILTER_FROM_BACK;
function setFilter(filter) {
    FILTER_FROM_BACK = filter;
}

function resetFilter(filter) {
    $('#idManager option:selected').removeAttr('selected');
    $('#idManager').val(filter.idManager);

    $('#scoreType option:selected').removeAttr('selected');
    $('#scoreType').val(filter.scoreType);

    $('#idRateStatus option:selected').removeAttr('selected');
    $('#idRateStatus').val(filter.idRateStatus);

    $('#rateDateFrom').val(filter.rateDateFrom);
    $('#rateDateTo').val(filter.rateDateTo);
    $('#rateDateFrom').val(filter.rateDateFrom);
    $('#rateDateTo').val(filter.rateDateTo);
}

$(document).on('change', '[filter-parameter]', function() {
    $(this).closest('form').trigger('submit');
});

$(document).on('change', '[tr-templates]', function() {
    $('[tr-template-items]').html('<option value="0" selected>Все пункты</option>');

    var currValue = $('option:selected', this).attr('value');
    if (currValue != 0) {
        var formData = new FormData();
        formData.append("id", currValue);
        setTemplateItemsByTemplate(formData);
    }

});
function setTemplateItemsByTemplate(formData) {
    $('[tr-templates]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getTemplateItems",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            var currentOptions = $('[tr-template-items]').html();
            var seloption = "";
            $.each(data, function(index, value){
                seloption += '<option value="' + value.id + '">' + value.name + '</option>';
            });

            $('[tr-template-items]').html(currentOptions + seloption);

            $('[tr-templates]').prop("disabled", false);
        },
        error: function (data) {
            $('[tr-templates]').prop("disabled", false);
        }
    });
}