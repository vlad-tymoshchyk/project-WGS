import React, { useState } from 'react';
import dateUtil from '../../utils/dateUtil';
import { IoIosArrowDown } from 'react-icons/io';
import SubstrateIngredientsModal from './substrateIngredientsModal';

function SubstrateTableRenderer(props) {
  const { rows, page, rowsPerPage, orderBy } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    name: '',
    ingredients: [],
  });
  const closeModal = () => {
    setModalOpen(false);
    setModalContent({ name: '', ingredients: [] });
  };
  const createModalOpener = (name, ingredients) => {
    return () => {
      setModalContent({ name, ingredients: ingredients || [] });
      setModalOpen(true);
    };
  };

  return (
    <>
      <SubstrateIngredientsModal
        isOpen={modalOpen}
        toggle={closeModal}
        content={modalContent}
      />
      {rows.map((row, i) => {
        return (
          <tr key={row._id}>
            <td>{page * rowsPerPage + i + 1}</td>
            <td
              className={orderBy === 'name' ? 'orderedBy' : ''}
              onClick={createModalOpener(row.name, row.ingredients)}
            >
              <span className="mr-1">
                <IoIosArrowDown />
              </span>
              {row.name}
            </td>
            <td className={orderBy === 'creationTime' ? 'orderedBy' : ''}>
              {dateUtil(row.creationTime)}
            </td>
            <td className={orderBy === 'weight' ? 'orderedBy' : ''}>
              {row.weight}
            </td>
            <td className={orderBy === 'moisture' ? 'orderedBy' : ''}>
              {row.moisture}
            </td>
            <td className={orderBy === 'batchName' ? 'orderedBy' : ''}>
              {row.batchName}
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default SubstrateTableRenderer;
