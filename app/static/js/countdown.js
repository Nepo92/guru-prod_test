var ENABLE_MESSAGE = 'Уже доступно';

//client main page
function getCountdownOnUserCoursesPage() {
    var timeInfos = document.getElementsByClassName('clientTimeInfo');
    for (var i = 0; i < timeInfos.length; i++) {
        var fullTimeSpan = timeInfos[i].getElementsByClassName('countdown')[0];
        var fullStartTime = Number(fullTimeSpan.getAttribute('data-startDate'));
        setTimeInfoToCoursesPage(
            fullStartTime,
            timeInfos[i].getElementsByClassName('startDate')[0],
            timeInfos[i].getElementsByClassName('startTime')[0]);
        startCountdown(fullTimeSpan.id, fullStartTime, actionOnTimerRunOutOnUserCoursesPage);
    }
}

//course overview
function getCountdownOnUserModulesPage() {
    var fullTimeSpan = document.getElementsByClassName('countdown')[0];
    var fullStartTime = Number(fullTimeSpan.getAttribute('data-startDate'));
    startCountdown(fullTimeSpan.id, fullStartTime, actionOnTimerRunOutOnUserModulesPage);
}

function actionOnTimerRunOutOnUserModulesPage() {
    location.reload();
    return ENABLE_MESSAGE;
}

function actionOnTimerRunOutOnUserCoursesPage() {
    return ENABLE_MESSAGE;
}

/*Отсчёт оставшегося до старта потока времени.
@timerId - id элемента для вывода отсчёта
@fullStartTime - время старта потока, до которого нужно отсчитывать
@action - какое действие должно выполниться по истечении времени.*/
function startCountdown(timerId, fullStartTime, action) {
    var timerShow = document.getElementById(timerId);
    var ms_left = fullStartTime - new Date();
    if (ms_left <= 0) {
        timerShow.innerHTML = ENABLE_MESSAGE;
    } else {
        var str_timer = buildTimerString(new Date(ms_left));
        timerShow.innerHTML = str_timer;
        // Запуск интервала таймера
        setInterval(function () {
            ms_left = fullStartTime - new Date();
            if (ms_left <= 0) {
                clearInterval(this);
                timerShow.innerHTML = action();
            } else {
                str_timer = buildTimerString(new Date(ms_left));
                timerShow.innerHTML = str_timer;
            }
        }, 1000);
    }
}

//формирует строку для вывода таймера.
function buildTimerString(inputDate) {
    var resultString = '';
    var datePoint = inputDate.getUTCFullYear() - 1970;
    if (datePoint > 0) {
        resultString += subBuildTimerString(datePoint) + ' : ';
    } else {
        resultString += '';
    }

    datePoint = inputDate.getUTCMonth();
    if (datePoint > 0) {
        resultString += subBuildTimerString(datePoint) + ' : ';
    } else {
        resultString += '';
    }

    datePoint = inputDate.getUTCDate() - 1;
    resultString += subBuildTimerString(datePoint) + ' : ';

    datePoint = inputDate.getUTCHours();
    resultString += subBuildTimerString(datePoint) + ' : ';

    datePoint = inputDate.getUTCMinutes();
    resultString += subBuildTimerString(datePoint) + ' : ';

    datePoint = inputDate.getUTCSeconds();
    resultString += subBuildTimerString(datePoint);

    return resultString;
}

/*Размещает время старта потока.
@fullStartTime - время старта потока в миллисекундах
@startDateElem - элемент, в который помещается дата
@startTimeElem - элемент, в который помещается время
*/
function setTimeInfoToCoursesPage(fullStartTime, startDateElem, startTimeElem) {
    var date = new Date(fullStartTime);
    startDateElem.textContent =
        subBuildTimerString(date.getFullYear()) + '.' +
        subBuildTimerString(date.getMonth() + 1) + '.' +
        subBuildTimerString(date.getDate());
    startTimeElem.textContent =
        subBuildTimerString(date.getHours()) + '.' +
        subBuildTimerString(date.getMinutes());
}

/*Если показатель меньше десяти- приводит к виду '0X'
@datePoint - составная даты(год, или месяц, или день и т.д.)*/
function subBuildTimerString(datePoint) {
    if (Number(datePoint) >= 10) {
        return datePoint;
    } else {
        return ('0' + datePoint);
    }
}