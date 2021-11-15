// mail system
const sendMail = require('../../modules/mail');
//database setup
var User = require('../../models/userdata');
//bộ mã hóa
var hashing = require('../../models/hashing')
// module string
var randomstring = require("randomstring");

/**
 * Function xuất giao diện đăng ký
 */
exports.index = (req, res) => {
    res.render("register", { mess_err: "" });
}

/**
 * Function xử lý đăng ký
 */
exports.Register = (req, res) => {
    var ruser = req.body.username;
    var rpass = req.body.password;
    var rcon = req.body.password_confirmation;
    if (ruser && rpass && rcon) {
        console.log(req.body)
        let that = this;
        User.findOne({ 'user': ruser }, function (err, user) {
            if (user) {
                var msg = 'tài khoản đã tồn tại'
                res.render('register', { mess_err: msg })
            }

            else if (err) {
                console.log(err)
            }
            else if (!user && !err) {
                if (rpass != rcon) {
                    var msg = 'phần xác nhận mật khẩu không đúng'
                    res.render('register', { mess_err: msg });
                }
                else if (rpass.length < 6) {
                    var msg = 'mật khẩu cần tối thiểu 6 ký tự'
                    res.render('register', { mess_err: msg });
                    console.log(msg)
                }
                else if (rpass.length >= 6) {
                    if (rpass = rcon) {
                        let hashed = hashing.hash(rpass)
                        var userdangky = new User();
                        var d = new Date()
                        var month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                        var date = d.getDate() + '/' + month[d.getMonth()] + '/' + d.getFullYear()
                        let secret_code = randomstring.generate(); // mã bí mật để xác minh
                        userdangky.user = ruser;
                        userdangky.pass = hashed.hashedpass;
                        userdangky.alphabet_key = hashed.alphabet_key;
                        userdangky.numbly_key = hashed.numbly_key;
                        userdangky.date = date;
                        userdangky.rmoney = 0;
                        userdangky.verify_status = 0;
                        userdangky.secret_mail = secret_code;
                        
                        userdangky.save(function (err) {
                            if (err) throw err
                            that.MailVerify(ruser, secret_code);
                            res.send(`<script>alert('Đăng ký thành công. Vui lòng vào mail để xác minh tài khoản.'); window.location.href = '/login';</script>`);
                            console.log("user registed");
                            // console.log('pass:', hashed.hashedpass)
                        })
                    }
                }
            }
        });
    } else {
        var msg = 'hãy điền đủ thông tin'
        console.log(msg);
        res.render('register', { mess_err: msg });
    }

}

/**
 * Function xác minh tài khoản
 */
 exports.VerifyAccount = async (req, res) => {
    dataRequest = req.params;
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    console.log(await User.countDocuments({user: dataRequest.user, secret_mail: dataRequest.secret_mail }).exec())
    if (await User.countDocuments({user: dataRequest.user, secret_mail: dataRequest.secret_mail }).exec() > 0){
        
        await User.updateOne({user: dataRequest.user}, {verify_status: 1}, { upsert: true }); // set trạng thái xác minh thành công.
        res.send(`<script>alert('Xác thực thành công.'); window.location.href = '/register';</script>`);
    } else {
        res.send(`<script>alert('Link xác thực không chính xác vui lòng thử lại.'); window.location.href = '/register';</script>`);
    }
}

/**
 * Gửi mã xác minh user
 * @param {*} user 
 * @param {*} secret 
 */
exports.MailVerify = (user, secret) => {
    sendMail.config = {
        url: 'https://api.eu.mailgun.net/v3/levelhigh.site/messages',
        username: 'api',
        password: 'key-ff3431ee75884433aafc7f2c893c1638'
    };

    sendMail.sendMail(user, {
        address: 'noreply@levelhigh.site',
        name: 'Levelhigh',
        subject: 'Yêu cầu xác thực tài khoản',
        html: `<p>Link xác thực: http://localhost/register/verify/${user}/${secret}</p>`
    });
}
