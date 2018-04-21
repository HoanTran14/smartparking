var express = require('express');
var bodyParsers = require('body-parser');
var router = express.Router();
//--------------------------------------------------------------------------------------------------------
router.use(bodyParsers.json());
router.use(bodyParsers.urlencoded({extended: true}));
//-----------------------------------------------------------------------------------------------------------
const DATABASE = require('../modules/database');
var data = DATABASE();
//--------------------------------------------------------------------------------------------------------------
/* GET users listing. */
router.post("/register", function (req, res, next) {
    if (!req.body) returnres.sendStatus(400);

    data.createUser(req.body,function (user) {
        res.send({code: 1, mes: "Success", data: {user}});
    },function (err) {
        res.send({code: 1, mes: err, data: {}});
    })

});
router.post("/detail", function (req, res, next) {
	if (!req.body) return res.sendStatus(400);
	console.log(req.body);
	res.send({code: 0, mes: "Fail to get data!", data: {}});


});
router.post("/search", function (req, res, next) {
	if (!req.body) return res.sendStatus(400);
	console.log(req.body);
	var name = '%' + req.body.key + '%';
	console.log("SEARCH", name);
	data.userTable().findAll({

		where: {
			phone: {
				[(data.Ops()).like]: name
			}
		}
	}).then(arr => res.send({code: 1, mes: "Success", data: {list: arr}}))
		.catch(err => {

			res.send({code: 0, mes: "Fail to get data!", data: err.message});
		})
//TODO

});
router.post("/delete", function (req, res, next) {
	if (!req.body) return res.sendStatus(400);
	console.log(req.body);

	data.userTable().destroy({
		where: {
			id: req.body.id
		}

	}).then(a => {

		if (a == 0) {
			res.send({code: 0, mes: "Fail!", data: {}})
		} else
			res.send({code: 1, mes: "Success!", data: {}});

	}).catch(a => res.send({code: 0, mes: "Fail!", data: {}}));
});
module.exports = router;
