var expect = require('expect')

var { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('Should generate correct message object', (done) => {
        var from = 'Jemi'
        var text = 'Hello world'
        var message = generateMessage(from, text)
        expect(message.from).toBe(from)
        expect(message.text).toBe('Hello world')
        expect(typeof message.createdAt).toBe('string')
        expect(message).toInclude({ from, text })
        done()
    })
})