import '@testing-library/jest-dom'
import { determineBingo } from '../src/utils/deterimineBingo'
 
describe('determineBingo', () => {
  it('should not determine bingo if there is no bingo', () => {
    const field = [
      [false, false],
      [false, false]
    ];
    const outcome = {
      isBingo: false,
      bingoMatrix: field
    }

     expect(determineBingo(field)).toStrictEqual(outcome)
  }),
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
  }),
  it('should not include items in bingoMatrix that are not contribute to the bingo', () => {
    const field = [
      [true, true, true],
      [true, false, false],
      [false, true, true]
    ]

    const bingoMatrix = [
      [true, true, true],
      [false, false, false],
      [false, false, false]
    ]

    const outcome = {
      isBingo: true,
      bingoMatrix
    }

    expect(determineBingo(field)).toStrictEqual(outcome)
  }),
  it('should consider diagonal bingo as bingo if number of rows and cols are equal', () => {
    const field = [
      [true, false, true],
      [false, true, false],
      [true, false, true]
    ]

    const outcome = {
      isBingo: true,
      bingoMatrix: field
    }

    expect(determineBingo(field)).toStrictEqual(outcome)
  }),
  it('should not consider diagonal bingo as bingo if number of rows and cols are not equal', () => {
    const field = [
      [true, false, true],
      [false, true, false],
      [true, false, true],
      [false, false, false]
    ]

    const bingoMatrix = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
      [false, false, false]
    ]

    const outcome = {
      isBingo: false,
      bingoMatrix
    }

    expect(determineBingo(field)).toStrictEqual(outcome)
  })
})