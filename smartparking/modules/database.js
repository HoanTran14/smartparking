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
db.sync();
////-----------------------coment----------------------------------------------------------------------------------------------------------------
function Sequelize() {
	const KEY = "dsadas";

	function createUser(id, next, errs) {

		usertable.create({
			idfb: id
		}).then(user => {
				console.log("CREAT USER : ", user.get({plain: true}));
				next(user);
			})
			.catch(err => {
				console.log("CREAT USER  FAIL: ", err.message),
					errs();
			});
	}


	function getDatabase() {
		return db;
	}

	function userTable() {
		return usertable;
	}

	function Ops() {
		return Op;
	}



	function findUserbyFbid(id, next, error) {
		console.log("BYID", id)
		usertable.findOne({
			where: {id: id}}).then(user => {
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
		Ops,
		userTable,
		createUser,
		findUserbyFbid,
		KEY

	};

}


module.exports = Sequelize;