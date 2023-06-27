import React from 'react';
import Highcharts from 'highcharts';
import PieChart from 'highcharts-react-official';

const Piechart = ({ titleText, name, data }) => {
  const options = {
    accessibility: {
      enabled: false,
    },

    chart: {
      height: 300,
      type: 'pie',
    },
    title: {
      text: titleText,
    },
    series: [
      {
        name,
        colorByPoint: true,
        data,
      },
    ],

    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
      },
    },
  };
  return <PieChart highcharts={Highcharts} options={options} />;
};

export default Piechart;
