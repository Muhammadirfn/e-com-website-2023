const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URI).then((conn) => { console.log(`connection to Db is successfull bro`,conn.connection.host); }).catch((err) => { console.log(err); })