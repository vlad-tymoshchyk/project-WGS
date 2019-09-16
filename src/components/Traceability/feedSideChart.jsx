import React, { useState, useEffect } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import moment from 'moment';
import momentlocalizer from 'react-widgets-moment';
import 'react-widgets/dist/css/react-widgets.css';
import DatePicker from '../utils/datePicker';
import CircleIndicator from '../utils/CircleIndicator';
import dateUtil from '../../utils/dateUtil';
import DataFetcher from '../../utils/DataFetcher';

import style from '../utils/CircleIndicator.module.scss';

moment.locale('en');
momentlocalizer();

function FeedSideChart() {
  const [storageData, setStorageData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState(
    moment()
      .subtract(1, 'months')
      .valueOf(),
  );
  const [dateTo, setDateTo] = useState(moment().valueOf());
  useEffect(() => {
    (async () => {
      const res = await DataFetcher.getFeedInStorage();
      if (res && res.data) {
        setStorageData(res.data.data);
      }
    })();
  }, []);
  const closeModal = () => {
    setModalOpen(false);
  };
  const openModal = () => {
    setModalOpen(true);
  };
  const onSelectDate = ({ dateFrom, dateTo }) => {
    closeModal();
    setDateFrom(dateFrom);
    setDateTo(dateTo);
  };

  let lastRecordBefore = { inStorage: 0, creationTime: 0 };
  storageData.forEach(rec => {
    if (
      rec.creationTime > lastRecordBefore.creationTime &&
      rec.creationTime < dateFrom
    ) {
      lastRecordBefore = rec;
    }
  });
  let deliveredFeed = 0;
  let usedFeed = 0;

  const deliveredFeedCalculations = [];
  const usedFeedCalculations = [];

  storageData
    .filter(rec => {
      return rec.creationTime >= dateFrom && rec.creationTime <= dateTo;
    })
    .forEach(rec => {
      deliveredFeed += rec.delivered;
      usedFeed += rec.used;

      if (rec.delivered) deliveredFeedCalculations.push(rec.delivered);
      if (rec.used) usedFeedCalculations.push(rec.used);
    });
  const totalFeed = lastRecordBefore.inStorage + deliveredFeed;
  console.log('lastRecordBefore:', lastRecordBefore);

  console.group('Feed chart calculations:');
  console.log('In storage at the begining:', lastRecordBefore.inStorage);
  console.log('Delivered feed', deliveredFeed, deliveredFeedCalculations);
  console.log('Used feed', usedFeed, usedFeedCalculations);
  console.log('Total feed', totalFeed);
  console.groupEnd('Feed chart calculations:');

  const data = {
    datasets: [
      {
        backgroundColor: ['#ff8424', '#6bd47a'],
        borderWidth: [0, 2],
        data: [usedFeed, totalFeed - usedFeed],
      },
    ],
    labels: ['Used', 'In storage'],
  };

  return (
    <div>
      <CircleIndicator data={data} title="Feed">
        <div className="text-top">{`${totalFeed / 1000} t`}</div>
        <div className="text-bottom">FEED TOTAL</div>
      </CircleIndicator>
      <div className="d-flex justify-content-between px-4 mt-3 mx-5">
        <span>Registered:</span>
        <span className="float-right font-bold">
          {`${deliveredFeed / 1000} t`}
        </span>
      </div>
      <div className={style.bottomDropdown} onClick={openModal}>
        <span>
          From <span className="font-bold">{dateUtil(dateFrom)}</span> till{' '}
          <span className="font-bold">{dateUtil(dateTo)}</span>
        </span>
        <span className={style.caret}>
          <FaAngleDown />
        </span>
      </div>
      <DatePicker
        isOpen={modalOpen}
        onCancel={closeModal}
        onSelect={onSelectDate}
        valueFrom={dateFrom}
      />
    </div>
  );
}

export default FeedSideChart;

/* eslint-disable */
const testData = [
  {
    _id: '5d513d8ec069e2355993e3aa',
    timestamp: 1533664764791,
    in_storage: 500,
    delivered: 45,
    used: 31,
  },
  {
    _id: '5d513d8e1e62b0fd6db7515c',
    timestamp: 1548872777580,
    in_storage: 188,
    delivered: 13,
    used: 18,
  },
  {
    _id: '5d513d8ea35d97b7b0d7c188',
    timestamp: 1538521270604,
    in_storage: 897,
    delivered: 30,
    used: 27,
  },
  {
    _id: '5d513d8e664f775acf0ed69f',
    timestamp: 1545848401595,
    in_storage: 615,
    delivered: 35,
    used: 19,
  },
  {
    _id: '5d513d8e5966502021352eb3',
    timestamp: 1560016496950,
    in_storage: 123,
    delivered: 43,
    used: 16,
  },
  {
    _id: '5d513d8e28f25d3e08d2405e',
    timestamp: 1556228284514,
    in_storage: 695,
    delivered: 28,
    used: 37,
  },
  {
    _id: '5d513d8e00ab119fa91ccd56',
    timestamp: 1558322284825,
    in_storage: 208,
    delivered: 24,
    used: 30,
  },
  {
    _id: '5d513d8e88a2d1e6c95237e1',
    timestamp: 1528266790956,
    in_storage: 764,
    delivered: 32,
    used: 31,
  },
  {
    _id: '5d513d8e5f6e3f46dbe8c161',
    timestamp: 1520479747442,
    in_storage: 469,
    delivered: 50,
    used: 46,
  },
  {
    _id: '5d513d8e2f5cce2306ca0566',
    timestamp: 1514971562499,
    in_storage: 932,
    delivered: 47,
    used: 24,
  },
  {
    _id: '5d513d8efdc270b1f7e7f5d2',
    timestamp: 1541772557522,
    in_storage: 391,
    delivered: 50,
    used: 25,
  },
  {
    _id: '5d513d8eb0eb6e9762b373d2',
    timestamp: 1526235119631,
    in_storage: 784,
    delivered: 16,
    used: 28,
  },
  {
    _id: '5d513d8e3a69bb61dc1dcaeb',
    timestamp: 1528979898290,
    in_storage: 472,
    delivered: 43,
    used: 16,
  },
  {
    _id: '5d513d8eca25471f25cfa21c',
    timestamp: 1565181018240,
    in_storage: 769,
    delivered: 23,
    used: 28,
  },
  {
    _id: '5d513d8e030ee81f8a20ff6b',
    timestamp: 1525064386566,
    in_storage: 647,
    delivered: 46,
    used: 42,
  },
  {
    _id: '5d513d8ed8ed0996269a7e7f',
    timestamp: 1515917949530,
    in_storage: 603,
    delivered: 20,
    used: 11,
  },
  {
    _id: '5d513d8ed9c6a61814920cd9',
    timestamp: 1560870876661,
    in_storage: 247,
    delivered: 22,
    used: 12,
  },
  {
    _id: '5d513d8ea8f046c32ca69e7c',
    timestamp: 1521355240047,
    in_storage: 818,
    delivered: 43,
    used: 50,
  },
  {
    _id: '5d513d8eea8deb1c7261f756',
    timestamp: 1559291246105,
    in_storage: 633,
    delivered: 29,
    used: 45,
  },
  {
    _id: '5d513d8ef9afd74c885d4f40',
    timestamp: 1529486739807,
    in_storage: 130,
    delivered: 45,
    used: 27,
  },
  {
    _id: '5d513d8ebf9c960f6425828c',
    timestamp: 1538362054122,
    in_storage: 841,
    delivered: 43,
    used: 18,
  },
  {
    _id: '5d513d8edc0af60baf9675c0',
    timestamp: 1536833224105,
    in_storage: 381,
    delivered: 15,
    used: 23,
  },
  {
    _id: '5d513d8e07e87b27ff231d2e',
    timestamp: 1542114431978,
    in_storage: 303,
    delivered: 15,
    used: 44,
  },
  {
    _id: '5d513d8e0d3e7ce75f4c1c47',
    timestamp: 1559569783044,
    in_storage: 595,
    delivered: 23,
    used: 17,
  },
  {
    _id: '5d513d8ef3564df8ffb78111',
    timestamp: 1559109562470,
    in_storage: 924,
    delivered: 15,
    used: 19,
  },
  {
    _id: '5d513d8eea382f43e0e1ae77',
    timestamp: 1557333590166,
    in_storage: 756,
    delivered: 22,
    used: 26,
  },
  {
    _id: '5d513d8e2125fba11fd989dc',
    timestamp: 1520385334176,
    in_storage: 420,
    delivered: 33,
    used: 36,
  },
  {
    _id: '5d513d8e894ff31b4ccb3c8f',
    timestamp: 1562589212599,
    in_storage: 273,
    delivered: 32,
    used: 15,
  },
  {
    _id: '5d513d8e9bf4d832c0a0bda7',
    timestamp: 1534880379315,
    in_storage: 366,
    delivered: 33,
    used: 30,
  },
  {
    _id: '5d513d8e559b1cb9f7790e54',
    timestamp: 1545404967918,
    in_storage: 227,
    delivered: 35,
    used: 49,
  },
  {
    _id: '5d513d8e754e2f62291b120c',
    timestamp: 1544868782772,
    in_storage: 465,
    delivered: 50,
    used: 36,
  },
  {
    _id: '5d513d8ed876773eed5e4b4d',
    timestamp: 1527227725871,
    in_storage: 899,
    delivered: 44,
    used: 17,
  },
  {
    _id: '5d513d8eb3049c275efb430a',
    timestamp: 1523108368263,
    in_storage: 416,
    delivered: 48,
    used: 27,
  },
  {
    _id: '5d513d8e8b149f00b96369ff',
    timestamp: 1546135707948,
    in_storage: 943,
    delivered: 25,
    used: 13,
  },
  {
    _id: '5d513d8ee5d10575376d3c1c',
    timestamp: 1557611706214,
    in_storage: 752,
    delivered: 10,
    used: 11,
  },
  {
    _id: '5d513d8e9bb19ba700d60d6a',
    timestamp: 1564647957419,
    in_storage: 543,
    delivered: 47,
    used: 13,
  },
  {
    _id: '5d513d8e4a9069871f0a61d4',
    timestamp: 1564423825750,
    in_storage: 257,
    delivered: 49,
    used: 39,
  },
  {
    _id: '5d513d8eba441038ddd697ef',
    timestamp: 1518195894648,
    in_storage: 895,
    delivered: 34,
    used: 34,
  },
  {
    _id: '5d513d8e2112acb7036c7cdc',
    timestamp: 1541021990153,
    in_storage: 714,
    delivered: 39,
    used: 50,
  },
  {
    _id: '5d513d8eb8f8c97f97d3fb1c',
    timestamp: 1551385012580,
    in_storage: 703,
    delivered: 27,
    used: 20,
  },
  {
    _id: '5d513d8e677c44ba2da6b9d4',
    timestamp: 1540274016937,
    in_storage: 849,
    delivered: 50,
    used: 27,
  },
  {
    _id: '5d513d8e2434823b2ebbd495',
    timestamp: 1565208142076,
    in_storage: 402,
    delivered: 25,
    used: 16,
  },
  {
    _id: '5d513d8ed020ebecdaaa5eb7',
    timestamp: 1550744030283,
    in_storage: 142,
    delivered: 49,
    used: 44,
  },
  {
    _id: '5d513d8e5eb885415d2a9dcc',
    timestamp: 1541419812316,
    in_storage: 273,
    delivered: 47,
    used: 22,
  },
  {
    _id: '5d513d8e1497e22febdfca01',
    timestamp: 1540032034843,
    in_storage: 918,
    delivered: 31,
    used: 45,
  },
  {
    _id: '5d513d8e0f9477be1ec39ff7',
    timestamp: 1547449876717,
    in_storage: 521,
    delivered: 36,
    used: 20,
  },
  {
    _id: '5d513d8e33da2abaec645820',
    timestamp: 1522138275907,
    in_storage: 910,
    delivered: 45,
    used: 27,
  },
  {
    _id: '5d513d8eeb5bbe6d149ba78d',
    timestamp: 1547835556349,
    in_storage: 392,
    delivered: 21,
    used: 28,
  },
  {
    _id: '5d513d8e57ffb68544b54ef2',
    timestamp: 1545374894814,
    in_storage: 882,
    delivered: 26,
    used: 47,
  },
  {
    _id: '5d513d8e17382bc0251f5d11',
    timestamp: 1559615469891,
    in_storage: 163,
    delivered: 19,
    used: 29,
  },
  {
    _id: '5d513d8ed0b0eccc6089e3d1',
    timestamp: 1533434194717,
    in_storage: 330,
    delivered: 21,
    used: 49,
  },
  {
    _id: '5d513d8e5df5a359c8f54d27',
    timestamp: 1546351389464,
    in_storage: 951,
    delivered: 49,
    used: 37,
  },
  {
    _id: '5d513d8edd4347c70cc6a5f3',
    timestamp: 1518536877039,
    in_storage: 899,
    delivered: 12,
    used: 12,
  },
  {
    _id: '5d513d8e2735cb9666354abb',
    timestamp: 1519860285741,
    in_storage: 873,
    delivered: 42,
    used: 23,
  },
  {
    _id: '5d513d8e5d7dd3d2f2ec52b6',
    timestamp: 1560279466412,
    in_storage: 183,
    delivered: 26,
    used: 38,
  },
  {
    _id: '5d513d8e0a171673fd657931',
    timestamp: 1516704658390,
    in_storage: 171,
    delivered: 36,
    used: 40,
  },
  {
    _id: '5d513d8e9662eb11e46f12a8',
    timestamp: 1552128154498,
    in_storage: 165,
    delivered: 13,
    used: 18,
  },
  {
    _id: '5d513d8eceb8d4cddfee3102',
    timestamp: 1518940730678,
    in_storage: 427,
    delivered: 48,
    used: 15,
  },
  {
    _id: '5d513d8e7a5738ad888ba3b5',
    timestamp: 1544446749057,
    in_storage: 334,
    delivered: 49,
    used: 18,
  },
];
