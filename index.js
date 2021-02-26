const express = require('express')
const app = express()
const port = 80

// Set static folder
app.use(express.static(__dirname));
//app.use(express.static('public'))

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})
