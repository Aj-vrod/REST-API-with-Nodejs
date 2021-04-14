const testTimeSpanForNewBooking = require('../helpers/timespan')

describe('bookings', () => {
  test('timespan', () => {
    expect(testTimeSpanForNewBooking('2021-04-20')).toBe(true)
  })
})
