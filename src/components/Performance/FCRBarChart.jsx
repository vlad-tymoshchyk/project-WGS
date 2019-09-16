import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import style from './FCRBarChart.module.scss';
import DataFetcher from '../../utils/DataFetcher';

function FCRChart() {
  const [chartData, setChartData] = useState({
    weeks: [],
    foodCR: [],
    frassCR: [],
  });

  const options = {
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          barPercentage: 0.71,
          categoryPercentage: 0.58,
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  const data = {
    labels: chartData.weeks,
    datasets: [
      {
        label: 'FoodCR',
        data: chartData.foodCR,
        backgroundColor: '#ffc4c4',
      },
      {
        label: 'FrassCR',
        data: chartData.frassCR,
        backgroundColor: '#b9b7f1',
      },
    ],
  };

  useEffect(() => {
    (async () => {
      const res = await DataFetcher.getFCRBarChart();
      if (res.weeks && res.foodCR && res.frassCR) {
        setChartData(res.data);
      }
    })();
  }, []);

  return (
    <div className={style.container}>
      <div className="d-flex justify-content-between">
        <span className={style.title}>Avg. FoodCR/FrassCR</span>
      </div>
      <div className={style.diagramContainer}>
        <div className="y-axes-name">Quantity (tones)</div>
        <Bar data={data} options={options} width={30} height={10} />
        <div className="x-axex-name">Weeks</div>
      </div>
      <div className={style.legendContainer}>
        <span>
          <span
            className={style.coloredSquare}
            style={{ backgroundColor: '#ffc4c4' }}
          />
          FoodCR
        </span>
        <span>
          <span
            className={style.coloredSquare}
            style={{ backgroundColor: '#b9b7f1' }}
          />
          FrassCR
        </span>
      </div>
    </div>
  );
}

export default FCRChart;
