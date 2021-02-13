var FILES = new FormData();
$(document).on('click', '[js-delete-doc]', function() {
    FILES.delete($(this).attr('data-file'));
    $(this).closest('.input-element__document-wrapper').remove();
});
$(document).on('change', '.input-upload-file', function() {
    setFiles(this.files);
    updateFiles($(this));
    $(this).val('');
});
function setFiles(files) {
    for (var i = 0; i < files.length; i++) {
        FILES.append(files[i].name, files[i]);
    }
}
function updateFiles(element) {

    var documents = '';
    for(var pair of FILES.entries()){
        var fileName = pair[1].name;
        var name = fileName.substr(0, fileName.lastIndexOf('.'));
        var type = fileName.substr(fileName.lastIndexOf('.') + 1, fileName.length);

        documents += '<div class="input-element__document-wrapper">' +
            '<div class="lesson-document lesson-document_full lesson-document_without-hover">' +
            '<div class="lesson-document__type lesson-document__type_' + type + '">' + type + '</div>' +
            '<div class="lesson-document__name">' + name + '</div>' +
            '</div>' +
            '<div data-file="' + fileName + '" js-delete-doc class="lesson-document__delete-btn"></div>' +
            '</div>';
    }

    element.closest('.menu-input').find('.input-element__documents-new').html(documents);
}

function addFilesToFormData(lessonData){
    for(var pair of FILES.entries()) {
        lessonData.append('files', pair[1]);
    }
}
function clearFiles(form) {
    form.find('.input-element__documents-new').html('');
    for(var pair of FILES.entries()) {
        FILES.delete(pair[0]);
    }
}