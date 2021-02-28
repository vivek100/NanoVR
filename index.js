const express = require('express')
const app = express()
const PORT = process.env.PORT || 80;

// Set static folder
app.use(express.static(__dirname));
//app.use(express.static('public'))
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
