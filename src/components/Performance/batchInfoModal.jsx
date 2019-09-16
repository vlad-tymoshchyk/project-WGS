import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import style from './batchInfoModal.module.scss';
import dateUtil from '../../utils/dateUtil';
import OneCUInfo from './OneCUInfo';

function BatchInfoModal(props) {
  const { isOpen, toggle, content } = props;
  const { name, cuInfo, batchInfo, lastOperations } = content || {};
  const [notesEditable, setNotesEditable] = useState(false);
  const toggleEditNotes = () => {
    setNotesEditable(!notesEditable);
  };
  const saveEditedNote = e => {
    e.preventDefault();
    setNotesEditable(false);
    /* TODO sending request and saving note */
  };
  const toggleModal = () => {
    setNotesEditable(false);
    toggle();
  };
  if (!name || !cuInfo || !batchInfo || !lastOperations) {
    return null;
  }
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleModal}
      className={style.modalContainer}
      centered
    >
      <ModalHeader toggle={toggleModal}>
        <span className="modal-title">{name}</span>
      </ModalHeader>
      <ModalBody>
        {
          <div className="d-flex">
            <div className={style.batchInfo}>
              <div className="column-header">Batch Info</div>
              <div className={style.scrollContainer}>
                <div className="d-flex justify-content-between modal-row">
                  <span className="prop-name">Age</span>
                  <span className="prop-value">{`${batchInfo.age} days`}</span>
                </div>
                <div className="d-flex justify-content-between modal-row">
                  <span className="prop-name">Stream</span>
                  <span className="prop-value">{batchInfo.stream}</span>
                </div>
                <div className="d-flex justify-content-between modal-row">
                  <span className="prop-name">Stage</span>
                  <span className="prop-value">{batchInfo.stage}</span>
                </div>
                <div className="d-flex justify-content-between modal-row">
                  <span className="prop-name">Supplier</span>
                  <span className="prop-value">{batchInfo.supplier}</span>
                </div>
                <div className="d-flex justify-content-between modal-row">
                  <span className="prop-name">Parent batch</span>
                  <span className="prop-value">{batchInfo.parentBatch}</span>
                </div>
                <div className="d-flex justify-content-between modal-row">
                  <span className="prop-name">Notes</span>
                  <span
                    className="prop-value edit-button"
                    onClick={toggleEditNotes}
                  >
                    Edit
                  </span>
                </div>
                {notesEditable ? (
                  <div className={style.noteEditor}>
                    <form>
                      <textarea
                        name="editor"
                        rows="10"
                        defaultValue={batchInfo.notes}
                      />
                      <button type="submit" onClick={saveEditedNote}>
                        Save
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className={style.noteContainer}>{batchInfo.notes}</div>
                )}
              </div>
            </div>
            <div className={style.lastOperations}>
              <div className="column-header">Last Operations</div>
              <table className="">
                <thead>
                  <tr>
                    <th width="46%" className="modal-row">
                      Name
                    </th>
                    <th width="26%" className="modal-row">
                      Date
                    </th>
                    <th width="26%" className="modal-row">
                      User
                    </th>
                  </tr>
                </thead>
              </table>
              <div className={style.scrollContainer}>
                <table>
                  <tbody>
                    {lastOperations.map((op, i) => {
                      return (
                        /* TODO replace it with _id, when it is defined */
                        // eslint-disable-next-line
                        <tr key={i}>
                          <td width="46%" className="modal-row">
                            {op.name}
                          </td>
                          <td width="26%" className="modal-row">
                            {dateUtil(op.date)}
                          </td>
                          <td width="26%" className="modal-row">
                            {op.user}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className={style.CUInfo}>
              <div className="column-header">CU Info</div>
              <div className={style.scrollContainer}>
                {content.cuInfo.map((cu, i) => {
                  // TODO: replace with kind of _id when data scheme is decided
                  // eslint-disable-next-line
                  return <OneCUInfo cu={cu} key={i} />;
                })}
              </div>
            </div>
          </div>
        }
      </ModalBody>
    </Modal>
  );
}

export default BatchInfoModal;
