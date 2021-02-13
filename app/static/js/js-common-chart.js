$(document).ready(function(){
    const $commonChart = $('[common-chart-form]');
    const $commonChartLine = $('[common-chart-line]');

    $commonChartLine.on('change', function () {
        $commonChart.trigger('submit')
    })
});
