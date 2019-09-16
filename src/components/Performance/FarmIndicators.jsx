import React from 'react';
import Indicator from './Indicator';
import style from './FarmIndicators.module.css';

function FarmIndicators(props) {
  const { data } = props;
  return (
    <div className={style.indicatorContainer}>
      {
        data.map((el) => {
          const { title, value, tendency } = el;
          return (
            <Indicator title={title} value={value} tendency={tendency} />
          );
        })
      }
    </div>
  );
}

export default FarmIndicators;
