import React, { useState, useEffect } from 'react';
import Table from '../utils/table';
import SeachInput from '../utils/SearchInput';
import HorizontalMenu from '../utils/horizontalMenu';
import FeedSideChart from './feedSideChart';
import DataFetcher from '../../utils/DataFetcher';

import style from './index.module.scss';

const columns = [
  { id: 'name', label: 'Feed name' },
  { id: 'type', label: 'Feed type' },
  { id: 'supplier', label: 'Feed Supplier' },
  { id: 'code', label: 'Feed code' },
  { id: 'weight', label: 'Weight (t)' },
  { id: 'deliveryTime', label: 'Feed delivery date' },
];

function Feed(props) {
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
      const res = await DataFetcher.getRegisteredFeed();
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
    return textFilter.test(el.name) || textFilter.test(el.supplier);
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
            <option value="in progress">In storage</option>
          </select>
        </div>
      </HorizontalMenu>
      <div className="d-flex align-items-start">
        <div className={style.tableContainer}>
          <div className={style.filterTextInput}>
            <SeachInput
              placeholder="Please enter Feed name or Supplier name"
              onChange={changeTextFilter}
            />
          </div>
          <Table columns={columns} rows={displayedRows} />
        </div>
        <div className={style.indicatorContainer}>
          <div>
            <FeedSideChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
