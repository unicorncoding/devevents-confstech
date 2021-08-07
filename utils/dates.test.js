const { prettyRange } = require("./dates.js");
const dayjs = require("dayjs");

test("shows a pretty date", () => {
  const startDate = dayjs("2018-04-04T16:00:00.000Z");
  expect(prettyRange(startDate)).toBe("April 4 2018");
  expect(prettyRange(startDate, startDate)).toBe("April 4 2018");
});

test("shows a pretty date range (same month)", () => {
  const startDate = dayjs("2018-04-04T16:00:00.000Z");
  const endDate = dayjs("2018-04-05T16:00:00.000Z");
  expect(prettyRange(startDate, endDate)).toBe("April 4-5 2018");
});

test("shows a pretty date range (different months)", () => {
  const startDate = dayjs("2018-04-04T16:00:00.000Z");
  const endDate = dayjs("2018-05-06T16:00:00.000Z");
  expect(prettyRange(startDate, endDate)).toBe("April 4 - May 6 2018");
});
