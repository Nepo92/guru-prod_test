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
function setFunnelFilter(filter) {
    FILTER_FROM_BACK = filter;
}

function resetFilter(filter) {
    $('#year option:selected').removeAttr('selected');
    $('#year').val(filter.year);

    $('#idManager option:selected').removeAttr('selected');
    $('#idManager').val(filter.idManager);

    $('#project option:selected').removeAttr('selected');
    $('#project').val(filter.project);

    $('#course option:selected').removeAttr('selected');
    $('#course').val(filter.course);

    $('#periodType option:selected').removeAttr('selected');
    $('#periodType').val(filter.periodType);

}

$(document).on('change', '[filter-parameter]', function() {
    $(this).closest('form').trigger('submit');
});




$(document).on('click', '[js-funnel-setting]', function() {
    $('[js-menu-funnel-setting]').addClass('is-open');
    checkBodyHidden();
});
$(document).on('click', '[js-menu-funnel-setting-close-btn]', function() {
    $('[js-menu-funnel-setting]').removeClass('is-open');
    checkBodyHidden();
});





function resetPlatform() {
    $('#platform option:selected').removeAttr('selected');
    $('#platform option:first').prop('selected', true);
}
function resetChannel() {
    $('#channel').html('<option value="all" selected>Все источники</option>');
}
function resetCommunity() {
    $('#community').val("Все аудитории");
    $('[js-communites]').val("Все аудитории");
}
function resetCommunityList() {
    $('[community-table]').html('<tr js-menu-purchase js-menu-purchase-all class="body__row body__row_small body__row_channel">' +
        '                                    <td class="body__cell body__cell_5p">' +
        '                                        <input js-menu-checker type="checkbox" id="Все аудитории" class="checkbox " name="communites" value="Все аудитории" checked/>' +
        '                                        <label class="checkbox-label" for="Все аудитории"></label>' +
        '                                    </td>' +
        '                                    <td class="body__cell body__cell_19p" js-menu-community>Все аудитории</td>' +
        '                                    <td class="body__cell body__cell_19p"></td>' +
        '                                </tr>' +
        '                                <tr js-menu-purchase class="body__row body__row_small body__row_channel">' +
        '                                    <td class="body__cell body__cell_5p">' +
        '                                        <input js-menu-checker type="checkbox" id="Неизвестно" class="checkbox " name="communites" value="unknown" checked/>' +
        '                                        <label class="checkbox-label" for="Неизвестно"></label>' +
        '                                    </td>' +
        '                                    <td class="body__cell body__cell_19p" js-menu-community>Неизвестно</td>' +
        '                                    <td class="body__cell body__cell_19p"></td>' +
        '                                </tr>');
}

$(document).on('change', '[js-advertiser]', function() {
    resetPlatform();
    resetChannel();
    resetCommunity();
});
$(document).on('change', '[js-project]', function() {
    resetPlatform();
    resetChannel();
    resetCommunity();
});
$(document).on('change', '[js-manager]', function() {
    resetPlatform();
    resetChannel();
    resetCommunity();
});
$(document).on('change', '[js-channel]', function() {
    if ($('#channel').val() !== 'all' && $('#channel').val() !== 'unknown') {
        $('#community').val("Выберите аудиторию");
    } else {
        resetCommunity();
    }
});
$(document).on('change', '[js-platform]', function() {
    if ($('option:selected', this).attr('value') === 'unknown') {
        $('#channel').html('<option value="unknown" selected>Неизвестно</option>');
        resetCommunity();
    } else {
        resetChannel();

        var formData = new FormData($('[funnel-filter-form]')[0]);
        setChannelByPlatform(formData);
    }

});
function setChannelByPlatform(formData) {
    $('[js-platform]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getChannels",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            var currentOption = $('#channel').html();

            var seloption = "";
            $.each(data, function(index, value){
                seloption += '<option value="' + value + '">' + value + '</option>';
            });
            $('#channel').html(currentOption + seloption);

            $('[js-platform]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-platform]').prop("disabled", false);
        }
    });
}


$(document).on('click', '[js-community]', function() {
    resetCommunityList();
    if ($('#channel').val() !== 'all' && $('#channel').val() !== 'unknown') {
        var formData = new FormData($('[funnel-filter-form]')[0]);
        setCommunityByChannel(formData);
    }
});
function setCommunityByChannel(formData) {
    $('[js-community]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getCommunities",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            var currentRows = $('[community-table]').html();

            var row = "";
            $.each(data, function(index, value){
                row += '<tr js-menu-purchase class="body__row body__row_small body__row_channel">' +
                    '                                    <td class="body__cell body__cell_5p">' +
                    '                                        <input js-menu-checker type="checkbox" id="' + value.name + '" class="checkbox" name="communites" value="' + value.name + '" checked/>' +
                    '                                        <label class="checkbox-label" for="' + value.name + '"></label>' +
                    '                                    </td>' +
                    '                                    <td class="body__cell body__cell_19p" js-menu-community >' + value.name + '</td>' +
                    '                                    <td class="body__cell body__cell_19p">' + value.link + '</td>' +
                    '                                </tr>';
            });
            $('[community-table]').html(currentRows + row);

            $('[js-menu]').addClass('is-open');
            checkBodyHidden();

            $('[js-community]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-community]').prop("disabled", false);
        }
    });
}
$(document).on('click', '[js-menu-close-btn]', function() {

    // var obj = $('[filter-form-communities]').serializeObject();

    var objs = [];
    $('[filter-form-communities]').find('tr:not(.none) [js-menu-checker]:checked').each(function () {
        objs.push($(this).val());
    });


    // var communites = obj['communites'];
    var communites = objs;

    if (jQuery.inArray("Все аудитории", communites) !== -1) {
        $('[js-communites]').val('Все аудитории');
    } else {
        $('[js-communites]').val(communites.toString());
    }

    showAll();
    $('[js-menu]').removeClass('is-open');
    checkBodyHidden();
});


$(document).on('keyup', '[js-menu-search]', function() {
    var $v = $(this).val().toLowerCase();

    $('[js-menu-purchase]').each(function () {
        if (!(~$(this).find('[js-menu-community]').text().toLowerCase().indexOf($v))) {
            $(this).addClass('none');
        } else {
            $(this).removeClass('none');
        }
    })
});


$(document).on('click', '[js-menu-purchase-all]', function() {
    let $attr = $(this).find('[js-menu-checker]').prop('checked');

    $('[js-menu-purchase]').each(function () {
        $(this).find('[js-menu-checker]').prop('checked', !$attr);
    })
});

$(document).on('click', '[js-menu-purchase]', function() {
    var $isAll = $(this).attr('js-menu-purchase-all');
    if (!(typeof $isAll !== typeof undefined && $isAll !== false)) {
        var $attr = $(this).find('[js-menu-checker]');
        $attr.prop('checked', !$attr.prop('checked'))
        $('[js-menu-purchase-all]').find('[js-menu-checker]').prop('checked', false)
        checkSelect();
        event.preventDefault();
    }
})

function checkSelect() {
    let $counter = $('[js-menu-purchase]').length - 1;
    var $s = 0;
    $('[js-menu-purchase]').each(function () {
        var $isAll = $(this).attr('js-menu-purchase-all');
        if (!(typeof $isAll !== typeof undefined && $isAll !== false)) {
            if ($(this).find('[js-menu-checker]').prop('checked')) {
                $s++;
            }
        }
    })

    if ($s == $counter) {
        $('[js-menu-purchase-all]').find('[js-menu-checker]').prop('checked', true);
    }
}

function showAll() {
    $('[js-menu-search]').val('');
    $('[js-menu-purchase]').each(function () {
        $(this).removeClass('none');
    })
}
