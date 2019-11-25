const chineseMonthList = [
  '1月',
  '2月',
  '3月',
  '4月',
  '5月',
  '6月',
  '7月',
  '8月',
  '9月',
  '10月',
  '11月',
  '12月'
];

const getNewDate =  (date) => {
 let year = date.getFullYear();
 let month = date.getMonth();
 let day = date.getDate();
 return {year, month, day};
}

const getDate = (year, month, day) => {
  return new Date(year, month, day);
}

const chineseMonth = (month) => {
  let engMonth;

  chineseMonthList.map(() => {
    engMonth = chineseMonthList[month]
  });

  return engMonth
}

export {
  getNewDate,
  getDate,
  chineseMonth
}