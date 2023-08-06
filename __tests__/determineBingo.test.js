import '@testing-library/jest-dom'
import { determineBingo } from '../src/utils/deterimineBingo'
 
describe('determineBingo', () => {
  it('should correctly determine vertical and horizontal bingos', () => {
    const horizontal = [
        [true, false, false],
        [true, false, false],
        [true, false, false]
    ]
    const horizontalOutcome = {
        isBingo: true,
        bingoMatrix: horizontal
    }

    const vertical = [
        [true, true, true],
        [false, false, false],
        [false, false, false]
    ]
    const verticalOutcome = {
        isBingo: true,
        bingoMatrix: vertical
    }

    expect(determineBingo(horizontal)).toStrictEqual(horizontalOutcome)
    expect(determineBingo(vertical)).toStrictEqual(verticalOutcome)
  })
})