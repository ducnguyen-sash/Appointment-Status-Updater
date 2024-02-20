//Find the Epoch time range for today's date
//
const findDateRange = () => {
  const currentDateStart = new Date().setHours(0, 0, 0, 0);
  const currentDateEnd = new Date().setHours(23, 59, 59, 999);

  return {
    start: currentDateStart,
    end: currentDateEnd,
  };
};

findDateRange();

module.exports = { findDateRange };
