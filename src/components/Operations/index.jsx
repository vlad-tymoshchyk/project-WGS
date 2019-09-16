import React, { useState, useEffect } from 'react';
import SeachInput from '../utils/SearchInput';
import HorizontalMenu from '../utils/horizontalMenu';
import Table from '../utils/table';
import style from './index.module.scss';
import DataFetcher from '../../utils/DataFetcher';

const columns = [
  { id: 'name', label: 'Operation name' },
  { id: 'creationTime', label: 'Operation date' },
  { id: 'batchName', label: 'Batch name' },
  { id: 'username', label: 'User' },
];

function Operations() {
  const path = '/operations';
  const submenu = [{ title: 'Operations', href: path }];
  const [rows, setRows] = useState([]);
  const [textFilter, setTextFilter] = useState(new RegExp(''), 'i');
  const displayedRows = rows.filter(el => {
    return textFilter.test(el.batchName) || textFilter.test(el.username);
  });
  const changeTextFilter = e => {
    setTextFilter(new RegExp(e.target.value, 'i'));
  };

  useEffect(() => {
    (async () => {
      const res = await DataFetcher.getOperations();
      if (res && res.data) {
        setRows(res.data.data);
      }
    })();
  }, []);

  return (
    <div>
      <HorizontalMenu menuItems={submenu}>
        <div className="mr-3">
          <label className="d-inline-block mr-4">Sorted by</label>
          <select disabled>
            <option>All</option>
            <option>Done</option>
            <option>To do</option>
          </select>
        </div>
      </HorizontalMenu>
      <div className="d-flex align-items-start">
        <div className={style.tableContainer}>
          <div className={style.filterTextInput}>
            <SeachInput
              placeholder="Please enter Batch name or User name"
              onChange={changeTextFilter}
            />
          </div>
          <Table columns={columns} rows={displayedRows} />
        </div>
      </div>
    </div>
  );
}

export default Operations;
