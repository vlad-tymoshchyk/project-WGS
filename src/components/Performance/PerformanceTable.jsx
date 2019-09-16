import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import BatchInfoModal from './batchInfoModal';
import Table from '../utils/table';
import testData from '../../dummyData/BatchRelatedInfo';

function PerformanceTable(props) {
  const { columns, rows } = props;
  const [batches, setBatches] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const closeModal = () => {
    setModalOpen(false);
    setModalContent({});
  };
  // TODO: discuss how we are going to manage dataflow. Should it
  // be separate endpoint for fetching batch info, or it will be in
  // main request
  const createModalOpener = num => {
    return () => {
      setModalContent(batches[num % 10]);
      setModalOpen(true);
    };
  };

  useEffect(() => {
    setBatches(testData);
  }, []);

  const processedRows = rows.map((el, i) => {
    const ClickableBatchName = (
      <div
        className="d-flex justify-content-end"
        onClick={createModalOpener(i)}
        text={el.batchName}
      >
        <span className="mr-1">
          <IoIosArrowDown />
        </span>
        <span>{el.batchName}</span>
      </div>
    );
    return { ...el, batchName: ClickableBatchName };
  });

  return (
    <>
      <BatchInfoModal
        isOpen={modalOpen}
        toggle={closeModal}
        content={modalContent}
      />
      <Table rows={processedRows} columns={columns} />
    </>
  );
}

export default PerformanceTable;
