import React, { useState } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import moment from 'moment';
import { Calendar } from 'react-widgets';
import style from './datePicker.module.scss';
import dateUtil from '../../utils/dateUtil';

function DatePicker(props) {
  const {
    isOpen,
    onSelect,
    onCancel,
    valueFrom = moment().valueOf(),
    valueTo = moment().valueOf(),
  } = props;
  const [dateFrom, setDateFrom] = useState(valueFrom);
  const [dateTo, setDateTo] = useState(valueTo);
  const onSelectDate = e => {
    e.preventDefault();
    onSelect({ dateTo, dateFrom });
    onCancel();
  };
  const onCancelModal = () => {
    setDateFrom(new Date().getTime());
    setDateTo(new Date().getTime());
    onCancel();
  };
  const onChangeDateFrom = value => setDateFrom(value.getTime());
  const onChangeDateTo = value => setDateTo(value.getTime());

  return (
    <Modal
      isOpen={isOpen}
      centered
      toggle={onCancelModal}
      className={style.modalContainer}
    >
      <ModalBody>
        <form onSubmit={onSelectDate}>
          <div className="d-flex">
            <div className="calendar-container">
              <h4>{`From: ${dateUtil(dateFrom)}`}</h4>
              <Calendar
                defaultValue={new Date(dateFrom)}
                onChange={onChangeDateFrom}
              />
            </div>
            <div className="calendar-container">
              <h4>{`To: ${dateUtil(dateTo)}`}</h4>
              <Calendar
                defaultValue={new Date(dateTo)}
                onChange={onChangeDateTo}
              />
            </div>
          </div>
          <hr />
          <button type="submit" className="button-apply">
            Apply date
          </button>
          <button type="button" className="button-cancel" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
}

export default DatePicker;
