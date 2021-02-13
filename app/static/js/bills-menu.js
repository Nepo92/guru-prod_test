$(document).on('click', '.datepicker-here-b', function(event){
    $('.datepicker.active').find('[data-action="today"]').trigger('click');
});
$(document).on('click', '.datepicker-here-deal', function(event){
    $('.datepicker.active').find('[data-action="today"]').trigger('click');
});
$(document).on('click', '.datepicker-here-cs', function(event){
    $('.datepicker.active').find('[data-action="today"]').trigger('click');
});

$(document).ready(function(){
    const $menuUpdateDeal = $('[js-menu-update-deal]');
    const $menuUpdateDealCloseBtn = $('[js-menu-update-deal-close-btn]');

    $menuUpdateDealCloseBtn.on('click', function() {
        $menuUpdateDeal.removeClass('is-open');
        checkBodyHidden()
    });


    const $updateDeal = $('[js-update-deal]');
    const $updateFormDeal = $('[js-update-form-deal]');

    $updateDeal.on('click', function() {
        event.preventDefault();
        $updateFormDeal.trigger('submit');
    });

    $updateFormDeal.submit(function (event) {
        event.preventDefault();
        if (validateForm(this)) {
            var formData = $(this).serializeObject();
            updateDeal(formData);
        }
    });

    const $menuClientCard = $('[js-menu-client-card]');
    const $menuClientCardCloseBtn = $('[js-menu-client-card-close-btn]');

    $menuClientCardCloseBtn.on('click', function () {
        $menuClientCard.removeClass('is-open');
        closeEdit();
        checkBodyHidden()
    });

    const $editClientBtn = $('[js-edit-client-btn]');
    const $editClientForm = $('[js-edit-client-form]');
    $editClientBtn.on('click', function (event) {
        event.preventDefault();
        $(this).closest('[js-edit-client-form]').trigger('submit');
    });

    $editClientForm.on('submit', function (event) {
        event.preventDefault();
        updateClient($(this).serializeObject());
    });

    $('[ js-copy-link]').on('click', function() {
        var $tmp = $("<textarea>");
        $("body").append($tmp);
        $tmp.val($(this).attr('data-link')).select();
        document.execCommand("copy");
        $tmp.remove();
    });

    initPayForm();
    initClearPayForm();

    $('.datepicker-here-b').datepicker({
        autoClose: true,
        maxDate: new Date(),
        todayButton: true,
        onSelect: function(formattedDate, date, inst) {
            PAYFORM.trigger('submit');
        }
    });

    //в меню редактирования
    $('[js-update-form-deal-sale-type]').on('change', function() {
        if ($(this).val() === 'traffic') {
            $('[js-update-form-deal-mailing-block]').addClass('is-open');
        } else {
            $('[js-update-form-deal-mailing-block]').removeClass('is-open');
            $('[js-update-form-deal-mailing]').prop('checked', false);
        }
    });
    //в меню редактирования
    $('[js-update-form-deal-pr]').on('change', function() {
        $('[js-update-form-deal-price]').val($('option:selected', this).attr('data-price'));
        $('[js-update-form-deal-product-type]').val($('option:selected', this).attr('data-type'));

        $list = createKindList($('option:selected', this).val());
        if ($list.length > 0) {
            $('[js-update-form-kind]').html(createKindOptions($list));
            $('[js-update-form-kind-block]').addClass('is-open');
        } else {
            $('[js-update-form-kind-block]').removeClass('is-open');
            $('[js-update-form-kind]').html('');
        }
    });

    const $menuBillsCloseBtn = $('[js-menu-bills-close-btn]');
    const $menuBills = $('[js-menu-bills]');

    $menuBillsCloseBtn.on('click', function() {
        $menuBills.removeClass('is-open');
        checkBodyHidden();
        BILLS_TEMP_INFO = {};
    });


    const $billsFrom = $('[js-bills-form]');
    const $saveBillsBtn = $('[js-save-bills]');

    $saveBillsBtn.on('click', function() {
        event.preventDefault();
        $billsFrom.trigger('submit');
    });

    $billsFrom.submit(function (event) {
        event.preventDefault();
        if (validateForm(this)) {
            var billData = $(this).serializeObject();
            saveBillWithUpdate(billData);
        }
    });

    const $dealFormSaleType= $('[js-deal-form-sale-type]');
    const $dealFormProduct= $('[js-deal-form-product]');

    $dealFormProduct.on('change', function() {
        $('[js-deal-form-price]').val($('option:selected', this).attr('data-price'));
        $('[js-deal-form-product-type]').val($('option:selected', this).attr('data-type'));

        $list = createKindList($('option:selected', this).val());
        if ($list.length > 0) {
            $('[js-deal-form-kind]').html(createKindOptions($list));
            $('[js-deal-form-kind-block]').addClass('is-open');
        } else {
            $('[js-deal-form-kind-block]').removeClass('is-open');
            $('[js-deal-form-kind]').html('');
        }
    });

    $dealFormSaleType.on('change', function() {
        if ($(this).val() === 'traffic') {
            $('[js-deal-form-mailing-block]').addClass('is-open');
            checkBodyHidden()
        } else {
            $('[js-deal-form-mailing-block]').removeClass('is-open');
            $('[js-deal-form-mailing]').prop('checked', false);
            checkBodyHidden()
        }
    });

    const $menuCreateDealCloseBtn = $('[js-menu-create-deal-close-btn]');
    const $menuCreateDeal = $('[js-menu-create-deal]');

    $menuCreateDealCloseBtn.on('click', function() {
        $menuCreateDeal.removeClass('is-open');
        checkBodyHidden()
    });


    const $createDealForm = $('[js-deal-form]');
    const $saveDealBtn = $('[js-save-deal]');

    $saveDealBtn.on('click', function(event) {
        event.preventDefault();
        $createDealForm.trigger('submit');
    });

    $createDealForm.submit(function (event) {
        event.preventDefault();
        if (validateForm(this)) {
            var dealData = $createDealForm.serializeObject();
            createDeal(dealData);
        }
    });

    openUpdateDealMenuF();
    openClientCard();
    editClientInfo();

    initDeleteBillFromList();
    initEditBillFromList();
    initCancelEditBillFromList();
    initAcceptEditBillFromList();
    initDatePickerCs();

    initFancy();

    $('.datepicker-here-deal').datepicker({
        autoClose: true,
        maxDate: new Date(),
        todayButton: true
    });
})

var PAYFORM;
function initPayForm() {
    $('[js-pay-date]').on('click', function () {
        PAYFORM = $(this).closest('[js-pay-form]');
    });

    $('[js-pay-form]').submit(function (event) {
        event.preventDefault();
        updateBillPayInfo($(this).serializeObject());
    });
}
function updateBillPayInfo(formData) {
    $('[js-pay-date]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "updateBillPayDate",
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            var row = PAYFORM.closest('.custom-table__body-row');
            row.find('.column-bill__status').addClass('column-bill__status_paid').html('Оплачен');

            var form = '<td class="custom-table__body-col col-pay-date custom-table__body-col_center">' +
                '<form js-pay-clear-form action="#" class="menu-input__wrapper menu-input__wrapper_small menu-input__wrapper_close">' +
                '<input type="hidden" value="' + formData.id + '" name="id" required>' +
                '<div js-pay-clear-date name="payDate" class="menu-input__input menu-input__input_small">' + formData.payDate + '</div>' +
                '</form></td>';

            row.find('.col-pay-date').html(form);
            initClearPayForm();

            $('[js-pay-date]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-pay-date]').prop("disabled", false);
        }
    });
}
function initClearPayForm() {
    $('[js-pay-clear-date]').on('click', function () {
        PAYFORM = $(this).closest('[js-pay-clear-form]');
        PAYFORM.trigger('submit');
    });

    $('[js-pay-clear-form]').submit(function (event) {
        event.preventDefault();
        clearBillPayInfo($(this).serializeObject());
    });
}
function clearBillPayInfo(formData) {
    $('[js-pay-clear-date]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "clearBill",
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            var row = PAYFORM.closest('.custom-table__body-row');
            row.find('.column-bill__status').removeClass('column-bill__status_paid').html('Выставлен');

            var form = '<td class="custom-table__body-col col-pay-date custom-table__body-col_center">' +
                '<form js-pay-form action="#" class="menu-input__wrapper menu-input__wrapper_small menu-input__wrapper_cal">' +
                '<input type="hidden" value="' + formData.id + '" name="id" required>' +
                '<input js-pay-date name="payDate" autocomplete="off" class="datepicker-here-b menu-input__input menu-input__input_small" data-autoclose="true" placeholder="Дата оплаты" required/>' +
                '</form></td>';
            row.find('.col-pay-date').html(form);

            initPayForm();
            initDatePicker();

            $('[js-pay-clear-date]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-pay-clear-date]').prop("disabled", false);
        }
    });
}
function initDatePicker() {
    $('.datepicker-here-b').datepicker({
        autoClose: true,
        todayButton: true,
        onSelect: function(formattedDate, date, inst) {
            PAYFORM.trigger('submit');
        }
    });
}

function initDatePickerCs() {
    $('.datepicker-here-cs').datepicker({
        autoClose: true,
        maxDate: new Date(),
        todayButton: true
    });
}
//редактирование сделки
function openUpdateDealMenuF() {
    var $updateDealForm = $('[js-update-deal-f]');
    var $updateDealBtn = $('[js-update-deal-b]');

    $updateDealBtn.on('click', function (event) {
        event.preventDefault();
        $(this).closest('[js-update-deal-f]').trigger('submit');
    });

    $updateDealForm.submit(function (event) {
        event.preventDefault();
        if (validateForm(this)) {
            var formData = $(this).serializeObject();
            setDealInfo(formData);
        }
    });
}
function setDealInfo(data) {
    $('[js-update-deal-btn]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "getDeal",
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
function setUpdateDealInfo(data) {
    $('#js-update-form-deal-status option:selected').removeAttr('selected');
    $('#js-update-form-deal-social option:selected').removeAttr('selected');
    $('#js-update-form-deal-pr option:selected').removeAttr('selected');
    $('#js-update-form-deal-sale-type option:selected').removeAttr('selected');

    $("#js-update-form-deal-status").val(data.status);
    $("#js-update-form-deal-social").val(data.social);
    $('[js-update-form-deal-deal-date]').val(data.dealDate);
    $("#js-update-form-deal-pr").val(data.course);
    $("#js-update-form-deal-sale-type").val(data.type);
    $('[js-update-form-deal-start-date]').val(data.startDate);

    $('[js-update-form-kind-block]').removeClass('is-open');
    $('[js-update-form-kind]').html('');
    var list = createKindList(data.course);
    if (list.length > 0) {
        $('[js-update-form-kind]').html(createKindOptions(list));
        $('[js-update-form-kind]').val(data.kind);
        $('[js-update-form-kind-block]').addClass('is-open');
    }

    $('[js-update-form-deal-mailing]').prop("checked", false);
    if (data.type === 'traffic') {
        $('[js-update-form-deal-mailing-block]').addClass('is-open');
        if (data.isMailing) {
            $('[js-update-form-deal-mailing]').prop("checked", true);
        } else {
            $('[js-update-form-deal-mailing]').prop("checked", false);
        }
    } else {
        $('[js-update-form-deal-mailing-block]').removeClass('is-open');
        $('[js-update-form-deal-mailing]').prop('checked', false);
    }
    $('[js-update-form-deal-trial]').prop('checked', data.trial);
    $('[js-update-form-deal-price]').val(data.price);
    $('[js-update-form-deal-tag]').val(data.tag);
    $('[js-update-form-deal-comment]').val(data.comment);
    $('[js-deal-open-lessons]').prop('checked', data.allModulesHomeworkAllowed);

    $('[js-update-form-deal-reminder]').prop("checked", false);
    if (data.reminder) {
        $('[js-update-form-deal-reminder-block]').addClass('is-open');
        $('[js-update-form-deal-reminder-btn]').removeClass('is-open');
        $('[js-update-form-deal-reminder]').prop("checked", true);
        $('[js-update-form-deal-reminder-date]').val(data.reminderDate);
        $('[js-update-form-deal-reminder-msg]').val(data.reminderMessage);
    } else {
        $('[js-update-form-deal-reminder-block]').removeClass('is-open');
        $('[js-update-form-deal-reminder-btn]').addClass('is-open');
        $('[js-update-form-deal-reminder]').prop("checked", false);
        $('[js-update-form-deal-reminder-date]').val('');
        $('[js-update-form-deal-reminder-msg]').val('');
    }

    $('[js-update-form-deal-product-type]').val(data.product);
    $('[js-update-form-deal-client]').val(data.idClient);
    $('[js-update-form-deal-manager]').val(data.idManager);
    $('[js-update-form-deal-id]').val(data.id);

    $('[js-menu-update-deal]').addClass('is-open');
    checkBodyHidden();
}
function updateDeal(formData) {
    $('[js-update-deal]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "updateDeal",
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            updateDealCard(data.idClient);
            $('[js-menu-update-deal]').removeClass('is-open');
            checkBodyHidden()
            updateBillAfterUpdateOnList(data);
            $('[js-update-deal]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-update-deal]').prop("disabled", false);
        }
    });
}
function updateBillAfterUpdateOnList(value) {
    var dealRow = $('[data-deal="' + value.id + '"]');

    var course = value.course + (value.kind !== null && value.kind !== '' ? ' (' + value.kind + ')' : '');
    dealRow.siblings('[data-bill-course]').attr('title', course).html(course);
}

//карта клиента
var $CLIENT;
function openClientCard() {
    $('[js-client-card]').on('click', function() {
        var clientId = $(this).find('[js-client-id]').val();

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "getClientInfo",
            data: JSON.stringify(clientId),
            dataType: 'json',
            cache: false,
            success: function (data) {
                setClientCardInfo(data);
            }
        });
    });
}
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

    setIdClient(data.id);
    updateDealCard($CLIENT);

    $('[js-menu-client-card]').addClass('is-open');
    checkBodyHidden()
}
function closeEdit() {
    $('[js-client-card-name]').attr("disabled", true);
    $('[js-client-card-comment]').attr("disabled", true);
    $('[js-client-card-link]').attr("disabled", true);
    $('[js-client-card-phone]').attr("disabled", true);
    $('[js-client-card-email]').attr("disabled", true);
    $('[js-edit-footer]').removeClass('is-open');
}
function editClientInfo() {
    $('[js-edit-btn]').on('click', function () {
        $('[js-client-card-name]').removeAttr('disabled');
        $('[js-client-card-comment]').removeAttr('disabled');
        $('[js-client-card-link]').removeAttr('disabled');
        $('[js-client-card-phone]').removeAttr('disabled');
        $('[js-client-card-email]').removeAttr('disabled');
        $('[js-edit-footer]').addClass('is-open');
    })
}
function updateClient(formData) {
    $('[js-update-deal]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "updateClient",
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            closeEdit();
            updateClientNameOnFront(data);
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
function updateDealCard(idClient) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "getDeals",
        data: JSON.stringify(idClient),
        dataType: 'json',
        cache: false,
        success: function (data) {
            var $dealList = $('[js-deals-list]');
            $dealList.html('');
            $.each(data, function(index, value) {

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

                var response = $("<div/>").attr("class", "deal deal_white")
                    .append($("<div/>").attr("class", "deal-wrapper")
                        .append($("<div/>").attr("class", "deal__wrapper deal__wrapper_bordered deal__wrapper_column")
                            .append($("<div/>").attr("class", "deal__title").html(value.course))
                            .append($("<div/>").attr("class", "deal__subtitle")
                                .append($("<div/>").attr("class", value.kind !== null ? "deal__kind deal__kind_del" : "deal__kind").html(value.kind))
                                .append($("<div/>").attr("class", "deal__date").html(value.createDate)))
                        )
                        .append($("<div/>").attr("class", "deal__wrapper deal__wrapper_bordered ")
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
                            .append($("<div/>").attr("class", "deal_bill")
                                .append($("<form/>").attr("js-add-bill-form", "").attr("action", "#")
                                    .append($("<input/>").attr("type", "hidden").attr("name", "id").val(value.id))
                                    .append($("<button/>").attr("js-add-bill-button", "").attr("class", "add-btn"))
                                )
                            )
                        )
                        .append($("<div/>").attr("class", "deal__wrapper deal__wrapper_column deal__wrapper_bordered")
                            .append($("<form/>").attr("js-deal-status-form","").attr("class", "deal__select deal__select_" + value.statusCode)
                                .append($("<input/>").attr("name", "id").attr("type", "hidden").val(value.id))
                                .append($("<select/>").attr("class","deal-select menu-input__input_select").attr("name","status").attr("js-deal-form-status","").html(seloption))
                            )
                        )
                        .append($("<div/>").attr("class", "deal__wrapper deal__wrapper_column deal__wrapper_bordered")
                            .append($("<div/>").attr("class", "deal__reminder")
                                .append($("<div/>").attr("class", "deal__reminder-title").html('Напоминание'))
                                .append($("<div/>").attr("class", "deal__reminder-date").html(value.reminderDate))
                            )
                            .append(reminder)
                        )
                        .append($("<div/>").attr("class", "deal__wrapper deal__wrapper_column deal__wrapper_bordered")
                            .append($("<div/>").attr("class", "menu-comment__input menu-comment__input menu-comment__input_deal menu-comment__input_deal-small")
                                .append($("<div/>").attr("class", "deal__comment").attr("title", value.comment).html(value.comment))
                            )
                        )
                        .append($("<div/>").attr("class", "deal__wrapper deal__wrapper_column")
                            .append($("<form/>").attr("class", "button_full").attr("action", "#").attr("js-update-deal-form", "")
                                .append($("<input/>").attr("name", "id").attr("type", "hidden").val(value.id))
                                .append($("<button/>").attr("type", "button").attr("class", "button button_white button_full").attr("js-update-deal-btn", "").html("Редактировать сделку"))
                            )
                        )
                    )
                $dealList.append(response);
            });

            changeStatus();
            $('[js-add-bill-form]').on('submit', function (event) {
                event.preventDefault();
                openBills($(this).serializeObject());
            });

            var $createDealBlock = $("<div/>").attr("js-create-deal", "").attr("class", "deal deal_create")
                .append($("<div/>").attr("class", "deal__btm-message").html('Добавить сделку'));

            $dealList.append($createDealBlock);

            $('[js-create-deal]').on('click', function() {
                $('[js-menu-create-deal]').addClass('is-open');
                checkBodyHidden()
            });

            openUpdateDealMenu();
        }
    });
}
function setIdClient(id) {
    $('[js-deal-form-client]').val(id);
    $CLIENT = id;
}
function changeStatus() {
    $('[js-deal-form-status]').on('change', function () {
        var form = $(this).parent($('[js-deal-status-form]'));
        form.removeClassWild("deal__select_*");
        var code = $('option:selected', this).attr('data-code');
        form.addClass("deal__select_" + code);

        var formData = form.serializeObject();
        formData['code'] = code;
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "updateDealStatus",
            data: JSON.stringify(formData),
            dataType: 'json',
            cache: false,
            success: function (data) {
               
            },
            error: function (data) {
                
            }
        });

    });
}
function openUpdateDealMenu() {
    var $updateDealForm = $('[js-update-deal-form]');
    var $updateDealBtn = $('[js-update-deal-btn]');

    $updateDealBtn.on('click', function (event) {
        event.preventDefault();
        $(this).closest('[js-update-deal-form]').trigger('submit');
    });

    $updateDealForm.submit(function (event) {
        event.preventDefault();
        if (validateForm(this)) {
            var formData = $(this).serializeObject();
            setDealInfo(formData);
        }
    });
}
function openBills(formData) {
    $('[js-add-bill-form]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "getBills",
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

        //селектор выбора типа оплаты
        // response += '<div class="div-table__body-col div-table__body-col_xxsmall">' +
        //         '<input type="hidden" value="' + value.paymentMethodId + '" name="paymentMethodId" required>' +
        //         '<div b-payment-method class="column_pmethod column_pmethod_' + value.paymentMethod + '"></div>' +
        //     '</div>';

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
                '<input type="hidden" value="' + value.idDeal + '" name="idDeal" required>' +
                '<input js-upload-bill accept="image/*,image/jpeg" class="input-file" name="file" type="file" id="file' + index + '"/>' +
                '<label for="file' + index + '" class="js-labelFile">' +
                '<span class="js-upload-file js-upload-file_small"></span>' +
                '</label>' +
                '</form>') +
            '</div>' +
            '</div>';
        // response += '<div data-bill-id="' + value.id + '"  class="div-table__body-col div-table__body-col_small">' +
        //     ((value.comment === null)
        //         ? '<div js-add-sms-check class="column_mwidth div-table__body-col_center column_mwidth-add-check"></div>'
        //         : '<div title="' + value.comment + '" js-delete-sms-check class="column_mwidth div-table__body-col_center column_mwidth-delete-check"></div>') +
        //     '</div>';
        //
        // // add image
        // if (value.billImage !== null && value.billImage !== '') {
        //     response +='<div class="div-table__body-col div-table__body-col_xxxsmall">' +
        //         '<a class="column-img" data-fancybox="gallery" href="../' + value.billImage + '">' +
        //         '<img src="/' + value.billImage + '">' +
        //         '</a></div>';
        // } else {
        //     response += '<div class="div-table__body-col div-table__body-col_xxxsmall">' +
        //         '<form js-upload-bill-form action="#" enctype="multipart/form-data">' +
        //         '<input type="hidden" value="' + value.id + '" name="id" required>' +
        //         '<input type="hidden" value="' + value.idDeal + '" name="idDeal" required>' +
        //         '<input js-upload-bill accept="image/*,image/jpeg" class="input-file" name="file" type="file" id="file' + index + '"/>' +
        //         '<label for="file' + index + '" class="js-labelFile">' +
        //         '<span class="js-upload-file"></span>' +
        //         '</label>' +
        //         '</form>' +
        //         '</div>';
        // }
        response += '<div class="div-table__body-col div-table__body-col_center div-table__body-col_xxsmall">';

        //если статус 1 проверено, то зеленая иначе можно редактировать
        if (value.status === 1 && value.isEditable) {
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

    initDatePickerCs();
    uploadImage();
    initFancy();
    // copyLink();
    // initDeleteBillForm();
    initEditBillForm();
    initCancelEditBill();
    initAcceptEditBill();
}
function uploadImage() {
    $('[js-upload-bill]').on('change', function () {
        var form = $(this).closest('[js-upload-bill-form]')
        var data = new FormData(form[0]);
        $('[js-upload-bill]').prop("disabled", true);
        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "uploadBill",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 300000,
            success: function (data) {
                var formData = form.serializeObject();
                formData['id'] = formData.idDeal;
                openBills(formData);
                $('[js-upload-bill]').prop("disabled", false);
            },
            error: function (e) {
                console.log("ERROR : ", e);
                $('[js-upload-bill]').prop("disabled", false);
            }
        });
    });
}
function initFancy() {
    $('[data-fancybox]').fancybox({
        infobar: false,
        buttons: [
            "close"
        ],
    });
}
// function copyLink() {
//     $('[ js-copy-link]').on('click', function() {
//         var $tmp = $("<textarea>");
//         $("body").append($tmp);
//         $tmp.val($(this).attr('data-link')).select();
//         document.execCommand("copy");
//         $tmp.remove();
//     });
// }
function saveBillWithUpdate(billData) {
    $('[js-save-bills]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "saveBill",
        data: JSON.stringify(billData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            updateDealCard($CLIENT);
            billData['id'] = billData.idDeal;
            openBills(billData);
            $('[js-bills-form]').trigger('reset');
            $('[js-bills-form]').find('[js-bill-account-number-wrapper]').removeClass('is-open');
            $('[js-save-bills]').prop("disabled", false);

            BILLS_TEMP_INFO = {};
        },
        error: function (data) {
            $('[js-save-bills]').prop("disabled", false);
        }
    });
}
//список статусов сделки
var $statusesList;
function setStatusesList(statusesList) {
    $statusesList = statusesList;
}
//список способов оплаты
var $paymentMethodList;
function setPaymentMethodList(paymentMethodList) {
    $paymentMethodList = paymentMethodList;
}

function createDeal(dealData) {
    $('[js-save-deal]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "saveDeal",
        data: JSON.stringify(dealData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            updateDealCard(dealData.idClient);
            $('[js-bill-deal-id]').val(data);
            $('[js-menu-create-deal]').removeClass('is-open');
            $('[js-deal-form-kind-block]').removeClass('is-open');
            $('[js-deal-form-kind]').html('');
            $('[js-deal-form-mailing-block]').removeClass('is-open');
            $('[js-deal-form-mailing]').prop("checked", false);
            $('[js-deal-form-trial]').prop("checked", false);
            $('[js-deal-form-reminder-block]').removeClass('is-open');
            $('[js-deal-form-reminder-btn]').addClass('is-open');
            $('[js-deal-form-reminder]').prop("checked", false);
            checkBodyHidden()
            $('[js-deal-form]').trigger('reset');
            $('[js-save-deal]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-deal]').prop("disabled", false);
        }
    });
}

//активация формы удаления счета
function initDeleteBillFromList() {
    $('[delete-bill]').on('click', function (event) {
        event.preventDefault();
        BILL_ROW = $(this);
        $(this).closest('[delete-bill-form]').trigger('submit');
    });

    $('[delete-bill-form]').submit(function (event) {
        event.preventDefault();
        if (validateForm(this)) {
            var formData = $(this).serializeObject();
            deleteBillFromList(formData);
        }
    });
}
//функция удаления счета
function deleteBillFromList(formData) {
    $('[delete-bill]').prop("disabled", true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "deleteBill",
        data: JSON.stringify(formData),
        dataType: 'json',
        cache: false,
        success: function (data) {
            BILL_ROW.closest('.custom-table__body-row').remove();
            $('[delete-bill]').prop("disabled", false);
        },
        error: function (data) {
            $('[delete-bill]').prop("disabled", false);
        }
    });
}
//активация редактирования формы
var BILLS_INFO_TEMP = {};
function initEditBillFromList() {

    // $('[b-pm-selector]').on('change', function () {
    //     $(this).removeClassWild("column_pmethod_*");
    //     var pm = $('option:selected', this).attr('value');
    //     var code = $('option:selected', this).attr('data-code');
    //     $(this).addClass("column_pmethod_" + code);
    //     $(this).closest('.custom-table__body-row').find('[b-pm]').val(pm);
    //     $(this).closest('.custom-table__body-row').find('[b-pm-code]').val(code);
    // });

    $('[edit-bill]').on('click', function (event) {
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

        // var c = $(this).closest('.custom-table__body-row').find('[b-comment]');
        // c.removeAttr('disabled');
        // list['comment'] = c.val();

        BILLS_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[b-id-bill]').val()] = list;
    });
}
function initCancelEditBillFromList() {
    $('[edit-bill-cancel]').on('click', function (event) {
        event.preventDefault();
        var values = BILLS_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[b-id-bill]').val()];

        $(this).closest('.custom-table__body-row').find('[b-pay-date]').val(values.payDate).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[b-sum]').val(values.sum).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[b-account-number]').val(values.accountNumber).attr("disabled", true);
        // $(this).closest('.custom-table__body-row').find('[b-comment]').val(values.comment).attr("disabled", true);

        $(this).closest('.custom-table__body-row').find('[b-pm-wrapper]').addClass('disabled');
        $(this).closest('.custom-table__body-row').find('[b-pm-selector]')
            .removeClassWild("column_pmethod_*").addClass("column_pmethod_" + values.paymentMethodCode).attr("disabled", true);
        $(this).closest('.custom-table__body-row').find('[b-pm]').val(values.paymentMethod);
        $(this).closest('.custom-table__body-row').find('[b-pm-code]').val(values.paymentMethodCode);

        $(this).closest('[edit-btns]').removeClass('is-open').siblings('[edit-menu]').addClass('is-open');
        delete BILLS_INFO_TEMP[$(this).closest('.custom-table__body-row').find('[b-id-bill]').val()];
    });
}
var ACCEPT_EDITE_BTN;
function initAcceptEditBillFromList() {
    $('[edit-bill-accept]').on('click', function (event) {
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
        // billData.comment = $(this).closest('.custom-table__body-row').find('[b-comment]').val();

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
                // ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-comment]').val(data.comment).attr("disabled", true);

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
                ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-sum]').val(values.sum + ' ₽').attr("disabled", true);
                ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-account-number]').val(values.accountNumber).attr("disabled", true);
                // ACCEPT_EDITE_BTN.closest('.custom-table__body-row').find('[b-comment]').val(values.comment).attr("disabled", true);

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
}
function validateForm(form) {

    $(form).validate({
        onkeyup: false,
        onfocusout: false,
        errorPlacement: function(label, element) {
            label.addClass('error-wrapper');
            label.insertAfter(element);
        },
        wrapper: 'span'
    });
    $(form).rules('add', {
        messages: {
            required: 'Заполните это поле.',
        }
    });

    return $(form).valid();
}
