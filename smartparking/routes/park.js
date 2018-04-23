var express = require('express');
var bodyParsers = require('body-parser');
var router = express.Router();
//---------------------------------------------------------------------------------------------------------
router.use(bodyParsers.json());
router.use(bodyParsers.urlencoded({extended: true}));
//-----------------------------------------------------------------------------------------------------------

const DATABASE = require('../modules/database');
const OPENAL = require('../modules/openalpr');
const FIRE=require('../modules/firebasedatabase');
var  fire=FIRE();
var data = DATABASE();
var openalr=OPENAL();




router.post("/info", function (req, res, next) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    res.end("ok");

});


router.post("/register", function (req, res, next) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    fire.writeParkDataInfo(req.body)

});

router.post("/sign", function (req, res, next) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    openalr.callImg("https://upload.wikimedia.org/wikipedia/commons/c/c6/US_Army_in_Europe_license_plate_-_Euro_dimensions.JPG",
        function (data,respone) {
            res.send({code: 1, mes: "Success", data: {data}});
        },function (data,respone) {
            res.send({code: 0, mes: "Fail", data: {data}});
        });
  //  fire.signPark(req.body);

});

module.exports = router;
