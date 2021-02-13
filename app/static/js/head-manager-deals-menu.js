$(document).on('click', '.datepicker-here', function(event){
    $('.datepicker.active').find('[data-action="today"]').trigger('click');
});
$(document).on('click', '.datepicker-here-deal', function(event){
    $('.datepicker.active').find('[data-action="today"]').trigger('click');
});
$(document).on('click', '.datepicker-here-cs', function(event){
    $('.datepicker.active').find('[data-action="today"]').trigger('click');
});
$(document).on('click', '.datepicker-here-pay', function(event){
    $('.datepicker.active').find('[data-action="today"]').trigger('click');
});

//список способов оплаты
var $paymentMethodList;
function setPaymentMethodList(paymentMethodList) {
    $paymentMethodList = paymentMethodList;
}
//список статусов
var $statusesList;
function setStatusesList(statusesList) {
    $statusesList = statusesList;
}


//изменение чекера напоминания при редактировании сделки
$(document).on('click', '[js-update-open-reminder]', function(event) {
    $('[js-update-form-deal-reminder-btn]').removeClass('is-open');
    $('[js-update-form-deal-reminder-block]').addClass('is-open');
    $('[js-update-form-deal-reminder-date]').val('');
    $('[js-update-form-deal-reminder-msg]').val('');
    $('[js-update-form-deal-reminder]').prop("checked", true);
});
//изменение чекера напоминания при редактировании сделки закрытие
$(document).on('click', '[js-update-close-reminder]', function(event) {
    $('[js-update-form-deal-reminder-btn]').addClass('is-open');
    $('[js-update-form-deal-reminder-block]').removeClass('is-open');
    $('[js-update-form-deal-reminder-date]').val('—');
    $('[js-update-form-deal-reminder-msg]').val('');
    $('[js-update-form-deal-reminder]').prop("checked", false);
});
//в меню редактирования
$(document).on('change', '[js-update-form-deal-sale-type]', function(event) {
    if ($(this).val() === 'traffic') {
        $('[js-update-form-deal-mailing-block]').addClass('is-open');
    } else {
        $('[js-update-form-deal-mailing-block]').removeClass('is-open');
        $('[js-update-form-deal-mailing]').prop('checked', false);
    }
});
//в меню редактирования
$(document).on('change', '[js-update-form-deal-pr]', function(event) {
    $('[js-update-form-deal-price]').val($('option:selected', this).attr('data-price'));
    $('[js-update-form-deal-product-type]').val($('option:selected', this).attr('data-type'));

    $('[js-update-form-deal-product-id]').val($('option:selected', this).attr('data-id'));

    $list = createKindList($('option:selected', this).val());
    if ($list.length > 0) {
        $('[js-update-form-kind]').html(createKindOptions($list));
        $('[js-update-form-kind-block]').addClass('is-open');
    } else {
        $('[js-update-form-kind-block]').removeClass('is-open');
        $('[js-update-form-kind]').html('');
    }

    if ($('[u-product-types]').val() == 'курс' ) {
        setStreams($('[js-update-form-deal-start-date]'), $('option:selected', this).attr('data-id'));
    }
});

$(document).ready(function() {
    $('.datepicker-here-deal').datepicker({
        autoClose: true,
        maxDate: new Date(),
        todayButton: true
    });

    $('.datepicker-here').datepicker({
        autoClose: true,
        todayButton: true
    });

    const $menuClientCard = $('[js-menu-client-card]');
    const $menuClientCardCloseBtn = $('[js-menu-client-card-close-btn]');
    //закрытие карточки клиента
    $menuClientCardCloseBtn.on('click', function () {
        // $menuSearch.removeClass('is-open');
        $menuCreateClient.removeClass('is-open');
        $menuClientCard.removeClass('is-open');
        closeEdit();
        checkBodyHidden();
    });



    const $menuUpdateDeal = $('[js-menu-update-deal]');
    const $menuUpdateDealCloseBtn = $('[js-menu-update-deal-close-btn]');
    //закрытие редактирование сделки
    $menuUpdateDealCloseBtn.on('click', function() {
        $menuUpdateDeal.removeClass('is-open');
        checkBodyHidden()
    });


    const $menuUpdateReminderCloseBtn = $('[js-menu-update-reminder-close-btn]');
    const $menuUpdateReminder = $('[js-menu-update-reminder]');

    $menuUpdateReminderCloseBtn.on('click', function() {
        clearReminderForm();
        $menuUpdateReminder.removeClass('is-open');
        checkBodyHidden();
    });


    const $menuBillsCloseBtn = $('[js-menu-bills-close-btn]');
    const $menuBills = $('[js-menu-bills]');
    //закрытие меню счетов
    $menuBillsCloseBtn.on('click', function() {
        $menuBills.removeClass('is-open');
        checkBodyHidden();
        BILLS_TEMP_INFO = {};
    });

    const $menuCreateClientCloseBtn = $('[js-menu-create-client-close-btn]');
    const $menuCreateClient = $('[js-menu-create-client]');

    $menuCreateClientCloseBtn.on('click', function() {
        $('js-create-client-form').submit('reset');
        $menuCreateClient.removeClass('is-open');
        checkBodyHidden()
    });

    const $menuSearchCloseBtn = $('[js-menu-search-close-btn]');
    const $menuSearch = $('[js-menu-search]');

    $menuSearchCloseBtn.on('click', function() {
        $menuSearch.removeClass('is-open');
        checkBodyHidden()
    });

    const $menuCreateDealCloseBtn = $('[js-menu-create-deal-close-btn]');
    const $menuCreateDeal = $('[js-menu-create-deal]');

    $menuCreateDealCloseBtn.on('click', function() {
        $menuCreateDeal.removeClass('is-open');
        checkBodyHidden();
    });

    const $menuBillCloseBtn = $('[js-menu-bill-close-btn]');
    const $menuBill = $('[js-menu-bill]');

    $menuBillCloseBtn.on('click', function() {
        $menuBill.removeClass('is-open');
        $('[js-bill-form]').submit('reset');
        checkBodyHidden()
    });

    initDatePicker();
    initDatePickerPayDate();
});

$(document).on('click', '[close-dialog]', function(event) {
    $(this).closest('.dialog').removeClass('is-open');
});

$(document).on('click', '[js-edit-btn]', function(event) {
    $('[js-client-card-name]').removeAttr('disabled');
    $('[js-client-card-comment]').removeAttr('disabled');
    $('[js-client-card-link]').removeAttr('disabled');
    $('[js-client-card-phone]').removeAttr('disabled');
    $('[js-client-card-email]').removeAttr('disabled');
    $('[js-edit-footer]').addClass('is-open');
});

function closeEdit() {
    $('[js-client-card-name]').attr("disabled", true);
    $('[js-client-card-comment]').attr("disabled", true);
    $('[js-client-card-link]').attr("disabled", true);
    $('[js-client-card-phone]').attr("disabled", true);
    $('[js-client-card-email]').attr("disabled", true);
    $('[js-edit-footer]').removeClass('is-open');
}

$(document).on('change', '[js-form-status]', function(event) {
    var form = $(this).parent($('[js-status-form]'));
    form.removeClassWild("deal-status__form_*");
    form.addClass("deal-status__form_" + ($('option:selected', this).attr('data-code')));

    var data = form.serializeObject();

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/deals/updateDealStatus",
        data: JSON.stringify(data),
        dataType: 'json',
        cache: false,
        success: function (data) {
        },
        error: function (data) {
        }
    });

});

$(document).on('change', '[js-deal-form-status]', function(event){
    var form = $(this).parent($('[js-deal-status-form]'));
    form.removeClassWild("deal__select_*");
    var code = $('option:selected', this).attr('data-code');
    form.addClass("deal__select_" + code);

    var formData = form.serializeObject();
    formData['code'] = code;

    $('[js-deal-form-status]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/deals/updateDealStatus",
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            updateDealStatusOnList(formData);
            $('[js-deal-form-status]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-deal-form-status]').prop("disabled", false);
        }
    });
});

//обновление статуса сделки на фронте
function updateDealStatusOnList(value) {
    var dealRow = $('[data-deal="' + value.id + '"]');
    var select = dealRow.find('[js-form-status]');
    var form = select.parent($('form'));
    form.removeClassWild("deal-status__form_*").addClass("deal-status__form_" + value.code);
    $(select).find('option:selected').removeAttr('selected');
    $(select).val(value.status);
}

// //кнопка открытия карточки клиента
// $(document).on('click', '[js-client-card]', function(event){
//     var clientId = $(this).find('[js-client-id]').val();
//
//     $('[js-client-card]').prop("disabled", true);
//     $.ajax({
//         type: "POST",
//         contentType: "application/json",
//         url: "/api/clients/getClientInfo",
//         data: JSON.stringify(clientId),
//         dataType: 'json',
//         cache: false,
//         success: function (data) {
//             setClientCardInfo(data);
//             $('[js-client-card]').prop("disabled", false);
//         },
//         error : function (data) {
//             $('[js-client-card]').prop("disabled", false);
//         }
//     });
// });
//
// var $CLIENT;
// //заполение информации о клиенте в карточке клиента
// function setClientCardInfo(data) {
//     $('[js-client-card-name]').val(data.name);
//     $('[js-client-card-date]').text(data.createDate);
//     $('[js-client-card-manager]').text(data.manager);
//     $('[js-client-card-link]').val(data.link);
//     $('[js-client-card-phone]').val(data.phone);
//     $('[js-client-card-email]').val(data.email);
//     $('[js-client-card-comment]').val(data.comment);
//     $('[js-client-card-id]').val(data.id);
//
//     $('[js-client-name-copy]').text(data.name);
//     $('[js-client-name-copy]').attr('data-link', data.name);
//     setIdClient(data.id);
//     //обновление карточек сделок
//     updateDealCard($CLIENT);
//
//     $('[js-menu-client-card]').addClass('is-open');
//     checkBodyHidden()
//
// }
//
// function setIdClient(id) {
//     $('[js-deal-form-client]').val(id);
//     $CLIENT = id;
// }

//обновление карточек сделок
function updateDealCard(idClient) {
    if (typeof idClient !== "undefined") {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/api/deals/getDealsByProjects",
            data: JSON.stringify(idClient),
            dataType: 'json',
            cache: false,
            success: function (data) {
                var $dealList = $('[js-deals-list]');
                $dealList.html('');
                $.each(data, function(index, value) {
                    // установка значения в списке
                    updateDealPriceOnList(value);

                    // установка значения в в меню
                    var seloption = "";
                    $.each($statusesList, function(index, value2){
                        seloption += '<option js-deal-form-status value="'+ value2.id +'" data-code="'+
                            value2.code + '" ' + (value2.id === value.status ? 'selected="selected" ': '') +'">' + value2.title + '</option>';
                    });

                    var reminder = "";
                    if (value.reminder) {
                        reminder += '<div class="menu-comment__input menu-comment__input menu-comment__input_deal menu-comment__input_deal-violet">' +
                            '<div class="deal__comment" title="' + value.reminderMessage + '">' + value.reminderMessage + '</div></div>';
                    } else {
                        reminder += '<div class="menu-comment__input menu-comment__input menu-comment__input_deal menu-comment__input_deal-empty">' +
                            '<div class="deal__comment">Нет напоминаний</div></div>';
                    }

                    var response = $("<div/>").attr("class", "deal deal_told deal_white")
                        .append($("<div/>").attr("class", "deal-wrapper")
                            .append($("<div/>").attr("class", "deal__wrapper deal__wrapper_bordered deal__wrapper_column")
                                .append($("<div/>").attr("class", "deal__title").html(value.status === 1 ? 'Целевая заявка' : value.course))
                                .append($("<div/>").attr("class", "deal__subtitle")
                                    .append($("<div/>").attr("class", value.kind !== null ? "deal__kind deal__kind_del" : "deal__kind").html(value.kind))
                                    .append($("<div/>").attr("class", "deal__date").html(value.createDate)))
                            )
                            .append($("<div/>").attr("class", "deal__wrapper deal__wrapper_overflow deal__wrapper_bordered c-tooltip").attr('js-deal-id', value.id)
                                .append($("<div/>").attr("class", "c-tooltip__wrapper")
                                    .append($("<div/>").attr("class", "c-tooltip__text").html(value.managerAccessName)))
                                .append($("<div/>").attr("class", "deal__social")
                                    .append($("<div/>").attr("class", "deal-social deal-social_" + value.socialCode)))
                                .append($("<div/>").attr("class", "deal__manager").html(value.managerName))
                                .append($("<div/>").attr("class", "deal__sale-type").html(value.type))
                            )
                            .append($("<div/>").attr("class", "deal__wrapper deal__wrapper_between deal__wrapper_bordered ")
                                .append($("<div/>").attr("class", "deal__sum")
                                    .append($("<div/>").attr("class", "deal__sum-title").html("Стоимость"))
                                    .append($("<div/>").attr("class", "deal__sum-value").html(value.price))
                                )
                                .append($("<div/>").attr("class", "deal__sum")
                                    .append($("<div/>").attr("class", "deal__sum-title").html("Получено"))
                                    .append($("<div/>").attr("class", "deal__sum-value deal__sum-value_blue").html(value.paid))
                                )
                                .append((value.isEditable && value.status !== 1) ?
                                    $("<div/>").attr("class", "deal_bill")
                                        .append($("<form/>").attr("js-add-bill-form", "").attr("action", "#").attr("class", value.isHidden ? "hidden-deal" : "")
                                            .append($("<input/>").attr("type", "hidden").attr("name", "id").val(value.id))
                                            .append($("<button/>").attr("js-add-bill-button", "").attr("class", "add-btn"))
                                        ) : ''
                                )
                            )
                            .append((value.status !== 1) ? $("<div/>").attr("class", "deal__wrapper deal__wrapper_column deal__wrapper_bordered")
                                .append($("<form/>").attr("js-deal-status-form","").attr("class", "deal__select deal__select_" + value.statusCode)
                                    .append($("<input/>").attr("name", "id").attr("type", "hidden").val(value.id))
                                    .append($("<select/>").attr("class","deal-select menu-input__input_select").attr("name","status").attr("js-deal-form-status","").html(seloption))
                                ) :
                                $("<div/>").attr("class", "deal__wrapper deal__wrapper_column deal__wrapper_bordered")
                                .append($("<div/>").attr("class", "deal__select deal__select_" + value.statusCode)
                                    .append($("<div/>").attr("class","deal-select menu-input__input_select").html(value.statusName))
                                )
                            )
                            .append($("<div/>").attr("class", "deal__wrapper deal__wrapper_column deal__wrapper_bordered")
                                    .append($("<div/>").attr("class", "deal__reminder")
                                        .append($("<div/>").attr("class", (value.reminder) ?
                                            (value.reminderExpiration) ? "deal__reminder-title deal-reminder deal-reminder_red " :
                                                (value.reminderToday) ? "deal__reminder-title deal-reminder deal-reminder_green " : "deal__reminder-title deal-reminder deal-reminder_gray " : "deal__reminder-title deal__reminder-title_left")
                                            .html((value.reminder) ? value.reminderDate : "Нет напоминания"))
                                        .append((value.status !== 1) ?  $("<div/>").attr("class", "add-reminder")
                                            .append($("<form/>").attr("js-add-reminder-form", "").attr("action", "#")
                                                .append($("<input/>").attr("type", "hidden").attr("name", "idDeal").val(value.id))
                                                .append($("<button/>").attr("js-add-reminder-button", "").attr("class", "add-btn"))
                                            ) : ''
                                        )
                                    )
                                // .append(reminder)
                            )
                            // .append($("<div/>").attr("class", "deal__wrapper deal__wrapper_column deal__wrapper_bordered")
                            //     .append($("<div/>").attr("class", "deal__reminder")
                            //         .append($("<div/>").attr("class", "deal__reminder-title").html('Напоминание'))
                            //         .append($("<div/>").attr("class", "deal__reminder-date").html(value.reminderDate))
                            //     )
                            //     .append(reminder)
                            // )
                            // .append($("<div/>").attr("class", "deal__wrapper deal__wrapper_column deal__wrapper_bordered")
                            //     .append($("<div/>").attr("class", "menu-comment__input menu-comment__input menu-comment__input_deal menu-comment__input_deal-small")
                            //         .append($("<div/>").attr("class", "deal__comment").attr("title", value.comment).html(value.comment))
                            //     )
                            // )
                            .append($("<div/>").attr("class", "deal__wrapper deal__wrapper_column")
                                .append($("<form/>").attr("class", "button_full").attr("action", "#").attr("js-update-deal-form", "")
                                    .append($("<input/>").attr("name", "id").attr("type", "hidden").val(value.id))
                                    .append($("<button/>").attr("type", "button").attr("class", "button button_white button_full").attr("js-update-deal-btn", "").html("Редактировать сделку"))
                                )

                                .append(
                                    (value.isHidden)
                                        ?
                                        $("<form/>").attr("class", "button_full").attr("action", "#").attr("js-reveal-deal-form", "")
                                            .append($("<input/>").attr("data-hide-deal", value.id).attr("name", "id").attr("type", "hidden").val(value.id))
                                            .append(
                                                $("<button/>").attr("type", "button").attr("class", "button button_red button_full").attr("js-reveal-deal-btn", "")
                                                    .append($("<span/>").attr("class", "hidden-btn hidden-btn_left hidden-btn_reveal").html("Восстановить сделку"))
                                            )
                                        :
                                        $("<form/>").attr("class", "button_full").attr("action", "#").attr("js-hide-deal-form", "")
                                            .append($("<input/>").attr("data-hide-deal", value.id).attr("name", "id").attr("type", "hidden").val(value.id))
                                            .append($("<button/>").attr("type", "button").attr("class", "button button_red button_full").attr("js-hide-deal-btn", "")
                                                .append($("<span/>").attr("class", "hidden-btn hidden-btn_left hidden-btn_hide").html("Скрыть сделку")))
                                )
                            )
                        );
                    $dealList.append(response);
                    loadModules(idClient, value.id);
                });

                var $createDealBlock = $("<div/>").attr("js-create-deal", "").attr("class", "deal deal_told deal_create")
                    .append($("<div/>").attr("class", "deal__btm-message").html('Добавить сделку'));

                $dealList.append($createDealBlock);
            }
        });
    }
}

function loadModules(idClient, idDeal){
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/deals/getDealsModulesInfo",
        data: JSON.stringify(idDeal),
        dataType: 'json',
        cache: false,
        success: function (data) {
            if (data.modules.length > 0){
                $modulesRoot = $("<div/>").attr("class", "deal__access-lessons ");
                $lessons = $("<div/>").attr("class", "deal__lessons");
                $.each(data.modules, function(index, value) {
                    $lessons.append($("<div/>").attr('js-module', value.idModule).attr('js-module-deal', idDeal).attr('js-module-client', idClient).attr('js-allowed', data.allowed).attr("class", "deal__lessons-item " + (value.enabled ? 'deal__lessons-item_active' : '')).html(value.number));
                });
                $access = $("<div/>").attr("class", "deal__access")
                    .append($("<div/>").attr("class", "deal__access-text")).html('Доступ к продукту')
                    .append($("<div/>").attr("class", "deal__access-btn slide-toggle " + (data.allowed ? 'slide-toggle_active' : '')).attr("js-id-deal-toggle", idDeal)
                        .append($("<div/>").attr("class", "slide-toggle__thumb")));
                $modulesRoot.append($access);
                $modulesRoot.append($lessons);

                $modulesRoot.insertAfter($('[js-deal-id='+idDeal+']'));
                $(".slide-toggle[js-id-deal-toggle="+idDeal+"]").click(function (event) {
                    var toggle = $(this);
                    var idDeal = toggle.attr('js-id-deal-toggle');
                    var allowed = toggle.hasClass('slide-toggle_active');
                    if (allowed){
                        toggle.removeClass('slide-toggle_active');
                    }else{
                        toggle.addClass('slide-toggle_active');
                    }
                    changeAllowed(idDeal, idClient, !allowed);
                });
                $('.deal__lessons-item[js-module-deal='+idDeal+']').click(function (event){
                    var $this = $(this);
                    var idModule = $this.attr('js-module');
                    var idDeal = $this.attr('js-module-deal');
                    var allowed = $(".slide-toggle[js-id-deal-toggle="+idDeal+"]").hasClass('slide-toggle_active');
                    var idClient = $this.attr('js-module-client');
                    var enabled = $this.hasClass('deal__lessons-item_active');
                    if (allowed){
                        if (enabled){
                            $this.removeClass('deal__lessons-item_active');
                        }else{
                            $this.addClass('deal__lessons-item_active');
                        }
                        changeEnabledModule(idClient, idDeal, idModule, !enabled);
                    }
                });
            }
        }
    });
}

function changeAllowed(idDeal, idClient, allowed){
    console.log('Change allowed', idDeal, idClient, allowed);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/deals/changeModulesAllowed",
        data: JSON.stringify({id: idDeal, idClient: idClient, value: allowed}),
        dataType: 'json',
        cache: false,
        success: function (data) {
            console.log(data);
        }
    });
}

function changeEnabledModule(idClient, idDeal, idModule, enabled){
    console.log('Change enabled', idClient, idDeal, idModule, enabled);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/deals/changeModulesEnabled",
        data: JSON.stringify({idDeal: idDeal, idModule: idModule, idClient: idClient, value: enabled}),
        dataType: 'json',
        cache: false,
        success: function (data) {
            console.log(data);
        }
    });
}
// //обновление цены/получено по сделке на фронте
// function updateDealPriceOnList(value) {
//     var dealRow = $('[data-deal="' + value.id + '"]');
//
//     var colPaid = dealRow.find('.column-paid');
//     colPaid.removeClassWild('column-paid_*');
//     if (value.price <= value.paid) {
//         colPaid.addClass('column-paid_green');
//     }
//
//     dealRow.find('[data-deal-price]').html(value.price);
//     dealRow.find('[data-deal-paid]').html(value.paid + ' ₽');
// }

//кнопка редактирования клиента
$(document).on('click', '[js-edit-client-btn]', function(event) {
    event.preventDefault();
    $(this).closest('[js-edit-client-form]').trigger('submit');
});
//form'a редактирование клиента
$(document).on('submit', '[js-edit-client-form]', function(event) {
    event.preventDefault();
    updateClient($(this).serializeObject());
});
function updateClient(formData) {
    $('[js-update-deal]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/clients/updateClient",
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            closeEdit();
            updateClientNameOnFront(data);
            updateClientLinkOnFront(data);
            updateClientPhoneOnFront(data);
            updateClientNameOnList(data);
            $('[js-update-deal]').prop("disabled", false);
            $('[js-client-name-copy]').text(data.name);
            $('[js-client-name-copy]').attr('data-link', data.name);
        },
        error: function (data) {
            $('[js-update-deal]').prop("disabled", false);
        }
    });
}
function updateClientNameOnFront(value) {
    var clientRow = $('[data-client="' + value.id + '"]');
    clientRow.siblings('span').html(value.name);
}
function updateClientLinkOnFront(value) {
    var clientCell = $('[data-link-client="' + value.id + '"]');
    if (value.link === null || value.link === '') {
        clientCell.html('<div>—</div>');
    } else {
        clientCell.html('<div class="column-links">' +
            '<div js-copy-link class="column_mwidth column_mwidth-copy" data-link="' + value.link + '"></div>' +
            '<a href="' + value.link + '" target="_blank" class="column_mwidth column_mwidth-open"></a>' +
            '</div>');
    }
}
function updateClientPhoneOnFront(value) {
    var clientCell = $('[data-phone-client="' + value.id + '"]');
    if (value.phone === null || value.phone === '') {
        clientCell.html('<div>—</div>');
    } else {
        clientCell.html('<div js-copy-link class="client-phone" data-link="' + value.phone + '">' + value.phone + '</div>');
    }
}

function updateClientNameOnList(value) {
    var clientCard = $('[value="' + value.id + '"].js-client-id-l');
    var card = clientCard.closest('[js-client-card]');
    card.find('.client-card__title').html(value.name);
    card.find('.client-card__info-link').html(value.link);
    card.find('.client-card__info-phone').html(value.phone);
}
//скрыть сделку
var HIDE_DEAL_FORM;
$(document).on('click', '[js-hide-deal-btn]', function(event) {
    event.preventDefault();
    $('[dialog]').find('.dialog__title').html('Вы действительно хотите скрыть сделку?');
    $('[dialog]').find('.dialog__text').html('В данном случае информация о сделке не будет учитываться');
    $('[dialog]').find('[accept-dialog]').attr('hide-deal', '');
    $('[dialog]').addClass('is-open');
    HIDE_DEAL_FORM =  $(this).closest('[js-hide-deal-form]');
});

$(document).on('click', '[hide-deal]', function(event) {
    event.preventDefault();
    $('[dialog]').removeClass('is-open');
    HIDE_DEAL_FORM.trigger('submit');
});

$(document).on('submit', '[js-hide-deal-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var formData = $(this).serializeObject();
        hideDeal(formData);
    }
});
function hideDeal(formData) {
    $('[js-hide-deal-btn]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/deals/hideDeal",
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            $('[js-hide-deal-btn]').prop("disabled", false);
            updateHideForm(formData.id, true);
        },
        error: function (data) {
            $('[js-hide-deal-btn]').prop("disabled", false);
        }
    });
}
//раскрыть сделку
$(document).on('click', '[js-reveal-deal-btn]', function(event) {
    event.preventDefault();
    $(this).closest('[js-reveal-deal-form]').trigger('submit');
});

$(document).on('submit', '[js-reveal-deal-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var formData = $(this).serializeObject();
        revealDeal(formData);
    }
});
function revealDeal(formData) {
    $('[js-reveal-deal-btn]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/deals/revealDeal",
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            $('[js-reveal-deal-btn]').prop("disabled", false);
            updateHideForm(formData.id, false);
        },
        error: function (data) {
            $('[js-reveal-deal-btn]').prop("disabled", false);
        }
    });
}
function updateHideForm(idDeal, isHide) {
    var el = $('[data-hide-deal="' + idDeal + '"]');
    var form = el.closest('form');

    var billForm = $('[js-add-bill-form]').find('input[name="id"][value="' + idDeal + '"]').closest('[js-add-bill-form]');
    if (isHide) {
        form.removeAttr("js-hide-deal-form").attr("js-reveal-deal-form",'');
        var btn = form.find('[js-hide-deal-btn]');
        btn.removeAttr("js-hide-deal-btn").attr("js-reveal-deal-btn",'');
        btn.find('.hidden-btn_hide').removeClass('hidden-btn_hide').addClass('hidden-btn_reveal');
        btn.find('span').html('Восстановить сделку');

        billForm.addClass("hidden-deal");
    } else {
        form.removeAttr("js-reveal-deal-form").attr("js-hide-deal-form",'');
        var btn = form.find('[js-reveal-deal-btn]');
        btn.removeAttr("js-reveal-deal-btn").attr("js-hide-deal-btn",'');
        btn.find('.hidden-btn_reveal').removeClass('hidden-btn_reveal').addClass('hidden-btn_hide');
        btn.find('span').html('Скрыть сделку');

        billForm.removeClass("hidden-deal");
    }
}

$(document).on('click', '[js-update-deal-btn]', function(event) {
    event.preventDefault();
    $(this).closest('[js-update-deal-form]').trigger('submit');
});

$(document).on('submit', '[js-update-deal-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var formData = $(this).serializeObject();
        setDealInfo(formData);
    }
});

function setDealInfo(data) {
    $('[js-update-deal-btn]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/deals/getDeal",
        data: JSON.stringify(data),
        dataType: 'json',
        cache: false,
        success: function (data) {
            setUpdateDealInfo(data);
            $('[js-update-deal-btn]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-update-deal-btn]').prop("disabled", false);
        }
    });
}

function setUpdateStreams(idCourse){
    var formData = new FormData();
    formData.set('idCourse', Number(idCourse));

    $.ajax({
        type: "POST",
        url: "/head-manager-transactions/getStreamsByIdCourse",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            var seloption = '';
            $.each(data, function(index, stream){
                seloption += '<option value="' + stream.id + '">' + stream.startDate + '</option>';
            });

            $('[js-update-form-deal-start-date]').append(seloption);
        },
        error: function (data) {
        }
    });
}


$(document).on('click', '[js-update-deal]', function(event) {
    event.preventDefault();
    $('[js-update-form-deal]').trigger('submit');
});

$(document).on('submit', '[js-update-form-deal]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var formData = $(this).serializeObject();
        updateDeal(formData);
    }
});

function updateDeal(formData) {
    $('[js-update-deal]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/deals/updateDeal",
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            updateDealCard(data.idClient);
            $('[js-menu-update-deal]').removeClass('is-open');
            checkBodyHidden()
            updateDealAfterUpdateOnList(data);
            $('[js-update-deal]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-update-deal]').prop("disabled", false);
        }
    });
}

function updateDealAfterUpdateOnList(value) {
    var dealRow = $('[data-deal="' + value.id + '"]');
    dealRow.find('[data-deal-date-deal]').html(value.dealDate);

    dealRow.find('[data-deal-social]').removeClassWild("deal-social_*").addClass("deal-social_" + value.socialCode).addClass("deal-social_big");

    var course = value.course != null ? (value.course + (value.kind !== null && value.kind !== '' ? ' (' + value.kind + ')' : '')) : 'Целевая заявка' ;
    dealRow.find('[data-deal-course]').attr('title', course).html(course);
    dealRow.find('[data-deal-type]').html(value.type);
    dealRow.find('[data-deal-price]').html(value.price);

    var colPaid = dealRow.find('.column-paid');
    colPaid.removeClassWild('column-paid_*');
    if (value.price <= dealRow.find('[data-deal-paid]').html().replace(/\D+/g,"")) {
        colPaid.addClass('column-paid_green');
    }

    dealRow.find('[data-deal-start-date]').html(value.startDate);
    if (value.tag === null) {
        dealRow.find('[data-deal-tag]').html('<div>—</div>');
    } else {
        dealRow.find('[data-deal-tag]').html('<div title="' + value.tag + '" class="column-msg">' + value.tag + '</div>');
    }
    dealRow.find('[data-deal-mailing]').html(value.coupling);

    var select = dealRow.find('[js-form-status]');
    var form = select.parent($('form'));
    form.removeClassWild("deal-status__form_*").addClass("deal-status__form_" + value.statusCode);
    select.on('change', function (event) {
        event.preventDefault();
    });
    $("#" + $(select).attr('id') + " option:selected").removeAttr('selected');
    $("#" + $(select).attr('id')).val(value.status);

    var reminder = '';
    if (value.reminder) {
        reminder += '<div class="reminder-wrapper">' +
            '<div class="reminder-date" >' + value.reminderDate + '</div>' +
            '<div class="reminder-msg">' + value.reminderMessage + '</div>' +
            '</div>';
    }
    reminder += '<div class="reminder ' + (value.reminder ? (value.reminderExpiration ? 'reminder_red' : (value.reminderToday ? 'reminder_green' : 'reminder_gray')) : '') + '"></div>';
    if (value.reminder) {
        reminder += '<div class="reminder-d">' + value.reminderDate + '</div>';
    }

    dealRow.find('[data-deal-reminder]').html(reminder);

}

var IS_HIDDEN_DEAL;
$(document).on('submit', '[js-add-bill-form]', function(event) {
    event.preventDefault();
    IS_HIDDEN_DEAL = $(this).hasClass("hidden-deal");
    openBillsRedirect($(this).serializeObject(), IS_HIDDEN_DEAL);
});
function openBillsRedirect(data, isHidden) {
    if (isHidden) {
        openBills(data, "/api/bills/getHeadManagerHiddenBills");
    } else {
        openBills(data, "/api/bills/getHeadManagerBills");
    }
}
function openBills(formData, queryLink) {
    $('[js-add-bill-form]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: queryLink,
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            $('[js-bills-deal-id]').val(formData.id);
            createBills(data);
            $('[js-menu-bills]').addClass('is-open');
            checkBodyHidden()
            $('[js-add-bill-form]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-add-bill-form]').prop("disabled", false);
        }
    });
}

function createBills(billList) {
    $('[js-bills-body]').html('');

    if (billList.length > 0) {
        $('[js-bills]').addClass('is-open');
    } else {
        $('[js-bills]').removeClass('is-open');
    }
    checkBodyHidden()
    $.each(billList, function(index, value) {
        var response = "";
        response += '<div class="div-table__body-row">';

        // установка значения в в меню
        var seloption = "";
        $.each($paymentMethodList, function(index, value2){
            seloption += '<option value="'+ value2.title +'" data-code="' + value2.code + '">' + value2.title + '</option>';
        });

        //если статус 1 проверено, то зеленая иначе можно редактировать
        if (value.status === 2) {
            response += '<div class="div-table__body-col div-table__body-col_exxsmall div-table__body-col_center">' +
                '<div class="column_bstatus column_bstatus_checked"></div>' +
                '</div>';
        } else {
            response += '<div class="div-table__body-col div-table__body-col_exxsmall div-table__body-col_center">' +
                '<div class="column_bstatus column_bstatus_unchecked"></div>' +
                '</div>';
        }

        response += '<div class="div-table__body-col div-table__body-col_medium">' +
            '<div class="column-text">' + value.manager + '</div>' +
            '</div>';

        response += '<form b-update-bill-form action="#" class="edit-form-bill">' +
            '<input type="hidden" b-id-bill value="' + value.id + '" name="id" required>' +
            '<input type="hidden" value="' + value.idDeal + '" name="idDeal" required>' +
            '<input type="hidden" b-pm value="' + value.paymentMethod + '" name="paymentMethod">' +
            '<input type="hidden" b-pm-code value="' + value.paymentMethodCode + '" name="paymentMethodCode">' +
            '<div class="div-table__body-col div-table__body-col_small">' + value.billDate + '</div>';

        // add сумму
        response += '<div class="div-table__body-col div-table__body-col_center div-table__body-col_xsmall">' +
            '<input b-sum disabled name="sum" class="menu-input__input menu-input__input_small editable" value="'+ value.sum +'" placeholder="0 ₽">' +
            '</div>';

        response += '<div class="div-table__body-col div-table__body-col_xxsmall">' +
            '<div b-pm-wrapper class="pmethod-wrapper disabled">' +
            '<select b-pm-selector disabled class="column_pmethod-select column_pmethod_' + value.paymentMethodCode + '">' +
            seloption +
            '</select>' +
            '</div>' +
            '</div>';

        // add номер счета
        response +=   '<div class="div-table__body-col div-table__body-col_medium  div-table__body-col_center div-table__body-col_r10">' +
            '<input b-account-number disabled name="accountNumber" class="menu-input__input menu-input__input_small editable" value="'+ (value.accountNumber === null ? '' : value.accountNumber) +'" placeholder="—">' +
            '</div>';

        response += '<div class="div-table__body-col col-pay-date div-table__body-col_center div-table__body-col_medium ">' +
            '<div class="menu-input__wrapper menu-input__wrapper_xsmall">' +
            '<input b-pay-date disabled name="payDate" ' +
            'class="datepicker-here-cs menu-input__input menu-input__input_small editable" autocomplete="off" value="' + (value.payDate === null ? '' : value.payDate) + '" data-autoclose="true" placeholder="—"/>' +
            '</div></div>';

        // add оплачен/выставлен
        if (value.payDate === null) {
            response += '<div class="div-table__body-col div-table__body-col_small col-status">Выставлен</div>';
        } else {
            response += '<div class="div-table__body-col div-table__body-col_small col-status div-table__body-col_green">Оплачен</div>';
        }

        // add тип оплаты
        response += '<div class="div-table__body-col div-table__body-col_small">' + (value.paymentType === 'Новый клиент' ? 'Первый' : 'Доплата') + '</div>';

        // add ссылка
        if (value.link !== null && value.link !== '') {
            response += '<div class="div-table__body-col div-table__body-col_xxsmall div-table__body-col_center">' +
                '<div class="column-links"><div js-copy-link data-link="' + value.link + '" class="column_mwidth column_mwidth-copy"></div>' +
                '<a js-open-link href="' + value.link + '" target="_blank" class="column_mwidth column_mwidth-open"></a></div></div>';
        } else {
            response += '<div class="div-table__body-col div-table__body-col_xxsmall">' +
                '<div>—</div></div>';
        }
        response += '</form>';

        // add коммент
        response += '<div data-bill-id="' + value.id + '" class="div-table__body-col div-table__body-col_medium div-table__body-col_center">' +
            '<div class="column-links">' +
            ((value.comment === null)
                ? '<div js-add-sms-check js-check-btn class="column_mwidth column_mwidth-large column_mwidth_bordered div-table__body-col_center column_mwidth-add-check"></div>'
                : '<div js-delete-sms-check js-check-btn title="' + value.comment + '" class="column_mwidth column_mwidth-large column_mwidth_bordered div-table__body-col_center column_mwidth-delete-check"></div>') +
            ((value.billImage !== null && value.billImage !== '')
                ? '<a class="column-img column_mwidth column-img_large div-table__body-col_center" data-fancybox="gallery" href="../' + value.billImage + '">' +
                '<img src="/' + value.billImage + '">' +
                '</a>'
                : '<form js-upload-bill-form action="#" class="column_mwidth column_mwidth-large div-table__body-col_center div-table__body-col_fl" enctype="multipart/form-data">' +
                '<input type="hidden" value="' + value.id + '" name="id" required>' +
                '<input type="hidden" value="' + value.isHidden + '" name="isHidden" required>' +
                '<input type="hidden" value="' + value.idDeal + '" name="idDeal" required>' +
                '<input js-upload-bill accept="image/*,image/jpeg" class="input-file" name="file" type="file" id="file' + index + '"/>' +
                '<label for="file' + index + '" class="js-labelFile">' +
                '<span class="js-upload-file js-upload-file_small"></span>' +
                '</label>' +
                '</form>') +
            '</div>' +
            '</div>';

        response += '<div class="div-table__body-col div-table__body-col_center div-table__body-col_xxsmall">';

        if(value.isEditable) {
            response +=  '<div js-edit-btns class="column-links display-flex-none">' +
                '<div js-edit-bill-accept class="column_mwidth column_mwidth-accept"></div>' +
                '<div js-edit-bill-cancel class="column_mwidth column_mwidth-cancel"></div>' +
                '</div>' +
                '<div js-edit-menu class="column-links display-flex-none is-open">' +
                '<div js-edit-bill class="column_mwidth div-table__body-col_center column_mwidth-edit"></div>' +
                '<form js-delete-bill-form class="column-form" action="#">' +
                '<input type="hidden" value="' + value.id + '" name="id" required>' +
                '<button js-delete-bill type="button" class="column_mwidth column_mwidth-delete"></button>' +
                '</form>' +
                '</div>';
        }

        response += '</div>'+
            '</div>';

        $('[js-bills-body]').html($('[js-bills-body]').html() + response);
    });

    initDatePicker();
    initFancy();

    initEditBillForm();
    initCancelEditBill();
    initAcceptEditBill();
}
function initDatePickerPayDate() {
    $('.datepicker-here-pay').datepicker({
        autoClose: true,
        maxDate: new Date(),
        todayButton: true
    });
}
function initDatePicker() {
    $('.datepicker-here-cs').datepicker({
        autoClose: true,
        maxDate: new Date(),
        todayButton: true
    });
}
function initFancy() {
    $('[data-fancybox="gallery"]').fancybox({
        infobar: false,
        buttons: [
            "close"
        ],
    });
}
$(document).on('click', '[js-add-bill-up-client]', function(event) {
    var clientId = $(this).closest('.custom-table__body-row').find('[js-client-id]').val();
    var clientName = $(this).closest('.custom-table__body-row').find('[js-client-id]').siblings('span').html();

    setIdClient(clientId);

    $('[js-client-name-copy]').text(clientName);
    $('[js-client-name-copy]').attr('data-link', clientName);
});
$(document).on('change', '[js-upload-bill]', function(event) {
    var form = $(this).closest('[js-upload-bill-form]')
    var data = new FormData(form[0]);
    $('[js-upload-bill]').prop("disabled", true);
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/api/bills/uploadBill",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 300000,
        success: function (data) {
            updateBillImageOnList(data);

            var formData = form.serializeObject();
            formData['id'] = formData.idDeal;

            if (data.isHidden) {
                openBills(formData, "/api/bills/getHiddenBills");
            } else {
                openBills(formData, "/api/bills/getBills");
            }

            $('[js-upload-bill]').prop("disabled", false);
        },
        error: function (e) {
            console.log("ERROR : ", e);
            $('[js-upload-bill]').prop("disabled", false);
        }
    });
});
$(document).on('change', '[js-upload-bill-front]', function(event) {
    var form = $(this).closest('[js-upload-bill-form]');
    var data = new FormData(form[0]);
    $('[js-upload-bill-front]').prop("disabled", true);
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/api/bills/uploadBill",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 300000,
        success: function (data) {
            updateBillImageOnList(data);
            $('[js-upload-bill-front]').prop("disabled", false);
        },
        error: function (e) {
            console.log("ERROR : ", e);
            $('[js-upload-bill-front]').prop("disabled", false);
        }
    });
});
function updateBillImageOnList(billData) {
    var imageBillForm = $('[js-upload-bill-form][bill-image="' + billData.id + '"]');
    imageBillForm.replaceWith('<a class="column-img column-img_mr5" data-fancybox="gallery' + billData.id + '" href="/' + billData.billImage + '">' +
        '  <img src="/' + billData.billImage + '"></a>');
}

//активация редактирования формы
var BILLS_INFO_TEMP = {};

$(document).on('click', '[edit-bill]', function(event) {
    event.preventDefault();
    $(this).closest('[edit-menu]').removeClass('is-open').siblings('[edit-btns]').addClass('is-open');
    var list = {};
    var pd = $(this).closest('.custom-table__body-row').find('[b-pay-date]');
    pd.removeAttr('disabled');
    list['payDate'] = pd.val();

    var s = $(this).closest('.custom-table__body-row').find('[b-sum]');
    list['sum'] = s.val();
    s.val(s.val().replace(' ₽','')).removeAttr('disabled');

    $(this).closest('.custom-table__body-row').find('[b-pm-wrapper]').removeClass('disabled');
    $(this).closest('.custom-table__body-row').find('[b-pm-selector]').removeAttr('disabled');
    var pm = $(this).closest('.custom-table__body-row').find('[b-pm]');
    list['paymentMethod'] = pm.val();
    var pmCode = $(this).closest('.custom-table__body-row').find('[b-pm-code]');
    list['paymentMethodCode'] = pmCode.val();

    var an = $(this).closest('.custom-table__body-row').find('[b-account-number]');
    an.removeAttr('disabled');
    list['accountNumber'] = an.val();

    BILLS_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[b-id-bill]').val()] = list;
});

$(document).on('click', '[edit-bill-cancel]', function(event) {
    event.preventDefault();
    var values = BILLS_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[b-id-bill]').val()];

    $(this).closest('.custom-table__body-row').find('[b-pay-date]').val(values.payDate).attr("disabled", true);
    $(this).closest('.custom-table__body-row').find('[b-sum]').val(values.sum).attr("disabled", true);
    $(this).closest('.custom-table__body-row').find('[b-account-number]').val(values.accountNumber).attr("disabled", true);

    $(this).closest('.custom-table__body-row').find('[b-pm-wrapper]').addClass('disabled');
    $(this).closest('.custom-table__body-row').find('[b-pm-selector]')
        .removeClassWild("column_pmethod_*").addClass("column_pmethod_" + values.paymentMethodCode).attr("disabled", true);
    $(this).closest('.custom-table__body-row').find('[b-pm]').val(values.paymentMethod);
    $(this).closest('.custom-table__body-row').find('[b-pm-code]').val(values.paymentMethodCode);

    $(this).closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');
    delete BILLS_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[b-id-bill]').val()];
});

var ACCEPT_EDITE_BTN;
$(document).on('click', '[edit-bill-accept]', function(event) {
    event.preventDefault();
    ACCEPT_EDITE_BTN = $(this);

    var billData = new Object();
    billData.id = $(this).closest('.custom-table__body-row').find('[b-id-bill]').val();
    billData.idDeal = $(this).closest('.custom-table__body-row').find('[b-id-deal]').val();
    billData.paymentMethod = $(this).closest('.custom-table__body-row').find('[b-pm]').val();
    billData.paymentMethodCode = $(this).closest('.custom-table__body-row').find('[b-pm-code]').val();
    billData.sum = $(this).closest('.custom-table__body-row').find('[b-sum]').val();
    billData.accountNumber = $(this).closest('.custom-table__body-row').find('[b-account-number]').val();
    billData.payDate = $(this).closest('.custom-table__body-row').find('[b-pay-date]').val();

    $('[edit-bill-accept]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/bills/updateBill",
        data: JSON.stringify(billData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-pay-date]').val(data.payDate).attr("disabled", true);
            ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-sum]').val(data.sum + ' ₽').attr("disabled", true);
            ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-account-number]').val(data.accountNumber).attr("disabled", true);

            if(data.payDate === null || data.payDate === '') {
                ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('.column-bill__status').removeClass('column-bill__status_paid').html('Выставлен');
            } else {
                ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('.column-bill__status').addClass('column-bill__status_paid').html('Оплачен');
            }

            ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-pm-wrapper]').addClass('disabled');
            ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-pm-selector]')
                .removeClassWild("column_pmethod_*").addClass("column_pmethod_" + data.paymentMethodCode).attr("disabled", true);
            ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-pm]').val(data.paymentMethod);
            ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-pm-code]').val(data.paymentMethodCode);


            ACCEPT_EDITE_BTN.closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');
            delete BILLS_INFO_TEMP[data.id];

            $('[edit-bill-accept]').prop("disabled", false);
        },
        error: function (data) {
            var values = BILLS_INFO_TEMP[billData.id];

            ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-pay-date]').val(values.payDate).attr("disabled", true);
            ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-sum]').val(values.sum).attr("disabled", true);
            ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-account-number]').val(values.accountNumber).attr("disabled", true);
            ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-pm-wrapper]').addClass('disabled');
            ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-pm-selector]')
                .removeClassWild("column_pmethod_*").addClass("column_pmethod_" + values.paymentMethodCode).attr("disabled", true);
            ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-pm]').val(values.paymentMethod);
            ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-pm-code]').val(values.paymentMethodCode);

            ACCEPT_EDITE_BTN.closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');
            delete BILLS_INFO_TEMP[data.id];
            $('[edit-bill-accept]').prop("disabled", false);
        }
    });
});





//кнопка добавления напоминания
$(document).on('click', '[js-add-reminder-button]', function(event) {
    event.preventDefault();
    $(this).closest('[js-add-reminder-form]').trigger('submit');
});
//form'a напоминания
$(document).on('submit', '[js-add-reminder-form]', function(event) {
    event.preventDefault();
    openUpdateReminder($(this).find('[name="idDeal"]').val());
});
function openUpdateReminder(idDeal) {
    $('[js-add-reminder-button]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/deals/getReminder",
        data: JSON.stringify(idDeal),
        dataType: 'json',
        cache: false,
        success: function (data) {
            openReminderMenu(data);

            $('[js-add-reminder-button]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-add-reminder-button]').prop("disabled", false);
        }
    });
}
function openReminderMenu(data) {
    $('[js-update-form-reminder-id-deal]').val(data.idDeal);
    $('[js-update-form-reminder-date]').val(data.reminderDate);
    $('[js-update-form-reminder-msg]').html(data.reminderMessage);

    if (data.reminder) {
        $('[js-delete-reminder-block]').addClass('is-open');
    }

    $('[js-menu-update-reminder]').addClass('is-open');
    checkBodyHidden();
}
function clearReminderForm() {
    $('[js-update-form-reminder]').trigger('reset');
    $('[js-update-form-reminder-msg]').html('');
    $('[js-delete-reminder-block]').removeClass('is-open');
}

$(document).on('click', '[js-delete-reminder]', function (event) {
    event.preventDefault();

    var idDeal = $(this).closest('[js-update-form-reminder]').find('[name="idDeal"]').val();

    $('[js-delete-reminder]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/deals/deleteReminder",
        data: JSON.stringify(idDeal),
        dataType: 'json',
        cache: false,
        success: function (data) {
            updateDealCard($CLIENT);

            $('[data-deal="' + idDeal + '"]').find('[data-deal-reminder]').html('<div class="reminder"></div>');

            clearReminderForm();
            $('[js-menu-update-reminder]').removeClass('is-open');
            checkBodyHidden();

            $('[js-delete-reminder]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-delete-reminder]').prop("disabled", false);
        }
    });

})
$(document).on('click', '[js-update-reminder]', function (event) {
    event.preventDefault();
    $('[js-update-form-reminder]').trigger('submit');

});
$(document).on('submit', '[js-update-form-reminder]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var formData = $(this).serializeObject();
        updateReminder(formData);
    }
});
function updateReminder(formData) {
    $('[js-update-reminder]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/deals/saveReminder",
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            updateDealCard($CLIENT);
            updateReminderOnList(data);
            clearReminderForm();
            $('[js-menu-update-reminder]').removeClass('is-open');
            checkBodyHidden();

            $('[js-update-reminder]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-update-reminder]').prop("disabled", false);
        }
    });
}
function updateReminderOnList(value) {
    var dealRow = $('[data-deal="' + value.idDeal + '"]');

    var reminder = '';
    if (value.reminder) {
        reminder += '<div class="reminder-wrapper">' +
            '<div class="reminder-date" >' + value.reminderDate + '</div>' +
            '<div class="reminder-msg">' + value.reminderMessage + '</div>' +
            '</div>';
    }
    reminder += '<div class="reminder ' + (value.reminder ? (value.reminderExpiration ? 'reminder_red' : (value.reminderToday ? 'reminder_green' : 'reminder_gray')) : '') + '"></div>';
    if (value.reminder) {
        reminder += '<div class="reminder-d">' + value.reminderDate + '</div>';
    }

    dealRow.find('[data-deal-reminder]').html(reminder);
}


//кнопка открытия поиска клиента
$(document).on('click', '[js-search-client]', function(event) {
    resetSearchClientMenu();

    $('[js-menu-search]').addClass('is-open');
    checkBodyHidden();
});


//кнопка создания клиента
$(document).on('click', '[js-create-client-btn]', function(event) {
    event.preventDefault();
    $('[js-menu-search]').removeClass('is-open');
    $('[js-create-client-form]').trigger('submit');
});

$(document).on('submit', '[js-create-client-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        createClientCard();
    }
});
var CLIENT_DATA;
function createClientCard() {
    var cardInfo = {}
    cardInfo["name"] = $('[js-create-client-name]').val();
    cardInfo["createDate"] = $('[js-create-client-date]').val();
    cardInfo["idManager"] = $('[js-create-client-manager]').val();
    cardInfo["link"] = $('[js-create-client-link]').val();
    cardInfo["phone"] = $('[js-create-client-phone]').val();
    cardInfo["email"] = $('[js-create-client-email]').val();
    // cardInfo["comment"] = $('[js-create-client-comment]').val();

    $('[js-create-client-btn]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/clients/saveClientInfo",
        data: JSON.stringify(cardInfo),
        dataType: 'json',
        cache: false,
        success: function (data) {
            setClientCardInfo(data);
            // $('[js-create-client-form]').trigger('reset');
            $('[js-create-client-btn]').prop("disabled", false);
        },
        error: function (data) {
            CLIENT_DATA = data;
            $('[dialog]').find('.dialog__title').html('Хотите использовать его?');
            $('[dialog]').find('.dialog__text').html('В базе данных найден клиент с такими же данными');
            $('[dialog]').find('[accept-dialog]').attr('use-client', '');
            $('[dialog]').addClass('is-open');

            $('[js-create-client-btn]').prop("disabled", false);
        }
    });
}

//форма поиска клиента
$(document).on('submit', '[js-menu-search-form]', function(event) {
    event.preventDefault();
    var searchValue = $('[js-menu-search-input]').val();

    if ($.trim(searchValue) !== '') {
        var search = {}
        search["search"] = searchValue;
        $('[js-menu-search-input]').prop("disabled", true);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/api/clients/searchClients",
            data: JSON.stringify(search),
            dataType: 'json',
            cache: false,
            success: function (data) {
                $('[js-client-card-list]').html('');

                if (data.length === 0) {
                    $('[js-create-client]').prop('disabled', false);
                } else {
                    $('[js-create-client]').prop('disabled', true);

                    $.each(data, function (index, value) {
                        var response = $("<div/>").attr("js-client-card", "").attr("class", "client-card")
                            .append($("<input/>").attr("type", "hidden").attr("class", "js-client-id-l").attr("js-client-id", "").val(value.id))
                            .append($("<div/>").attr("class", "client-card__title").html(value.name))
                            .append($("<div/>").attr("class", "client-card__info")
                                .append($("<div/>").attr("class", "client-card__info-link").html(value.link))
                                .append($("<div/>").attr("class", "client-card__info-phone").html(value.phone)));
                        $('[js-client-card-list]').append(response);
                    });
                }

                $('[js-menu-search-input]').prop("disabled", false);
            },
            error: function (data) {
                $('[js-menu-search-input]').prop("disabled", false);
            }
        });
    }
});

$(document).on('click', '[js-create-deal]', function(event) {
    resetCreateDealForm();

    $('[js-menu-create-deal]').addClass('is-open');
    checkBodyHidden()
});

// сохранение сделки
var SAVE_DEAL_TYPE;
$(document).on('click', '[js-save-deal]', function(event) {
    event.preventDefault();
    SAVE_DEAL_TYPE = "s";
    $('[js-deal-form]').trigger('submit');
});
///сохранение сделки и открытие выставление счета
$(document).on('click', '[js-save-and-bill-deal]', function(event) {
    event.preventDefault();
    SAVE_DEAL_TYPE = "sb";
    $('[js-deal-form]').trigger('submit');
});


$(document).on('submit', '[js-deal-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var dealData = $(this).serializeObject();
        if (SAVE_DEAL_TYPE === 's') {
            createDeal(dealData);
        } else if (SAVE_DEAL_TYPE === 'sb') {
            createDealAndBill(dealData);
        }
    }
});

function createDeal(dealData) {
    $('[js-save-deal]').prop("disabled", true);
    $('[js-save-and-bill-deal]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/deals/saveDeal",
        data: JSON.stringify(dealData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            updateDealCard(dealData.idClient);
            $('[js-bill-deal-id]').val(data);
            $('[js-menu-create-deal]').removeClass('is-open');
            checkBodyHidden();

            // resetCreateDealForm();

            $('[js-save-deal]').prop("disabled", false);
            $('[js-save-and-bill-deal]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-deal]').prop("disabled", false);
            $('[js-save-and-bill-deal]').prop("disabled", false);
        }
    });
}
function createDealAndBill(dealData)    {
    $('[js-save-deal]').prop("disabled", true);
    $('[js-save-and-bill-deal]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/deals/saveDeal",
        data: JSON.stringify(dealData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            updateDealCard(dealData.idClient);
            $('[js-bill-deal-id]').val(data);
            $('[js-menu-create-deal]').removeClass('is-open');
            checkBodyHidden();

            // resetCreateDealForm();

            setBillInfo(dealData);
            $('[js-menu-bill]').addClass('is-open');
            checkBodyHidden();

            $('[js-save-deal]').prop("disabled", false);
            $('[js-save-and-bill-deal]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-deal]').prop("disabled", false);
            $('[js-save-and-bill-deal]').prop("disabled", false);
        }
    });
}
function setBillInfo(data) {
    $('[js-bill-info-product]').text(data.course);
    $('[js-bill-info-sum]').text(data.price);
    $('[js-bill-info-date]').text(data.dealDate);
}


//в меню создания
$(document).on('change', '[js-deal-form-sale-type]', function(event) {
    if ($(this).val() === 'traffic') {
        $('[js-deal-form-mailing-block]').addClass('is-open');
        checkBodyHidden()
    } else {
        $('[js-deal-form-mailing-block]').removeClass('is-open');
        $('[js-deal-form-mailing]').prop('checked', false);
        checkBodyHidden()
    }
});
//в меню создания
$(document).on('change', '[js-deal-form-product]', function(event) {
    $('[js-deal-form-price]').val($('option:selected', this).attr('data-price'));
    $('[js-deal-form-product-type]').val($('option:selected', this).attr('data-type'));
    $('[js-deal-form-product-id]').val($('option:selected', this).attr('data-id'));

    $list = createKindList($('option:selected', this).val());
    if ($list.length > 0) {
        $('[js-deal-form-kind]').html(createKindOptions($list));
        $('[js-deal-form-kind-block]').addClass('is-open');
    } else {
        $('[js-deal-form-kind-block]').removeClass('is-open');
        $('[js-deal-form-kind]').html('');
    }

    if ($('[product-types]').val() == 'курс' ) {
        setStreams($('[js-deal-form-start-date]'), $('option:selected', this).attr('data-id'));
    }
});


function setStreams(selector, idCourse){
    var formData = new FormData();
    formData.set('idCourse', Number(idCourse));

    $.ajax({
        type: "POST",
        url: "/head-manager-transactions/getStreamsByIdCourse",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            var seloption = '<option value="" disabled selected>Выберите дату старта</option>';
            $.each(data, function(index, stream){
                seloption += '<option value="' + stream.id + '">' + stream.startDate + '</option>';
            });

            selector.html(seloption);
        },
        error: function (data) {
        }
    });
}

$(document).on('submit', '[js-bill-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        saveBill($(this).serializeObject());
    }
});
function saveBill(billDate) {
    $('[js-save-bill]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/bills/saveBill",
        data: JSON.stringify(billDate),
        dataType: 'json',
        cache: false,
        success: function (data) {
            updateDealCard($CLIENT);
            $('[js-menu-bill]').removeClass('is-open');
            checkBodyHidden()
            $('[js-bill-form]').trigger('reset');

            $('[js-save-bill]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-bill]').prop("disabled", false);
        }
    });
}


$(document).on('click', '[js-save-bills]', function(event) {
    event.preventDefault();
    $('[js-bills-form]').trigger('submit');
});

$(document).on('submit', '[js-bills-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var billData = $(this).serializeObject();
        saveBillWithUpdate(billData);
    }
});
function saveBillWithUpdate(billData) {
    $('[js-save-bills]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/bills/saveBill",
        data: JSON.stringify(billData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            updateDealCard($CLIENT);
            billData['id'] = billData.idDeal;
            openBillsRedirect(billData, IS_HIDDEN_DEAL);
            $('[js-bills-form]').trigger('reset');

            $('[js-save-bills]').prop("disabled", false);
            BILLS_TEMP_INFO = {};
        },
        error: function (data) {
            $('[js-save-bills]').prop("disabled", false);
        }
    });
}

$(document).on('change', '[product-types]', function(event) {
    $('[js-deal-form-price]').val(0);
    $('[js-deal-form-start-date]').val('');

    $('#product-category option:selected').removeAttr('selected');
    $('#product-category option:first').prop('selected', true);

    var idType = $('option:selected', this).attr('data-id');
    if (idType == 2) {
        createProductOptions($coursesList, 'js-deal-form-product');
        $('[product-block]').removeClass('menu-input_close');
        $('[trial-block]').removeClass('menu-input_close');
        $('[product-category-block]').addClass('menu-input_close');
        $('[start-date-block]').removeClass('menu-input_close');
    } else if (idType == 3) {
        createEmptyProductOptions('js-deal-form-product');
        $('[product-category-block]').removeClass('menu-input_close');
        $('[product-block]').addClass('menu-input_close');
        $('[trial-block]').addClass('menu-input_close');
        $('[start-date-block]').addClass('menu-input_close');
    } else {
        $('[product-block]').addClass('menu-input_close');
        $('[trial-block]').addClass('menu-input_close');
        $('[product-category-block]').addClass('menu-input_close');
        $('[start-date-block]').addClass('menu-input_close');
    }
});

//список курсов
var $coursesList;
function setCoursesList(coursesList) {
    $coursesList = coursesList;
}
function createProductOptions(list, ident) {
    var seloption = "";
    seloption += '<option value="" disabled selected>Выберите продукт</option>';
    $.each(list, function(index, value2){
        seloption += '<option data-id="'+ value2.id + '" value="'+ value2.name +'" data-type="'+ value2.type + '" data-price="' + value2.price + '"">' + value2.name + '</option>';
    });
    $('[' + ident + ']').html(seloption);
}
function createEmptyProductOptions(ident) {
    $('[' + ident + ']').html('<option value="" disabled selected>Выберите продукт</option>');
}

//список продуков по категориям
var $productMap;
function setProductMap(productMap) {
    $productMap = productMap;
}
$(document).on('change', '[product-category]', function(event) {
    $('[js-deal-form-price]').val(0);
    var idCategory = $('option:selected', this).val();
    createProductOptions($productMap[idCategory], 'js-deal-form-product');
    $('[product-block]').removeClass('menu-input_close');

});

$(document).on('change', '[u-product-category]', function(event) {
    $('[js-update-form-deal-price]').val(0);
    var idCategory = $('option:selected', this).val();
    createProductOptions($productMap[idCategory], 'js-update-form-deal-pr');
    $('[u-product-block]').removeClass('menu-input_close');

});
$(document).on('change', '[u-product-types]', function(event) {
    $('[js-update-form-deal-price]').val(0);
    $('[js-update-form-deal-start-date]').html('<option value="" disabled selected>Выберите дату старта</option>');

    $('#u-product-category option:selected').removeAttr('selected');
    $('#u-product-category option:first').prop('selected', true);
    $('#js-update-form-deal-pr option:selected').removeAttr('selected');
    $('#js-update-form-deal-pr option:first').prop('selected', true);

    var idType = $('option:selected', this).attr('data-id');
    if (idType == 2) {
        createProductOptions($coursesList, 'js-update-form-deal-pr');
        $('[u-product-block]').removeClass('menu-input_close');
        $('[u-trial-block]').removeClass('menu-input_close');
        $('[u-product-category-block]').addClass('menu-input_close');
        $('[u-start-date-block]').removeClass('menu-input_close');
    } else if (idType == 3) {
        createEmptyProductOptions('js-update-form-deal-pr');
        $('[u-product-category-block]').removeClass('menu-input_close');
        $('[u-product-block]').addClass('menu-input_close');
        $('[u-trial-block]').addClass('menu-input_close');
        $('[u-start-date-block]').addClass('menu-input_close');
    } else {
        $('[u-product-block]').addClass('menu-input_close');
        $('[u-trial-block]').addClass('menu-input_close');
        $('[u-product-category-block]').addClass('menu-input_close');
        $('[u-start-date-block]').removeClass('menu-input_close');
    }
});
