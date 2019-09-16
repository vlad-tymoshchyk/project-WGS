import React from 'react';
import moment from 'moment';
import momentlocalizer from 'react-widgets-moment';
import 'react-widgets/dist/css/react-widgets.css';
import CircleIndicator from '../utils/CircleIndicator';

moment.locale('en');
momentlocalizer();

function EquipmentSideChart(props) {
  const { data } = props;
  let usedSpace = 0;
  let availibleSpace = 0;
  data.forEach(cu => {
    if (typeof cu.size !== 'number') return;
    switch (cu.status) {
      case 'in use':
        usedSpace += cu.size;
        break;
      case 'availible':
        availibleSpace += cu.size;
        break;
      default:
        console.log('Unknown status:', cu.status);
        break;
    }
  });
  const totalSpace = usedSpace + availibleSpace;

  const chartData = {
    datasets: [
      {
        backgroundColor: ['#ff8424', '#6bd47a'],
        borderWidth: [0, 2],
        data: [usedSpace, availibleSpace],
      },
    ],
    labels: ['In use', 'Availible'],
  };

  return (
    <div className="mb-5">
      <CircleIndicator data={chartData} title="Equipment">
        <div className="h4 mb-0">
          {totalSpace} m<sup>2</sup>
        </div>
        <hr
          className="my-0"
          style={{ height: '1px', backgroundColor: 'black' }}
        />
        <div className="h4 mb-0">{`${data.length} CU`}</div>
      </CircleIndicator>
    </div>
  );
}

export default EquipmentSideChart;
