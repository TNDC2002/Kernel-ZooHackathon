var hashing = require('../../models/hashing')


//database setup
var data = require('../../models/userdata');

module.exports.index = (req, res) => {
    res.render("login", { mess_err: "" })
}

module.exports.login = (req, res) => {

    var ruser = req.body.email
    var rpass = req.body.password
    if (ruser && rpass) {
        data.findOne({ 'user': ruser }).exec((err, user) => {

            if (!user) {
                var msg = 'tài khoản chưa tồn tại'
                res.render('login', { mess_err: msg });
            }
            if (user.verify_status != 1){
                var msg = 'Vui lòng xác thực email trước khi đăng nhập'
                res.render('login', { mess_err: msg });
            }
            else if (user) {
                var id = user._id
                var pass = user.pass
                var key1 = user.alphabet_key
                var key2 = user.numbly_key

                if (pass === hashing.unhash(rpass, key1, key2)) {
                    res.cookie('UUID', id, {
                        signed: true
                    })
                    res.redirect('/user/profile')
                }
                else {
                    var msg = 'mật khẩu không đúng'
                    res.render('login', { mess_err: msg });
                }
            }

        })
    }
    else {
        var msg = 'hãy điền đủ thông tin'
        console.log(msg)
        res.render('login', { mess_err: msg });
    }
    
}