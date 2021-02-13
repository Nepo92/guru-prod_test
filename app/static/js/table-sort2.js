$(document).ready(function() {
    $("#is-need-sort-table").tablesorter({
        sortList: [[0,1]],
        headers: {
            1: { sorter: false},
            2: { sorter: false},
            3: { sorter: false},
            6: { sorter: false},
            7: { sorter: false},
            8: { sorter: false},
            9: { sorter: false},
            10: { sorter: false},
            11: { sorter: false}
        }
    });
});