import React, { useState, useEffect } from 'react';
import style from './index.module.scss';
import SeachInput from '../utils/SearchInput';
import PerformanceTable from './PerformanceTable';
import FCRBarChart from './FCRBarChart';
import FCRMeasures from './FCRMeasures';
import DataFetcher from '../../utils/DataFetcher';

const columns = [
  { id: 'batchName', label: 'Batch Name' },
  { id: 'registrationDate', label: 'Registration date' },
  // { id: 'batchType', label: 'Batch Type'},
  // { id: 'substrateType', label: 'Substrate Type'},
  // { id: 'substrateName', label: 'Substrate Name'},
  // { id: 'substrateTotalWeight', label: 'Substrate Total Weight'},
  { id: 'feedCRwet', label: 'FeedCR(wet)' },
  { id: 'feedCRdry', label: 'FrassCR(wet)' },
];

function FoodConvertionRate() {
  const [rows, setRows] = useState([]);
  const [textFilter, setTextFilter] = useState(new RegExp('', 'i'));
  const [dropdownFilter, setDropdownFilter] = useState(new RegExp('', 'i'));

  const displayedRows = rows.filter(el => {
    return textFilter.test(el.batchName) && dropdownFilter.test(el.type);
  });

  const filterByText = e => {
    setTextFilter(new RegExp(e.target.value, 'i'));
  };
  const filterByDropdown = e => {
    setDropdownFilter(new RegExp(e.target.value));
  };

  useEffect(() => {
    (async () => {
      const res = await DataFetcher.getFCRTable();
      if (res && res.data) {
        setRows(res.data.data);
      }
    })();
  }, []);

  return (
    <div>
      <div className="d-flex">
        <FCRBarChart />
        <FCRMeasures />
      </div>
      <hr className={style.separator} />
      <div className="d-flex pt-3 pl-3 pr-3">
        <div className={style.filterInput}>
          <SeachInput
            placeholder="Enter the Batch Name or Barcode"
            onChange={filterByText}
          />
        </div>
      </div>
      <div className="d-flex">
        <div className={style.tableContainer}>
          <div className="d-flex justify-content-between align-items-start">
            <span className="title-semibold">General info</span>
            <div>
              <label className="d-inline-block mr-3">Sorted by</label>
              <select
                className={style.dropdownFilter}
                onChange={filterByDropdown}
              >
                <option value="">All</option>
                <option value="harvested">Harvested</option>
                <option value="in progress">In progress</option>
              </select>
            </div>
          </div>
          <PerformanceTable columns={columns} rows={displayedRows} />
        </div>
      </div>
    </div>
  );
}

export default FoodConvertionRate;
