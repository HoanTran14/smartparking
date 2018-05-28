var express = require('express');
var bodyParsers = require('body-parser');
var router = express.Router();
//---------------------------------------------------------------------------------------------------------
router.use(bodyParsers.json());
router.use(bodyParsers.urlencoded({extended: true}));
//-----------------------------------------------------------------------------------------------------------

const DATABASE = require('../modules/database');
const OPENAL = require('../modules/openalpr');
const FIRE = require('../modules/firebasedatabase');
var fire = FIRE();
var database = DATABASE();
var openalr = OPENAL();


router.post("/info", function (req, res, next) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    fire.getParkInfo(req.body.id, function (park) {

        res.send({code: 1, mes: "Success", data: {park}});

    }, function () {
        res.send({code: 0, mes: "Fail to login!", data: {}});

    })


});


router.post("/register", function (req, res, next) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    fire.writeParkDataInfo(req.body);


});


router.post("/sign", function (req, res, next) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);//id,phone,start_at
    openalr.callImg(req.body.data,
        function (data) {
            database.createTicket(req.body, data, function (ticket) {
                res.send({code: 1, mes: "Success", data: {ticket}});
            }, function (err) {
                res.send({code: 0, mes: "Fail", data: {err}});
            })
        }, function (err) {

            res.send({code: 0, mes: "Fail", data: {err}});

        });


});

router.post("/license-plate", function (req, res, next) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);//id,phone,start_at
    openalr.callImg(req.body.data,
        function (data) {
            database.createTicket(req.body, data, function (ticket) {
                res.send({code: 1, mes: "Success", data: {ticket}});
            }, function (err) {
                res.send({code: 0, mes: "Fail", data: {err}});
            })
        }, function (err) {

            res.send({code: 0, mes: "Fail", data: {err}});

        });


});
router.post("/out", function (req, res, next) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    database.updateTicket(req.body, function (data) {
        res.send({code: 1, mes: "Success", data: {data}});
    }, function (err) {
        res.send({code: 0, mes: "Fail", data: {err}});
    });


});

module.exports = router;
