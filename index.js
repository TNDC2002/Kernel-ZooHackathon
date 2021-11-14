// thu vien
var express = require("express")
var cookieParser = require('cookie-parser')
// var file = require('fs')
var path = require('path')
const mongoose = require('mongoose');

// setting apps
var app = express()

app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, 'views')))
app.use(cookieParser('iojkmygvbthuerfcasddfsgxvcert'))

//port and notification
// const PORT = 90
// app.listen(443, function () {
//     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
// });


const connect_mongo = 'mongodb://localhost:27017/datas';
mongoose.connect(connect_mongo, { useUnifiedTopology: true, useNewUrlParser: true})
.then(() => {
    app.listen(80);
    console.log('Khởi động hoàn tất.');
});

// khai báo các route
var index = require("./routes/index")
var register = require("./routes/register")
var login = require("./routes/login")
var logout = require("./routes/logout")
var profile = require("./routes/profile")
var changepass = require("./routes/contribution")
// cài đặt URL	 	
app.use("/", index)
app.use("/register", register)
app.use("/login", login)
app.use("/logout", logout)
app.use("/user/profile", profile)
app.use("/user/contribution", changepass)


module.exports = app