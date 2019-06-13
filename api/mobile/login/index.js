const user = require('../../db/user')
const locker = require('../../db/locker')

const bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = (app) => {

    const wrong ={
        message: "wrong"
    }

    const success ={
        message: "success"
    }


    app.get('/api/mobile/user', urlencodedParser, (req, res) => {
        user.find({}, (err, data) => {
            if(err){
                return res.status(500).json({err})
            }
            res.send(data)
        })
    })

    app.get('/api/mobile/locker', (req, res) => {
        locker.find({}, (err, data) => {
            if(err){
                return res.status(500).send("somthinhg wrong")
            }
            res.send(data)
        })
    })

    var b = 0

    app.post('/api/mobile/registerLocker', urlencodedParser, (req, res) => {
        locker.find({}, (err, data) => {
            if(err){
                return res.status(500).json({err})
            }
            const iLocker = {
                name: req.body.name,
                number: req.body.number,
                password: req.body.password
            }

            locker.updateOne({number: iLocker.number}, {
                name: req.body.name,
                password: req.body.password
            }, (err, data2) => {
                if(err) res.status(500).json(err)
                else {
                    a = iLocker.number
                    console.log('a1 ',a)
                    res.json({message: "success"})
                }
            })
        })
    })

    app.get('/api/mobile/:id', (req, res) => {
        console.log('a: ', b)
        console.log("params: ", req.params.id)
        if (req.params.id == "mobile") {
            if (req.query.code == "1") {
                res.send(`${b}`)
                b=0
                console.log("a values: ",b)
            }
        }
    })
}