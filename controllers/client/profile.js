var data = require('../../models/userdata')


exports.index = (req, res) => {
    var id = req.signedCookies.UUID
    data.findOne({ '_id': id }).exec((err, user) => {
        var cuser = user.user
        res.render("profile", { mess_err:"" })
    })
}

exports.update = (req, res) => {
    console.log("___________________________________________")
    console.log(req)
    var name = req.body.name;
    var dob = req.body.date;
    var phone = req.body.phone;
    var id = req.body.id;
    if (name && dob && phone && id) {

        console.log(req.body)
        data.findOne({ 'Name': name }, function (err, user) {

            if (user) {
                var msg = 'profile existed'
                res.render('register', { mess_err: msg })
            }

            else if (err) {
                console.log(err)
            }
            else if (!user && !err) {

                if (id.length == 8) {
                    userdangky.Name = name;
                    userdangky.DateOfBirth = dob;
                    userdangky.phone = phone;
                    userdangky.id_certificate = id;

                    userdangky.save(function (err) {
                        if (err) throw err
                        res.redirect("/");
                        console.log("user registed");
                        // console.log('pass:', hashed.hashedpass)
                    })

                }
                else {
                    var msg = 'id of certificate must have 8 character'
                    console.log(msg);
                    res.render('register', { mess_err: msg });
                }
            }
        });
    } else {
        var msg = 'please fill up all the form'
        console.log(msg);
        res.render('register', { mess_err: msg });
    }
}