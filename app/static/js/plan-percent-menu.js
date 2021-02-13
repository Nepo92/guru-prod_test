$(document).on('click', '[js-menu-update-percent-close-btn]', function(event){
    $('[js-menu-update-percent]').removeClass('is-open');
    checkBodyHidden();
});

$(document).on('click', '[js-update-percent]', function(event){
    event.preventDefault();
    $('[js-update-percent-form]').trigger('submit');
});
$(document).on('submit', '[js-update-percent-form]', function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[js-update-percent-form]')[0]);
        updatePlanPercent(formData);
    }
});
function updatePlanPercent(formData) {
    $('[js-update-percent]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "updatePlanPercents",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $.each(data, function(index, value) {
                $('[data-day="' + value.dayOfWeek + '"]').html(value.percent);
            });

            $('[js-menu-update-percent]').removeClass('is-open');
            checkBodyHidden();

            $('[js-update-percent]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-update-percent]').prop("disabled", false);
        }
    });
}




$(document).on('click', '[update-percent]', function(event){
    setPlanPercentInfo();
});
function setPlanPercentInfo(btn) {
    $('[update-percent]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getPlanPercents",
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $.each(data, function(index, value) {
                $('[day-of-week="' + value.dayOfWeek + '"]').val(value.percent);
            });

            setPercentsSum();

            $('[js-menu-update-percent]').addClass('is-open');
            checkBodyHidden();
            $('[update-percent]').prop("disabled", false);
        },
        error: function (data) {
            $('[update-percent]').prop("disabled", false);
        }
    });
}
function setPercentsSum() {
    var tempSum = getPercentSum();
    var sumBlock = $('[percents-sum]');

    if (tempSum < 100) {
        sumBlock.removeClass('grade-value_green').addClass('grade-value_red');
        $('[js-update-percent]').attr("disabled", "disabled");
    } else {
        sumBlock.removeClass('grade-value_red').addClass('grade-value_green');
        $('[js-update-percent]').removeAttr("disabled");
    }

    sumBlock.html(tempSum);
}
function getPercentSum() {
    var sum = 0;

    $('[day-of-week]').each(function() {
        sum += Number($(this).val());
    });

    return sum;
}

$(document).on('keyup', '[day-of-week]', function(event){
    var tempVal = $(this).val();

    if ($.isNumeric(tempVal) || tempVal === "") {
        var tempSum = getPercentSum();
        if (tempSum > 100) {
            $(this).val($(this).val() - (tempSum - 100));
        }
    } else {
        $(this).val('');
    }

    setPercentsSum();
});