require('dotenv').config()
const app = require('./app')
const PORT = process.env.PORT || 3000

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => console.log('Mongo is showing love'))

app.listen(PORT, () => {
    console.log(`We in the building at port ${PORT}`)
})
