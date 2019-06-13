const user = require('../../db/user')
const bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = (app) => {

    app.post('/api/mobile/registerAccount', urlencodedParser, (req, res) => {
        //if(err) throw res.status(401).json(err)
        const wrong ={
            message: "wrong"
        }

        const success ={
            message: "success"
        }

        if (req.body.password == req.body.rpassword) {
            const userInfo = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
            user.create(userInfo , (err, result) =>{
                res.send(success)
                //res.json({message: "success"})
                console.log(userInfo)
            })
            //res.send(userInfo)
        }else{
            res.json({message: "wrong"})
        }
    })
}