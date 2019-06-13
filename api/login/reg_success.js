const teSt = require('../db/locker')
const bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = (app) => {

    var c = 0

    app.post('/api/login/reg_success', urlencodedParser, (req, res) => {
        var lock_info = {
            name: req.body.name,
            number: req.body.locker,
            password: req.body.code
        }

        if (!req.body.locker) {
            return res.status(500).send("Please fill all data")
        } else {
            teSt.findOne({ number: req.body.locker }, (err, result) => {
                if (result.password != 0) {
                    return res.status(500).send("Locker is used!!!! Please pick another one")
                } else {
                    teSt.updateOne({ number: req.body.locker }, {
                        name: req.body.name,
                        password: req.body.code
                    }, (err, result) => {
                        if (err) {
                            return res.status(500).json(err)
                        } else {
                            res.render('success/success', { Name: req.body.name, Number: req.body.locker })
                            c = req.body.locker
                            //getTest(res)
                        }

                    })
                }
            })
        }
        //res.send(lock_info)
        //console.log(lock_info)
    })


    app.get('/api/login/:id', (req, res) => {
        console.log('a: ', c)
        if (req.params.id == "login") {
            if (req.query.code == "1") {
                res.send(`${c}`)
                c=0
                console.log("a values: ",c)
            }
        }
    })
}