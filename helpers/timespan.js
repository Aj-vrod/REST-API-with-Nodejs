// FUNCTION TO MAKE SURE THE DATE PROVIDED IN BODY BELONGS TO THE FOLLOWING WEEK
const testTimeSpan = (date) => {
  const providedDate = new Date(date);
  // GET YESTERDAY
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  // GET DATE OF 7 DAYS AFTER TODAY
  let limitDate = new Date();
  limitDate = new Date(limitDate.setDate(limitDate.getDate() + 7));
  // CHECKS IF DATE PROVIDED FULFILLS REQUIREMENTS
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
