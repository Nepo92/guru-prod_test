$(document).on('click', '[js-update-course]', function(event){
    setCourseInfo($(this));
});
function setCourseInfo(btn) {
    var formData = new FormData();
    formData.set('id', btn.data('course'));

    $('[js-update-course]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getCourse",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            setCourseSelectors(btn);
            $('[up-course-id]').val(data.id);

            $('[current-course]').attr('current-course', data.id);

            $('[up-course-name]').val(data.name);
            $('[up-course-price]').val(data.price);
            $("input[up-course-theme][value=" + data.theme + "]").prop("checked", true);
            $('[up-course-bg]').val(data.backgroundColor);

            if(!data.isUsed) {
                $('[update-footer]').html($('[update-footer]').html() +
                    '<button delete-course type="button" class="button button_white button_right">' +
                    '    <span>Удалить</span>' +
                    '</button>');
            }

            $('[js-menu-update]').addClass('is-open');
            checkBodyHidden();
            $('[js-update-course]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-update-course]').prop("disabled", false);
        }
    });
}
$(document).on('click', '[delete-course]', function(event){
    var formData = new FormData();
    var currentId = $('[up-course-id]').val();
    formData.set('id', currentId);

    $('[delete-course]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "deleteCourse",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $('[data-course="' + currentId + '"]').remove();
            closeUpdateCourseMenu();

            $('[delete-course]').prop("disabled", false);
        },
        error: function (data) {
            $('[delete-course]').prop("disabled", false);
        }
    });
});
$(document).on('click', '[js-menu-update-close-btn]', function(event){
    closeUpdateCourseMenu();
});
function closeUpdateCourseMenu() {
    $('[js-menu-update]').removeClass('is-open');
    $('[js-update-form]').trigger('reset');

    $('.js-labelFile').removeClass('has-file');
    $('.js-fileName').html('Загрузите изображение (290x240px)');

    $('[delete-course]').remove();

    //сбросить табы
    $('[js-update-form]').find('[js-tab]').trigger('click');

    resetCourseSelectors();
    checkBodyHidden();
}

$(document).on('click', '[js-create-course]', function(event){
    $('[js-menu-course]').addClass('is-open');
    setCourseSelectors($(this));
    checkBodyHidden();
});

$(document).on('click', '[js-menu-course-close-btn]', function(event){
    closeCourseMenu();
});

function closeCourseMenu() {
    $('[js-menu-course]').removeClass('is-open');
    $('[js-course-form]').trigger('reset');
    resetCourseSelectors();
    checkBodyHidden();
}
$(document).on('click', '[js-update]', function(event){
    event.preventDefault();
    $('[js-update-form]').trigger('submit');
});
$(document).on('submit', '[js-update-form]', function(event){
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[js-update-form]')[0]);
        updateCourse(formData);
    }
});
function updateCourse(formData) {
    $('[js-update]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "updateCourse",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            updateCourseBlock(data);

            closeUpdateCourseMenu();

            $('[js-update]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-update]').prop("disabled", false);
        }
    });
}
function updateCourseBlock(data) {
    var prodBlock = createCourse(data);

    var product = $('[js-tab-panel][data-type!="all"]').find('.product-block[data-course="' + data.id + '"]');
    var productCommon = $('[js-tab-panel][data-type="all"]').find('.product-block[data-course="' + data.id + '"]');

    productCommon.replaceWith(prodBlock);

    if (product.data('project') === data.idProject &&  product.data('type') === data.idCourseType) {
        product.replaceWith(prodBlock);
    } else {
        product.remove();
        addCourse(data)
    }
}

function addCourse(data) {
    var productList = $('.products[data-project="' + data.idProject + '"]').find('[js-tab-panel][data-type="' + data.idCourseType + '"]').find('.products__list');

    productList.html( createCourse(data)
        + productList.html());
}
function addCourseToCommon(data) {
    var productList = $('.products[data-project="' + data.idProject + '"]').find('[js-tab-panel][data-type="all"]').find('.products__list');

    productList.html( createCourse(data)
        + productList.html());
}
function createCourse(data) {
    return '<div js-update-course data-course="' + data.id + '" data-project="' + data.idProject + '" data-type="' + data.idCourseType + '" class="product-block" style="background: ' + data.backgroundColor + ';">' +
        '                 <div class="product-block__wrapper ' + data.theme + '" >'
        + (data.backgroundImage !== null ?
            '                    <div class="product-block__background">' +
            '                       <img src="/' + data.backgroundImage + '" alt="">' +
            '                     </div>' : '' ) +
        '                     <div class="product-block__title">' + data.name + '</div>' +
        '                     <div class="product-block__type">' + data.courseType + '</div>' +
        '                     <div class="product-block__price">' + numberWithSpaces(data.price) + ' ₽</div>' +
        '                 </div>' +
        '              </div>';
}

$(document).on('click', '[js-save-course]', function(event){
    event.preventDefault();
    $('[js-course-form]').trigger('submit');
});

$(document).on('submit', '[js-course-form]', function(event){
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[js-course-form]')[0]);
        saveCourse(formData);
    }
});

function saveCourse(formData) {
    $('[js-save-course]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "saveCourse",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            addCourse(data);
            addCourseToCommon(data);

            closeCourseMenu();

            $('[js-save-course]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-course]').prop("disabled", false);
        }
    });
}

function setCourseSelectors(btn) {
    $('[course-project]').val(btn.data('project'));

    var attr = btn.attr('data-type');
    if (typeof attr !== typeof undefined && attr !== false) {
        $('[course-type]').val(btn.data('type'));
    }
}

function resetCourseSelectors() {
    $('[course-type]option:selected').removeAttr('selected');
    $('[course-project]option:selected').removeAttr('selected');
}

$(document).on('change', '[js-bg-default]', function(event){
    var isChecked = $(this).is(':checked');
    $("[js-bg-default]").prop("checked", false).attr("checked", false).removeAttr("checked");

    if (isChecked) {
        $(this).prop("checked", true);
    }
});

