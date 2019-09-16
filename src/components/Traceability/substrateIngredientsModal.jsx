import React from 'react';
import dateUtil from '../../utils/dateUtil';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import style from './index.module.scss';

function SubstrateIngredientsModal(props) {
  const { isOpen, toggle, content } = props;
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      centered
      className={style.modalContainer}
    >
      <ModalHeader toggle={toggle}>
        <span className="h3">{content.name}</span>
      </ModalHeader>
      <ModalBody>
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Feed name</th>
              <th>Supplier</th>
              <th>Delivery date</th>
              <th>% of total substrate weight</th>
            </tr>
          </thead>
          <tbody className={style.substrateModalBody}>
            {content.ingredients.map((row, i) => {
              if (!row.details) return null;
              return (
                <tr key={row._id}>
                  <td>{i + 1}</td>
                  <td>{row.details.name}</td>
                  <td>{row.details.supplier}</td>
                  <td>{dateUtil(row.deliveryTime)}</td>
                  <td>{`${row.percentOfTotalWeight} %`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </ModalBody>
    </Modal>
  );
}

export default SubstrateIngredientsModal;
