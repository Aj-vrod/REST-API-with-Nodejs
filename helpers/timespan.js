const testTimeSpan = (date) => {
  const providedDate = new Date(date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  let limitDate = new Date();
  limitDate = new Date(limitDate.setDate(limitDate.getDate() + 7));
  if (providedDate instanceof Date) {
    if (yesterday < providedDate) {
      return limitDate > providedDate ? true : false
    } else {
      return false
    }
  } else {
    return false
  }
}

module.exports = testTimeSpan
