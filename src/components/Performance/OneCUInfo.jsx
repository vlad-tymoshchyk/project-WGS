import React, { useState } from 'react';
import { Collapse } from 'reactstrap';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import style from './batchInfoModal.module.scss';
import dateUtil from '../../utils/dateUtil';

function OneCUInfo(props) {
  const { cu } = props;
  const [CUListOpen, setCUListOpen] = useState(false);
  const toggleListOpen = () => {
    setCUListOpen(!CUListOpen);
  };
  return (
    <>
      <div className="d-flex justify-content-between modal-row">
        <span className="prop-name">Type</span>
        <span className="prop-value">{cu.type}</span>
      </div>
      <div className="d-flex justify-content-between modal-row">
        <span className="prop-name">Input date</span>
        <span className="prop-value">{dateUtil(cu.regDate)}</span>
      </div>
      <div className={style.CUListOpener} onClick={toggleListOpen}>
        <div className="d-flex align-items-center">
          <span className="caret">
            {CUListOpen ? <FaCaretUp /> : <FaCaretDown />}
          </span>
          Amount
        </div>
        <div>{cu.amount.length}</div>
      </div>
      <Collapse isOpen={CUListOpen} className="collapse-container">
        {cu.amount.map((cu, i) => {
          return (
            <div key={cu}>
              <div>
                <span className="number">{i + 1}</span>
                <span>CU</span>
              </div>
              <div>{cu}</div>
            </div>
          );
        })}
        <hr />
      </Collapse>
    </>
  );
}

export default OneCUInfo;
