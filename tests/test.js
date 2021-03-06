const testTimeSpan = require('../helpers/timespan')
const limitPastBookings = require('../helpers/limitBookingsIndex')

describe('bookings', () => {
  test('timespan', () => {
    expect(testTimeSpan('2021-04-20')).toBe(true)
    expect(testTimeSpan('2021-04-30')).toBe(false)
    expect(testTimeSpan('2021-04-16')).toBe(true)
    expect(testTimeSpan('2021-04-10')).toBe(false)
    expect(testTimeSpan('2021-56-34')).toBe(false)
    expect(testTimeSpan('2021-78-99')).toBe(false)
  })
  test('twoWeeksAgo', () => {
    expect(limitPastBookings().getDate()).toBe(new Date('2021-04-01').getDate())
  })
})
