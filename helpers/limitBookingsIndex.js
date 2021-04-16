// FUNCTION FOR BOOKINGS#INDEX TO GET THE DATE OF TWO WEEKS AGO
const limitPastBookings = () => {
  // MUST RETURN DATE OF 14 DAYS AGO
  const twoWeeksAgo = new Date()
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)
  return twoWeeksAgo
}

module.exports = limitPastBookings
