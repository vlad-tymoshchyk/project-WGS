import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import moment from 'moment';
import momentlocalizer from 'react-widgets-moment';
import 'react-widgets/dist/css/react-widgets.css';
import style from './CircleIndicator.module.scss';

moment.locale('en');
momentlocalizer();

function CircleIndicator(props) {
  const { title, data, children } = props;
  const options = {
    cutoutPercentage: 80,
    layout: {
      padding: {
        top: 10,
        bottom: 10,
      },
    },
    legend: {
      display: false,
    },
  };
  const figures = data.datasets[0].data;
  let totalSum = 0;
  figures.forEach(figure => {
    totalSum += figure;
  });
  return (
    <div>
      <h4 className={style.chartTitle}>{title}</h4>
      <div className="position-relative mb-4">
        <div className={style.chartOverlaping}>
          <div className={style.chartText}>{children}</div>
        </div>
        <Doughnut options={options} data={data} width={100} height={55} />
      </div>
      <div className={style.legendContainer}>
        {data.labels.map((label, i) => {
          const percent =
            totalSum === 0
              ? 0
              : Math.round((data.datasets[0].data[i] / totalSum) * 10000) / 100;
          return (
            <div key={label}>
              <span
                className={style.circle}
                style={{ backgroundColor: data.datasets[0].backgroundColor[i] }}
              />
              {label}
              <span className="float-right font-bold">{`${percent} %`}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CircleIndicator;
