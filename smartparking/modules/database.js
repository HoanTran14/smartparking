"use strict";
const sequeliz = require("sequelize");
const Op = sequeliz.Op;

function creat() {
    return new sequeliz({
        database: "d26n3cbmoiqf8",
        username: "dcgkfysmyggatn",
        password: "677c65c81321a49336247882b837ec772c8079f0b227548eae39871a8468f32c",
        host: "ec2-54-235-153-124.compute-1.amazonaws.com",
        port: 5432,
        dialect: "postgres",
        dialectOptions: {
            ssl: true
        },
        define: {
            freezeTableName: true
        },
        uri: "postgres://dcgkfysmyggatn:677c65c81321a49336247882b837ec772c8079f0b227548eae39871a8468f32c@ec2-54-235-153-124.compute-1.amazonaws.com:5432/d26n3cbmoiqf8Heroku CLI\n" +
        "heroku pg:psql postgresql-cylindrical-23047 --app postgres-online"
    });
}

const db = creat();
db.authenticate()
    .then(() => console.log("CONECTDATA: success"))
    .catch(err => console.log("CONECTDATA FAIL: ", err.message));

const usertable = require('./models/User')(db, sequeliz);
const tickettable = require('./models/Ticket')(db, sequeliz);
const parktable = require('./models/Park')(db, sequeliz);
const hisparktable = require('./models/HistoryPark')(db, sequeliz);
const hisusertable = require('./models/HistoryUser')(db, sequeliz);
db.sync();

////-----------------------coment----------------------------------------------------------------------------------------------------------------
function Sequelize() {


    function createUser(body, next, errs) {
        console.log("CREAT USER  FAIL: ", body),
            usertable.create({
                phone: body.phone,
                name: body.name,
                wallet: 0,
                password: body.password,
                license_plates_top: body.license_plates_top,
                license_plates_bottom: body.license_plates_bottom
            }).then(user => {
                console.log("CREAT USER : ", user.get({plain: true}));
                next(user);
            })
                .catch(err => {
                    console.log("CREAT USER  FAIL: ", err.message),
                        errs(err.message);
                });
    }

    function findAllhis(id_user, res) {
        hisusertable.findAll({

            where: {
                id_user: id_user
            }
        }).then(arr => res.send({code: 1, mes: "Thành công", data: {list: arr}}))
            .catch(err => {

                res.send({code: 0, mes: "Fail to get data!", data: err.message});
            })
    }

    function createTicket(body, plate, next, errs) {

        console.log("CREAT USER  FAIL: ", body);
            tickettable.create({
                id_user: body.phone,
                id_park: body.id_park,
                start_at: body.start_at,
                end_at: "",
                price: body.price,
                desc: "",
                plate: plate,
                money: 0,
                state: 1
            }).then(ticket => {
                console.log("CREAT TICKET : ", ticket.get({plain: true}));
                next(ticket);
            })
                .catch(err => {
                    console.log("CREAT TICKET  FAIL: ", err.message),
                        errs(err.message);
                });
    }

    function createHisUser(id_user, id_ticket, money, desc, next, errs) {
        hisusertable.create({
                id_user: id_user,
                id_ticket: id_ticket,
                desc: desc,
                money: money
            }).then(his => {
                console.log("CREAT TICKET : ", his.get({plain: true}));
                next(his);
            })
                .catch(err => {
                    console.log("CREAT TICKET  FAIL: ", err.message),
                        errs(err.message);
                });
    }

    function updateTicket(body, next, error) {
        tickettable.update(
            {
                end_at: body.end_at,
                price: body.price,
                dest: body.desc,
                state: 0
            },
            {where: {id: body.id_ticket}}
        )
            .then(data => {
                    next(data);

                }
            )
            .catch(err =>
                error(err)
            )
    }

    function getDatabase() {
        return db;
    }

    function userTable() {
        return usertable;
    }

    function parkTable() {
        return parktable;
    }


    function hisuserTable() {
        return hisusertable;
    }


    function Ops() {
        return Op;
    }


    function loginUser(body, next, error) {
        console.log("BYID", body)
        usertable.findOne({
            where: {
                phone: body.phone,
                password: body.password
            }
        }).then(user => {
            if (user == null) {
                error("Không thành công!");

            }
            else {
                console.log("LOGIN: ");
                next(user);
            }

        })
            .catch(err => {
                console.log("findOne FAIL: ", err.message);
                error();
            });
    }

    function recharge(body, next, error) {
        console.log("BYID", body)
        usertable.findOne({
            where: {
                phone: body.phone
            }
        }).then(user => {
            if (user == null) {
                error("Không thành công!");

            }
            else {
                console.log("rechange: " + user.get("wallet"));

                usertable.update(
                    {wallet: (parseInt(user.get("wallet")) + parseInt(body.money))},
                    {where: {phone: body.phone}}
                )
                    .then(result => {
                            createHisUser(body.phone, null, body.money, "recharge", function (data) {

                            }, function (err) {

                            });
                            next(result)
                        }
                    )
                    .catch(err =>
                        error(err.message)
                    )
            }

        })
            .catch(err => {
                console.log("findOne FAIL: ", err.message);
                error();
            });
    }

    function unrecharge(phone, money, id_ticker, next, error) {

        usertable.findOne({
            where: {
                phone: phone
            }
        }).then(user => {
            if (user == null) {
                error("Không thành công!");
            }
            else {
                console.log("rechange: " + user.get("wallet"));

                usertable.update(
                    {wallet: (parseInt(user.get("wallet")) - parseInt(money))},
                    {where: {phone: phone}}
                )
                    .then(result => {
                            createHisUser(phone, id_ticker, money, "deduction\n", function (data) {
                                console.log("THANH CONG");
                            }, function (err) {
                                console.log("THAT BAI ", err);
                            });
                            next(result);
                        }
                    )
                    .catch(err =>{
                        console.log("546545645645645645645645654 "+err);
                        error(err)}
                    )


            }

        })
            .catch(err => {
                console.log("findOne FAIL: ", err);
                error(err);
            });
    }

    function finduserbyphone(phone, next, error) {

        usertable.findOne({
            where: {
                phone: phone
            }
        }).then(user => {
            if (user == null) {
                error("Không thành công!");

            }
            else {
                console.log("LOGIN: ");
                next(user);
            }

        })
            .catch(err => {
                console.log("findOne FAIL: ", err.message);
                error();
            });
    }
    function findTicketbyid(id, next, error) {

        tickettable.findOne({
            where: {
                id: id
            }
        }).then(ticket => {
            if (ticket == null) {
                error("Không thành công!");

            }
            else {
                console.log("LOGIN: ");
                next(ticket);
            }

        })
            .catch(err => {
                console.log("findOne FAIL: ", err.message);
                error();
            });
    }
    function findParkbyphone(id, next, error) {

        parkTable().findOne({
            where: {
                id: id
            }
        }).then(park => {
            if (park == null) {
                error("Không thành công!");

            }
            else {

                next(park);
            }

        })
            .catch(err => {
                console.log("findOne FAIL: ", err.message);
                error();
            });
    }

    return {
        findTicketbyid,
        findAllhis,
        updateTicket,
        createTicket,
        findParkbyphone,
        recharge,
        finduserbyphone,
        Ops,
        userTable,
        parkTable,
        hisuserTable,
        createUser,
        loginUser,
        unrecharge


    };

}


module.exports = Sequelize;