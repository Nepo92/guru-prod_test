$(document).on('change', '[s-filter]', function() {
    $('[s-filter-form]').trigger('submit');
});
$(document).on('click', '.datepicker-here', function(event){
    $('.datepicker.active').find('[data-action="today"]').trigger('click');
});
$(document).on('click', '.datepicker-here-start', function(event){
    $('.datepicker.active').find('[data-action="today"]').trigger('click');
});

var $coursesMap;
function setCoursesMap(coursesMap) {
    $coursesMap = coursesMap;
}

var $projects;
function setProjectsList(projects) {
    $projects = projects;
}

$(document).ready(function() {
    $('.only-time').datepicker({
        dateFormat: ' ',
        timepicker: true,
        classes: 'only-timepicker'
    });

    $('.datepicker-here-start').datepicker({
        autoClose: true,
        minDate: new Date(),
        todayButton: true
    });

    $('.datepicker-here').datepicker({
        autoClose: true,
        todayButton: true
    });
});

$(document).on('click', '[add-streams]', function(event){
    resetAddStreamsMenu();
    openAddStreamMenu();
});
$(document).on('click', '[js-menu-add-streams-close-btn]', function(event){
    $('[js-menu-add-streams]').removeClass('is-open');
    checkBodyHidden();
});
function resetAddStreamsMenu() {
    $('[js-add-streams-form]').trigger('reset');
}
function openAddStreamMenu() {
    $('[add-streams]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getCompanyProjects",
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            setMenuProjects($('[add-streams-project]'), data);
            $('[add-streams-project]').trigger('change');

            $('[js-menu-add-streams]').addClass('is-open');
            checkBodyHidden();
            $('[add-streams]').prop("disabled", false);
        },
        error: function (data) {
            $('[add-streams]').prop("disabled", false);
        }
    });
}
function setMenuProjects(selector, data) {
    var seloption = "";
    $.each(data, function(index, value){
        seloption += '<option value="' + value.id + '">' + value.name + '</option>';
    });
    selector.html(seloption);
}

$(document).on('change', '[projects]', function() {
    var projectsBlock = $(this);
    resetCourses(projectsBlock);

    var formData = new FormData();
    formData.append('id', Number($('option:selected', this).val()));

    $('[projects]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getProjectCourses",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            var seloption = "";
            $.each(data, function(index, value){
                seloption += '<option value="' + value.id + '">' + value.name + '</option>';
            });

            var coursesBlock =  projectsBlock.closest('[block-wrapper]').find('[courses]');
            coursesBlock.html(coursesBlock.html() + seloption);

            $('[projects]').prop("disabled", false);
        },
        error: function (data) {
            $('[projects]').prop("disabled", false);
        }
    });
});
function resetCourses(block) {
    block.closest('[block-wrapper]').find('[courses]').html('<option value="" disabled>Выберите продукт</option>');
}

$(document).on('click', '[js-add-streams]', function(event){
    event.preventDefault();
    $('[js-add-streams-form]').trigger('submit');
});

$(document).on('submit', '[js-add-streams-form]', function(event){
    event.preventDefault();
    if (validateForm(this)) {
        var formData = new FormData($('[js-add-streams-form]')[0]);
        saveStreams(formData);
    }
});

function saveStreams(formData) {
    $('[js-add-streams]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "saveStreams",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $.each(data, function(index, streams){
                var list = '';
                $.each(streams, function(index2, stream){
                    list += '<div class="calendar-stream"><span>' + stream.nameCourse + '</span></div>';
                });

                $('[data-date="' + index + '"]').find('[stream-list]').html(list);
            });

            $('[js-menu-add-streams]').removeClass('is-open');
            checkBodyHidden();
            $('[js-add-streams]').prop("disabled", false);
        },
        error: function (data) {
            $('[js-add-streams]').prop("disabled", false);
        }
    });
}


var LIST_PROJECTS = {};
$(document).on('click', '[edit-streams]', function(event){
    resetUpdateStreamsMenu();

    var formData = new FormData();
    formData.append('startDate', $(this).data('date'));

    $.ajax({
        type: "POST",
        url: "getCompanyProjects",
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            LIST_PROJECTS = data;
            openEditStreamsMenu(formData);
            $('[add-streams]').prop("disabled", false);
        },
        error: function (data) {
            $('[add-streams]').prop("disabled", false);
        }
    });

});
$(document).on('click', '[js-menu-update-streams-close-btn]', function(event){
    $('[js-menu-update-streams]').removeClass('is-open');
    checkBodyHidden();
});
function resetUpdateStreamsMenu() {
    $('[u-date]').html('');
    $('[u-start-list]').html('');
}
function openEditStreamsMenu(formData) {
    $('[edit-streams]').prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "getStreamsByDate",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            $('[u-date]').html(data.startDate);

            var seloption = "";
            $.each(LIST_PROJECTS, function(index, value){
                seloption += '<option value="' + value.id + '">' + value.name + '</option>';
            });

            var streamList = $('[u-start-list]');
            $.each(data.streams, function(index, stream){
                streamList.html(streamList.html() +
                    '<div class="collapse-block__header collapsed" data-toggle="collapse" data-target="#stream' + stream.id  + '" aria-expanded="false" aria-controls="stream' + stream.id  + '">' +
                    '    <div class="collapse-desc">' +
                    '        <div class="collapse-desc__title">' + stream.nameCourse + '</div>' +
                    '            <div class="collapse-desc__wrapper">' +
                    '                <div class="collapse-desc__text">' + stream.nameProject + '</div>' +
                    '                <div class="collapse-desc__delim"><span></span></div>' +
                    '                <div class="collapse-desc__text">№ потока  ' + stream.id  + '</div>' +
                    '            </div>' +
                    '        </div>' +
                    '        <div delete-start class="collapse-delete"></div>' +
                    '</div>' +
                    '    <div class="collapse-block__body collapse" id="stream' + stream.id  + '">' +
                    '        <div block-wrapper class="collapse-body">' +
                    '            <div class="menu-input menu-input_xsmall menu-input_t20">' +
                    '                 <div class="menu-input__title">Проект *</div>' +
                    '                 <div class="menu-input__wrapper menu-input__wrapper_select">' +
                    '                           <select projects class="menu-input__input menu-input__input_small menu-input__input_select" required>' +
                    seloption +
                    '                           </select>' +
                    '                 </div>' +
                    '             </div>' +
                    '             <div class="menu-input menu-input_xsmall">' +
                    '                 <div class="menu-input__title">Продукт *</div>' +
                    '                 <div class="menu-input__wrapper menu-input__wrapper_select">' +
                    '                     <select courses name="idCourse" class="menu-input__input menu-input__input_small menu-input__input_select" required>' +
                    '                         <option value="" disabled>Выберите продукт</option>' +
                    '                     </select>' +
                    '                 </div>' +
                    '              </div>' +
                    '              <div class="menu-input menu-input_xsmall">' +
                    '                  <div class="menu-input__title">Время старта *</div>' +
                    '                  <div class="menu-input__wrapper menu-input__wrapper_cal">' +
                    '                      <input name="startTime" autocomplete="off" class="only-time menu-input__input menu-input__input_small" placeholder="Выберите время" required/>' +
                    '                  </div>' +
                    '              </div>' +
                    '           </div>' +
                    '        </div>');

                var projectsBlock = $('#stream' + stream.id  + '').find('[projects]');
                projectsBlock.val(stream.idProject);

                var formData = new FormData();
                formData.append('id', Number(stream.idProject));

                $.ajax({
                    type: "POST",
                    url: "getProjectCourses",
                    data: formData,
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function (data) {
                        var seloption = "";
                        $.each(data, function(index, value){
                            seloption += '<option value="' + value.id + '">' + value.name + '</option>';
                        });

                        var coursesBlock =  projectsBlock.closest('[block-wrapper]').find('[courses]');
                        coursesBlock.html(coursesBlock.html() + seloption);
                        coursesBlock.val(stream.idCourse);

                    },
                    error: function (data) {
                    }
                });
            });

            $('[js-menu-update-streams]').addClass('is-open');
            checkBodyHidden();
            $('[edit-streams]').prop("disabled", false);
        },
        error: function (data) {
            $('[edit-streams]').prop("disabled", false);
        }
    });
}