import moment from 'moment';

function dateUtil(date) {
  const nonBreackingHyphen = String.fromCharCode(8209);
  const format = `DD${nonBreackingHyphen}MM${nonBreackingHyphen}YYYY`;
  return moment(date).format(format);
}

export default dateUtil;
