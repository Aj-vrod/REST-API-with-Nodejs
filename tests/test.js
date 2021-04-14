const testTimeSpanForNewBooking = require('../helpers/timespan')

describe('bookings', () => {
  test('timespan', () => {
    expect(testTimeSpanForNewBooking('2021-04-20')).toBe(true)
    expect(testTimeSpanForNewBooking('2021-04-30')).toBe(false)
    expect(testTimeSpanForNewBooking('2021-04-16')).toBe(true)
    expect(testTimeSpanForNewBooking('2021-04-10')).toBe(false)
  })
})
