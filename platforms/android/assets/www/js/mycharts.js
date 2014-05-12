function chart2() {
    function randValue() {
        return (Math.floor(Math.random() * (1 + 40 - 20))) + 20;
    }
    
    function aValue() {
        return 42;
    }
    
    var pageviews = [ [ 1, aValue() ], [ 2, aValue() ],
            [ 3, aValue() ], [ 4, aValue() ],
            [ 5, aValue() ], [ 6,aValue() ],
            [ 7, aValue() ], [ 8,aValue() ],
            [ 9, aValue() ], [ 10, aValue() ],
            [ 11, aValue() ], [ 12,  aValue() ],
            [ 13, aValue() ], [ 14,aValue() ],
            [ 15, aValue() ], [ 16, aValue() ],
            [ 17,  aValue() ], [ 18,  aValue() ],
            [ 19,  aValue() ], [ 20,  aValue() ],
            [ 21,  aValue() ], [ 22,  aValue() ],
            [ 23,  aValue() ], [ 24,  aValue() ],
            [ 25,  aValue() ], [ 26, aValue() ],
            [ 27,  aValue() ], [ 28,  aValue() ],
            [ 29,  aValue() ], [ 30,  aValue() ] ];
    var visitors = [ [ 1, randValue() - 5 ], [ 2, randValue() - 5 ],
            [ 3, randValue() - 5 ], [ 4, 6 + randValue() ],
            [ 5, 5 + randValue() ], [ 6, 20 + randValue() ],
            [ 7, 25 + randValue() ], [ 8, 36 + randValue() ],
            [ 9, 26 + randValue() ], [ 10, 38 + randValue() ],
            [ 11, 39 + randValue() ], [ 12, 50 + randValue() ],
            [ 13, 51 + randValue() ], [ 14, 12 + randValue() ],
            [ 15, 13 + randValue() ], [ 16, 14 + randValue() ],
            [ 17, 15 + randValue() ], [ 18, 15 + randValue() ],
            [ 19, 16 + randValue() ], [ 20, 17 + randValue() ],
            [ 21, 18 + randValue() ], [ 22, 19 + randValue() ],
            [ 23, 20 + randValue() ], [ 24, 21 + randValue() ],
            [ 25, 14 + randValue() ], [ 26, 24 + randValue() ],
            [ 27, 25 + randValue() ], [ 28, 26 + randValue() ],
            [ 29, 27 + randValue() ], [ 30, 31 + randValue() ] ];

    var plot = $.plot($("#chart_2"), [ {
        data : pageviews,
        label : "月平均值",
        lines : {
            lineWidth : 1,
        },
        shadowSize : 0

    }, {
        data : visitors,
        label : "XXX指标",
        lines : {
            lineWidth : 1,
        },
        shadowSize : 0
    } ], {
        series : {
            lines : {
                show : true,
                lineWidth : 2,
                fill : true,
                fillColor : {
                    colors : [ {
                        opacity : 0.05
                    }, {
                        opacity : 0.01
                    } ]
                }
            },
            points : {
                show : true,
                radius : 3,
                lineWidth : 1
            },
            shadowSize : 2
        },
        grid : {
            hoverable : true,
            clickable : true,
            tickColor : "#eee",
            borderColor : "#eee",
            borderWidth : 1
        },
        colors : [  "#37b7f3","#d12610", "#52e136" ],
        xaxis : {
            ticks : 11,
            tickDecimals : 0,
            tickColor : "#eee",
        },
        yaxis : {
            ticks : 11,
            tickDecimals : 0,
            tickColor : "#eee",
        }
    });

    function showTooltip(x, y, contents) {
        $('<div id="tooltip">' + contents + '</div>').css({
            position : 'absolute',
            display : 'none',
            top : y + 5,
            left : x + 15,
            border : '1px solid #333',
            padding : '4px',
            color : '#fff',
            'border-radius' : '3px',
            'background-color' : '#333',
            opacity : 0.80
        }).appendTo("body").fadeIn(200);
    }

    var previousPoint = null;
    $("#chart_2")
            .bind(
                    "plothover",
                    function(event, pos, item) {
                        $("#x").text(pos.x.toFixed(2));
                        $("#y").text(pos.y.toFixed(2));

                        if (item) {
                            if (previousPoint != item.dataIndex) {
                                previousPoint = item.dataIndex;

                                $("#tooltip").remove();
                                var x = item.datapoint[0].toFixed(2), y = item.datapoint[1]
                                        .toFixed(2);

                                showTooltip(item.pageX, item.pageY,
                                        item.series.label + " 在时点： " + x + " 值为: "
                                                + y);
                            }
                        } else {
                            $("#tooltip").remove();
                            previousPoint = null;
                        }
                    });
}




function pieHover(event, pos, obj) {
if (!obj)
        return;
    percent = parseFloat(obj.series.percent).toFixed(2);
    $("#hover").html('<span style="font-weight: bold; color: ' + obj.series.color + '">' + obj.series.label + ' (' + percent + '%)</span>');
}

function pieClick(event, pos, obj) {
    if (!obj)
        return;
    percent = parseFloat(obj.series.percent).toFixed(2);
    alert('' + obj.series.label + ': ' + percent + '%');
}


function initPieCharts () {

    var data = [];
    var series = Math.floor(Math.random() * 10) + 1;
    series = series < 5 ? 5 : series;
    
    for (var i = 0; i < series; i++) {
        data[i] = {
            label: "Series" + (i + 1),
            data: Math.floor(Math.random() * 100) + 1
        }
    }

    // GRAPH 6
    $.plot($("#pie_chart_6"), data, {
            series: {
                pie: {
                    show: true,
                    radius: 1,
                    label: {
                        show: true,
                        radius: 3 / 4,
                        formatter: function (label, series) {
                            return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">' + label + '<br/>' + Math.round(series.percent) + '%</div>';
                        },
                        background: {
                            opacity: 0.5,
                            color: '#000'
                        }
                    }
                }
            },
            legend: {
                show: false
            }
        });
}    













chart2();
//initPieCharts();
