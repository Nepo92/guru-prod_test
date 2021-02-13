$(document).on('click', '[js-update-product]', function(event){
    setProductInfo($(this));
});
function setProductInfo(btn) {
    var formData = new FormData();
    formData.set('id', btn.data('product'));

    $('[js-update-product]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getProduct",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            setProductTypes(btn);

            $('[up-product-id]').val(data.id);
            $('[up-product-name]').val(data.name);
            $('[up-product-vendor]').val(data.vendorCode);
            $('[up-product-price]').val(data.price);
            $('[up-product-description]').val(data.description);
            $("input[up-product-theme][value=" + data.theme + "]").prop("checked", true);
            $('[up-product-bg]').val(data.backgroundColor);

            if(!data.isUsed) {
                $('[update-footer]').html($('[update-footer]').html() +
                '<button delete-product type="button" class="button button_white button_right">' +
                '    <span>Удалить</span>' +
                '</button>');
            }

            $('[js-menu-update]').addClass('is-open');
            checkBodyHidden();
            $('[js-update-product]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-update-product]').prop("disabled", false);
        }
    });
}
$(document).on('click', '[delete-product]', function(event){
    var formData = new FormData();
    var currentId = $('[up-product-id]').val();
    formData.set('id', currentId);

    $('[delete-product]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "deleteProduct",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $('[data-product="' + currentId + '"]').remove();
            closeUpdateProductMenu();

            $('[delete-product]').prop("disabled", false);
        },
        error: function (data) {
            $('[delete-product]').prop("disabled", false);
        }
    });
});
$(document).on('click', '[js-menu-update-close-btn]', function(event){
    closeUpdateProductMenu();
});
$(document).on('click', '[js-update]', function(event){
    event.preventDefault();
    $('[js-update-form]').trigger('submit');
});
$(document).on('submit', '[js-update-form]', function(event){
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[js-update-form]')[0]);
        updateProduct(formData);
    }
});
function updateProduct(formData) {
    $('[js-update]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "updateProduct",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            updateProductBlock(data);

            closeUpdateProductMenu();

            $('[js-update]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-update]').prop("disabled", false);
        }
    });
}


$(document).on('click', '[js-create-product-type]', function(event){
    $('[js-menu-product-type]').addClass('is-open');
    setProjectInfo($(this));
    checkBodyHidden();
});

$(document).on('click', '[js-menu-product-type-close-btn]', function(event){
    $('[js-menu-product-type]').removeClass('is-open');
    $('[js-product-type-form]').trigger('reset');

    checkBodyHidden();
});

function setProjectInfo(btn) {
    var idProject = btn.closest('.products').data('project');
    $('[js-product-type-id-project]').val(idProject);

    var project = btn.closest('.products__title').find('.block-title').html();
    var projectTag = btn.closest('.products__title').find('.block-subtitle').html();
    $('[js-product-type-project]').html(project);
    $('[js-product-type-project-tag]').html(projectTag);
}

$(document).on('click', '[js-save-product-type]', function(event){
    event.preventDefault();
    $('[js-product-type-form]').trigger('submit');
});

$(document).on('submit', '[js-product-type-form]', function(event){
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[js-product-type-form]')[0]);
        saveProductType(formData);
    }
});

function saveProductType(formData) {
    $('[js-save-product-type]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "saveProductType",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            addProductType(data);

            $('[js-menu-product-type]').removeClass('is-open');
            $('[js-product-type-form]').trigger('reset');
            checkBodyHidden();
            $('[js-save-product-type]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-product-type]').prop("disabled", false);
        }
    });
}

function addProductType(data) {
    var projectProducts = $('[data-project="' + data.idProject + '"]');
    projectProducts.find('.tabs__list-wrapper').html('<div js-tab class="tab" data-tab="' + data.idProject + 'type' + data.id + '">' + data.name + '</div>'
        + projectProducts.find('.tabs__list-wrapper').html());

    projectProducts.find('.tabs__blocks').html(
        '<div js-tab-panel class="tab-content" data-type="2" data-tab="' + data.idProject + 'type' + data.id + '">' +
    '       <div class="tab-content__wrapper tab-content__wrapper_overflow-unset">' +
    '           <div class="products__list">' +
    '              <div js-create-product class="product-block product-block_create" data-type="' + data.id + '" data-project="' + data.idProject + '">' +
    '                  <div class="product-block__message">Добавить товар</div>' +
    '              </div>' +
    '          </div>' +
    '       </div>' +
    '    </div>' + projectProducts.find('.tabs__blocks').html());

    projectProducts.find('[js-tab]').first().trigger('click');
}


$(document).on('click', '[js-create-product]', function(event){
    $('[js-menu-product]').addClass('is-open');
    setProductTypes($(this));
    checkBodyHidden();
});

$(document).on('click', '[js-menu-product-close-btn]', function(event){
    closeProductMenu();
});

function closeProductMenu() {
    $('[js-menu-product]').removeClass('is-open');
    $('[js-product-form]').trigger('reset');

    $('.js-labelFile').removeClass('has-file');
    $('.js-fileName').html('Загрузите изображение (290x240px)');

    resetProductSelectors();
    checkBodyHidden();
}
function closeUpdateProductMenu() {
    $('[js-menu-update]').removeClass('is-open');
    $('[js-update-form]').trigger('reset');

    $('.js-labelFile').removeClass('has-file');
    $('.js-fileName').html('Загрузите изображение (290x240px)');

    $('[delete-product]').remove();
    resetProductSelectors();
    checkBodyHidden();
}
function setProductSelectors(btn) {
    $('[product-project]').val(btn.data('project'));

    var attr = btn.attr('data-type');
    if (typeof attr !== typeof undefined && attr !== false) {
        $('[product-type]').val(btn.data('type'));
    }
}

function resetProductSelectors() {
    $('[product-project] option:selected').removeAttr('selected');
    $('[product-type] option:selected').removeAttr('selected');
}
function setProductTypes(btn) {
    var formData = new FormData();
    formData.set('id', btn.data('project'));
    $.ajax({
        type: "POST",
        url: "getProductTypes",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            var seloption = "";
            $.each(data, function(index, value){
                seloption += '<option value="' + value.id + '">' + value.name + '</option>';
            });

            $('[product-type]').html(seloption);
            // $('#js-product-type').html(seloption);

            setProductSelectors(btn);
        },
        error: function (data) {
            setProductSelectors(btn);
        }
    });
}

$(document).on('click', '[js-save-product]', function(event){
    event.preventDefault();
    $('[js-product-form]').trigger('submit');
});

$(document).on('submit', '[js-product-form]', function(event){
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[js-product-form]')[0]);
        saveProduct(formData);
    }
});

function saveProduct(formData) {
    $('[js-save-product]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "saveProduct",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            addProduct(data);
            addProductToCommon(data);

            closeProductMenu();

            $('[js-save-product]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-product]').prop("disabled", false);
        }
    });
}
function updateProductBlock(data) {
    var prodBlock = createProduct(data);

    var product = $('[js-tab-panel][data-type!="all"]').find('.product-block[data-product="' + data.id + '"]');
    var productCommon = $('[js-tab-panel][data-type="all"]').find('.product-block[data-product="' + data.id + '"]');

    productCommon.replaceWith(prodBlock);

    if (product.data('project') === data.idProject &&  product.data('type') === data.idProductType) {
        product.replaceWith(prodBlock);
    } else {
        product.remove();
        addProduct(data)
    }
}

function addProduct(data) {
    var productList = $('.products[data-project="' + data.idProject + '"]').find('[js-tab-panel][data-type="' + data.idProductType + '"]').find('.products__list');

    productList.html( createProduct(data)
        + productList.html());
}
function addProductToCommon(data) {
    var productList = $('.products[data-project="' + data.idProject + '"]').find('[js-tab-panel][data-type="all"]').find('.products__list');

    productList.html( createProduct(data)
        + productList.html());
}
function createProduct(data) {
    return '<div js-update-product data-product="' + data.id + '" data-project="' + data.idProject + '" data-type="' + data.idProductType + '" class="product-block" style="background: ' + data.backgroundColor + ';">' +
        '                 <div class="product-block__wrapper ' + data.theme + '" >'
        + (data.backgroundImage !== null ?
            '                    <div class="product-block__background">' +
            '                       <img src="/' + data.backgroundImage + '" alt="">' +
            '                     </div>' : '' ) +
        '                     <div class="product-block__title">' + data.name + '</div>' +
        '                     <div class="product-block__type">' + data.productType + '</div>' +
        '                     <div class="product-block__text product-block__text_gray">Арт: ' + data.vendorCode + '</div>' +
        '                     <div class="product-block__text product-block__text_desc">' + data.description + '</div>' +
        '                     <div class="product-block__price">' + numberWithSpaces(data.price) + ' ₽</div>' +
        '                 </div>' +
        '              </div>';
}

$(document).on('change', '[js-bg-default]', function(event){
    var isChecked = $(this).is(':checked');
    $("[js-bg-default]").prop("checked", false).attr("checked", false).removeAttr("checked");

    if (isChecked) {
        $(this).prop("checked", true);
    }
});

$(document).on('click', '[js-update-category]', function(event){
    setCategoryInfo($(this));
});
$(document).on('click', '[js-menu-update-category-close-btn]', function(event){
    $('[js-menu-update-category]').removeClass('is-open');
    checkBodyHidden();
    $('[js-update-category-form]').trigger('reset');
});
function setCategoryInfo(btn) {
    var formData = new FormData();
    formData.set('id', btn.closest('.tab').data('cat'));

    $('[js-update-category]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getCategory",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $('[js-update-category-id]').val(data.id);
            $('[js-update-category-project]').val(data.idProject);
            $('[js-update-category-name]').val(data.name);
            if (data.isEmpty) {
                $('[delete-category-block]').addClass('is-open');
            } else {
                $('[delete-category-block]').removeClass('is-open');
            }

            $('[js-menu-update-category]').addClass('is-open');
            checkBodyHidden();
            $('[js-update-category]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-update-category]').prop("disabled", false);
        }
    });
}
$(document).on('click', '[js-delete-category]', function(event){
    deleteCategory($(this));
});

function deleteCategory(btn) {
    var idProductType = btn.siblings('[name="idDelete"]').val();
    var idProject = btn.siblings('[name="idProject"]').val();
    var formData = new FormData();
    formData.set('id', idProductType);

    $('[js-delete-category]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "deleteCategory",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            var categoryTab = $('[data-cat="' + idProductType + '"]').data('tab');
            $('[data-tab="' + categoryTab + '"]').remove();
            $('[data-project="' + idProject + '"]').find('[js-tab]').first().trigger('click');

            $('[js-menu-update-category]').removeClass('is-open');
            checkBodyHidden();
            $('[js-delete-category]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-delete-category]').prop("disabled", false);
        }
    });
}
$(document).on('click', '[js-save-update-category]', function(event){
    event.preventDefault();
    $('[js-update-category-form]').trigger('submit');
});
$(document).on('submit', '[js-update-category-form]', function(event){
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[js-update-category-form]')[0]);
        updateCategory(formData);
    }
});
function updateCategory(formData) {
    $('[js-save-update-category]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "updateCategory",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $('[js-tab][data-cat="' + data.id + '"]').find('span').html(data.name);
            $('.product-block[data-type="' + data.id + '"]').find('[category]').html(data.name);

            $('[js-menu-update-category]').removeClass('is-open');
            checkBodyHidden();

            $('[js-save-update-category]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-save-update-category]').prop("disabled", false);
        }
    });
}