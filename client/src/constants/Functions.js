import moment from "moment";

export const diffDates = (date1, date2) => {
  const a = moment(date1).format("YYYY-MM-DD");
  const b = moment(date2).format("YYYY-MM-DD");
  const m = moment(a);
  const dates = [];
  for (m; m.diff(b, "days") <= 0; m.add(1, "days")) {
    dates.push(m.format("YYYY-MM-DD"));
  }
  return dates;
};

export async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export default {
  diffDates,
  asyncForEach
};
