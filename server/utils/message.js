var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().toLocaleDateString()
    }
}

module.exports = { generateMessage }