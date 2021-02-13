
var TEMP_ITEM_FILES = {};
$(document).on('change', '.upload-btn__item-file', function(element) {
    if (element.target.value) {
        var $filesGallery = $(this).closest('[upload-block]').find('[upload-list]'),
            $name = $(this).data('name');

        $.each(element.target.files, function(index, file) {
            var tmpPath = URL.createObjectURL(file);
            var id = tmpPath.split('\\').pop();

            var fl = element.target.value.split('\\').pop();
            var fileType = fl.split('.').pop();
            var fileName = fl.split('.').shift();
            if (fileType === 'doc' || fileType === 'docx' || fileType === 'pdf') {
                $filesGallery.prepend(
                    '<div id="' + id + '" class="gallery__item">' +
                    '   <div class="gallery-item gallery-item_small gallery-item_' + fileType + '">' +
                    '       <div class="gallery-item__title">' + fileType + '</div>' +
                    '       <div class="gallery-item__subtitle">' + fileName + '</div>' +
                    '   </div>' +
                    '   <span class="gallery__delete-btn"></span>' +
                    '</div>');
            } else {
                $filesGallery.prepend(
                    '<div id="' + id + '" class="gallery__item">' +
                    '   <a href="' + tmpPath + '" data-fancybox="' + file.name + '" class="gallery-item gallery-item_small">' +
                    '       <img class="gallery-item__preview" src="' + tmpPath + '">' +
                    '   </a>' +
                    '   <span class="gallery__delete-btn"></span>' +
                    '</div>');
            }

            var tmpFile = {};
            tmpFile['name'] = $name;
            tmpFile['file'] = file;

            TEMP_ITEM_FILES[id] = tmpFile;
        });
        $(this).val('');
    }
});
$(document).on('click', '.gallery__delete-btn', function(element) {
    var $file = $(this).closest('.gallery__item');
    delete TEMP_ITEM_FILES[$file.attr('id')];
    $file.remove();
});

function setFilesToFormData(formData) {
    $.each(TEMP_ITEM_FILES, function(index, file) {
        formData.append(file['name'], file['file']);
    });

    TEMP_ITEM_FILES = {};
}