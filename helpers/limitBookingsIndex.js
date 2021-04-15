const limitPastBookings = () => {
  // MUST RETURN DATE FOR 14 DAYS AGO
  const twoWeeksAgo = new Date()
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)
  return twoWeeksAgo
}

module.exports = limitPastBookings
