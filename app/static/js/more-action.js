$(document).ready(function(){
    $("#collapseBlock").on("hide.bs.collapse", function(){
        $(".action-collapse__btn").text('Показать акцию');
        $(".action-collapse__btn").removeClass('action-collapse__btn_up');
    });
    $("#collapseBlock").on("show.bs.collapse", function(){
        $(".action-collapse__btn").text('Скрыть акцию');
        $(".action-collapse__btn").addClass('action-collapse__btn_up');
    });
});