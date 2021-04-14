const testTimeSpanForNewBooking = (date) => {
  const providedDate = new Date(date);
  let limitDate = new Date();
  limitDate = new Date(limitDate.setDate(limitDate.getDate() + 7));
  const check = limitDate > providedDate ? true : false
  console.log(check)
}

testTimeSpanForNewBooking('2021-04-21')
