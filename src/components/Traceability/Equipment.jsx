import React, { useState, useEffect } from 'react';
import Table from '../utils/table';
import SeachInput from '../utils/SearchInput';
import HorizontalMenu from '../utils/horizontalMenu';
import EquipmentSideChart from './equipmentSideChart';
import DataFetcher from '../../utils/DataFetcher';

import style from './index.module.scss';

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'type', label: 'CU type' },
  { id: 'size', label: 'CU size' },
  { id: 'registrationTime', label: 'Registration date' },
  { id: 'status', label: 'Status' },
];

function Equipment(props) {
  const { topmenu } = props;
  const [rows, setRows] = useState([]);
  const [textFilter, setTextFilter] = useState(new RegExp('', 'i'));
  const [dropdownFilter, setDropdownFilter] = useState('');

  const changeDropdownFilter = e => {
    setDropdownFilter(e.target.value);
  };
  const changeTextFilter = e => {
    setTextFilter(new RegExp(e.target.value, 'i'));
  };

  useEffect(() => {
    (async () => {
      const res = await DataFetcher.getRegisteredEquipment();
      if (res && res.data) {
        const {
          data: { data },
        } = res;
        setRows(
          data.map(row => {
            return {
              ...row,
              id: row.externalCarryUnitId,
              type: row.typeId ? row.typeId.type : '',
              size: row.typeId ? row.typeId.width * row.typeId.length : '',
              registrationTime: row.creationTime,
              status: row.isAvailable ? 'availible' : 'in use',
            };
          }),
        );
      }
    })();
  }, []);

  const displayedRows = rows.filter(el => {
    return (
      textFilter.test(el.id) &&
      (dropdownFilter === '' || dropdownFilter === el.status)
    );
  });

  return (
    <div>
      <HorizontalMenu menuItems={topmenu}>
        <div className={style.dropdownFilter}>
          <label className="d-inline-block mr-4">Sorted by</label>
          <select onChange={changeDropdownFilter}>
            <option value="">All</option>
            <option value="in use">In use</option>
            <option value="availible">Availible</option>
          </select>
        </div>
      </HorizontalMenu>
      <div className="d-flex align-items-start">
        <div className={style.tableContainer}>
          <div className={style.filterTextInput}>
            <SeachInput
              placeholder="Please enter carry unit ID"
              onChange={changeTextFilter}
            />
          </div>
          <Table columns={columns} rows={displayedRows} />
        </div>
        <div className={style.indicatorContainer}>
          <div>
            <EquipmentSideChart data={rows} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Equipment;

/* eslint-disable */
const testData = [
  {
    _id: '5d525d53282878c7f4667fb0',
    id: 8819,
    type: 'Type D',
    size: 50,
    registrationTime: 1558480011680,
    status: 'in use',
  },
  {
    _id: '5d525d536a6ad9edfc357193',
    id: 9181,
    type: 'Type A',
    size: 50,
    registrationTime: 1544274836714,
    status: 'in use',
  },
  {
    _id: '5d525d536ed2c4cbd2784e4b',
    id: 3123,
    type: 'Type A',
    size: 60,
    registrationTime: 1519654026160,
    status: 'in use',
  },
  {
    _id: '5d525d539b7102f76b909bfb',
    id: 2077,
    type: 'Type C',
    size: 40,
    registrationTime: 1549604348840,
    status: 'availible',
  },
  {
    _id: '5d525d5372431e4d52442a64',
    id: 8819,
    type: 'Type D',
    size: 40,
    registrationTime: 1564852644246,
    status: 'in use',
  },
  {
    _id: '5d525d53d3dd7dce7743890f',
    id: 3564,
    type: 'Type A',
    size: 100,
    registrationTime: 1515547932858,
    status: 'availible',
  },
  {
    _id: '5d525d53bac53951dec3205f',
    id: 2422,
    type: 'Type D',
    size: 100,
    registrationTime: 1519997521772,
    status: 'availible',
  },
  {
    _id: '5d525d5364839c91295f6d6a',
    id: 3129,
    type: 'Type D',
    size: 90,
    registrationTime: 1565005828999,
    status: 'in use',
  },
  {
    _id: '5d525d53a47087460452163f',
    id: 7124,
    type: 'Type A',
    size: 90,
    registrationTime: 1545864929982,
    status: 'in use',
  },
  {
    _id: '5d525d53220152650ca6a3c5',
    id: 3273,
    type: 'Type A',
    size: 90,
    registrationTime: 1523606937402,
    status: 'in use',
  },
  {
    _id: '5d525d53499bf71a613e33b3',
    id: 8696,
    type: 'Type B',
    size: 70,
    registrationTime: 1561192053201,
    status: 'availible',
  },
  {
    _id: '5d525d53c7af22c8fe7851bc',
    id: 4592,
    type: 'Type A',
    size: 80,
    registrationTime: 1517000381703,
    status: 'availible',
  },
  {
    _id: '5d525d53e573a40f548fe867',
    id: 3741,
    type: 'Type E',
    size: 40,
    registrationTime: 1535528494287,
    status: 'availible',
  },
  {
    _id: '5d525d53b55bfd415552dd64',
    id: 4984,
    type: 'Type C',
    size: 50,
    registrationTime: 1530669597253,
    status: 'in use',
  },
  {
    _id: '5d525d53ea6d1921f4db8441',
    id: 4329,
    type: 'Type B',
    size: 90,
    registrationTime: 1564279963108,
    status: 'in use',
  },
  {
    _id: '5d525d5349e38845cfbd5bf9',
    id: 1737,
    type: 'Type C',
    size: 40,
    registrationTime: 1537661753168,
    status: 'availible',
  },
  {
    _id: '5d525d53fab9625926399448',
    id: 6806,
    type: 'Type D',
    size: 30,
    registrationTime: 1551556570328,
    status: 'availible',
  },
  {
    _id: '5d525d53113bb1d03655030a',
    id: 5057,
    type: 'Type B',
    size: 100,
    registrationTime: 1516288260915,
    status: 'in use',
  },
  {
    _id: '5d525d53d604755d6ea3c798',
    id: 3573,
    type: 'Type D',
    size: 70,
    registrationTime: 1540852817254,
    status: 'availible',
  },
  {
    _id: '5d525d532883c44aa1c39812',
    id: 5508,
    type: 'Type C',
    size: 100,
    registrationTime: 1546593775030,
    status: 'availible',
  },
  {
    _id: '5d525d536e4d8b6fb585a9d8',
    id: 2552,
    type: 'Type C',
    size: 50,
    registrationTime: 1557770366571,
    status: 'in use',
  },
  {
    _id: '5d525d539465250ad5ad73cc',
    id: 9078,
    type: 'Type D',
    size: 80,
    registrationTime: 1553714940488,
    status: 'in use',
  },
  {
    _id: '5d525d53f5f526d75c5bcda2',
    id: 8774,
    type: 'Type B',
    size: 100,
    registrationTime: 1529126924681,
    status: 'in use',
  },
  {
    _id: '5d525d5301dfbb2f06f920f4',
    id: 3834,
    type: 'Type C',
    size: 90,
    registrationTime: 1538788248089,
    status: 'in use',
  },
];
