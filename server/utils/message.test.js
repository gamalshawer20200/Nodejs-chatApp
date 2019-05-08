var expect = require('expect')

var { generateMessage, generateLocationMessage } = require('./message');

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

describe('generateLocationMessage', () => {
    it('Should generate correct location message object', () => {
        var from = 'Jemi'
        var lat = '1'
        var long = '2'
        var message = generateLocationMessage(from, lat, long)
        expect(message.url).toBe('https://www.google.com/maps?q=1,2')
        expect(message.from).toBe('Jemi')
    })
})