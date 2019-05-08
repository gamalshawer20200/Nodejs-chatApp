var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().toLocaleDateString()
    }
}

var generateLocationMessage = (from, lat, long) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${long}`,
        createdAt: new Date().toLocaleDateString
    }
}

module.exports = { generateMessage, generateLocationMessage }