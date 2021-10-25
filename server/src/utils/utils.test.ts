import dayjs from 'dayjs'
import { getNumberOfSecondsToMidnight } from './'

describe('Test: getNumberOfSecondsToMidnight function', () => {
  test('calculates seconds correctly - 1 hour', () => {
    const start = dayjs().hour(23).minute(0).second(0).millisecond(0);
    const end = dayjs().endOf('day').format('YYYY-MM-DD')

    const result = getNumberOfSecondsToMidnight(end, start)

    expect(result).toBe(60 * 60);

  })
})
