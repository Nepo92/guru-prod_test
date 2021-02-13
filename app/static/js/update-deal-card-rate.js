
//обновление карточек сделок
function updateDealCard(idClient) {
    if (typeof idClient !== "undefined") {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/api/deals/getDeals",
            data: JSON.stringify(idClient),
            dataType: 'json',
            cache: false,
            success: function (data) {
                var $dealList = $('[js-deals-list]');
                $dealList.html('');
                $.each(data, function(index, value) {
                    // установка значения в списке
                    updateDealPriceOnList(value);

                    var reminder = "";
                    if (value.reminder) {
                        reminder += '<div class="menu-comment__input menu-comment__input menu-comment__input_deal menu-comment__input_deal-violet">' +
                            '<div class="deal__comment" title="' + value.reminderMessage + '">' + value.reminderMessage + '</div></div>';
                    } else {
                        reminder += '<div class="menu-comment__input menu-comment__input menu-comment__input_deal menu-comment__input_deal-empty">' +
                            '<div class="deal__comment">Нет напоминаний</div></div>';
                    }

                    var response = $("<div/>").attr("class", "deal deal_low deal_white")
                        .append($("<div/>").attr("class", "deal-wrapper")
                            .append($("<div/>").attr("class", "deal__wrapper deal__wrapper_bordered deal__wrapper_column")
                                .append($("<div/>").attr("class", "deal__title").html(value.status === 1 ? 'Целевая заявка' : value.course))
                                .append($("<div/>").attr("class", "deal__subtitle")
                                    .append($("<div/>").attr("class", value.kind !== null ? "deal__kind deal__kind_del" : "deal__kind").html(value.kind))
                                    .append($("<div/>").attr("class", "deal__date").html(value.createDate)))
                            )
                            .append($("<div/>").attr("class", "deal__wrapper deal__wrapper_overflow deal__wrapper_bordered c-tooltip")
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
                            )
                            .append($("<div/>").attr("class", "deal__wrapper deal__wrapper_column deal__wrapper_bordered")
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
                                )
                            )
                            .append($("<div/>").attr("class", "deal__wrapper deal__wrapper_column")
                                .append($("<form/>").attr("class", "button_full").attr("action", "#").attr("js-view-deal-form", "")
                                    .append($("<input/>").attr("name", "id").attr("type", "hidden").val(value.id))
                                    .append($("<button/>").attr("type", "button").attr("class", "button button_white button_full").attr("js-view-deal-btn", "").html("Посмотреть сделку"))
                                )
                            )
                        );
                    $dealList.append(response);
                });
            }
        });
    }
}



$(document).on('click', '[js-menu-client-card-close-btn]', function(event){
    $('[js-menu-client-card]').removeClass('is-open');
    checkBodyHidden();
});
