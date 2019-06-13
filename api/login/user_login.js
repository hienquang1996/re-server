const login = require('../db/user')
const locker = require('../db/locker')
const bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false })

function getLogin(res) {
    login.find((err, login) => {
        if (err) {
            res.send(err)
        } else {
            res.json(login)
        }
    })
}

module.exports = (app) => {
    //get all user data;
    app.get('/api/login', (req, res) => {
        //getLogin(res)
        res.render('login')
    })
    

    app.get('/api/login/user/info', urlencodedParser, (req, res) => {
        user = {
            name: req.query.name,
            pass: req.query.pass
        }
        //var name = req.params['name']
        //console.log(username)
        //console.log(name)

        //getLogin(res)

        login.find({ name: user.name }, (err, login) => {
            if (err) throw err
            else {
                //console.log(login)
                if (login[0].password == user.pass) {
                    //res.json(login)
                    //user[user.name]
                    locker.find({name: user.name}, (err, result) => {
                        if (err) throw err
                        var a = 0
                        for(var i=0; i < result.length; i++){
                            if(result[i].name == user.name){
                                a=1
                                //console.log("Registered")
                            }else{
                                //console.log("NOT YET")
                            }
                        }
                        if(a==1){
                            a = 0
                            res.render('select/reg-select', {Name: user.name})
                        }else{
                            locker.find({}, (err, result) => {
                                if (err) throw err
                    
                                console.log("1: ", result[0].password)
                                console.log("2: ", result[1].password)
                                console.log("3: ", result[2].password)
                                console.log("4: ", result[3].password)
                    
                    
                                //1
                                var i = 0
                                if (result[0].password == null || result[0].password == 0) {
                                    var b = 1
                                }
                                //2
                                if (result[1].password == 0 || result[1].password == null) {
                                    var c = 2
                                }
                                //3
                                if (result[2].password == 0 || result[2].password == null) {
                                    var d = 3
                                }
                                //4
                                if (result[3].password == 0 || result[3].password == null) {
                                    var e = 4
                                }
                    
                                res.render('select/non-select', { Number: result.length, locker1: b, locker2: c, locker3: d, locker4: e })
                            })
                        }
                    })
                } else {
                    console.log(login[0].password)
                    res.render('err/err_login')
                }
            }
        })
    })
}