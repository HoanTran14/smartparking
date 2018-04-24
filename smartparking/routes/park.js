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
    fire.getUrlImg(req.body.id, function (url) {

        if (url == null) {
            res.send({code: 0, mes: "Sorry, try again!", data: {}});
        } else
            openalr.callImg(url,
                function (data, respone) {
                    database.createTicket(req.body,data,function (ticket) {
                        res.send({code: 1, mes: "Success", data:{ticket}});
                    },function () {
                        res.send({code: 0, mes: "Fail", data: {}});
                    })
                }, function (data, respone) {

                    res.send({code: 0, mes: "Fail", data: {}});

                });
    }, null);


});
router.post("/out", function (req, res, next) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);//id,phone,start_at
    // fire.getUrlImg(req.body.id, function (url) {
    //
    //     if (url == null) {
    //         res.send({code: 0, mes: "Sorry, try again!", data: {}});
    //     } else
    //         openalr.callImg(url,
    //             function (data, respone) {
    //                 // database.updateTicket(req.body,data,function (data) {
    //                 //     res.send({code: 1, mes: "Success", data});
    //                 // },function () {
    //                 //     res.send({code: 0, mes: "Fail", data: {}});
    //                 // })
    //             }, function (data, respone) {
    //
    //                 res.send({code: 0, mes: "Fail", data: {}});
    //
    //             });
    // }, null);


});

module.exports = router;
