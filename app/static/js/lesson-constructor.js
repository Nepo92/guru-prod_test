var LESSON_BLOCK_COUNTER = 0;

$(document).ready(function () {
    $(".sortableList").sortable({
        revert: true,
        placeholder: 'sortable-placeholder',
        stop: function(event, ui) {
            var type = ui.item.attr('data-type')
            if (typeof type !== typeof undefined && type !== false) {
                var replaced = '';
                if (type === 'video') {
                    replaced = '<div class="lesson-block draggable ui-draggable ui-draggable-handle ui-draggable-dragging ui-sortable-helper">' +
                        '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].index" type="hidden" required>' +
                        '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].type" value="video" type="hidden" required>' +
                        '                                        <div class="lesson-block__wrapper">' +
                        '                                            <div class="lesson-block__title">Видео</div>' +
                        '                                            <div class="lesson-elements">' +
                        '                                                <div class="lesson-elements__wrapper">' +
                        '                                                    <div class="lesson-element">' +
                        '                                                        <div class="lesson-element__title">Cсылку на видео *</div>' +
                        '                                                        <div class="lesson-element__wrapper">' +
                        '                                                            <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].value" type="text" required placeholder="Введите ссылку" class="lesson-element__input">' +
                        '                                                        </div>' +
                        '                                                    </div>' +
                        '                                                </div>' +
                        '                                            </div>' +
                        '                                        </div>' +
                        '                                        <div class="lesson-block__delete"></div>' +
                        '                                    </div>';
                } else if (type === 'text') {
                    replaced = '<div class="lesson-block draggable ui-draggable ui-draggable-handle ui-draggable-dragging ui-sortable-helper">' +
                        '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].index" type="hidden" required>' +
                        '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].type" value="text" type="hidden" required>' +
                        '                                        <div class="lesson-block__wrapper">' +
                        '                                            <div class="lesson-block__title">Текстовый блок</div>' +
                        '                                            <div class="lesson-elements">' +
                        '                                                <div class="lesson-elements__wrapper lesson-elements__wrapper_column">' +
                        '                                                    <div class="lesson-element">' +
                        '                                                        <div class="lesson-element__title">Заголовок *</div>' +
                        '                                                        <div class="lesson-element__wrapper">' +
                        '                                                            <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].title" type="text" required placeholder="Введите заголовок" class="lesson-element__input">' +
                        '                                                        </div>' +
                        '                                                    </div>' +
                        '                                                    <div class="lesson-element">' +
                        '                                                        <div class="lesson-element__title">Текст *</div>' +
                        '                                                        <div class="lesson-element__wrapper">' +
                        '                                                            <textarea name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].value" required placeholder="Введите текст" class="lesson-element__input lesson-element__input_textarea"></textarea>' +
                        '                                                        </div>' +
                        '                                                    </div>' +
                        '                                                </div>' +
                        '                                            </div>' +
                        '                                        </div>' +
                        '                                        <div class="lesson-block__delete"></div>' +
                        '                                    </div>';
                } else if (type === 'document') {
                    replaced = '<div class="lesson-block draggable ui-draggable ui-draggable-handle ui-draggable-dragging ui-sortable-helper">' +
                        '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].index" type="hidden" required>' +
                        '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].type" value="document" type="hidden" required>' +
                        '                                        <div class="lesson-block__wrapper">' +
                        '                                            <div class="lesson-block__title">Документ</div>' +
                        '                                            <div class="lesson-elements">' +
                        '                                                <div class="lesson-elements__wrapper lesson-elements__wrapper_column">' +
                        '                                                    <div class="lesson-element">' +
                        '                                                        <div class="lesson-element__title">Название *</div>' +
                        '                                                        <div class="lesson-element__wrapper">' +
                        '                                                            <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].title" type="text" required placeholder="Введите название" class="lesson-element__input">' +
                        '                                                        </div>' +
                        '                                                    </div>' +
                        '                                                    <div class="lesson-element">' +
                        '                                                        <div class="lesson-element__wrapper lesson-element__wrapper_list">' +
                        '                                                               <div class="file-loader">' +
                        '                                                                   <input type="file" name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].files" id="files' + LESSON_BLOCK_COUNTER + '" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx" class="file-loader__file file-loader__file_file" required>' +
                        '                                                                   <label for="files' + LESSON_BLOCK_COUNTER + '" class="file-loader__label"><span class="file-loader__title"></span></label>' +
                        '                                                               </div>' +
                        '                                                        </div>' +
                        '                                                    </div>' +
                        '                                                </div>' +
                        '                                            </div>' +
                        '                                        </div>' +
                        '                                        <div class="lesson-block__delete"></div>' +
                        '                                    </div>';
                }  else if (type === 'image') {
                    replaced = '<div class="lesson-block draggable ui-draggable ui-draggable-handle ui-draggable-dragging ui-sortable-helper">' +
                        '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].index" type="hidden" required>' +
                        '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].type" value="image" type="hidden" required>' +
                        '                                        <div class="lesson-block__wrapper">' +
                        '                                            <div class="lesson-block__title">Изображение</div>' +
                        '                                            <div class="lesson-elements">' +
                        '                                                <div class="lesson-elements__wrapper lesson-elements__wrapper_column">' +
                        '                                                    <div class="lesson-element">' +
                        '                                                        <div class="lesson-element__title">Название *</div>' +
                        '                                                        <div class="lesson-element__wrapper">' +
                        '                                                            <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].title" type="text" required placeholder="Введите название" class="lesson-element__input">' +
                        '                                                        </div>' +
                        '                                                    </div>' +
                        '                                                    <div class="lesson-element">' +
                        '                                                        <div class="lesson-element__wrapper lesson-element__wrapper_list">' +
                        '                                                               <div class="file-loader">' +
                        '                                                                   <input type="file" name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].files" id="files' + LESSON_BLOCK_COUNTER + '" accept=".png,.jpg,.jpeg" class="file-loader__file file-loader__file_image" required>' +
                        '                                                                   <label for="files' + LESSON_BLOCK_COUNTER + '" class="file-loader__label"><span class="file-loader__title"></span></label>' +
                        '                                                               </div>' +
                        '                                                        </div>' +
                        '                                                    </div>' +
                        '                                                </div>' +
                        '                                            </div>' +
                        '                                        </div>' +
                        '                                        <div class="lesson-block__delete"></div>' +
                        '                                    </div>';
                } else if (type === 'gallery') {
                    replaced = '<div class="lesson-block draggable ui-draggable ui-draggable-handle ui-draggable-dragging ui-sortable-helper">' +
                        '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].index" type="hidden" required>' +
                        '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].type" value="gallery" type="hidden" required>' +
                        '                                        <div class="lesson-block__wrapper lesson-block__wrapper_pb0">' +
                        '                                            <div class="lesson-block__title">Галлерея</div>' +
                        '                                            <div class="lesson-elements">' +
                        '                                                <div class="lesson-elements__wrapper lesson-elements__wrapper_column">' +
                        '                                                    <div class="lesson-element">' +
                        '                                                        <div class="lesson-element__title">Название *</div>' +
                        '                                                        <div class="lesson-element__wrapper">' +
                        '                                                            <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].title" type="text" required placeholder="Введите название" class="lesson-element__input">' +
                        '                                                        </div>' +
                        '                                                    </div>' +
                        '                                                    <div class="lesson-element">' +
                        '                                                        <div class="lesson-element__wrapper lesson-element__wrapper_list">' +
                        '                                                               <div class="file-loader file-loader_mb20">' +
                        '                                                                   <input type="file" data-name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].files" id="files' + LESSON_BLOCK_COUNTER + '" accept=".png,.jpg,.jpeg" class="file-loader__file file-loader__file_gallery" multiple>' +
                        '                                                                   <label for="files' + LESSON_BLOCK_COUNTER + '" class="file-loader__label"><span class="file-loader__title"></span></label>' +
                        '                                                               </div>' +
                        '                                                        </div>' +
                        '                                                    </div>' +
                        '                                                </div>' +
                        '                                            </div>' +
                        '                                        </div>' +
                        '                                        <div class="lesson-block__delete"></div>' +
                        '                                    </div>';
                } else if (type === 'question') {
                    replaced = '<div class="lesson-block draggable ui-draggable ui-draggable-handle ui-draggable-dragging ui-sortable-helper">' +
                        '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].index" type="hidden" required>' +
                        '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].type" value="question" type="hidden" required>' +
                        '                                        <div class="lesson-block__wrapper">' +
                        '                                            <div class="lesson-block__title">Открытый вопрос</div>' +
                        '                                            <div class="lesson-elements">' +
                        '                                                <div class="lesson-elements__wrapper lesson-elements__wrapper_column">' +
                        '                                                    <div class="lesson-element">' +
                        '                                                        <div class="lesson-element__wrapper">' +
                        '                                                            <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].blockValues[0].value" type="checkbox" id="images' + LESSON_BLOCK_COUNTER + '" class="checkbox" value="images">' +
                        '                                                            <label class="checkbox-label checkbox-label_gray" for="images' + LESSON_BLOCK_COUNTER + '" >Разрешить загружать изображения</label>' +
                        '                                                        </div>' +
                        '                                                    </div>' +
                        '                                                    <div class="lesson-element">' +
                        '                                                        <div class="lesson-element__wrapper">' +
                        '                                                            <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].blockValues[1].value" type="checkbox" id="files' + LESSON_BLOCK_COUNTER + '" class="checkbox" value="files">' +
                        '                                                            <label class="checkbox-label checkbox-label_gray" for="files' + LESSON_BLOCK_COUNTER + '" >Разрешить загружать файлы</label>' +
                        '                                                        </div>' +
                        '                                                    </div>' +
                        '                                                </div>' +
                        '                                            </div>' +
                        '                                        </div>' +
                        '                                        <div class="lesson-block__delete"></div>' +
                        '                                    </div>';
                }

                LESSON_BLOCK_COUNTER++;
                ui.item.replaceWith(replaced);
            }

            recheckLessonBlockIndex($(this).find('.lesson-block'));
        }
    });
    $(".draggable").draggable({
        connectToSortable: '.sortableList',
        helper: 'clone',
        revert: 'invalid'
    });
    $(".draggable").disableSelection();
});

function recheckLessonBlockIndex(blocks) {
    $.each(blocks, function(index, block) {
        $(block).find('[name$=".index"]').val(index);
    });
}

$(document).on('click', '.lesson-block__delete', function(event) {
    var block = $(this).closest('.lesson-block');
    var blockWrapper = block.closest('.lesson-content__blocks');

    block.remove();
    recheckLessonBlockIndex(blockWrapper.find('.lesson-block'));
});
var DELETE_LESSON_BLOCKS = [];
$(document).on('click', '.lesson-block__delete.update', function(event) {
    var block = $(this).closest('.lesson-block');
    DELETE_LESSON_BLOCKS.push(Number(block.find('[name$=".id"]').val()));
    var blockWrapper = block.closest('.lesson-content__blocks');

    block.remove();
    recheckLessonBlockIndex(blockWrapper.find('.lesson-block'));
});

$(document).on('click', '[lesson-tab]', function(event) {
    var currentBtn  = $(this);
    var formData = new FormData();
    formData.set('id', Number(currentBtn.attr('current-course')));

    $('[lesson-tab]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getModules",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            setCourseModules(data);

            var currentActiveId = currentBtn.data('tab');
            currentBtn.closest('.tabs__wrapper').find('[js-tab]').removeClass('active');
            currentBtn.addClass('active');
            currentBtn.closest('.tabs__wrapper').find('[js-tab-panel]').removeClass('is-open');
            currentBtn.closest('.tabs__wrapper').find('[js-tab-panel]').filter('[data-tab=' + currentActiveId + ']').addClass('is-open');

            $('[lesson-tab]').prop("disabled", false);
        },
        error: function (data) {
            $('[lesson-tab]').prop("disabled", false);
        }
    });
});

function setCourseModules(data) {
    $('[modules-list]').html('');
    $.each(data, function(index, module){
        $('[modules-list]').append(createModule(module, (index+1)));

        var lessonWrapper = $('[data-module="' + module.id + '"]').find('.module__lessons');
        var lessonCount = lessonWrapper.find('.module__lesson').length + 1;

        $.each(module.lessonList, function(index, lesson){
            lessonWrapper.append(createLesson(lesson, lessonCount));
            lessonCount++;
        });
    });

}

$(document).on('click','[js-delete-module]',function (event) {
    event.stopPropagation();
    if (!confirm('Вы действительно хотите удалить модуль?')){
        return;
    }
    console.log('deleteModule', $(this).data('module-id'));
    var idModule = $(this).data('module-id');
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "deleteModule",
        data: JSON.stringify(idModule),
        dataType: 'json',
        cache: false,
        success: function (data) {
            $('.module[data-module="' + idModule + '"]').remove();
        },
        error: function (data) {
        }
    });
});

$(document).on('click','[js-delete-lesson]',function (event) {
    event.stopPropagation();
    if (!confirm('Вы действительно хотите удалить урок?')){
        return;
    }
    console.log('deleteLesson', $(this).data('lesson-id'));
    var idLesson = $(this).data('lesson-id');
    var isHomework = ($(this).data('lesson-homework') == 'true')
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "deleteLesson",
        data: JSON.stringify(idLesson),
        dataType: 'json',
        cache: false,
        success: function (data) {
            var $wrapper = $('.module__lesson[data-lesson="' + idLesson + '"]').parents('.module__wrapper');
            $('.module__lesson[data-lesson="' + idLesson + '"]').remove();
            if (isHomework){
                var $it = $wrapper.find('.homework-count');
                var count = parseInt($it.data('item-count')) - 1;
                $it.data('item-count', count);
                $it.html(count + ' домашнее задание')
            }else{
                var $it = $wrapper.find('.lesson-count');
                var count = parseInt($it.data('item-count')) - 1;
                $it.data('item-count', count);
                $it.html(count + ' уроков')
            }
        },
        error: function (data) {
        }
    });
});


$(document).on('click', '[add-module]', function(event) {
    $('[js-add-module-form]').trigger('reset');
    $('[js-add-module-form]').find('[img-title]').html('Загрузите изображение (410 х 280px)');

    $('[m-course-id]').val($(this).attr('current-course'));

    $('[js-menu-add-module]').addClass('is-open');
    checkBodyHidden();
});

$(document).on('click', '[js-menu-add-module-close-btn]', function(event){
    $('[js-menu-add-module]').removeClass('is-open');
    checkBodyHidden();
});

$(document).on('click', '[js-add-module]', function(event){
    event.preventDefault();
    $('[js-add-module-form]').trigger('submit');
});
$(document).on('submit', '[js-add-module-form]', function(event){
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[js-add-module-form]')[0]);
        saveModule(formData);
    }
});
function saveModule(formData) {
    $('[js-add-module]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "saveModule",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {

            setNewModule(data);

            $('[js-menu-add-module]').removeClass('is-open');
            checkBodyHidden();
            $('[js-add-module]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-add-module]').prop("disabled", false);
        }
    });
}

function setNewModule(module) {
    var moduleCount = $('[modules-list]').find('.module').length + 1;
    $('[modules-list]').append(createModule(module, moduleCount));
}

function createModule(module, index) {
    return '<div data-module="' + module.id + '" class="module">' +
        '                                                <div class="module__wrapper">' +
        '                                                    <div class="module__header collapsed"' +
        '                                                         data-toggle="collapse"' +
        '                                                         data-target="#module' + module.id + '"' +
        '                                                         aria-expanded="false"' +
        '                                                         aria-controls="module' + module.id + '">' +
        '                                                  <div js-delete-module class="module__header-delete" data-module-id="'+module.id+'">' +
        '                                                        <img src="/img/close.svg">' +
        '                                                  </div>' +
        '                                                        <div class="module-desc">' +
        '                                                            <div class="module-desc__number">' + index + '</div>' +
        '                                                            <div class="module-desc__wrapper">' +
        '                                                                <div class="module-name module-desc__title">' + module.name + '</div>' +
        '                                                                <div class="module-desc__desc">' +
        '                                                                    <div class="lesson-count module-desc__text module-desc__text_video" data-item-count="'+module.lessonCount+'">' + module.lessonCount + ' уроков</div>' +
        '                                                                    <div class="module-desc__delim"><span></span></div>' +
        '                                                                    <div class="homework-count module-desc__text module-desc__text_work" data-item-count="'+module.homeworkCount+'">' + module.homeworkCount + ' домашнее задание</div>' +
        '                                                                </div>' +
        '                                                            </div>' +
        '                                                        </div>' +
        '                                                        <div class="module__switch"></div>' +
        '                                                    </div>' +
        '                                                    <div class="module__body collapse" id="module' + module.id + '">' +
        '                                                        <div class="module__lessons">' +

    '                                                        </div>' +
    '                                                        <div class="modules__btn-wrapper">' +
    '                                                            <div add-lesson data-type="lesson" class="module-btn module-btn_low">+ Добавить урок</div>' +
        ((module.homeworkCount == 0) ? '                                                            <div add-lesson data-type="homework" class="module-btn module-btn_low">+ Добавить домашнее задание</div>':'') +
    '                                                        </div>' +
    '                                                    </div>' +
    '                                                </div>' +
    '                                                <div update-module class="module-setting"></div>' +
    '                                            </div>'
}

function createLesson(lesson, index) {
    var durationHour = Math.trunc(lesson.duration / 60);
    var durationMin = lesson.duration % 60;
    return '<div data-lesson="' + lesson.id + '" class="module__lesson">' +
        '<div js-delete-lesson class="module__lesson-delete" data-lesson-id="'+lesson.id+'" data-lesson-homework="'+(lesson.type=='homework')+'">' +
        '<img src="/img/close.svg">' +
        '</div>' +
        '<div class="module-desc">' +
        '<div class="module-desc__number">' + index + '</div>' +
        '<div class="module-desc__wrapper">' +
        '<div class="module-desc__title">' + lesson.title + '</div>' +
        '<div class="module-desc__desc">' +
        '<div class="module-desc__text module-desc__text_clock">' + durationHour + ' ч ' + durationMin + ' мин</div>' +
        '<div class="module-desc__delim"><span></span></div>' +
        '<div class="module-desc__text module-desc__text_document">' + lesson.documentsCounter + ' файла</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div update-lesson class="module__btn module__btn_right">'+(lesson.type=='homework' ? 'Настроить ДЗ':'Настроить урок')+'</div>' +
        '</div>';
}

$(document).on('click', '[update-module]', function(event) {
    var formData = new FormData();
    formData.append('id', Number($(this).closest('[data-module]').data('module')));

    $('[update-module]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getModule",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            setUpdateModuleInfo(data);

            $('[update-module]').prop("disabled", false);
        },
        error: function (data) {
            $('[update-module]').prop("disabled", false);
        }
    });
});

function setUpdateModuleInfo(module) {
    $('[js-update-module-form]').trigger('reset');
    $('[js-update-module-form]').find('[img-title]').html('Загрузите изображение (410 х 280px)');

    $('[u-module-name]').val(module.name);
    $('[u-module-description]').html(module.description);
    $('[u-module-access]').prop('checked', module.accessLimitation);
    $('[u-module-id]').val(module.id);

    $('[js-menu-update-module]').addClass('is-open');
    checkBodyHidden();
}

$(document).on('click', '[js-menu-update-module-close-btn]', function(event){
    $('[js-menu-update-module]').removeClass('is-open');
    checkBodyHidden();
});

$(document).on('click', '[js-update-module]', function(event){
    event.preventDefault();
    $('[js-update-module-form]').trigger('submit');
});
$(document).on('submit', '[js-update-module-form]', function(event){
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[js-update-module-form]')[0]);
        updateModule(formData);
    }
});
function updateModule(formData) {
    $('[js-update-module]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "updateModule",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $('[data-module="' + data.id + '"]').find('.module-name').html(data.name);

            $('[js-menu-update-module]').removeClass('is-open');
            checkBodyHidden();
            $('[js-update-module]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-update-module]').prop("disabled", false);
        }
    });
}

$(document).on('click', '[add-lesson]', function(event){
    $('.constructor-blocks.add-lesson').find('.not-common').addClass('constructor-blocks__wrapper_hide');
    $('[js-add-lesson-form]').trigger('reset');
    $('[js-add-lesson-form]').find('.lesson-content__blocks').html('');
    TEMP_DATA = {};
    LESSON_BLOCK_COUNTER = 0;

    $('[a-lesson-module]').val($(this).closest('[data-module]').data('module'));
    $('[a-lesson-type]').val($(this).data('type'));

    if ($(this).data('type') === 'homework') {
        $('.constructor-blocks.add-lesson').find('.not-common').removeClass('constructor-blocks__wrapper_hide');
    }

    $('[js-menu-add-lesson]').addClass('is-open');
    checkBodyHidden();
});

$(document).on('click', '[js-menu-add-lesson-close-btn]', function(event){
    $('[js-menu-add-lesson]').removeClass('is-open');
    checkBodyHidden();
});

$(document).on('click', '[js-add-lesson]', function(event){
    event.preventDefault();
    $('[js-add-lesson-form]').trigger('submit');
});
$(document).on('submit', '[js-add-lesson-form]', function(event){
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[js-add-lesson-form]')[0]);
        $.each(TEMP_DATA, function(index, file) {
            formData.append(file['name'], file['file']);
        });

        saveLesson(formData);
    }
});
function saveLesson(formData) {
    $('[js-add-lesson]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "saveLesson",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            var lessonWrapper = $('[data-module="' + data.idModule + '"]').find('.module__lessons');
            var lessonCount = lessonWrapper.find('.module__lesson').length + 1;

            lessonWrapper.append(createLesson(data, lessonCount));

            updateModuleInfo(data.idModule);

            $('[js-menu-add-lesson]').removeClass('is-open');
            checkBodyHidden();
            $('[js-add-lesson]').prop("disabled", false);
            hideLoader();
        },
        error: function (data) {
            $('[js-add-lesson]').prop("disabled", false);
            hideLoader();
        },
        beforeSend: function() {
            showLoader();
        },
        afterSend: function() {
            hideLoader();
        }
    });
}
function updateModuleInfo(idModule) {
    var formData = new FormData();
    formData.append('id', Number(idModule));
    $.ajax({
        type: "POST",
        url: "getModule",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $('[data-module="' + data.id + '"]').find('.lesson-count').data('item-count', data.lessonCount).html(data.lessonCount + ' уроков');
            $('[data-module="' + data.id + '"]').find('.homework-count').data('item-count', data.homeworkCount).html(data.homeworkCount + ' домашнее задание');
            if (data.homeworkCount > 0){
                $('[data-module="' + data.id + '"]').find('[add-lesson][data-type="homework"]').hide();
            }else{
                $('[data-module="' + data.id + '"]').find('[add-lesson][data-type="homework"]').show();
            }
        },
        error: function (data) {
        }
    });
}

$(document).on('change', '.file-loader__file_file', function(element) {
    var $input = $(this),
        $label = $input.siblings('.file-loader__label');

    if (element.target.value) {
        var fileType = element.target.value.split('\\').pop().split('.').pop();
        $label.addClass('file-loader__label_attached');
        $label.after(
            '<div class="file-loader__file-preview file-loader__file-preview_' + fileType + '">' +
            '   <span class="file-loader__title">' + fileType + '</span>' +
            '</div>'+
            '<span class="file-loader__delete file-preview"></span>');
    }
});
$(document).on('click', '.file-loader__delete.file-preview', function(element) {
    deleteFilePreview($(this));
    $(this).remove();
});
function deleteFilePreview(block) {
    var $preview = block.siblings('.file-loader__file-preview'),
        $input = $preview.closest('.file-loader').find('.file-loader__file_file'),
        $label = $input.siblings('.file-loader__label');

    $preview.remove();
    $input.val('');
    $label.removeClassWild('file-loader__label_*');
}

$(document).on('click', '.file-loader__delete.file-preview_update', function(element) {
    deleteFilePreview($(this));
    $(this).siblings('input').attr('required', 'required');
    $(this).remove();
});

$(document).on('change', '.file-loader__file_image', function(element) {
    var $input = $(this),
        $label = $input.siblings('.file-loader__label');

    if (element.target.value) {
        var tmpPath = URL.createObjectURL(element.target.files[0]);
        $label.addClass('file-loader__label_attached');
        $label.after(
            '<a class="file-loader__preview" href="' + tmpPath + '" data-fancybox="' + element.target.value.split('\\').pop() + '">' +
            '    <img src="' + tmpPath + '">' +
            '</a>' +
            '<span class="file-loader__delete preview"></span>');
    }
});

$(document).on('click', '.file-loader__delete.preview', function(element) {
    deleteImagePreview($(this));
    $(this).remove();
});
function deleteImagePreview(block) {
    var $preview = block.siblings('.file-loader__preview'),
        $input = $preview.closest('.file-loader').find('.file-loader__file_image'),
        $label = $input.siblings('.file-loader__label');

    $preview.remove();
    $input.val('');
    $label.removeClassWild('file-loader__label_*');
}
$(document).on('click', '.file-loader__delete.preview_update', function(element) {
    deleteImagePreview($(this));
    $(this).siblings('input').attr('required', 'required');
    $(this).remove();
});

var TEMP_DATA = {};
$(document).on('change', '.file-loader__file_gallery', function(element) {
    if (element.target.value) {
        var $loader = $(this).closest('.file-loader'),
            $name = $(this).data('name');

        $.each(element.target.files, function(index, file) {
            var tmpPath = URL.createObjectURL(file);

            $loader.before(
                '<div class="file-loader file-loader_mb20">' +
                '   <a class="file-loader__preview" href="' + tmpPath + '" data-fancybox="' + file.name + '">' +
                '       <img src="' + tmpPath + '">' +
                '   </a>'+
                '<span class="file-loader__delete gallery"></span>' +
                '</div>');

            var tmpFile = {};
            tmpFile['name'] = $name;
            tmpFile['file'] = file;

            TEMP_DATA[tmpPath] = tmpFile;
        });
        $(this).val('');
    }
});

$(document).on('click', '.file-loader__delete.gallery', function(element) {
    var $loader = $(this).closest('.file-loader');

    delete TEMP_DATA[$loader.find('img').attr('src')];

    $loader.remove();
});

var DELETE_GALLERY = [];
$(document).on('click', '.file-loader__delete.gallery_update', function(element) {
    var $loader = $(this).closest('.file-loader');

    DELETE_GALLERY.push(Number($loader.data('gallery')));

    $loader.remove();
});

$(document).on('click', '[update-lesson]', function(event) {
    TEMP_DATA = {};
    LESSON_BLOCK_COUNTER = 0;
    DELETE_GALLERY = [];
    DELETE_LESSON_BLOCKS = [];

    var formData = new FormData();
    formData.set('id', Number($(this).closest('[data-lesson]').data('lesson')));

    $('[update-lesson]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getModuleLessonWithBlocks",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $('[u-lesson-id]').val(data.id);
            $('[u-lesson-title]').val(data.title);
            $('[u-lesson-duration]').val(data.duration);

            setUpdateLessonBlock(data.lessonBlocks);

            $('[js-menu-update-lesson]').addClass('is-open');
            checkBodyHidden();

            $('[update-lesson]').prop("disabled", false);
        },
        error: function (data) {
            $('[update-lesson]').prop("disabled", false);
        }
    });
});

function setUpdateLessonBlock(blocks) {
    var blocksHtml = '';
    $.each(blocks, function(index, block) {
        if (block.type === 'video') {
            blocksHtml += '<div class="lesson-block draggable ui-draggable ui-draggable-handle ui-draggable-dragging ui-sortable-helper">' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].id" value="' + block.id + '" type="hidden" required>' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].index" value="' + block.index + '" type="hidden" required>' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].type" value="video" type="hidden" required>' +
                '                                        <div class="lesson-block__wrapper">' +
                '                                            <div class="lesson-block__title">Видео</div>' +
                '                                            <div class="lesson-elements">' +
                '                                                <div class="lesson-elements__wrapper">' +
                '                                                    <div class="lesson-element">' +
                '                                                        <div class="lesson-element__title">Cсылка на видео *</div>' +
                '                                                        <div class="lesson-element__wrapper">' +
                '                                                            <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].value" value="' + block.value + '" type="text" required placeholder="Введите ссылку" class="lesson-element__input">' +
                '                                                        </div>' +
                '                                                    </div>' +
                '                                                </div>' +
                '                                            </div>' +
                '                                        </div>' +
                '                                        <div class="lesson-block__delete update"></div>' +
                '                                    </div>';
        } else if (block.type === 'text') {
            blocksHtml += '<div class="lesson-block draggable ui-draggable ui-draggable-handle ui-draggable-dragging ui-sortable-helper">' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].id" value="' + block.id + '" type="hidden" required>' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].index" value="' + block.index + '" type="hidden" required>' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].type" value="text" type="hidden" required>' +
                '                                        <div class="lesson-block__wrapper">' +
                '                                            <div class="lesson-block__title">Текстовый блок</div>' +
                '                                            <div class="lesson-elements">' +
                '                                                <div class="lesson-elements__wrapper lesson-elements__wrapper_column">' +
                '                                                    <div class="lesson-element">' +
                '                                                        <div class="lesson-element__title">Заголовок *</div>' +
                '                                                        <div class="lesson-element__wrapper">' +
                '                                                            <input value="' + block.title + '" name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].title" type="text" required placeholder="Введите заголовок" class="lesson-element__input">' +
                '                                                        </div>' +
                '                                                    </div>' +
                '                                                    <div class="lesson-element">' +
                '                                                        <div class="lesson-element__title">Текст *</div>' +
                '                                                        <div class="lesson-element__wrapper">' +
                '                                                            <textarea name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].value" required placeholder="Введите текст" class="lesson-element__input lesson-element__input_textarea">' + block.value + '</textarea>' +
                '                                                        </div>' +
                '                                                    </div>' +
                '                                                </div>' +
                '                                            </div>' +
                '                                        </div>' +
                '                                        <div class="lesson-block__delete update"></div>' +
                '                                    </div>';
        } else if (block.type === 'document') {
            var fileType = block.value.split('\\').pop().split('.').pop();
            blocksHtml += '<div class="lesson-block draggable ui-draggable ui-draggable-handle ui-draggable-dragging ui-sortable-helper">' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].id" value="' + block.id + '" type="hidden" required>' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].index" value="' + block.index + '" type="hidden" required>' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].type" value="document" type="hidden" required>' +
                '                                        <div class="lesson-block__wrapper">' +
                '                                            <div class="lesson-block__title">Документ</div>' +
                '                                            <div class="lesson-elements">' +
                '                                                <div class="lesson-elements__wrapper lesson-elements__wrapper_column">' +
                '                                                    <div class="lesson-element">' +
                '                                                        <div class="lesson-element__title">Название *</div>' +
                '                                                        <div class="lesson-element__wrapper">' +
                '                                                            <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].title" value="' + block.title + '" type="text" required placeholder="Введите название" class="lesson-element__input">' +
                '                                                        </div>' +
                '                                                    </div>' +
                '                                                    <div class="lesson-element">' +
                '                                                        <div class="lesson-element__wrapper lesson-element__wrapper_list">' +
                '                                                               <div class="file-loader">' +
                '                                                                   <input type="file" name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].files" id="files' + LESSON_BLOCK_COUNTER + '" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx" class="file-loader__file file-loader__file_file">' +
                '                                                                   <label for="files' + LESSON_BLOCK_COUNTER + '" class="file-loader__label file-loader__label_attached"></label>' +
                '                                                                       <div class="file-loader__file-preview file-loader__file-preview_' + fileType + '">' +
                '                                                                           <span class="file-loader__title">' + fileType + '</span>' +
                '                                                                       </div>'+
                '                                                                   <span class="file-loader__delete file-preview_update"></span>' +
                '                                                               </div>' +
                '                                                        </div>' +
                '                                                    </div>' +
                '                                                </div>' +
                '                                            </div>' +
                '                                        </div>' +
                '                                        <div class="lesson-block__delete update"></div>' +
                '                                    </div>';
        }  else if (block.type === 'image') {
            blocksHtml += '<div class="lesson-block draggable ui-draggable ui-draggable-handle ui-draggable-dragging ui-sortable-helper">' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].id" value="' + block.id + '" type="hidden" required>' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].index" value="' + block.index + '" type="hidden" required>' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].type" value="image" type="hidden" required>' +
                '                                        <div class="lesson-block__wrapper">' +
                '                                            <div class="lesson-block__title">Изображение</div>' +
                '                                            <div class="lesson-elements">' +
                '                                                <div class="lesson-elements__wrapper lesson-elements__wrapper_column">' +
                '                                                    <div class="lesson-element">' +
                '                                                        <div class="lesson-element__title">Название *</div>' +
                '                                                        <div class="lesson-element__wrapper">' +
                '                                                            <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].title" value="' + block.title + '" type="text" required placeholder="Введите название" class="lesson-element__input">' +
                '                                                        </div>' +
                '                                                    </div>' +
                '                                                    <div class="lesson-element">' +
                '                                                        <div class="lesson-element__wrapper lesson-element__wrapper_list">' +
                '                                                               <div class="file-loader">' +
                '                                                                   <input type="file" name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].files" id="files' + LESSON_BLOCK_COUNTER + '" accept=".png,.jpg,.jpeg" class="file-loader__file file-loader__file_image">' +
                '                                                                   <label for="files' + LESSON_BLOCK_COUNTER + '" class="file-loader__label file-loader__label_attached"><span class="file-loader__title"></span></label>' +
                '                                                                   <a class="file-loader__preview" href="/' + block.value + '" data-fancybox="' + block.value + '">' +
                '                                                                       <img src="/' + block.value + '">' +
                '                                                                   </a>' +
                '                                                                   <span class="file-loader__delete preview_update"></span>' +
                '                                                               </div>' +
                '                                                        </div>' +
                '                                                    </div>' +
                '                                                </div>' +
                '                                            </div>' +
                '                                        </div>' +
                '                                        <div class="lesson-block__delete update"></div>' +
                '                                    </div>';
        } else if (block.type === 'gallery') {
            var blockValues = '';
            $.each(block.blockValues, function(index, blockValue) {
                blockValues += '<div data-gallery="' + blockValue.id + '" class="file-loader file-loader_mb20">' +
                    '   <a class="file-loader__preview" href="/' + blockValue.value + '" data-fancybox="' + blockValue.value + '">' +
                    '       <img src="/' + blockValue.value + '">' +
                    '   </a>'+
                    '<span class="file-loader__delete gallery_update"></span>' +
                    '</div>';
            });

            blocksHtml += '<div class="lesson-block draggable ui-draggable ui-draggable-handle ui-draggable-dragging ui-sortable-helper">' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].id" value="' + block.id + '" type="hidden" required>' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].index" value="' + block.index + '" type="hidden" required>' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].type" value="gallery" type="hidden" required>' +
                '                                        <div class="lesson-block__wrapper lesson-block__wrapper_pb0">' +
                '                                            <div class="lesson-block__title">Галлерея</div>' +
                '                                            <div class="lesson-elements">' +
                '                                                <div class="lesson-elements__wrapper lesson-elements__wrapper_column">' +
                '                                                    <div class="lesson-element">' +
                '                                                        <div class="lesson-element__title">Название *</div>' +
                '                                                        <div class="lesson-element__wrapper">' +
                '                                                            <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].title" value="' + block.title + '" type="text" required placeholder="Введите название" class="lesson-element__input">' +
                '                                                        </div>' +
                '                                                    </div>' +
                '                                                    <div class="lesson-element">' +
                '                                                        <div class="lesson-element__wrapper lesson-element__wrapper_list">' +
                                                                                blockValues +
                '                                                               <div class="file-loader file-loader_mb20">' +
                '                                                                   <input type="file" data-name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].files" id="files' + LESSON_BLOCK_COUNTER + '" accept=".png,.jpg,.jpeg" class="file-loader__file file-loader__file_gallery" multiple>' +
                '                                                                   <label for="files' + LESSON_BLOCK_COUNTER + '" class="file-loader__label"><span class="file-loader__title"></span></label>' +
                '                                                               </div>' +
                '                                                        </div>' +
                '                                                    </div>' +
                '                                                </div>' +
                '                                            </div>' +
                '                                        </div>' +
                '                                        <div class="lesson-block__delete update"></div>' +
                '                                    </div>';
        } else if (block.type === 'question') {
            var arr = block.blockValues;

            blocksHtml += '<div class="lesson-block draggable ui-draggable ui-draggable-handle ui-draggable-dragging ui-sortable-helper">' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].id" value="' + block.id + '" type="hidden" required>' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].index" value="' + block.index + '" type="hidden" required>' +
                '                                        <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].type" value="question" type="hidden" required>' +
                '                                        <div class="lesson-block__wrapper">' +
                '                                            <div class="lesson-block__title">Открытый вопрос</div>' +
                '                                            <div class="lesson-elements">' +
                '                                                <div class="lesson-elements__wrapper lesson-elements__wrapper_column">' +
                '                                                    <div class="lesson-element">' +
                '                                                        <div class="lesson-element__wrapper">' +
                '                                                            <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].blockValues[0].value" type="checkbox" id="images' + LESSON_BLOCK_COUNTER + '" class="checkbox" ' + ((arr.filter(x => x.value === 'images')[0]) ? 'checked' : '') + ' value="images">' +
                '                                                            <label class="checkbox-label checkbox-label_gray" for="images' + LESSON_BLOCK_COUNTER + '" >Разрешить загружать изображения</label>' +
                '                                                        </div>' +
                '                                                    </div>' +
                '                                                    <div class="lesson-element">' +
                '                                                        <div class="lesson-element__wrapper">' +
                '                                                            <input name="lessonBlocks[' + LESSON_BLOCK_COUNTER + '].blockValues[1].value" type="checkbox" id="files' + LESSON_BLOCK_COUNTER + '" class="checkbox" ' + ((arr.filter(x => x.value === 'files')[0]) ? 'checked' : '') + ' value="files">' +
                '                                                            <label class="checkbox-label checkbox-label_gray" for="files' + LESSON_BLOCK_COUNTER + '" >Разрешить загружать файлы</label>' +
                '                                                        </div>' +
                '                                                    </div>' +
                '                                                </div>' +
                '                                            </div>' +
                '                                        </div>' +
                '                                        <div class="lesson-block__delete update"></div>' +
                '                                    </div>';
        }

        LESSON_BLOCK_COUNTER++;
    });

    $('[u-lesson-blocks]').html(blocksHtml);
}

$(document).on('click', '[js-menu-update-lesson-close-btn]', function(event) {
    $('[js-menu-update-lesson]').removeClass('is-open');
    checkBodyHidden();
});
$(document).on('click', '[js-update-lesson]', function(event){
    event.preventDefault();
    $('[js-update-lesson-form]').trigger('submit');
});
$(document).on('submit', '[js-update-lesson-form]', function(event){
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[js-update-lesson-form]')[0]);
        $.each(TEMP_DATA, function(index, file) {
            formData.append(file['name'], file['file']);
        });
        formData.append('deleteGalleryElements', DELETE_GALLERY);
        formData.append('deleteLessonBlocks', DELETE_LESSON_BLOCKS);

        updateLesson(formData);
    }
});
function updateLesson(formData) {
    $('[js-update-lesson]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "updateLesson",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            var index = $('[data-lesson="' + data.id + '"]').find('.module-desc__number').html();
            $('[data-lesson="' + data.id + '"]').replaceWith(createLesson(data, index));

            $('[js-menu-update-lesson]').removeClass('is-open');
            checkBodyHidden();
            $('[js-update-lesson]').prop("disabled", false);
            hideLoader();
        },
        error: function (data) {
            $('[js-update-lesson]').prop("disabled", false);
            hideLoader();
        },
        beforeSend: function() {
            showLoader();
        },
        afterSend: function() {
            hideLoader();
        }
    });
}
