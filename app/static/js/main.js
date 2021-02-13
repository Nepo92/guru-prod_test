// $(document).on('click', '.datepicker-here', function(event){
//     $('.datepicker.active').find('[data-action="today"]').trigger('click');
// });
// $(document).on('click', '.datepicker-here-b', function(event){
//     $('.datepicker.active').find('[data-action="today"]').trigger('click');
// });
// $(document).on('click', '.datepicker-here-deal', function(event){
//     $('.datepicker.active').find('[data-action="today"]').trigger('click');
// });
// $(document).on('click', '.datepicker-here-cs', function(event){
//     $('.datepicker.active').find('[data-action="today"]').trigger('click');
// });

$(document).ready(function(){
    var $mobileMenu = $('[js-mobile-menu]');
    var $openMobileMenu = $('[js-open-mobile-menu]');
    var $closeMobileMenu = $('[js-close-mobile-menu]');

    $openMobileMenu.click(function () {
        $mobileMenu.show();
        document.body.style.overflow = 'hidden';
    });

    $closeMobileMenu.click(function () {
       $mobileMenu.hide();
       document.body.style.overflow = 'auto';
    });

    const $filterForm = $('[filter-form]')
    const $filterParams = $filterForm.find('[filter-param]')
    const $filterBtnParams = $filterForm.find('[filter-param-btn]')
    const $filterParamsInput = $filterForm.find('[filter-param-input]')

    const $paramDateType = $('[filter-param-date-type]');
    const $paramYear = $('[filter-param-year]');
    $paramDateType.on('change', function() {
        clearFilterDate();
    })

    $paramYear.on('change', function() {
        clearFilterDate();
    })

    $filterParams.on('change', function () {
        $filterForm.trigger('submit')
    })

    $filterParamsInput.keydown(function (e) {
        if (e.keyCode == 13) {
            $filterForm.trigger('submit')
        }
    });


    const $filterBtn = $('[filter-btn]')
    const $filterBlock = $('.filter.custom-lg-2')
    const $contentBlock = $('.custom-lg-10')
    $filterBtn.on('click', function () {
        $(this).toggleClass('filter__btn_active')
        $filterForm.toggleClass('filter__wrapper_none')
        $filterBlock.toggleClass('custom-lg-2_active')
        $contentBlock.toggleClass('custom-lg-10_active')
    })

    const $accardionBtn = $('.table-body__accordion')
    $accardionBtn.on('click', function () {
        const $block = $(this).attr('data-target');
        const $b = $($block);

        if (!$b.hasClass('collapsing') && !$b.hasClass('show')) {
            $(this).text('-')
        }
        if (!$b.hasClass('collapsing') && $b.hasClass('show')) {
            $(this).text('+')
        }
    })

    // const $settingSideBtn = $('.setting-said__btn');
    // const $settingSideList = $('.setting-said__list');
    // $settingSideBtn.on('click', function () {
    //     $settingSideList.toggleClass('setting-said__list_hide');
    // });
    // $(function() {
    //     $('.datepicker').mousedown(function() {
    //         $('.datepicker--cell').click(function() {
    //             $(this).parents('.datepicker').removeClass('active');
    //             $(this).parents('.datepicker').removeAttr('style');
    //         });
    //     });
    // });

    $('[js-copy-link]').on('click', function() {
        var $tmp = $("<textarea>");
        $("body").append($tmp);
        $tmp.val($(this).attr('data-link')).select();
        document.execCommand("copy");
        $tmp.remove();
    });


    $("form").submit(function () {
        setTimeout(function () {
            $("label.error").hide();
        }, 3000);
    });

    $("select").on('click', function () {
        setTimeout(function () {
            $("label.error").hide();
        }, 3000);
    });
    $("select").on('blur', function () {
        setTimeout(function () {
            $("label.error").hide();
        }, 3000);
    });
    $("select").on('focusout', function () {
        setTimeout(function () {
            $("label.error").hide();
        }, 3000);
    });
});

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$.fn.removeClassWild = function(mask) {
    return this.removeClass(function(index, cls) {
        var re = mask.replace(/\*/g, '\\S+');
        return (cls.match(new RegExp('\\b' + re + '', 'g')) || []).join(' ');
    });
};

function clearFilterDate() {
    $('[filter-param-date]').find('option[selected]').val('change');
    $('[filter-param-date]').append($('<option>', {
        value: '',
        text: ''
    }));
    $('[filter-param-date]').val('');
    $('[filter-form]').trigger('submit');
}

function checkBodyHidden() {
    if ($(".menu.is-open").length) {
        $('body').addClass('hiddenOverflow');
    } else {
        $('body').removeClass('hiddenOverflow');
    }
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


function removeAcceptBtnAttribute(btn) {
    btn.each(function() {
        var attributes = $.map(this.attributes, function(item) {
            return item.name;
        });

        var img = $(this);
        $.each(attributes, function(i, item) {
            if (item !== 'accept-dialog' && item !== 'class')  {
                img.removeAttr(item);
            }
        });
    });
}

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function validateCheckboxForm(form) {

    $(form).validate({
        onkeyup: false,
        onfocusout: false,
        errorPlacement: function(label, element) {
            label.addClass('error-wrapper');
            label.insertAfter(element.siblings('label').last());
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

