import React, { useState, useEffect } from 'react';
import HorizontalMenu from '../utils/horizontalMenu';
import Table from '../utils/table';
import SeachInput from '../utils/SearchInput';
import SubstrateSideChart from './substrateSideChart';
import SubstrateTableRenderer from './substrateTableRenderer';
import DataFetcher from '../../utils/DataFetcher';

import style from './index.module.scss';

const columnsSubstrate = [
  { id: 'name', label: 'Substrate name' },
  { id: 'creationTime', label: 'Registration date' },
  { id: 'weight', label: 'Weight (t)' },
  { id: 'moisture', label: 'Moisture' },
  { id: 'batchName', label: 'Batch name' },
];

function Substrate(props) {
  const { topmenu } = props;
  const [rows, setRows] = useState([]);
  const [textFilter, setTextFilter] = useState(new RegExp('', 'i'));
  const [dropdownFilter, setDropdownFilter] = useState('');

  const changeDropdownFilter = e => {
    setDropdownFilter(e.target.value);
    console.log(dropdownFilter);
  };
  const changeTextFilter = e => {
    setTextFilter(new RegExp(e.target.value, 'i'));
  };

  useEffect(() => {
    (async () => {
      const res = await DataFetcher.getRegisteredSubstrates();
      if (res && res.data) {
        setRows(
          res.data.data.map(row => {
            return { ...row, weight: row.weight / 1000 };
          }),
        );
      }
    })();
  }, []);

  let displayedRows = rows.filter(el => {
    return textFilter.test(el.name) || textFilter.test(el.batchName);
  });
  if (dropdownFilter !== '') {
    displayedRows = displayedRows.map(el => {
      const { used = 0, weight } = el;
      let displayedWeight;
      if (dropdownFilter === 'used') {
        displayedWeight = used;
      } else if (dropdownFilter === 'in progress') {
        displayedWeight = weight - used;
      } else {
        displayedWeight = weight;
      }
      return { ...el, weight: displayedWeight };
    });
  }

  return (
    <div>
      <HorizontalMenu menuItems={topmenu}>
        <div className={style.dropdownFilter}>
          <label className="d-inline-block mr-4">Sorted by</label>
          <select onChange={changeDropdownFilter}>
            <option value="">All</option>
            <option value="used">Used</option>
            <option value="in progress">In progress</option>
          </select>
        </div>
      </HorizontalMenu>
      <div className="d-flex align-items-start">
        <div className={style.tableContainer}>
          <div className={style.filterTextInput}>
            <SeachInput
              placeholder="Please enter Batch name or Substrate name"
              onChange={changeTextFilter}
            />
          </div>
          <Table
            columns={columnsSubstrate}
            rows={displayedRows}
            tableRenderer={SubstrateTableRenderer}
          />
        </div>
        <div className={style.indicatorContainer}>
          <div>
            <SubstrateSideChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Substrate;
