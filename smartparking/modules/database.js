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
            wallet:0,
            password: body.password,
            license_plates_top: body.license_plates_top,
            license_plates_bottom:body.license_plates_bottom
		}).then(user => {
				console.log("CREAT USER : ", user.get({plain: true}));
				next(user);
			})
			.catch(err => {
				console.log("CREAT USER  FAIL: ", err.message),
					errs(err.message);
			});
	}


	function getDatabase() {
		return db;
	}

	function userTable() {
		return usertable;
	}
    function parkTable() {
        return parkTable();
    }
    function hisparkTable() {
        return userTable();
    }
    function hisuserTable() {
        return hisparkTable();
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
			}}).then(user => {
				if (user == null) {
					error("Fail!");

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
			}}).then(user => {
				if (user == null) {
					error("Fail!");

				}
				else {
					console.log("rechange: "+user.get("wallet"));

                    usertable.update(
                        { wallet:( parseInt(user.get("wallet"))+parseInt(body.money)) },
                        { where: { phone: body.phone } }
                    )
                        .then(result =>
                           next(result)
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
    function unrecharge(phone,money, next, error) {
        console.log("BYID", body)
        usertable.findOne({
            where: {
                phone: phone
            }}).then(user => {
            if (user == null) {
                error("Fail!");

            }
            else {
                console.log("rechange: "+user.get("wallet"));

                console.log("rechange: "+x);
                usertable.update(
                    { wallet:( parseInt(user.get("wallet"))-parseInt(money)) },
                    { where: { phone: body.phone } }
                )
                    .then(result =>
                        next(result)
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
    function finduserbyphone(phone, next, error) {

        usertable.findOne({
            where: {
                phone: phone
            }}).then(user => {
            if (user == null) {
                error("Fail!");

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
	return {
        recharge,
        finduserbyphone,
		Ops,
		userTable,
		parkTable,
		hisparkTable,
		hisuserTable,
		createUser,
        loginUser

	};

}


module.exports = Sequelize;