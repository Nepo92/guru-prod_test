$(document).ready(function(){
    const $menuBtn = $('[js-menu-button]');
    const $menuPurchase = $('[js-menu-purchase]');
    const $menuChannel = $('[js-menu-channel]');
    const $menuCloseBtn = $('[js-menu-close-btn]');
    const $menuSubmitBtn = $('[distribute-submit-btn]');
    const $menu = $('[js-menu]');

    const $searchInput = $('[js-menu-search]');
    const $purchases = $('[js-menu-purchase]');

    var $target = null;


    $menuCloseBtn.on('click', function() {
        $menu.removeClass('is-open');
        closeChannelsPurchases()
    })

    const $jsonObj = [];
    const $jsonObjTemp = [];

    $menuChannel.on('change', function() {
        var jsonItem = {};
        var $billNumber = $(this).closest('tr.body__row').find('[distribute-id]').val();

        $jsonObj.forEach(function(e, index) {
            if ($jsonObj[index].distributeId === $billNumber) {
                $jsonObj.splice(index, 1);
            }
        })

        $jsonObjTemp.forEach(function(e, index) {
            if ($jsonObjTemp[index].distributeId === $billNumber) {
                $jsonObjTemp.splice(index, 1);
            }
        })
        if('unknown' === $(this).val()) {
            $(this).closest('tr.body__row').find('[js-menu-button]').val('Неизвестный');
            $(this).closest('tr.body__row').find('[js-menu-button]').prop('disabled', true);

            jsonItem ['distributeIdChannel'] = 'unknown';
            jsonItem ['distributeChannel'] = 'unknown';
            jsonItem ['distributeId'] = $billNumber;

            $jsonObj.push(jsonItem);
        } else {
            $(this).closest('tr.body__row').find('[js-menu-button]').val('');
            $(this).closest('tr.body__row').find('[js-menu-button]').prop('disabled', false);

            var $channel = $(this).closest('tr.body__row').find('[js-menu-channel] option:selected').text();
            jsonItem ['distributeIdChannel'] = '';
            jsonItem ['distributeChannel'] = $channel;
            jsonItem ['distributeId'] = $billNumber;

            $jsonObjTemp.push(jsonItem);
        }

        check($jsonObj);
    });

    $menuBtn.on('click', function () {
        if (!($(this).val() === 'Неизвестный')) {
            var $channel = $(this).closest('tr.body__row').find('[js-menu-channel] option:selected').val();
            displayChannelsPurchases($channel);

            $target = $(this);
            $menu.addClass('is-open');
        }
    });

    $menuPurchase.on('click', function () {
        $target.val($(this).find('[js-menu-purchase-name]').val());
        var $billNumber = $target.closest('tr.body__row').find('[distribute-id]').val();
        var $channelId = $(this).find('[js-menu-purchase-id]').val();

        $jsonObj.forEach(function(e, index) {
            if ($jsonObj[index].distributeId === $billNumber) {
                $jsonObj[index].distributeIdChannel = $channelId;
            }
        })

        $jsonObjTemp.forEach(function(e, index) {
            if ($jsonObjTemp[index].distributeId === $billNumber) {
                $jsonObjTemp[index].distributeIdChannel = $channelId;

                $jsonObj.push($jsonObjTemp[index]);
                $jsonObjTemp.splice(index, 1);
            }
        })

        $menu.removeClass('is-open');
        closeChannelsPurchases();
        check($jsonObj);
    })


    $menuSubmitBtn.on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: "/payment/distributeFew/",
            type:"POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify($jsonObj),
            async: false,
            cache: false,
            processData:false,
            success: function(resposeJsonObject){
                location.reload();
            }
        });
    })

    $searchInput.on('keyup', function () {
        var $v = $(this).val().toLowerCase();

        $purchases.each(function () {
            if (!(~$(this).find('[js-menu-purchase-date]').text().toLowerCase().indexOf($v) ||
                    ~$(this).find('[js-menu-purchase-community]').text().toLowerCase().indexOf($v) ||
                    ~$(this).find('[js-menu-purchase-course]').text().toLowerCase().indexOf($v) ||
                    ~$(this).find('[js-menu-purchase-link]').text().toLowerCase().indexOf($v) ||
                    ~$(this).find('[js-menu-purchase-tiser]').text().toLowerCase().indexOf($v))) {
                $(this).addClass('none');
            } else {
                $(this).removeClass('none');
            }
        })
    })
});

function displayChannelsPurchases(id) {
    var $content = $('[js-menu-content]')
    $content.find('#' + id).addClass('is-selected');
    $('body').css('overflow','hidden');
}
function closeChannelsPurchases() {
    var $content = $('[js-menu-content]')
    $content.find('.menu-content__wrapper').removeClass('is-selected');
    $('body').css('overflow','auto');
}

function check(jsonObj) {
    var $sz = jsonObj.length;
    if (jsonObj.length > 0) {
        $('[js-distributed-count]').text($sz);
        $('[js-distributed-message]').addClass('active');
    } else {
        $('[js-distributed-count]').text(0);
        $('[js-distributed-message]').removeClass('active');
    }
}