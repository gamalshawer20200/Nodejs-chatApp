var expect = require('expect')
var { isRealString } = require('./validation')

describe('isRealString', () => {
    it('Should allow string', () => {
        var name = '  gamal  '
        expect(isRealString(name)).toBe(true)
    })

    it('Should reject string with only spaces', () => {
        var name = '       '
        expect(isRealString(name)).toBe(false)
    })

    it('Should reject non-string values', () => {
        var name = 123
        expect(isRealString(name)).toBe(false)
    })
})