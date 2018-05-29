var express = require('express');
var bodyParsers = require('body-parser');
var router = express.Router();
const FIRE = require('../modules/firebasedatabase');
//---------------------------------------------------------------------------------------------------------
router.use(bodyParsers.json());
router.use(bodyParsers.urlencoded({extended: true}));
//-----------------------------------------------------------------------------------------------------------

const DATABASE = require('../modules/database');
//const OPENALPR = require('../modules/openalpr');
var fire = FIRE();
var database = DATABASE();
//var openalr = OPENALPR();

//--------------------------------------------------------------------------------------------------------------
/* GET home page. */
router.get('/', function (req, res, next) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
  //  openalr.identify(1,"http://thamtutatthang.com/uploads/images/tham-tu-dieu-tra-bien-so-xe(1).jpg")
    res.send({code: 1, mes: "Thành công ", data: {}});

});
//delete table
router.post("/table/del", function (req, res, next) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    //data.getDatabase().dropDatabase();
    res.end("ok");

});

//login
router.post("/login", function (req, res, next) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    database.loginUser(req.body,
        function (user) {
            database.userTable().update(
                {firebase_token: req.body.firebase_token},
                {where: {phone: user.phone}}
            )
                .then(result =>{
                    fire.getUser(user.phone,function (data) {
                        res.send({code: 1, mes: "Thành công", data: {user,data}})
                    })

                }

                )
                .catch(err =>
                    res.send({code: 0, mes: "Không thành công !", data: {err}})
                )


        }, function () {
                res.send({code: 0, mes: "Fail to login!", data: {}});

        });

});

module.exports = router;
