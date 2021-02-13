$(document).ready(function(){

    checkChannel();

    const $menuBtn = $('[js-menu-button]');
    const $menuChannel = $('[js-menu-channel]');
    const $menuCloseBtn = $('[js-menu-close-btn]');
    const $menu = $('[js-menu]');
    const $filterForm = $('[filter-form]');
    const $filterForm2 = $('[filter-form-communities]');
    const $advertiser = $('[js-advertiser]');
    const $menuPlatform = $('[js-menu-platform]');
    const $menuManager = $('[js-menu-manager]');
    const $menuDirection = $('[js-menu-direction]');
    const $menuCourse = $('[js-menu-course]');
    const $searchInput = $('[js-menu-search]');
    const $purchases = $('[js-menu-purchase]');
    const $allPurchases = $('[js-menu-purchase-all]');

    $menuManager.on('change', function () {
        $menuChannel.val('all');
        $menuPlatform.val('all');
        $menuBtn.val('Все аудитории');
        $filterForm.trigger('submit')
    })
    $menuDirection.on('change', function () {
        $menuChannel.val('all');
        $menuPlatform.val('all');
        $menuBtn.val('Все аудитории');
        $filterForm.trigger('submit')
    })
    $menuCourse.on('change', function () {
        $menuChannel.val('all');
        $menuPlatform.val('all');
        $menuBtn.val('Все аудитории');
        $filterForm.trigger('submit')
    })

    $advertiser.on('change', function () {
        $menuChannel.val('all');
        $menuPlatform.val('all');
        $menuBtn.val('Все аудитории');
        $filterForm.trigger('submit')
    })

    $menuPlatform.on('change', function () {
        if ($(this).val() === 'unknown') {
            $menuBtn.val('Неизвестно');
        } else {
            $menuBtn.val('Все аудитории');
        }
        $menuChannel.val('all');

        $filterForm.trigger('submit')
    })

    $menuChannel.on('change', function () {
        $menuBtn.val('Все аудитории');
        $filterForm.trigger('submit')
    })

    $allPurchases.on('click', function () {
        let $attr = $(this).find('[js-menu-checker]').prop('checked');

        $purchases.each(function () {
            $(this).find('[js-menu-checker]').prop('checked', !$attr);
        })

    })

    $menuBtn.on('click', function () {
        if ($menuChannel.val() != 'all' && $menuChannel.val() != 'unknown') {
            displayCommunities();
            $menu.addClass('is-open');
        }
    })

    $menuCloseBtn.on('click', function() {
        $menu.removeClass('is-open');
        closeCommunities();
        showAll()
        $filterForm2.trigger('submit')
    });

    $filterForm2.on('submit', function (event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "communities",
            data: JSON.stringify($(this).serializeObject()),
            dataType: 'json',
            cache: false,
            success: function (data) {
                location.reload();
            },
            error: function (data) {
                location.reload();
            }
        });

    });

    $purchases.on('click', function (event) {
        var $isAll = $(this).attr('js-menu-purchase-all');
        if (!(typeof $isAll !== typeof undefined && $isAll !== false)) {
            var $attr = $(this).find('[js-menu-checker]');
            $attr.prop('checked', !$attr.prop('checked'))
            $allPurchases.find('[js-menu-checker]').prop('checked', false)
            checkSelect();
            event.preventDefault();
        }
    })

    $searchInput.on('keyup', function () {
        var $v = $(this).val().toLowerCase();

        $purchases.each(function () {
            if (!(~$(this).find('[js-menu-community]').text().toLowerCase().indexOf($v))) {
                $(this).addClass('none');
            } else {
                $(this).removeClass('none');
            }
        })
    })


    selectAll()
});

function showAll() {
    $('[js-menu-purchase]').each(function () {
        $(this).removeClass('none');
    })
}
function displayCommunities() {
    $('body').css('overflow','hidden');
}
function closeCommunities() {
    $('body').css('overflow','auto');
}
function selectAll() {
    var $isAll = $('[js-menu-purchase-all]').find('[js-menu-checker]').prop('checked')
    if ($isAll) {
        $('[js-menu-purchase]').each(function () {
            $(this).find('[js-menu-checker]').prop('checked', $isAll);
        })
    }
}

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
function checkChannel() {
    if ($('[js-menu-channel]').val() !== 'all' && $('[js-menu-channel]').val() !== 'unknown') {
        $('[js-menu-button]').val('Выберите аудиторию');
    }
}