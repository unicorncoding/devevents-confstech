const dayjs = require("dayjs");
dayjs.extend(require("dayjs/plugin/isSameOrAfter"));
dayjs.extend(require("dayjs/plugin/relativeTime"));
dayjs.extend(require("dayjs/plugin/utc"));

const utc = dayjs.utc;

function isFuture(date) {
  return date && dayjs(date).isSameOrAfter(dayjs());
}

function prettyRange(startDate, endDate) {
  const start = utc(startDate);
  const sameDay = !endDate || start.isSame(dayjs(endDate), "day");
  if (sameDay) {
    return start.format("MMMM D YYYY");
  }
  const end = utc(endDate);
  const sameMonth = start.month() == end.month();
  if (sameMonth) {
    return end.format(`MMMM ${start.format("D")}-D YYYY`);
  } else {
    return start.format("MMMM D") + " - " + end.format("MMMM D YYYY");
  }
}

module.exports.prettyRange = prettyRange;
module.exports.dayjs = dayjs;
module.exports.isFuture = isFuture;
