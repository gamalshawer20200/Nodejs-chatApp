const path = require('path')
const express = require('express')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;

// console.log(__dirname+ '/../public')
// console.log(publicPath)

var app = express()
app.use(express.static(publicPath))

app.get('/', (req, res) => {
    res.send()
})

app.get('/index', (req, res) => {
    res.send('index.html')
})


app.listen(port, () => {
    console.log(`Server starting at port ${port} ...`)
})
