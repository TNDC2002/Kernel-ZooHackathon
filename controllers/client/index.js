

var data = require('../../models/userdata')
var disease = require('../../models/disease_data')
var CheckLogin = require('../../models/login_checker_forindex')
exports.index = (req, res) => {
    var checklogin = CheckLogin(req, res)
    if (checklogin == false) {
        res.render('index', { login: false });
    } else {
        var id = req.signedCookies.UUID
        data.findOne({ '_id': id }).exec((err, user) => {
            var cuser = user.user
            res.render("index", { login: true, userdata: cuser, rmoney: user.rmoney })
        })
    }
}
exports.Search = (req, res) => {
    disease.find({ location: req.body.search }).exec((err, data) => {
        if (data[0]){
            console.log(data)
            res.render("index", { login: true, userdata: "", rmoney: "" })
        }
        else{
            res.send("not found")
        }
        
    })
}