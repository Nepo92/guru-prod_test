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
    $('#proceedType option:selected').removeAttr('selected');
    $('#proceedType').val(filter.proceedType);

    $('#projectId option:selected').removeAttr('selected');
    $('#projectId').val(filter.projectId);
}

$(document).on('change', '[filter-parameter]', function() {
    $(this).closest('form').trigger('submit');
});

$(document).on('click', '[js-menu-update-background-close-btn]', function() {
    $('[js-menu-update-background]').removeClass('is-open');
    $('[default-background-color]').prop("checked", false).attr("checked", false).removeAttr("checked");
    checkBodyHidden();
});
$(document).on('click', '[js-save-background]', function() {
    event.preventDefault();
    $('[js-update-background-form]').trigger('submit');
});

$(document).on('submit', '[js-update-background-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var jsonData = $(this).serializeObject();
        //
        // var jsonItem = {};
        // jsonItem['color'] = $(this).find('[background-color]').val();
        // jsonItem['idCompany'] = Number($(this).find('[name="idCompany"]').val());

        updateBackground(jsonData);
    }
});
function updateBackground(jsonData) {
    $('[js-save-background]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "updateCompanyBgColor",
        data: JSON.stringify(jsonData),
        dataType: 'json',
        cache: false,
        success: function (data) {

            if ($('[default-background-color]').prop("checked")) {
                $('body').css("background-color", $('[default-background-color]').val());
            } else {
                $('body').css("background-color", jsonData['color']);
            }


            $('[js-menu-update-background]').removeClass('is-open');
            $('[default-background-color]').prop("checked", false).attr("checked", false).removeAttr("checked");
            checkBodyHidden();
            $('[js-save-background]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-background]').prop("disabled", false);
        }
    });
};

$(document).on('click', '[js-update-background]', function() {

    var jsonItem = {};
    jsonItem['id'] = $(this).find('[name="idCompany"]').val();

    $('[js-update-background]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "getCompanyBgColor",
        data: JSON.stringify(jsonItem),
        dataType: 'json',
        cache: false,
        success: function (data) {
            openUpdateBackgroundMenu(data);
            $('[js-update-background]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-update-background]').prop("disabled", false);
        }
    });
});

function openUpdateBackgroundMenu(data) {
    $('[background-color]').val(data.color);
    $('[js-menu-update-background]').addClass('is-open');
    checkBodyHidden();
}

$(document).on('mouseenter', '.c-tooltip.tile__tooltip', function(event) {
    var topOffset = -10;
    var content = $(this).find('.tooltip-content').html();
    var tooltip = $('.c-tooltip__wrapper_right.tooltip-wrapper');

    if (typeof content !== "undefined" && content !== '') {
        var rect = $(this)[0].getBoundingClientRect();
        tooltip.css({top: $(window).scrollTop() + rect.top + topOffset, left: (rect.left - tooltip.width())});
        tooltip.html(content);
        tooltip.addClass('show');
    }
});
$(document).on('mouseleave', '.c-tooltip.tile__tooltip', function(event) {
    var tooltip = $('.c-tooltip__wrapper_right.tooltip-wrapper');
    tooltip.html('');
    tooltip.removeClass('show');
});

$(document).on('mouseenter', '.c-tooltip.action-info_prize', function(event) {
    var topOffset = -10;
    var content = $(this).find('.tooltip-content').html();
    var tooltip = $('.c-tooltip__wrapper_maxwidth.tooltip-wrapper');

    if (typeof content !== "undefined" && content !== '') {
        var rect = $(this)[0].getBoundingClientRect();
        tooltip.css({top: $(window).scrollTop() + rect.top + topOffset, left: rect.left + (rect.width/2)});
        tooltip.html(content);
        tooltip.addClass('show');
    }
});
$(document).on('mouseleave', '.c-tooltip.action-info_prize', function(event) {
    var tooltip = $('.c-tooltip__wrapper_maxwidth.tooltip-wrapper');
    tooltip.html('');
    tooltip.removeClass('show');
});