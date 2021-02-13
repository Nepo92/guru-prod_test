//regex для проверки ссылок.
var YOUTUBEPATTERN = /^(https:\/\/(www.youtube.com|youtu.be)\/)(watch\?v=)*/;
var YOUTUBEENDLINKPATTERN = /(&.*)/;
var VIMEOPATTERN = /^(https:\/\/vimeo.com\/)/;

$(document).ready(function () {
    var elements = document.getElementsByClassName('content-video');
    for (var index = 0; index < elements.length; index++) {
        var imgEl = elements[index].getElementsByTagName('img')[0];
        var link = elements[index].getAttribute('data-videoLink');
        if (link != null) {
            regexAnalyse(link, imgEl);
        }
    }
});

/*
* Проверяет ссылку на видео- кому она принадлежит- youtube или vimeo
* Затем достаёт из сслыки нужный идентификатор видео и передаёт нужному методу
* для установки значения src для превью-картинки
* */
function regexAnalyse(link, elemForSrc) {
    link = link.trim();
    var videoId;
    if (YOUTUBEPATTERN.exec(link)) {
        videoId = link
            .replace(YOUTUBEPATTERN, '')
            .replace(YOUTUBEENDLINKPATTERN, '');
        youtubeLink(videoId, elemForSrc);
    } else if (VIMEOPATTERN.exec(link)) {
        videoId = link.replace(VIMEOPATTERN, '');
        vimeoLink(videoId, elemForSrc);
    }
}

/*
* В данном случае для получения ссылки на картинку
* надо обратиться к vimeo api
* */
function vimeoLink(videoId, elemForSrc) {
    var imgLink = "//vimeo.com/api/v2/video/" + videoId + ".json";
    $.ajax({
        url: imgLink,
        method: "GET",
        success: function (data) {
            elemForSrc.src = data[0].thumbnail_large;
        }
    });
}

function youtubeLink(videoId, elemForSrc) {
    elemForSrc.src = "//img.youtube.com/vi/" + videoId + "/sddefault.jpg";
}