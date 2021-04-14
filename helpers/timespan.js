const testTimeSpanForNewBooking = (date) => {
  const providedDate = new Date(date);
  let limitDate = new Date();
  limitDate = new Date(limitDate.setDate(limitDate.getDate() + 7));
  const result = limitDate > providedDate ? true : false
  return result
}

module.exports = testTimeSpanForNewBooking
