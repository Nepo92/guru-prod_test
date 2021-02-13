$(document).ready(function(){
    const $menuBtn = $('[js-menu-button]');
    const $menuChannel = $('[js-menu-channel]');
    const $menuPurchase = $('[js-menu-purchase]');
    const $menuCloseBtn = $('[js-menu-close-btn]');
    const $menu = $('[js-menu]');
    const $filterForm = $('[filter-form]');
    const $advertiser = $('[js-advertiser]');
    const $menuPlatform = $('[js-menu-platform]');
    const $menuManager = $('[js-menu-manager]');
    const $menuDirection = $('[js-menu-direction]');
    const $menuCourse = $('[js-menu-course]');
    const $searchInput = $('[js-menu-search]');
    const $purchases = $('[js-menu-purchase]');

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

        $filterForm.trigger('submit')
    })

    $menuChannel.on('change', function () {
        $menuBtn.val('Все аудитории');
        $filterForm.trigger('submit')
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
    })

    $menuPurchase.on('click', function () {
        $menuBtn.val($(this).find('[js-menu-community]').text())
        $filterForm.trigger('submit')
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
});

function showAll() {
    $purchases.each(function () {
        $(this).removeClass('none');
    })
}
function displayCommunities() {
    $('body').css('overflow','hidden');
}
function closeCommunities() {
    $('body').css('overflow','auto');
}