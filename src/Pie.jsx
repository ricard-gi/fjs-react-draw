
import React, { useEffect } from 'react';
import Highcharts from 'highcharts';

const GraficoDePie = () => {
    useEffect(() => {

        const opcions = {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Pie chart'
            },
            series: [{
                name: 'Percentatge',
                data: [{name: "Secció 1", y: 20}, {name: "Secció 2", y: 10}, {name: "Secció 3", y: 40},]
            }]
        };


        Highcharts.chart('grafic-pie', opcions);
    }, []);

    return <div id="grafic-pie" />;
};

export default GraficoDePie;
