import React, { useEffect } from 'react';
import Highcharts from 'highcharts';

const Barres = () => {
  useEffect(() => {
   

    const opcionsGrafic = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Gràfic de Barres'
      },
      xAxis: {
        categories: [
          'Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny',
          'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'
        ],
        title: {
          text: 'Mesos'
        }
      },
      yAxis: {
        title: {
          text: 'Valors'
        }
      },
      series: [{
        name: 'Serie 1',
        data: [2,5,3,7,8,3,4,8,9,2,8,3]
      }, {
        name: 'Serie 2',
        data: [4,5,3,1,-3,-6,-7,4,6,9,0,5]
      }]
    };

    // Renderizar el gráfico
    Highcharts.chart('grafic', opcionsGrafic);
  }, []); 

  return <div id="grafic" />;
};

export default Barres;
