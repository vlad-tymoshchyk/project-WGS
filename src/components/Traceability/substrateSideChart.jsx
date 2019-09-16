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

function SubstrateSideChart() {
  const [storageData, setStorageData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState(
    moment()
      .subtract(1, 'months')
      .valueOf(),
  );
  const [dateTo, setDateTo] = useState(moment().valueOf());
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
  let created = 0;
  let used = 0;
  storageData
    .filter(rec => {
      return rec.creationTime >= dateFrom && rec.creationTime <= dateTo;
    })
    .forEach(rec => {
      created += rec.delivered;
      used += rec.used;
    });
  const total = lastRecordBefore.inStorage + created;

  const data = {
    datasets: [
      {
        backgroundColor: ['#ff8424', '#6bd47a'],
        borderWidth: [0, 2],
        data: [used, total - used],
      },
    ],
    labels: ['Used', 'In storage'],
  };

  useEffect(() => {
    (async () => {
      const res = await DataFetcher.getSubstratesInStorage();
      if (res && res.data) {
        setStorageData(res.data.data);
      }
    })();
  }, []);

  return (
    <div>
      <CircleIndicator data={data} title="Substrate">
        <div className="text-top">{`${total / 1000} t`}</div>
        <div className="text-bottom">SUBSTRATE TOTAL</div>
      </CircleIndicator>
      <div className="d-flex justify-content-between px-4 mt-3 mx-5">
        <span>Registered:</span>
        <span className="float-right font-bold">{`${created / 1000} t`}</span>
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

export default SubstrateSideChart;

/* eslint-disable */
const testData = [
  {
    _id: '5d517a1b999b16c2d2377777',
    timestamp: 1545653572427,
    in_storage: 147,
    created: 26,
    used: 12,
  },
  {
    _id: '5d517a1bf28587ef29077e25',
    timestamp: 1547494445828,
    in_storage: 951,
    created: 23,
    used: 50,
  },
  {
    _id: '5d517a1beca6c5b56c3bbd02',
    timestamp: 1553220943879,
    in_storage: 204,
    created: 18,
    used: 34,
  },
  {
    _id: '5d517a1b5538bc523ae637ac',
    timestamp: 1540517459294,
    in_storage: 197,
    created: 26,
    used: 46,
  },
  {
    _id: '5d517a1b90607034b21f962a',
    timestamp: 1558251195897,
    in_storage: 196,
    created: 21,
    used: 43,
  },
  {
    _id: '5d517a1bcd3f455ce5bdd5e2',
    timestamp: 1548133014253,
    in_storage: 954,
    created: 27,
    used: 21,
  },
  {
    _id: '5d517a1b481a1f5862c3d55f',
    timestamp: 1544001725101,
    in_storage: 467,
    created: 26,
    used: 16,
  },
  {
    _id: '5d517a1b4d60e579e3cce3b5',
    timestamp: 1543446763101,
    in_storage: 481,
    created: 19,
    used: 46,
  },
  {
    _id: '5d517a1b9d09e7cda750d270',
    timestamp: 1530349065276,
    in_storage: 371,
    created: 17,
    used: 31,
  },
  {
    _id: '5d517a1b5c5fd55eba547a58',
    timestamp: 1514970174713,
    in_storage: 322,
    created: 17,
    used: 36,
  },
  {
    _id: '5d517a1bf655c0590864f714',
    timestamp: 1516663247658,
    in_storage: 235,
    created: 45,
    used: 47,
  },
  {
    _id: '5d517a1bd98b803e5a902fc8',
    timestamp: 1516508427332,
    in_storage: 648,
    created: 16,
    used: 44,
  },
  {
    _id: '5d517a1b5a9e0f4dd7906d06',
    timestamp: 1563346541839,
    in_storage: 401,
    created: 46,
    used: 36,
  },
  {
    _id: '5d517a1b178641dd691307da',
    timestamp: 1557657776336,
    in_storage: 640,
    created: 14,
    used: 14,
  },
  {
    _id: '5d517a1b799cda19be11e111',
    timestamp: 1540887113078,
    in_storage: 496,
    created: 44,
    used: 15,
  },
  {
    _id: '5d517a1be50d8bcb7bb08049',
    timestamp: 1529849629005,
    in_storage: 308,
    created: 46,
    used: 45,
  },
  {
    _id: '5d517a1b132c3fe72342db57',
    timestamp: 1527929567568,
    in_storage: 767,
    created: 34,
    used: 28,
  },
  {
    _id: '5d517a1bf32f91bb1480f691',
    timestamp: 1533228637899,
    in_storage: 233,
    created: 19,
    used: 24,
  },
  {
    _id: '5d517a1bc08dfb88ce66fa88',
    timestamp: 1548787002547,
    in_storage: 289,
    created: 39,
    used: 46,
  },
  {
    _id: '5d517a1b9861f90be197ddb6',
    timestamp: 1521913455369,
    in_storage: 462,
    created: 19,
    used: 36,
  },
  {
    _id: '5d517a1b886acc682831a0a0',
    timestamp: 1556545026113,
    in_storage: 913,
    created: 45,
    used: 40,
  },
  {
    _id: '5d517a1b6223cd64fbbef9c5',
    timestamp: 1526823162545,
    in_storage: 170,
    created: 41,
    used: 28,
  },
  {
    _id: '5d517a1b866577445e14bca9',
    timestamp: 1556915854817,
    in_storage: 399,
    created: 10,
    used: 44,
  },
  {
    _id: '5d517a1b8ebb7451cd392356',
    timestamp: 1533664722845,
    in_storage: 660,
    created: 38,
    used: 36,
  },
  {
    _id: '5d517a1bbe4ecf5bf95eb093',
    timestamp: 1555047687379,
    in_storage: 222,
    created: 50,
    used: 48,
  },
  {
    _id: '5d517a1bf59613fe1ed5e59c',
    timestamp: 1535187399373,
    in_storage: 300,
    created: 22,
    used: 48,
  },
  {
    _id: '5d517a1be2861b26a3711796',
    timestamp: 1536431011797,
    in_storage: 851,
    created: 38,
    used: 42,
  },
  {
    _id: '5d517a1bc7ebea886f6a887f',
    timestamp: 1533933568504,
    in_storage: 643,
    created: 29,
    used: 18,
  },
  {
    _id: '5d517a1bcb3b921ceb5e1abd',
    timestamp: 1534670394801,
    in_storage: 238,
    created: 41,
    used: 49,
  },
  {
    _id: '5d517a1b6f080d43ac1191a2',
    timestamp: 1553594467077,
    in_storage: 198,
    created: 28,
    used: 28,
  },
  {
    _id: '5d517a1bbcc93ee0fd6a3a63',
    timestamp: 1525122489096,
    in_storage: 307,
    created: 39,
    used: 50,
  },
  {
    _id: '5d517a1b7e25379fdb55a122',
    timestamp: 1542434165011,
    in_storage: 376,
    created: 42,
    used: 38,
  },
  {
    _id: '5d517a1b8debd5822798c991',
    timestamp: 1524178940237,
    in_storage: 243,
    created: 29,
    used: 23,
  },
  {
    _id: '5d517a1bbe53b4b2e9a3e1a9',
    timestamp: 1522892510049,
    in_storage: 156,
    created: 43,
    used: 23,
  },
  {
    _id: '5d517a1b8446f73a7f296606',
    timestamp: 1538210627837,
    in_storage: 403,
    created: 38,
    used: 33,
  },
  {
    _id: '5d517a1b7f31c328aae8343f',
    timestamp: 1520501942247,
    in_storage: 478,
    created: 48,
    used: 25,
  },
  {
    _id: '5d517a1bc42857bb67ca331a',
    timestamp: 1558302543366,
    in_storage: 749,
    created: 17,
    used: 41,
  },
  {
    _id: '5d517a1b67d265f811e98b7e',
    timestamp: 1564885083469,
    in_storage: 890,
    created: 45,
    used: 42,
  },
  {
    _id: '5d517a1b1f4f9b7e444e537f',
    timestamp: 1516997509566,
    in_storage: 187,
    created: 47,
    used: 23,
  },
  {
    _id: '5d517a1bf8baa10e65fc0b28',
    timestamp: 1547300572591,
    in_storage: 291,
    created: 23,
    used: 24,
  },
  {
    _id: '5d517a1b259de64f6980c918',
    timestamp: 1553639424272,
    in_storage: 737,
    created: 33,
    used: 16,
  },
  {
    _id: '5d517a1bbb2a48d94e92a8a6',
    timestamp: 1524066757550,
    in_storage: 511,
    created: 20,
    used: 24,
  },
  {
    _id: '5d517a1b135dc7cfc956c4c7',
    timestamp: 1557357485964,
    in_storage: 678,
    created: 38,
    used: 32,
  },
  {
    _id: '5d517a1b142c1f261e88c4c7',
    timestamp: 1555503212147,
    in_storage: 484,
    created: 23,
    used: 33,
  },
  {
    _id: '5d517a1b79eca3e14d4ebaac',
    timestamp: 1564158673620,
    in_storage: 384,
    created: 50,
    used: 49,
  },
  {
    _id: '5d517a1b5b72696729c4afb6',
    timestamp: 1560847608965,
    in_storage: 773,
    created: 24,
    used: 43,
  },
  {
    _id: '5d517a1b194cac5046d3b21a',
    timestamp: 1560891469323,
    in_storage: 611,
    created: 48,
    used: 25,
  },
  {
    _id: '5d517a1b69a692abd7bc0a59',
    timestamp: 1563497480527,
    in_storage: 304,
    created: 13,
    used: 22,
  },
  {
    _id: '5d517a1b77b335d1d08c519d',
    timestamp: 1559155072254,
    in_storage: 919,
    created: 30,
    used: 37,
  },
  {
    _id: '5d517a1bb169169828d3b4e1',
    timestamp: 1521178392459,
    in_storage: 576,
    created: 17,
    used: 27,
  },
  {
    _id: '5d517a1b98dd63945fccf1e5',
    timestamp: 1523119437425,
    in_storage: 743,
    created: 19,
    used: 26,
  },
  {
    _id: '5d517a1ba6b214b5f4879e08',
    timestamp: 1551197003292,
    in_storage: 423,
    created: 17,
    used: 22,
  },
  {
    _id: '5d517a1b0b6118455e0b28c9',
    timestamp: 1552071648511,
    in_storage: 579,
    created: 44,
    used: 40,
  },
  {
    _id: '5d517a1bb580cc85a3e8609d',
    timestamp: 1522262429562,
    in_storage: 733,
    created: 15,
    used: 38,
  },
  {
    _id: '5d517a1b45a8afc976fa78ae',
    timestamp: 1541541915417,
    in_storage: 723,
    created: 36,
    used: 41,
  },
  {
    _id: '5d517a1b3b9e2512c2299bc7',
    timestamp: 1546380221390,
    in_storage: 936,
    created: 13,
    used: 19,
  },
  {
    _id: '5d517a1b7aac65a450174dda',
    timestamp: 1542472426453,
    in_storage: 182,
    created: 27,
    used: 25,
  },
  {
    _id: '5d517a1bf639e6b3c7a95770',
    timestamp: 1547049332995,
    in_storage: 678,
    created: 45,
    used: 11,
  },
  {
    _id: '5d517a1bf320de8bb7554366',
    timestamp: 1563296803865,
    in_storage: 868,
    created: 38,
    used: 10,
  },
];
