import { onGetUsers } from "./firebase.js";

google.charts.load('current', { 'packages': ['corechart, bar, line'] });

google.charts.setOnLoadCallback(drawGenderChart);
google.charts.setOnLoadCallback(drawSalesChart);
google.charts.setOnLoadCallback(drawUserPerDay);
var male = ""
var female = ""
var otros = ""
function drawGenderChart() {
    onGetUsers((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const gender = doc.data().genero
            if (gender == "M") {
                male = male + "l"
            } else if (gender == "F") {
                female = female + "l"
            } else if (gender == "O") {
                otros = otros + "l"
            }
        })
        var data = google.visualization.arrayToDataTable([
            ['Genero', 'Valor'],
            ['Masculino', male.length],
            ['Femenino', female.length],
            ['Otros', otros.length]
        ]);

        var options = {
            is3D: true,
            colors: ['#40c4da', '#398ba0', '#2e596e', '#141219', '#213141'],
            legend: 'none',
            backgroundColor: 'transparent'
        };

        var chart = new google.visualization.PieChart(document.getElementById('chartGender'));
        chart.draw(data, options);
    })
}

function drawSalesChart() {
    var data = google.visualization.arrayToDataTable([
        ['Mes', 'Ventas', 'Gastos', 'Ganancias'],
        ['Marzo', 660000, 1120000, 300000],
        ['Abril', 1030000, 540000, 350000]
    ]);

    var options = {
        chart: {
            subtitle: 'Ventas, gastos y ganancias: Marzo-Abril'
        },
        bars: 'horizontal',
        backgroundColor: 'transparent'
    };

    var chart = new google.charts.Bar(document.getElementById('chartSales'));

    chart.draw(data, google.charts.Bar.convertOptions(options));
}

function drawUserPerDay() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Dia del mes');
    data.addColumn('number', 'Numero de Usuarios');

    data.addRows([
        [1, 38],
        [2, 31],
        [3, 25],
        [4, 12],
        [5, 12],
        [6, 9],
        [7, 8],
        [8, 12],
        [9, 17],
        [10, 13],
        [11, 5],
        [12, 7],
        [13, 5],
        [14, 4],
        [15, 38],
        [16, 31],
        [17, 25],
        [18, 12],
        [19, 12],
        [20, 9],
        [21, 8],
        [22, 12],
        [23, 17],
        [24, 13],
        [25, 5],
        [26, 7],
        [27, 5],
        [28, 4]
    ]);

    var options = {
        backgroundColor: 'transparent'
    };

    var chart = new google.charts.Line(document.getElementById('chartUserPerDay'));

    chart.draw(data, google.charts.Line.convertOptions(options));
}