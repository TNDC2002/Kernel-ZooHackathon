

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
            // var cuser = user.user
            res.render("index", { login: true })
        })
    }
}
exports.Search = (req, res) => {
    disease.find({ location: req.body.search }).exec((err, data) => {
        if(err){console.log(err)}
        var searched = req.body.search
        if (data[0]){
            // console.log(data)
            var i ;
            var result = [];
            for(i = 0;i < data.length;i++){
                result.push(data[i].toObject()) 
            }
            // console.log(result[0].specie_vn)
            res.render("result", { results: result})
        }
        else{
            res.render("result", { results: 0})
        }
        
    })
}
exports.result = (req, res) => {
    
}