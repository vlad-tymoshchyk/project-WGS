import React, { useState, useEffect } from 'react';
import style from './index.module.scss';
import PerformanceTable from './PerformanceTable';
import YieldBarChart from './YieldBarChart';
import YieldMeasures from './YieldMeasures';
import DataFetcher from '../../utils/DataFetcher';

const columns = [
  { id: 'batchName', label: 'Batch Name' },
  { id: 'emanationDate', label: 'Emanation date' },
  { id: 'seedingQuantity', label: 'Larvae quantity' },
  { id: 'seedingNo', label: 'Larvae seeding' },
  { id: 'harvestedQuantity', label: 'Harvested quantity' },
  { id: 'harvestedNo', label: 'Harvested no/g' },
  { id: 'harvestedMoisture', label: 'Harvested moisture' },
  { id: 'harvestDate', label: 'Harvest date' },
  { id: 'yield', label: 'Yield' },
  { id: 'survivalRate', label: 'Survival rate' },
];

function Yield() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await DataFetcher.getYield();
      if (res && res.data) {
        setRows(res.data.data);
      }
    })();
  }, []);

  return (
    <div>
      <div className="d-flex">
        <YieldBarChart />
        <YieldMeasures />
      </div>
      <hr className={style.separator} />
      <div className="d-flex">
        <div className={style.tableContainer}>
          <div className="d-flex justify-content-between align-items-start">
            <span className="title-semibold">General info</span>
          </div>
          <PerformanceTable columns={columns} rows={rows} />
        </div>
      </div>
    </div>
  );
}

export default Yield;
