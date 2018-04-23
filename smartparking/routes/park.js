var express = require('express');
var bodyParsers = require('body-parser');
var router = express.Router();
//---------------------------------------------------------------------------------------------------------
router.use(bodyParsers.json());
router.use(bodyParsers.urlencoded({extended: true}));
//-----------------------------------------------------------------------------------------------------------

const DATABASE = require('../modules/database');
const FIRE=require('../modules/firebasedatabase');
var  fire=FIRE();
var data = DATABASE();




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
    fire.signPark(req.body);

});router.post("/tesy", function (req, res, next) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);



});

module.exports = router;
