
import React, { useEffect, useState } from 'react';
import Highcharts from "highcharts/highcharts.js";
import highchartsMore from "highcharts/highcharts-more.js"
import solidGauge from "highcharts/modules/solid-gauge.js";
import HighchartsReact from "highcharts-react-official";

const trackColors = Highcharts.getOptions().colors.map(color =>
  new Highcharts.Color(color).setOpacity(0.3).get()
);



function renderIcons() {


  const icons = [
    `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart-filled" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fd0061" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" stroke-width="0" fill="currentColor" />
  </svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-sock" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fd0061" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M13 3v6l4.798 5.142a4 4 0 0 1 -5.441 5.86l-6.736 -6.41a2 2 0 0 1 -.621 -1.451v-9.141h8z" />
  <path d="M7.895 15.768c.708 -.721 1.105 -1.677 1.105 -2.768a4 4 0 0 0 -4 -4" />
</svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brain" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fd0061" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" />
  <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" />
  <path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" />
  <path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" />
  <path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" />
  <path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" />
</svg>`
  ]
  this.series.forEach(series => {
      if (!series.icon) {
          series.icon = this.renderer
              .text(
                  //`<i class="fa fa-${series.options.custom.icon}"></i>`,
                  icons[series.options.custom.icon],
                  0,
                  0,
                  true
              )
              .attr({
                  zIndex: 10
              })
              .css({
                  color: series.options.custom.iconColor,
                  fontSize: '2em'
              })
              .add(this.series[2].group);
      }
      series.icon.attr({
          x: this.chartWidth / 2 - 15,
          y: this.plotHeight / 2 -
              series.points[0].shapeArgs.innerR -
              (
                  series.points[0].shapeArgs.r -
                  series.points[0].shapeArgs.innerR
              ) / 2 +
              8
      });
  });
}


const SolidGauges = () => {

  const [opcions, setOpcions] = useState([]);

  useEffect(() => {

    highchartsMore(Highcharts);
    solidGauge(Highcharts);

    const opcionsGrafic = {

      chart: {
        type: 'solidgauge',
        height: '110%',
        events: {
          render: renderIcons
        }
      },

      title: {
        text: 'Multiple KPI gauge',
        style: {
          fontSize: '24px'
        }
      },

      tooltip: {
        borderWidth: 0,
        backgroundColor: 'none',
        shadow: false,
        style: {
          fontSize: '16px'
        },
        valueSuffix: '%',
        pointFormat: '{series.name}<br>' +
          '<span style="font-size: 2em; color: {point.color}; ' +
          'font-weight: bold">{point.y}</span>',
        positioner: function (labelWidth) {
          return {
            x: (this.chart.chartWidth - labelWidth) / 2,
            y: (this.chart.plotHeight / 2) + 15
          };
        }
      },

      pane: {
        startAngle: 0,
        endAngle: 360,
        background: [{ // Track for Conversion
          outerRadius: '112%',
          innerRadius: '88%',
          backgroundColor: trackColors[0],
          borderWidth: 0
        }, { // Track for Engagement
          outerRadius: '87%',
          innerRadius: '63%',
          backgroundColor: trackColors[1],
          borderWidth: 0
        }, { // Track for Feedback
          outerRadius: '62%',
          innerRadius: '38%',
          backgroundColor: trackColors[2],
          borderWidth: 0
        }]
      },

      yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: []
      },

      plotOptions: {
        solidgauge: {
          dataLabels: {
            enabled: false
          },
          linecap: 'round',
          stickyTracking: false,
          rounded: true
        }
      },

      series: [{
        name: 'Conversion',
        data: [{
          color: Highcharts.getOptions().colors[0],
          radius: '112%',
          innerRadius: '88%',
          y: 80
        }],
        custom: {
          icon: 0,
          iconColor: '#303030'
        }
      }, {
        name: 'Engagement',
        data: [{
          color: Highcharts.getOptions().colors[1],
          radius: '87%',
          innerRadius: '63%',
          y: 65
        }],
        custom: {
          icon: 1,
          iconColor: '#ffffff'
        }
      }, {
        name: 'Feedback',
        data: [{
          color: Highcharts.getOptions().colors[2],
          radius: '62%',
          innerRadius: '38%',
          y: 50
        }],
        custom: {
          icon: 2,
          iconColor: '#303030'
        }
      }]
    }

    setOpcions(opcionsGrafic)
  }, []);


  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={opcions}
    />
  )
};

export default SolidGauges;



/*

function renderIcons() {

  this.series.forEach(series => {
      if (!series.icon) {
          series.icon = this.renderer
              .text(
                  `<i class="fa fa-${series.options.custom.icon}"></i>`,
                  0,
                  0,
                  true
              )
              .attr({
                  zIndex: 10
              })
              .css({
                  color: series.options.custom.iconColor,
                  fontSize: '1.5em'
              })
              .add(this.series[2].group);
      }
      series.icon.attr({
          x: this.chartWidth / 2 - 15,
          y: this.plotHeight / 2 -
              series.points[0].shapeArgs.innerR -
              (
                  series.points[0].shapeArgs.r -
                  series.points[0].shapeArgs.innerR
              ) / 2 +
              8
      });
  });
}

const trackColors = Highcharts.getOptions().colors.map(color =>
  new Highcharts.Color(color).setOpacity(0.3).get()
);

Highcharts.chart('container', {

  chart: {
      type: 'solidgauge',
      height: '110%',
      events: {
          render: renderIcons
      }
  },

  title: {
      text: 'Multiple KPI gauge',
      style: {
          fontSize: '24px'
      }
  },

  tooltip: {
      borderWidth: 0,
      backgroundColor: 'none',
      shadow: false,
      style: {
          fontSize: '16px'
      },
      valueSuffix: '%',
      pointFormat: '{series.name}<br>' +
          '<span style="font-size: 2em; color: {point.color}; ' +
          'font-weight: bold">{point.y}</span>',
      positioner: function (labelWidth) {
          return {
              x: (this.chart.chartWidth - labelWidth) / 2,
              y: (this.chart.plotHeight / 2) + 15
          };
      }
  },

  pane: {
      startAngle: 0,
      endAngle: 360,
      background: [{ // Track for Conversion
          outerRadius: '112%',
          innerRadius: '88%',
          backgroundColor: trackColors[0],
          borderWidth: 0
      }, { // Track for Engagement
          outerRadius: '87%',
          innerRadius: '63%',
          backgroundColor: trackColors[1],
          borderWidth: 0
      }, { // Track for Feedback
          outerRadius: '62%',
          innerRadius: '38%',
          backgroundColor: trackColors[2],
          borderWidth: 0
      }]
  },

  yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickPositions: []
  },

  plotOptions: {
      solidgauge: {
          dataLabels: {
              enabled: false
          },
          linecap: 'round',
          stickyTracking: false,
          rounded: true
      }
  },

  series: [{
      name: 'Conversion',
      data: [{
          color: Highcharts.getOptions().colors[0],
          radius: '112%',
          innerRadius: '88%',
          y: 80
      }],
      custom: {
          icon: 'filter',
          iconColor: '#303030'
      }
  }, {
      name: 'Engagement',
      data: [{
          color: Highcharts.getOptions().colors[1],
          radius: '87%',
          innerRadius: '63%',
          y: 65
      }],
      custom: {
          icon: 'comments-o',
          iconColor: '#ffffff'
      }
  }, {
      name: 'Feedback',
      data: [{
          color: Highcharts.getOptions().colors[2],
          radius: '62%',
          innerRadius: '38%',
          y: 50
      }],
      custom: {
          icon: 'commenting-o',
          iconColor: '#303030'
      }
  }]
});

*/