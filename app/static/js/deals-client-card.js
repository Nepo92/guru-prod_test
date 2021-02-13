//кнопка открытия карточки клиента
$(document).on('click', '[js-client-card]', function(event){

    var clientId = $(this).find('[js-client-id]').val();

    $('[js-client-card]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/clients/getClientInfo",
        data: JSON.stringify(clientId),
        dataType: 'json',
        cache: false,
        success: function (data) {
            setClientCardInfo(data);
            $('[js-client-card]').prop("disabled", false);
        },
        error : function (data) {
            $('[js-client-card]').prop("disabled", false);
        }
    });
});


var $CLIENT;
//заполение информации о клиенте в карточке клиента
function setClientCardInfo(data) {
    $('[js-client-card-name]').val(data.name);
    $('[js-client-card-date]').text(data.createDate);
    $('[js-client-card-manager]').text(data.manager);
    $('[js-client-card-link]').val(data.link);
    $('[js-client-card-phone]').val(data.phone);
    $('[js-client-card-email]').val(data.email);
    $('[js-client-card-comment]').val(data.comment);
    $('[js-client-card-id]').val(data.id);

    $('[js-client-name-copy]').text(data.name);
    $('[js-client-name-copy]').attr('data-link', data.name);

    var registerInfoBtn = $('[js-register-info-btn]');
    var registerInfo = $('[js-register-info]');
    var registerInfoContainer = $('[js-register-info-container]');
    var copyRegisterInfo = $('[js-copy-register-info]');
    registerInfoBtn.unbind('click');
    copyRegisterInfo.unbind('click');
    if (data.idUser != 0){
        registerInfoBtn.addClass('hide');
        registerInfo.removeClass('hide')
        $('[js-client-url]').html(window.location.origin + '/login');
        $('[js-client-login]').html(data.userLogin);
        $('[js-client-password]').html(data.userPassword);
    }else{
        registerInfoBtn.removeClass('hide');
        registerInfoBtn.click(function () {
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "/api/clients/createUser",
                data: JSON.stringify(data.id),
                dataType: 'json',
                cache: false,
                success: function (userData) {
                    registerInfoBtn.addClass('hide');
                    registerInfo.removeClass('hide');
                    $('[js-client-login]').html(userData.username);
                    $('[js-client-password]').html(userData.password);
                },
                error : function (userData) {

                }
            });
        });
        registerInfo.addClass('hide');
    }
    // событие нажатия кнопки сгенерировать

    copyRegisterInfo.click(function () {
        var childs = Array.from(registerInfoContainer.children());
        var copiedText = '';
        childs.forEach(function (value, index, array) {
            var elem = $(value);
            if (elem.hasClass('client-card__register-info-label') ||
                elem.hasClass('client-card__register-info-value')){
                copiedText += elem.text().trim() + '\n';
            }
        });
        var $tmp = $("<textarea>");
        $("body").append($tmp);
        $tmp.val(copiedText).select();
        document.execCommand("copy");
        $tmp.remove();
    });

    setIdClient(data.id);
    //обновление карточек сделок
    updateDealCard($CLIENT);

    $('[js-menu-client-card]').addClass('is-open');
    checkBodyHidden()
}

function setIdClient(id) {
    $('[js-deal-form-client]').val(id);
    $CLIENT = id;
}

//обновление цены/получено по сделке на фронте
function updateDealPriceOnList(value) {
    var dealRow = $('[data-deal="' + value.id + '"]');

    var colPaid = dealRow.find('.column-paid');
    colPaid.removeClassWild('column-paid_*');
    if (value.price <= value.paid) {
        colPaid.addClass('column-paid_green');
    }

    dealRow.find('[data-deal-price]').html(value.price);
    dealRow.find('[data-deal-paid]').html(value.paid + ' ₽');
}
