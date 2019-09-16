import React from 'react';
import PropTypes from 'prop-types';
import { FaArrowCircleDown, FaArrowCircleUp } from 'react-icons/fa';

function Indicator(props) {
  const {
    title, value, tendency, fromLastDays = 60,
  } = props;
  return (
    <div className="indicator-block">
      <h3>{title}</h3>
      <h3 className={`value${tendency === 'negative' ? ' tendency-negative' : ' tendency-positive'}`}>
        { tendency === 'negative' ? <FaArrowCircleDown /> : <FaArrowCircleUp /> }
        {` ${value}`}
      </h3>
      <h6>{`From last ${fromLastDays} days`}</h6>
    </div>
  );
}

Indicator.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  fromLastDays: PropTypes.number.isRequired,
  tendency: PropTypes.oneOf(['positive', 'negative']).isRequired,
};

export default Indicator;
