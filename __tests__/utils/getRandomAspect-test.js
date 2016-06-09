jest.unmock('js/utils/getRandomAspect')

import getRandomAspect from 'js/utils/getRandomAspect'

describe('getRandomAspect reducer', () => {
  describe('for a valid aspect data structure', () => {
    const aspect = {
      dieRoll: '3d6',
      values: [
        {
          'min': 3, 'max': 3,
          'value': 'You are a child, 11 years old or younger.'
        },
        {
          'min': 4, 'max': 7,
          'value': 'You are an adolescent, 12 to 17 years old.'
        },
        {
          'min': 8, 'max': 12,
          'value': 'You are a young adult, 18 to 35 years old.'
        },
        {
          'min': 13, 'max': 15,
          'value': 'You are a middle-aged adult, 36 to 55 years old.'
        },
        {
          'min': 16, 'max': 17,
          'value': 'You are an older adult, 56 to 75 years old.'
        },
        {
          'min': 18, 'max': 18,
          'value': 'You are a venerable adult, 76 years old or older.'
        }
      ]
    }

    it('will return an aspect value from the list', () => {
      const aspectValue = getRandomAspect(aspect)
      expect(aspect.values.includes(aspectValue)).toBe(true)
    })
  })
})
