$(document).ready(function(){
    const $menuBtn = $('[js-menu-button]');
    const $menuChannel = $('[js-menu-channel]');

    $menuBtn.on('click', function () {
        if (!($(this).val() === 'Неизвестный')) {
            var $channel = $(this).closest('tr.body__row').find('[js-menu-channel] option:selected').val();
            var $channelText = $(this).closest('tr.body__row').find('[js-menu-channel] option:selected').text();
            $(this).closest('tr.body__row').find('[distribute-from]').find('[distribute-channel]').val($channelText)
            displayChannelsPurchases($channel);

            $target = $(this);
            $menu.addClass('is-open');
        }
    })

    $menuChannel.on('change', function() {
        if('unknown' === $(this).val()) {
            $(this).closest('tr.body__row').find('[js-menu-button]').val('Неизвестный');
        } else {
            $(this).closest('tr.body__row').find('[js-menu-button]').val('');
        }
    })

    $menuCloseBtn.on('click', function() {
        $menu.removeClass('is-open');
        closeChannelsPurchases()
        showAll()
    })

    $menuPurchase.on('click', function () {
        $menuPurchase.removeClass('active')
        $(this).addClass('active')
        $target.val($(this).find('[js-menu-purchase-name]').val())
        $target.closest('tr.body__row').find('[distribute-from]').find('[distribute-id-channel]').val($(this).find('[js-menu-purchase-id]').val())
    })

    $menuSubmitBtn.on('click', function (e) {
        var v = $(this).closest('tr.body__row').find('[js-menu-button]').val()
        var v2 = $(this).closest('tr.body__row').find('[js-menu-channel]').val()
        if (v === null || v === '' || v2 === null || v2 === '') {
            e.preventDefault();
        }
    })

    $searchInput.on('keyup', function () {
        var $v = $(this).val();

        $purchases.each(function () {
            if (!(~$(this).find('[js-menu-purchase-date]').text().indexOf($v) ||
                    ~$(this).find('[js-menu-purchase-community]').text().indexOf($v) ||
                    ~$(this).find('[js-menu-purchase-course]').text().indexOf($v) ||
                    ~$(this).find('[js-menu-purchase-link]').text().indexOf($v) ||
                    ~$(this).find('[js-menu-purchase-tiser]').text().indexOf($v))) {
                $(this).addClass('none');
            } else {
                $(this).removeClass('none');
            }
        })
    })
});