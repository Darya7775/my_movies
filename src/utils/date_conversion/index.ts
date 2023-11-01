const getDate = (date: string) => {
  const TEN = 10;
  const d = new Date(Date.parse(date));

  // const months: {[key: string]: string} = {
  //   0: "января",
  //   1: "февраля",
  //   2: "марта",
  //   3: "апреля",
  //   4: "мая",
  //   5: "июня",
  //   6: "июля",
  //   7: "августа",
  //   8: "сентября",
  //   9: "октября",
  //   10: "ноября",
  //   11: "декабря"
  // };

  const months: {[key: string]: string} = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
  };

  return(`${d.getDate()} ${months[String(d.getMonth())]} ${d.getFullYear()} at ${d.getHours() < TEN ? `0${d.getHours()}`: d.getHours()}:${d.getMinutes() < TEN ? `0${d.getMinutes()}`: d.getMinutes()}`);
};

export default getDate;
