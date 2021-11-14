

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
    data.find({ user: req.body.search }).exec((err, data) => {
        var searched = req.body.search
        if (data[0]){
            console.log(data)
            res.render("result", { results: data, searched: searched })
        }
        else{
            res.render("result", { results: 0, searched: searched})
        }
        
    })
}
exports.result = (req, res) => {
    
}