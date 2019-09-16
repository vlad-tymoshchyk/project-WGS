import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import style from './YieldBarChart.module.scss';
import DatePicker from '../utils/datePicker';
import DataFetcher from '../../utils/DataFetcher';

function YieldBarChart() {
  const [modalOpen, setModalOpen] = useState(false);

  const [dateFrom, setDateFrom] = useState(
    moment()
      .subtract(2, 'months')
      .valueOf(),
  );
  const [dateTo, setDateTo] = useState(moment().valueOf());

  const weekFrom = moment(dateFrom).weeks();
  const weekTo = moment(dateTo).weeks();

  const openDatePicker = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const onSelectDate = ({ dateFrom, dateTo }) => {
    closeModal();
    setDateFrom(dateFrom);
    setDateTo(dateTo);
  };

  const [chartData, setChartData] = useState({
    weeks: [],
    harvest: [],
  });

  let indexFrom = chartData.weeks.indexOf(weekFrom);
  indexFrom = indexFrom === -1 ? 0 : indexFrom;
  const indexTo = chartData.weeks.indexOf(weekTo) || chartData.length;
  const displayedChartData = {
    weeks: chartData.weeks.slice(indexFrom, indexTo),
    harvest: chartData.harvest.slice(indexFrom, indexTo),
  };

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
    labels: displayedChartData.weeks,
    datasets: [
      {
        label: 'Harvest quantity',
        data: displayedChartData.harvest,
        backgroundColor: '#ffc4c4',
      },
    ],
  };

  useEffect(() => {
    (async () => {
      const res = await DataFetcher.getYieldBarChart();
      if (res && res.weeks && res.foodCR && res.frassCR) {
        setChartData(res.data);
      }
    })();
  }, []);

  return (
    <div className={style.container}>
      <div className="d-flex justify-content-between">
        <span className={style.title}>Yield</span>
        <span className={style.buttonDatePicker} onClick={openDatePicker}>
          <img
            src="/icon-select-date-pencil.svg"
            alt="icon-pencil"
            className="mr-2"
          />
          Select date
        </span>
        <DatePicker
          isOpen={modalOpen}
          onCancel={closeModal}
          onSelect={onSelectDate}
          valueFrom={dateFrom}
        />
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
          Harvested
        </span>
      </div>
    </div>
  );
}

export default YieldBarChart;
